import React, { useState, useEffect } from "react";
import { Clipboard } from "@capacitor/clipboard";

import apiService from "@Services/api.service";
import MigrateAccountPage from "./MigrateAccountPage.component";

const MigrateAccountPageContainer: React.FC = () => {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });

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
  };

  useEffect(() => {
    getRecoveryCode();
  }, []);

  return (
    <MigrateAccountPage
      toast={toast}
      recoveryCode={recoveryCode}
      setToast={setToast}
      onCopyButtonClickHandler={onCopyButtonClickHandler}
    />
  );
};

export default React.memo(MigrateAccountPageContainer);
