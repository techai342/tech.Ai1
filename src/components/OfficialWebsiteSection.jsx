import { motion } from "framer-motion";

const searchSteps = [
  "Open Google Search on your mobile or desktop browser.",
  "Type saqib242 in the search box and press enter.",
  "Open the result named Official Mr Saqib Website / TECH.AI.",
];

export default function OfficialWebsiteSection() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950/70 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:p-12"
      >
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Official Mr Saqib Website
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Search <span className="bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">saqib242</span> on Google
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              This is the official Mr Saqib / TECH.AI website for AI tools, social media services,
              Free Fire accounts, panels, editing tools, and updates. If you are searching for
              Saqib242, choose the official website result to stay connected with the real TECH.AI platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/search?q=saqib242"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-pink-500/20 transition hover:scale-105"
              >
                Search saqib242
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Official Support
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-bold text-white">How to find us</h3>
            <ol className="mt-6 space-y-4">
              {searchSteps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl bg-black/30 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
