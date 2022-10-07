import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Music from "./Music.component";

const MusicContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createMusicWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Złość")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createMusicWithContent = async (activityContent: String) => {
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Złość")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <Music
      onCreateActivityWithNoContent={createMusicWithNoContent}
      onCreateActivityWithContent={createMusicWithContent}
    />
  );
};

export default MusicContainer;
