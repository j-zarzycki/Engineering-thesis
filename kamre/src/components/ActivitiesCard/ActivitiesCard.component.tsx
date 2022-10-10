import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { forwardRef } from "react";
import { useHistory } from "react-router-dom";

import "./ActivitiesCard.style.scss";

import ActivityCard from "@Components/ActivityCard";

const ActivitiesCard = forwardRef((_props, ref: any) => {
  const history = useHistory();
  const cardVariant = "medium";

  const renderHolder = () => {
    return <div className="activities-card__holder" />;
  };

  const onCardClick = (route: string) =>
    history.push(`/${route}`, { contentOfLocationState: true });

  const renderContext = () => {
    return (
      <div className="activities-card__wrapper">
        <IonGrid>
          <IonRow>
            <IonCol
              className="box-left"
              onClick={() => onCardClick("smallsteps")}
            >
              <ActivityCard variant={cardVariant} title="Małe krok" />
            </IonCol>
            <IonCol
              className="box-right"
              onClick={() => onCardClick("breathing")}
            >
              <ActivityCard variant={cardVariant} title="Oddychanie" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="box-left"
              onClick={() => onCardClick("fivetoone")}
            >
              <ActivityCard variant={cardVariant} title="5-4-3-2-1" />
            </IonCol>
            <IonCol
              className="box-right"
              onClick={() => onCardClick("gratitude")}
            >
              <ActivityCard variant={cardVariant} title="Wdzięczność" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="box-left" onClick={() => onCardClick("tedx")}>
              <ActivityCard variant={cardVariant} title="Film z yt" />
            </IonCol>
            <IonCol className="box-right" onClick={() => onCardClick("anger")}>
              <ActivityCard variant={cardVariant} title="Złość" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="box-left" onClick={() => onCardClick("shower")}>
              <ActivityCard variant={cardVariant} title="Prysznic" />
            </IonCol>
            <IonCol className="box-right" onClick={() => onCardClick("feet")}>
              <ActivityCard variant={cardVariant} title="Stopy" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="box-left" onClick={() => onCardClick("bike")}>
              <ActivityCard variant={cardVariant} title="Rower" />
            </IonCol>
            <IonCol
              className="box-right"
              onClick={() => onCardClick("previousday")}
            >
              <ActivityCard variant={cardVariant} title="Poprzedni dzień" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="box-left"
              onClick={() => onCardClick("previousday")}
            >
              <ActivityCard
                variant={cardVariant}
                title="Przygotuj coś pysznego"
              />
            </IonCol>
            <IonCol
              className="box-right"
              onClick={() => onCardClick("goodword")}
            >
              <ActivityCard variant={cardVariant} title="Dobre słowo" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="box-left" onClick={() => onCardClick("music")}>
              <ActivityCard variant={cardVariant} title="Muzyka klasyczna" />
            </IonCol>
            <IonCol
              className="box-right"
              onClick={() => onCardClick("weights")}
            >
              <ActivityCard variant={cardVariant} title="Ciężary" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="box-left"
              onClick={() => onCardClick("visualization")}
            >
              <ActivityCard variant={cardVariant} title="Wizualizacja" />
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
