import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Bike from "./Bike.component";

const BikeContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();

  const createBikeWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Jazda na rowerze")
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

  const createBikeWithContent = async (activityContent: String) => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "Jazda na rowerze",
      )
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
    <Bike
      onCreateActivityWithNoContent={createBikeWithNoContent}
      onCreateActivityWithContent={createBikeWithContent}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
    />
  );
};

export default BikeContainer;
