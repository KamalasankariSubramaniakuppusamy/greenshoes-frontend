import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openAccount, setOpenAccount] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">GreenShoes</Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/wishlist" className="nav-item">Wishlist</NavLink>
        <NavLink to="/cart" className="nav-item">Cart</NavLink>

        {/* ACCOUNT DROPDOWN */}
        <div
          className="nav-item account-menu"
          onMouseEnter={() => setOpenAccount(true)}
          onMouseLeave={() => setOpenAccount(false)}
        >
          <span className="nav-item">My Account ▾</span>

          {openAccount && (
            <div className="dropdown-menu">

              {/* GUEST USER */}
              {!user && (
                <div className="guest-box">
                  <p className="guest-title">
                    Happy to have you here!
                  </p>
                  <p className="guest-subtitle">
                    Create an account for an effortless shopping experience.
                  </p>

                  <Link to="/register" className="btn-create">Create Account</Link>

                  <p className="italic-note">Already have an account?</p>
                  <Link to="/login" className="login-link">Login</Link>
                </div>
              )}

              {/* LOGGED-IN USER */}
              {user && (
                <div className="user-box">
                  <p className="user-welcome">Hello, {user.name}</p>

                  <Link to="/profile" className="menu-link">My Profile</Link>
                  <Link to="/orders" className="menu-link">My Orders</Link>

                  <button className="logout-btn" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
