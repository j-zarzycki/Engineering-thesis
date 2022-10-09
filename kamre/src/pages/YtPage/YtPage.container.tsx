import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import YtPage from "./YtPage.component";

const YtPageContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createYtPageWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Swiadomy prysznic")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createYtPageWithContent = async (activityContent: String) => {
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
    <YtPage
      onCreateActivityWithNoContent={createYtPageWithNoContent}
      onCreateActivityWithContent={createYtPageWithContent}
    />
  );
};

export default YtPageContainer;
