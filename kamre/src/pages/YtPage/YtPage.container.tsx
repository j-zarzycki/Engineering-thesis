import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import YtPage from "./YtPage.component";

const YtPageContainer: React.FC = () => {
  const createPageYt = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "EduVid")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <YtPage createPageYt={createPageYt} />;
};

export default YtPageContainer;
