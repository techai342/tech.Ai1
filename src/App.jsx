import { useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import FreeFireNavbar from "./components/FreeFireNavbar";
import ToolsPage from "./pages/ToolsPage";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import PricingSection from "./components/PricingSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThemeManager from "./components/ThemeManager";
import About from "./components/About";
import TeamSection from "./components/TeamSection";
import CustomerReviews from "./components/CustomerReviews";
import FAQSection from "./components/FAQSection";

import AccountsPage from "./accounts/AccountsPage";
import FreeFirePage from "./pages/FreeFirePage";
import SellPage from "./pages/SellPage";
import ChatBot from "./components/ChatBot";

// 🧩 Auto import all tools from tools folder
const toolModules = import.meta.glob("./tools/*.jsx", { eager: true });
const toolPages = Object.entries(toolModules).map(([path, mod]) => {
  const name = path.split("/").pop().replace(".jsx", "").toLowerCase();
  return { name, Component: mod.default };
});

function Layout() {
  const location = useLocation();
  const isFreeFirePage = location.pathname === "/freefire";
  const [showOfficialSitePopup, setShowOfficialSitePopup] = useState(true);

  const visitOfficialSite = () => {
    window.open("https://www.google.com/search?q=saqib242", "_blank", "noopener,noreferrer");
    setShowOfficialSitePopup(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative font-[Poppins] text-white scroll-smooth">
      {/* Background Theme */}
      <div className="absolute inset-0 -z-10">
        <ThemeManager />
      </div>

      {/* Navbar */}
      {isFreeFirePage ? <FreeFireNavbar /> : <Navbar />}

      {showOfficialSitePopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="max-w-md rounded-3xl border border-white/20 bg-slate-950/95 p-6 text-center shadow-2xl shadow-cyan-500/20">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Official Link</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white">Visit Mr Saqi Official Site</h2>
            <p className="mt-3 text-sm text-slate-300">Click below to search for Saqib242 on Google.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={visitOfficialSite}
                className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Visit Now
              </button>
              <button
                type="button"
                onClick={() => setShowOfficialSitePopup(false)}
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Routes>
        {/* 🏠 Home */}
        <Route
          path="/"
          element={
            <>
              <motion.section
                id="home"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <HeroSection />
              </motion.section>

              <motion.section
                id="features"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <Features />
              </motion.section>

              <motion.section
                id="pricing"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <PricingSection />
              </motion.section>

              <motion.section
                id="about"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <About />
              </motion.section>

              <motion.section
                id="faq"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <FAQSection />
              </motion.section>

              <motion.section
                id="team"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <TeamSection />
              </motion.section>

              <motion.section
                id="reviews"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <CustomerReviews />
              </motion.section>

              <motion.section
                id="contact"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 1 }}
              >
                <Contact />
              </motion.section>
            </>
          }
        />

        {/* 🆓 Free Fire Page */}
        <Route path="/freefire" element={<FreeFirePage />} />

         {/* 🆓 tools Page */}
        <Route path="/tools" element={<ToolsPage />} />
        
        {/* 🛒 Accounts Page */}
        <Route path="/buy" element={<AccountsPage />} />

        {/* 🟥 Sell Page */}
        <Route path="/sell" element={<SellPage />} />

        {/* ⚡ Auto AI Tools */}
        {toolPages.map(({ name, Component }) => (
          <Route key={name} path={`/${name}`} element={<Component />} />
        ))}
      </Routes>
      <ChatBot position="left" />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}


