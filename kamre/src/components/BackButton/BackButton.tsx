import React from 'react';
import { IonBackButton, IonButtons } from '@ionic/react';

interface IProps {
  defaultHref: string;
}

const BackButton: React.FC<IProps> = (props) => {
  const { defaultHref } = props;
  return (
    <IonButtons slot="start">
      <IonBackButton defaultHref={defaultHref} />
    </IonButtons>
  );
};

export default BackButton;
