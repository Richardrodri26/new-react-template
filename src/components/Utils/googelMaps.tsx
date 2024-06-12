import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationMapProps {
  latitude: string;
  longitude: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const defaultCenter = {
    lat: +latitude,
    lng: +longitude
  };
  const markerIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // URL del icono
    // scaledSize: new google.maps.Size(50, 50), // Tamaño del icono
    // origin: new google.maps.Point(0, 0), // Origen del icono
    // anchor: new google.maps.Point(25, 50) // Punto de anclaje del icono
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyDnFY_hm9EPn5kneiBHLEcqRGLf9nbkIZM">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={20}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} key={Date.now()} />
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationMap;
