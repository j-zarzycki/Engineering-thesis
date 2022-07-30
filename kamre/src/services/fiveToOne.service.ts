import axios from "axios";
import { SERVER_URL_NO_CONTENT } from "../constants/server.constants";

interface CreateFiveToOneResponse {
  res: String;
}

const CreateFiveToOne = (registeredDate: String, activityName: String) =>
  axios.post<CreateFiveToOneResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: activityName,
  });
export default { CreateFiveToOne };