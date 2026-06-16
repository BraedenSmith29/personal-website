# Entry 01 - Creating a Popup!

Date: February 19, 2026
Changes: https://github.com/BraedenSmith29/dedupe/compare/1ed8f6194c78c4ef618d86fba858cc4732d6f363...5db44e24a7380b51a459d8fcaddda967e47a3624

In the initial proof of concept, Dedupe was entirely passive and operated in the background. In order to expand its functionality in the ways I planned, I needed some way to interact with the extension on a deeper level. To accomplish this, I decided to build a popup that appears when clicking the extension icon for easy access.

### Generating a Foundation with GitHub Copilot

To get started, I decided to see what GitHub Copilot was capable of when it comes to UI generation. I set it up in VS Code and then created a short requirements file with the functionality I wanted to expose via the popup. From there, I asked it to generate a popup. It gave me a surprisingly usable starting point. However, the generated TypeScript mostly didn’t work and the HTML/CSS contained a lot of unnecessary complexity. I decided to refine it manually.

### Refining the Foundation

First, I set up the TypeScript file to function properly. I fixed the element selectors and abstracted the settings and pause functionality into their own classes so that I could abstract browser storage interaction. This will make it a lot easier to check settings and pause status in the future.

At this point, I learned that my build script was not working properly. I was initially using `tsc` to transpile the JavaScript, but this broke once I introduced ES module imports for `Pause` and `Settings` since the output was not bundled for browser execution. To fix this, I set up the ESBuild bundler which played a lot better with my setup and eliminated the errors I was seeing.

Now that the script was working, I switched my focus to cleaning up the HTML. GitHub Copilot had introduced a lot of unnecessary structure that I wanted to remove to flatten the structure of the DOM. I also renamed some classes and IDs to be more descriptive. Next, I refactored the CSS, removing a lot of rules which weren’t really doing anything and changing specificity in some places. This resulted in a much nicer CSS file and sets me up well to introduce dark mode in the future. 

### Takeaways

It was really nice being able to use AI to generate a functioning UI. Especially since I’m not very focused on aesthetic originality for this project, there’s no tradeoff to getting to something functional in seconds. With that said, I found Copilot to be a much more effective tool for scaffolding than as an iterative collaborator. Generally speaking, I know how to achieve my goals; AI allows me to skip the tediousness of setting everything up, but it gets in the way when I’m working on the fine details. I prefer to clean up the generated code manually instead of re-prompting, which I fear would just compound the structural issues it introduces.

![image.png](Entry%2001%20-%20Creating%20a%20Popup!/image.png)