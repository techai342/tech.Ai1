// src/pages/AccountPage.jsx
import React, { useState } from "react";
import ThemeManager from "../components/ThemeManager";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const accountModules = import.meta.glob("../accounts/*.jsx", { eager: true });

export default function AccountPage() {
  const accounts = Object.values(accountModules).map((mod) => mod.default);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white">
      {/* 🌈 THEME BACKGROUND */}
      <ThemeManager />

      {/* 🧭 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
          <h1
            onClick={() => scroll.scrollToTop({ duration: 700, smooth: true })}
            className="text-xl font-bold text-cyan-400 cursor-pointer"
          >
            Legendary FF IDs
          </h1>

          <ul className="hidden md:flex space-x-8 text-sm font-semibold text-white">
            <li>
              <ScrollLink
                to="buy"
                smooth
                duration={600}
                offset={-80}
                className="cursor-pointer hover:text-cyan-400 transition"
              >
                Buy ID
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="policies"
                smooth
                duration={600}
                offset={-80}
                className="cursor-pointer hover:text-cyan-400 transition"
              >
                Policies
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact"
                smooth
                duration={600}
                offset={-80}
                className="cursor-pointer hover:text-cyan-400 transition"
              >
                Contact Us
              </ScrollLink>
            </li>
          </ul>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/10 text-center py-3 space-y-3">
            <ScrollLink
              to="buy"
              smooth
              duration={600}
              offset={-80}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer hover:text-cyan-400 transition"
            >
              Buy ID
            </ScrollLink>
            <ScrollLink
              to="policies"
              smooth
              duration={600}
              offset={-80}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer hover:text-cyan-400 transition"
            >
              Policies
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth
              duration={600}
              offset={-80}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer hover:text-cyan-400 transition"
            >
              Contact Us
            </ScrollLink>
          </div>
        )}
      </nav>

      {/* 🛍 ACCOUNTS SECTION */}
      <section
        id="buy"
        className="pt-24 pb-10 max-w-7xl mx-auto px-5 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
          🔥 Free Fire Accounts for Sale
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.length > 0 ? (
            accounts.map((AccountComponent, index) => (
              // 🪄 ❌ Removed extra card div — Account components handle their own design
              <AccountComponent key={index} />
            ))
          ) : (
            <p className="text-center text-gray-300 col-span-full">
              No accounts available right now.
            </p>
          )}
        </div>
      </section>

      {/* 📜 POLICIES SECTION */}
      <section
        id="policies"
        className="max-w-5xl mx-auto mt-20 text-gray-300 relative z-10 px-6"
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">📜 Our Policies</h2>
        <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
          <li>✅ Once the ID is sold, it cannot be returned or exchanged.</li>
          <li>🔒 Full account information will be provided after payment.</li>
          <li>🛡 We do not sell hacked or banned IDs.</li>
          <li>⚡ If you face any issues within 24 hours, contact our support.</li>
          <li>📢 Serious buyers only — no refunds for change of mind.</li>
        </ul>
      </section>

      {/* 📞 CONTACT SECTION */}
      <section
        id="contact"
        className="max-w-5xl mx-auto mt-20 text-center relative z-10 mb-10 px-6"
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">📞 Contact Us</h2>
        <p className="text-gray-300 mb-4">
          For any inquiries or support, reach out via WhatsApp.
        </p>
        <a
          href="https://wa.me/923478936242?text=Hi%20I%20want%20to%20buy%20an%20ID"
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          WhatsApp Us
        </a>
      </section>
    </div>
  );
}
