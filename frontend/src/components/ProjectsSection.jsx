import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "../data/useData";

export default function ProjectsSection() {
  const { projects } = useProjects();
  const project = projects.find((p) => p.isFeatured) || projects.find((p) => p.slug);
  if (!project) return null;

  return (
    <section
      id="projects"
      className="bg-[#050608] px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="text-[42px] font-medium tracking-tight text-white">
            Projects
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Screenshots Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {project.screenshots?.desktop ? (
              <img
                src={project.screenshots.desktop}
                alt={`${project.title} desktop`}
                className="w-full rounded-[20px] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
              />
            ) : (
              <div className="relative mx-auto aspect-[16/10] w-full max-w-lg rounded-[20px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-3 text-sm text-white/30">
                      Desktop Screenshot
                    </p>
                  </div>
                </div>
              </div>
            )}

            {project.screenshots?.tablet ? (
              <img
                src={project.screenshots.tablet}
                alt={`${project.title} tablet`}
                className="relative -mt-16 ml-8 w-3/5 max-w-xs rounded-[16px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            ) : (
              <div className="relative -mt-16 ml-8 w-3/5 max-w-xs rounded-[16px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="flex aspect-[4/3] items-center justify-center">
                  <p className="text-xs text-white/30">Tablet</p>
                </div>
              </div>
            )}

            {project.screenshots?.mobile ? (
              <img
                src={project.screenshots.mobile}
                alt={`${project.title} mobile`}
                className="relative -mt-10 ml-auto mr-4 w-2/5 max-w-[160px] rounded-[14px] border border-white/10 shadow-[0_16px_34px_rgba(0,0,0,0.5)]"
              />
            ) : (
              <div className="relative -mt-10 ml-auto mr-4 w-2/5 max-w-[160px] rounded-[14px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-[0_16px_34px_rgba(0,0,0,0.5)]">
                <div className="flex aspect-[9/16] items-center justify-center">
                  <p className="text-xs text-white/30">Mobile</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-white/55">
              {project.problem}
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                Solution
              </h4>
              <p className="mt-2 text-[15px] leading-7 text-white/55">
                {project.solution}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                Technology Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                Timeline
              </h4>
              <p className="mt-1.5 text-sm text-white/60">
                {project.timeline}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#050608] transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5"
              >
                View Full Case Study
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                View All Projects
                <span className="text-base ml-1">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
