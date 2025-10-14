import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import FreeFireNavbar from "./components/FreeFireNavbar";  // ✅ Import FreeFireNavbar

import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import ProductCarousel from "./components/ProductCarousel";
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

function Layout() {
  const location = useLocation();

  // ✅ Show FreeFireNavbar only on /freefire
  const isFreeFirePage = location.pathname === "/freefire";

  return (
    <div className="min-h-screen overflow-x-hidden relative font-[Poppins] text-white scroll-smooth">
      {/* Background Theme */}
      <div className="absolute inset-0 -z-10">
        <ThemeManager />
      </div>

      {/* ✅ Navbar Handling */}
      {isFreeFirePage ? <FreeFireNavbar /> : <Navbar />}

      {/* Routes */}
      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <HeroSection />
                </motion.div>
              </section>

              <section id="features">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <Features />
                </motion.div>
              </section>

              <section id="products">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <ProductCarousel />
                </motion.div>
              </section>

              <section id="pricing">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <PricingSection />
                </motion.div>
              </section>

              <section id="about">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <About />
                </motion.div>
              </section>

              <section id="faq">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <FAQSection />
                </motion.div>
              </section>

              <section id="team">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <TeamSection />
                </motion.div>
              </section>

              <section id="reviews">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <CustomerReviews />
                </motion.div>
              </section>

              <section id="contact">
                <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} transition={{ duration: 1 }}>
                  <Contact />
                </motion.div>
              </section>
            </>
          }
        />

        {/* 🆓 Free Fire Page */}
        <Route path="/freefire" element={<FreeFirePage />} />

        {/* 🟩 ID Buy Page → uses its OWN navbar (no change) */}
        <Route path="/buy" element={<AccountsPage />} />

        {/* 🟥 Sell Page → uses default Navbar */}
        <Route path="/sell" element={<SellPage />} />
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
