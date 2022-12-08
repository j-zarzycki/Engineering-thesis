import React, { useState } from "react";
import { useIonViewWillEnter, useIonViewDidEnter } from "@ionic/react";
import moment from "moment";

import { CalendarResponseType } from "@Types/calendar.type";
import apiService from "@Services/api.service";
import Calendar from "./Calendar.component";

interface IProps {
  onChange(e: any): void;
  onMonthChange(month: number): void;
}

const CalendarContainer: React.FC<IProps> = (props: IProps) => {
  const { onChange, onMonthChange } = props;

  const dayOfWeek = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
  const [isLoading, setIsLoading] = useState(false);
  const [monthData, setMonthData] = useState<CalendarResponseType[]>([]);
  const [currentYear, setCurrentYear] = useState(
    Number(moment().format("YYYY")),
  );
  const [currentMonth, setCurrentMonth] = useState(
    Number(moment().format("M")),
  );

  const onNextMonthClick = () => {
    setCurrentMonth((prevState) => prevState + 1);
    if (currentMonth >= 12) {
      setCurrentMonth(1);
      setCurrentYear((prevState) => prevState + 1);
    }
  };

  const onPreviousMonthClick = () => {
    setCurrentMonth((prevState) => prevState - 1);
    if (currentMonth <= 1) {
      setCurrentMonth(12);
      setCurrentYear((prevState) => prevState - 1);
    }
  };

  const getMonth = async () => {
    apiService.GetMonth(currentMonth, currentYear).then(({ data: { res } }) => {
      setMonthData(res);
    });
  };

  const onChangeHandle = (value: any) => {
    setIsLoading(false);
    const day = moment(value).format("DD");
    const month = moment(value).format("MM");
    const year = moment(value).format("YYYY");
    const date = {
      day,
      month,
      year,
      fullDate: value,
    };

    onChange(date);
  };

  const onMonthChangeHandle = () => {
    onMonthChange(currentMonth);
  };

  const onDayClickHandler = (e: any) => {
    const value = e.target.getAttribute("date-full-date");

    const activeElements = document.querySelectorAll(
      ".kamre-calendar__day--active",
    );

    activeElements.forEach((elem) => {
      elem?.classList.remove("kamre-calendar__day--active");
    });

    const currentElement = document.querySelector(
      `[date-full-date='${value}']`,
    );

    currentElement?.classList.add("kamre-calendar__day--active");

    onChangeHandle(value);
  };

  useIonViewWillEnter(() => {
    const activeElements = document.querySelectorAll(
      ".kamre-calendar__day--active",
    );

    activeElements.forEach((elem) => {
      elem?.classList.remove("kamre-calendar__day--active");
    });
  });

  useIonViewDidEnter(() => {
    const activeElements = document.querySelectorAll(
      ".kamre-calendar__day--active",
    );

    activeElements.forEach((elem) => {
      elem?.classList.remove("kamre-calendar__day--active");
    });

    getMonth();
    onMonthChangeHandle();
  }, [currentMonth]);

  return (
    <Calendar
      isLoading={isLoading}
      monthData={monthData}
      dayOfWeek={dayOfWeek}
      currentYear={currentYear}
      currentMonth={currentMonth}
      onNextMonthClick={onNextMonthClick}
      onPreviousMonthClick={onPreviousMonthClick}
      onDayClickHandler={onDayClickHandler}
    />
  );
};

export default CalendarContainer;
