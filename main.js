"use strict";

const applicationServerPublicKey =
  "BHENLuD--woX1DilPIVzIwmBMpI47xih8jrej2_yGWo3B5eF-TlcYncH9omVkOJyPF2yT4CTUIwOgZ8AJQ_tiSM";

let isSubscribed = false;
let swRegistration = null;
let deferredPrompt;

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        Notification.requestPermission((status) => {
          console.log("Notification permission status", status);
          if (Notification.permission === "granted") {
            subscribeUser();
          }
        });
        console.log("sw registered", reg);
        swRegistration = swReg;
      })
      .catch((err) => {
        console.log("sw was not registered", err);
      });
  });
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("modal-ok").addEventListener("click", (e) => {
    console.log("should prompt");
    deferredPrompt.prompt();
    if (deferredPrompt.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User canceled the install prompt");
    }
    hideInstallPromo();
  });
  showInstallPromo();
});

function displayNotification() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      const options = {
        body: "Here is a notification body",
        icon: "icon-512.png",
        vibrate: [100, 50, 100],
        data: { primaryKey: 1 },
      };
      reg.showNotification("hello world", options);
    });
  }
}

setTimeout(() => displayNotification(), 3000);

const showInstallPromo = () => {
  document.getElementById("modal").style.display = "flex";
};

const hideInstallPromo = () => {
  document.getElementById("modal").style.display = "none";
};

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then(function (subscription) {
      console.log("User is subscribed:", subscription);

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();
    })
    .catch(function (err) {
      console.log("Failed to subscribe the user: ", err);
      updateBtn();
    });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
}
