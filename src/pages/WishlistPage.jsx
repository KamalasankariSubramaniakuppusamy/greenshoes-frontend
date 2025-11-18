import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (item) => {
    addToCart({
      product: item._id,
      name: item.name,
      image: item.images?.[0],
      price: item.price,
      salePrice: item.salePrice,
      size: item.variants?.[0]?.size || "Default",
      color: item.variants?.[0]?.color || "Default",
      quantity: 1,
    });

    removeFromWishlist(item._id);
  };

  if (wishlist.length === 0)
    return (
      <div className="empty-wishlist">
        <h2>Your wishlist is empty ❤️</h2>
        <p>Save your favorite GreenShoes and revisit them anytime.</p>
        <Link className="btn" to="/">Browse Products</Link>
      </div>
    );

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item._id}>
            <Link to={`/product/${item._id}`}>
              <img src={item.images?.[0]} alt={item.name} className="wish-img" />
            </Link>

            <h3>{item.name}</h3>

            <p className="price">
              {item.salePrice ? (
                <>
                  <span className="sale">${item.salePrice}</span>
                  <span className="original">${item.price}</span>
                </>
              ) : (
                `$${item.price}`
              )}
            </p>

            <div className="wish-actions">
              <button
                className="btn-small"
                onClick={() => moveToCart(item)}
              >
                Move to Cart
              </button>

              <button
                className="btn-remove"
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
