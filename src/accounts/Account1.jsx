import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Account18() {
  const images = [
    "https://i.supaimg.com/635a0255-9a1e-4c2e-aadb-226388c0452e.jpg",
    "https://i.supaimg.com/b5af89a5-e5a2-46ad-bdee-4cf0a8fb3784.jpg",
    "https://i.supaimg.com/4de8b55d-2196-402c-b84b-64404cb94d26.jpg",
    "https://i.supaimg.com/84e5d4e5-4117-429d-b7bb-b9c4241d33ff.jpg",
    "https://i.supaimg.com/993d287a-0e36-443f-b56f-b7992090b15b.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const nextSlide = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  const prevSlide = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.12)] max-w-5xl mx-auto mt-10 hover:scale-[1.02] transition"
    >
      {/* Image Slider - no extra blank space */}
      <div className="relative rounded-xl overflow-hidden bg-black flex justify-center items-center">
        <img
          src={images[current]}
          alt={`FF Account ${current + 1}`}
          className="w-full h-auto object-contain transition-all duration-500"
          style={{
            aspectRatio: "1230 / 540", // 👈 maintain perfect landscape shape
            display: "block",
          }}
        />

        {/* Arrows */}
        <button
          onClick={prevSlide}
          aria-label="previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 z-20"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          aria-label="next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 z-20"
        >
          <FaArrowRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 w-full flex justify-center space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index ? "bg-cyan-400 scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="mt-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
          💥 Legendary Free Fire Account #18 🔥
        </h2>

        <p className="text-gray-300 mt-2 text-sm">
          Top Rare Skins • 9 EVO Guns • 250+ Vault Items • Joker & Dino Bundles • Rare Emotes
        </p>

        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <span className="text-pink-400 font-semibold text-lg">
            💰 Price: DM for Best Offer
          </span>

          <div className="flex gap-3">
            <a
              href="https://wa.me/923478936242?text=Hi%20I%20want%20to%20buy%20Account%2018"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold text-sm shadow"
            >
              Buy Now (WhatsApp)
            </a>

            <button
              onClick={() => setShowDetail((s) => !s)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.12)] font-semibold text-sm text-white"
            >
              {showDetail ? "Hide Details" : "View Full Details"}
            </button>
          </div>
        </div>
      </div>

      {/* Full Details — fully expanded, no scroll */}
      {showDetail && (
        <div className="mt-6 bg-white/5 p-6 rounded-xl border border-white/10 text-gray-300 text-sm leading-relaxed space-y-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
              🔫 GUN SKINS & EVO GUNS (LEVEL 4+)
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>🌙 Total EVO Guns – 9 (All Level 4+ with Tokens)</li>
              <li>🌈 Rare UMP – Art of War</li>
              <li>🌟 Top Groza – Incubator Skin</li>
              <li>👀 Top AUG – Incubator Skin</li>
              <li>🌟 Top Yellow M1887 – Incubator Skin</li>
              <li>🕸 Top AWM – Incubator Skin</li>
              <li>🌗 P90 ++ Rate of Fire Skin</li>
              <li>✨ MAC10 Skin</li>
              <li>💫 AK47 ++ Damage Skin</li>
              <li>💫 M1014 Skin</li>
              <li>🌟 SVD Skin</li>
              <li>⚡ Trogon Skin</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
              👕 BUNDLES & OUTFITS
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>🧢 Level 64</li>
              <li>💎 250+ Rare Vault Items</li>
              <li>🌚 2 Joker Bundles</li>
              <li>🌙 3 Dino Bundles</li>
              <li>🌟 2 Money Heist Bundles</li>
              <li>☄ Black Pony Bundle</li>
              <li>📨 2 Legendary Bundles (Booyah Day & Rampage)</li>
              <li>👕 Black Shirt</li>
              <li>👖 Anglic Pants (Red, Blue, Jazz)</li>
              <li>💧 Top Hair Sets</li>
              <li>⚡ Body Wear</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
              🕺 RARE EMOTES
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>🌙 Top 2 Entry Emotes</li>
              <li>💧 50+ Rare Emotes</li>
              <li>🔪 Group Emote</li>
              <li>🌹 Rose Emote</li>
              <li>⚡ Justice Emote</li>
              <li>🌈 And Many More…</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
              🌟 EXTRA FEATURES
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>☄ 1 Look Changer</li>
              <li>👑 Exclusive Shirts & Incubator Items</li>
            </ul>
          </div>

          <p className="font-semibold text-lg text-pink-400">
            📢 Serious buyers only — no time pass.
          </p>
          <p className="italic text-gray-400">
            #FreeFireAccount #EvoGuns #RareBundles #TopVault #FreeFireSale
          </p>
        </div>
      )}
    </motion.div>
  );
}

