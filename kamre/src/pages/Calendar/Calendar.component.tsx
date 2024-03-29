import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import { CalendarResponseType, CalendarDayType } from "@Types/calendar.type";
import ReactCalendar from "@Components/Calendar";
import ShowHideText from "@Components/ShowHideText";

import "./Calendar.style.scss";

interface IProps {
  isLoading: boolean;
  dayData: CalendarResponseType[];
  toast: ToastType;
  onChangeHandler(date: CalendarDayType): void;
  onMonthChangeHandler(month: number): void;
  setToast(toast: ToastType): void;
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

  const renderHeader = () => {
    return <div className="calendar__header" />;
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div>
          {renderHeader()}
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

export default React.memo(Calendar);
