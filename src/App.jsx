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

// 🧩 Auto import all tools from tools folder
const toolModules = import.meta.glob("./tools/*.jsx", { eager: true });
const toolPages = Object.entries(toolModules).map(([path, mod]) => {
  const name = path.split("/").pop().replace(".jsx", "").toLowerCase();
  return { name, Component: mod.default };
});

function Layout() {
  const location = useLocation();
  const isFreeFirePage = location.pathname === "/freefire";

  return (
    <div className="min-h-screen overflow-x-hidden relative font-[Poppins] text-white scroll-smooth">
      {/* Background Theme */}
      <div className="absolute inset-0 -z-10">
        <ThemeManager />
      </div>

      {/* Navbar */}
      {isFreeFirePage ? <FreeFireNavbar /> : <Navbar />}

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

