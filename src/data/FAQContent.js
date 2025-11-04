/**
 * FAQContent.js
 * TECH.AI Business Data for Smart ChatBot Responses (updated)
 */

const businessInfo = {
  businessName: "TECH.AI",
  owner: "Muhammad Saqib",
  whatsapp: "03478936242",
  contactMethods: ["WhatsApp", "JazzCash", "EasyPaisa", "Bank Transfer", "Crypto"],
  deliveryTime: "Most services start in a few hours and complete within 24-72 hours.",
  siteIntro:
    "✨ Welcome to the Ultimate Website! 🌐 Get access to all social media services, pro version apps, virtual numbers, Free Fire sensitivity & panels, PUBG tools, top AI tools, and powerful editing tools — all in one place. 🚀🔥"
};

const services = [
  "Social Media Boost",
  "Premium App Versions",
  "Virtual Numbers",
  "Free Fire Sensitivity & Panels",
  "PUBG Tools",
  "Top AI Tools",
  "Powerful Editing Tools",
  "Hack Tools",
  "WhatsApp Bots"
];

const products = [
  // Apps — default price 200 PKR each as requested
  { name: "Netflix Screen", price: "200 PKR", details: "Premium screen features." },
  { name: "InShot Pro", price: "200 PKR", details: "All premium editing features unlocked." },
  { name: "Remini Pro", price: "200 PKR", details: "HD photo enhancement." },
  { name: "Best Video Downloader", price: "200 PKR", details: "Download videos from many platforms." },
  { name: "PicsArt Pro", price: "200 PKR", details: "Premium filters & assets." },
  { name: "Telegram Pro", price: "200 PKR", details: "Enhanced Telegram features." },
  { name: "WhatsApp Gold", price: "200 PKR", details: "Customization & extra options." },
  { name: "PhotoRoom Pro", price: "200 PKR", details: "Background remover & studio tools." },
  { name: "Spotify Pro", price: "200 PKR", details: "Ad-free & premium audio." },
  { name: "YouTube Music Pro", price: "200 PKR", details: "Ad-free music streaming." },
  { name: "Photo Lab Pro", price: "200 PKR", details: "Fun photo effects and filters." },
  { name: "Movie Box Pro", price: "200 PKR", details: "Premium movie streaming features." },
  { name: "Alight Motion Pro", price: "200 PKR", details: "Advanced motion design & VFX." },

  // Other existing / important products
  { name: "TikTok UK Account", price: "1200 PKR", details: "Verified, secure & monetizable" },
  { name: "CapCut Pro", price: "400 PKR", details: "No watermark, all premium effects" },
  { name: "Free Fire Panel", price: "900 PKR", details: "Extra security & premium features" },
  { name: "WhatsApp Bot", price: "250 PKR", details: "Auto-tag, auto-reply, anti-delete" },
  { name: "Pro Mods Pack", price: "250 PKR Each", details: "Netflix, Spotify, PicsArt, Remini, etc." },

  // New entries per your pricing request
  {
    name: "Hack Tools (TikTok / Facebook / Instagram / Android / Wifi etc.)",
    price: "900 PKR",
    details:
      "Tools & utilities for platform-specific assistance (TikTok, Facebook, Instagram, Android devices, WiFi). Use responsibly; user must follow platform policies."
  },
  {
    name: "Virtual / Fake Number",
    price: "400 PKR",
    details: "Temporary virtual numbers for verification or secure communication."
  },
  {
    name: "Free Fire Sensitivity Settings",
    price: "100 PKR",
    details: "Optimized sensitivity configurations for better gameplay control."
  }
];

const appsIncluded = [
  "Netflix Screen",
  "InShot Pro",
  "Remini Pro",
  "Best Video Downloader",
  "PicsArt Pro",
  "Telegram Pro",
  "WhatsApp Gold",
  "PhotoRoom Pro",
  "Spotify Pro",
  "YouTube Music Pro",
  "Photo Lab Pro",
  "Movie Box Pro",
  "Alight Motion Pro"
];

const faqs = [
  {
    q: "What is TECH.AI and what do you offer?",
    a: businessInfo.siteIntro
  },
  {
    q: "How long does it take to see results?",
    a: "Most services start delivering within a few hours, with full completion within 24–72 hours depending on the service."
  },
  {
    q: "Are your services safe?",
    a: "We use reliable methods to minimize risk. Some services (like account-related or platform-specific tools) carry inherent risk; we advise following platform rules. Contact us if you need more details."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept JazzCash, EasyPaisa, bank transfer, and cryptocurrency for your convenience."
  },
  {
    q: "Do you offer refunds?",
    a: "We offer refunds if we're unable to deliver the service as promised. Please contact us with proof and order details."
  },
  {
    q: "What is the price of apps like Netflix, PicsArt, Remini, etc.?",
    a: "Most premium apps listed (Netflix Screen, PicsArt Pro, Remini Pro, InShot Pro, Spotify Pro, etc.) are priced at 200 PKR each."
  },
  {
    q: "How much for hack tools?",
    a: "Hack tools for platforms like TikTok, Facebook, Instagram, Android devices, and WiFi are priced at 900 PKR."
  },
  {
    q: "How much for virtual or fake numbers?",
    a: "Virtual / fake numbers are priced at 400 PKR."
  },
  {
    q: "How much for Free Fire sensitivity settings?",
    a: "Sensitivity settings are priced at 100 PKR."
  },
  {
    q: "How can I contact you?",
    a: `Contact via WhatsApp: ${businessInfo.whatsapp}. Accepted payments: ${businessInfo.contactMethods.join(", ")}.`
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
    name: "John Smith",
    stars: 5,
    review: "Great UI and fast delivery."
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
