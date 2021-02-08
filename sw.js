let deferredPrompt;
const cacheName = "cache-v1";
const resourcesToPrecache = [
  "/",
  "index.html",
  "style.css",
  "assets/bart.jpg",
  "assets/homer.jpg",
  "assets/lisa.jpg",
  "assets/maggie.jpg",
  "assets/marge.jpg",
];

self.addEventListener("install", (event) => {
  console.log("install event");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activate event");
});

self.addEventListener("fetch", (event) => {
  console.log("fetch event", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});
