import React from "react";
import { Link, useLocation } from "react-router-dom";

// CSS
import "../../css/Public/Nav.css";

// Nav
const Nav = ({ isLoggedIn }) => {
  // Current Location
  const location = useLocation();
  // Log: Current Location
  console.log("\nCurrent Path: ", location.pathname);

  // Log: Current Login State
  console.log("\nCurrent Login State: ", isLoggedIn);

  // Return
  return (
    <nav
      style={{
        backgroundColor: isLoggedIn ? "#C51F5E" : "black",
      }}
    >

      {/* Home Logo */}
      <Link to="/home" className="nav-logo">
        <img src="/img/175521572.png" alt="Logo" className="nav-logo-image" />{" "}
      </Link>

      {/* Home */}
      <ul>
        <li>
          <Link
            to="/home"
            className={location.pathname === "/home" ? "active" : ""}
          >
            HOME
          </Link>
        </li>

        {/* About */}
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            ABOUT
          </Link>
        </li>


        {/* LOGIN Required */}
        {/* Store */}
        {isLoggedIn && (
          <li>
            <Link
              to="/store"
              className={location.pathname === "/store" ? "active" : ""}
            >
              STORE
            </Link>
          </li>
        )}

        {/* Mining */}
        {isLoggedIn && (
          <li>
            <Link
              to="/mining"
              className={location.pathname === "/mining" ? "active" : ""}
            >
              MINING
            </Link>
          </li>
        )}

        {/* Token Transfer */}
        {isLoggedIn && (
          <li>
            <Link
              to="/token-transfer"
              className={location.pathname === "/token-transfer" ? "active" : ""}
            >
              TRANSFER
            </Link>
          </li>
        )}

        {/* NFT Create */}
        {isLoggedIn && (
          <li>
            <Link
              to="/nft-create"
              className={location.pathname === "/nft-create" ? "active" : ""}
            >
              NFT CREATE
            </Link>
          </li>
        )}

        {/* Raffle */}
        {isLoggedIn && (

          < li >
            <Link
              to="/raffle"
              className={location.pathname === "/raffle" ? "active" : ""}
            >
              RAFFLE
            </Link>
          </li>
        )}

        {/* Profile */}
        {isLoggedIn && (
          <li>
            <Link
              to="/profile"
              className={location.pathname === "/profile" ? "active" : ""}
            >
              PROFILE
            </Link>
          </li>
        )}

        {/* LOGIN */}
        {!isLoggedIn && (
          <li>
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
            >
              LOGIN
            </Link>
          </li>
        )}

        {/* LOGOUT */}
        {isLoggedIn && (
          <li>
            <Link
              to="/logout"
              className={location.pathname === "/logout" ? "active" : ""}
            >
              LOGOUT
            </Link>
          </li>
        )}

      </ul>
    </nav >
  );
};

export default Nav;
