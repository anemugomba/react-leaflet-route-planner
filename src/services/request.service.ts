import http from './http-common'
import {LocationServiceResponse} from "../models/LocationServiceResponse";
class RequestService {
    public static getApiResponse() {
        return http.get<LocationServiceResponse>(`/route-planner/test`).then(res => {
            return res.data;
        });
    }
}

export default RequestService