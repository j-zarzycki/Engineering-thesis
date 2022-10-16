import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Settings from "./Settings.component";

const SettingsContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createSettingsWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Settings")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createSettingsWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "Settings",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <Settings
      onCreateActivityWithNoContent={createSettingsWithNoContent}
      onCreateActivityWithContent={createSettingsWithContent}
    />
  );
};

export default SettingsContainer;
