<script>
	import Nav from './components/Nav.svelte';
	import Home from './pages/Home.svelte';
	import Resume from './pages/Resume.svelte';
	import Projects from './pages/Projects.svelte';
	import ProjectDetail from './pages/ProjectDetail.svelte';
	import Writings from './pages/Writings.svelte';
	import WritingDetail from './pages/WritingDetail.svelte';
	import Contact from './pages/Contact.svelte';
	import { router } from './lib/router.svelte.js';

	const pages = {
		'/': Home,
		'/resume': Resume,
		'/projects': Projects,
		'/writings': Writings,
		'/contact': Contact
	};

	let Page = $derived.by(() => {
		if (pages[router.path]) return pages[router.path];
		if (router.path.startsWith('/projects/')) return ProjectDetail;
		if (router.path.startsWith('/writings/')) return WritingDetail;
		return Home;
	});

	$inspect(router.path)
</script>

<Nav />

<main>
	<Page />
</main>


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