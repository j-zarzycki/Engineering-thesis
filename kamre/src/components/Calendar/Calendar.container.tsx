/* eslint-disable */

import React, { useState, useEffect } from "react";
import moment from "moment";

import Calendar from "./Calendar.component";
import apiService from "@Services/api.service";

const CalendarContainer: React.FC = () => {
  let days: React.ReactElement[] = [];
  const [startDate, setStartDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(
    Number(moment().format("YYYY")),
  );
  const [currentMonth, setCurrentMonth] = useState(
    Number(moment().format("M")),
  );
  const dayOfWeek = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

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

  useEffect(() => {
  }, [currentMonth]);

  return (
    <Calendar
      dayOfWeek={dayOfWeek}
      startDate={startDate}
      currentYear={currentYear}
      currentMonth={currentMonth}
      onNextMonthClick={onNextMonthClick}
      onPreviousMonthClick={onPreviousMonthClick}
    />
  );
};

export default CalendarContainer;
