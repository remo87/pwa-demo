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

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: "Yay it works.",
    icon: "icon-256.png",
    badge: "icon-256.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click Received.");

  const notification = event.notification;
  const action = event.action;
  // if (action === "close") notification.close();
  // else
  event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
});

self.addEventListener("notificationclose", (event) => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  console.log("[Service Worker] Close notification.", primaryKey);
});
