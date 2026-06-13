import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProjects } from "../data/useData";

function ScreenshotBlock({ src, label, aspect }) {
  if (src) {
    return (
      <div className={`group relative overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.45)] ${aspect}`}>
        <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`group relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-[0_24px_50px_rgba(0,0,0,0.45)] ${aspect}`}>
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-white/30">{label}</p>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!project || project.variant === "contact") {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-[#050608] text-white">
      <Navbar />

      <main className="pt-28">
        {/* Hero */}
        <section className="px-6 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors duration-300 hover:text-white/70"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Projects
              </Link>

              <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {project.title?.replace(/\n/g, " ")}
              </h1>

              {project.shortDescription && (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">
                  {project.shortDescription}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {project.timeline && (
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    <span className="text-xs text-white/40">Timeline</span>
                    <span className="text-sm font-medium text-white/75">
                      {project.timeline}
                    </span>
                  </div>
                )}
                {project.results && (
                  <div className="flex items-center gap-2 text-sm text-white/55">
                    <span className="flex h-2 w-2 rounded-full bg-green-400/60" />
                    Completed
                  </div>
                )}
              </div>

              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/70 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        <section className="px-6 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <h2 className="mb-8 text-2xl font-semibold tracking-tight">
                Screenshots
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ScreenshotBlock
                  src={project.screenshots?.desktop}
                  label="Desktop View"
                  aspect="aspect-[16/10]"
                />
                <ScreenshotBlock
                  src={project.screenshots?.tablet}
                  label="Tablet View"
                  aspect="aspect-[4/3]"
                />
                <ScreenshotBlock
                  src={project.screenshots?.mobile}
                  label="Mobile View"
                  aspect="aspect-[9/16] max-h-[400px]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        {project.description && (
          <section className="border-t border-white/5 px-6 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
                <p className="mt-6 text-[15px] leading-8 text-white/60">
                  {project.description}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Problem & Solution */}
        {(project.problem || project.solution) && (
          <section className="border-t border-white/5 px-6 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
              {project.problem && (
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75 }}
                >
                  <h3 className="text-xl font-semibold tracking-tight text-white/90">
                    The Problem
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-white/55">
                    {project.problem}
                  </p>
                </motion.div>
              )}
              {project.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.1 }}
                >
                  <h3 className="text-xl font-semibold tracking-tight text-white/90">
                    The Solution
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-white/55">
                    {project.solution}
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section className="border-t border-white/5 px-6 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight">Key Features</h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-[16px] border border-white/[0.06] bg-white/[0.03] p-5 text-sm leading-6 text-white/65"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-softBlue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="border-t border-white/5 px-6 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight">
                  Challenges & Lessons Learned
                </h2>
                <div className="mt-8 space-y-6">
                  {project.challenges.map((challenge, i) => (
                    <div
                      key={i}
                      className="rounded-[16px] border border-white/[0.06] bg-white/[0.03] p-6"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-softBlue/10 text-xs font-medium text-softBlue">
                          {i + 1}
                        </span>
                        <p className="text-[15px] leading-7 text-white/55">
                          {challenge}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Results */}
        {project.results && (
          <section className="border-t border-white/5 px-6 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                className="rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-10 text-center"
              >
                <h2 className="text-2xl font-semibold tracking-tight">Results</h2>
                <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-white/60">
                  {project.results}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Links */}
        <section className="border-t border-white/5 px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#050608] transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5"
                >
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-0.5"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
