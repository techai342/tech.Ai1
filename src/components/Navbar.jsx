import { useState, useEffect } from "react";
import RotatingLogo from "./RotatingLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Products", link: "#products" },
    { name: "Pricing", link: "#pricing" },  // 🆕 ✅ Pricing Section Added
    { name: "About", link: "#about" },
    { name: "Team", link: "#team" },
    { name: "Reviews", link: "#reviews" },
    { name: "Contact", link: "#contact" },
  ];

  // 🔥 Active section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      const sections = menuItems.map((item) => ({
        id: item.link.replace("#", ""),
        el: document.querySelector(item.link),
      }));
      for (let section of sections) {
        if (
          section.el &&
          scrollY >= section.el.offsetTop &&
          scrollY < section.el.offsetTop + section.el.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔥 Logo Section */}
        <div className="flex items-center space-x-3 -ml-3 md:-ml-4">
          <div className="w-10 h-10">
            <RotatingLogo />
          </div>
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,0,255,0.4)]">
            TECH.AI
          </h1>
        </div>

        {/* 🌐 Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <a
                href={item.link}
                className={`relative px-4 py-2 rounded-xl border border-white/10 text-white transition-all duration-300
                  ${
                    activeSection === item.link.replace("#", "")
                      ? "bg-gradient-to-r from-cyan-400/40 to-pink-500/40 shadow-[0_0_18px_rgba(255,0,255,0.4)]"
                      : "bg-white/5 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-pink-500/30"
                  }`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSection === item.link.replace("#", "") && (
                  <span className="absolute inset-0 rounded-xl blur-lg bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-70 animate-pulse"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* 📱 Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-400 text-3xl"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          ☰
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg text-white text-center py-4 space-y-3">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setOpen(false)}
              className={`block text-base mx-8 py-2 rounded-lg border border-white/10 transition-all duration-300
                ${
                  activeSection === item.link.replace("#", "")
                    ? "bg-gradient-to-r from-cyan-400/40 to-pink-500/40 shadow-[0_0_15px_rgba(255,0,255,0.4)]"
                    : "bg-white/10 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-pink-500/30"
                }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
