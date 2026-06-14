export const projects = [
	{
		id: 'animap',
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
		],
		longDescription: 'AniMap was born out of the frustration of trying to find the "correct" watch order for complex anime franchises. While sites like MyAnimeList provide relationship data, it is often buried in sub-pages. AniMap aggregates this data into a single, interactive node-link diagram.\n\nThe backend is written in Go, which handles the recursive fetching and caching of data from the Jikan API (a community MAL API). The frontend is a React application using D3.js for the force-directed graph visualization. One of the biggest challenges was managing the rate limits of the public API, which I solved by implementing a persistent cache and a request queue with exponential backoff.'
	},
	{
		id: 'dedupe',
		name: 'Dedupe: Tab Deduplicator',
		tech: ['TypeScript', 'WebExtensions API'],
		dates: 'February 2026 - March 2026',
		link: 'https://github.com/BraedenSmith29/dedupe',
		description: 'Dedupe is a browser extension that minimizes duplicate tabs, keeping you organized and saving some system resources.',
		points: [
			'Built and published a Firefox extension using TypeScript and the WebExtensions API, available on the Add-Ons store.',
			'Solved browser event race conditions by designing a state machine that defers deduplication decisions until all relevant lifecycle data has been collected.',
			'Implemented a full settings system with configurable deduplication behavior, domain whitelisting/blacklisting, pause toggling, and keyboard shortcuts.'
		],
		longDescription: 'Dedupe is a productivity tool designed for power users who find themselves with dozens of open tabs. It automatically detects when you open a URL that is already open in another tab and intelligently handles the duplication based on your settings.\n\nDeveloping a browser extension presented unique challenges, particularly regarding the asynchronous nature of the WebExtensions API. I had to ensure that the extension didn\'t accidentally close tabs that were in the process of redirecting or loading. The project is fully open-source and has been a great exercise in TypeScript and cross-browser compatibility.'
	},
	{
		id: 'homelab',
		name: 'Personal Homelab Server',
		tech: ['Ubuntu Server', 'Bash', 'Docker'],
		dates: 'Ongoing',
		description: 'Built and maintain a self-hosted homelab running Ubuntu Server with 15+ containerized services.',
		points: [
			'Architected multi-container infrastructure using Docker Compose to manage service dependencies, inter-container networking, and data persistence across the stack.',
			'Configured and automated encrypted backups to Backblaze B2 using cron jobs with bash scripts.',
			'Implemented security including container isolation, SSH key authentication, and least-privilege user permissions.'
		],
		longDescription: 'My homelab is my playground for DevOps and system administration. What started as a single old laptop has grown into a dedicated server running a variety of services including Nextcloud for file storage, Pi-hole for network-wide ad blocking, and various development environments.\n\nI use Docker for almost everything to keep the host system clean and make migrations easy. Monitoring is handled via Prometheus and Grafana, giving me real-time insights into resource usage and service health. This project has taught me more about networking, security, and Linux than any class ever could.'
	}
];
