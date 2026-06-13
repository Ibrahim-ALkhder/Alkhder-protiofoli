import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

export default function HeroSection() {
  const sceneRef = useRef(null);
  const backTagRef = useRef(null);

  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);

  const springX = useSpring(pullX, {
    stiffness: 50,
    damping: 300,
    mass: 0.7,
  });

  const springY = useSpring(pullY, {
    stiffness: 280,
    damping: 11,
    mass: 0.7,
  });

  const frontScaleY = useTransform(springY, [0, 180], [1, 1.13]);
  const backScaleY = useTransform(springY, [0, 180], [1, 1.07]);

  const frontScaleX = useTransform(springY, [0, 180], [1, 0.97]);
const backScaleX = useTransform(springY, [0, 180], [1, 0.985]);

  const frontRotate = useTransform(
    [springX, springY],
    ([x, y]) => x * 0.045 + y * 0.018
  );

  const backRotate = useTransform(
    [springX, springY],
    ([x, y]) => x * 0.022 + y * 0.01
  );

  const frontY = useTransform(springY, [0, 180], [0, 12]);
  const backY = useTransform(springY, [0, 180], [0, 9]);

  const frontX = useTransform(springX, [-120, 120], [-10, 10]);
  const backX = useTransform(springX, [-120, 120], [-6, 6]);

  const holeFrontX = useTransform(springX, [-120, 120], [-8, 8]);
  const holeFrontY = useTransform(springY, [0, 180], [0, 10]);

  const frontStringHeight = useTransform(springY, [0, 180], [220, 355]);
  const backStringHeight = useTransform(springY, [0, 180], [212, 330]);

  const frontStringX = useTransform(springX, [-120, 120], [-12, 12]);
  const backStringX = useTransform(springX, [-120, 120], [-8, 8]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;

      if (backTagRef.current) {
        backTagRef.current.style.filter = `brightness(${1 + Math.abs(x) * 0.04})`;
      }

      if (sceneRef.current) {
        sceneRef.current.style.transform = "translate(-50%, -50%)";
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  return (
    <section className="hero" id="hero">
      <div className="scene" ref={sceneRef}>
        {/* strings */}
        <motion.div
          className="string back"
          style={{
            height: backStringHeight,
            x: backStringX,
          }}
        />
        <motion.div
          className="string front"
          style={{
            height: frontStringHeight,
            x: frontStringX,
          }}
        />

        {/* back card */}
        <motion.div
          className="tag-back"
          ref={backTagRef}
          style={{
  scaleY: frontScaleY,
  scaleX: frontScaleX,
  rotate: frontRotate,
  y: frontY,
  x: frontX,
}}
        >
          <div className="paper-noise"></div>
          <div className="paper-smudge"></div>
          <div className="barcode"></div>
          <div className="sweden">made in sweden</div>
          <div className="rebranding">ongoing rebranding</div>
        </motion.div>

        {/* front card */}
       <motion.div
        className="tag-front"
        drag
        dragElastic={0.2}
        dragMomentum={false}
        dragConstraints={{
          top: -10,
          left: -10,
          right: 10,
          bottom: 20,
        }}
        onDrag={(_, info) => {
          pullX.set(clamp(info.offset.x, -160, 160));
          pullY.set(clamp(info.offset.y, -360, 360));
        }}
        onDragEnd={() => {
          animate(pullX, 0, {
            type: "spring",
            stiffness: 360,
            damping: 9,
          });

          animate(pullY, 0, {
            type: "spring",
            stiffness: 360,
            damping: 9,
          });
        }}
        whileTap={{ cursor: "grabbing" }}
        style={{
          scaleY: frontScaleY,
          scaleX: frontScaleX,
          rotate: frontRotate,
          y: frontY,
          x: frontX,
        }}
      >
          <div className="paper-noise"></div>
          <div className="paper-smudge"></div>

          <div className="profile-content">
            <div className="profile-img medium">
              <img src="/profile.jpg" alt="Ibrahim Talb" />
            </div>

            <h2 className="name">Ibrahim Talb</h2>
            <p className="role">Full Stack Developer</p>

            <div className="divider"></div>

            <p className="email">ibrahim@email.com</p>

            <a href="/Ibrahim-CV.pdf" download className="cv-button">
              Download CV
            </a>
          </div>
        </motion.div>

        {/* front hole */}
        <motion.div
          className="hole front"
          style={{
            x: holeFrontX,
            y: holeFrontY,
          }}
        />

        {/* invisible drag area */}
        
      </div>
    </section>
  );
}