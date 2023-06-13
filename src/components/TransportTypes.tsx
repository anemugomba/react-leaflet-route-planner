import React, {FC} from 'react';
import {TravelMode} from "../models/Enums";

interface TransportTypeProps {
    getTransportTypes: (travelMode: TravelMode) => void
}
const TransportTypes: FC<TransportTypeProps> = ({getTransportTypes}) => {
    return (
        <div className="transport-types">
            <div className="transport-type-item">
                <button className="button" onClick={() => getTransportTypes(TravelMode.Truck)}>Truck</button>
            </div>
            <div className="transport-type-item" onClick={() => getTransportTypes(TravelMode.Car)}>
                <button className="button">Car</button>
            </div>
            <div className="transport-type-item" onClick={() => getTransportTypes(TravelMode.Motorcycle)}>
                <button className="button">Motorcycle</button>
            </div>
        </div>
    );
};

export default TransportTypes;
