import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SellPage() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden px-4"
      style={{
        backgroundImage: `url(/freefire-background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔸 Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🧭 Content */}
      <div className="relative z-10 max-w-2xl w-full glass-card p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-orange-400"
        >
          💰 Sell Your Free Fire ID
        </motion.h1>

        <p className="text-gray-200 mb-6 text-sm sm:text-base">
          Sell your Free Fire account safely and quickly through our secure panel.  
          Fill the form below to submit your ID for selling.
        </p>

        {/* 📝 Form */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Your Player ID"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-gray-300"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Account Price (PKR)"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-gray-300"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact Number / WhatsApp"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-gray-300"
            />
          </div>
          <div>
            <textarea
              placeholder="Write Account Details (Skins, Level, etc)"
              rows="4"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-gray-300"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg"
          >
            🚀 Submit for Selling
          </motion.button>
        </form>

        {/* 🏠 Back to home */}
        <div className="mt-6">
          <Link
            to="/"
            className="text-orange-400 hover:underline text-sm sm:text-base"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
