import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/CreateListing.css"; // reuse your form styles

const EditPropertyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ownerId, setOwnerId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        property_type: "house",
        latitude: "",
        longitude: "",
        forRent: true,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setOwnerId(decoded.user_id);
        }

        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/properties/${id}`);
            const {
                title,
                location,
                price,
                property_type,
                latitude,
                longitude,
                forRent,
            } = response.data;
            setFormData({ title, location, price, property_type, latitude, longitude, forRent });
        } catch (error) {
            console.error("Failed to fetch property:", error);
        }
    };

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
            await axios.put(
                `http://localhost:4000/properties/${id}`,
                {
                    owner_id: ownerId,
                    ...formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Property updated successfully!");
            navigate(`/property/${id}`);
        } catch (error) {
            console.error("Error updating property:", error);
            alert("Failed to update property.");
        }
    };

    return (
        <div className="create-listing-container">
            <h2>Edit Property</h2>
            <form className="create-form" onSubmit={handleSubmit}>
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

                {/* ✅ Button Group */}
                <div className="edit-actions">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit">Update Property</button>
                </div>
            </form>
        </div>
    );
};

export default EditPropertyPage;
