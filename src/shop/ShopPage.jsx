import { motion } from "framer-motion";

export default function ForSalePage() {
  const products = [
    {
      id: 1,
      name: "CapCut Pro",
      price: "400 Rs",
      img: "https://i.supaimg.com/42a000ab-df0f-4bd7-92c2-b6307bb1aef5.png",
    },
    {
      id: 2,
      name: "Free Fire Panel",
      price: "900 Rs",
      img: "https://i.supaimg.com/ec5d7050-19b1-4948-bc9c-9bc02f07d5ff.jpg",
    },
    {
      id: 3,
      name: "Netflix Screen",
      price: "700 Rs",
      img: "https://i.supaimg.com/fe058907-22bb-488d-ae15-b3038a93389c.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
        >
          ??? Our Products For Sale
        </motion.h1>
        <p className="text-gray-300 mt-3">
          Buy premium tools and apps at the best prices!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:scale-105 transition"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold text-cyan-300">{item.name}</h3>
            <p className="text-gray-300 mt-1">{item.price}</p>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold">
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
