import React, { useState, useEffect } from "react";
import { useIonRouter, useIonViewWillEnter } from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import { CalendarResponseType, CalendarDayType } from "@Types/calendar.type";
import apiService from "@Services/api.service";
import Calendar from "./Calendar.component";

const CalendarContainer: React.FC = () => {
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [dayData, setDayData] = useState<CalendarResponseType[]>([]);
  const [clickedDay, setClickedDay] = useState<CalendarDayType>({
    day: "",
    month: "",
    year: "",
    fullDate: "",
  });

  const onChangeHandler = (date: CalendarDayType) => {
    setClickedDay(date);
  };

  const onMonthChangeHandler = (_month: number) => {
    const activeElements = document.querySelectorAll(
      ".kamre-calendar__day--active",
    );
    activeElements.forEach((elem) => {
      elem?.classList.remove("kamre-calendar__day--active");
    });
    setDayData([]);
    console.log(_month);
  };

  const getDayData = async () => {
    const { day, month, year } = clickedDay;

    setIsLoading(true);
    await apiService
      .GetDay(day, month, year)
      .then(({ data: { res } }) => {
        setDayData(res);
      })
      .finally(() => setIsLoading(false))
      .catch(() => {
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas wczytywania danych.",
        });

        router.push("/", "forward");
      });
  };

  useIonViewWillEnter(() => {
    setDayData([]);
  });

  useEffect(() => {
    if (!firstLoad) {
      getDayData();
    }

    setFirstLoad(false);
  }, [clickedDay]);

  return (
    <Calendar
      toast={toast}
      setToast={setToast}
      isLoading={isLoading}
      dayData={dayData}
      onChangeHandler={onChangeHandler}
      onMonthChangeHandler={onMonthChangeHandler}
    />
  );
};

export default React.memo(CalendarContainer);
