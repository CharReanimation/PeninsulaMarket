import React, { useEffect } from "react"; // React

// Config
import { miningAbi, miningTokenContractAddress } from "../Config/contractConfig";

// Hook
import useAccount from "../Hooks/useAccount"; // Required: miningAbi, miningTokenContractAddress

// CSS
import "../../css/Public/Global.css";
import "../../css/Private/Profile.css";

// Profile
const Profile = () => {
  // Hooks
  const { account, balance, refreshBalance } = useAccount(miningAbi, miningTokenContractAddress); // Use Account

  // Force Refresh Balance
  useEffect(() => {
    if (refreshBalance) {
      refreshBalance();
    }
  }, [refreshBalance]);

  // Check ABI
  if (!Array.isArray(miningAbi)) {
    console.error("Invalid ABI format. Ensure ABI is an array.");
    return <div>Error: Invalid ABI format.</div>;
  }

  // Return: HTML
  return (
    <div className="global-page">
      <div className="profile-container">
        <h1 id="profile-h1">PROFILE</h1>
        <div id="profile-data">
          <div id="profile-img-container">
            <img id="profile-img" src="https://i.ytimg.com/vi/AI31fP7Tg4Q/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwe6rEyyrUw4HH0e6Cc_3p7f9b-A" alt="Sample Image" width="200"></img>
          </div>
          <p>WELCOME!</p>
          <p>
            <strong>Account: </strong>{account}
            <br></br>
            <strong>Balance: </strong>{balance} TOKENS
          </p>
        </div>
      </div>
    </div>
  );
};

// Export
export default Profile;