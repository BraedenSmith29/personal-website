<script>
	import { GithubLogo, Globe } from 'phosphor-svelte';
	import { navigate } from '../lib/router.svelte.js';
	import { projects } from '../lib/projects.js';

	function handleProjectClick(e, id) {
		if (e.target.closest('a')) return; // Let links be links
		e.preventDefault();
		navigate(`/projects/${id}`);
	}
</script>

<div class="container">
	<header class="projects-header">
		<h1>Projects</h1>
		<p class="subtitle">A selection of things I've built, from web apps to browser extensions and infrastructure.</p>
	</header>

	<div class="projects-list">
		{#each projects as project}
			<article class="project-item" onclick={(e) => handleProjectClick(e, project.id)}>
				<div class="project-header-row">
					<div class="project-title-group">
						<a href="#/projects/{project.id}" class="title-link" onclick={(e) => handleProjectClick(e, project.id)}>
							<h2>{project.name}</h2>
						</a>
						{#if project.link}
							<a href={project.link} target="_blank" rel="noopener noreferrer" class="project-link" onclick={e => e.stopPropagation()}>
								{#if project.link.includes('github.com')}
									<GithubLogo size={18} />
									<span>GitHub</span>
								{:else}
									<Globe size={18} />
									<span>Project</span>
								{/if}
							</a>
						{/if}
					</div>
					<span class="dates">{project.dates}</span>
				</div>

				<div class="tech-stack">
					{#each project.tech as t}
						<span class="tech-tag">{t}</span>
					{/each}
				</div>

				<p class="description">{project.description}</p>

				<ul class="project-points">
					{#each project.points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</div>

<style>
	.projects-header {
		margin-bottom: 2rem;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--muted-color);
		margin-bottom: 0;
	}

	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.project-item {
		padding: 1.5rem;
		margin: 0 -1.5rem;
		cursor: pointer;
		transition: background-color 0.2s ease, opacity 0.2s ease;
		position: relative;
	}

	.project-item:hover {
		background-color: rgba(0, 0, 0, 0.03);
		opacity: 0.9;
		border-radius: 8px;
	}

	.project-item:not(:last-child)::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(0, 0, 0, 0.05);
	}

	.title-link {
		color: inherit;
		text-decoration: none;
	}

	.title-link:hover {
		text-decoration: none;
		color: var(--accent-color);
	}

	.title-link h2 {
		transition: color 0.2s;
	}

	.project-header-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.5rem;
		gap: 1rem;
	}

	.project-title-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.project-header-row h2 {
		margin-bottom: 0;
		font-size: 1.5rem;
	}

	.dates {
		font-size: 0.9rem;
		color: var(--muted-color);
		font-weight: 500;
		white-space: nowrap;
	}

	.tech-stack {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.tech-tag {
		font-size: 0.75rem;
		color: var(--muted-color);
		font-weight: 500;
		background: rgba(0, 0, 0, 0.05);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
	}

	.project-link {
		color: var(--accent-color);
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.project-link:hover {
		text-decoration: underline;
	}

	.description {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: var(--text-color);
	}

	.project-points {
		list-style: none;
	}

	.project-points li {
		position: relative;
		padding-left: 1.25rem;
		margin-bottom: 0.5rem;
		color: var(--text-color);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.project-points li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--accent-color);
	}

	@media (max-width: 600px) {
		.project-header-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.project-header-row h2 {
			font-size: 1.25rem;
		}
	}
</style>
