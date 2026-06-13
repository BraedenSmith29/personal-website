<script>
	import Nav from './components/Nav.svelte';
	import Home from './pages/Home.svelte';
	import Resume from './pages/Resume.svelte';
	import Projects from './pages/Projects.svelte';
	import { router } from './lib/router.svelte.js';

	const pages = {
		'/': Home,
		'/resume': Resume,
		'/projects': Projects
	};

	let Page = $derived(pages[router.path] || Home);

	$inspect(router.path)
</script>

<Nav />

<main>
	<Page />
</main>

<footer>
	<div class="container">
		<p>&copy; 2026 Braeden Smith. Built with Svelte 5.</p>
	</div>
</footer>

<style>
	main {
		min-height: calc(100vh - 160px);
	}

	footer {
		text-align: center;
		padding: 4rem 0;
		font-size: 0.9rem;
		color: var(--muted-color);
		border-top: 1px solid rgba(122, 162, 247, 0.1);
	}
</style>