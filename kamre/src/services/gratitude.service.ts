import axios from "axios";
import { SERVER_URL_HAS_CONTENT } from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";

const createGratitude = (registeredDate: String, activityContent: String) =>
  axios.post<IDefaultServerResponse>(SERVER_URL_HAS_CONTENT, {
    user_id: "1",
    registered_date: registeredDate,
    activity_content: activityContent,
    activity_name: "Wdziecznosc",
  });

export default {
  createGratitude,
};
