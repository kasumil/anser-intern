import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleMapsApiKey } from "../../../config";

const mapSt = {
  width: "798px",
  height: "368px",
};

const centerPosition = { lat: 37.558319, lng: 127.048233 };

const ContactMap = () => {
  return (
    <Map
      google={window.google}
      googleMapsApiKey={googleMapsApiKey}
      containerStyle={mapSt}
      style={mapSt}
      zoom={15}
      initialCenter={centerPosition}
    >
      <Marker position={centerPosition} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleMapsApiKey}`,
})(ContactMap);
