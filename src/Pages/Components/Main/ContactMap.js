import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleMapsApiKey } from "../../../config";

const mapSt = {
  width: "56%",
  height: "368px",
};

const ContactMap = () => {
  return (
    <Map
      className="Map"
      google={window.google}
      containerStyle={mapSt}
      zoom={14}
      initialCenter={{ lat: 39.955878, lng: -75.199414 }}
    >
      <Marker position={{ lat: 39.955878, lng: -75.199414 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleMapsApiKey}`,
})(ContactMap);
