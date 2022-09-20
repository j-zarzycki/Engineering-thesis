import React from "react";
import { useHistory } from "react-router-dom";

import { IoChevronBack } from "react-icons/io5";
import { IonButtons } from "@ionic/react";

interface IProps {
  defaultHref: string;
}

const BackButton: React.FC<IProps> = (props: IProps) => {
  const { defaultHref } = props;
  const history = useHistory();

  const onClickHandler = () => history.push(defaultHref);

  return (
    <IonButtons slot="start">
      <IoChevronBack size={30} onClick={onClickHandler} />
    </IonButtons>
  );
};

export default BackButton;
