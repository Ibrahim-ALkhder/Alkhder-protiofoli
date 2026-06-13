import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../data/data";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e, link) => {
    e.preventDefault();

    if (link.href === "/") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (link.href.startsWith("/#")) {
      const hash = link.href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: hash } });
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/50 bg-white/55 px-5 py-3 shadow-soft backdrop-blur-xl sm:px-7">
        <Link
          to="/"
          className="font-serif text-xl tracking-wide text-textPrimary"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Ibrahim
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isHashLink = link.href.startsWith("/#");
            const isActive =
              location.pathname === link.href ||
              (link.href === "/" && location.pathname === "/");

            if (isHashLink || link.href === "/") {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
                  className={`text-sm font-medium transition duration-300 hover:text-textPrimary ${
                    isActive ? "text-textPrimary" : "text-textSecondary"
                  }`}
                >
                  {link.name}
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition duration-300 hover:text-textPrimary ${
                  location.pathname === link.href
                    ? "text-textPrimary"
                    : "text-textSecondary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <a
          href="mailto:ibrahim@example.com"
          className="rounded-full bg-[#151515] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-black"
        >
          Let&apos;s Talk
        </a>
      </nav>
    </motion.header>
  );
}
