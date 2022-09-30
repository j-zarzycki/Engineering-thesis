/* eslint-disable */

import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import ReactCalendar from "@Components/Calendar";

import "./Calendar.style.scss";

const Calendar: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <ReactCalendar />
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
