const CACHE_NAME = 'magnolia';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                '/magnolia/',
                '/magnolia/index.html',
                '/magnolia/cursos.html',
                '/magnolia/professores.html',
                '/magnolia/producao.html',
                '/magnolia/matricula.html',
                '/magnolia/matricula_google.html',
                '/magnolia/sobre.html',
                '/magnolia/contato.html',
                '/magnolia/img/mag-logo.png',
                '/magnolia/img/cinema.jpg',
                '/magnolia/img/educacao.jpeg',
                '/magnolia/img/humilde.png',
                '/magnolia/img/icon.png',
                '/magnolia/img/literatura.jgg',
                '/magnolia/img/livia.jpg',
                '/magnolia/img/music.jpg',
                '/magnolia/img/pagano.jpg',
                '/magnolia/img/pintura.jpg',
                '/magnolia/img/producao.jpg',
                '/magnolia/img/sad.png',
                '/magnolia/img/teatro.jpg',
                '/magnolia/img/thalis.jpg',
                '/magnolia/css/style.css',
                '/magnolia/sw.js'
            ])
        })
    )
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});
