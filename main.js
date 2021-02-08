let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromo();
});

const showInstallPromo = () => {
  if (window.confirm("Do you want to install the app on your device?")) {
    deferredPrompt.prompt();
    if (deferredPrompt.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User canceled the install prompt");
    }
  }
};
