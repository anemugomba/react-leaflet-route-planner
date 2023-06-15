import Place from "./models/PlacesResponse";
import {LocationServiceResponse} from "./models/LocationServiceResponse";

export const  formatWayPointPositions = (places: Place[]): number[][] => {
    let wayPoints: number[][] = [];

    if (places.length > 2) {
        let _places: Place[] = copyObject(places);

        _places.shift();
        _places.pop();

        _places.forEach(place => {
            let lonLat = [];
            lonLat[0] = place.geometry.location.lng;
            lonLat[1] = place.geometry.location.lat;
            wayPoints.push(lonLat)
        })
    }

    return wayPoints;
}

export const formatApiResponseToGeoJson = (res: LocationServiceResponse) => {
    let geoJson: any = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: res.Legs[0].StartPosition
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: res.Legs[0].EndPosition
                }
            },
        ]
    }
    if (res.Legs.length) {
        res.Legs.forEach(leg => {
            leg.Steps.forEach(step => {
                geoJson.features.push(
                    {
                        type: "LineString",
                        coordinates: [step.StartPosition, step.EndPosition]
                    }
                )
            })
        })
    }

    return geoJson;
}

export const objectToQueryParams = (params: {[key: string] : any}) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export const copyObject = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}