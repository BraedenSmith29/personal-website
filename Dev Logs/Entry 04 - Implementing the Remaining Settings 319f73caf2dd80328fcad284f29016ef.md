# Entry 04 - Implementing the Remaining Settings

Date: February 26, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/5ee48856fb3f57538f8395f667999d0af6a31416...dda4e28573e6d50547aa032460886ee283ef8c86

![image.png](Entry%2004%20-%20Implementing%20the%20Remaining%20Settings/image.png)

Today, I successfully implemented the rest of the planned core features and settings. For the most part, these were simple. However, there were two different issues that came up involving opening links inside a new window. After refining both problems, I realized their solutions shared the same core insight.

## Capturing Synchronous State in an Asynchronous Context

### What is the “Current Window”?

The first problem is that if the user selects the settings “deduplicate tabs when opening in new window” and “deduplicate tabs in all windows” at the same time, they end up with a bit of a contradiction. If they just opened a new tab, there wouldn’t be anything else to check! I spent a lot of time deliberating this and came up with a few ideas, including letting the contradiction sit and allowing the user to face the consequences of their configuration. But I didn’t like that. 

I eventually came to the conclusion that I was misinterpreting the spirit of “deduplicate tabs in all windows”. Instead of defining “the current window” as “the window that the new tab is in”, I decided that it should instead be “the window the tab was opened from”. This resolves the contradiction and better matches user intuition.

Unfortunately, I have no way of knowing what the source window is with the information available to me from the listener. Depending upon execution order of the asynchronous events, the result of `await browser.windows.getLastFocused()` could either be the source window or the current window.

### I Don’t Always Want to Switch Windows!

The second problem is related to the tab switching behavior settings. When the extension detects a duplicate tab, there are four possible behaviors that the user can select in the settings. If the user chooses to delete the old tab and not switch to the new one, there is a frustrating collision with browser behavior. Firefox allows the user to disable switching to a new tab when opening it, but it doesn’t allow the same choice for opening in a new window. So, when the user opens a new window with this setting, it switches anyway!

Realistically, this probably doesn’t matter much. Honestly, I can’t imagine why a user would choose this setting anyway, so I considered leaving it be. But, if I’m going to offer the option, I figure I better make it work as described. So, I added a little extra check into my logic to switch the window back to the source window after the request.

```jsx
if (!tabSwitched && isOpenedInNewWindow(currentTab)) {
  await browser.windows.update(sourceWindowId, { focused: true });
}
```

At first, this seemed to do the trick. But it started failing occasionally. Unfortunately, since the listener is asynchronous, I can’t guarantee that the refocus I’m trying to override has occurred by this point. The code above could run before the new window’s refocus event and just get immediately undone.

### The Insight

<aside>
🚨

Note: I later discovered that `onBeforeRequest` does *not* consistently fire before the refocus event. This was a misunderstanding. The conclusions below are based on that incorrect premise, though the general pattern for handling `async` race conditions in browser listeners is still applicable.

</aside>

The core problem with both of these is that the `browser.webRequest.onBeforeRequest` event occurs before the window refocus event. Normally this would simply guarantee that the window has not been refocused yet, but my callback function is asynchronous, so I cannot be sure of that. In fact, my experience was that the refocus event would consistently occur at some point before my listener completed. What this means practically is that I cannot be sure whether the refocus event has occurred or not at any point in my execution.

After a bit of experimentation, I realized that this problem could not be solved with extra checks. Any kind of interaction with the browser requires `await` calls which yield control and have the potential for race conditions. I needed something synchronous. Luckily, my research led me to a key insight that I hadn’t realized before. I knew that asynchronous functions don’t *need* to be awaited. However, I’ve gotten into the habit of doing it anyway, mostly because my old job used a linter which yelled at me if I didn’t either `await` or `.then()`. This manifested in the assumption that any entry into an asynchronous function means yielding.

But that’s not the case for listeners (or probably most callbacks that accept asynchronous functions). When a listener has an asynchronous function attached to it, the event handler simply executes all of the functions normally, asynchronous or not. This means that execution of my function remains synchronous until the first `await`!

### Applying the Insight

Being able to access a synchronous context inside of my asynchronous function made this a lot simpler. It means I can capture guaranteed state before things start to become uncertain. The first thing I did to take advantage of this was define two synchronous `browser.windows.onFocusChanged` listeners to maintain state so that I don’t have to rely on asynchronous browser state queries.

```tsx
let currentFocusedWindowId = -1;
browser.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== -1) {
    currentFocusedWindowId = windowId;
  }
});

let refocusTracker = false;
browser.windows.onFocusChanged.addListener(() => {
  refocusTracker = true;
});
```

The utility of these is easiest to illustrate using the first listener as an example. Normally, to access the current window, I would need to execute `await browser.windows.getCurrent()`. Since this yields control, there is a possibility that this ends up returning the new window if the refocus occurs before I get control back. Instead, I update my own state variable using the synchronous listener, which allows me to access it by simply referencing `currentFocusedWindowId` synchronously.

Now that these variables track focus changes synchronously, I can write the listener like so:

```tsx
browser.webRequest.onBeforeRequest.addListener(async (requestDetails) => {
  const sourceWindowId = currentFocusedWindowId;
  refocusTracker = false;
	
	/** Irrelevant listener code **/
	
		case 'deleteOld':
      if (!tabSwitched && isOpenedInNewWindow(currentTab)) {
        if (refocusTracker) {
          await browser.windows.update(sourceWindowId, { focused: true });
        } else {
          const overrideFocusListener = async () => {
            await browser.windows.update(sourceWindowId, { focused: true });
            browser.windows.onFocusChanged.removeListener(overrideFocusListener);
          };
          browser.windows.onFocusChanged.addListener(overrideFocusListener);
        }
      }
      
  /** Rest of the listener **/
}, /** Other args **/);
```

To make sure I always know what the window ID is when this listener is *initially* fired, I can capture `currentFocusedWindowId` into `sourceWindowId`. Now, even if the window is refocused during an `await`, I know exactly what it was when the listener started.

To make sure I always know whether the window has refocused or not, I synchronously set `refocusTracker` to false at the beginning of the execution and, since the listener always makes it true, I know whether the refocus has occurred or not based on the state. If it has refocused, I can switch back. If it hasn’t, I can set a listener to automatically switch back the next time window focus is changed (which should be almost immediately). A similar solution could have done away with `refocusTracker` and instead queried for `await browser.windows.getCurrent() !== sourceWindowId`, but for now I like the precomputed solution.

### Takeaway

When multiple browser lifecycle events interact, awaiting inside a listener can introduce nondeterminism. To reduce this problem, it can be beneficial to capture important, known information before yielding control. This allows much more deterministic decision-making and eliminates a lot of race conditions.