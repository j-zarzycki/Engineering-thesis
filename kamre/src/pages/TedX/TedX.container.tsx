import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import TedX from "./TedX.component";

const TedXContainer: React.FC = () => {
  const createTedX = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "TedX")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <TedX createTedX={createTedX} />;
};

export default TedXContainer;
