import React, {FC} from 'react';
import {Options} from "../models/Enums";

interface OptionsProps {
    getOptions: (travelMode: Options) => void
}
const OptionsComponent: FC<OptionsProps> = ({getOptions}) => {
    return (
        <div className="transport-types">
            <div className="transport-type-item">
                <button className="button" onClick={() => getOptions(Options.Units)}>Units</button>
            </div>
            <div className="transport-type-item" onClick={() => getOptions(Options.Departure)}>
                <button className="button">Departure</button>
            </div>
            <div className="transport-type-item" onClick={() => getOptions(Options.Avoidance)}>
                <button className="button">Avoidance</button>
            </div>
        </div>
    );
};

export default OptionsComponent;
