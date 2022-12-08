import { App as CapacitorApp } from "@capacitor/app";
import { Network } from "@capacitor/network";

export const setupApp = () => {
  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack && localStorage.getItem("shouldHomeRender") === "false") {
      CapacitorApp.exitApp();
    }

    if (!canGoBack) {
      CapacitorApp.exitApp();
    }
  });

  Network.addListener("networkStatusChange", (status) => {
    if (status.connectionType === "none") {
      window.location.replace("/403");
    }

    if (status.connectionType !== "none") {
      window.location.replace("/home");
    }
  });
};
