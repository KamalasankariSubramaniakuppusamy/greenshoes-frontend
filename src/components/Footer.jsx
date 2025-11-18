import React from "react";
import "../styles/footer.css"; // ensure footer styles load

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} <strong>GreenShoes</strong> — Wear the Ocean, Walk the Change.</p>
    </footer>
  );
};

export default Footer;
