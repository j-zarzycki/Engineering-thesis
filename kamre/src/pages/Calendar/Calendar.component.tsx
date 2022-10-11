import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import ReactCalendar from "@Components/Calendar";

import { CalendarResponseType, CalendarDayType } from "@Types/calendar.type";
import ShowHideText from "@Components/ShowHideText";
import "./Calendar.style.scss";

interface IProps {
  toast: { isOpen: boolean; message: string };
  isLoading: boolean;
  dayData: CalendarResponseType[];
  onChangeHandler: (e: CalendarDayType) => void;
  onMonthChangeHandler: (e: any) => void;
  setToast(value: {}): void;
}

const Calendar: React.FC<IProps> = (props: IProps) => {
  const {
    toast,
    isLoading,
    dayData,
    onChangeHandler,
    onMonthChangeHandler,
    setToast,
  } = props;

  const renderDayDataContent = () => {
    return dayData.map((day) => {
      return <ShowHideText dayContent={day} />;
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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div>
          {renderToast()}
          {renderLoader()}
          <ReactCalendar
            onMonthChange={onMonthChangeHandler}
            onChange={onChangeHandler}
          />
          <div className="calendar__wrapper">{renderDayDataContent()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
