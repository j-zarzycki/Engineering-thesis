type CalendarResponseType = {
  activity_category: String;
  activity_content: String[];
  activity_name: String;
  has_content: Boolean;
  registered_date: string;
};

type CalendarDayType = {
  day: string;
  month: string;
  year: string;
  fullDate: string;
};

interface ICalendarResponse {
  res: Array<CalendarResponseType>;
}

export type { CalendarResponseType, CalendarDayType, ICalendarResponse };
