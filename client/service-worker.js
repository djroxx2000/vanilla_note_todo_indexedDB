const cacheName = 'note-todo-pwa';
const staticAssets = [
	'./',
	'./index.html',
	'./services.js',
	'./styles.css',
	'./audio/task_complete.mp3',
];

self.addEventListener('install', async (evt) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async (evt) => {
	const req = evt.request;
	if (req.method == 'POST') {
		return;
	} else if (self.navigator.onLine) {
		evt.respondWith(fetchedData(req));
	} else {
		evt.respondWith(cachedData(req));
	}
});

async function cachedData(req) {
	const cache = await caches.open(cacheName);
	const cachedRes = await cache.match(req);
	return cachedRes || fetchedData(req);
}

async function fetchedData(req) {
	const cache = await caches.open(cacheName);
	try {
		const freshRes = await fetch(req);
		await cache.put(req, freshRes.clone());
		return freshRes;
	} catch (error) {
		const cachedRes = await cache.match(req);
		if (cachedRes) {
			return cachedRes;
		} else {
			console.log('Unable to fetch data from website');
			return null;
		}
	}
}
