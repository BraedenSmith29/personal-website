<script lang="ts">
	import Nav from './components/Nav.svelte';
	import Home from './pages/Home.svelte';
	import Contact from './pages/Contact.svelte';
	import { router } from './lib/router.svelte';

	let Page = $derived.by(() => {
		if (router.path.startsWith('/contact')) {
			return Contact;
		} else {
			return Home;
		}
	});

	$inspect(router.path)
</script>

<Nav />

<main>
	<Page />
</main>
