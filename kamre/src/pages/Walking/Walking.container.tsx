import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Walking from "./Walking.component";

const WalkingContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const createWalkingWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Spacer")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => {
        setIsLoading(false);
        history.push("/home");
      })
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const createWalkingWithContent = async (activityContent: String) => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithContent(currentDateWithTime, activityContent, "Spacer")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => {
        setIsLoading(false);
        history.push("/home");
      })
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  return (
    <Walking
      onCreateActivityWithNoContent={createWalkingWithNoContent}
      onCreateActivityWithContent={createWalkingWithContent}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
    />
  );
};

export default WalkingContainer;
