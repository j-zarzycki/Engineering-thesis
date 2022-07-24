import React from 'react';
import {IonButton} from '@ionic/react';


interface Props {
    text : String
    type: "button" | "reset" | "submit"
}

export const SaveButton: (props: Props) => JSX.Element = (props:Props) => (

    <IonButton
        type={props.type}
        onClick ={() => {
            console.log("klik")
        }}
    >
        {props.text}
    </IonButton>
);
export default SaveButton