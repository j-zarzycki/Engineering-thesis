import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import Bike from "./Bike.component";

const BikeContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const dispatch = useAppDispatch();

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

  const createBikeWithContent = () => {
    dispatch(
      createNote({
        contentName: "Jazda na rowerze",
        title: "Jazda na rowerze",
        description:
          "Co zaobserwowałeś/aś po wykonanej aktywności? Jak się czułeś/aś?",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
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
