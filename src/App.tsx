import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function App() {
  return (
          <MapContainer style={{height: '100vh'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>

              <div className="panel-root">
                  <div className="transport-types">
                      <div className="transport-type-item">a</div>
                      <div className="transport-type-item">b</div>
                      <div className="transport-type-item">c</div>
                  </div>

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
              </div>

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
  );
}

export default App;
