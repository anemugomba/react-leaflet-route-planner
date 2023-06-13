import React, {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import TransportTypes from "./components/TransportTypes";
import {Options, TravelMode} from "./models/Enums";
import OptionsComponent from "./components/OptionsComponent";

function App() {

    const [travelMode, setTravelMode] = useState<TravelMode>(TravelMode.Truck);
    const [option, setOption] = useState<Options>(Options.Units);

    const getTransportTypes = (trvMode: TravelMode) => {
        setTravelMode(trvMode)
    }

    const getOptions = (options: Options) => {
        setOption(options)
    }

    return (
      <div className="container">

          <div className="panel-root">

              <TransportTypes getTransportTypes={getTransportTypes}/>

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

              <OptionsComponent getOptions={getOptions}/>


          </div>

          <div className="map-container">
              <MapContainer style={{height: '100vh'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}>
                      <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                  </Marker>
              </MapContainer>
          </div>
      </div>
  );
}

export default App;
