import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCertificates } from "../data/useData";
import { certificateCategories } from "../data/data";

export default function CertificatesPage() {
  const { certificates } = useCertificates();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = certificates.filter((cert) => {
    const matchesCategory =
      activeCategory === "All" || cert.category === activeCategory;
    const matchesSearch =
      cert.title?.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                All Certifications
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-textSecondary sm:text-base">
                Professional certifications and continuous learning achievements.
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
                  placeholder="Search certificates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-[#d1d9e6] bg-cardWhite py-3.5 pl-12 pr-5 text-sm text-textPrimary shadow-soft outline-none transition-all duration-300 focus:border-softBlue/50 focus:shadow-lg"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {certificateCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
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
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-textSecondary">
                  No certificates match your search.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((cert, index) => (
                  <motion.article
                    key={cert.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col rounded-[22px] border border-[#e5e9f0] bg-cardWhite p-6 shadow-soft transition-all duration-300 hover:shadow-lg"
                  >
                    {cert.thumbnail ? (
                      <div className="mb-5 overflow-hidden rounded-[14px]">
                        <img
                          src={cert.thumbnail}
                          alt={cert.title}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="mb-5 flex h-44 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#f0f2f5] to-[#e5e9f0]">
                        <svg
                          className="h-14 w-14 text-textSecondary/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    )}

                    <span className="mb-3 self-start rounded-full bg-softBlue/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-softBlue">
                      {cert.category}
                    </span>

                    <h3 className="text-base font-semibold leading-snug text-textPrimary">
                      {cert.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-softBlue">
                      {cert.issuer}
                    </p>

                    <p className="mt-1 text-xs text-textSecondary">
                      Issued: {cert.issued}
                    </p>

                    <p className="mt-3 flex-1 text-sm leading-6 text-textSecondary">
                      {cert.description}
                    </p>

                    <a
                      href={cert.credentialLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 self-start text-xs font-medium text-textSecondary transition-colors duration-300 hover:text-softBlue"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Verify Credential
                    </a>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
