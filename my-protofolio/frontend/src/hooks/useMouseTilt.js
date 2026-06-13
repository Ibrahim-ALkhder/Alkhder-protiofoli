import { useState } from "react";

export default function useMouseTilt(intensity = 4) {
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)"
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * intensity * 2;
    const rotateX = ((0.5 - y / rect.height)) * intensity * 2;

    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`
    );
  };

  const reset = () => {
    setTransform(
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    );
  };

  return { transform, handleMove, reset };
}