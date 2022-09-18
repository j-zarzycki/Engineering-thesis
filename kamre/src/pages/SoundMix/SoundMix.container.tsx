import React from "react";

import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import SoundMix from "./SoundMix.component";

const SoundMixContainer: React.FC = () => {
  const createSoundMix = async () => {
    const currentDateWithTime = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "SoundMix")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <SoundMix createSoundMix={createSoundMix} />;
};

export default SoundMixContainer;
