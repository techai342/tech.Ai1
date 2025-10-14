import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 text-center max-w-5xl mx-auto relative overflow-hidden"
    >
      {/* ✨ Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl"></div>

      {/* 🧠 Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative text-5xl sm:text-6xl font-extrabold mb-8 
                   bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 
                   bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,255,0.4)]"
      >
        About Us
      </motion.h2>

      {/* 💫 Laser Divider Line (Glow + Slide Animation) */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "180px", opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
        className="relative mx-auto mb-10 h-[3px] 
                   bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 
                   rounded-full shadow-[0_0_20px_rgba(255,0,255,0.6)]"
      >
        {/* 🔥 Glow pulse on divider */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[2px]"></div>
      </motion.div>

      {/* 🪩 Animated Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative text-lg sm:text-xl text-gray-300 leading-relaxed 
                   px-4 sm:px-8 md:px-16 lg:px-24"
      >
        Welcome to{" "}
        <span className="text-pink-500 font-semibold animate-pulse">
          TECH.AI
        </span>{" "}
        — ✨ This Website Has Everything You Need!
. Here you find{" "}
        <span className="text-cyan-400 font-semibold">
          🌐 All Social Media Services | 🚀 All Pro Version Apps | 📱 Virtual Numbers | 🔫 Free Fire Sensitivity & Panels | 🧠 Best AI Tools | 🎨 Powerful Editing Tools | 🕹 PUBG Hack
        </span>{" "}
        and{" "}
        <span className="text-purple-400 font-semibold">
          AND all HACKS
        </span>{" "}
        that bring your digital vision to life. Our MISSION to provide All in ONE ✨.
      </motion.p>

      {/* 🌈 Floating Glow Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        transition={{ duration: 2, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 
                   w-[300px] h-[300px] bg-gradient-to-r from-pink-500 to-cyan-400 
                   rounded-full blur-[120px] opacity-30 animate-pulse"
      ></motion.div>
    </section>
  );
}
