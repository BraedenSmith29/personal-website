# Entry 03 - The WebExtensions API Is Not Very Nice to Me :(

Date: February 25, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/d3b4ecf90349581aabdac0a465b4887ecf7af4de...5ee48856fb3f57538f8395f667999d0af6a31416

The next objective was to implement the settings for when to deduplicate the tabs. I provided four conditions where the user might want to deduplicate after they navigate: opening a new tab, opening a new window, redirecting within the same tab, and after navigating in a blank new tab. 

Deduplication first requires classifying the navigation type, then applying the corresponding setting. Unfortunately, classifying navigation types easier said than done.

![image.png](Entry%2003%20-%20The%20WebExtensions%20API%20Is%20Not%20Very%20Nice%20/image.png)

## Classifying Navigation Types

The WebExtensions API doesn’t have a simple way to identify *how* the browser is navigating. Only that it *is* navigating. This is probably fine for 99% of extensions, but it made my life difficult. This shortfall manifested in three ways:

1. The WebExtensions API has literally no way to differentiate clearly between some similar actions. For example: did the user click something to trigger a navigation or did the webpage do it automatically? 
2. The WebExtensions API does have a method to differentiate, but Firefox doesn’t implement it properly. For example: Firefox never fires the `browser.webNavigation.onCreatedNavigationTarget` event, which would be exceedingly useful for my use-case.
3. There is a clear way to differentiate between two events, but it’s only available during parts of the request lifecycle where other critical information is unavailable. Example: `browser.tabs.onCreated` guarantees me that the user is either opening a new tab or a new window, but the tab doesn’t have the target URL populated at this stage and I therefore have nothing to deduplicate with.

### What I Tried

The third was the most insidious kind, because it often lured me into the idea that I could construct some monstrosity of several listeners to slowly and carefully collect relevant information over the lifecycle of a navigation. Unfortunately, I was never able to make this work. Depending on the interaction, some listeners fire and others don’t, they may process in different orders depending on awaits, or they may fire multiple times. There are just too many unknowns for me to confidently build a framework to process it all without sketchy heuristics that are almost certain to fail on different machines. Any approach like this would have required extensive testing, and I am still trying to be efficient with this project, so I decided to compromise by shrinking scope of available settings to only what I could reliably process with the heuristics I knew would work.

### What Worked

Ultimately, I was able to discover how I could use the information available to me in the `browser.webRequest.onBeforeRequest` listener to fulfill most of the use-cases I wanted to cover. I took great care to ensure that the conditions were mutually exclusive so that classification was deterministic regardless of call order.

```jsx
function isReloadingTab(tab: browser.tabs.Tab, newUrl: string) {
  return tab.url === newUrl;
}
function isDeliberateDuplicateOrOpenedFromHistory(tab: browser.tabs.Tab) {
  return tab.url !== 'about:blank' && tab.url !== 'about:newtab' && tab.url !== 'about:home' && tab.id && newTabs.has(tab.id);
}
function isFirstNavigationInFreshTab(tab: browser.tabs.Tab) {
  return tab.url === 'about:newtab' || tab.url === 'about:home';
}
function isOpenedInNewWindow(tab: browser.tabs.Tab) {
  return tab.url === 'about:blank' && tab.windowId && newWindows.has(tab.windowId) && !isFirstNavigationInFreshTab(tab);
}
function isOpenedInNewTabInSameWindow(tab: browser.tabs.Tab) {
  return tab.url === 'about:blank' && tab.id && newTabs.has(tab.id) && !isOpenedInNewWindow(tab) && !isFirstNavigationInFreshTab(tab);
}
function isRedirect(tab: browser.tabs.Tab) {
  return tab.url !== 'about:blank' && !isOpenedInNewTabInSameWindow(tab) && !isOpenedInNewWindow(tab) && !isFirstNavigationInFreshTab(tab);
}
```

As I call these functions, if the navigation type matches and its corresponding setting is disabled, I allow the request. If not, continue evaluation with this kind of logic until all checks are complete, at which point I can confidently assert that the listened request is covered by the user’s selected settings and deduplication can proceed.

```jsx
// Logic in the onBeforeRequest listener
if (isReloadingTab(currentTab, requestDetails.url)) {
  return allowRequest(requestDetails.tabId, currentTab.windowId);
}
if (isDeliberateDuplicateOrOpenedFromHistory(currentTab)) {
  return allowRequest(requestDetails.tabId, currentTab.windowId);
}

const settings = await Settings.getSettings();
if (isFirstNavigationInFreshTab(currentTab) && !settings.checkWhenFirstNavigationInFreshTab) {
  return allowRequest(requestDetails.tabId, currentTab.windowId);
}
if (isOpenedInNewWindow(currentTab) && !settings.checkWhenOpeningNewWindow) {
  return allowRequest(requestDetails.tabId, currentTab.windowId);
}
if (isOpenedInNewTabInSameWindow(currentTab) && !settings.checkWhenOpeningNewTab) {
  return allowRequest(requestDetails.tabId, currentTab.windowId);
}
if (isRedirect(currentTab) && !settings.checkWhenRedirecting) {
  return allowRequest(requestDetails.tabId, currentTab.windowId);
}
```

### Takeaway

This was an excellent exercise in building heuristics. The solution looks, in my opinion, simple and elegant, which was exactly my goal. But it took hours of research and *experimentation* to nail down the exact combination of conditions that would accurately reflect reality. Not to mention the process of gathering some of this information reliably. It took a lot of different attempts before I landed on using the `newTabs` and `newWindows` sets.

## Removing the `content.ts` Script

The content.ts script was injected into pages with my original implementation of the extension. It captured any ctrl+clicks or middle clicks onto URLs and processed them using deduplication logic instead. This was nice because it looked smoother in the browser. However, this behavior does not respond to all redirects in the page, only specific kinds. If I want to make it follow the user’s settings properly, I need to fix this.

### What I Tried

I wanted to make this listener work consistently regardless of how the redirect is triggered since it does feel smoother and is the most common use case. I tried researching some approaches that could cover all cases, but unfortunately it’s just too tightly scoped. There is no simple way to universally and confidently capture any redirect interaction in the browser.

### What I Did

Since I can’t reliably make a complete solution here, it would be better to abandon the content script and focus on the listener. This reduces conflict points and makes for a more consistent experience with the extension in the average case, even if it’s a bit less smooth in the best case.

### Takeaway

Sometimes, it’s okay to abandon slightly better behavior in a specific case in favor of consistency in all cases. This choice simplifies dev work, shrinks the surface area for bugs to appear, and reduces confusion for the user that would result from the system behaving inconsistently. The user doesn’t know the API limitations, they just know that sometimes the extension does weird things, and I don’t want them to feel that way.