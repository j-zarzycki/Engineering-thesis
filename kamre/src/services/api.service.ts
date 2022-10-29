import axios from "axios";
import Cookies from "universal-cookie";

import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
  SERVER_URL_GET_MONTH,
  SERVER_URL_GET_DAY,
  SERVER_URL_CHAT,
  SERVER_URL_ACCOUNT,
  SERVER_URL_CHAT_RESULT,
} from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";
import { ICalendarResponse } from "@Types/calendar.type";
import { ChatType } from "@Types/chat.type";

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

const ChatClient = (isContinuation: boolean) => {
  const token = cookies.get("token");
  return axios.get<ChatType>(SERVER_URL_CHAT, {
    headers: {
      token,
      is_continuation: isContinuation,
    },
  });
};

const ChatResult = (userAnswers: number[]) => {
  return axios.post(
    SERVER_URL_CHAT_RESULT,
    { usr_answers: userAnswers },
    { headers: authHeader() },
  );
};

const DeleteUser = () => {
  return axios.delete(SERVER_URL_ACCOUNT, { headers: authHeader() });
};

export default {
  ChatClient,
  ChatResult,
  CreateActivityWithContent,
  CreateActivityWithNoContent,
  GetMonth,
  GetDay,
  DeleteUser,
};
