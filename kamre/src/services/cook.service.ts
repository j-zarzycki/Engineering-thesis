import axios from "axios";
import { SERVER_URL_NO_CONTENT } from "../constants/server.constants";

interface CreateCookResponse {
  res: String;
}

const CreateCook = (registeredDate: String, activityName: String) =>
  axios.post<CreateCookResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: activityName,
  });
export default { CreateCook };
