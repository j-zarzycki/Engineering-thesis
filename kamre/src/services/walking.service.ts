import axios from "axios";
import { SERVER_URL_NO_CONTENT } from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";

const CreateWalking = (registeredDate: String, activityName: String) =>
  axios.post<IDefaultServerResponse>(SERVER_URL_NO_CONTENT, {
    user_id: "1",
    registered_date: registeredDate,
    activity_name: activityName,
  });

export default { CreateWalking };
