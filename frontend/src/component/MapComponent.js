import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
    Circle,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

// Set a default center for Red Deer
const defaultCenter = {
    lat: 52.2681,
    lng: -113.8112,
};

const MapComponent = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [zoom, setZoom] = useState(12);  // Default zoom level
    const [mapBounds, setMapBounds] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch("http://localhost:4000/properties");
                const data = await res.json();
                setProperties(data);

                // Calculate the bounds for zoom based on the property locations
                const bounds = new window.google.maps.LatLngBounds();
                data.forEach((property) => {
                    const lat = parseFloat(property.latitude);
                    const lng = parseFloat(property.longitude);
                    bounds.extend(new window.google.maps.LatLng(lat, lng));
                });

                setMapBounds(bounds);

                // Adjust zoom based on the bounds
                const mapZoom = calculateZoomLevel(bounds);
                setZoom(mapZoom);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            }
        };

        fetchProperties();
    }, []);

    // Function to calculate zoom level based on bounds
    const calculateZoomLevel = (bounds) => {
        const DEFAULT_ZOOM = 12;
        const MAX_ZOOM = 16;
        const MIN_ZOOM = 10;
        const mapWidth = window.innerWidth;

        // Calculate the zoom level based on map bounds and window size
        const zoomLevel = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.floor(16 - Math.log2(mapWidth / 500))));
        return zoomLevel;
    };

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={zoom}
            bounds={mapBounds}
            onLoad={(map) => {
                // Center and zoom the map based on the bounds of all markers
                if (mapBounds) {
                    map.fitBounds(mapBounds);
                }
            }}
        >
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
