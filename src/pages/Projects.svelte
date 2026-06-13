<script>
	import { GithubLogo, Globe } from 'phosphor-svelte';

	const projects = [
		{
			name: 'AniMap',
			tech: ['Go', 'React', 'Docker', 'Cloudflare'],
			dates: 'March 2026 - May 2026',
			link: 'https://github.com/BraedenSmith29/animap',
			description: 'A small web app for visualizing entire anime series at once, allowing insight into watch order, spin-off relationships, and more.',
			points: [
				'Built and shipped a full-stack web app leveraging third-party APIs to visualize anime series relationships.',
				'Implemented a recursive graph-building engine to efficiently map deep relationship networks as interactive graphs.',
				'Prevented over-fetching with smart lazy loading, improving clarity and cutting some load times by 90%+.',
				'Ensured reliability with third-party rate-limiting, request cancellation, caching, and robust error handling.',
				'Self-hosted on local homelab hardware using Docker and Cloudflare Tunnels for security.'
			]
		},
		{
			name: 'Dedupe: Tab Deduplicator',
			tech: ['TypeScript', 'WebExtensions API'],
			dates: 'February 2026 - March 2026',
			link: 'https://github.com/BraedenSmith29/dedupe',
			description: 'Dedupe is a browser extension that minimizes duplicate tabs, keeping you organized and saving some system resources.',
			points: [
				'Built and published a Firefox extension using TypeScript and the WebExtensions API, available on the Add-Ons store.',
				'Solved browser event race conditions by designing a state machine that defers deduplication decisions until all relevant lifecycle data has been collected.',
				'Implemented a full settings system with configurable deduplication behavior, domain whitelisting/blacklisting, pause toggling, and keyboard shortcuts.'
			]
		},
		{
			name: 'Personal Homelab Server',
			tech: ['Ubuntu Server', 'Bash', 'Docker'],
			dates: 'Ongoing',
			description: 'Built and maintain a self-hosted homelab running Ubuntu Server with 15+ containerized services.',
			points: [
				'Architected multi-container infrastructure using Docker Compose to manage service dependencies, inter-container networking, and data persistence across the stack.',
				'Configured and automated encrypted backups to Backblaze B2 using cron jobs with bash scripts.',
				'Implemented security including container isolation, SSH key authentication, and least-privilege user permissions.'
			]
		}
	];
</script>

<div class="container">
	<header class="projects-header">
		<h1>Projects</h1>
		<p class="subtitle">A collection of things I've built, from web apps to browser extensions and infrastructure.</p>
	</header>

	<div class="projects-grid">
		{#each projects as project}
			<article class="project-card">
				<div class="project-content">
					<div class="project-meta">
						<span class="dates">{project.dates}</span>
						<div class="tech-stack">
							{#each project.tech as t}
								<span class="tech-tag">{t}</span>
							{/each}
						</div>
					</div>
					
					<div class="project-title-row">
						<h2>{project.name}</h2>
						{#if project.link}
							<a href={project.link} target="_blank" rel="noopener noreferrer" class="project-link">
								{#if project.link.includes('github.com')}
									<GithubLogo size={24} />
								{:else}
									<Globe size={24} />
								{/if}
							</a>
						{/if}
					</div>

					<p class="description">{project.description}</p>

					<ul class="project-points">
						{#each project.points as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</div>
</div>

<style>
	.projects-header {
		margin-bottom: 4rem;
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--muted-color);
		max-width: 600px;
	}

	.projects-grid {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.project-card {
		background: var(--card-bg);
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(122, 162, 247, 0.1);
	}

	.project-content {
		padding: 3rem;
	}

	.project-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.dates {
		font-size: 0.85rem;
		color: var(--muted-color);
		font-weight: 500;
	}

	.tech-stack {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tech-tag {
		font-size: 0.75rem;
		background: rgba(122, 162, 247, 0.1);
		color: var(--accent-color);
		padding: 0.2rem 0.6rem;
		border-radius: 0.5rem;
		font-weight: 600;
	}

	.project-title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.project-title-row h2 {
		margin-bottom: 0;
		font-size: 2.25rem;
	}

	.project-link {
		color: var(--muted-color);
		transition: color 0.2s;
	}

	.project-link:hover {
		color: var(--accent-color);
	}

	.description {
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 2rem;
		color: var(--text-color);
	}

	.project-points {
		list-style: none;
	}

	.project-points li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: var(--text-color);
		opacity: 0.8;
	}

	.project-points li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--accent-color);
		font-weight: bold;
	}

	@media (max-width: 600px) {
		.project-content {
			padding: 2rem;
		}

		.project-title-row h2 {
			font-size: 1.75rem;
		}

		.project-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}
</style>
