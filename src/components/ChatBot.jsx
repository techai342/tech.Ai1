// src/components/ChatBot.jsx
import React, { useEffect, useRef, useState } from "react";
import { businessInfo, products, faqs, freeFireAccounts } from "../data/FAQContent";

export default function ChatBot({
  apiUrl = "https://corsproxy.io/?https://api.nekolabs.web.id/ai/cf/gpt-oss-120b?text=",
  language = "auto",
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const boxRef = useRef(null);
  const idRef = useRef(1);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages, open]);

  // Speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join("");
      setInput(prev => (prev ? prev + " " + transcript : transcript));
    };
    recog.onend = () => setListening(false);
    recognitionRef.current = recog;
  }, []);

  function nextId() {
    const id = idRef.current;
    idRef.current += 1;
    return id;
  }

  function speakText(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(String(text));
    const lang = detectLang(text);
    utter.lang = lang;
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length) {
      const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0,2)));
      if (match) utter.voice = match;
    }
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }

  function detectLang(text) {
    if (/[؀-ۿ]/.test(text)) return "ur-PK";
    if (/[ا-ی]/.test(text)) return "ur-PK";
    return "en-US";
  }

  // Local answer handler
  function findLocalAnswer(text) {
    const t = String(text || "").toLowerCase().trim();

    // Greetings
    const greetings = ["hi","hello","hey","salam"];
    if (greetings.some(g => t === g || t.startsWith(g))) {
      return "Hello! How can I assist you today?";
    }

    // Words to ignore
    const ignoreWords = ["what","how","do","you","is","the","a","an","of","are","services","service"];
    const clean = (sentence) =>
      String(sentence || "").toLowerCase().split(/\W+/).filter(w => w && !ignoreWords.includes(w));

    // Products
    for (const p of products || []) {
      const tokens = clean(p.name);
      if (tokens.length > 0 && tokens.some(tok => t.includes(tok))) {
        return `Product: ${p.name}\nPrice: ${p.price}\nDetails: ${p.details || ""}`;
      }
    }
     // Check Free Fire / TikTok / other accounts
     for (const a of [...freeFireAccounts, ...tiktokAccounts] || []) {
      const tokens = a.name.toLowerCase().split(/\s+/);
      if (tokens.some(tok => t.includes(tok))) {
       // ✅ UK price detection
        if (t.includes("uk")) {
         return `Account: ${a.name}\nPrice (UK): ${a.priceUK}\nFollowers/Stars: ${a.followers || a.stars}\nRegion: ${a.region}\nDetails: ${a.details}`;
       } else {
         return `Account: ${a.name}\nPrice: ${a.price}\nFollowers/Stars: ${a.followers || a.stars}\nRegion: ${a.region}\nDetails: ${a.details}`;
    }
  }
}

    

    // FAQs
    const techKeywords = ["tech.ai","account","service","buy","price","order","payment"];
    if (techKeywords.some(k => t.includes(k))) {
      for (const f of faqs || []) {
        const words = clean(f.q);
        const matched = words.filter(w => t.includes(w));
        if (matched.length >= 2) return `Q: ${f.q}\nA: ${f.a}`;
      }
    }

    // Contact info
    if (t.includes("contact") || t.includes("whatsapp") || t.includes("number") || t.includes("phone")) {
      return `WhatsApp: +92${businessInfo.whatsapp} (Owner: ${businessInfo.owner})`;
    }

    return null;
  }

  function renderMarkdown(md) {
    if (!md) return "";
    const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    let text = esc(md);
    text = text.replace(/```([\s\S]*?)```/g, (m,p1)=>`<pre style="white-space:pre-wrap;padding:8px;border-radius:6px;background:#0b1220;"><code>${p1}</code></pre>`);
    text = text.replace(/^### (.*$)/gim,"<h3 style=\"margin:6px 0;font-weight:600\">$1</h3>");
    text = text.replace(/^## (.*$)/gim,"<h2 style=\"margin:6px 0;font-weight:600\">$1</h2>");
    text = text.replace(/^# (.*$)/gim,"<h1 style=\"margin:6px 0;font-weight:700\">$1</h1>");
    text = text.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g,"<em>$1</em>");
    text = text.replace(/\n/g,"<br/>");
    return text;
  }

  function addMessage(role,text) {
    const msg = { id: nextId(), role, text, ts: Date.now() };
    setMessages(prev=>[...prev,msg]);
    return msg.id;
  }

  function removeMessageById(id) {
    setMessages(prev=>prev.filter(m=>m.id!==id));
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || thinking) return;
    addMessage("user",`🧑 ${text}`);
    setInput("");
    const local = findLocalAnswer(text);
    if(local){
      const id = addMessage("bot",`🤖 ${local}`);
      if(autoSpeak) speakText(local);
      return;
    }
    setThinking(true);
    const placeholderId = addMessage("bot",language==="ur"?"🤖 سوچ رہا ہوں...":"🤖 Thinking...");
    try{
      let requestUrl = String(apiUrl || "");
      let data;
      if(!requestUrl) throw new Error("API URL not provided");
      if(requestUrl.includes("?") && requestUrl.endsWith("=")){
        requestUrl = requestUrl + encodeURIComponent(text);
        const res = await fetch(requestUrl,{method:"GET"});
        if(!res.ok) throw new Error(`API error ${res.status}`);
        data = await res.json();
      }else{
        const res = await fetch(requestUrl,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({text}),
        });
        if(!res.ok) throw new Error(`API error ${res.status}`);
        data = await res.json();
      }
      removeMessageById(placeholderId);
      let reply = "";
      if(data && typeof data === "object" && "result" in data){
        reply = typeof data.result === "string"?data.result:(data.result.response||JSON.stringify(data.result));
      }else if(typeof data === "string"){
        reply = data;
      }else{
        reply = JSON.stringify(data);
      }
      const id = addMessage("bot",`🤖 ${reply}`);
      if(autoSpeak) speakText(reply);
    }catch(err){
      removeMessageById(placeholderId);
      const id = addMessage("bot",`⚠️ Error: ${err.message}`);
      if(autoSpeak) speakText(`Error: ${err.message}`);
    }finally{
      setThinking(false);
    }
  }

  function handleKey(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}
  function toggleListening(){const recog=recognitionRef.current;if(!recog)return;if(listening){try{recog.stop();}catch(e){}setListening(false);}else{try{recog.lang="auto";recog.start();setListening(true);}catch(e){setListening(false);}}}

  return (
    <>
      {/* Chatbot Floating Button */}
      <div className="fixed right-4 bottom-6 z-[999999]">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform-gpu transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
            boxShadow: "0 12px 40px rgba(124,58,237,0.32), inset 0 -6px 20px rgba(167,139,250,0.12)",
          }}
          aria-label="Open TechChatBot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Chatbox Panel */}
      <div className={`fixed right-4 bottom-24 z-[99999] transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`} style={{ width: "min(92vw,420px)" }}>
        <div className="rounded-2xl p-3" style={{ background: "linear-gradient(180deg, rgba(12,8,22,0.72), rgba(30,10,50,0.42))", border: "1px solid rgba(167,139,250,0.16)", backdropFilter: "blur(8px)" }}>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-white font-semibold">TechChatBot</div>
              <div className="text-xs text-white/70">Free Fire accounts & site help</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <label className="text-white/70">AutoSpeak</label>
                <input type="checkbox" checked={autoSpeak} onChange={() => setAutoSpeak(v => !v)} className="w-4 h-4 rounded bg-white/10" />
              </div>
              <button onClick={() => setMessages([])} className="text-xs px-2 py-1 rounded bg-white/8">Clear</button>
              <button onClick={() => setOpen(false)} className="text-xs px-2 py-1 rounded bg-white/8">Close</button>
            </div>
          </div>

          {/* Messages */}
          <div ref={boxRef} className="max-h-[46vh] sm:max-h-72 overflow-auto rounded-lg p-2" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(255,255,255,0.02))" }}>
            {messages.length === 0 && <div className="text-sm text-white/70">{language === "ur" ? "Poochho kuch — main TECH.AI services me madad karunga." : "Ask anything about TECH.AI services."}</div>}
            {messages.map(m => (
              <div key={m.id} className={`my-2 ${m.role === "user" ? "ml-auto text-right" : ""}`}>
                <div className={`inline-block p-3 rounded-lg ${m.role === "user" ? "bg-white/90 text-black" : "bg-gradient-to-r from-purple-700/30 to-purple-500/20 text-white"}`} style={{ maxWidth: "85%" }}>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }} />
                  {m.role==="bot" && (
                    <div className="mt-2 flex items-center gap-2 justify-end">
                      <button onClick={()=>speakText(m.text)} className="text-xs px-2 py-1 rounded bg-white/6">🔊 Speak</button>
                      <button onClick={()=>{navigator.clipboard?.writeText(String(m.text))}} className="text-xs px-2 py-1 rounded bg-white/6">📋 Copy</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="mt-3">
            <div className="flex gap-2 items-center">
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={2}
                placeholder={language==="ur"?"Apna message type karen...":"Type your message..."}
                className="flex-1 resize-none rounded-md p-2 text-sm bg-white/95 text-black border border-white/8"
              />
              <button onClick={toggleListening} className={`w-10 h-10 rounded-full flex items-center justify-center ${listening?"bg-red-500 text-white":"bg-white/90 text-black"}`}>
                {listening?"●":<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v11m0 0a3 3 0 003-3V5a3 3 0 10-6 0v4a3 3 0 003 3zM19 11v2a7 7 0 01-14 0v-2" /></svg>}
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-white/70">{thinking ? (language==="ur"?"Responding…":"Responding…") : ""}</div>
              <div className="flex gap-2">
                <button onClick={()=>setInput("Show me available Free Fire accounts and prices.")} className="text-xs px-3 py-1 rounded bg-white/8">Example</button>
                <button onClick={sendMessage} disabled={thinking} className="text-sm px-3 py-2 rounded" style={{ background: "linear-gradient(90deg,#a78bfa,#7c3aed)", color: "white" }}>Send</button>
              </div>
            </div>

            <div className="mt-2 text-xs text-white/60">Want to buy? Tap <a href={`https://wa.me/${businessInfo.whatsapp}`} target="_blank" rel="noreferrer" className="underline">WhatsApp</a>.</div>
          </div>

        </div>
      </div>
    </>
  );
}
