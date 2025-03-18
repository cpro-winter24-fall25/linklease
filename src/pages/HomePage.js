import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const port = 4001;

const HomePage = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Converts token into true/false

        // 🔥 Fetch properties (No Authorization required)
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/properties`); // No token needed
            setProperties(response.data);
        } catch (error) {
            console.error("🔥 Error fetching properties:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        fetchProperties(); // ✅ Reload properties after logout
    };

    const filteredProperties = properties.filter((property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>🏠 LinkLease</h2>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="logout-btn">Log out</button>
                ) : (
                    <button onClick={() => navigate("/login")} className="login-btn">Log in</button>
                )}
            </nav>

            <div className="content">
                <div className="left-section">
                    {/* Left Section (Empty for Now) */}
                    <img src="/static_maps.png" alt="Google Maps Static" />
                </div>

                <div className="right-section">
                    {/* 🔎 Search Bar Inside Right Section */}
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
