import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Bike from "./Bike.component";

const BikeContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createBikeWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Spacer")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createBikeWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Spacer")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <Bike
      onCreateActivityWithNoContent={createBikeWithNoContent}
      onCreateActivityWithContent={createBikeWithContent}
    />
  );
};

export default BikeContainer;
