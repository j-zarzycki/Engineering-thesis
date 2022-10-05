import axios from "axios";
import Cookies from "universal-cookie";

import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
  SERVER_URL_GET_MONTH,
  SERVER_URL_GET_DAY,
} from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";
import { ICalendarResponse } from "@Types/calendar.type";

const cookies = new Cookies();

const authHeader = () => {
  const token = cookies.get("token");
  if (!token) return { token: "" };

  return { token };
};

const CreateActivityWithNoContent = (
  registeredDate: String,
  activityName: String,
) => {
  return axios.post<IDefaultServerResponse>(
    SERVER_URL_NO_CONTENT,
    {
      registered_date: registeredDate,
      activity_name: activityName,
    },
    { headers: authHeader() },
  );
};

const CreateActivityWithContent = (
  registeredDate: String,
  activityContent: String | String[],
  activityName: String,
) => {
  return axios.post<IDefaultServerResponse>(
    SERVER_URL_HAS_CONTENT,
    {
      registered_date: registeredDate,
      activity_content: activityContent,
      activity_name: activityName,
    },
    { headers: authHeader() },
  );
};

const GetMonth = (month: number, year: number) => {
  return axios.get<ICalendarResponse>(
    `${SERVER_URL_GET_MONTH}?month=${month}&year=${year}`,
    { headers: authHeader() },
  );
};

const GetDay = (day: string, month: string, year: string) => {
  return axios.get<ICalendarResponse>(
    `${SERVER_URL_GET_DAY}?day=${day}&month=${month}&year=${year}`,
    { headers: authHeader() },
  );
};

export default {
  CreateActivityWithContent,
  CreateActivityWithNoContent,
  GetMonth,
  GetDay,
};
