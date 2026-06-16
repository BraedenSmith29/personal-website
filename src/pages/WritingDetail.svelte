<script>
	import { writings } from '../lib/writings.js';
	import { router, navigate } from '../lib/router.svelte.js';
	import { ArrowLeft } from 'phosphor-svelte';

	let id = $derived(router.path.split('/').pop());
	let entry = $derived(writings.find(w => w.id === id));

	function handleBack(e) {
		e.preventDefault();
		navigate('/writings');
	}
</script>

<div class="container">
	{#if entry}
		<a href="#/writings" onclick={handleBack} class="back-link">
			<ArrowLeft size={16} />
			<span>Back to Writings</span>
		</a>

		<header class="writing-header">
			<h1>{entry.title}</h1>
			<p class="dates">{entry.date}</p>
		</header>

		<div class="content">
			{@html entry.content.split('\n').map(line => {
				if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
				if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
				if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
				if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`;
				if (line.trim() === '') return '';
				
				// Basic image handling: ![alt](url)
				const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
				if (imgMatch) {
					const alt = imgMatch[1];
					let src = imgMatch[2];
					
					// Fix path for images
					if (entry.folder && !src.startsWith('http')) {
						src = `/Dev Logs/${entry.folder}/${src}`;
					} else if (!src.startsWith('http')) {
						src = `/Dev Logs/${src}`;
					}
					
					return `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px;" />`;
				}

				return `<p>${line}</p>`;
			}).join('')}
		</div>
	{:else}
		<div class="not-found">
			<h1>Entry Not Found</h1>
			<p>Sorry, the dev log you're looking for doesn't exist.</p>
			<a href="#/writings" onclick={handleBack}>Return to Writings</a>
		</div>
	{/if}
</div>

<style>
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--muted-color);
		margin-bottom: 2rem;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.back-link:hover {
		color: var(--accent-color);
		text-decoration: none;
	}

	.writing-header {
		margin-bottom: 3rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		padding-bottom: 2rem;
	}

	.writing-header h1 {
		margin-bottom: 0.5rem;
		font-size: 2.5rem;
	}

	.dates {
		font-size: 1.1rem;
		color: var(--muted-color);
		margin-bottom: 0;
		font-style: italic;
	}

	.content {
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--text-color);
		max-width: 750px;
	}

	.content :global(h1), .content :global(h2), .content :global(h3) {
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.content :global(p) {
		margin-bottom: 1.2rem;
	}

    .content :global(li) {
        margin-left: 1.5rem;
        list-style-type: disc;
    }

	.not-found {
		text-align: center;
		padding: 4rem 0;
	}
</style>
