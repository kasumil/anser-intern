import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleMapsApiKey } from "../../../config";

const mapSt = {
  width: "798px",
  height: "368px",
  right: 0,
};

const centerPosition = { lat: 39.955878, lng: -75.199414 };

const ContactMap = () => {
  return (
    <Map
      google={window.google}
      googleMapsApiKey={googleMapsApiKey}
      style={mapSt}
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
