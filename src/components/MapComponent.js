import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 52.2681,       // ✅ Red Deer latitude
    lng: -113.8112,     // ✅ Red Deer longitude
    // lat: 53.5461, // Edmonton as default
    // lng: -113.4938,
};

const MapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        />
    );
};

export default MapComponent;
