import axios from "axios";
import { SERVER_URL_HAS_CONTENT } from "../constants/server.constants";

interface CreateGratitudeResponse {
  res: String;
}

const createGratitude = (registeredDate: String, activityContent: String) =>
  axios.post<CreateGratitudeResponse>(SERVER_URL_HAS_CONTENT, {
    registered_date: registeredDate,
    activity_content: activityContent,
    activity_name: "Wdziecznosc",
  });

export default {
  createGratitude,
};
