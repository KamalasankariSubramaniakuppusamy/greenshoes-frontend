import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/navbar.css";   // 🔥 REQUIRED for styling in Vite

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  // Safely calculate item count
  const cartCount = cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <nav className="navbar">
      <Link to="/" className="brand">GreenShoes</Link>

      <div className="nav-links">
        <Link to="/wishlist">Wishlist</Link>

        <Link to="/cart" className="cart-link">
          Cart ({cartCount})
        </Link>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/profile">
              {user.name?.split(" ")[0] || "User"}
            </Link>

            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
