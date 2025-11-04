import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, SendHorizontal, Mic, X, Maximize2, Minimize2, Volume2 } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Assalamualaikum! Mein TechChatBot hoon. Aap ko kis cheez ki madad chahiye?" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef(null);

  const synth = window.speechSynthesis;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) recognition.lang = "ur-PK";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (autoSpeak && messages[messages.length - 1]?.role === "bot") {
      const speakMsg = new SpeechSynthesisUtterance(messages[messages.length - 1]?.text);
      speakMsg.lang = detectLang(messages[messages.length - 1]?.text);
      synth.speak(speakMsg);
    }
  }, [messages]);

  const detectLang = (text) => /[اآؤئیء-ی]/.test(text) ? "ur-PK" : "en-US";

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply = generateBotResponse(input);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    }, 600);
  };

  const generateBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("uk") && lower.includes("price")) return "UK Free Fire Account ki price 1200 PKR hai ✅";
    if (lower.includes("saqib")) return "Saqib bohat zabardast developer hai ✅🔥";
    if (lower.includes("number")) return "Saqib ka WhatsApp number: 03478936242 📞";
    return "Theek hai! Mein samajh raha hun — zyada maloomat jald generate kar raha hun!";
  };

  const toggleVoice = () => {
    if (!recognition) return;
    if (!isListening) recognition.start();
    else recognition.stop();
    setIsListening(!isListening);
  };

  if (recognition) {
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      handleSend();
    };
  }

  const speakOne = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = detectLang(text);
    synth.speak(msg);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-4 bottom-6 z-[999999] w-16 h-16 rounded-full flex items-center justify-center bg-purple-700 shadow-[0_0_20px_6px_rgba(147,51,234,0.9)] animate-pulse border-2 border-purple-400"
      >
        {open ? <X size={28}/> : <MessageCircle size={30}/>}
      </button>

      <div
        className={`fixed right-4 bottom-24 z-[99999] transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ width: "min(92vw,420px)" }}
      >
        <div className="bg-black bg-opacity-60 backdrop-blur-2xl rounded-xl border border-purple-500 shadow-[0_0_30px_10px_rgba(168,85,247,0.7)] overflow-hidden">
          <div className="p-3 max-h-[420px] overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-xl text-sm max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-purple-700 text-white"
                      : "bg-white bg-opacity-10 text-purple-200"
                  }`}
                >
                  {msg.text}
                  {msg.role === "bot" && (
                    <button
                      className="ml-2 inline-block"
                      onClick={() => speakOne(msg.text)}
                    >
                      <Volume2 size={16}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>

          <div className="flex p-2 gap-2">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg border w-10 flex justify-center ${
                isListening ? "bg-green-600" : "bg-purple-600"
              }`}
            >
              <Mic size={18}/>
            </button>
            <input
              className="flex-1 p-2 bg-black bg-opacity-30 outline-none text-white rounded-lg"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-purple-700 rounded-lg"
            >
              <SendHorizontal size={20}/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
