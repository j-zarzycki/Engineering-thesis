import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createNote } from "@Store/slices/noteSlice";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import PrepareMeal from "./PrepareMeal.component";

const PrepareMealContainer: React.FC = () => {
  const history = useHistory();
  const currentDateWithTime: String = getFullDateWithTime();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const dispatch = useAppDispatch();

  const createPrepareMealWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(
        currentDateWithTime,
        "Przygotuj coś pysznego",
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

  const createPrepareMealWithContent = () => {
    dispatch(
      createNote({
        contentName: "Przygotuj coś pysznego",
        title: "Przygotuj coś pysznego",
        description:
          "Pomyśl, jak czułeś/aś się podczas gotowania? Czy miałeś/aś jakieś problemy, opory?",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  return (
    <PrepareMeal
      onCreateActivityWithNoContent={createPrepareMealWithNoContent}
      onCreateActivityWithContent={createPrepareMealWithContent}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
    />
  );
};

export default PrepareMealContainer;
