import React, { useState, useEffect } from "react";
import "../styles/productPage.css";

const VariantSelector = ({ variants = [], onSelect }) => {
  // Safety: ensure variants is always an array
  const safeVariants = Array.isArray(variants) ? variants : [];

  // Extract unique size/color lists
  const sizes = [...new Set(safeVariants.map((v) => v.size))];
  const colors = [...new Set(safeVariants.map((v) => v.color))];

  // Default selections
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");

  // Notify parent page when selection changes
  useEffect(() => {
    onSelect({
      size: selectedSize,
      color: selectedColor,
    });
  }, [selectedSize, selectedColor]);

  if (!safeVariants.length) return null; // No variants → no selector

  return (
    <div className="variant-selector">
      <div className="variant-group">
        <label>Size:</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="variant-group">
        <label>Color:</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VariantSelector;
