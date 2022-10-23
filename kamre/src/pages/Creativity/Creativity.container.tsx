import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Anger from "./Creativity.component";

const CreativityContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createAngerWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Kreatywność")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createAngerWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "Kreatywność",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <Anger
      onCreateActivityWithNoContent={createAngerWithNoContent}
      onCreateActivityWithContent={createAngerWithContent}
    />
  );
};

export default CreativityContainer;
