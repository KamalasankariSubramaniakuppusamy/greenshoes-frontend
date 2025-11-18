import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [error, setError] = useState("");

  // Load default address
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const { data } = await axios.get("/api/addresses", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const def = data.find((a) => a.isDefault);
        setDefaultAddress(def || null);
      } catch {
        setError("Unable to load address information.");
      }
    };

    loadAddress();
  }, [user]);

  if (!user)
    return (
      <div className="profile-page">
        <h2>You are not logged in.</h2>
        <Link to="/login">Login</Link>
      </div>
    );

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {defaultAddress ? (
          <p>
            <strong>Default Address:</strong>  
            {defaultAddress.line1}, {defaultAddress.city}, {defaultAddress.state}  
          </p>
        ) : (
          <p className="grey">No default address set.</p>
        )}

        {error && <div className="error">{error}</div>}
      </div>

      <div className="profile-links">
        <Link className="btn" to="/orders">My Orders</Link>
        <Link className="btn-outline" to="/addresses">Manage Addresses</Link>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
