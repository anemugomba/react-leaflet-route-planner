import http from './http-common'
import {LocationServiceResponse} from "../models/LocationServiceResponse";
import {PlacesResponse} from "../models/PlacesResponse";
import {objectToQueryParams} from "../utilities";
class RequestService {
    public static getRouteCalculation(data: any) {
        return http.post<LocationServiceResponse>(`/route-planner/route-calculation`,data).then(res => {
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