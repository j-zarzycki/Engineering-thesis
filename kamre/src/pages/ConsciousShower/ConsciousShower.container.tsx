import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createNote } from "@Store/slices/noteSlice";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import ConsciousShower from "./ConsciousShower.component";

const ConsciousShowerContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createConsciousShowerWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Świadomy prysznic")
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

  const createConsciousShowerWithContent = () => {
    dispatch(
      createNote({
        contentName: "Świadomy prysznic",
        title: "Świadomy prysznic",
        description:
          "Co zaobserwowałeś/aś po wykonanym ćwiczeniu? Jak się czułeś/aś?",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  return (
    <ConsciousShower
      onCreateActivityWithNoContent={createConsciousShowerWithNoContent}
      onCreateActivityWithContent={createConsciousShowerWithContent}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
    />
  );
};

export default ConsciousShowerContainer;
