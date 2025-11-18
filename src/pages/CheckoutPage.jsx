import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [error, setError] = useState("");

  // Calculate prices
  const itemsPrice = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.07 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // LOAD ADDRESSES
  useEffect(() => {
    if (!user) return;

    const loadAddresses = async () => {
      try {
        const { data } = await API.get("/user/addresses", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setAddresses(data);

        const defaultAddr = data.find((a) => a.isDefault);
        setAddressId(defaultAddr ? defaultAddr._id : data[0]?._id || "");
      } catch (e) {
        console.error(e);
        setError("Unable to load addresses");
      }
    };

    loadAddresses();
  }, [user]);

  // PLACE ORDER
  const placeOrder = async () => {
    if (!addressId) {
      setError("Please select a shipping address.");
      return;
    }

    try {
      const shippingAddress = addresses.find((a) => a._id === addressId);

      const { data } = await API.post(
        "/orders",
        {
          orderItems: cart,
          shippingAddress,
          paymentMethod: "COD",
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (e) {
      console.error(e);
      setError(
        e.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    }
  };

  if (cart.length === 0)
    return (
      <div>
        Your cart is empty. <a href="/">Shop now</a>
      </div>
    );

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <section className="address-section">
        <h3>Select Shipping Address</h3>

        {addresses.length === 0 && <p>No addresses found.</p>}

        {addresses.map((a) => (
          <label key={a._id}>
            <input
              type="radio"
              checked={addressId === a._id}
              onChange={() => setAddressId(a._id)}
            />
            {a.line1}, {a.city}, {a.state} {a.zip}
            {a.isDefault && " (Default)"}
          </label>
        ))}
      </section>

      {error && <div className="error">{error}</div>}

      <section className="summary">
        <h3>Order Summary</h3>
        <p>Items: ${itemsPrice.toFixed(2)}</p>
        <p>Shipping: ${shippingPrice.toFixed(2)}</p>
        <p>Tax: ${taxPrice.toFixed(2)}</p>
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </section>

      <button className="btn" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
