import axios from "axios";
import {
  SERVER_URL_ALL_DAYS,
  SERVER_URL_ONE_DAY,
} from "@Constants/server.constants";

import { ICalendarResponse } from "@Types/calendar.type";

const GetAllDays = (userId: String | Number) => {
  return axios.get<ICalendarResponse>(
    `${SERVER_URL_ALL_DAYS}?user_id=${userId}`,
  );
};

const GetSpecificDay = (
  year: String,
  month: String,
  day: String,
  userId: String,
) => {
  return axios.get<ICalendarResponse>(
    `${SERVER_URL_ONE_DAY}?year=${year}&month=${month}&day=${day}&user_id=${userId}`,
  );
};

export default { GetAllDays, GetSpecificDay };
