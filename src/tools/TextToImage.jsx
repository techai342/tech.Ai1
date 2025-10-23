import React, { useState } from "react";

export default function TextToImage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    if (!text.trim()) {
      alert("Please enter some text first!");
      return;
    }

    setLoading(true);
    setImage("");

    try {
      const formData = new FormData();
      formData.append("text", text);

      const resp = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
          "api-key": "5e750f82-e4b6-41ee-a1e4-60161fdb07c5", // 🔑 Use your valid DeepAI key here
        },
        body: formData,
      });

      const data = await resp.json();
      console.log("API response:", data);

      if (data.output_url) {
        setImage(data.output_url);
      } else {
        alert("Failed to generate image. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text (e.g. futuristic city in neon)"
        className="w-full p-3 rounded-lg text-black outline-none"
      />

      <button
        onClick={generateImage}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-pink-500 px-5 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {image && (
        <div className="mt-5 flex flex-col items-center">
          <img
            src={image}
            alt="Generated"
            className="rounded-xl border border-white/20 shadow-[0_0_25px_rgba(255,0,255,0.3)] max-w-sm"
          />
          <a
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-cyan-300 underline hover:text-pink-400 transition"
          >
            View Full Image
          </a>
        </div>
      )}
    </div>
  );
}
