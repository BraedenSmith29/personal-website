<script>
  import LinkButton from './components/LinkButton.svelte';
  import Resume from '.././static/Resume.pdf';
</script>

<main>
  <h1 class="header-text">👋 Hey, I'm <span class="fancy-name">Braeden</span>!</h1>
  <p class="body-text">One day, this website may be cooler. Until then, here are some links!</p>
  <LinkButton href="https://github.com/braedensmith29">GitHub</LinkButton>
  <LinkButton href="https://linkedin.com/in/braedensmith29/">LinkedIn</LinkButton>
  <LinkButton href="{Resume}">Resume</LinkButton>
</main>
