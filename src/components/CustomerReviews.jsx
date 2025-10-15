import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ali Khan",
    country: "🇵🇰 Pakistan",
    date: "Oct 10, 2025",
    text: "I purchased a Free Fire account and received it within 5 minutes! The design of the site is super smooth and easy to use.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sarah Ahmed",
    country: "🇮🇳 India",
    date: "Oct 8, 2025",
    text: "Everything was fast and secure. The reviews are real, and I felt safe making my first purchase here.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "John Smith",
    country: "🇬🇧 UK",
    date: "Oct 3, 2025",
    text: "Super easy interface. Loved the glassmorphism design. I’ll definitely recommend this to my friends!",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=8",
  },
];

export default function CustomerReviews() {
  return (
    <section
      id="reviews"
      className="py-20 px-6 bg-white/5 backdrop-blur-xl rounded-2xl max-w-6xl mx-auto text-center"
    >
      {/* 🏷️ Section Title */}
      <motion.h2
        className="text-4xl font-bold mb-10 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        What Our Customers Say 💬
      </motion.h2>

      {/* 💬 Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="relative group p-6 bg-gradient-to-b from-white/10 to-white/5 rounded-xl shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all overflow-hidden text-left"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* ✨ Animated Glow Border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-pink-500/30 via-cyan-400/30 to-purple-500/30 blur-lg rounded-xl"></div>

            {/* 💭 Review Content */}
            <div className="relative z-10">
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-white/30"
                />
                <div>
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    {review.name}
                    <span className="text-blue-400 text-xs bg-white/10 px-2 py-0.5 rounded-full">
                      ✔ Verified
                    </span>
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {review.country} • {review.date}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-200 italic mb-4">“{review.text}”</p>

              {/* ⭐ Rating Stars */}
              <div className="flex text-yellow-400 text-lg">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
