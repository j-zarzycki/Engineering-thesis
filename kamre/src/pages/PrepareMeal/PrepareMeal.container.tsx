import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import PrepareMeal from "./PrepareMeal.component";

const PrepareMealContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createPrepareMealWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Przygotuj cos pysznego")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createPrepareMealWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Przygotuj cos pysznego")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <PrepareMeal
      onCreateActivityWithNoContent={createPrepareMealWithNoContent}
      onCreateActivityWithContent={createPrepareMealWithContent}
    />
  );
};

export default PrepareMealContainer;
