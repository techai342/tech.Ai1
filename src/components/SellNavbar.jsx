import React from "react";
import "./SellNavbar.css";

export default function SellNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-500 to-emerald-600 py-3 overflow-hidden shadow-lg">
      <div className="sell-marquee">
        <span className="sell-text">
          💰 Please fill the details to sell an account 💰
        </span>
      </div>
    </nav>
  );
}
