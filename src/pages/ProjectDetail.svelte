<script>
	import { projects } from '../lib/projects.js';
	import { router, navigate } from '../lib/router.svelte.js';
	import { GithubLogo, Globe, ArrowLeft } from 'phosphor-svelte';

	let id = $derived(router.path.split('/').pop());
	let project = $derived(projects.find(p => p.id === id));

	function handleBack(e) {
		e.preventDefault();
		navigate('/projects');
	}
</script>

<div class="container">
	{#if project}
		<a href="#/projects" onclick={handleBack} class="back-link">
			<ArrowLeft size={16} />
			<span>Back to Projects</span>
		</a>

		<header class="project-header">
			<div class="title-row">
				<h1>{project.name}</h1>
				{#if project.link}
					<a href={project.link} target="_blank" rel="noopener noreferrer" class="external-link">
						{#if project.link.includes('github.com')}
							<GithubLogo size={24} />
						{:else}
							<Globe size={24} />
						{/if}
					</a>
				{/if}
			</div>
			<p class="dates">{project.dates}</p>
			
			<div class="tech-stack">
				{#each project.tech as t}
					<span class="tech-tag">{t}</span>
				{/each}
			</div>
		</header>

		<div class="content">
			<section class="overview">
				<h2>Overview</h2>
				<p>{project.longDescription || project.description}</p>
			</section>

			<section class="highlights">
				<h2>Key Highlights</h2>
				<ul class="points">
					{#each project.points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</section>
		</div>
	{:else}
		<div class="not-found">
			<h1>Project Not Found</h1>
			<p>Sorry, the project you're looking for doesn't exist.</p>
			<a href="#/projects" onclick={handleBack}>Return to Projects</a>
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

	.project-header {
		margin-bottom: 3rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		padding-bottom: 2rem;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.title-row h1 {
		margin-bottom: 0;
		font-size: 3rem;
	}

	.external-link {
		color: var(--accent-color);
		display: flex;
		align-items: center;
		opacity: 0.8;
		transition: opacity 0.2s;
	}

	.external-link:hover {
		opacity: 1;
	}

	.dates {
		font-size: 1.1rem;
		color: var(--muted-color);
		margin-bottom: 1.5rem;
		font-style: italic;
	}

	.tech-stack {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.tech-tag {
		font-size: 0.85rem;
		background: rgba(0, 0, 0, 0.05);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		color: var(--muted-color);
		font-weight: 500;
	}

	.content h2 {
		font-size: 1.75rem;
		margin-bottom: 1.5rem;
		margin-top: 3rem;
	}

	.overview p {
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--text-color);
		max-width: 750px;
	}

	.points {
		list-style: none;
		max-width: 750px;
	}

	.points li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.points li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--accent-color);
	}

	.not-found {
		text-align: center;
		padding: 4rem 0;
	}

	@media (max-width: 600px) {
		.title-row h1 {
			font-size: 2.25rem;
		}
		
		.title-row {
			gap: 1rem;
		}
	}
</style>
