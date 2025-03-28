import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PropertyDetailsPage.css";


const port = 4000;

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchPropertyDetails();
        fetchReviewsForProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/properties/${id}`);
            setProperty(response.data);
        } catch (error) {
            console.error("🔥 Error fetching property details:", error);
        }
    };

    // Fetch all reviews and filter them based on the property_id
    const fetchReviewsForProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/reviews`);
            const allReviews = response.data;

            // Convert id to number to match property_id type
            const propertyReviews = allReviews.filter(review => review.property_id === Number(id));
            setReviews(propertyReviews);

            console.log("✅ Filtered Reviews:", propertyReviews); // Debugging
        } catch (error) {
            console.error("🔥 Error fetching reviews:", error);
        }
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post(`http://localhost:${port}/create-checkout-session`, {
                propertyId: id,
                price: property.price,
                title: property.title,
            }, {
                withCredentials: true, // Ensure cookies/authentication tokens are sent
            });
    
            window.location.href = response.data.url; // Redirect to Stripe Checkout
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };

    if (!property) return <div className="loading">Loading property details...</div>;

    return (
        <div className="property-details-container">
            <h2>{property.title}</h2>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Type:</strong> {property.property_type}</p>
            {property.image && <img src={property.image} alt={property.title} />}
            <button onClick={handlePayment} className="pay-button">Pay Rent</button>

            <div className="reviews-section">
                <h3>Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.review_id} className="review-card">
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
