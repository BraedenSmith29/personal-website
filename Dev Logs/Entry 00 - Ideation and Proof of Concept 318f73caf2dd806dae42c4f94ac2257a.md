# Entry 00 - Ideation and Proof of Concept

Date: February 13, 2026
Changes: https://github.com/BraedenSmith29/dedupe/commit/b752b11f5d3265b771f31703c27033d2b4601d1c

This log documents the development of “Dedupe”, a browser extension that prevents duplicate tabs.

### How This Started

I’ve always been terrible about creating a million duplicate tabs. This really came to a head when I was working at my last job and I would re-open the same Jira ticket over and over because it would get lost in all of my tab groups. After a few hours I would just need to close all of my tabs and start fresh. Eventually I reached my breaking point and initiated every good dev’s nuclear option: I pulled out my phone and put it on my ideas list, never to be seen again. At least, I hope I’m not the only dev with an infinite idea list.

Well, apparently, it was to be seen again! I ended up being laid off from my previous job (the one with the Jira tabs) and suddenly found myself with a lot of free time. I’ll be job hunting too, of course, but I wanted to polish up my personal project portfolio first. So, I broke out the idea list! I ended up going through it with my fiancée who helped me decide which ideas would be exciting to a user without taking too long.

When we got to this idea, I joked that it would either be impossible or it would be trivial, depending upon how nice the WebExtensions API is to me. I had been experimenting with using AI tools for development, so I decided to use Claude to generate the initial implementation as an experiment. It actually built something that worked quite well! I gave it a good bit of polish and was happy with the proof of concept, so I submitted it to Firefox and eventually had my first browser extension approved! This was a pretty cool feeling.

### Next Steps

I’m glad that the idea wasn’t impossible, but I’m not going to let it be trivial. I’ve identified some additional features I’d like to implement which would challenge me a bit more. With that said, I’m making sure to constrain the scope to something achievable. I have a habit of over-scoping my projects to the point that I quit them, so I’m trying to be disciplined this time. I’ve made sure that the feature set is achievable in a few weeks max and am looking forward to getting started! Some features I’m thinking of including are:

- Mass delete existing duplicate tabs from the extension popup
- A pause button to temporarily disable the extension
- Settings to control the logic that is used to find duplicate URLs
- Settings to control the types of interactions that will be subject to deduplication
- Settings to control the behavior after a duplicate is found

I’ll write about how this goes in the next log!