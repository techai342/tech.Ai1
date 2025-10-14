import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Element } from "react-scroll";
import "./FreeFirePage.css";

// 🧭 ✅ Use FreeFireNavbar instead of main Navbar
import FreeFireNavbar from "../components/FreeFireNavbar";

// 🧩 Sections
import About from "../components/About";
import Policies from "../components/Policies";
import CustomerReviews from "../components/CustomerReviews";
import Contact from "../components/Contact";
import TeamSection from "../components/TeamSection";

// 🖼️ Assets
import freefireBg from "/freefire-background.jpg";
import freefireLogo from "/freefire-logo.png";
import freefireCharacter from "/freefire-character.png";

export default function FreeFirePage() {
  return (
    <div className="text-white font-[Poppins]">
      {/* 🧭 ✅ FreeFire Navbar */}
      <FreeFireNavbar />

      {/* 🟠 Hero Section */}
      <Element name="home">
        <section
          className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
          style={{
            backgroundImage: `url(${freefireBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 🔸 Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* 🔥 Logo */}
          <motion.img
            src={freefireLogo}
            alt="Free Fire Logo"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-8 left-4 w-36 sm:w-48 md:w-56"
          />

          {/* 🧍 Character */}
          <motion.img
            src={freefireCharacter}
            alt="Free Fire Character"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 right-0 w-[220px] sm:w-[350px] lg:w-[480px]"
          />

          {/* ✨ Text + Buttons */}
          <div className="relative z-10 px-4 max-w-2xl mt-20">
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
              className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg"
            />

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-6">
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
                  className="w-full sm:w-auto"
                >
                  <Link
                    to={btn.to}
                    className={`block w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-gradient-to-r ${btn.gradient} shadow-lg hover:scale-105 transition-transform font-semibold`}
                  >
                    {btn.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Element>
      
   {/* 📝 Policies Section */}
      <Element name="policies">
        <section className="py-16 px-4 bg-black/70">
          <div className="max-w-7xl mx-auto">
            <Policies />
          </div>
        </section>
      </Element>
      
      {/* 🧾 About Section */}
      <Element name="about">
        <section className="py-16 px-4 bg-black/70">
          <div className="max-w-7xl mx-auto">
            <About />
          </div>
        </section>
      </Element>

      {/* 🧑 Team Section */}
      <Element name="team">
        <section className="py-16 px-4 bg-black/80">
          <div className="max-w-7xl mx-auto">
            <TeamSection />
          </div>
        </section>
      </Element>

      {/* 🌟 Reviews Section */}
      <Element name="reviews">
        <section className="py-16 px-4 bg-black/80">
          <div className="max-w-7xl mx-auto">
            <CustomerReviews />
          </div>
        </section>
      </Element>

      {/* 📞 Contact Section */}
      <Element name="contact">
        <section className="py-16 px-4 bg-black/70">
          <div className="max-w-7xl mx-auto">
            <Contact />
          </div>
        </section>
      </Element>
    </div>
  );
}
