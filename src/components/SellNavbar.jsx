import React from "react";
import "./SellNavbar.css"; // We'll make animation here

export default function SellNavbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 overflow-hidden sticky top-0 z-50">
      <div className="sell-marquee whitespace-nowrap">
        <span className="sell-text font-semibold text-white text-lg">
          💰 Please fill the details to sell an account 💰
        </span>
      </div>
    </nav>
  );
}
