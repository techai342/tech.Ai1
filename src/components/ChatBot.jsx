// src/components/ChatBot.jsx
import React, { useEffect, useRef, useState } from "react";
import { businessInfo, products, faqs, freeFireAccounts, tiktokAccounts } from "../data/FAQContent";

export default function ChatBot({ language = "auto" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const boxRef = useRef(null);
  const idRef = useRef(1);
  const recognitionRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => { 
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Initialize speech recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.warn("Speech recognition not supported");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";
    
    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? prev + " " + transcript : transcript);
    };
    
    recog.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };
    
    recog.onend = () => {
      setListening(false);
    };
    
    recognitionRef.current = recog;
  }, []);

  // Generate unique ID for messages
  const nextId = () => {
    const id = idRef.current;
    idRef.current += 1;
    return id;
  };

  // Text to speech function
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  // Format markdown text
  function renderMarkdown(md) {
    if (!md) return "";
    
    // Escape HTML
    const esc = s => String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    
    let text = esc(md);
    
    // Code blocks
    text = text.replace(/```([\s\S]*?)```/g, (match, p1) => 
      `<pre style="white-space: pre-wrap; padding: 12px; margin: 8px 0; border-radius: 8px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); font-family: 'Courier New', monospace; font-size: 0.9em;"><code>${p1}</code></pre>`
    );
    
    // Headers
    text = text.replace(/^### (.*$)/gim, '<h3 style="margin: 12px 0 6px 0; font-weight: 600; font-size: 1.1em;">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 style="margin: 14px 0 8px 0; font-weight: 600; font-size: 1.2em;">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 style="margin: 16px 0 10px 0; font-weight: 700; font-size: 1.3em;">$1</h1>');
    
    // Bold and italic
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Lists
    text = text.replace(/^\s*-\s+(.*)$/gm, '<li style="margin-left: 20px;">$1</li>');
    text = text.replace(/^\s*\d+\.\s+(.*)$/gm, '<li style="margin-left: 20px;">$1</li>');
    
    // Line breaks
    text = text.replace(/\n/g, '<br/>');
    
    return text;
  }

  // Add new message
  function addMessage(role, text) {
    const msg = { 
      id: nextId(), 
      role, 
      text, 
      ts: Date.now() 
    };
    setMessages(prev => [...prev, msg]);
    return msg.id;
  }

  // Remove message by ID
  function removeMessageById(id) {
    setMessages(prev => prev.filter(m => m.id !== id));
  }

  // Check local database for answers
  function findLocalAnswer(text) {
    const query = String(text || "").toLowerCase().trim();
    
    // Greetings
    if (["hi", "hello", "hey", "salam", "assalam", "assalamu", "alaikum"].some(g => 
      query === g || query.startsWith(g) || query.includes(g)
    )) {
      return "Assalamu Alaikum! Hello! How can I assist you today? 😊";
    }
    
    // Check products
    for (const product of products) {
      const productName = product.name.toLowerCase();
      if (query.includes(productName) || productName.split(/\s+/).some(word => query.includes(word))) {
        return `🎮 **Product:** ${product.name}\n💰 **Price (PKR):** ${product.price}\n💷 **Price (UK):** ${product.priceUK || "N/A"}\n📝 **Details:** ${product.details || "No additional details available"}`;
      }
    }
    
    // Check Free Fire accounts
    for (const account of freeFireAccounts) {
      const accountName = account.name.toLowerCase();
      if (query.includes(accountName) || query.includes("free fire") || query.includes("ff")) {
        return `🔥 **Free Fire Account:** ${account.name}\n💰 **Price (PKR):** ${account.price}\n💷 **Price (UK):** ${account.priceUK || "N/A"}\n⭐ **Stars:** ${account.stars || "N/A"}\n🌍 **Region:** ${account.region || "Global"}\n📝 **Details:** ${account.details || "Premium Free Fire account"}`;
      }
    }
    
    // Check TikTok accounts
    for (const account of tiktokAccounts) {
      const accountName = account.name.toLowerCase();
      if (query.includes(accountName) || query.includes("tiktok") || query.includes("followers")) {
        return `📱 **TikTok Account:** ${account.name}\n💰 **Price (PKR):** ${account.price}\n💷 **Price (UK):** ${account.priceUK || "N/A"}\n👥 **Followers:** ${account.followers || "N/A"}\n🌍 **Region:** ${account.region || "Global"}\n📝 **Details:** ${account.details || "Verified TikTok account"}`;
      }
    }
    
    // Check FAQs
    for (const faq of faqs) {
      const question = faq.q.toLowerCase();
      const answer = faq.a;
      
      // Check if any keywords from FAQ question appear in query
      const keywords = question.split(/\W+/).filter(word => word.length > 2);
      const matches = keywords.filter(keyword => query.includes(keyword));
      
      if (matches.length >= 2) {
        return `**Q:** ${faq.q}\n\n**A:** ${faq.a}`;
      }
    }
    
    // Contact information
    if (query.includes("contact") || query.includes("whatsapp") || query.includes("number") || 
        query.includes("phone") || query.includes("owner") || query.includes("business")) {
      return `📞 **Contact Information:**\n\n👤 **Owner:** ${businessInfo.owner}\n📱 **WhatsApp:** +92${businessInfo.whatsapp}\n💼 **Business:** TECH.AI\n\nClick the WhatsApp link below to start a conversation!`;
    }
    
    // Services inquiry
    if (query.includes("service") || query.includes("services") || query.includes("offer") || 
        query.includes("provide") || query.includes("sell")) {
      return "🛍️ **Our Services:**\n\n• Free Fire Accounts\n• TikTok Accounts\n• Digital Products\n• Tech Services\n\nTell me specifically what you're looking for, and I'll provide details!";
    }
    
    // Prices inquiry
    if (query.includes("price") || query.includes("cost") || query.includes("how much")) {
      return "💰 **Price Information:**\n\nPrices vary based on the product/account. Please specify:\n• Which product you're interested in\n• Free Fire or TikTok account details\n• Any specific requirements\n\nI'll give you the exact pricing!";
    }
    
    return null;
  }

  // Send message to API
  async function sendMessage() {
    const text = input.trim();
    if (!text || thinking) return;
    
    // Add user message
    addMessage("user", `🧑 ${text}`);
    setInput("");
    setError(null);
    
    // Check local answers first
    const localAnswer = findLocalAnswer(text);
    if (localAnswer) {
      addMessage("bot", `🤖 ${localAnswer}`);
      if (autoSpeak) speakText(localAnswer);
      return;
    }
    
    // Set thinking state
    setThinking(true);
    const placeholderId = addMessage("bot", language === "ur" ? "🤖 سوچ رہا ہوں..." : "🤖 Thinking...");
    
    try {
      // Call the new API
      const apiUrl = `https://api.nekolabs.web.id/text-generation/ai4chat?text=${encodeURIComponent(text)}`;
      
      console.log("Calling API:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        mode: "cors"
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      // Extract response based on API structure
      let botReply = "Sorry, I couldn't generate a response.";
      
      if (data && typeof data === 'object') {
        if (data.result) {
          botReply = data.result;
        } else if (data.response) {
          botReply = data.response;
        } else if (data.message) {
          botReply = data.message;
        } else if (data.text) {
          botReply = data.text;
        } else if (Array.isArray(data) && data.length > 0) {
          botReply = data[0];
        } else if (Object.keys(data).length > 0) {
          // Try to get first string value
          const firstValue = Object.values(data).find(val => typeof val === 'string');
          if (firstValue) {
            botReply = firstValue;
          }
        }
      } else if (typeof data === 'string') {
        botReply = data;
      }
      
      // Remove placeholder and add actual response
      removeMessageById(placeholderId);
      addMessage("bot", `🤖 ${botReply}`);
      
      // Auto speak if enabled
      if (autoSpeak) {
        speakText(botReply);
      }
      
    } catch (error) {
      console.error("Chat API error:", error);
      
      // Remove placeholder
      removeMessageById(placeholderId);
      
      // Add error message
      const errorMessage = "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment or ask about our products/services directly!";
      addMessage("bot", errorMessage);
      setError(error.message);
      
      if (autoSpeak) {
        speakText(errorMessage);
      }
    } finally {
      setThinking(false);
    }
  }

  // Handle Enter key
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Toggle voice input
  function toggleListening() {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser");
      return;
    }
    
    if (listening) {
      try {
        recognitionRef.current.stop();
        setListening(false);
      } catch (err) {
        console.error("Error stopping recognition:", err);
        setListening(false);
      }
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (err) {
        console.error("Error starting recognition:", err);
        setListening(false);
      }
    }
  }

  // Clear chat
  function clearChat() {
    setMessages([]);
    setError(null);
  }

  // Sample questions
  const sampleQuestions = [
    "What Free Fire accounts do you have?",
    "Tell me about TikTok accounts",
    "How can I contact you?",
    "What are your prices?",
    "What services do you offer?"
  ];

  return (
    <>
      {/* ChatBot Toggle Button */}
      <div className="fixed right-4 bottom-6 z-[999999] animate-pulse">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform-gpu transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa, #7c3aed)",
            backgroundSize: "200% 200%",
            animation: "gradientShift 3s ease infinite",
            boxShadow: "0 12px 40px rgba(124, 58, 237, 0.42), 0 4px 12px rgba(167, 139, 250, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          }}
          aria-label="Open TechChatBot"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      <div 
        className={`fixed right-4 bottom-24 z-[99999] transition-all duration-300 ease-out ${
          open 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ width: "min(92vw, 420px)" }}
      >
        <div 
          className="rounded-2xl p-4 shadow-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(12, 8, 22, 0.96), rgba(30, 10, 50, 0.88))",
            border: "1px solid rgba(167, 139, 250, 0.24)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">TechChatBot</div>
                <div className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Ready to help
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-white/80 flex items-center gap-2 text-sm cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={autoSpeak} 
                    onChange={() => setAutoSpeak(v => !v)} 
                    className="sr-only"
                  />
                  <div className={`w-8 h-5 rounded-full transition-colors ${autoSpeak ? 'bg-purple-600' : 'bg-gray-700'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${autoSpeak ? 'transform translate-x-3' : ''}`}></div>
                  </div>
                </div>
                <span className="text-xs">Speak</span>
              </label>
              <button 
                onClick={clearChat}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                Clear
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                Close
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-xs text-red-400 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                API Error: {error}
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div 
            ref={boxRef}
            className="max-h-[50vh] sm:max-h-80 overflow-y-auto rounded-xl p-3 mb-3"
            style={{
              background: "linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.05))",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="text-white/80 text-sm mb-2">👋 Hello! I'm your Tech Assistant</div>
                  <div className="text-white/60 text-xs">Ask me about Free Fire accounts, TikTok accounts, prices, or services</div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question);
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="text-white/90 text-sm">{question}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map(m => (
                  <div 
                    key={m.id} 
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        m.role === "user" 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                          : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-white border border-white/10"
                      }`}
                    >
                      <div 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }}
                      />
                      
                      {m.role === "bot" && !m.text.includes("🤖 Thinking...") && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                          <button 
                            onClick={() => speakText(m.text.replace("🤖 ", ""))}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                            Speak
                          </button>
                          <button 
                            onClick={() => navigator.clipboard.writeText(m.text.replace("🤖 ", ""))}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </button>
                        </div>
                      )}
                      
                      {m.role === "user" && (
                        <div className="mt-2 text-xs opacity-60 text-right">
                          {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {thinking && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-white border border-white/10 rounded-2xl p-4 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows="2"
                  placeholder={language === "ur" ? "اپنا پیغام یہاں ٹائپ کریں..." : "Type your message here..."}
                  className="w-full resize-none rounded-xl p-3 text-sm bg-white/95 text-black border-2 border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  style={{ minHeight: "44px" }}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {input.length}/500
                </div>
              </div>
              
              <button
                onClick={toggleListening}
                disabled={thinking}
                className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${
                  listening 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
                } ${thinking ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={listening ? "Stop listening" : "Start voice input"}
              >
                {listening ? (
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={sendMessage}
                disabled={thinking || !input.trim()}
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {thinking ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  setInput("What Free Fire accounts do you have?");
                  setTimeout(() => document.querySelector("textarea").focus(), 10);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80"
              >
                Free Fire
              </button>
              <button
                onClick={() => {
                  setInput("Tell me about TikTok accounts");
                  setTimeout(() => document.querySelector("textarea").focus(), 10);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80"
              >
                TikTok
              </button>
              <button
                onClick={() => {
                  setInput("How can I contact you?");
                  setTimeout(() => document.querySelector("textarea").focus(), 10);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  setInput("What are your prices?");
                  setTimeout(() => document.querySelector("textarea").focus(), 10);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80"
              >
                Prices
              </button>
            </div>
            
            {/* WhatsApp Link */}
            <div className="pt-2 border-t border-white/10">
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                </svg>
                Contact on WhatsApp
              </a>
              <div className="text-center text-xs text-white/50 mt-2">
                Owner: {businessInfo.owner} • Quick responses guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for gradient */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
