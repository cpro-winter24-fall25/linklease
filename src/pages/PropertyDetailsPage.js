import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PropertyDetailsPage.css";

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchPropertyDetails();
        fetchAllReviews();
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/properties/${id}`);
            setProperty(response.data);
        } catch (error) {
            console.error("🔥 Error fetching property details:", error);
        }
    };

    const fetchAllReviews = async () => {
        try {
            const response = await axios.get("http://localhost:4000/reviews");
            const filtered = response.data.filter(
                (review) => Number(review.property_id) === Number(id)
            );
            setReviews(filtered);
        } catch (error) {
            console.error("🔥 Error fetching reviews:", error);
        }
    };

    if (!property) return <div className="loading">Loading property details...</div>;

    return (
        <div className="property-details-container">
            <div className="property-info-section">
                <h2>{property.title}</h2>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ${property.price}</p>
            </div>

            <div className="reviews-section">
                <h3>Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                            <p>{review.review_text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
