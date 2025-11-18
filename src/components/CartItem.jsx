import { useCart } from "../context/CartContext.jsx";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  // 1. Prevent crash if item loads slowly or disappears after deletion
  if (!item) return null;

  const price = item.salePrice || item.price;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-thumb" />

      <div className="cart-info">
        <h3>{item.name}</h3>

        {item.size && <p>Size: {item.size}</p>}
        {item.color && <p>Color: {item.color}</p>}

        <p className="price">${(price * item.quantity).toFixed(2)}</p>

        <div className="qty-control">
          <button
            onClick={() =>
              item.quantity > 1
                ? updateQuantity(item, item.quantity - 1)
                : null
            }
          >
            –
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item, item.quantity + 1)}
          >
            +
          </button>
        </div>

        <button
          className="remove-btn"
          onClick={() => removeItem(item)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
