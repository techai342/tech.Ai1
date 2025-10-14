import React from "react";

export default function Policies() {
  return (
    <section
      id="policies"
      className="max-w-5xl mx-auto mt-20 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl text-gray-300"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        📜 Our Policies
      </h2>
      <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
        <li>✅ Once the ID is sold, it cannot be returned or exchanged.</li>
        <li>🔒 Full account information will be provided after payment.</li>
        <li>🛡 We do not sell hacked or banned IDs.</li>
        <li>⚡ If you face any issues within 24 hours, contact our support.</li>
        <li>📢 Serious buyers only — no refunds for change of mind.</li>
      </ul>
    </section>
  );
}
