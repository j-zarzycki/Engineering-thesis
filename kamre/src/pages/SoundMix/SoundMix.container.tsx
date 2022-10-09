import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import SoundMix from "./SoundMix.component";

const SoundMixContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createSoundMixWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Piosenka")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createSoundMixWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "Piosenka",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <SoundMix
      onCreateActivityWithNoContent={createSoundMixWithNoContent}
      onCreateActivityWithContent={createSoundMixWithContent}
    />
  );
};

export default SoundMixContainer;
