import React, { forwardRef } from "react";
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
} from "@ionic/react";

import { AllActivitiesType } from "@Types/allActivities.type";
import { RecommendationsType } from "@Types/recommendations.type";

import "./AllActivitiesMenu.style.scss";

interface IProps {
  isLoading: boolean;
  toast: { isOpen: boolean; message: string };
  allActivitiesData: AllActivitiesType;
  onItemClick(route: string): void;
  setToast(toast: { isOpen: boolean; message: string }): void;
}

const AllActivitiesMenu = forwardRef((props: IProps, menuRef: any) => {
  const { isLoading, toast, allActivitiesData, onItemClick, setToast } = props;

  const renderAllActivitiesCards = (type: string) => {
    let category: Array<RecommendationsType>;
    switch (type) {
      case "Aktywne":
        category = allActivitiesData.Aktywne;
        break;
      case "Bierne":
        category = allActivitiesData.Bierne;
        break;
      case "Pozytywne emocje":
        category = allActivitiesData["Pozytywne emocje"];
        break;
      case "Zmiana myślenia":
        category = allActivitiesData["Zmiana myślenia"];
        break;
      default:
        category = [];
    }

    return category.map((activity: RecommendationsType) => {
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

  return (
    <IonMenu
      className="activities-menu"
      contentId="main-content"
      ref={menuRef}
      side="end"
    >
      {renderToast()}
      {renderLoader()}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aktywności</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonAccordionGroup>
          <IonAccordion value="first">
            <IonItem slot="header" className="activities-menu__group-title">
              <IonLabel>Aktywne</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Aktywne")}
            </IonList>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" className="activities-menu__group-title">
              <IonLabel>Bierne</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Bierne")}
            </IonList>
          </IonAccordion>
          <IonAccordion value="third">
            <IonItem slot="header" className="activities-menu__group-title">
              <IonLabel>Pozytywne emocje</IonLabel>
            </IonItem>
            <IonList slot="content">
              {renderAllActivitiesCards("Pozytywne emocje")}
            </IonList>
          </IonAccordion>
          <IonAccordion value="fourth">
            <IonItem slot="header" className="activities-menu__group-title">
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

export default AllActivitiesMenu;
