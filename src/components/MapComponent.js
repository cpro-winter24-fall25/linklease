import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 52.2681,
    lng: -113.8112,
};

const MapComponent = ({ properties = [] }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading Map...</div>;

    console.log("Properties received:", properties); // 🧪 Debug log

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >
            {properties.map((property) => {
                const lat = parseFloat(property.lat);
                const lng = parseFloat(property.lng);

                if (isNaN(lat) || isNaN(lng)) return null; // Skip if bad values

                return (
                    <Marker
                        key={property.property_id}
                        position={{ lat, lng }}
                        title={property.title}
                    />
                );
            })}
        </GoogleMap>
    );
};

export default MapComponent;
