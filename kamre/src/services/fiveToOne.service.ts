import axios from 'axios';
import { SERVER_URL_NO_CONTENT } from '../constants/server.constans';

interface CreateFiveToOneResponse {
  res: string;
}

const CreateFiveToOne = (registeredDate: string, activityName: string) =>
  axios.post<CreateFiveToOneResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: activityName,
  });
export default { CreateFiveToOne };
