import React, {useEffect, useRef, useState} from 'react';
import L, {GeoJSON} from 'leaflet'
import TransportTypes from "./components/TransportTypes";
import {DistanceUnit, Options, TravelMode} from "./models/Enums";
import OptionsComponent from "./components/OptionsComponent";
import UnitsOfMeasureComponent from "./components/UnitsOfMeasureComponent";
import DepartureComponent from "./components/DepartureComponent";
import AvoidanceComponent from "./components/AvoidanceComponent";
import RequestService from "./services/request.service";
import {GeoJsonObject} from "geojson";
import {GeoJSONProps} from "react-leaflet";
import {LocationServiceResponse, Step} from "./models/LocationServiceResponse";
import FilterAddressesComponent from "./components/FilterAddressesComponent";
import Place from "./models/PlacesResponse";

const sampleAPiResponse: LocationServiceResponse = {
    "Legs": [
        {
            "Distance": 5.762,
            "DurationSeconds": 409,
            "EndPosition": [
                31.0288927,
                -17.8120922
            ],
            "StartPosition": [
                30.9924587,
                -17.8215847
            ],
            "Steps": [
                {
                    "Distance": 0.103,
                    "DurationSeconds": 18,
                    "EndPosition": [
                        30.99153,
                        -17.82136
                    ],
                    "StartPosition": [
                        30.992459,
                        -17.821585
                    ]
                },
                {
                    "Distance": 0.222,
                    "DurationSeconds": 20,
                    "EndPosition": [
                        30.99274,
                        -17.81973
                    ],
                    "StartPosition": [
                        30.99153,
                        -17.82136
                    ]
                },
                {
                    "Distance": 0.301,
                    "DurationSeconds": 43,
                    "EndPosition": [
                        30.99039,
                        -17.81818
                    ],
                    "StartPosition": [
                        30.99274,
                        -17.81973
                    ]
                },
                {
                    "Distance": 0.492,
                    "DurationSeconds": 49,
                    "EndPosition": [
                        30.99292,
                        -17.81446
                    ],
                    "StartPosition": [
                        30.99039,
                        -17.81818
                    ]
                },
                {
                    "Distance": 3.201,
                    "DurationSeconds": 179,
                    "EndPosition": [
                        31.02261,
                        -17.81904
                    ],
                    "StartPosition": [
                        30.99292,
                        -17.81446
                    ]
                },
                {
                    "Distance": 0.957,
                    "DurationSeconds": 55,
                    "EndPosition": [
                        31.02555,
                        -17.81089
                    ],
                    "StartPosition": [
                        31.02261,
                        -17.81904
                    ]
                },
                {
                    "Distance": 0.133,
                    "DurationSeconds": 27,
                    "EndPosition": [
                        31.02642,
                        -17.81003
                    ],
                    "StartPosition": [
                        31.02555,
                        -17.81089
                    ]
                },
                {
                    "Distance": 0.353,
                    "DurationSeconds": 18,
                    "EndPosition": [
                        31.028893,
                        -17.812092
                    ],
                    "StartPosition": [
                        31.02642,
                        -17.81003
                    ]
                }
            ]
        }
    ],
    "Summary": {
        "DataSource": "Here",
        "Distance": 5.762,
        "DistanceUnit": "Kilometers",
        "DurationSeconds": 409,
        "RouteBBox": [
            30.99039,
            -17.821585,
            31.028893,
            -17.81003
        ]
    },
    "@metadata": {
        "statusCode": 200,
        "effectiveUri": "https:\/\/routes.geo.us-east-1.amazonaws.com\/routes\/v0\/calculators\/route-planner-acmg\/calculate\/route",
        "headers": {
            "date": "Wed, 14 Jun 2023 08:44:51 GMT",
            "content-type": "application\/json",
            "content-length": "1195",
            "connection": "keep-alive",
            "x-amzn-requestid": "1593c584-874c-470f-86b2-3b32013b2e92",
            "access-control-allow-origin": "*",
            "x-amz-apigw-id": "GgCgoGH1oAMFgBw=",
            "access-control-expose-headers": "x-amzn-errortype,x-amzn-requestid,x-amzn-errormessage,x-amzn-trace-id,x-amz-apigw-id,date",
            "x-amzn-trace-id": "Root=1-64897e03-59376c0369c641c046307c46"
        },
        "transferStats": {
            "http": [
                []
            ]
        }
    }
}

