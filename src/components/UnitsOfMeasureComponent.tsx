import React from 'react';
import {DistanceUnit} from "../models/Enums";

const UnitsOfMeasureComponent = () => {

    return (
        <div>
            <div>
                <input checked={true} type="radio" value={DistanceUnit.Miles} name={DistanceUnit.Miles} /> Male
            </div>
            <div>
                <input checked={true} type="radio" value={DistanceUnit.Kilometers} name={DistanceUnit.Kilometers} /> Female
            </div>
        </div>
    );
}

export default UnitsOfMeasureComponent;