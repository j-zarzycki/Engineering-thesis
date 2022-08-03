import axios from "axios";
import { SERVER_URL_NO_CONTENT } from "../constants/server.constants";

interface CreateYtPageResponse {
  res: String;
}

const CreateYtPage = (registeredDate: String, activityName: String) =>
  axios.post<CreateYtPageResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: activityName,
  });
export default { CreateYtPage };
