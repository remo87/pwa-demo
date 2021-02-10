"use strict";

const applicationServerPublicKey =
  "BHENLuD--woX1DilPIVzIwmBMpI47xih8jrej2_yGWo3B5eF-TlcYncH9omVkOJyPF2yT4CTUIwOgZ8AJQ_tiSM";

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

let deferredPrompt;

if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("sw registered", reg);
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
  deferredPrompt = null;
  showInstallPromo();
});

Notification.requestPermission((status) => {
  console.log("Notification permission status", status);
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

// setTimeout(() => showInstallPromo(), 3000);

const showInstallPromo = () => {
  document.getElementById("modal").style.display = "flex";
};

const hideInstallPromo = () => {
  document.getElementById("modal").style.display = "none";
};
