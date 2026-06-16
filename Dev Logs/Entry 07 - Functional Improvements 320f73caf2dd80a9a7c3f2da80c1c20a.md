# Entry 07 - Functional Improvements

Date: March 10, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/fc234cc9a81363b9c00f78efd039991638c22fbe...97a3d431a8089bf6053784179f0619f6c299a17c

I have been doing a lot of fixing and refactoring, but it has been a while since I made any changes to the function of the extension. Still, over the past week or two I have been collecting a small list of possible issues or changes that I wanted to take a look at. Most of these ended up not needing any work, but there were two clear improvements to be made.

## Finalizing Switching Behavior

As it stands, I offer four options to the user for what to do when a duplicate tab is identified:

1. Delete the new tab
2. Delete the new tab and switch to the old tab
3. Delete the old tab(s)
4. Delete the old tab(s) and switch to the new tab

Outside of a few minor issues, these options have worked very well with the intentions of the extension. However, there was one point of friction I wanted to address.

### Maintaining History

As we all know, each tab has its own navigation history which allows users to go backward and forward. When I was formulating the original specs for this project, I tried to design it in a way that would ensure this tab history is never lost unless the user explicitly chose to delete old tabs, in which case it would be unavoidable.

Of course, new tabs *should* never have any tab history since they are freshly created, so the default “delete new and switch” option *should* uphold this objective. But this breaks down in practice. For the purposes of the extension, “new tab” has really just referred to the tab that the navigation is happening in, while “old tab” is the other tabs which match as duplicates. This means that when redirecting, the “new tab” isn’t new at all; it has a tab history.

I recognized this early on and have been specifically skipping the delete step for any redirect. For example, instead of deleting the “new tab” and switching to the old tab, the extension will just switch to the old tab.

This puts me in a position where the behavior does not always match the setting, but I figured it was an acceptable sacrifice. What I did *not* consider was that the behavior with settings other than “delete new and switch” would be significantly stranger:

| **Defined Behavior** | **Actual Behavior During Redirect** |
| --- | --- |
| Delete the new tab | Cancel redirect and do nothing else |
| Delete the new tab and switch to the old tab | Cancel redirect and switch to old tab ✅ |
| Delete the old tab(s) | Allow redirect and do nothing else |
| Delete the old tab(s) and switch to the new tab | Allow redirect and do nothing else |

I find these other behaviors extremely uncomfortable, so I wanted to make some adjustment.

### Options

The way I saw it, I had two options. The first was to leave both “delete new” options the same and change the “delete old” options to actually delete the old tabs. This would match the behavior most with the other functionality even if it left the behavior of “just delete new” a little bit uncomfortable. I didn’t mind deleting old tabs here since the user is specifically opting into this.

The other option was to make redirects ignore this setting and perform the special “cancel redirect and switch to old tab” behavior no matter what. The advantage of this is mainly that I think it’s the most intuitive way for redirects to behave.

I was initially leaning toward the first option, but I eventually decided to go with the second option after interviewing a user (asking my fiancée what she thought).

## Fixing “Remove Deduplicated Tabs From History”

The other problem I identified was that the “remove deduplicated tabs from history” setting was no longer working. It originally worked by setting the URL for the tab to “about:blank” after the redirect, but this approach was already unreliable and regressed as I made my changes to the point that it didn’t work at all. So, I either needed to remove it or fix it. I opted for the latter.

### Can I Even Do This?

The first thing I needed to do was research the “right” approach for this, since clearly my janky method was insufficient. Fortunately, the WebExtensions API provides `browser.sessions.forgetClosedTab`, which is exactly what I’m looking for. Unfortunately, the sessions API absolutely sucks for my use-case.

### How Do Sessions Work?

Every tab has an associated session, identified by a `sessionId`, which is *only* created after the tab is deleted. This sessionId is never populated into the `browser.tabs.Tab` object in my listeners, so I need to query `await browser.sessions.getRecentlyClosed` and search the result for the relevant session.

Unfortunately, the tabs in these sessions do not retain their `tabId`, so I have to search for matches based only on `windowId` and `url`. This means that things get messy if I ever delete two of the same tab in the same window at the same time, which can often happen.

The second problem is that the session doesn’t populate immediately when the tab is deleted, so I need to check on a delay, which is of course unreliable.

The final problem is that the `getRecentlyClosed` query only returns a maximum of 25 results, which means if my tab moves out of this sliding window I lose the opportunity to forget it.

### Making It Work

I was able to solve the first two problems with a little bit of creativity. The sessions API does at least provide an `onChanged` listener, which gives me the ability to solve the second problem by listening for any changes and just waiting until I see the relevant tab.

I attached this listener in the constructor for a new `TabForgettor` class which maintains a map of tabs which I am trying to delete. The map is keyed by `url::windowId` and holds a count of how many I need to delete and a list of `sessionId`s that have already been deleted.

To initiate the process, the tab deletion function registers the deleted tab with `TabForgettor` which either creates a new map entry for the URL/window combination or adds one to the count.

Then, every time `onChanged` is fired, I get a list of all the closed tabs and then look through them for matches. If it hasn’t been marked as deleted yet, I mark it as deleted and then reduce the count by one. If I find a match but it’s already marked as a deleted session, I skip it. This maintains accuracy in the count.

As soon as the count hits zero, or after one second using a `setTimeout`, the URL/window combination is unregistered and `TabForgettor` goes dormant.

Due to the 25 tab limit on the `getRecentlyClosed` query, tabs will be missed if more than 25 are closed at once. But I doubt this will ever be a problem in practice.

### Takeaways

When working with heavy constraints, it’s important to identify exactly which problems the constraints will cause and then get creative about how you can keep track of the missing information. This has been a common theme in this project and I have found that there usually is a way to work around it with enough sets and maps.