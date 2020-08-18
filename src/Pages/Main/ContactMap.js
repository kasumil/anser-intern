import React from "react";
import styled from "styled-components";
import { Marker } from "react-google-maps";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { googleMapsApiKey } from "../../config";

const mapStyles = {
  height: "368px",
  width: "100%",
};

const defaultCenter = {
  lat: 39.955858,
  lng: -75.199424,
};

const ContactMap = () => {
  return (
    <MapFrame>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </MapFrame>
  );
};
export default ContactMap;

const MapFrame = styled.div`
  width: 60%;
`;
