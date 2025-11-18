import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();

  // Calculate subtotal (handles salePrice)
  const itemsPrice = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="shop-now">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem
            key={`${item._id}-${item.size}-${item.color}`} // FIXED
            item={item}
          />
        ))}
      </div>

      <div className="cart-summary">
        <p>Subtotal: ${itemsPrice.toFixed(2)}</p>

        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
