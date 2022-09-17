/*
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
*/

import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Walking from "./Walking.component";

const WalkingContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createWalkingWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Spacer")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createWalkingWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Spacer")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <Walking
      onCreateActivityWithNoContent={createWalkingWithNoContent}
      onCreateActivityWithContent={createWalkingWithContent}
    />
  );
};

export default WalkingContainer;
