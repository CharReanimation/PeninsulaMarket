import React from "react"; // React
import { useNavigate } from "react-router-dom"; // React Router DOM

// CSS
import "../../css/Public/Global.css";
import "../../css/Private/Logout.css";

// Logout
const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("Account");
        // Call onLogout
        if (onLogout) {
            onLogout();
        }

        // Log: Logout
        console.log("\n\n ---- ---- ---- ---- Logout ---- ---- ---- ---- \n\n")

        // Alert: Logout
        alert("Logout Successful!!!");

        // Navigate
        navigate("/login");
    };

    // Return: HTML
    return (
        <div className="global-page">
            <div id="logout-container">
                <h1 id="logout-h1">LOGOUT</h1>
                <button id="logout-btn" onClick={handleLogout}>
                    LOGOUT
                </button>
            </div>
        </div>
    );
};

// Export
export default Logout;