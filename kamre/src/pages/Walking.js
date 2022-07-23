/* eslint-disable */

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Walking.css';
import BackButton from "../components/BackButton";

const Walking = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-title">Spacer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <div>
                <BackButton defaultHref ="/home"/>
            </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Walking;
  