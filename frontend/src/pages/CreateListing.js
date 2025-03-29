import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/CreateListing.css";

const CreateListing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        owner_id: "",
        title: "",
        location: "",
        price: "",
        property_type: "house",
        forRent: true,
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setFormData((prev) => ({
                ...prev,
                owner_id: decoded.user_id,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:4000/properties", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Property listed successfully!");
            navigate("/home");
        } catch (error) {
            console.error("Error creating listing:", error);
            alert("Failed to create listing. Check console for details.");
        }
    };

    return (
        <div className="create-listing-container">
            <h2>Create New Property Listing</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                <input
                    type="hidden"
                    name="owner_id"
                    value={formData.owner_id}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="200"
                />
                <select
                    className="form-control"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    required
                >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                </select>
                <input
                    type="number"
                    step="any"
                    name="latitude"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    step="any"
                    name="longitude"
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                />

                {/* 🔙 Back + Submit button group */}
                <div className="edit-actions">
                    <button type="button" onClick={() => navigate("/home")}>Back</button>
                    <button type="submit">Submit Listing</button>
                </div>
            </form>
        </div>
    );
};

export default CreateListing;
