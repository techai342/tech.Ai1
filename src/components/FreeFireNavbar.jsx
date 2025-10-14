import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FreeFireNavbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Team", to: "team" },
    { name: "About", to: "about" },
    { name: "Reviews", to: "reviews" },
    { name: "Policies", to: "policies" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-white">
          FreeFire<span className="text-orange-400">Hub</span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-2xl md:hidden focus:outline-none"
        >
          ☰
        </button>

        {/* Menu */}
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-black/70 md:bg-transparent md:static md:flex md:items-center`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-center">
            {navItems.map((item, i) => (
              <li key={i}>
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={700}
                  offset={-80}
                  onClick={() => setOpen(false)}
                  className="block py-3 md:py-0 px-4 text-white hover:text-orange-400 cursor-pointer transition-colors"
                >
                  {item.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
