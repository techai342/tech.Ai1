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
        <li>✅ Only serious buyers are entertained — time-wasters will not be entertained.</li>
        <li>💳 Full payment must be completed before receiving any account details. All transactions are 100% secure.</li>
        <li>🆔 To sell your ID, you must provide a clear video, link, binding details, and your expected price.</li>
        <li>🤝 Once the buyer approves the ID, the seller must transfer it first. Payment is released after verification.</li>
        <li>⏳ Any issue must be reported within 7 days of the transaction. After this period, we are not responsible for disputes.</li>
      </ul>
    </section>
  );
}
