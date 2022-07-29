import React from 'react';
import { IonButton } from '@ionic/react';

interface IProps {
  text: string;
  type: 'button' | 'reset' | 'submit';
  onClick: any;
}

const SaveButton: React.FC<IProps> = (props) => {
  const { text, type, onClick } = props;
  return (
    <IonButton type={type} onClick={onClick}>
      {text}
    </IonButton>
  );
};

export default SaveButton;
