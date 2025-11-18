// src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";   // ✔️ use API, not axios
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // ✔️ fixed: use API
        const { data } = await API.get("/api/orders/myorders");
        setOrders(data);
      } catch {
        setError("Unable to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <div className="loader">Loading your orders...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!orders.length)
    return (
      <div className="empty-orders">
        <h2>You haven’t placed any orders yet.</h2>
        <Link to="/" className="btn">Shop Now</Link>
      </div>
    );

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <p><strong>Order Placed:</strong> {new Date(order.createdAt).toDateString()}</p>
                <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Items:</strong> {order.orderItems.length}</p>
              </div>
              <div>
                <p><strong>Status:</strong> {order.status || "Processing"}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
              </div>
            </div>

            <div className="order-items-preview">
              {order.orderItems.slice(0, 3).map((i) => (
                <img
                  src={i.image}
                  key={i._id}
                  alt={i.name}
                  className="thumb"
                />
              ))}
              {order.orderItems.length > 3 && (
                <span className="more">+{order.orderItems.length - 3} more</span>
              )}
            </div>

            <div className="order-footer">
              <Link to={`/orders/${order._id}`} className="btn-outline">
                View Details
              </Link>
              <Link
                to={`/product/${order.orderItems[0].product}`}
                className="btn-reorder"
              >
                Reorder
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
