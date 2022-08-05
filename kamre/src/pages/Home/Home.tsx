import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle class="ion-title">Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonCard href="/walking" class="card-styles">
        <IonCardHeader>
          <IonCardTitle class="card-title">Spacer</IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="card-description">
          You'll lose all tasks, conversations and documents.
        </IonCardContent>
      </IonCard>

      <IonCard href="/breathing" class="card-styles">
        <IonCardHeader>
          <IonCardTitle class="card-title">Oddychanie</IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="card-description">
          You'll lose all tasks, conversations and documents.
        </IonCardContent>
      </IonCard>

      <IonCard href="/fivetoone" class="card-styles">
        <IonCardHeader>
          <IonCardTitle class="card-title">5-4-3-2-1</IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="card-description">
          You'll lose all tasks, conversations and documents.
        </IonCardContent>
      </IonCard>

      <IonCard href="/gratitude" class="card-styles">
        <IonCardHeader>
          <IonCardTitle class="card-title">Wdzięczność</IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="card-description">
          You'll lose all tasks, conversations and documents.
        </IonCardContent>
      </IonCard>

      <IonCard href="/ytpage" class="card-styles">
        <IonCardHeader>
          <IonCardTitle class="card-title">Film z youtube</IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="card-description">
          You'll lose all tasks, conversations and documents.
        </IonCardContent>
      </IonCard>

      <IonCard href="/emergency" class="card-styles">
        <IonCardHeader>
          <IonCardTitle class="card-title">Emergency</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </IonContent>
  </IonPage>
);

export default Home;
