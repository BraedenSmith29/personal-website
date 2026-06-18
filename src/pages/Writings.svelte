<script>
	import { navigate } from '../lib/router.svelte.js';
	import { writings } from '../lib/writings.js';

	function handleWritingClick(e, id) {
		e.preventDefault();
		navigate(`/writings/${id}`);
	}
</script>

<div class="container">
	<header class="writings-header">
		<h1>Writings</h1>
		<p class="subtitle">A collection of dev logs, thoughts, and documentation of my build process.</p>
	</header>

	<div class="writings-list">
		{#each writings as entry}
			<article class="writing-item" onclick={(e) => handleWritingClick(e, entry.id)}>
				<div class="writing-header-row">
					<div class="writing-title-group">
						<a class="title-link" onclick={(e) => handleWritingClick(e, entry.id)}>
							<h2>{entry.title}</h2>
						</a>
					</div>
					<span class="dates">{entry.date}</span>
				</div>

				<p class="description">{entry.description}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.writings-header {
		margin-bottom: 2rem;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--muted-color);
		margin-bottom: 0;
	}

	.writings-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.writing-item {
		padding: 1.5rem;
		margin: 0 -1.5rem;
		cursor: pointer;
		transition: background-color 0.2s ease, opacity 0.2s ease;
		position: relative;
	}

	.writing-item:hover {
		background-color: rgba(0, 0, 0, 0.03);
		opacity: 0.9;
		border-radius: 8px;
	}

	.writing-item:not(:last-child)::after {
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

	.writing-header-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.5rem;
		gap: 1rem;
	}

	.writing-title-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.writing-header-row h2 {
		margin-bottom: 0;
		font-size: 1.5rem;
	}

	.dates {
		font-size: 0.9rem;
		color: var(--muted-color);
		font-weight: 500;
		white-space: nowrap;
	}

	.description {
		font-size: 1rem;
		margin-bottom: 0;
		color: var(--text-color);
		overflow: hidden;
	}

	@media (max-width: 600px) {
		.writing-header-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.writing-header-row h2 {
			font-size: 1.25rem;
		}
	}
</style>
