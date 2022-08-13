/* eslint-disable */
import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import FiveToOne from "./FiveToOne.component";

const FiveToOneContainer: React.FC = () => {

  const createFiveToOne = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "5-4-3-2-1")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <FiveToOne createFiveToOne={createFiveToOne} />;
};

export default FiveToOneContainer;
