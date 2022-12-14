import { App as CapacitorApp } from "@capacitor/app";
import { Network } from "@capacitor/network";

import authService from "@Services/auth.service";

export const setupApp = () => {
  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack && localStorage.getItem("shouldHomeRender") === "false") {
      CapacitorApp.exitApp();
    }

    if (!canGoBack) {
      CapacitorApp.exitApp();
    }
  });

  CapacitorApp.addListener("appStateChange", ({ isActive }) => {
    const deviceId = localStorage.getItem("deviceId");

    if (isActive) {
      authService.login(String(deviceId));
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
