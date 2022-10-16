import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import SchulzTraining from "./SchulzTraining.component";

const SchulzTrainingContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createSchulzTrainingWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Trening S")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createSchulzTrainingWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "Trening s",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <SchulzTraining
      onCreateActivityWithNoContent={createSchulzTrainingWithNoContent}
      onCreateActivityWithContent={createSchulzTrainingWithContent}
    />
  );
};

export default SchulzTrainingContainer;
