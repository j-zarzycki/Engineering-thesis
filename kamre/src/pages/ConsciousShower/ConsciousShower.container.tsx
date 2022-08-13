import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import ConsciousShower from "./ConsciousShower.component";

const ConsciousShowerContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createConsciousShowerWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Swiadomy prysznic")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createConsciousShowerWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "Swiadomy prysznic",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <ConsciousShower
      onCreateActivityWithNoContent={createConsciousShowerWithNoContent}
      onCreateActivityWithContent={createConsciousShowerWithContent}
    />
  );
};

export default ConsciousShowerContainer;
