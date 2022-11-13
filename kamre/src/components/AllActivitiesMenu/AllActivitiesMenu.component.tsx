import React, { forwardRef, useEffect, useState } from "react";

import "./AllActivitiesMenu.style.scss";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenu,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import apiService from "@Services/api.service";
import { useHistory } from "react-router";
import { AllActivitiesType } from "@Types/allActivities.type";
import { RecommendationsType } from "@Types/recommendations.type";

const AllMenu = forwardRef((_props, ref: any) => {
  const router = useIonRouter();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [AllActivitiesData, setAllActivitiesData] = useState<any>();
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const onItemClick = (route: string) => router.push(`/${route}`, "forward");

  const renderRecommendedActivitiesCards = () => {
    console.log(`Normal: ${AllActivitiesData.Aktywne.length}`);
    return AllActivitiesData.Aktywne.map((card: RecommendationsType) => {
      console.log(`${card.name}: ${card.url}`);
      return <div />;
    });
  };

  const getAllActivitiesData = async () => {
    setIsLoading(true);
    await apiService
      .GetAllActivities()
      .then(({ data: { res } }) => {
        setAllActivitiesData(res);
        console.log(res);
        console.log(AllActivitiesData);
      })
      .finally(() => setIsLoading(false))
      .catch(() => {
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas wczytywania danych.",
        });

        history.push("/all");
      });
    renderRecommendedActivitiesCards();
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

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="kamre-calendar__loader"
        isOpen={isLoading}
        message="Wczytywanie, proszę czekać"
      />
    );
  };

  useEffect(() => {
    getAllActivitiesData();
  }, []);

  return (
    <IonMenu contentId="main-content" ref={ref} side="end">
      {renderToast()}
      {renderLoader()}

      <IonHeader>
        <IonToolbar>
          <IonTitle>All acitivities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList menu-id="all-menu">
          <IonItem onClick={() => onItemClick("home")}>
            <IonLabel>Pokémon Yellow</IonLabel>
          </IonItem>
          <IonItem>
            <IonList>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
            </IonList>
          </IonItem>
          <IonList menu-id="all-menu">
            <IonItem>
              <IonLabel>Name</IonLabel>
            </IonItem>
          </IonList>
          <IonItem>
            <IonLabel>Mega Man X</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>The Legend of Zelda</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pac-Man</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Super Mario World</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
});

export default AllMenu;
