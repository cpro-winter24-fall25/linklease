import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
        <div>
            <h1>Payment Successful!</h1>
            <p>Your transaction has been completed.</p>
            <p>You have successfully rented the property!</p>
            <p>If you have any questions, feel free to contact us.</p>
            
            {/* Link back to home page */}
            <Link to="/" style={{ display: "block", marginTop: "20px", textDecoration: "none", color: "blue" }}>
                Go back to Home
            </Link>
        </div>
    );
};

export default SuccessPage;
