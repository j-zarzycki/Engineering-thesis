import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import Walking from "./Walking.component";

const WalkingContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const dispatch = useAppDispatch();
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

  const createWalkingWithContent = () => {
    dispatch(
      createNote({
        contentName: "Spacer",
        title: "Spacer",
        description: "Co zaobserwowałeś/aś po spacerze? Jak się czułeś/aś?",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
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
