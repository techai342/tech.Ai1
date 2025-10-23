import React, { useState } from "react";

export default function TextToImage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateImage() {
    if (!text.trim()) {
      setError("⚠️ Please enter a text prompt first!");
      return;
    }

    setError("");
    setLoading(true);
    setImage("");

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("text", text);

      // 🔗 Use your local proxy (no CORS issue)
      const response = await fetch("/api/deepai-proxy", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("🔹 DeepAI Response:", data);

      if (data.output_url) {
        setImage(data.output_url);
      } else {
        setError("❌ Image generation failed. Try again!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("⚠️ Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          🎨 Text to Image Generator
        </h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something like 'cyberpunk city with neon lights'"
          className="w-full p-3 rounded-lg text-black outline-none mb-4"
        />

        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-pink-500 px-5 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

        {image && (
          <div className="mt-8 flex flex-col items-center">
            <img
              src={image}
              alt="Generated"
              className="rounded-2xl border border-white/20 shadow-[0_0_25px_rgba(255,0,255,0.3)] max-w-xs"
            />
            <a
              href={image}
              download
              className="mt-3 bg-white/10 px-4 py-2 rounded-lg text-cyan-300 hover:text-pink-400 transition"
            >
              ⬇️ Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
