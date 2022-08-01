import React from "react";
import { IonBackButton, IonButtons } from "@ionic/react";

interface Props {
  defaultHref: string;
}

const BackButton: React.FC<Props> = (props) => {
  const { defaultHref } = props;
  return (
    <IonButtons slot="start">
      <IonBackButton defaultHref={defaultHref} />
    </IonButtons>
  );
};
export default BackButton;
