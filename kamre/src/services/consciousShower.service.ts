import axios from "axios";
import {
  SERVER_URL_NO_CONTENT,
  SERVER_URL_HAS_CONTENT,
} from "../constants/server.constants";

interface CreateConsciousShowerResponse {
  res: String;
}

const CreateConsciousShowerWithNoContent = (registeredDate: String) => {
  return axios.post<CreateConsciousShowerResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: "Conscious Shower",
  });
};

const CreateConsciousShowerWithContent = async (
  registeredDate: String,
  activityContent: String,
) => {
  return axios.post<CreateConsciousShowerResponse>(SERVER_URL_HAS_CONTENT, {
    registered_date: registeredDate,
    activity_content: activityContent,
    activity_name: "Conscious Shower",
  });
};

export default {
  CreateConsciousShowerWithNoContent,
  CreateConsciousShowerWithContent,
};
