import React, { useState, useEffect } from "react";
import "../styles/productPage.css"; // REQUIRED for Vite styling

const ProductGallery = ({ images }) => {
  // Ensure images is always an array
  const safeImages = Array.isArray(images) ? images : [];

  const [main, setMain] = useState(safeImages[0] || "/placeholder.jpg");

  // Update main image when product changes (important for navigation between products)
  useEffect(() => {
    setMain(safeImages[0] || "/placeholder.jpg");
  }, [images]);

  if (safeImages.length === 0) return null;

  return (
    <div className="gallery">
      <img
        src={main}
        alt="Main product"
        className="main-img"
        loading="lazy"
      />

      <div className="thumb-row">
        {safeImages.map((img, i) => (
          <img
            src={img}
            key={i}
            className={`thumb ${main === img ? "active" : ""}`}
            onClick={() => setMain(img)}
            loading="lazy"
            alt={`Thumbnail ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
