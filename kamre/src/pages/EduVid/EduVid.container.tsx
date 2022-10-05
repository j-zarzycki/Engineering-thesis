import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import EduVid from "./EduVid.component";

const EduVidContainer: React.FC = () => {
  const createEduVid = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "EduVid")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <EduVid createEduVid={createEduVid} />;
};

export default EduVidContainer;
