import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/PropertyDetailsPage.css";

const port = 4000;

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchPropertyDetails();
        fetchReviewsForProperty();

        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
            setUserId(decoded.user_id);
        }
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/properties/${id}`);
            setProperty(response.data);
        } catch (error) {
            console.error("Error fetching property details:", error);
        }
    };

    const fetchReviewsForProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/reviews`);
            const propertyReviews = response.data.filter(
                (review) => review.property_id === Number(id)
            );
            setReviews(propertyReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post(
                `http://localhost:${port}/create-checkout-session`,
                {
                    propertyId: id,
                    price: property.price,
                    title: property.title,
                },
                {
                    withCredentials: true,
                }
            );
            window.location.href = response.data.url;
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-property/${id}`);
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this property?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:${port}/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Property deleted successfully.");
            navigate("/home");
        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Failed to delete property.");
        }
    };

    const handleEditReview = (reviewId) => {
        console.log("Edit review:", reviewId);
        navigate(`/edit-review/${reviewId}`); // ✅ now enabled
    };

    const handleDeleteReview = async (reviewId) => {
        const confirm = window.confirm("Delete this review?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:${port}/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Review deleted.");
            fetchReviewsForProperty();
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete review.");
        }
    };

    if (!property) return <div className="loading">Loading property details...</div>;

    const isLandlordOwner = userRole === "landlord" && userId === property.owner_id;

    return (
        <div className="property-details-container">
            <span onClick={() => navigate("/home")} className="create-link">Back</span>

            {isLandlordOwner && (
                <div className="landlord-actions">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

            <h2>{property.title}</h2>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Type:</strong> {property.property_type}</p>
            {property.image && <img src={property.image} alt={property.title} />}

            {isLoggedIn && !isLandlordOwner && (
                <button onClick={handlePayment}>Rent Property</button>
            )}

            <div className="reviews-section">
                <div className="reviews-header">
                    <h3 className="reviews-title">Reviews</h3>
                    {isLoggedIn && !isLandlordOwner && (
                        <button
                            className="review-action-button"
                            onClick={() => navigate(`/add-review/${id}`)}
                        >
                            Add Review
                        </button>
                    )}
                </div>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.review_id} className="review-card">
                            <div className="review-content">
                                <div>
                                    <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                                    <p>{review.review_text}</p>
                                </div>

                                {userId === review.user_id && (
                                    <div className="review-actions">
                                        <img
                                            src="/icons/pencil-line.png"
                                            alt="Edit"
                                            className="review-icon"
                                            onClick={() => handleEditReview(review.review_id)}
                                        />
                                        <img
                                            src="/icons/delete-bin-6-line.png"
                                            alt="Delete"
                                            className="review-icon"
                                            onClick={() => handleDeleteReview(review.review_id)}
                                        />
                                    </div>
                                )}
                            </div>
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
