# Entry 06 - Refactoring

Date: March 9, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/4d0a4e1e43dc6ec11bbbef622259f0aaa352f146...fc234cc9a81363b9c00f78efd039991638c22fbe

After the changes made to the tab tracking last week, I was finally feeling confident about the core functionality of the extension. I have thoroughly tested the behavior and have not seen any regression, so I think this approach is finally in a reliable place. There are a few minor behavioral improvements still pending, but now seemed like a good time to shift into completing the refactor so that the system is more straightforward.

### Refactoring the Background Logic

The background script is the area that has the most spaghetti logic, so it was the first place I wanted to target. My objective was to move to core logic into a class that would coordinate all of the deduplication so that I could simply instantiate it from the background script, leaving room for more features, instead of just dumping everything straight into the top level of `background.ts`.

While I was making changes to my approach last week, I got a head start on this by creating `TabTracker` to coordinate the tab searching, but I still registered the very weird `onDeduplicationCandidateFound` callback which left the handling to the background script. To fix this, I created a new `Deduplicator` class which handles all of the deduplication behavior once a tab is classified. It’s all the same logic, just cleaned up a little bit and moved to a dedicated class.

Within `TabTracker` itself, I flattened out the core if statement, allowing the same run of `onTabUpdated` to start tracking and finish tracking a tab, just in case there are times where everything happens in one call. I also extracted the tab classification logic to a separate function to clean up the core listener a little bit. Now, it’s a lot easier to process what is going on in this class and it should be a bit more reliable.

### Updating the File Structure

When I started this project, I wasn’t planning on having anything more than the `popup.ts` and `background.ts` scripts, so I just left everything in a flat folder structure. I ended up with a few more files that originally planned, though, so I decided to organize them a little bit. I made three new folders: `background`, `popup`, and `shared`, to house the corresponding files. I also broke `pause.ts` into a couple of module files to clean up and organize the logic for it.

### Update `async` Handling

The last thing I did was scan the codebase for any uses of `async` to make sure that:

1. There were no functions that accidentally had `async` for no reason
2. All floating `async` calls were either handled or marked with `void`
3. All `async` browser API calls had their errors caught

I don’t have a linter installed in this codebase since it’s so small and I never felt like setting one up, so I was worried that my handling of asynchronous functions was becoming a bit messy. One thing I did not know before this is that convention would have you put `void` where `await` would normally go if you have no intention of handling the promise, so I went in and did that. I also noticed that the browser API calls would sometimes error, causing execution to stop and deduplication to fail. Since these errors were usually along the lines of “you tried to delete a tab that was already deleted”, I just added a catch to log it so that execution would not stop. No need to declare special behavior for these cases.

### Takeaway

I was putting refactoring off until I had things working so that I could know exactly how I wanted to structure my code, but I think this was a bad approach. It’s not that hard to move code around, but it is hard to debug a nightmare codebase, so I think refactoring early and often to match the current functionality is better than leaving a spaghetti mess until the end. If you do the dishes while you cook, you’ll have more counter space.