import React from "react";
import { IonContent, IonPage, IonDatetime } from "@ionic/react";

import { CalendarResponseType } from "@Types/calendar.type";
import ErrorType from "@Types/error.type";
import Header from "@Components/Header";
import ShowHideText from "@Components/ShowHideText";

import "./Calendar.style.css";

interface IProps {
  error: ErrorType;
  setDateInput: (value: string | undefined | null) => void;
  activitiesFromOneDay: CalendarResponseType[];
}

const Calendar: React.FC<IProps> = (props: IProps) => {
  const { setDateInput, activitiesFromOneDay, error } = props;

  const renderCalendarPageContent = () => {
    if (activitiesFromOneDay.length === 0) {
      return <div className="calendar-page__no-content">Nic tu nie ma :/</div>;
    }

    return activitiesFromOneDay.map((activity) => {
      return <ShowHideText dayContent={activity} />;
    });
  };

  const renderCalendarPage = () => {
    if (error.hasError) {
      return (
        <div className="calendar-page__error">
          Wystąpił problem podczas pobierania danych, przepraszamy.
        </div>
      );
    }

    return (
      <div className="calendar-page__calendar-wrapper">
        <Header title="Twoje zadania" subtitle="" />
        <IonDatetime
          presentation="date"
          onIonChange={({ detail: { value } }) => setDateInput(value)}
        />
        {renderCalendarPageContent()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="calendar-page">{renderCalendarPage()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
