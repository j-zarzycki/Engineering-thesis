import React, { useState, useEffect } from "react";
import { Clipboard } from "@capacitor/clipboard";
import { App as CapacitorApp } from "@capacitor/app";
import { useIonRouter } from "@ionic/react";

import apiService from "@Services/api.service";
import MigrateAccountPage from "./MigrateAccountPage.component";

const MigrateAccountPageContainer: React.FC = () => {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [pageController, setPageController] = useState({
    isWarningPageVisible: true,
    isMigrationPageVisible: false,
  });
  const router = useIonRouter();

  const getRecoveryCode = async () => {
    await apiService
      .GetRecoveryCode()
      .then(({ data: { recovery_code: userRecoveryCode } }) => {
        setRecoveryCode(userRecoveryCode);
      });
  };

  const onCopyButtonClickHandler = async () => {
    await Clipboard.write({
      string: recoveryCode,
    }).then(() => {
      setToast({ isOpen: true, message: "Kod został skopiowany do schowka!" });
    });

    router.push("/welcompage", "forward", "pop");
  };

  const onAcceptWarningClickHandler = () => {
    localStorage.setItem("shouldHomeRender", "false");
    const tabs = document.querySelector("ion-tab-bar");
    tabs!.style.display = "none";

    setPageController({
      isWarningPageVisible: false,
      isMigrationPageVisible: true,
    });
  };

  useEffect(() => {
    getRecoveryCode();
  }, []);

  CapacitorApp.addListener("backButton", () => {
    const { isMigrationPageVisible } = pageController;
    if (isMigrationPageVisible) {
      router.push("/migrateaccountpage");
    }
  });

  return (
    <MigrateAccountPage
      pageController={pageController}
      toast={toast}
      recoveryCode={recoveryCode}
      setToast={setToast}
      onCopyButtonClickHandler={onCopyButtonClickHandler}
      onAcceptWarningClickHandler={onAcceptWarningClickHandler}
    />
  );
};

export default React.memo(MigrateAccountPageContainer);
