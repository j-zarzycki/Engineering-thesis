import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Anger from "./Anger.component";

const AngerContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createAngerWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Złość")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createAngerWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Złość")
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

export default AngerContainer;
