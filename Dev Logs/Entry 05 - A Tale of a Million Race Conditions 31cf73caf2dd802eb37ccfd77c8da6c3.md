# Entry 05 - A Tale of a Million Race Conditions

Date: March 7, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/901db97c881ed2a8de09e3f6f7fa830c44686b7b...4d0a4e1e43dc6ec11bbbef622259f0aaa352f146

After my last entry, I was confident that I had a functional product. My next objective was to refactor the core logic into separate classes to improve encapsulation, because the existing logic was a bit messy. I kicked this off by refactoring `Settings` and `Pause` and extracting the navigation classification logic into its own `NavigationClassifier` class, but I soon ran into some issues with the functionality. After checking out an old commit and ruling out code changes from the refactor, I did some investigation and concluded that many of my core assumptions about execution order were suddenly false. From there, I changed my focus to identifying a new approach since these race conditions made a lot of the core functionality unreliable.

## Refactoring Storage Wrappers

First, the easy part: One of my future goals for the project was to allow use of a keybinding to pause the application. Part of this would be to let the keybinding launch the extension popup so any pause duration could be chosen. While experimenting with this, I realized that the WebExtensions API is very particular about when extensions can launch popups. Browser commands are luckily an example of when you *can* launch a popup, but only if you attach a synchronous listener. Since my `Settings` implementation pretty much entirely used asynchronous methods, I needed to make a change.

### Paradigm Shift

The reason `Settings` (and `Pause`, I’ll get to that shortly) are asynchronous is simply because browser storage queries are asynchronous. `Settings` does maintain a cache, but it still fetched from browser storage in the event of a cache miss.

```tsx
static async getSettings(): Promise<SettingsData> {
    if (this.cache) {
        return this.cache;
    }
    const settings = await this.load();
    this.cache = settings;
    return settings;
}
```

Since I need to `await this.load()` in the worst case, `getSettings` must remain `async` along with all downstream getters. There really is no way around this restriction under this paradigm, so something needed to change. Luckily, this is a simple shift. There are only two cases in which the cache actually misses: at startup, and after it’s invalidated by a browser message as I discussed in a previous log. Instead of generalizing the cache loading, I can just do it explicitly in these cases and let every other getter fetch directly from the cache synchronously. I just needed to establish a contract that would ensure the cache is actually valid at all times.

Now is a good time to note that `Pause` interacts with the browser storage using the exact same interface as `Settings`, so I decided to extract that core logic from both into a new abstract `StorageCache` class. This class exposes asynchronous `load` and `save` functions which interact with the browser storage as well as a synchronous `getFromCache` function which fetches straight from the cache. Now that I had a way of accessing the cache directly, I needed to enforce permanent cache accuracy. This requires two measures.

The first measure is to register a listener inside of `StorageCache` to keep a constant eye on updates to its `storageKey`, which is set by the inheritor. Whenever there is an update, the cache is synchronously updated! Originally, I used `browser.runtime.onMessage` for this, but then I learned about `browser.storage.onChanged` which is much nicer since the setter doesn’t need to explicitly notify consumers.

```tsx
// StorageCache.ts
private readonly settingsChangeListener = (changes: { [key: string]: browser.storage.StorageChange }, area: string): void => {
    if (area !== "local") return;
    const changed = changes[this.storageKey];
    if (!changed) return;
    this.cache = changed.newValue ?? this.default;
};
protected constructor(storageKey: string, defaultValue: T) {
    this.storageKey = storageKey;
    this.default = defaultValue;
    browser.storage.onChanged.addListener(this.settingsChangeListener);
}
```

Now, all that remains is hydrating the cache when the `StorageCache` inheritor is first created. My original idea was to call `load` in the constructor, but constructors cannot be asynchronous and I wanted to `await` the load to ensure I never have a cache miss. Instead, I gave each inheritor an `async` factory which creates the class, awaits the load function, and returns. This allows me to instantiate the class with an await and guarantee that the cache is hydrated before first use.

```tsx
// Settings.ts
private constructor() {
    super(Settings.STORAGE_KEY, Settings.DEFAULT_SETTINGS);
}
static async create(): Promise<Settings> {
    const settings = new Settings();
    await settings.load();
    return settings;
}

// background.ts
const settings = await Settings.create();
```

This worked perfectly! It did require me to make the setup within `background.ts` and `popup.ts` asynchronous, but I will be refactoring them in the future and I should be able to make that cleaner, so I’m okay with the ugliness for now.

### Takeaway

