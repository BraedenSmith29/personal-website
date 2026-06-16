# Entry 08 - Adding the Last Few Features

Date: March 11, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/97a3d431a8089bf6053784179f0619f6c299a17c...4ce1aac5ca9b932b2a01f19ad32d38625d435846

Now that everything was working as designed, I had a few new feature ideas I wanted to implement.

## Keybindings

I’ve always been a person who likes using keybindings to do things faster, so I wanted to add some keybindings to the extension. The first one I added automatically toggles pause when activated. I also added a setting which will allow it to open the menu instead, in case you want to do custom pauses. I also created some icons which will reflect the pause state.

The second keybinding I added is a little bit different from the main purpose of the extension, but I wanted the functionality and didn’t want to have to make a whole new project. When pressing the keybinding, the tab you are currently on or the tabs you have selected will all detach from the current window and create a new one. This makes it a lot easier to quickly separate workspaces. I already had an extension that mostly did this, but it didn’t work when highlighting multiple tabs.

Adding these keybindings was straightforward, I just needed to register a listener with `browser.commands.onCommand` and check the `command` string to decide what to do.

## Whitelist/Blacklist Domains

I also added the ability to whitelist or blacklist domains.

![image.png](Entry%2008%20-%20Adding%20the%20Last%20Few%20Features/image.png)

This allows better fine-tuning of the functionality in case it doesn’t play nicely with some websites. I let GitHub Copilot generate a lot of the UI, as is tradition, and then I hooked it up to store the list with the rest of the settings. Now, whenever the extension compares tabs to find duplicates, it skips tabs with domains in this list.

## Deduplication Counter

The last thing I added was a fun idea from my friend: Any time the extension automatically deduplicates a tab, it increments a permanent counter which can be viewed at any time in the settings page.

![image.png](Entry%2008%20-%20Adding%20the%20Last%20Few%20Features/image%201.png)

It’s not really useful, just a fun statistic. I really like when apps do this so I was excited to do it myself.

## Finale!

With that, all of the planned functionality is complete! Working on this extension was a lot of fun and a lot more difficult than expected. The WebExtensions API is hard to reign in, but it’s very satisfying once everything finally works. I also feel like I developed a pretty maintainable system after the refactor. It has been nice to work in.

Unfortunately, due to Manifest V3 constraints, this extension will be impossible to port to Chromium extensions. Huge shout-out to Google for their support of the extension ecosystem 😒.

Regardless, I learned a lot doing this and I’m excited to get on to the next project!