import axios from "axios";

import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
  SERVER_URL_GET_MONTH,
  SERVER_URL_GET_DAY,
  SERVER_URL_CHAT,
  SERVER_URL_ACCOUNT,
  SERVER_URL_CHAT_RESULT,
  SERVER_URL_GET_RECOMMENDED,
  SERVER_URL_RECOVERY,
  SERVER_URL_GET_ALL,
} from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";
import { ICalendarResponse } from "@Types/calendar.type";
import { ChatType } from "@Types/chat.type";
import { IRecommendationsResponse } from "@Types/recommendations.type";
import { IAllActivitiesResponse } from "@Types/allActivities.type";

const authHeader = () => {
  const token = String(localStorage.getItem("token"));
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

const GetRecommended = () => {
  return axios.get<IRecommendationsResponse>(`${SERVER_URL_GET_RECOMMENDED}`, {
    headers: authHeader(),
  });
};

const GetAllActivities = () => {
  return axios.get<IAllActivitiesResponse>(`${SERVER_URL_GET_ALL}`);
};

const ChatClient = (isContinuation: boolean) => {
  const token = String(localStorage.getItem("token"));
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

const GetRecoveryCode = () => {
  return axios.get(SERVER_URL_RECOVERY, { headers: authHeader() });
};

const SendRecoveryCode = (deviceId: string, recoveryCode: string) => {
  return axios.post(SERVER_URL_RECOVERY, {
    device_id: deviceId,
    recovery_code: recoveryCode,
  });
};

export default {
  ChatClient,
  ChatResult,
  CreateActivityWithContent,
  CreateActivityWithNoContent,
  GetMonth,
  GetDay,
  GetRecommended,
  GetAllActivities,
  DeleteUser,
  GetRecoveryCode,
  SendRecoveryCode,
};
