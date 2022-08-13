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
