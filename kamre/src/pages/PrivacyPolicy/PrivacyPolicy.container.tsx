import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import MigrateAccountPage from "./PrivacyPolicy.component";

const PrivacyPolicyContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createPrivacyPolicyPageWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "PrivacyPolicy")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createPrivacyPolicyPageWithContent = async (
    activityContent: String,
  ) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "PrivacyPolicy",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <MigrateAccountPage
      onCreateActivityWithNoContent={createPrivacyPolicyPageWithNoContent}
      onCreateActivityWithContent={createPrivacyPolicyPageWithContent}
    />
  );
};

export default PrivacyPolicyContainer;
