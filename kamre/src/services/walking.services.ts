import axios from 'axios';
import {SERVER_URL_NO_CONTENT} from '../constans/server.constans'

interface CreateWalkingResponse {
    res: String
}

const CreateWalking = (registeredDate: String, activityName: String) => {
    return axios.post<CreateWalkingResponse>(SERVER_URL_NO_CONTENT, {
        registered_date: registeredDate,
        activity_name: activityName
    })

}
export default {CreateWalking};