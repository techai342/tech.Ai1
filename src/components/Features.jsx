import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaGamepad,
  FaTools,
  FaRobot,
  FaBolt,
  FaGlobe,
  FaMobileAlt,
} from "react-icons/fa";
import { SiPubg } from "react-icons/si";
import { MdStore } from "react-icons/md";

const features = [
  { id: 1, title: "Social Media Service", icon: <FaGlobe className="text-4xl text-cyan-400" />, link: "https://saqib-pannelpk.vercel.app" },
  { id: 2, title: "Premium App Version", icon: <FaMobileAlt className="text-4xl text-pink-400" />, link: "https://muhammad-saqib21.vercel.app/" },
  { id: 3, title: "WhatsApp Bot", icon: <FaWhatsapp className="text-4xl text-green-400" />, link: "https://muhammad-saqib30.vercel.app/" },
  { id: 4, title: "Best AI Tool", icon: <FaRobot className="text-4xl text-purple-400" />, link: "https://ailogin.vercel.app/" },
  { id: 5, title: "Free Virtual Number", icon: <FaBolt className="text-4xl text-yellow-400" />, link: "https://sms.stats.tel/" },
  { id: 6, title: "Editing Store", icon: <MdStore className="text-4xl text-blue-400" />, link: "https://editing-tool-login.vercel.app/" },
  { id: 7, title: "Hack Tools", icon: <FaTools className="text-4xl text-red-400" />, link: "https://muhammad-saqib42.vercel.app/" },
  { id: 8, title: "Free Fire", icon: <FaGamepad className="text-4xl text-orange-400" />, link: "https://freefire-five.vercel.app/" },
  { id: 9, title: "PUBG", icon: <SiPubg className="text-4xl text-yellow-500" />, link: "https://pubg-login.vercel.app/" },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 relative text-white overflow-hidden bg-transparent"
    >
      {/* ✨ Soft Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        {/* 🧠 Title */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Our Powerful Features
        </motion.h2>

        {/* ⚡ Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-8">
          {features.map((feature, index) => (
            <motion.a
              key={feature.id}
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                rotate: 0.6,
                boxShadow: "0px 0px 25px rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-5 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg transition-all duration-500 ease-out cursor-pointer"
            >
              {/* 🌈 Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 blur-2xl transition duration-700 ease-out"></div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                <div className="transition-transform duration-700 ease-out group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  Tap to explore
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}


