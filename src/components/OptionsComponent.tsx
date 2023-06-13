import React, {FC} from 'react';
import {Options} from "../models/Enums";

interface OptionsProps {
    getOptions: (travelMode: Options) => void,
    option: Options
}
const OptionsComponent: FC<OptionsProps> = ({getOptions, option}) => {
    return (
        <div className="transport-types">
            <div className="transport-type-item">
                <button className={`button ${option === Options.Units ? 'button-active' : ''}`} onClick={() => getOptions(Options.Units)}>Units</button>
            </div>
            <div className="transport-type-item" onClick={() => getOptions(Options.Departure)}>
                <button className={`button ${option === Options.Departure ? 'button-active' : ''}`}>Departure</button>
            </div>
            <div className="transport-type-item" onClick={() => getOptions(Options.Avoidance)}>
                <button className={`button ${option === Options.Avoidance ? 'button-active' : ''}`}>Avoidance</button>
            </div>
        </div>
    );
};

export default OptionsComponent;
