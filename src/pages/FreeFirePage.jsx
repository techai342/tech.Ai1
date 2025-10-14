import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";  // ✅ FIXED: Import added
import "./FreeFirePage.css";

import freefireBg from "/freefire-background.jpg";
import freefireLogo from "/freefire-logo.png";
import freefireCharacter from "/freefire-character.png";

export default function FreeFirePage() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${freefireBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔸 Overlay for blur and dark background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* 🧭 Logo Animation */}
      <motion.img
        src={freefireLogo}
        alt="Free Fire Logo"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-10 left-6 w-48 sm:w-64"
      />

      {/* 🧍 Character Animation */}
      <motion.img
        src={freefireCharacter}
        alt="Free Fire Character"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] lg:w-[500px]"
      />

      {/* ✨ Text Animation */}
      <div className="relative z-10 px-4 max-w-2xl">
        <TypeAnimation
          sequence={[
            "🔥 Welcome to Free Fire Hub",
            2000,
            "🚀 Buy & Sell IDs Instantly",
            2000,
            "🎯 Fast. Safe. Trusted.",
            2000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          className="text-3xl sm:text-5xl font-bold mb-8 drop-shadow-lg"
        />

        {/* 🟠 Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            { label: "ID Buy", to: "/buy", gradient: "from-blue-500 to-purple-600" },
            { label: "ID Sell", to: "/sell", gradient: "from-green-500 to-emerald-600" },
            { label: "Panels", to: "/panel", gradient: "from-pink-500 to-rose-500" },
            { label: "Sensitivity", to: "/sensitivity", gradient: "from-yellow-500 to-orange-600" },
          ].map((btn, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <Link
                to={btn.to}
                className={`px-6 py-3 rounded-lg bg-gradient-to-r ${btn.gradient} shadow-lg hover:scale-110 transition-transform font-semibold`}
              >
                {btn.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
