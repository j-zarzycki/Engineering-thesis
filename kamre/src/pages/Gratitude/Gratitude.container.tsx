import React, { useState } from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import Gratitude from "./Gratitude.component";

const GratitudeContainer: React.FC = () => {
  const [inputField, setInputField] = useState("");

  const onInputChange = (e: any) => setInputField(e.detail.value);

  const onSaveButtonClick = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithContent(currentDateWithTime, inputField, "Wdziecznosc")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };
  return (
    <Gratitude
      onInputChange={onInputChange}
      onSaveButtonClick={onSaveButtonClick}
    />
  );
};

export default GratitudeContainer;
