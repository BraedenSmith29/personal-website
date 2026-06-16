# Entry 02 - The First Settings!

Date: February 24, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/5db44e24a7380b51a459d8fcaddda967e47a3624...d3b4ecf90349581aabdac0a465b4887ecf7af4de

To begin implementing settings, I chose the simplest ones first: dark mode and URL matching. These allowed me to test my implementation of the `Settings` class and make sure my approach feels good to use before I get into the weeds with more complicated settings.

### First, Dark Mode

One of the first pieces of feedback I received on the extension is that it needed a dark mode. It would be pretty simple to implement, so I decided to start there. I’m not a designer and I’m trying to iterate quickly, and since AI did such a good job on the initial design for the popup, I decided I’d see what it could do. First, I wanted to make it easier for the AI to perform a color swap, so I refactored all of the colors out into descriptive CSS variables. Then I asked GitHub Copilot to switch them to dark mode colors which worked like a charm.

Once I had the CSS established, I created a quick new setting to hold dark mode and added it to the settings controls. I had to make sure to call the `setDarkMode()` function after updating settings to make sure the feedback to the user is immediate.

![Dark mode implementation](Entry%2002%20-%20The%20First%20Settings!/image.png)

Dark mode implementation

### Why Aren’t the Settings Syncing?

Implementing URL matching was straightforward, but it exposed a bug: settings changed in the popup weren't reflecting in the background process.

The `Settings` class maintains a static in-memory cache which is automatically kept up to date with any changes, so I was surprised to find that new settings saved in the popup were not actually reflecting until I reloaded the extension. Initially, I thought I might be skipping updating the cache somehow, but a quick review ruled that out.

Soon, I realized the obvious cause: The background script and the popup script don’t share a process. They run separately. This also means they don’t share memory, so state must be synchronized explicitly. To achieve this, I added a cache invalidation method and triggered it via `runtime.sendMessage` whenever settings changed in the popup. The background script grabs the updated information next time it’s needed.

I had overlooked this constraint because I don’t think I’ve ever really worked with a codebase that had this property. It’s always either been one process or multiple obviously disparate processes (like client/server running on different machines). I’ve never handled behavior like this.

### Takeaway

Although the features themselves were simple, they reinforced two important lessons. First, AI is surprisingly effective for visual tasks, which I would expect to be its weakest application. I will continue to take advantage of this tool for rapid UI design.

Second, the synchronization bug reinforced an important constraint of extension architecture: popup and background scripts are separate processes and must communicate explicitly. In this case, the failure was fairly obvious, but that won’t always be the case. I’ll keep this in mind as I continue to work on this extension and on similar systems in the future.