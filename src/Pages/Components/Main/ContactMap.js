import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleMapsApiKey } from "../../../config";

const mapSt = {
  width: "40%",
  height: "368px",
};

const centerPosition = { lat: 39.955878, lng: -75.199414 };

const ContactMap = () => {
  return (
    <Map
      className="Map"
      google={window.google}
      containerStyle={mapSt}
      zoom={14}
      initialCenter={centerPosition}
    >
      <Marker position={centerPosition} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleMapsApiKey}`,
})(ContactMap);
