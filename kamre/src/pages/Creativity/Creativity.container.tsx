import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createNote } from "@Store/slices/noteSlice";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import Creativity from "./Creativity.component";

const CreativityContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createCreativityWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Mięsień kreatywności")
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

  const createCreativityWithContent = () => {
    dispatch(
      createNote({
        contentName: "Mięsień kreatywności",
        title: "Mięsień kreatywności",
        description: "Wypisz swoje 10 sposóbw na kawę:",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  return (
    <Creativity
      onCreateActivityWithNoContent={createCreativityWithNoContent}
      onCreateActivityWithContent={createCreativityWithContent}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
    />
  );
};

export default CreativityContainer;
