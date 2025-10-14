import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, color: "#1877F2", url: "https://www.facebook.com/share/1BynfYvhog/" },
    { name: "Instagram", icon: <FaInstagram />, color: "#E4405F", url: "https://www.instagram.com/mr_saqib242" },
    { name: "WhatsApp", icon: <FaWhatsapp />, color: "#25D366", url: "https://whatsapp.com/channel/0029Vb6bvtX3wtb21mil503V" },
    { name: "TikTok", icon: <FaTiktok />, color: "#010101", url: "https://www.tiktok.com/@mr_saqib_242?_t=ZS-90SImXww7He&_r=1" },
  ];

  return (
    <footer className="relative text-center py-16 bg-gradient-to-t from-[#0f0c29] to-transparent mt-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl font-bold mb-8 text-white"
      >
        Connect With Us
      </motion.h2>

      {/* Social Icons */}
      <div className="flex justify-center gap-6">
        {socialLinks.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10, boxShadow: `0 0 25px ${item.color}` }}
            transition={{ type: "spring", stiffness: 250 }}
            className="w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl cursor-pointer"
            style={{
              background: `radial-gradient(circle at center, ${item.color}33, transparent)`,
              border: `2px solid ${item.color}`,
            }}
          >
            <span
              style={{
                color: item.color,
                filter: `drop-shadow(0 0 10px ${item.color})`,
              }}
            >
              {item.icon}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Copyright */}
      <p className="mt-10 text-gray-400 text-sm">
        © 2025 TECH.AI All rights reserved.
      </p>

      {/* Soft Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
    </footer>
  );
}

