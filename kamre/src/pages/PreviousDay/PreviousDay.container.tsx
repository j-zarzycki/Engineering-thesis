import React from "react";
import { useIonRouter } from "@ionic/react";

import { createNote } from "@Store/slices/noteSlice";
import { useAppDispatch } from "@Hooks/useAppDispatch";
import PreviousDay from "./PreviousDay.component";

const PreviousDayContainer: React.FC = () => {
  const slideElements = 1;
  const router = useIonRouter();
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

    router.push("/note", "forward", "pop");
  };

  return (
    <PreviousDay
      slideElements={slideElements}
      onProceedButtonClick={onProceedButtonClick}
    />
  );
};

export default PreviousDayContainer;
