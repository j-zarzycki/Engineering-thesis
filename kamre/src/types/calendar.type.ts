type CalendarResponseType = {
  activity_content: String;
  activity_name: String;
  has_content: Boolean;
  registered_date: String;
};

interface ICalendarResponse {
  res: Array<CalendarResponseType>;
}

export type { CalendarResponseType, ICalendarResponse };
