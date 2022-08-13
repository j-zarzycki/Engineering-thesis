import React from "react";
import { IonButton } from "@ionic/react";

interface IProps {
  text: String;
  type: "button" | "reset" | "submit";
  onClick: any;
}

const SaveButton: React.FC<IProps> = (props: IProps) => {
  const { type, onClick, text } = props;

  return (
    <IonButton type={type} onClick={onClick}>
      {text}
    </IonButton>
  );
};

export default SaveButton;
