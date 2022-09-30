/* eslint-disable */

import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import "./Calendar.style.scss";

enum allMonths {
  "Styczeń" = 1,
  "Luty" = 2,
  "Marzec" = 3,
  "Kwiecień" = 4,
  "Maj" = 5,
  "Czerwiec" = 6,
  "Lipiec" = 7,
  "Sierpień" = 8,
  "Wrzesień" = 9,
  "Październik" = 10,
  "Listopad" = 11,
  "Grudzień" = 12,
}

interface IProps {
  dayOfWeek: string[];
  currentYear: number;
  currentMonth: number;
  startDate: any;
  onNextMonthClick: () => void;
  onPreviousMonthClick: () => void;
}

const Calendar: React.FC<IProps> = (props: IProps) => {
  const [clickedDay, setClickedDay] = useState("");
  const {
    dayOfWeek,
    startDate,
    currentYear,
    currentMonth,
    onNextMonthClick,
    onPreviousMonthClick,
  } = props;

  const onDayClickHandler = (e: any) => {
    const { value } = e.target.attributes["aria-full-date"];
    setClickedDay(value);
  };

  const renderDays = () => {
    const transformedMonth =
      currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    const date = `${currentYear}${transformedMonth}01`;
    const thisDate = moment(date);
    const daysInMonth = moment(date).daysInMonth();
    const firstDayDate = moment(date).startOf("month");
    const previousMonth = moment(date).subtract(1, "month");
    const previousMonthDays = previousMonth.daysInMonth();
    const nextsMonth = moment(date).add(1, "month");
    let days: React.ReactElement[] = [];

    for (let i = firstDayDate.day(); i > 1; i--) {
      previousMonth.date(previousMonthDays - i + 2);
      days.push(
        <div className="kamre-calendar__day-wrapper">
          <span
            aria-day={moment(previousMonth).format("DD")}
            aria-month={moment(previousMonth).format("MM")}
            aria-year={moment(previousMonth).format("YYYY")}
            aria-full-date={moment(previousMonth).format("YYYY-MM-DD")}
            className="kamre-calendar__day kamre-calendar__day--prevMonth"
          >
            {moment(previousMonth).format("DD")}
          </span>
        </div>,
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      thisDate.date(i);
      days.push(
        <div className="kamre-calendar__day-wrapper">
          <span
            onClick={(e) => onDayClickHandler(e)}
            aria-day={moment(thisDate).format("DD")}
            aria-month={moment(thisDate).format("MM")}
            aria-year={moment(thisDate).format("YYYY")}
            aria-full-date={moment(thisDate).format("YYYY-MM-DD")}
            className={`kamre-calendar__day ${
              clickedDay === moment(thisDate).format("YYYY-MM-DD") &&
              "kamre-calendar__day--active"
            }`}
          >
            {moment(thisDate).format("DD")}
          </span>
          <div className="kamre-calendar__day-dot__wrapper">
            <div className="kamre-calendar__day-dot kamre-calendar__day-dot--blue" />
            <div className="kamre-calendar__day-dot kamre-calendar__day-dot--yellow" />
            <div className="kamre-calendar__day-dot kamre-calendar__day-dot--red" />
            <div className="kamre-calendar__day-dot kamre-calendar__day-dot--green" />
          </div>
        </div>,
      );
    }

    const daysCount = days.length;

    for (let i = 1; i <= 42 - daysCount; i++) {
      nextsMonth.date(i);
      days.push(
        <div className="kamre-calendar__day-wrapper">
          <span
            aria-day={moment(nextsMonth).format("DD")}
            aria-month={moment(nextsMonth).format("MM")}
            aria-year={moment(nextsMonth).format("YYYY")}
            aria-full-date={moment(nextsMonth).format("YYYY-MM-DD")}
            className="kamre-calendar__day kamre-calendar__day--prevMonth"
          >
            {moment(nextsMonth).format("DD")}
          </span>
        </div>,
      );
    }

    console.log("days = ", days);

    return days.map((day, index) => {
      if (index < 42) return day;
    });
  };

  const renderDaysOfWeek = () => {
    return dayOfWeek.map((day, index) => {
      return (
        <span className="kamre-calendar__dayOfWeek" week-day={day} key={index}>
          {day}
        </span>
      );
    });
  };
  const renderHeader = () => {
    return (
      <div className="kamre-calendar__header">
        <IoChevronBackOutline size={25} onClick={onPreviousMonthClick} />
        <span className="kamre-calendar__header-data">
          <span className="kamre-calendar__header-data--month">
            {allMonths[currentMonth]}
          </span>
          <span className="kamre-calendar__header-data--year">
            {currentYear}
          </span>
        </span>
        <IoChevronForwardOutline size={25} onClick={onNextMonthClick} />
      </div>
    );
  };
  const renderCalendar = () => {
    console.log("clicked = ", clickedDay);
    return (
      <>
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderDays()}
      </>
    );
  };

  return <div className="kamre-calendar">{renderCalendar()}</div>;
};

export default Calendar;
