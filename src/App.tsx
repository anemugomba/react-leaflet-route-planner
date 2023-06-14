import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet'
import TransportTypes from "./components/TransportTypes";
import {Options, TravelMode} from "./models/Enums";
import OptionsComponent from "./components/OptionsComponent";
import UnitsOfMeasureComponent from "./components/UnitsOfMeasureComponent";
import DepartureComponent from "./components/DepartureComponent";
import AvoidanceComponent from "./components/AvoidanceComponent";
import RequestService from "./services/request.service";

function App() {

    const map = useRef<any>();

    const [travelMode, setTravelMode] = useState<TravelMode>(TravelMode.Truck);
    const [option, setOption] = useState<Options>(Options.Units);

    const getTransportTypes = (trvMode: TravelMode) => {
        setTravelMode(trvMode)
    }

    const getOptions = (options: Options) => {
        setOption(options)
    }

    const getApiResponse = () => {
        RequestService.getApiResponse().then(res => {
            console.log(res);
        })
    };

    useEffect(() => {
        map.current = L.map('map').setView([51.505, -0.09], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map.current)

        return () => {
            map.current.off()
            map.current.remove()
        }
    }, [])


    return (
      <div className="container">

          <div className="panel-root">

              <TransportTypes getTransportTypes={getTransportTypes} mode={travelMode}/>

              <div className="description">
                  Click on the name to choose your starting point and destinations
              </div>

              <div className="estimate">
                  70 Minutes, 40.8 Kilometers
              </div>

              <div className="points">

              </div>

              <hr/>

              <div>
                  Options
              </div>

              <OptionsComponent getOptions={getOptions} option={option}/>

              {option === Options.Units &&  <UnitsOfMeasureComponent/>}

              {option === Options.Departure &&  <DepartureComponent/>}

              {option === Options.Avoidance &&  <AvoidanceComponent/>}

              <hr/>

              <button onClick={() => getApiResponse()}>
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
