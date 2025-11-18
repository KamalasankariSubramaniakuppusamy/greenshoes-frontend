import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";       // ✔️ use API (auto baseURL, auto JWT)
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await API.get(`/api/products/${id}`); // ✔️ fixed
        setProduct(data);
      } catch {
        setError("Unable to load product details.");
      }
    };
    loadProduct();
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="loader">Loading...</div>;

  const handleAddToCart = () => {
    if (!size || !color) {
      setError("Please select both size and color.");
      return;
    }

    const variant = product.variants.find(
      (v) => v.size === size && v.color === color
    );

    if (!variant) {
      setError("Selected variant is unavailable.");
      return;
    }

    addToCart({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      price: product.price,
      salePrice: product.salePrice,
      size,
      color,
      quantity,
      variantId: variant._id,
    });

    setError("");
  };

  return (
    <div className="product-page">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="product-img"
      />

      <div className="product-details">
        <h1>{product.name}</h1>

        <p className="price">
          {product.salePrice ? (
            <>
              <span className="sale">${product.salePrice}</span>
              <span className="original">${product.price}</span>
            </>
          ) : (
            `$${product.price}`
          )}
        </p>

        <label>Size:</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Select size</option>
          {[...new Set(product.variants.map((v) => v.size))].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label>Color:</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select color</option>
          {[...new Set(product.variants.map((v) => v.color))].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number(e.target.value)))
          }
        />

        {error && <div className="error">{error}</div>}

        <button className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button
          className="wishlist-btn"
          onClick={() => addToWishlist(product)}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
