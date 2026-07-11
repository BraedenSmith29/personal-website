export const router = $state({
	path: getPath()
});

function getPath() {
	return window.location.pathname || '/';
}

export function navigate(path: string) {
	window.history.pushState(undefined, '', path);
	router.path = path;
	window.scrollTo(0, 0);
}

if (typeof window !== 'undefined') {
	window.addEventListener('popstate', () => {
		router.path = getPath();
	});
}