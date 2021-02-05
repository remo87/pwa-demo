const cacheName = "cache-v1";
const resourcesToPrecache = [
  "/",
  "index.html",
  "style.css",
  "assets/bart",
  "assets/homer",
  "assets/lisa",
  "assets/maggie",
  "assets/marge",
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
});
