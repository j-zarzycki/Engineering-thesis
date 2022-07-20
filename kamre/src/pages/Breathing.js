/* eslint-disable */

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Breathing.css';

const Breathing = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-title">Oddychanie</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Tab 1 page" />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Breathing;
  