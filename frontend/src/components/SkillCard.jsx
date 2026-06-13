import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function SkillCard({ skill }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [progress, setProgress] = useState(0);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, skill.value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setProgress(Math.round(value)),
    });

    return () => controls.stop();
  }, [inView, skill.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
      transition={{ duration: 0.45 }}
      style={{ transformStyle: "preserve-3d" }}
      className="rounded-[26px] bg-lightBgSecondary p-7 shadow-neumorph transition-all duration-300 hover:shadow-neumorphInset"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-lightBgSecondary shadow-neumorphInset">
          <svg
            width="136"
            height="136"
            viewBox="0 0 136 136"
            className="-rotate-90"
          >
            <circle
              cx="68"
              cy="68"
              r={radius}
              fill="none"
              stroke="#d8dee8"
              strokeWidth="10"
            />
            <motion.circle
              cx="68"
              cy="68"
              r={radius}
              fill="none"
              stroke="#8FB7FF"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transition={{ duration: 0.2 }}
            />
          </svg>

          <div className="absolute text-center">
            <div className="text-2xl font-semibold text-textPrimary">
              {progress}%
            </div>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-textPrimary">
          {skill.name}
        </h3>
        <p className="mt-2 text-sm text-textSecondary">{skill.level}</p>
      </div>
    </motion.div>
  );
}