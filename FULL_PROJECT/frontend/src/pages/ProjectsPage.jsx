import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProjects } from "../data/useData";

const categories = ["All", "Frontend", "Backend", "Full Stack", "Design"];
const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const { projects } = useProjects();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1f2937]">
      <Navbar />

      <main className="pt-28">
        <section className="px-4 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="text-center"
            >
              <h1 className="text-5xl font-semibold tracking-tight text-textPrimary sm:text-6xl">
                All Projects
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-textSecondary sm:text-base">
                A collection of projects spanning web development, design, and
                full-stack engineering.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-12 max-w-2xl"
            >
              <div className="relative mb-6">
                <svg
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-textSecondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-full border border-[#d1d9e6] bg-cardWhite py-3.5 pl-12 pr-5 text-sm text-textPrimary shadow-soft outline-none transition-all duration-300 focus:border-softBlue/50 focus:shadow-lg"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-textPrimary text-white shadow-md"
                        : "border border-[#d1d9e6] bg-cardWhite text-textSecondary shadow-soft hover:border-softBlue/40 hover:text-textPrimary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-28 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {paginated.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-textSecondary">
                  No projects match your criteria.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col rounded-[22px] border border-[#e5e9f0] bg-cardWhite p-6 shadow-soft transition-all duration-300 hover:shadow-lg"
                  >
                    {project.screenshots?.desktop ? (
                      <div className="mb-5 overflow-hidden rounded-[14px]">
                        <img
                          src={project.screenshots.desktop}
                          alt={project.title}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="mb-5 flex h-44 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#f0f2f5] to-[#e5e9f0]">
                        <svg
                          className="h-12 w-12 text-textSecondary/25"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-textPrimary">
                      {project.title?.replace(/\n/g, " ")}
                    </h3>

                    {project.shortDescription && (
                      <p className="mt-2 flex-1 text-sm leading-6 text-textSecondary">
                        {project.shortDescription}
                      </p>
                    )}

                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-softBlue/10 px-2.5 py-0.5 text-[11px] font-medium text-softBlue"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="rounded-full bg-[#e5e9f0] px-2.5 py-0.5 text-[11px] font-medium text-textSecondary">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {project.slug && project.variant !== "contact" && (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-softBlue transition-colors duration-300 hover:text-textPrimary"
                      >
                        View Details
                        <span className="text-base">→</span>
                      </Link>
                    )}
                  </motion.article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-[#d1d9e6] bg-cardWhite px-4 py-2 text-sm font-medium text-textSecondary shadow-soft transition-all duration-300 hover:border-softBlue/40 hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                        page === currentPage
                          ? "bg-textPrimary text-white shadow-md"
                          : "border border-[#d1d9e6] bg-cardWhite text-textSecondary shadow-soft hover:border-softBlue/40 hover:text-textPrimary"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-[#d1d9e6] bg-cardWhite px-4 py-2 text-sm font-medium text-textSecondary shadow-soft transition-all duration-300 hover:border-softBlue/40 hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
