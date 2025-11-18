import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/orderDetails.css";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrder(data);
      } catch (err) {
        setError("Unable to load order.");
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [id]);

  if (loading) return <div className="loader">Loading order...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return null;

  // computed prices
  const itemsPrice = order.orderItems.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );
  const shippingPrice = order.shippingPrice || 0;
  const taxPrice = order.taxPrice || 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Dummy delivery estimate (enhance later)
  const deliveryEstimate = order.isDelivered
    ? "Delivered"
    : "Estimated delivery: 3–5 business days";

  // INTERNAL TRACKING STEPS MAPPING
  const steps = [
    { label: "Order Placed", completed: true },
    { label: "Processing", completed: order.isProcessing || true },
    { label: "Shipped", completed: order.isShipped || false },
    { label: "Out for Delivery", completed: order.isOutForDelivery || false },
    { label: "Delivered", completed: order.isDelivered || false },
  ];

  const downloadInvoice = () => {
    alert("Invoice download will be implemented later.");
  };

  const printPage = () => window.print();

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>

      {/* SUMMARY HEADER */}
      <div className="order-summary-header">
        <div>
          <div className="label">Order ID</div>
          <div className="value">{order._id}</div>
        </div>

        <div>
          <div className="label">Placed On</div>
          <div className="value">
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div>
          <div className="label">Status</div>
          <div
            className={`status ${
              order.isDelivered ? "delivered" : "processing"
            }`}
          >
            {order.isDelivered ? "Delivered" : "Processing"}
          </div>
        </div>
      </div>

      {/* DELIVERY ESTIMATE */}
      <div className="section">
        <h2>Delivery</h2>
        <p>{deliveryEstimate}</p>
      </div>

      {/* TRACKING TIMELINE */}
      <div className="section">
        <h2>Tracking</h2>
        <div className="tracking-timeline">
          {steps.map((step, index) => (
            <div key={index} className="tracking-step">
              <div
                className={`circle ${
                  step.completed ? "completed" : "incomplete"
                }`}
              ></div>
              <p className={step.completed ? "completed-text" : ""}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="section">
        <h2>Shipping Address</h2>
        <p>
          {order.shippingAddress.addressLine} <br />
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.zip}
        </p>
      </div>

      {/* PAYMENT */}
      <div className="section">
        <h2>Payment Method</h2>
        <p>{order.paymentMethod}</p>
      </div>

      {/* ITEMS */}
      <div className="section">
        <h2>Items</h2>
        <div className="items-list">
          {order.orderItems.map((item) => (
            <div className="item-row" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-variants">
                  Size: {item.size} | Color: {item.color}
                </div>
                <div className="item-qty">Qty: {item.quantity}</div>
              </div>

              <div className="item-price">
                ${(item.salePrice || item.price) * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICE SUMMARY */}
      <div className="section price-summary">
        <h2>Price Summary</h2>

        <ul>
          <li>
            <span>Items:</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </li>
          <li>
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </li>
          <li>
            <span>Tax:</span>
            <span>${taxPrice.toFixed(2)}</span>
          </li>
          <li className="total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </li>
        </ul>
      </div>

      {/* BUTTONS */}
      <div className="actions-row">
        <button onClick={printPage} className="action-btn">
          Print Receipt
        </button>

        <button onClick={downloadInvoice} className="action-btn">
          Download Invoice
        </button>

        <button
          onClick={() => (window.location.href = "/support")}
          className="action-btn"
        >
          Contact Support
        </button>

        <button
          onClick={() => (window.location.href = "/cart")}
          className="btn reorder-btn"
        >
          Reorder
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
