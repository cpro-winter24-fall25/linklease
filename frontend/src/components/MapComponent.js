import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 52.2681,
    lng: -113.8112,
};

const MapComponent = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch("http://localhost:4000/properties");
                const data = await res.json();
                setProperties(data);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            }
        };

        fetchProperties();
    }, []);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            {properties.map((property) => {
                const lat = parseFloat(property.latitude);
                const lng = parseFloat(property.longitude);
                if (isNaN(lat) || isNaN(lng)) return null;

                return (
                    <Marker
                        key={property.property_id}
                        position={{ lat, lng }}
                        title={property.title}
                        onClick={() => setSelectedProperty(property)}
                    />
                );
            })}

            {selectedProperty && (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedProperty.latitude),
                        lng: parseFloat(selectedProperty.longitude),
                    }}
                    onCloseClick={() => setSelectedProperty(null)}
                >
                    <div
                        style={{
                            width: "350px",
                            padding: "10px",
                            fontSize: "14px",
                            lineHeight: "1.4",
                        }}
                    >
                        <h3 style={{ marginTop: 0 }}>{selectedProperty.title}</h3>
                        <p><strong>Location:</strong> {selectedProperty.location}</p>
                        <p><strong>Price:</strong> ${selectedProperty.price}</p>
                        <p><strong>Type:</strong> {selectedProperty.property_type}</p>
                        <p><strong>For Rent:</strong> {selectedProperty.forRent ? "Yes" : "No"}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default MapComponent;