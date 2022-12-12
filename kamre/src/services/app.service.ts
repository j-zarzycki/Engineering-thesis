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
    const shouldHomeRender = localStorage.getItem("shouldHomeRender");
    if (status.connectionType === "none") {
      window.location.replace("/403");
    }

    if (
      status.connectionType !== "none" &&
      window.location.pathname === "/403" &&
      shouldHomeRender === "true"
    ) {
      window.location.replace("/home");
    }

    if (
      status.connectionType !== "none" &&
      window.location.pathname === "/403" &&
      (shouldHomeRender === "false" ||
        shouldHomeRender === undefined ||
        shouldHomeRender === null)
    ) {
      window.location.replace("/welcompage");
    }
  });
};
