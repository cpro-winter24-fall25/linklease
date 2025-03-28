import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import MapComponent from "../components/MapComponent";

const HomePage = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hoveredProperty, setHoveredProperty] = useState(null); // NEW

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:4000/properties");
            setProperties(response.data);
        } catch (error) {
            console.error("🔥 Error fetching properties:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        fetchProperties();
    };

    const filteredProperties = properties.filter((property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>🏠 LinkLease</h2>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="auth-btn">Log out</button>
                ) : (
                    <button onClick={() => navigate("/login")} className="auth-btn">Log in</button>
                )}
            </nav>

            <div className="content">
                <div className="left-section">
                    <MapComponent
                        properties={filteredProperties}
                        hoveredProperty={hoveredProperty}
                    />
                </div>

                <div className="right-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search property listing..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-bar"
                        />
                    </div>

                    <h2>Property Listings</h2>
                    <div className="property-list">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((property) => (
                                <div
                                    key={property.property_id}
                                    className="property-card"
                                    onClick={() => navigate(`/property/${property.property_id}`)}
                                    onMouseEnter={() => setHoveredProperty(property)} // 👈 Hover start
                                    onMouseLeave={() => setHoveredProperty(null)} // 👈 Hover end
                                >
                                    <div className="property-info">
                                        <h3>${property.price}</h3>
                                        <p>{property.title}</p>
                                        <p>{property.location}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No properties found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
