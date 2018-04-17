//NEW
//This is the "Offline copy of pages" wervice worker
//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function(event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[PWA Builder] Cached index page during Install'+ response.url);
          return cache.addAll(['/magnolia/','/magnolia/index.html','/magnolia/cursos.html',
                               '/magnolia/professores.html','/magnolia/producao.html',
                               '/magnolia/matricula.html','/magnolia/matricula_google.html',
                               '/magnolia/sobre.html','/magnolia/contato.html',
                               '/magnolia/img/mag-logo.png','/magnolia/img/cinema.jpg',
                               '/magnolia/img/educacao.jpeg','/magnolia/img/humilde.png',
                               '/magnolia/img/icon.png','/magnolia/img/literatura.jgg',
                               '/magnolia/img/livia.jpg','/magnolia/img/music.jpg',
                               '/magnolia/img/pagano.jpg','/magnolia/img/pintura.jpg',
                               '/magnolia/img/producao.jpg','/magnolia/img/sad.png',
                               '/magnolia/img/teatro.jpg','/magnolia/img/thalis.jpg',
                               '/magnolia/css/style.css','/magnolia/sw.js'
          );
  }));
});

//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );

      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})
