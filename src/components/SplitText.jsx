import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text,
  className = "",
  delay = 0.04, // seconds per letter
  duration = 0.6,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  tag = "p",
}) {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // ✅ Wait for fonts to load to prevent misalignment
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;

    const el = ref.current;

    // 🔸 Split text into spans for each character
    el.innerHTML = "";
    const chars = text.split("");
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      el.appendChild(span);
    });

    // 🎬 Animate on scroll
    gsap.fromTo(
      el.children,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    );

    // 🧹 Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, delay, duration, ease, from, to, fontsLoaded]);

  const Tag = tag;
  return (
    <Tag
      ref={ref}
      className={`split-text ${className}`}
      style={{
        textAlign,
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </Tag>
  );
}
