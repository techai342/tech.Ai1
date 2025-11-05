const businessInfo = {
  businessName: "TECH.AI",
  owner: "Saqib",
  whatsapp: "3478936242",
  email: "tech.ai.officaili",
  instagram: "@tech.ai_official",
  telegram: "t.me/tech_ai_official",
  contactMethods: ["WhatsApp", "JazzCash", "EasyPaisa", "Bank Transfer", "Crypto"],
  deliveryTime: "Most services start within a few hours and complete within 24-72 hours depending on complexity.",
  siteIntro:
    "✨ Welcome to the Ultimate Website! 🌐 Get access to all social media services, pro version apps, virtual numbers, Free Fire sensitivity & panels, PUBG hacks, top AI tools, and powerful editing tools — all in one place. 🚀🔥",
  shortIntro: "TECH.AI — Social media services, premium apps, game tools & AI utilities.",
  termsShort: "All customers must follow platform terms. Some services carry inherent risk; refunds available when delivery fails.",
  refundPolicy:
    "Refunds are issued when we cannot deliver the promised item or service. Open a support ticket via WhatsApp with proof and order details.",
  location: "Pakistan",
  timezone: "Asia/Karachi"
};

const services = [
  "Social Media Boost (followers, likes, engagement)",
  "Premium App Versions (one-time unlocks)",
  "Virtual & Temporary Numbers (verification)",
  "Free Fire Sensitivity & Panels (optimizations)",
  "PUBG Tools (configs & sensitivity) — use responsibly",
  "AI Tools & Automation",
  "Advanced Editing Tools (photo & video)",
  "WhatsApp Bots & Automations",
  "Account Sales & Transfers (secure flow)",
  "Custom Requests & Development"
];
const products = [
  { category: "Apps", name: "Alight Motion Pro", price: "200 PKR", details: "Advanced motion design & VFX." },
  { category: "Apps", name: "CapCut Pro", price: "400 PKR", details: "No watermark, all premium effects." },
  { category: "Apps", name: "Netflix Screen", price: "200 PKR", details: "Premium screen features, one-time unlock." },
  { category: "Apps", name: "InShot Pro", price: "200 PKR", details: "All premium editing features unlocked." },
  { category: "Apps", name: "Remini Pro", price: "200 PKR", details: "HD photo enhancement subscription unlock." },
  { category: "Apps", name: "Best Video Downloader", price: "200 PKR", details: "High-quality video downloads from multiple platforms." },
  { category: "Apps", name: "PicsArt Pro", price: "200 PKR", details: "Premium filters & assets." },
  { category: "Apps", name: "Telegram Pro", price: "200 PKR", details: "Enhanced messaging features with privacy options." },
  { category: "Apps", name: "WhatsApp Gold", price: "200 PKR", details: "Extra features and customizations for WhatsApp." },
  { category: "Apps", name: "PhotoRoom Pro", price: "200 PKR", details: "Professional background removal and photo editing." },
  { category: "Apps", name: "Spotify Pro", price: "200 PKR", details: "Premium music streaming features unlocked." },
  { category: "Apps", name: "YouTube Music Pro", price: "200 PKR", details: "Ad-free music playback and downloads." },
  { category: "Apps", name: "Photo Lab Pro", price: "200 PKR", details: "Creative photo effects and filters." },
  { category: "Apps", name: "Movie Box Pro", price: "200 PKR", details: "Access to premium movies and series." }
];

const tiktokAccounts = [
  {
    name: "UK TikTok Account",
    price: "1200 PKR",   // Pakistan user price
    priceUK: "£6",       // UK user price
    followers: 0,        // Followers 0
    region: "UK",
    details: "Verified UK TikTok account, fast delivery."
  },
  {
    name: "US TikTok Account",
    price: "1500 PKR",
    priceUK: "£7",
    followers: 0,        // Followers 0
    region: "US",
    details: "Verified US TikTok account, fast delivery."
  }
];

// ✅ Free Fire accounts
const freeFireAccounts = [
  {
    name: "Free Fire Account — Level 75",
    price: "2500 PKR",
    stars: 20000,
    login: "FB/Google",
    region: "PK",
    details: "Elite pass, rare bundles, fast delivery."
  },
  {
    name: "Free Fire Account — Level 60",
    price: "1800 PKR",
    stars: 9000,
    login: "VK",
    region: "PK",
    details: "Strong KD, some rare skins."
  },
  {
    name: "Free Fire Account — Level 50",
    price: "1200 PKR",
    stars: 5000,
    login: "Google",
    region: "PK",
    details: "Basic setup, standard skins, fast delivery."
  }
];

const faqs = [
  { q: "What is TECH.AI and what do you offer?", a: businessInfo.siteIntro },
  { q: "How long does it take to complete an order?", a: businessInfo.deliveryTime },
  { q: "Are your services safe?", a: "We follow secure delivery methods and advise customers to comply with platform terms. Some services carry inherent risks — contact support for details." },
  { q: "What payment methods do you accept?", a: "We accept JazzCash, EasyPaisa, bank transfer, and cryptocurrency. WhatsApp payments and proofs speed up processing." },
  { q: "Do you offer refunds?", a: businessInfo.refundPolicy },
  { q: "How do I buy an account or service?", a: "Tap the WhatsApp link in the chatbot or message us at +92" + businessInfo.whatsapp + ". We will confirm availability, request payment proof, and deliver securely." }
];

export {
  businessInfo,
  products,
  freeFireAccounts,
  tiktokAccounts,  // <-- ensure this line exists
  faqs
};


