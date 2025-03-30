import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/SuccessPage.css";

const SuccessPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get("propertyId");

    useEffect(() => {
        if (propertyId) {
            // Call the API to update the property status
            axios.post("http://localhost:4000/update-property-status", { propertyId })
                .then(response => {
                    console.log(response.data.message); // Log success message
                })
                .catch(err => {
                    console.error("Error updating property status:", err);
                });
        }
    }, [propertyId]);

    return (
        <div className="success-container">
            <div className="success-box">
                <h1>Payment Successful!</h1>
                <p>Your transaction has been completed.</p>
                <p>You have successfully rented the property!</p>
                <p>If you have any questions, feel free to contact us.</p>

                <Link to="/" className="home-link">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
