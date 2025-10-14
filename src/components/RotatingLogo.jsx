import React from "react";
import { motion } from "framer-motion";
import "./RotatingLogo.css";

const OUTER_LINK = "https://ibb.co/k6VhL5M4";
const INNER_LINK = "https://ibb.co/W86FbbC";

export default function RotatingLogo() {
  // click outer ring -> open outer link
  const handleOuterClick = () => {
    window.open(OUTER_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rotating-logo-navbar" role="group" aria-label="brand logo">
      {/* outer ring (clickable) */}
      <div
        className="outer-ring"
        onClick={handleOuterClick}
        title="Open outer link"
      >
        <motion.img
          src="https://i.ibb.co/zHVPDbt1/abed00ed7b867030f62f7b7637f2bbc9-1.png"
          alt="outer ring"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
          style={{ transformOrigin: "50% 50%" }}
        />
      </div>

      {/* inner logo (separate link). stop propagation so outer ring click won't fire */}
      <a
        className="inner-logo"
        href={INNER_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          // prevent outer click when clicking inner logo
          e.stopPropagation();
        }}
        title="Open inner logo link"
      >
        <img
          src="https://i.ibb.co/gq3w55Y/Picsart-25-10-08-17-53-43-447.png"
          alt="inner logo"
        />
      </a>
    </div>
  );
}
