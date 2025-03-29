import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/AddReviewPage.css";

const port = 4000;

const AddReviewPage = () => {
    const { id } = useParams(); // property_id from URL
    const navigate = useNavigate();
    const [rating, setRating] = useState("5");
    const [reviewText, setReviewText] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.user_id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                `http://localhost:${port}/reviews`,
                {
                    user_id: userId,
                    property_id: Number(id),
                    rating,
                    review_text: reviewText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Review submitted successfully!");
            navigate(`/property/${id}`);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        }
    };

    return (
        <div className="add-review-container">
            <h2>Add Review</h2>
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
                    placeholder="Write your review here..."
                    required
                ></textarea>

                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReviewPage;
