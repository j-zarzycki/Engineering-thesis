import axios from "axios";
import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
} from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";

const CreateConsciousShowerWithNoContent = (registeredDate: String) => {
  return axios.post<IDefaultServerResponse>(SERVER_URL_NO_CONTENT, {
    user_id: 1,
    registered_date: registeredDate,
    activity_name: "Swiadomy prysznic",
  });
};

const CreateConsciousShowerWithContent = async (
  registeredDate: String,
  activityContent: String,
) => {
  return axios.post<IDefaultServerResponse>(SERVER_URL_HAS_CONTENT, {
    user_id: 1,
    registered_date: registeredDate,
    activity_content: activityContent,
    activity_name: "Swiadomy prysznic",
  });
};

export default {
  CreateConsciousShowerWithNoContent,
  CreateConsciousShowerWithContent,
};
