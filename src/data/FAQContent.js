// FAQContent.updated.js
// TECH.AI Business Data for Smart ChatBot Responses (expanded & clarified)

const businessInfo = {
  businessName: "TECH.AI",
  owner: "Muhammad Saqib",
  whatsapp: "03478936242",
  email: "contact@tech.ai",
  instagram: "@tech.ai_official",
  telegram: "t.me/tech_ai_official",
  contactMethods: ["WhatsApp", "JazzCash", "EasyPaisa", "Bank Transfer", "Crypto"],
  deliveryTime: "Most services start within a few hours and complete within 24-72 hours depending on complexity.",
  siteIntro:
    "✨ Welcome to TECH.AI — the Ultimate Digital Services Hub! 🌐 Get access to social media growth services, pro-version apps, virtual numbers, Free Fire sensitivity & panels, PUBG tools (responsible use only), top AI tools, and powerful editing utilities — all under one roof. Fast delivery, secure payments, and 24/7 support. 🚀🔥",
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

// Products grouped by category — used by chatbot local matcher
const products = [
  // Apps (default price 200 PKR)
  { category: "Apps", name: "Netflix Screen", price: "200 PKR", details: "Premium screen features, one-time unlock." },
  { category: "Apps", name: "InShot Pro", price: "200 PKR", details: "All premium editing features unlocked." },
  { category: "Apps", name: "Remini Pro", price: "200 PKR", details: "HD photo enhancement subscription unlock." },
  { category: "Apps", name: "PicsArt Pro", price: "200 PKR", details: "Premium filters & assets." },
  { category: "Apps", name: "Alight Motion Pro", price: "200 PKR", details: "Advanced motion design & VFX." },
  { category: "Apps", name: "CapCut Pro", price: "400 PKR", details: "No watermark, all premium effects." },

  // Game-related
  { category: "Gaming", name: "Free Fire Panel", price: "900 PKR", details: "Premium panel access & security options." },
  { category: "Gaming", name: "Free Fire Sensitivity Settings", price: "100 PKR", details: "Optimized sensitivity profiles for various devices." },
  { category: "Gaming", name: "Pro Mods Pack", price: "250 PKR Each", details: "Collections: Netflix, Spotify, PicsArt, Remini etc. (tools, not cheats)." },
  { category: "Gaming", name: "PUBG Config Pack", price: "300 PKR", details: "Sensitivity & config files for better aiming control (use within game rules)." },

  // Accounts & Virtual numbers
  { category: "Accounts", name: "TikTok UK Account (Verified)", price: "1200 PKR", details: "Verified, monetizable, secure transfer." },
  { category: "Accounts", name: "YouTube Starter Account", price: "1500 PKR", details: "Basic setup for upload & monetization readiness." },
  { category: "Security", name: "Virtual / Temporary Number", price: "400 PKR", details: "Temporary verification numbers for sign-ups." },

  // Tools & others
  {
    category: "Tools",
    name: "WhatsApp Bot",
    price: "250 PKR",
    details: "Auto-tag, auto-reply, anti-delete; basic setup included. Custom bots available on request."
  },
  {
    category: "Tools",
    name: "Hack Tools (platform assistance)",
    price: "900 PKR",
    details:
      "Platform-specific assistance tools. These are provided for research and security testing only — customers must comply with platform rules. TECH.AI does NOT condone illegal activity."
  },
  {
    category: "Tools",
    name: "Virtual Services Bundle",
    price: "800 PKR",
    details: "Bundle: Virtual number + basic bot + 2 premium apps (discounted)."
  }
];

const appsIncluded = [
  "Netflix Screen",
  "InShot Pro",
  "Remini Pro",
  "PicsArt Pro",
  "Alight Motion Pro",
  "CapCut Pro",
  "Spotify Pro",
  "YouTube Music Pro",
  "PhotoRoom Pro",
  "Movie Box Pro"
];

const faqs = [
  {
    q: "What is TECH.AI and what do you offer?",
    a: businessInfo.siteIntro
  },
  {
    q: "How long does it take to complete an order?",
    a: businessInfo.deliveryTime
  },
  {
    q: "Are your services safe?",
    a:
      "We follow secure delivery methods and advise customers to comply with platform terms. Some services (account transfers, platform-specific tools) carry inherent risks — contact support for details."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept JazzCash, EasyPaisa, bank transfer, and cryptocurrency. WhatsApp payments and proofs speed up processing."
  },
  {
    q: "Do you offer refunds?",
    a: businessInfo.refundPolicy
  },
  {
    q: "How much do premium apps cost?",
    a: "Most premium apps listed are 200 PKR each (CapCut Pro is 400 PKR)."
  },
  {
    q: "How do I buy an account or service?",
    a:
      "Tap the WhatsApp link in the chatbot or message us at +92" + businessInfo.whatsapp + ". We will confirm availability, request payment proof, and deliver securely."
  },
  {
    q: "What are virtual numbers used for?",
    a: "Temporary verification, two-step setup, or privacy when creating accounts. They expire after the requested period."
  },
  {
    q: "Do you provide support after purchase?",
    a: "Yes — basic support is included. For customizations or troubleshooting, additional fees may apply."
  },
  {
    q: "Can I request custom work or bulk orders?",
    a: "Yes — contact us on WhatsApp with your requirements; we offer bulk discounts and dedicated support."
  }
];

const customerReviews = [
  {
    name: "Ali Khan",
    stars: 5,
    review: "Trusted! Free Fire account delivered quickly and support was responsive."
  },
  {
    name: "Sarah Ahmed",
    stars: 5,
    review: "Smooth and secure process. Recommended for first-time buyers."
  },
  {
    name: "Umar Rizvi",
    stars: 4,
    review: "Good value for money; communication can improve but overall satisfied."
  }
];

export {
  businessInfo,
  services,
  products,
  appsIncluded,
  faqs,
  customerReviews
};
