<script>
	import { onMount } from 'svelte';
	import StatusLine from './StatusLine.svelte';
	import { router, navigate } from '../lib/router.svelte.js';

	let links = $state({});
	let indicatorStyle = $state('opacity: 0');

	function handleNav(e, newPath) {
		e.preventDefault();
		navigate(newPath);
	}

	function updateIndicator() {
		let activeEl = links[router.path];
		if (router.path.startsWith('/projects')) {
			activeEl = links['/projects'];
		}
		if (router.path.startsWith('/writings')) {
			activeEl = links['/writings'];
		}
		if (router.path === '/contact') {
			activeEl = links['/contact'];
		}
		if (activeEl) {
			const left = activeEl.offsetLeft + activeEl.offsetWidth / 2;
			indicatorStyle = `left: ${left}px; opacity: 1;`;
		} else {
			indicatorStyle = 'opacity: 0;';
		}
	}

	$effect(() => {
		// Re-run whenever the path changes
		router.path;
		// Wait for a tick to ensure DOM is ready (though usually fine in $effect)
		updateIndicator();
	});

	onMount(() => {
		updateIndicator();
		window.addEventListener('resize', updateIndicator);
		return () => window.removeEventListener('resize', updateIndicator);
	});
</script>

<nav>
	<div class="nav-content">
		<div class="nav-left">
			<a href="#/" onclick={(e) => handleNav(e, '/')} class="name">Braeden Smith</a>
		</div>
		
		<div class="nav-center">
			<ul class="links">
				<li class="nav-indicator" style={indicatorStyle} aria-hidden="true"></li>
				<li>
					<a 
						bind:this={links['/']}
						href="#/" 
						onclick={(e) => handleNav(e, '/')} 
						class:active={router.path === '/'}
					>
						Home
					</a>
				</li>
				<li>
					<a 
						bind:this={links['/resume']}
						href="#/resume" 
						onclick={(e) => handleNav(e, '/resume')} 
						class:active={router.path === '/resume'}
					>
						Resume
					</a>
				</li>
				<li>
					<a 
						bind:this={links['/projects']}
						href="#/projects" 
						onclick={(e) => handleNav(e, '/projects')} 
						class:active={router.path.startsWith('/projects')}
					>
						Projects
					</a>
				</li>
				<li>
					<a 
						bind:this={links['/writings']}
						href="#/writings" 
						onclick={(e) => handleNav(e, '/writings')} 
						class:active={router.path.startsWith('/writings')}
					>
						Writings
					</a>
				</li>
				<li>
					<a 
						bind:this={links['/contact']}
						href="#/contact" 
						onclick={(e) => handleNav(e, '/contact')} 
						class:active={router.path === '/contact'}
					>
						Contact
					</a>
				</li>
			</ul>
		</div>

		<div class="nav-right">
			<StatusLine />
		</div>
	</div>
</nav>

<style>
	nav {
		padding: 1rem 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(12px);
		z-index: 100;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.nav-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.nav-left {
		justify-self: start;
	}

	.nav-center {
		justify-self: center;
	}

	.nav-right {
		justify-self: end;
	}

	.name {
		font-family: 'Zodiak', serif;
		font-weight: 800;
		font-size: 2rem;
		color: var(--text-color);
		letter-spacing: -0.02em;
	}

	.links {
		display: flex;
		gap: 2.5rem;
		list-style: none;
		padding: 0.5rem 0;
		margin: 0;
		position: relative;
	}

	.nav-indicator {
		position: absolute;
		bottom: 6px;
		width: 4px;
		height: 4px;
		background: var(--accent-color);
		border-radius: 50%;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
		transform: translateX(-50%);
		z-index: 1;
	}

	.links a {
		font-weight: 500;
		font-size: 1rem;
		color: var(--text-color);
		opacity: 0.6;
		transition: all 0.3s ease;
		position: relative;
	}

	.links a:hover {
		opacity: 1;
	}

	.links a.active {
		color: var(--accent-color);
		opacity: 1;
	}

	@media (max-width: 1000px) {
		.nav-content {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
		}
		
		.nav-center {
			grid-row: 2;
			grid-column: 1 / span 2;
			order: 3;
		}

		nav {
			padding-top: 1rem;
			padding-bottom: .5rem
		}
	}

	@media (max-width: 600px) {
		.nav-content {
			display: flex;
			flex-direction: column;
			gap: 0;
			text-align: center;
		}

		.nav-right {
			display: none;
		}
		
		.links {
			gap: .75rem;
			padding: 0.4rem 1rem;
		}

		.name {
		}
	}
</style>
