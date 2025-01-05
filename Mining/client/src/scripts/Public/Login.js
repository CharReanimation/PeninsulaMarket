import React, { useState } from "react"; // React
import { useNavigate } from "react-router-dom"; // React Router DOM

// CSS
import "../../css/Public/Global.css";
import "../../css/Public/Login.css";

// Login
const Login = ({ onLogin }) => {
    const navigate = useNavigate(); // Nav
    const [Account, setAccount] = useState("");

    // Handle Login
    const handleLogin = () => {
        if (Account.trim() === "") {
            alert("Please provide a valid contract address.");
            return;
        }

        // Validate Ethereum address format
        if (!/^0x[a-fA-F0-9]{40}$/.test(Account)) {
            alert("Invalid Ethereum address format. Please enter a valid address.");
            return;
        }
        else {
            try {
                onLogin(Account); // Pass the contract address to the parent
                navigate("/mining"); // GO TO Mining Page
            } catch (error) {
                console.error("Error during login:", error);
                alert("Something went wrong during login.");
            }
        }

    };

    return (
        <div className="global-page">
            <div id="login-container">
                <h1 id="login-h1">LOGIN</h1>
                <p>Please enter your Account to continue:</p>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Enter Account"
                    value={Account}
                    onChange={(e) => setAccount(e.target.value.replace(/\s+/g, ""))}
                />
                <button className="login-btn" onClick={handleLogin}>Submit</button>
            </div>
        </div>
    );
};

// Export
export default Login;