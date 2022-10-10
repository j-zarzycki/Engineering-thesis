import axios from "axios";
import Cookies from "universal-cookie";
import io from "socket.io-client";

import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
  SERVER_URL_GET_MONTH,
  SERVER_URL_GET_DAY,
  SERVER_URL_CHAT,
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

const ChatSocketClient = () => {
  return io(SERVER_URL_CHAT, {
    extraHeaders: {
      auth_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZXZpY2VfaWQiOiJBMjFLUyIsImV4cCI6MTY2MzQwNTY3OH0.lsvKbEOmNJwYmWbKyMkgBPlI33O9OKD_R4j9t0AXdx0",
    },
  });
};

export default {
  ChatSocketClient,
  CreateActivityWithContent,
  CreateActivityWithNoContent,
  GetMonth,
  GetDay,
};
