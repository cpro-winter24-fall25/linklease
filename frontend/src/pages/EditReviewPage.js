import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AddReviewPage.css";

const port = 4000;

const EditReviewPage = () => {
    const { id } = useParams(); // review_id
    const navigate = useNavigate();
    const [rating, setRating] = useState("5");
    const [reviewText, setReviewText] = useState("");
    const [propertyId, setPropertyId] = useState(null); // For redirect after update

    useEffect(() => {
        fetchReview();
    }, [id]);

    const fetchReview = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/reviews`);
            const review = response.data.find((r) => r.review_id === Number(id));
            if (review) {
                setRating(review.rating.toString());
                setReviewText(review.review_text);
                setPropertyId(review.property_id);
            }
        } catch (error) {
            console.error("Error fetching review:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                `http://localhost:${port}/reviews/${id}`,
                {
                    rating,
                    review_text: reviewText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Review updated successfully!");
            navigate(`/property/${propertyId}`);
        } catch (error) {
            console.error("Error updating review:", error);
            alert("Failed to update review.");
        }
    };

    return (
        <div className="add-review-container">
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit} className="add-review-form">
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="5">⭐ 5 - Excellent</option>
                    <option value="4">⭐ 4 - Good</option>
                    <option value="3">⭐ 3 - Average</option>
                    <option value="2">⭐ 2 - Poor</option>
                    <option value="1">⭐ 1 - Terrible</option>
                </select>

                <label>Review:</label>
                <textarea
                    rows="5"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                ></textarea>

                <div className="edit-actions">
                    <div className="half-width-button">
                        <button type="button" onClick={() => navigate(`/property/${propertyId}`)}>Back</button>
                    </div>
                    <div className="half-width-button">
                        <button type="submit">Update Review</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default EditReviewPage;
