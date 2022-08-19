import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import Pet from "@Assets/image-12.png";
import Avatar from "@Assets/image.png";

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <div className="homepage-toolbar">
          <div className="ion-title">Home</div>
          <img className="homepage-toolbar__image" src={Avatar} alt="avatar" />
        </div>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen class="ion-padding-horizontal">
      <div className="homepage">
        <div className="homepage-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol className="homepage-header-wrapper">
                <IonRow>
                  <IonCol className="homepage__image">
                    <div>
                      <img src={Pet} alt="pet" />
                    </div>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol className="chat">
                    <IonCard class="chat-styles">
                      <IonCardContent class="chat-description">
                        <span>Hi!</span>
                      </IonCardContent>
                    </IonCard>

                    <IonCard class="chat-styles">
                      <IonCardContent class="chat-description">
                        <span>What would you like to do today?</span>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonCard href="/walking" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Spacer</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard href="/breathing" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Oddychanie</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonCard href="/fivetoone" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">5-4-3-2-1</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard href="/gratitude" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Wdzięczność</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonCard href="/ytpage" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">
                      Film z youtube
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard href="/anger" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Złość</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonCard href="/emergency" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Emergency</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard href="/calendar" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Calendar</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonCard href="/shower" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">Shower</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard href="/" class="card-styles">
                  <IonCardHeader>
                    <IonCardTitle class="card-title">-</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent class="card-description">
                    You'll lose all tasks, conversations and documents.
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default Home;