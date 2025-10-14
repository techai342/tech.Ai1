import React, { useState } from "react";
import "./ProductCarousel.css";

const images = [
  "https://i.ibb.co/4w3C1mCH/0d77ebc9799d4a0a131af2949f17222d.jpg",
  "https://i.ibb.co/v8yVMGN/996ced4d12483929c3fd8aa4a90be285.jpg",
  "https://i.ibb.co/GQw6Xwwt/b875cadf4323f561b442d18af6be4985.jpg",
  "https://i.ibb.co/vCbfDkKr/fa553ac9c5a7a559d902ff3319a4e313.jpg",
  "https://i.ibb.co/4R3r0LBm/49611315729d7b19fd06d9c0d41980cd.jpg",
  "https://i.ibb.co/XxcZG2Cf/257a0631e3051140356b697ff111f3fd.jpg",
  "https://i.ibb.co/KcM8C8Dc/1eb1ed7004c702b0087d0216fecc6647.jpg",
  "https://i.ibb.co/8D6nPr8W/00e1768d577f36ce3c1dc5adb0aaa460.jpg",
];

const links = [
  "https://chatgpt.com/",
  "https://chatgpt.com/",
  "https://chatgpt.com/",
  "https://chatgpt.com/",
  "https://chatgpt.com/",
  "https://chatgpt.com/",
  "https://chatgpt.com/",
  "https://chatgpt.com/",
];

export default function ProductCarousel() {
  const [angle, setAngle] = useState(0);
  const total = images.length;
  const degPerImage = 360 / total;

  const rotateLeft = () => setAngle((prev) => prev + degPerImage);
  const rotateRight = () => setAngle((prev) => prev - degPerImage);

  return (
    <div className="carousel-wrapper">
      {/* 🆙 Heading moved upward */}
      <h2 className="carousel-title">Our Products</h2>

      <div
        className="carousel-container"
        style={{ transform: `rotateY(${angle}deg)` }}
      >
        {images.map((img, i) => (
          <span
            key={i}
            style={{
              transform: `rotateY(${i * degPerImage}deg) translateZ(300px)`,
            }}
          >
            <a href={links[i]} target="_blank" rel="noopener noreferrer">
              <img src={img} alt={`Product ${i + 1}`} />
            </a>
          </span>
        ))}
      </div>

      {/* ⬇ Buttons moved downward with spacing */}
      <div className="buttons">
        <button onClick={rotateLeft}>&lt; Left</button>
        <button onClick={rotateRight}>Right &gt;</button>
      </div>
    </div>
  );
}
