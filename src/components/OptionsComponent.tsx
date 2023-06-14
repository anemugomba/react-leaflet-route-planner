import React, {FC} from 'react';
import {Options} from "../models/Enums";

interface OptionsProps {
    getOptions: (travelMode: Options) => void,
    option: Options
}
const OptionsComponent: FC<OptionsProps> = ({getOptions, option}) => {
    return (
        <div className="options-headings-root">
            <div className="options-headings-item">
                <button className={`button ${option === Options.Units ? 'button-active' : ''}`} onClick={() => getOptions(Options.Units)}>Units</button>
            </div>

            <div className="options-headings-item" onClick={() => getOptions(Options.Avoidance)}>
                <button className={`button ${option === Options.Avoidance ? 'button-active' : ''}`}>Avoidance</button>
            </div>
        </div>
    );
};

export default OptionsComponent;
