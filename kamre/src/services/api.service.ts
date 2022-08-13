import axios from "axios";
import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
} from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";

const CreateActivityWithNoContent = (
  registeredDate: String,
  activityName: String,
) => {
  return axios.post<IDefaultServerResponse>(SERVER_URL_NO_CONTENT, {
    user_id: 1,
    registered_date: registeredDate,
    activity_name: activityName,
  });
};

const CreateActivityWithContent = (
  registeredDate: String,
  activityContent: String,
  activityName: String,
) => {
  return axios.post<IDefaultServerResponse>(SERVER_URL_HAS_CONTENT, {
    user_id: 1,
    registered_date: registeredDate,
    activity_content: activityContent,
    activity_name: activityName,
  });
};

export default {
  CreateActivityWithContent,
  CreateActivityWithNoContent,
};
