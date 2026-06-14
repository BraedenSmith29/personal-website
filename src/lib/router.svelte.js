export const router = $state({
	path: getPath()
});

function getPath() {
	if (typeof window === 'undefined') return '/';
	const path = window.location.hash ? window.location.hash.replace('#', '') : window.location.pathname;
	return path || '/';
}

export function navigate(path) {
	window.location.hash = path;
	router.path = path;
	window.scrollTo(0, 0);
}

if (typeof window !== 'undefined') {
	window.addEventListener('hashchange', () => {
		router.path = getPath();
	});
}