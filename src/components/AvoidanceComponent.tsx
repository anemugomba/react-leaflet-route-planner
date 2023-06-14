import React, {FC} from 'react';
import {DistanceUnit, Options} from "../models/Enums";

interface AvoidanceProps {
    handleAvoidFerries: (e: boolean) => void,
    handleAvoidTolls: (e: boolean) => void,
    avoidFerries: boolean,
    avoidTolls: boolean,
}
const AvoidanceComponent: FC<AvoidanceProps> = ({handleAvoidFerries, handleAvoidTolls, avoidTolls, avoidFerries}) =>  {

    return (
        <div>
            <div>
                <input checked={avoidTolls} onChange={() => handleAvoidTolls(!avoidTolls)} type="checkbox" id="AvoidTolls"/>
                <label htmlFor="AvoidTolls">Avoid Tolls</label>
            </div>
            <div>
                <input checked={avoidFerries} onChange={() => handleAvoidFerries(!avoidFerries)} type="checkbox" id="AvoidFerries"/>
                <label htmlFor="AvoidFerries">Avoid Ferries</label>
            </div>
        </div>
    );
}

export default AvoidanceComponent;