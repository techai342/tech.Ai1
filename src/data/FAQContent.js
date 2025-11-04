/**
 * FAQContent.js
 * TECH.AI Business Data for Smart ChatBot Responses
 */

const businessInfo = {
  businessName: "TECH.AI",
  owner: "Muhammad Saqib",
  whatsapp: "03478936242",
  contactMethods: ["WhatsApp", "JazzCash", "EasyPaisa", "Bank Transfer", "Crypto"],
  deliveryTime: "Most services start in a few hours & complete within 24–72 hours."
};

const services = [
  "Social Media Boost",
  "Premium App Versions",
  "Virtual Numbers",
  "Free Fire Sensitivity & Panels",
  "PUBG Tools",
  "Best AI Tools",
  "Powerful Editing Tools",
  "Hack Tools",
  "WhatsApp Bots"
];

const products = [
  {
    name: "TikTok UK Account ????",
    price: "1200 PKR",
    details: "Verified, secure & monetizable"
  },
  {
    name: "CapCut Pro ??",
    price: "400 PKR",
    details: "No watermark, all premium effects"
  },
  {
    name: "Free Fire Panel ??",
    price: "900 PKR",
    details: "Extra security & premium features"
  },
  {
    name: "WhatsApp Bot ??",
    price: "250 PKR",
    details: "Auto-tag, auto-reply, anti-delete"
  },
  {
    name: "Pro Mods Pack ??",
    price: "250 PKR Each",
    details: "Netflix, Spotify, PicsArt, Remini, etc."
  }
];

const appsIncluded = [
  "Netflix Screen",
  "InShot Pro",
  "Remini Pro",
  "PicsArt Pro",
  "Telegram Pro",
  "YouTube Music Pro",
  "WhatsApp Gold",
  "PhotoRoom Pro",
  "Photo Lab Pro",
  "Alight Motion Pro",
  "Best Video Downloader",
  "Movie Box Pro"
];

const faqs = [
  {
    q: "Payment methods?",
    a: "JazzCash, EasyPaisa, Bank Transfer & Crypto supported ?"
  },
  {
    q: "Service safe hai?",
    a: "Yes ? No ban risk — secure delivery!"
  },
  {
    q: "Delivery time kitna?",
    a: businessInfo.deliveryTime
  },
  {
    q: "Refund milay ga?",
    a: "If service is not delivered as promised ? Refund possible!"
  }
];

const customerReviews = [
  {
    name: "Ali Khan ????",
    stars: 5,
    review: "Trusted! Free Fire account 5 mins me mil gaya ??"
  },
  {
    name: "Sarah Ahmed ????",
    stars: 5,
    review: "Secure first purchase — highly recommended!"
  },
  {
    name: "John Smith ????",
    stars: 5,
    review: "Smooth UI & fast delivery ??"
  }
];

/**
 * Export objects for ChatBot AI logic
 */
export {
  businessInfo,
  services,
  products,
  appsIncluded,
  faqs,
  customerReviews
};