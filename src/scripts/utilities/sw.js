// Minimum PWA
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('sw-cache').then(function (cache) {
            return cache.addAll([
                '/index.html',
                '/assets/images/logo-white-512.png',
                '/assets/images/logo-white-192.png',
                '/assets/css',
                '/assets/js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
