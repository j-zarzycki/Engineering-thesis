import React from 'react';
import {IonButton} from '@ionic/react';


interface Props {
    text: String
    type: "button" | "reset" | "submit"
    onClick: any
}

export const SaveButton: (props: Props) => JSX.Element = (props: Props) => (

    <IonButton
        type={props.type}
        onClick={props.onClick}
    >
        {props.text}
    </IonButton>
);
export default SaveButton