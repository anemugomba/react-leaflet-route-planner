import React, {useEffect, useRef, useState} from 'react';
import TransportTypes from "./components/TransportTypes";
import {DistanceUnit, Options, TravelMode} from "./models/Enums";
import OptionsComponent from "./components/OptionsComponent";
import UnitsOfMeasureComponent from "./components/UnitsOfMeasureComponent";
import AvoidanceComponent from "./components/AvoidanceComponent";
import RequestService from "./services/request.service";
import FilterAddressesComponent from "./components/FilterAddressesComponent";
import Place from "./models/PlacesResponse";
import {formatApiResponseToGeoJson, formatWayPointPositions} from "./utilities";
import LoadingAnimationComponent from "./components/LoadingAnimationComponent";
import L from 'leaflet';

function App() {

    const map = useRef<any>();
    const addressesLayer = useRef<any>();

    const dragItem = useRef<any>();
    const dragOverItem = useRef<any>();

    const [travelMode, setTravelMode] = useState<TravelMode>(TravelMode.Truck);
    const [option, setOption] = useState<Options>(Options.Units);
    const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(DistanceUnit.Miles);
    const [avoidFerries, setAvoidFerries] = useState<boolean>(false);
    const [avoidTolls, setAvoidTolls] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<Place[]>([]);
    const [dragEnterIndex, setDragEnterIndex] = useState<number>(-1);
    const [loading, setLoading] = useState(false);

    const getOptions = (options: Options) => {
        setOption(options)
    }

    const getRouteCalculation = () => {

        let data = {
            travelMode: travelMode,
            distanceUnit: distanceUnit,
            avoidTolls: avoidTolls,
            avoidFerries: avoidFerries,
            departurePosition: [addresses[0].geometry.location.lng, addresses[0].geometry.location.lat],
            destinationPosition: [addresses[addresses.length - 1].geometry.location.lng, addresses[addresses.length - 1].geometry.location.lat],
            wayPointPositions: formatWayPointPositions(addresses),
        };

        if (addresses.length < 2) {
            alert('please select at least 2 addresses')
        }



        setLoading(true)
        RequestService.getRouteCalculation(data).then(res => {
            if (res.Legs.length) {
                L.geoJson(formatApiResponseToGeoJson(res)).addTo(map.current);
                map.current.panTo(new L.LatLng(res.Legs[0].StartPosition[1], res.Legs[0].StartPosition[0]));
                addAddressesLayer(addresses)
            }
        }).finally(() => {setLoading(false)});

    };

    const addAddressesLayer = (addressesToAdd: Place[]) => {

        if (addressesLayer.current) {
            // addressesLayer.current.remove();
            map.current.removeLayer(addressesLayer.current)
        }

        let _adArray: L.Layer[] = [];

        addressesToAdd.forEach(ad => {
            _adArray.push(L.marker([ad.geometry.location.lat, ad.geometry.location.lng]).bindPopup(`${ad.name}`))
        })

        addressesLayer.current = L.layerGroup(_adArray);

        addressesLayer.current.addTo(map.current);
    }
    const getAddress = (address: Place) => {
        setAddresses(current => [...current, address]);
    }

    const removeAddress = (place_id: string) => {
        let _addresses = addresses.filter(ad => {
            return ad.place_id !== place_id
        })
        setAddresses(_addresses)
    }

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

    useEffect(() => {
        map.current = L.map('map').setView([-17.8216, 31.0492], 18)

        let open_street_maps_tile_layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxNativeZoom: 19,
            maxZoom: 25
        })

        let google_tile_layer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxNativeZoom: 19,
            maxZoom: 25
        });

        let base_maps = {
            "OpenStreetMap": open_street_maps_tile_layer,
            "GoogleSatellite": google_tile_layer
        };

        L.control.layers(base_maps).addTo(map.current);

        map.current.addLayer(google_tile_layer)

        return () => {
            map.current.off()
            map.current.remove()
        }
    }, [])



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
                                    ({index + 1}) {address.name} {address.formatted_address}
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

                <button disabled={loading} className="button button-active" onClick={() => getRouteCalculation()}>
                    Calculate
                </button>

                {loading ? (
                    <span style={{padding: '5px'}}>
                        <LoadingAnimationComponent/>
                    </span>
                ) : null}

            </div>

            <div className="map-container">
                <div id="map" style={{height: '100vh'}}></div>
            </div>
        </div>
    );
}

export default App;
