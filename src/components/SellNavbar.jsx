import React from "react";
import "./SellNavbar.css"; // For animation

export default function SellNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-500 to-emerald-600 py-3 overflow-hidden">
      <div className="sell-marquee whitespace-nowrap">
        <span className="sell-text font-semibold text-white text-lg">
          💰 Please fill the details to sell an account 💰
        </span>
      </div>
    </nav>
  );
}
