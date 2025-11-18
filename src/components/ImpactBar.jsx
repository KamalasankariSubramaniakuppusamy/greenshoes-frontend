import React from "react";
import "../styles/productPage.css";  // <-- ensures correct styling

const ImpactBar = ({ impact }) => {
  if (!impact) return null; // Prevents crashes if backend sends null or undefined

  const {
    plasticRecycled = 0,
    carbonSaved = 0,
    oceanWasteRemoved = 0,
  } = impact; // prevents undefined errors

  return (
    <div className="impact-bar">
      <h4>Environmental Impact</h4>

      <p>Plastic Removed: <strong>{plasticRecycled}</strong> kg</p>
      <p>CO₂ Saved: <strong>{carbonSaved}</strong> kg</p>
      <p>Ocean Waste Removed: <strong>{oceanWasteRemoved}</strong> kg</p>
    </div>
  );
};

export default ImpactBar;
