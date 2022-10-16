import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import ColdWater from "./ColdWater.component";

const ColdWaterContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createColdWaterWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Swiadomy prysznic")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createColdWaterWithContent = async (activityContent: String) => {
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
    <ColdWater
      onCreateActivityWithNoContent={createColdWaterWithNoContent}
      onCreateActivityWithContent={createColdWaterWithContent}
    />
  );
};

export default ColdWaterContainer;
