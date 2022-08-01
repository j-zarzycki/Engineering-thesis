import axios from "axios";
import { SERVER_URL_NO_CONTENT } from "../constants/server.constants";

interface CreateFilmYtResponse {
  res: String;
}

const CreateFilmYt = (registeredDate: String, activityName: String) =>
  axios.post<CreateFilmYtResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: activityName,
  });
export default { CreateFilmYt };
