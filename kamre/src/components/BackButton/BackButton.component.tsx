import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useIonRouter, IonButtons } from "@ionic/react";

const BackButton: React.FC = () => {
  const router = useIonRouter();

  const onClickHandler = () => router.goBack();

  return (
    <IonButtons slot="start">
      <IoChevronBack size={30} onClick={onClickHandler} />
    </IonButtons>
  );
};

export default BackButton;
