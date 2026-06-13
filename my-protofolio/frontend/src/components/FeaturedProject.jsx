import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/data";

export default function FeaturedProject() {
  const project = projects.find((p) => p.isFeatured);
  if (!project) return null;

  return (
    <section className="bg-lightBgSecondary px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-textPrimary sm:text-5xl">
            Featured Case Study
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-textSecondary sm:text-base">
            An in-depth look at one of my most impactful projects.
          </p>
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
            <div className="relative mx-auto aspect-[16/10] w-full max-w-lg rounded-[20px] border border-[#d1d9e6] bg-gradient-to-br from-cardWhite to-[#f0f2f5] shadow-soft">
              <div className="flex h-full items-center justify-center">
                <svg
                  className="mx-auto h-12 w-12 text-textSecondary/20"
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
              </div>
            </div>

            <div className="relative -mt-16 ml-8 w-3/5 max-w-xs rounded-[16px] border border-[#d1d9e6] bg-gradient-to-br from-cardWhite to-[#f0f2f5] shadow-soft">
              <div className="flex aspect-[4/3] items-center justify-center">
                <p className="text-xs text-textSecondary/40">Tablet</p>
              </div>
            </div>

            <div className="relative -mt-10 ml-auto mr-4 w-2/5 max-w-[160px] rounded-[14px] border border-[#d1d9e6] bg-gradient-to-br from-cardWhite to-[#f0f2f5] shadow-soft">
              <div className="flex aspect-[9/16] items-center justify-center">
                <p className="text-xs text-textSecondary/40">Mobile</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-semibold tracking-tight text-textPrimary">
              {project.title}
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-textSecondary">
              {project.problem}
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-textSecondary/60">
                Solution
              </h4>
              <p className="mt-2 text-[15px] leading-7 text-textSecondary">
                {project.solution}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-textSecondary/60">
                Technology Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#d1d9e6] bg-cardWhite px-3.5 py-1.5 text-xs font-medium text-textSecondary shadow-soft"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-textSecondary/60">
                Timeline
              </h4>
              <p className="mt-1.5 text-sm text-textSecondary">
                {project.timeline}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-textPrimary px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-textPrimary/90 hover:-translate-y-0.5"
              >
                Live Demo
              </a>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#d1d9e6] bg-cardWhite px-6 py-3 text-sm font-medium text-textPrimary shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                View Full Case Study
              </Link>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d1d9e6] bg-cardWhite px-6 py-3 text-sm font-medium text-textSecondary shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
