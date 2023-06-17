import React, {FC} from 'react';
import {TravelMode} from "../models/Enums";

interface TransportTypeProps {
    getTransportTypes: (travelMode: TravelMode) => void
    mode: TravelMode
}
const TransportTypes: FC<TransportTypeProps> = ({getTransportTypes, mode}) => {
    return (
        <div className="transport-types">
            <div className="transport-type-item">
                <button className={`button ${mode === TravelMode.Truck ? 'button-active' : ''}`} onClick={() => getTransportTypes(TravelMode.Truck)}>Truck</button>
            </div>
            <div className="transport-type-item" onClick={() => getTransportTypes(TravelMode.Car)}>
                <button className={`button ${mode === TravelMode.Car ? 'button-active' : ''}`}>Car</button>
            </div>
            <div className="transport-type-item" onClick={() => getTransportTypes(TravelMode.Motorcycle)}>
                <button className={`button ${mode === TravelMode.Motorcycle ? 'button-active' : ''}`}>Motorcycle</button>
            </div>
        </div>
    );
};

export default TransportTypes;
