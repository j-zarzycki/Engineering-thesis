import React from "react";

import { getFullDateWithTime } from "../../utils/date";
import ConsciousShower from "./ConsciousShower.component";
import consciousShowerService from "../../services/consciousShower.service";

const ConsciousShowerContainer: React.FC = () => {
  const createConsciousShowerWithNoContent = async () => {
    await consciousShowerService
      .CreateConsciousShowerWithNoContent(getFullDateWithTime())
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createConsciousShowerWithContent = async (activityContent: String) => {
    await consciousShowerService
      .CreateConsciousShowerWithContent(getFullDateWithTime(), activityContent)
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <ConsciousShower
      onCreateActivityWithNoContent={createConsciousShowerWithNoContent}
      onCreateActivityWithContent={createConsciousShowerWithContent}
    />
  );
};

export default ConsciousShowerContainer;
