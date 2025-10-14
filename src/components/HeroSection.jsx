import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] text-white z-10">
      {/* 📝 Heading Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold mb-4"
      >
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
          TECH.AI
        </span>
      </motion.h1>

      {/* 🪄 Paragraph Zoom-In Animation */}
      <motion.p
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-gray-300 max-w-xl mb-6 text-base md:text-lg"
      >
        ✨ Welcome to the Ultimate Website! 🌐 Get access to all social media services, pro version apps,
        virtual numbers, Free Fire sensitivity & panels, PUBG hacks, top AI tools, and powerful editing tools — all in one place. 🚀🔥
      </motion.p>

      {/* 🎯 Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* 🌟 Scroll to Feature Section */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ScrollLink
            to="features"
            smooth={true}
            duration={700}
            offset={-80}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] font-semibold transition-all cursor-pointer"
          >
            Get Started
          </ScrollLink>
        </motion.div>

        {/* 🆕 Free Fire Page Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/freefire"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(255,100,0,0.6)] font-semibold transition-all"
          >
            🔥 Free Fire
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
