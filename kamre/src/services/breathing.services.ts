import axios from 'axios';
import {SERVER_URL_NO_CONTENT} from '../constans/server.constans'

interface CreateBreathingResponse {
    res: String
}

const CreateBreathing = (registeredDate: String, activityName: String) => {
    return axios.post<CreateBreathingResponse>(SERVER_URL_NO_CONTENT, {
        registered_date: registeredDate,
        activity_name: activityName
    })

}
export default {CreateBreathing};