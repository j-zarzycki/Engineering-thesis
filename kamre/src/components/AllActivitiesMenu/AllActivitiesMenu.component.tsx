import React, { forwardRef, useEffect, useState } from "react";

import "./AllActivitiesMenu.style.scss";
import {
  IonAccordion,
  IonAccordionGroup,
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
  const [AllActivitiesData, setAllActivitiesData] = useState<AllActivitiesType>(
    {
      Aktywne: [],
      Bierne: [],
      "Pozytywne emocje": [],
      "Zmiana myślenia": [],
    },
  );
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const onItemClick = (route: string) => {
    ref.current?.toggle();
    router.push(`${route}`, "forward");
  };

  const renderAllActivitiesCards = (type: string) => {
    let category: Array<RecommendationsType>;
    switch (type) {
      case "Aktywne":
        category = AllActivitiesData.Aktywne;
        break;
      case "Bierne":
        category = AllActivitiesData.Bierne;
        break;
      case "Pozytywne emocje":
        category = AllActivitiesData["Pozytywne emocje"];
        break;
      case "Zmiana myślenia":
        category = AllActivitiesData["Zmiana myślenia"];
        break;
      default:
        category = [];
    }
    return category.map((activity: RecommendationsType) => {
      console.log(`${activity.name}: ${activity.url}`);
      return (
        <IonItem
          className="menu-nested-item"
          onClick={() => onItemClick(activity.url)}
        >
          <IonLabel>{activity.name}</IonLabel>
        </IonItem>
      );
    });
  };

  const getAllActivitiesData = async () => {
    setIsLoading(true);
    await apiService
      .GetAllActivities()
      .then(({ data: { res } }) => {
        setAllActivitiesData(res);
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
        <IonAccordionGroup>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>Aktywne</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Aktywne")}
            </IonList>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>Bierne</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Bierne")}
            </IonList>
          </IonAccordion>
          <IonAccordion value="third">
            <IonItem slot="header" color="light">
              <IonLabel>Pozytywne emocje</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Pozytywne emocje")}
            </IonList>
          </IonAccordion>
          <IonAccordion value="fourth">
            <IonItem slot="header" color="light">
              <IonLabel>Zmiana myślenia</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Zmiana myślenia")}
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonMenu>
  );
});

export default AllMenu;
