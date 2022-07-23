import React from 'react';
import { IonBackButton, IonButtons} from '@ionic/react';


interface Props {
    defaultHref : string;
}

export const BackButton: (props: Props) => JSX.Element = (props:Props) => (

        <IonButtons slot="start">
            <IonBackButton defaultHref ={props.defaultHref} />
        </IonButtons>


);
export default BackButton