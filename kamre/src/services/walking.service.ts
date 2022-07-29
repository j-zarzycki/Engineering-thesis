import axios from 'axios';
import { SERVER_URL_NO_CONTENT } from '../constants/server.constans';

interface CreateWalkingResponse {
  res: string;
}

const CreateWalking = (registeredDate: string, activityName: string) =>
  axios.post<CreateWalkingResponse>(SERVER_URL_NO_CONTENT, {
    registered_date: registeredDate,
    activity_name: activityName,
  });
export default { CreateWalking };
