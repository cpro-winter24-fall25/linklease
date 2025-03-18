import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = ({ type }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "renter",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const endpoint = type === "login" ? "/auth/login" : "/auth/register";

        try {
            const response = await fetch(`http://localhost:4000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Something went wrong");

            if (type === "login") {
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{type === "login" ? "Login" : "Register"}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {type === "register" && (
                        <>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                            <select name="role" value={formData.role} onChange={handleChange} className="input-field">
                                <option value="renter">Renter</option>
                                <option value="landlord">Landlord</option>
                            </select>
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <button type="submit" className="auth-button">
                        {type === "login" ? "Login" : "Register"}
                    </button>
                </form>
                <p className="switch-link">
                    {type === "login" ? (
                        <>
                            Don't have an account? <a href="/register">Register</a>
                        </>
                    ) : (
                        <>
                            Already have an account? <a href="/login">Login</a>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
