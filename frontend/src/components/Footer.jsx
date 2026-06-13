import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-pro " id="Footer">
      <div className="footer-pro__glow footer-pro__glow--one" />
      <div className="footer-pro__glow footer-pro__glow--two" />
      <div className="footer-pro__noise" />

      <div className="footer-pro__inner">
        <div className="footer-pro__top">
          <div className="footer-pro__brand">
            <p className="footer-pro__eyebrow">Available for select projects</p>
            <h2 className="footer-pro__title">Let&apos;s build something refined.</h2>
            <p className="footer-pro__text">
              Thoughtful interfaces, polished systems, and clean full stack
              execution with a calm premium feel.
            </p>

            <div className="footer-pro__cta-row">
              <a
                href="mailto:ibrahim@email.com"
                className="footer-pro__button footer-pro__button--primary"
              >
                Let&apos;s Talk
              </a>

              <a
                href="/Ibrahim-CV.pdf"
                download
                className="footer-pro__button footer-pro__button--ghost"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="footer-pro__cards">
            <a
              href="mailto:ibrahim@email.com"
              className="footer-pro__card"
            >
              <span className="footer-pro__card-label">Email</span>
              <span className="footer-pro__card-value">ibrahim@email.com</span>
            </a>

            <a
              href="#"
              className="footer-pro__card"
            >
              <span className="footer-pro__card-label">GitHub</span>
              <span className="footer-pro__card-value">github.com/ibrahim</span>
            </a>

            <a
              href="#"
              className="footer-pro__card"
            >
              <span className="footer-pro__card-label">LinkedIn</span>
              <span className="footer-pro__card-value">linkedin.com/in/ibrahim</span>
            </a>

            <Link
              to="/projects"
              className="footer-pro__card footer-pro__card--explore"
            >
              <span className="footer-pro__card-label">Explore</span>
              <span className="footer-pro__card-value footer-pro__card-value--action">
                View All Projects →
              </span>
            </Link>
          </div>
        </div>

        <div className="footer-pro__divider" />

        <div className="footer-pro__bottom">
          <div className="footer-pro__signature">
            <span className="footer-pro__name">Ibrahim Talb</span>
            <span className="footer-pro__dot" />
            <span className="footer-pro__role">Full Stack Developer</span>
          </div>

          <div className="footer-pro__meta">
            <span>© {new Date().getFullYear()}</span>
            <span>Crafted with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}