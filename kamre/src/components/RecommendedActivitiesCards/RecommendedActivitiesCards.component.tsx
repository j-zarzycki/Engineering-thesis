import React, { forwardRef, useEffect, useState } from "react";

import "./RecommendedActivitiesCards.scss";

import ActivityCard from "@Components/ActivityCard";
import { useHistory } from "react-router";
import { RecommendationsType } from "@Types/recommendations.type";
import apiService from "@Services/api.service";
import { IonLoading, IonToast } from "@ionic/react";

const RecommendedActivitiesCardsContainer = forwardRef((_props, ref: any) => {
  const cardVariant = "small";
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [cardsData, setCardsData] = useState<RecommendationsType[]>([]);
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const renderHolder = () => {
    return <div className="activities-card__holder" />;
  };

  const onCardClick = (route: string) => history.push(`${route}`);

  const getCardsData = async () => {
    setIsLoading(true);
    await apiService
      .GetRecommended()
      .then(({ data: { res } }) => {
        setCardsData(res);
      })
      .finally(() => setIsLoading(false))
      .catch(() => {
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas wczytywania danych.",
        });

        history.push("/all");
      });
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

  useEffect(() => {
    getCardsData();
  }, []);

  return (
    <div ref={ref} className="activities-card">
      {renderToast()}
      {renderLoader()}
      {renderHolder()}
      {renderContext()}
    </div>
  );
});

export default RecommendedActivitiesCardsContainer;
