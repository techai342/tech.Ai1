import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import freefireBg from "/freefire-background.jpg";

export default function SellPage() {
  const [level, setLevel] = useState("");
  const [rank, setRank] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  // 🟢 Apna WhatsApp number yahan likho (country code ke sath)
  const whatsappNumber = "923478936242"; // 👈 yahan apna number daalna hai

  const handleSubmit = () => {
    if (!level || !rank || !price || !details) {
      alert("⚠️ Please fill all fields before sending!");
      return;
    }

    // 🧾 Message jo WhatsApp par bhejna hai
    const message = `🟡 *Free Fire Account Sell Request* 🟡\n
👉 Level: ${level}
🏆 Rank: ${rank}
💰 Price: ${price} PKR
📝 Details: ${details}`;

    // 📲 WhatsApp URL create
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // 🔁 Redirect to WhatsApp
    window.open(url, "_blank");
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${freefireBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          🛒 Sell Your Free Fire Account
        </h1>

        {/* Level */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">🔥 Account Level</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="e.g. 70"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Rank */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">🏆 Account Rank</label>
          <input
            type="text"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="e.g. Grandmaster"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">💰 Price (PKR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">📝 Account Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter your account details..."
            rows="4"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all"
        >
          📲 Send on WhatsApp
        </motion.button>

        {/* Back Button */}
        <Link
          to="/freefire"
          className="block text-center mt-4 text-sm text-gray-300 hover:text-white underline"
        >
          ⬅ Back to Free Fire Page
        </Link>
      </motion.div>
    </section>
  );
}
