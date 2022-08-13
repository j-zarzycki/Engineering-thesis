import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import Walking from "./Walking.component";

const WalkingContainer: React.FC = () => {
  const createWalking = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Spacer")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <Walking createWalking={createWalking} />;
};

export default WalkingContainer;
