import React from "react";
import "../styles/productPage.css"; // ensures consistent styling

const Rating = ({ value = 0, text = "" }) => {
  if (!value) return null; // nothing to show

  // Convert number rating → stars
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="rating">
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}

      {/* Half star */}
      {halfStar === 1 && <span className="star half">☆</span>}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} className="star empty">☆</span>
        ))}

      {text && <span className="rating-text">{text}</span>}
    </div>
  );
};

export default Rating;
