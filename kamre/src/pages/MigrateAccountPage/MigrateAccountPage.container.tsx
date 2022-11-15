import React, { useState, useEffect } from "react";

import apiService from "@Services/api.service";
import MigrateAccountPage from "./MigrateAccountPage.component";

const MigrateAccountPageContainer: React.FC = () => {
  const [recoveryCode, setRecoveryCode] = useState("");

  const getRecoveryCode = async () => {
    await apiService
      .GetRecoveryCode()
      .then(({ data: { recovery_code: userRecoveryCode } }) => {
        setRecoveryCode(userRecoveryCode);
      });
  };

  useEffect(() => {
    getRecoveryCode();
  }, []);

  return <MigrateAccountPage recoveryCode={recoveryCode} />;
};

export default MigrateAccountPageContainer;
