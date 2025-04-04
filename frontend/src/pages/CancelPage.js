import React from "react";
import { Link } from "react-router-dom";
import "../styles/CancelPage.css";

const CancelPage = () => {
    return (
        <div className="cancel-container">
            <div className="cancel-box">
                <h1>Payment Cancelled</h1>
                <p>We haven't received your payment yet.</p>
                <p>Your payment was not completed.</p>

                <Link to="/" className="home-link">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default CancelPage;