This refactor results in substantially cleaner and more usable class logic for `Settings` and `Pause`, underscoring the importance of smart encapsulation. It also provides an example on how to stem the “poison” which is asynchronous logic. With good planning, the asynchronous complexity can be moved to the side allowing the primary logic to proceed synchronously.

## Great, Nothing Works.

The next step in my refactor was to move each step in my primary `browser.webRequest.onBeforeRequest` listener into a smaller, encapsulated class to better enforce single responsibility and clarity. The logic which classified navigation types in the middle seemed like a great first choice since it was simple but bulky, so I created `NavigationClassifier`. I have since removed it, so I won’t go into the details, but the changes can be viewed [here](https://github.com/BraedenSmith29/dedupe/commit/5a7312bd50ca86384b983c83740cc5576d3fded8).

I was pretty happy with it, so I started testing, and everything failed. Long story short, the order of browser events was not as reliable as I was initially led to believe by my browser’s behavior. In every case that I observed, browser events fired in this order:

1. `browser.windows.onCreated` and/or `browser.windows.onFocusChanged`
2. `browser.webRequest.onBeforeRequest`
3. `browser.tabs.onUpdated` (I never listened for this, but it’s important that the tab’s URL is only updated after step 2)

As it turns out, none of this is reliable. Steps 1 and 2 are randomly interchangeable, and step 3 would rarely occur before step 2 causing deduplication to fail entirely. The latter may have also been a result of asynchronous behavior in step 2’s listener, but it was rare enough that I couldn’t even replicate to test after a while.

### Is It Over?

Ultimately, I decided that this approach was just entirely too unreliable. I could not guarantee that the listeners would fire in the order I needed them to and the infrastructure to work around that would be too sketchy. I needed to either reduce the scope to what could be guaranteed or find a new approach. I really didn’t want to do the former, so I laid on the floor and considered how on earth I could restructure this.

I remembered back to the beginning of this project when I was using `browser.tabs.onUpdated`. I initially wrote this off because the callback signature does not provide enough information on any one call to make many decisions, so I’d need to build a sort of state machine around it to collect all of the necessary info. I didn’t want to deal with that, but it was beginning to seem like my only chance. I ran the logic through my head to make sure there were no obvious failure points, got off the floor, and gave it a go.

### The New Approach

First, the bad news: I still need to rely in some amount on the ordering of separate events. The good news is that these events seem to have deterministic orders. I have researched and tested as much as I reasonably can to confirm as much. The order also seems impossible to change, logically, so I should be good. Here is what I’m relying on:

1. `browser.tabs.onCreated`
2. `browser.windows.onCreated`
3. `browser.tabs.onUpdated` and/or `browser.windows.onFocusChanged`

For some reason, tabs are created before windows, but they happen in practically the same instant. This order seems very stable, so I trust it. Then, a tab has to be created before it can be updated, and a window has to be created before it can be focused, so this makes sense to me!

With a good understanding of the order of events, I was ready to design a solution that could work within those constraints. I'll walk through the core logic here, but skip the finer details. Check out the full diff [here](https://github.com/BraedenSmith29/dedupe/commit/4d0a4e1e43dc6ec11bbbef622259f0aaa352f146) if you want the complete picture.

Essentially, I define a class `TabTracker` with two maps called `tabs` and `tabsToWatch`. I may choose clearer names in the future, but these work for now. The `tabs` map keeps track of relevant details for every tab that’s open. This is critical for ensuring synchronous behavior since querying the API for this information is `async`. The `tabsToWatch` map keeps track of what I’m calling “lifecycle data” (again, for now). A tab will only be present in the map if it’s in the process of being loaded.

Now, whenever a tab is created, or a loaded tab starts loading again, it’s added to `tabsToWatch`. Any time a tab is updated, the listener checks `tabsToWatch` and updates any information it might need. Once there is enough information to make a decision, the listener calls a callback function registered in `background.js` which executes the same logic that was present in the past. The last part does happen asynchronously, but that’s fine because I’ve already collected all of the unstable information and made a decision.

This approach ended up being way cleaner than I expected, and it’s passed a lot of testing, so I’m feeling very confident in the direction the project is heading. Now, I can really focus on a refactor to clean things up and ship version 2!

### Takeaway

When working with a complex listener-based API like this one, it’s absolutely critical to do early research and testing to gain a solid understanding of the guarantees, or lack thereof, available to you. In my defense, I did think I had a pretty good grasp on this, but I definitely relied far too much on traditional assumptions for this project. Browsers are complex, multi-process machines; not REST APIs.

Once I took a moment to think through my options and constraints and come up with a good plan, development proceeded smoothly. I would have saved myself hours if I did this from the start instead of figuring “it’s just a browser extension”. Alas, I know for next time!