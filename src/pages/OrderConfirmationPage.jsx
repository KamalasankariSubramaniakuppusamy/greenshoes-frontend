import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setOrder(data);
      } catch (err) {
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (loading) return <div className="loader">Loading order...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div>No order found.</div>;

  return (
    <div className="confirm-page">
      <h1>Order Confirmed 🎉</h1>

      <h2>Order ID: {order._id}</h2>

      <div className="section">
        <h3>Shipping Address</h3>
        <p>
          {order.shippingAddress.line1}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} {order.shippingAddress.zip}
        </p>
      </div>

      <div className="section">
        <h3>Items Ordered</h3>
        {order.orderItems.map((item) => (
          <div key={item._id} className="confirm-item">
            {item.name} × {item.quantity}
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Order Summary</h3>
        <p>Items: ${order.itemsPrice.toFixed(2)}</p>
        <p>Shipping: ${order.shippingPrice.toFixed(2)}</p>
        <p>Tax: ${order.taxPrice.toFixed(2)}</p>
        <h2>Total: ${order.totalPrice.toFixed(2)}</h2>
      </div>

      <p>You’ll receive confirmation and tracking updates soon.</p>
    </div>
  );
};

export default OrderConfirmationPage;
