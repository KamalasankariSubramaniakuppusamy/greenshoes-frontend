import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const RegisterPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    // Client-side checks
    if (inputs.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (inputs.password !== inputs.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      // Save user
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (e) {
      setError(
        e.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Create Account</h2>

      {error && <div className="error">{error}</div>}

      <input
        name="name"
        placeholder="Name"
        required
        onChange={change}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={change}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={change}
      />

      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        required
        onChange={change}
      />

      <button disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterPage;
