import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to see results?",
    answer:
      "Most services start delivering within a few hours, with full completion within 24–72 hours depending on the service.",
  },
  {
    question: "Are your services safe?",
    answer:
      "Yes, we use safe and reliable methods that won't put your accounts at risk of being banned.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept JazzCash, EasyPaisa, bank transfer, and cryptocurrency for your convenience.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer refunds if we're unable to deliver the service as promised. Please contact us for details.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 relative text-white overflow-hidden bg-transparent"
    >
      {/* ✨ Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        {/* 🧠 Title */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions ❓
        </motion.h2>
        <p className="text-center text-white/70 mb-12 text-base sm:text-lg">
          Find answers to common questions about our services
        </p>

        {/* 📜 FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-pink-400" : "text-gray-400"
                  }`}
                />
              </button>

              {/* ✨ Answer */}
              <div
                className={`mt-3 text-white/80 text-sm sm:text-base leading-relaxed overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
