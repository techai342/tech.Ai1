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
  const neonButtonClass =
    "relative block w-full sm:w-auto text-center px-8 py-3 rounded-lg text-white font-semibold uppercase tracking-wide border-2 border-cyan-400 bg-transparent shadow-[0_0_10px_#0ff] transition-all duration-300 overflow-hidden hover:scale-110 hover:shadow-[0_0_25px_#0ff,0_0_50px_#0ff] hover:text-cyan-300";

  const buttons = [
    { label: "ID Buy", to: "/buy", external: false },
    { label: "ID Sell", to: "/sell", external: false },
    { label: "Panels", to: "https://freefre-pannels.vercel.app/", external: true },
    { label: "Sensitivity", to: "https://freefire-five.vercel.app/", external: true },
  ];

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
              {buttons.map((btn, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="w-full sm:w-auto relative group"
                >
                  {/* Neon light burst effect */}
                  <span className="absolute inset-0 rounded-lg bg-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition duration-300"></span>

                  {btn.external ? (
                    <a
                      href={btn.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={neonButtonClass}
                    >
                      {btn.label}
                    </a>
                  ) : (
                    <Link to={btn.to} className={neonButtonClass}>
                      {btn.label}
                    </Link>
                  )}
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
