import React from "react";
import { useHistory } from "react-router-dom";

import { createNote } from "@Store/slices/noteSlice";
import { useAppDispatch } from "@Hooks/useAppDispatch";
import PreviousDay from "./PreviousDay.component";

const PreviousDayContainer: React.FC = () => {
  const slideElements = 1;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onProceedButtonClick = () => {
    dispatch(
      createNote({
        contentName: "Poprzedni dzień",
        title: "Poprzedni dzień",
        description: "Wypisz pozytywne rzeczy poprzedniego dnia",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  return (
    <PreviousDay
      slideElements={slideElements}
      onProceedButtonClick={onProceedButtonClick}
    />
  );
};

export default PreviousDayContainer;
