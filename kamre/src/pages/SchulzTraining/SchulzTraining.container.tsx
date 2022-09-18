import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import SchulzTraining from "./SchulzTraining.component";

const SchulzTrainingContainer: React.FC = () => {
  const createSchulzTraining = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "SchulzTraining")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <SchulzTraining createSchulzTraining={createSchulzTraining} />;
};

export default SchulzTrainingContainer;
