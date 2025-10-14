import React from "react";
import "./SellNavbar.css"; // Animation CSS

export default function SellNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-500 to-emerald-600 py-3 overflow-hidden shadow-lg">
      <div className="sell-marquee">
        <span className="sell-text font-semibold text-white text-lg tracking-wide">
          💰 Please fill the details to sell an account 💰
        </span>
        {/* 👇 Duplicate text to make infinite seamless loop */}
        <span className="sell-text font-semibold text-white text-lg tracking-wide">
          💰 Please fill the details to sell an account 💰
        </span>
      </div>
    </nav>
  );
}
