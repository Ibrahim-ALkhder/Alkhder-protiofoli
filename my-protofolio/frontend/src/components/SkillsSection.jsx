import { motion } from "framer-motion";
import { skills } from "../data/data";
import SkillCard from "./SkillCard";
import SoftSkills from "./SoftSkills";

export default function SkillsSection() {
  return (
    <>
      <div className="h-40 bg-section-return" />

      <section
        id="skills"
        className="bg-lightBgSecondary px-4 py-24 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="mb-14 text-center"
          >
            <h2 className="text-4xl font-semibold tracking-tight text-textPrimary sm:text-5xl">
              Skills
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-textSecondary sm:text-base">
              A focused set of technologies and design strengths shaped through
              building interfaces, systems, and complete product experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <SoftSkills />
        </div>
      </section>
    </>
  );
}
