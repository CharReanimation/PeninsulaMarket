import React, { useEffect, useState } from "react"; // React
import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom"; // React Router DOM

// Config
import { miningAbi, miningTokenContractAddress } from "./scripts/Config/contractConfig";

// Hooks
import useAccount from "./scripts/Hooks/useAccount"; // Required: abi, contractAddress

/* Pages */
/* Login Non-required */
import Nav from "./scripts/Public/Nav";
import Home from "./scripts/Public/Home";
import About from "./scripts/Public/About";
import Login from "./scripts/Public/Login";

/* Login Required */
import Mining from "./scripts/Private/Mining";
import Profile from "./scripts/Private/Profile";
import Store from "./scripts/Private/Store";
import TokenTransfer from "./scripts/Private/TokenTransfer";
import NFTCreate from "./scripts/Private/NFTCreation";
import Raffle from "./scripts/Private/Raffle";


const App = () => {
  // Account
  const [currentAccount, setCurrentAccount] = useState("");

  // Hooks
  const { account } = useAccount(miningAbi, miningTokenContractAddress); // Use Account: Get Account From Contract

  // Handle login
  const handleLogin = (address) => {
    if (account.toLowerCase() === address.toLowerCase()) {
      setCurrentAccount(address); // Save current account
      alert("Login Successful!");
    }
    else {
      alert("Wrong Account!");
    }
  };

  // Protect routes if not logged in
  const RequireLogin = ({ children }) => {
    if (!account) {
      return <Navigate to="/login" />;
    }
    if (account.toLowerCase() !== currentAccount.toLowerCase()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div>
        {/* Nav*/}
        <Nav isLoggedIn={account.toLowerCase() === currentAccount.toLowerCase()} />

        {/* Routes */}
        <Routes>
          {/* Home */}
          <Route path="/home" element={<Home />} />

          {/* Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* About */}
          <Route path="/about" element={<About />} />


          {/* Store */}
          <Route
            path="/store"
            element={
              <RequireLogin>
                <Store />
              </RequireLogin>
            }
          />

          {/* Mining */}
          <Route
            path="/mining"
            element={
              <RequireLogin>
                <Mining />
              </RequireLogin>
            } />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <RequireLogin>
                <Profile />
              </RequireLogin>
            }
          />

          {/* Token Transfer */}
          <Route
            path="/token-transfer"
            element={
              <RequireLogin>
                <TokenTransfer />
              </RequireLogin>
            }
          />

          {/* NFT Create */}
          <Route
            path="/nft-create"
            element={
              <RequireLogin>
                <NFTCreate />
              </RequireLogin>
            }
          />

          {/* Raffle */}
          <Route
            path="/raffle"
            element={
              <RequireLogin>
                <Raffle />
              </RequireLogin>
            }
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
