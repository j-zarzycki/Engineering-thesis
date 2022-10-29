import React from "react";

import { IoChevronBack } from "react-icons/io5";
import { useIonRouter, IonButtons } from "@ionic/react";

interface IProps {
  defaultHref: string;
}

const BackButton: React.FC<IProps> = (props: IProps) => {
  const { defaultHref } = props;
  const router = useIonRouter();

  const onClickHandler = () => {
    console.log("default = ", defaultHref);
    router.goBack();
  };

  return (
    <IonButtons slot="start">
      <IoChevronBack size={30} onClick={onClickHandler} />
    </IonButtons>
  );
};

export default BackButton;
