import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import YtPage from "./YtPage.component";

const YtPageContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createYtPageWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Film edukacyjny")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createYtPageWithContent = async () => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, "Cos", "Film edukacyjny")
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
