// la sw debe estar en root del proyecto, porque si se estaría dentro de la carpetaassets solo el scope seria a la carpeta q esta contenida
// en .angular-cli.json en assets se debe declarar la sw
// un buen lugar para registrar la sw puede ser el archivo main.ts

const CACHE_NAME = "pwa-v3";

// archivos q prefieren hacer cache
const cacheUrls = [
  "/",
  "/styles.bundle.js",
  "/assets/offline.html"
]

// debido a q la sw se apagan y se prenden a conveniencia del navegador no se debe de confiar en el valor modificado de la variable entre eventos, si en algun momento se almacena en un evento q la variable sum vale 2 y la sw se apaga y se usa en otro evento, la variable sum ya no vale 2 sino tiene otro valor, se puede utilizar ev.waitUntil() para mantener la sw activa

// se programa la funcionalidad a traves de eventos
// los eventos se pueden enlazar a una funcion a traves del metodo addEventListener q es del scope global de sw
// se puede utilizar this, pero self si o si apunta al scope global
// la instalacion se da en cuando se detecta un cambio entre el nuevo archivo q llego a la sw y el viejo archivo, entonces instala el nuevo
self.addEventListener('install',function(ev){
  console.log(ev)
  // una pagina puede manejar varios caches utilizando una misma sw
  // solo se habre un cache identificado en la const CACHE_NAME
  caches.open(CACHE_NAME)
  .then(function(cache){
    // si en alguna parte falla algun metodo, no se ejecuta install, y la sw pasa a estado redundant (no se va activar)
    // agrega la urls a hacer el cache, cache la respuesta incluyendo js y css
    return cache.addAll(cacheUrls);
  })
})

// la activacion puede demrar mas q la instalacion, dependiendo de la configuracion del navegador o cuanto el usuario tarda en abandonar la pagina
self.addEventListener('active',function(ev){
  console.log('SW ACTUALIZADA');

  const clearCachePr = caches.keys().then(function(names){
    // el nuevo arreglo generado con map de varias promesas
    const clearOldPro = names.map((name)=> {
      // return una promesa
      // asegurar q solo el sw actual guarde cache y elimina las sw con otras versiones
      if(CACHE_NAME !== name) return caches.delete(name);
    })
  })
  // recibe una promesa como parametro
  // asegurar q se mantiene activa la sw hasta q se ejecuta la promesa
  ev.waitUntil(clearCachePr);
})

// se ejectua por cada peticion q se hace desde la pagina hacia la red
self.addEventListener('fetch',function(ev){
  // console.log(ev.request);
  // obj caches busque un archivo en el cache q pueda responder a la peticion q pasa por la sw (ev.request)
  const responsePr = caches.match(ev.request)
  .then(function(response){
    console.log(response)
    // si esta en el cache ya no se carga desde el servidor, se hace desde cache, ya no haciendo una peticion a la red
    if(response){
      return response;
    }
    // si no esta en el cache
    return fetch(ev.request);
  }).catch(err => {
    // si no hay internet el fetch no se ejecuta, por tanto se puede enviar un archivo cuando no hay internet
    // intento visitar una direccion, porque no se va responder a una hoja de estilo, imagen, .. con html, solo navegacion (pagina web)
    if(ev.request.mode == "navigate")
      return caches.match("/assets/offline.html");
  })

  ev.respondWith(responsePr)
})
