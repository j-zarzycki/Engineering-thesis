import React, { useState, useEffect } from "react";

import Calendar from "./Calendar.component";
import calendarService from "../../services/calendar.service";
import { splitDate, getFullDate } from "../../utils/date";
import { CalendarResponseType } from "../../types/calendar.type";
import ErrorType from "../../types/error.type";

const CalendarContainer: React.FC = () => {
  const [dateInput, setDateInput] = useState<string | undefined | null>(
    getFullDate(),
  );
  const [activitiesFromOneDay, setActivitiesFromOneDay] = useState<
    CalendarResponseType[]
  >([]);
  const [error, setError] = useState<ErrorType>({ hasError: false, msg: "" });

  const getAllActivityFromOneDay = async (
    year: String,
    month: String,
    day: String,
  ) => {
    await calendarService
      .GetSpecificDay(year, month, day, "1")
      .then(({ data: { res } }) => setActivitiesFromOneDay(res))
      .catch((err) => setError({ hasError: true, msg: err }));
  };

  useEffect(() => {
    const currentDate = splitDate(String(dateInput));
    getAllActivityFromOneDay(
      currentDate.year,
      currentDate.month,
      currentDate.day,
    );
  }, [dateInput]);

  return (
    <Calendar
      activitiesFromOneDay={activitiesFromOneDay}
      error={error}
      setDateInput={setDateInput}
    />
  );
};

export default CalendarContainer;
