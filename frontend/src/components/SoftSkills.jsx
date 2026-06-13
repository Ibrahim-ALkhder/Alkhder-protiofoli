import { motion } from "framer-motion";
import { softSkills } from "../data/data";

export default function SoftSkills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.2 }}
      className="mt-16"
    >
      <h3 className="mb-8 text-center text-2xl font-semibold tracking-tight text-textPrimary">
        Soft Skills
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {softSkills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="cursor-default rounded-full border border-[#d1d9e6] bg-lightBgSecondary px-5 py-2.5 text-sm font-medium text-textSecondary shadow-soft transition-colors duration-300 hover:border-softBlue/40 hover:text-textPrimary"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
