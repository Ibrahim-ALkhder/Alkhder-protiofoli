import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCertificates } from "../data/useData";
import { certificateCategories } from "../data/data";

function CertificateCard({ cert, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.04 }}
      className="group/cert relative flex w-[280px] shrink-0 flex-col rounded-[22px] border border-white/10 bg-cardWhite p-6 shadow-soft transition-shadow duration-300 hover:shadow-lg sm:w-[300px]"
      style={{
        animation: "cert-float 5s ease-in-out infinite",
        animationDelay: `${index * 0.6}s`,
      }}
    >
      <div className="mb-4 overflow-hidden rounded-xl">
        {cert.thumbnail ? (
          <img
            src={cert.thumbnail}
            alt={cert.title}
            className="h-36 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#f0f2f5] to-[#e5e9f0]">
            <svg
              className="h-10 w-10 text-textSecondary/25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold leading-snug text-textPrimary">
          {cert.title}
        </h3>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-softBlue">
          {cert.issuer}
        </p>
        <p className="mt-1.5 text-xs text-textSecondary">
          Issued: {cert.issued}
        </p>
      </div>
      <a
        href={cert.credentialLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-textSecondary transition-colors duration-300 hover:text-softBlue"
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
  );
}

export default function CertificatesSection() {
  const [isPaused, setIsPaused] = useState(false);
  const { certificates } = useCertificates();
  const duplicated = [...certificates, ...certificates];

  if (certificates.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-lightBgSecondary px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-textPrimary sm:text-5xl">
            Certificates
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-textSecondary sm:text-base">
            Professional certifications and continuous learning achievements.
          </p>
        </motion.div>
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hide-scrollbar overflow-hidden"
      >
        <div
          className="flex gap-6"
          style={{
            animation: isPaused ? "none" : "cert-scroll 40s linear infinite",
            width: "max-content",
          }}
        >
          {duplicated.map((cert, i) => (
            <div key={`${cert.id}-${i}`} className="shrink-0">
              <CertificateCard
                cert={cert}
                index={i % certificates.length}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl text-center">
        <Link
          to="/certificates"
          className="inline-flex items-center gap-2 rounded-full border border-[#d1d9e6] bg-cardWhite px-7 py-3 text-sm font-medium text-textPrimary shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-softBlue/40 hover:shadow-lg"
        >
          View All Certificates
          <span className="text-base">→</span>
        </Link>
      </div>
    </section>
  );
}
