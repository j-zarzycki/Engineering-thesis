import React, { forwardRef } from "react";
import { IonLoading, IonToast } from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import { RecommendationsType } from "@Types/recommendations.type";
import ActivityCard from "@Components/ActivityCard";

import "./RecommendedActivitiesCards.scss";

interface IProps {
  cardVariant: "big" | "medium" | "small";
  isLoading: boolean;
  toast: ToastType;
  cardsData: RecommendationsType[];
  setToast(toast: ToastType): void;
  onCardClick(route: string): void;
}

const RecommendedActivitiesCardsContainer = forwardRef(
  (props: IProps, recommendedActivitiesCardsRef: any) => {
    const { cardVariant, isLoading, toast, cardsData, setToast, onCardClick } =
      props;

    const renderHolder = () => {
      return <div className="activities-card__holder" />;
    };

    const renderLoader = () => {
      return (
        <IonLoading
          cssClass="kamre-calendar__loader"
          isOpen={isLoading}
          message="Wczytywanie, proszę czekać"
        />
      );
    };

    const renderToast = () => {
      const { isOpen, message } = toast;
      return (
        <IonToast
          isOpen={isOpen}
          onDidDismiss={() => setToast({ isOpen: false, message: "" })}
          message={message}
          duration={2500}
          position="top"
        />
      );
    };

    const renderRecommendedActivitiesCards = () => {
      return cardsData.map((card) => {
        return (
          <ActivityCard
            variant={cardVariant}
            title={card.name}
            onClick={() => onCardClick(card.url)}
          />
        );
      });
    };

    const renderContext = () => {
      return (
        <div className="activities-card__wrapper">
          {renderRecommendedActivitiesCards()}
        </div>
      );
    };

    return (
      <div ref={recommendedActivitiesCardsRef} className="activities-card">
        {renderToast()}
        {renderLoader()}
        {renderHolder()}
        {renderContext()}
      </div>
    );
  },
);

export default RecommendedActivitiesCardsContainer;
