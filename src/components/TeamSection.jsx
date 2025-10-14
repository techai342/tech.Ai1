import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const team = [
  {
    name: "Muhammad Saqib",
    role: "AI MASTER",
    img: "https://i.supaimg.com/ad170c21-39c3-445b-8621-cd9226eab998.jpg",
    whatsapp: "923478936242", // ✅ 92 instead of 0 for WhatsApp links
  },
  {
    name: "Muhammad Ahad",
    role: "TECH.CONTROL",
    img: "https://i.supaimg.com/fb842d17-21a4-4f9e-8eab-cfc2d297161d.png",
    whatsapp: "923071356242",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="py-24 px-6 max-w-6xl mx-auto text-center relative"
    >
      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-3xl"></div>

      {/* 💫 Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-14 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        MEET OWNERS
      </motion.h2>

      {/* 👥 Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative z-10">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255, 0, 255, 0.3)",
            }}
            className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg transition-all hover:bg-white/20"
          >
            {/* 🖼️ Profile Image */}
            <div className="relative w-36 h-36 mx-auto mb-5">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover rounded-full border-2 border-cyan-400 shadow-lg group-hover:rotate-3 transition-transform duration-500"
              />
              {/* 💫 Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 opacity-20 blur-lg group-hover:opacity-50 transition duration-500"></div>
            </div>

            {/* 👤 Info */}
            <h3 className="text-2xl font-semibold mb-1 text-white">
              {member.name}
            </h3>
            <p className="text-pink-400 font-medium mb-5">{member.role}</p>

            {/* 💬 WhatsApp Contact Button */}
            <motion.a
              href={`https://wa.me/${member.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(37,211,102,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all"
            >
              <FaWhatsapp className="text-lg" />
              Contact NOW
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
