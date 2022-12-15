import React, { useState, useEffect, forwardRef } from "react";
import { useIonRouter } from "@ionic/react";

import { RecommendationsType } from "@Types/recommendations.type";
import { ToastType } from "@Types/toast.type";
import apiService from "@Services/api.service";
import RecommendedActivitiesCards from "./RecommendedActivitiesCards.component";

const RecommendedActivitiesCardsContainer = forwardRef(
  (_, recommendedActivitiesCardsRef: any) => {
    const cardVariant = "small";
    const router = useIonRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [cardsData, setCardsData] = useState<RecommendationsType[]>([]);
    const [toast, setToast] = useState<ToastType>({
      isOpen: false,
      message: "",
    });

    const onCardClick = (route: string) => router.push(`${route}`, "forward");

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

          router.push("/403", "forward", "pop");
        });
    };

    useEffect(() => {
      getCardsData();
    }, []);

    return (
      <RecommendedActivitiesCards
        ref={recommendedActivitiesCardsRef}
        cardVariant={cardVariant}
        isLoading={isLoading}
        cardsData={cardsData}
        toast={toast}
        setToast={setToast}
        onCardClick={onCardClick}
      />
    );
  },
);

export default RecommendedActivitiesCardsContainer;
