/*
import React, { useState } from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import Anger from "./Anger.component";

const AngerContainer: React.FC = () => {
  const [inputField, setInputField] = useState("");

  const onInputChange = (e: any) => setInputField(e.detail.value);

  const onSaveButtonClick = async () => {
    const currentDateWithTime = getFullDateWithTime();
    await apiService.CreateActivityWithContent(
      currentDateWithTime,
      inputField,
      "Zlosc",
    );
  };

  return (
    <Anger
      onSaveButtonClick={onSaveButtonClick}
      onInputChange={onInputChange}
    />
  );
};

export default AngerContainer;
*/

import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Anger from "./Anger.component";

const AngerContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createAngerWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Zlosc")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createAngerWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Zlosc")
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
