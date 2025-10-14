import React from "react";

export default function NavbarAccounts() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl shadow-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* 🌟 Logo / Title */}
        <h1 className="text-xl font-bold text-cyan-400 tracking-wide">
          Legendary FF IDs
        </h1>

        {/* 🌐 Menu Links */}
        <ul className="flex space-x-8 text-sm font-semibold text-white">
          <li>
            <a
              href="#buy"
              className="hover:text-cyan-400 transition"
            >
              Buy ID
            </a>
          </li>
          <li>
            <a
              href="#policies"
              className="hover:text-cyan-400 transition"
            >
              Policies
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
