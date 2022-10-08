import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import { forwardRef } from "react";

import "./ActivitiesCard.style.scss";

const ActivitiesCard = forwardRef((_props, ref: any) => {
  const renderHolder = () => {
    return <div className="activities-card__holder" />;
  };

  const renderContext = () => {
    return (
      <div className="activities-card__wrapper">
        <IonGrid>
          <IonRow>
            <IonCol className="box-left">
              <IonCard href="/walking" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Spacer</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol className="box-right">
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
            <IonCol className="box-left">
              <IonCard href="/fivetoone" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">5-4-3-2-1</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
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
            <IonCol className="box-left">
              <IonCard href="/ytpage" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Film z youtube</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
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
            <IonCol className="box-left">
              <IonCard href="/emergency" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Emergency</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
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
            <IonCol className="box-left">
              <IonCard href="/shower" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Shower</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
              <IonCard href="/feet" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Stopy</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="box-left">
              <IonCard href="/bike" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">bike</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
              <IonCard href="/previousday" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Previous Day</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="box-left">
              <IonCard href="/preparemeal" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">
                    Przygotuj coś pysznego
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
              <IonCard href="/sufficient" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Sufficient</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="box-left">
              <IonCard href="/goodword" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Good Word</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-right">
              <IonCard href="/music" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">
                    Relaksująca Muzyka
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="box-left">
              <IonCard href="/weights" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Weights</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="box-left">
              <IonCard href="/visualization" class="card-styles">
                <IonCardHeader>
                  <IonCardTitle class="card-title">Visualization</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="card-description">
                  You'll lose all tasks, conversations and documents.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  };

  return (
    <div ref={ref} className="activities-card">
      {renderHolder()}
      {renderContext()}
    </div>
  );
});

export default ActivitiesCard;
