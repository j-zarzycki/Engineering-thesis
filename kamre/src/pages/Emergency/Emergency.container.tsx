import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Emergency from "./Emergency.component";

const EmergencyContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createEmergencyWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Złość")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createEmergencyWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Złość")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <Emergency
      onCreateActivityWithNoContent={createEmergencyWithNoContent}
      onCreateActivityWithContent={createEmergencyWithContent}
    />
  );
};

export default EmergencyContainer;
