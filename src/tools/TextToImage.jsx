import { useState } from "react";
import { motion } from "framer-motion";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const resp = await fetch("https://api.deepai.org/api/text2img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "YOUR_API_KEY"
      },
      body: JSON.stringify({ text: prompt }),
    });

    const data = await resp.json();
    setImageUrl(data.output_url);
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-white backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-[0_0_20px_#00ffff] p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-cyan-300">? AI Text to Image Generator</h1>
      <input
        type="text"
        placeholder="Type your imagination..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-md p-3 rounded-lg bg-white/20 border border-white/30 text-center placeholder-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button
        onClick={generateImage}
        disabled={loading}
        className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full shadow-lg hover:shadow-[0_0_20px_#00ffff] transition-all"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt="Generated"
          className="mt-6 w-80 rounded-2xl shadow-[0_0_25px_#00ffff]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}