function App() {

    const map = useRef<any>();
    const dragItem = useRef<any>();
    const dragOverItem = useRef<any>();

    const [travelMode, setTravelMode] = useState<TravelMode>(TravelMode.Truck);
    const [option, setOption] = useState<Options>(Options.Units);
    const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(DistanceUnit.Miles);
    const [avoidFerries, setAvoidFerries] = useState<boolean>(false);
    const [avoidTolls, setAvoidTolls] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<Place[]>([]);
    const [dragEnterIndex, setDragEnterIndex] = useState<number>(-1);

    const getOptions = (options: Options) => {
        setOption(options)
    }

    const getRouteCalculation = () => {

        let g = formatApiResponseToGeoJson(sampleAPiResponse);
        console.log(g)

        L.geoJson(g).addTo(map.current);

        map.current.panTo(new L.LatLng(sampleAPiResponse.Legs[0].StartPosition[1], sampleAPiResponse.Legs[0].StartPosition[0]));

        /*RequestService.getRouteCalculation().then(res => {

        })*/
    };

    const getAddress = (address: Place) => {
        setAddresses(current => [...current, address]);
    }

    const formatApiResponseToGeoJson = (res: LocationServiceResponse) => {
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
                /*{
                    type: "LineString",
                    coordinates: getLatLngFromSteps(res.Legs[0].Steps)
                }*/
            ]
        }

        res.Legs[0].Steps.forEach(res => {
            geoJson.features.push(
                {
                    type: "LineString",
                    coordinates: [res.StartPosition, res.EndPosition]
                }
            )
        })
        return geoJson;
    }

    const removeAddress = (place_id: string) => {
        let _addresses = addresses.filter(ad => {
            return ad.place_id !== place_id
        })
        setAddresses(_addresses)
    }

    useEffect(() => {
        map.current = L.map('map').setView([39.75621, -104.99404], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map.current)

        return () => {
            map.current.off()
            map.current.remove()
        }
    }, [])

    const dragStart = (e: any, position: number) => {
        dragItem.current = position;
    };

    const dragEnter = (e: any, position: number) => {
        dragOverItem.current = position;
        setDragEnterIndex(position);
    };

    const drop = (e: any) => {
        const copyListItems = [...addresses];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setAddresses(copyListItems);
        setDragEnterIndex(-1);
    };
    return (
        <div className="container">

            <div className="panel-root">

                <TransportTypes getTransportTypes={setTravelMode} mode={travelMode}/>

                <hr/>

                <FilterAddressesComponent getAddress={getAddress}/>

                {addresses.length > 0 ?  <label style={{fontSize: 'small', color: 'grey'}}>Drag and drop addresses in the order you want to visit them</label> : null}

                {addresses.map((address, index) => {
                    return (
                        <div key={address.place_id} className={`${dragEnterIndex === index ? 'rotate-10' : ''} selected-address-item`} draggable={true}
                             onDragStart={(e) => dragStart(e, index)}
                             onDragEnter={(e) => dragEnter(e, index)}
                             onDragEnd={drop}>

                            <i className="bi bi-arrows-expand"></i>

                            <div className="selected-address-address">
                                <div>
                                    ({index + 1}) {address.formatted_address}
                                </div>
                                <div className="selected-address-point">
                                    Point {address.geometry.location.lat},{address.geometry.location.lng}
                                </div>
                            </div>
                            <div className="selected-address-remove">
                                <button className="button button-remove" onClick={() => removeAddress(address.place_id)}>remove</button>
                            </div>
                        </div>
                    )
                })}

                <div>
                    <h3>Options</h3>
                </div>

                <OptionsComponent getOptions={getOptions} option={option}/>

                <div style={{padding: '10px'}}></div>
                {option === Options.Units &&
                    <UnitsOfMeasureComponent getDistanceUnit={setDistanceUnit} distanceUnit={distanceUnit}/>}

                {option === Options.Avoidance && <AvoidanceComponent avoidFerries={avoidFerries} avoidTolls={avoidTolls}
                                                                     handleAvoidTolls={setAvoidTolls}
                                                                     handleAvoidFerries={setAvoidFerries}/>}

                <hr/>

                <button onClick={() => getRouteCalculation()}>
                    test
                </button>

            </div>

            <div className="map-container">
                <div id="map" style={{height: '100vh'}}></div>
            </div>
        </div>
    );
}

export default App;
