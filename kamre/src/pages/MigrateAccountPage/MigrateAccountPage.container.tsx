import React, { useState, useEffect } from "react";
import { Clipboard } from "@capacitor/clipboard";
import { App as CapacitorApp } from "@capacitor/app";
import { useIonRouter } from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import useLocalStorage from "@Hooks/useLocalStorage";
import useLayout from "@Hooks/useLayout";
import apiService from "@Services/api.service";
import MigrateAccountPage from "./MigrateAccountPage.component";

const MigrateAccountPageContainer: React.FC = () => {
  const { setValue } = useLocalStorage("shouldHomeRender");
  const { disableTabBar } = useLayout();
  const router = useIonRouter();
  const [recoveryCode, setRecoveryCode] = useState("");
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [pageController, setPageController] = useState({
    isWarningPageVisible: true,
    isMigrationPageVisible: false,
  });

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
    setValue("false");
    disableTabBar();

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
