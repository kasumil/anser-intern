import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { googleMapsApiKey } from "../../../config";

const mapSt = {
  width: "798px",
  height: "368px",
};

const centerPosition = { lat: 37.558319, lng: 127.048233 };
const toolTipPosition = { lat: 37.56, lng: 127.048233 };

const ContactMap = () => {
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const visibleInfoWindow = () => {
    setToolTipOpen(!toolTipOpen);
  };

  const displayInfoWindows = () => {
    return (
      <InfoWindow
        visible={toolTipOpen}
        position={toolTipPosition}
        content={"한양대학교 경영대학"}
        onClose={visibleInfoWindow}
      />
    );
  };

  return (
    <Map
      google={window.google}
      googleMapsApiKey={googleMapsApiKey}
      containerStyle={mapSt}
      style={mapSt}
      zoom={15}
      initialCenter={centerPosition}
    >
      {displayInfoWindows()}
      <Marker position={centerPosition} onClick={visibleInfoWindow} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleMapsApiKey}`,
})(ContactMap);
