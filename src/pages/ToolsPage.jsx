import React from "react";
import { motion } from "framer-motion";

// 🔥 Auto-import all tools from /tools folder
const toolModules = import.meta.glob("../tools/*.jsx", { eager: true });

export default function ToolsPage() {
  const tools = Object.entries(toolModules).map(([path, mod]) => {
    const name = path.split("/").pop().replace(".jsx", "");
    const ToolComponent = mod.default;
    return { name, ToolComponent };
  });

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-white p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-cyan-300 drop-shadow-[0_0_20px_#00ffff]">
        🧠 Explore AI Tools
      </h1>

      {/* 🧩 Display all tool components directly */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {tools.length > 0 ? (
          tools.map(({ name, ToolComponent }) => (
            <motion.div
              key={name}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:scale-105 transition-transform duration-300"
              whileHover={{ y: -5 }}
            >
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4 text-center">
                {name.replace(/([A-Z])/g, " $1")}
              </h2>
              <ToolComponent /> {/* 💡 Tool displays here */}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">
            No tools found. Add files in <code>src/tools/</code>.
          </p>
        )}
      </div>
    </motion.div>
  );
}
