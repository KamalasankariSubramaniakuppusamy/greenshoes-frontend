import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCard.css"; // required in Vite!

const ProductCard = ({ product }) => {
  if (!product) return null; // safety

  const {
    _id,
    name,
    price,
    salePrice,
    images = [],
  } = product;

  const mainImage = images?.length > 0 ? images[0] : "/placeholder.jpg"; // fallback

  return (
    <div className="product-card">
      <Link to={`/product/${_id}`}>
        <img
          src={mainImage}
          alt={name}
          className="product-thumb"
          loading="lazy"
        />

        <h3 className="product-name">{name}</h3>

        <p className="price">
          {salePrice ? (
            <>
              <span className="sale">${salePrice}</span>
              <span className="original">${price}</span>
            </>
          ) : (
            <span className="regular">${price}</span>
          )}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
