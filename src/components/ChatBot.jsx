import React, { useEffect, useRef, useState } from "react";
import { businessInfo, products, faqs } from "../data/FAQContent";

export default function ChatBot({ apiUrl = "https://corsproxy.io/?https://api.nekolabs.web.id/ai/cf/gpt-oss-120b?text=", language = "auto" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const boxRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages, open]);

  function nextId() {
    const id = idRef.current;
    idRef.current += 1;
    return id;
  }

  function findLocalAnswer(text) {
    const t = String(text || "").toLowerCase();
    for (const p of products || []) {
      const name = String(p.name || "").toLowerCase();
      if (!name) continue;
      const tokens = name.split(/\s+/).filter(Boolean);
      if (t.includes(name) || tokens.some(tok => t.includes(tok))) {
        return `Product: ${p.name}\nPrice: ${p.price}\nDetails: ${p.details || ""}`;
      }
    }
    for (const f of faqs || []) {
      const q = String(f.q || "").toLowerCase();
      const words = q.split(/\W+/).filter(Boolean).slice(0, 6);
      if (words.length === 0) continue;
      if (words.every(w => t.includes(w))) return `Q: ${f.q}\nA: ${f.a}`;
      if (words.some(w => t.includes(w))) return `Q: ${f.q}\nA: ${f.a}`;
    }
    if (t.includes("contact") || t.includes("whatsapp") || t.includes("number") || t.includes("phone")) {
      return `Contact: ${businessInfo.whatsapp} (WhatsApp). Business owner: ${businessInfo.owner}`;
    }
    return null;
  }

  function addMessage(role, text) {
    const msg = { id: nextId(), role, text };
    setMessages(prev => [...prev, msg]);
    return msg.id;
  }

  function removeMessageById(id) {
    setMessages(prev => prev.filter(m => m.id !== id));
  }

  function renderMarkdown(md) {
    if (!md) return "";
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let text = esc(md);
    text = text.replace(/```([\s\S]*?)```/g, (m, p1) => `<pre style="white-space:pre-wrap;"><code>${p1}</code></pre>`);
    text = text.replace(/^### (.*$)/gim, "<h3 style=\"margin:6px 0;font-weight:600\">$1</h3>");
    text = text.replace(/^## (.*$)/gim, "<h2 style=\"margin:6px 0;font-weight:600\">$1</h2>");
    text = text.replace(/^# (.*$)/gim, "<h1 style=\"margin:6px 0;font-weight:700\">$1</h1>");
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/\n/g, "<br/>");
    return text;
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || thinking) return;
    addMessage("user", `🧑 ${text}`);
    setInput("");
    const local = findLocalAnswer(text);
    if (local) {
      addMessage("bot", `🤖 ${local}`);
      return;
    }
    setThinking(true);
    const placeholderId = addMessage("bot", language === "ur" ? "🤖 سوچ رہا ہوں..." : "🤖 Thinking...");
    try {
      let requestUrl = String(apiUrl || "");
      let data;
      if (!requestUrl) throw new Error("API URL not provided");
      if (requestUrl.includes("?") && requestUrl.endsWith("=")) {
        requestUrl = requestUrl + encodeURIComponent(text);
        const res = await fetch(requestUrl, { method: "GET" });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        data = await res.json();
      } else {
        const res = await fetch(requestUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        data = await res.json();
      }
      removeMessageById(placeholderId);
      let reply = "";
      if (data && typeof data === "object" && "result" in data) {
        reply = typeof data.result === "string" ? data.result : (data.result.response || JSON.stringify(data.result));
      } else if (typeof data === "string") {
        reply = data;
      } else {
        reply = JSON.stringify(data);
      }
      addMessage("bot", `🤖 ${reply}`);
    } catch (err) {
      removeMessageById(placeholderId);
      addMessage("bot", `⚠️ Error: ${err.message}`);
    } finally {
      setThinking(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform-gpu transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
            boxShadow: "0 8px 30px rgba(124,58,237,0.35), inset 0 -6px 20px rgba(167,139,250,0.12)",
          }}
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed right-6 bottom-24 z-40 transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`}
        style={{ width: "380px" }}
      >
        <div className="rounded-2xl p-3" style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.14), rgba(167,139,250,0.06))", border: "1px solid rgba(167,139,250,0.18)", backdropFilter: "blur(8px)" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-white font-semibold">TECH.AI Assistant</div>
              <div className="text-xs text-white/80">Free Fire accounts & site help</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setMessages([])} className="text-xs px-2 py-1 rounded bg-white/10">Clear</button>
              <button onClick={() => setOpen(false)} className="text-xs px-2 py-1 rounded bg-white/10">Close</button>
            </div>
          </div>

          <div ref={boxRef} className="max-h-72 overflow-auto rounded-lg p-2" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(255,255,255,0.02))" }}>
            {messages.length === 0 && <div className="text-sm text-white/80">{language === "ur" ? "Poochho kuch — main TECH.AI services me madad karunga." : "Ask anything about TECH.AI services."}</div>}

            {messages.map(m => (
              <div key={m.id} className={`my-2 ${m.role === "user" ? "ml-auto text-right" : ""}`}>
                <div className={`inline-block p-3 rounded-lg ${m.role === "user" ? "bg-white/90 text-black" : "bg-gradient-to-r from-purple-700/40 to-purple-500/30 text-white"}`} style={{ maxWidth: "85%" }}>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={2}
              placeholder={language === "ur" ? "Apna message type karen..." : "Type your message..."}
              className="w-full resize-none rounded-md p-2 text-sm bg-white/95 text-black border border-white/20"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-white/70">{thinking ? (language === "ur" ? "Responding…" : "Responding…") : ""}</div>
              <div className="flex gap-2">
                <button onClick={() => setInput("Show me available Free Fire accounts and prices.")} className="text-xs px-3 py-1 rounded bg-white/10">Example</button>
                <button onClick={sendMessage} disabled={thinking} className="text-sm px-3 py-2 rounded" style={{ background: "linear-gradient(90deg,#a78bfa,#7c3aed)", color: "white" }}>Send</button>
              </div>
            </div>

            <div className="mt-2 text-xs text-white/75">Want to buy? Tap <a href={`https://wa.me/${businessInfo.whatsapp}`} target="_blank" rel="noreferrer" className="underline">WhatsApp</a>.</div>
          </div>
        </div>
      </div>
    </>
  );
}
