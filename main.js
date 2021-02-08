let deferredPrompt;

if ("serviceWorker" in navigator) {
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
  showInstallPromo();
});

// setTimeout(() => showInstallPromo(), 3000);

const showInstallPromo = () => {
  document.getElementById("modal").style.display = "flex";
};

const hideInstallPromo = () => {
  document.getElementById("modal").style.display = "none";
};
