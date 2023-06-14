import http from './http-common'
import {LocationServiceResponse} from "../models/LocationServiceResponse";
import {PlacesResponse} from "../models/PlacesResponse";
class RequestService {
    public static getRouteCalculation() {
        return http.get<LocationServiceResponse>(`/route-planner/route-calculation`).then(res => {
            return res.data;
        });
    }

    public static getAddresses(address: string) {
        return http.get<PlacesResponse>(`/route-planner/addresses?address=${address}`).then(res => {
            return res.data;
        });
    }
}

export default RequestService