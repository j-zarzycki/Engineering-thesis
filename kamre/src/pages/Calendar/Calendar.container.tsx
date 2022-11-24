import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useIonViewWillEnter } from "@ionic/react";

import { CalendarResponseType, CalendarDayType } from "@Types/calendar.type";
import apiService from "@Services/api.service";
import Calendar from "./Calendar.component";

const CalendarContainer: React.FC = () => {
  const history = useHistory();
  const [dayData, setDayData] = useState<CalendarResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [clickedDay, setClickedDay] = useState<CalendarDayType>({
    day: "",
    month: "",
    year: "",
    fullDate: "",
  });

  const onChangeHandler = (e: CalendarDayType) => {
    setClickedDay(e);
  };

  const onMonthChangeHandler = (_month: number) => {
    console.log(_month);
    setDayData([]);
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

        history.push("/");
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
