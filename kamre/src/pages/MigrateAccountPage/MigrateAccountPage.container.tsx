import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import MigrateAccountPage from "./MigrateAccountPage.component";

const MigrateAccountPageContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createMigrateAccountPageWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "MigrateAccountPage")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createMigrateAccountPageWithContent = async (
    activityContent: String,
  ) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "MigrateAccountPage",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <MigrateAccountPage
      onCreateActivityWithNoContent={createMigrateAccountPageWithNoContent}
      onCreateActivityWithContent={createMigrateAccountPageWithContent}
    />
  );
};

export default MigrateAccountPageContainer;
