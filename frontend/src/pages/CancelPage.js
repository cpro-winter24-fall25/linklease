import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
    return (
        <div>
            <h1>Payment Cancelled</h1>
            <p>We haven't received your payment yet.</p>
            <p>Your payment was not completed.</p>
            
            {/* Link back to home page */}
            <Link to="/" style={{ display: "block", marginTop: "20px", textDecoration: "none", color: "blue" }}>
                Go back to Home
            </Link>
        </div>
    );
};

export default CancelPage;
