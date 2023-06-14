import React, {FC} from 'react';
import {DistanceUnit} from "../models/Enums";

type UnitsOfMeasureProps = {
    getDistanceUnit: (unit: DistanceUnit) => void,
    distanceUnit: DistanceUnit
}

const UnitsOfMeasureComponent: FC<UnitsOfMeasureProps> = ({getDistanceUnit, distanceUnit}) => {

    const handleOnChange = (e: any) => {
        getDistanceUnit(e.target.value)
    }

    return (
        <div>
            <div>
                <input checked={distanceUnit === DistanceUnit.Miles} onChange={handleOnChange} type="radio" value={DistanceUnit.Miles} name="DistanceUnit" id="Miles"/>
                <label htmlFor="Miles">Miles</label>
            </div>
            <div>
                <input checked={distanceUnit === DistanceUnit.Kilometers} onChange={handleOnChange} type="radio" value={DistanceUnit.Kilometers} name="DistanceUnit" id="Kilometers"/>
                <label htmlFor="Kilometers">Kilometers</label>
            </div>
        </div>
    );
}

export default UnitsOfMeasureComponent;