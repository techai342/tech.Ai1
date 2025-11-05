.import React, { useEffect, useRef, useState } from "react";
import { businessInfo, products, faqs } from "../data/FAQContent";

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

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join("");
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

  // ✅ Updated Local Answer Handler
  function findLocalAnswer(text) {
    const t = String(text || "").toLowerCase().trim();

    // 1️⃣ Greetings
    const greetings = ["hi","hello","hey","salam"];
    if (greetings.some(g => t === g || t.startsWith(g))) {
      return "Hello! How can I assist you today?";
    }

    // Words to ignore when matching
    const ignoreWords = ["what","how","do","you","is","the","a","an","of","are","services","service"];
    const clean = (sentence) =>
      String(sentence || "")
        .toLowerCase()
        .split(/\W+/)
        .filter(w => w && !ignoreWords.includes(w));

    // 2️⃣ Products / Apps
    for (const p of products || []) {
      const tokens = clean(p.name);
      if (tokens.length > 0 && tokens.some(tok => t.includes(tok))) {
        return `Product: ${p.name}\nPrice: ${p.price}\nDetails: ${p.details || ""}`;
      }
    }

    // 3️⃣ Free Fire Accounts
    for (const a of freeFireAccounts || []) {
      const tokens = clean(a.name);
      if (tokens.length > 0 && tokens.some(tok => t.includes(tok))) {
        return `Free Fire Account: ${a.name}\nPrice: ${a.price}\nStars: ${a.stars}\nLogin: ${a.login}\nRegion: ${a.region}\nDetails: ${a.details}`;
      }
    }

    // 4️⃣ FAQs (TECH.AI related)
    const techKeywords = ["tech.ai","account","service","buy","price","order","payment"];
    if (techKeywords.some(k => t.includes(k))) {
      for (const f of faqs || []) {
        const words = clean(f.q);
        const matched = words.filter(w => t.includes(w));
        if (matched.length >= 2) return `Q: ${f.q}\nA: ${f.a}`;
      }
    }

    // 5️⃣ Contact info
    if (t.includes("contact") || t.includes("whatsapp") || t.includes("number") || t.includes("phone")) {
      return `WhatsApp: +92${businessInfo.whatsapp} (Owner: ${businessInfo.owner})`;
    }

    // 6️⃣ No match → fallback to API
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
      {/* UI same as before */}
    </>
  );
}
