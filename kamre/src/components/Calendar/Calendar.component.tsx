import React from "react";
import { IonLoading } from "@ionic/react";

import moment from "moment";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { CalendarResponseType } from "@Types/calendar.type";
import "./Calendar.style.scss";

enum AllMonths {
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
  monthData: CalendarResponseType[];
  isLoading: boolean;
  onNextMonthClick: () => void;
  onPreviousMonthClick: () => void;
  onDayClickHandler: (e: any) => void;
}

const Calendar: React.FC<IProps> = (props: IProps) => {
  const {
    dayOfWeek,
    currentYear,
    currentMonth,
    monthData,
    isLoading,
    onNextMonthClick,
    onPreviousMonthClick,
    onDayClickHandler,
  } = props;
  const days: React.ReactElement[] = [];
  const renderDot = (data: CalendarResponseType, date: moment.Moment) => {
    const {
      activity_category: activityCategory,
      registered_date: registeredDate,
    } = data;
    const transformedRegisteredData =
      moment(registeredDate).format("YYYY-MM-DD");
    const transformedCalendarDay = moment(date).format("YYYY-MM-DD");

    if (!(transformedRegisteredData === transformedCalendarDay)) return false;
    switch (activityCategory) {
      case "Aktywne":
        return (
          <div className="kamre-calendar__day-dot kamre-calendar__day-dot--yellow" />
        );
      case "Bierne":
        return (
          <div className="kamre-calendar__day-dot kamre-calendar__day-dot--green" />
        );
      case "Zmiana myślenia":
        return (
          <div className="kamre-calendar__day-dot kamre-calendar__day-dot--blue" />
        );
      case "Pozytywne emocje":
        return (
          <div className="kamre-calendar__day-dot kamre-calendar__day-dot--red" />
        );
      default:
        return null;
    }
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

    for (let i = firstDayDate.day(); i > 1; i -= 1) {
      previousMonth.date(previousMonthDays - i + 2);
      days.push(
        <div className="kamre-calendar__day-wrapper">
          <span
            date-day={moment(previousMonth).format("DD")}
            date-month={moment(previousMonth).format("MM")}
            date-year={moment(previousMonth).format("YYYY")}
            full-date={moment(previousMonth).format("YYYY-MM-DD")}
            className="kamre-calendar__day kamre-calendar__day--prevMonth"
          >
            {moment(previousMonth).format("DD")}
          </span>
        </div>,
      );
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
      thisDate.date(i);
      days.push(
        <div
          full-date={moment(thisDate).format("YYYY-MM-DD")}
          date-day={moment(thisDate).format("DD")}
          date-month={moment(thisDate).format("MM")}
          date-year={moment(thisDate).format("YYYY")}
          className="kamre-calendar__day-wrapper"
        >
          <span
            date-full-date={moment(thisDate).format("YYYY-MM-DD")}
            className="kamre-calendar__day"
            onClick={(e) => onDayClickHandler(e)}
            role="presentation"
          >
            {moment(thisDate).format("DD")}
          </span>
          <div className="kamre-calendar__day-dot__wrapper">
            {monthData.map((data) => renderDot(data, thisDate))}
          </div>
        </div>,
      );
    }

    const daysCount = days.length;

    for (let i = 1; i <= 42 - daysCount; i += 1) {
      nextsMonth.date(i);
      days.push(
        <div className="kamre-calendar__day-wrapper">
          <span
            date-day={moment(nextsMonth).format("DD")}
            date-month={moment(nextsMonth).format("MM")}
            date-year={moment(nextsMonth).format("YYYY")}
            date-full-date={moment(nextsMonth).format("YYYY-MM-DD")}
            className="kamre-calendar__day kamre-calendar__day--prevMonth"
          >
            {moment(nextsMonth).format("DD")}
          </span>
        </div>,
      );
    }

    return days.map((day, index) => {
      if (index < 42) {
        return day;
      }
      return null;
    });
  };

  const renderDaysOfWeek = () => {
    return dayOfWeek.map((day) => {
      return (
        <span className="kamre-calendar__dayOfWeek" week-day={day}>
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
            {AllMonths[currentMonth]}
          </span>
          <span className="kamre-calendar__header-data--year">
            {currentYear}
          </span>
        </span>
        <IoChevronForwardOutline size={25} onClick={onNextMonthClick} />
      </div>
    );
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

  const renderCalendar = () => {
    return (
      <>
        {renderLoader()}
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderDays()}
      </>
    );
  };

  return <div className="kamre-calendar">{renderCalendar()}</div>;
};

export default Calendar;
