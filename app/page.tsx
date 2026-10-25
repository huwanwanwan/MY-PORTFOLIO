import Image from "next/image";
import Link from "next/link";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "../components/portfolio-sections";
import { TechIcon } from "../components/tech-icon";
import SiteShell from "../components/site-shell";

const heroTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Kotlin",
  "Node.js",
  "Git",
];

export default function Home() {
  return (
    <SiteShell activePage="home">
      <section
        className="profile-intro scroll-reveal"
        data-scroll-reveal
        aria-labelledby="home-heading"
      >
        <div className="profile-copy">
          <p className="eyebrow">
            <span className="availability-dot" aria-hidden="true" />
            WEB &amp; MOBILE DEVELOPER
          </p>
          <h1 id="home-heading">
            <span>Hi, I&apos;m Juan</span>
            <span className="hero-name">Web &amp; Mobile Developer</span>
          </h1>
          <p className="intro-copy">
            Web and Mobile Developer focused on building responsive websites,
            functional mobile applications, and intuitive user interfaces.
          </p>
          <div className="intro-actions desktop-only-actions">
            <Link className="intro-link" href="/projects">
              <span>View My Work</span>
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
            <a
              className="intro-link intro-link-secondary"
              href="/Juan_Militante_CV.html"
              target="_blank"
              rel="noopener noreferrer"
              download="Juan_Militante_CV.html"
            >
              <span>Download CV</span>
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          <div
            className="hero-tech-strip desktop-only-tech scroll-reveal"
            data-scroll-reveal
            aria-label="Technologies I work with"
          >
            <p className="hero-tech-heading">TECHNOLOGIES I WORK WITH</p>
            <div className="hero-tech-icons">
              {heroTechnologies.map((tech, idx) => (
                <Link
                  key={tech}
                  href={`/skills?skill=${encodeURIComponent(tech === "React.js" ? "React" : tech)}#skills`}
                  className="hero-tech-badge scroll-reveal"
                  data-scroll-reveal
                  style={{ transitionDelay: `${idx * 45}ms` }}
                  title={`Explore ${tech} projects & skills`}
                  aria-label={`Explore ${tech} projects & skills`}
                >
                  <TechIcon name={tech} />
                  <span className="hero-tech-label">{tech}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="home-portrait-column">
          <figure className="home-portrait-frame">
            <Image
              src="/profile/professional_profile_cutout.png"
              alt="Portrait of Juan Domanico Militante"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="home-portrait-image"
              unoptimized
            />
          </figure>

          {/* Under-portrait actions & tech stack for mobile */}
          <div className="hero-mobile-under-portrait">
            <div className="intro-actions mobile-only-actions">
              <Link className="intro-link" href="/projects">
                <span>View My Work</span>
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
              <a
                className="intro-link intro-link-secondary"
                href="/Juan_Militante_CV.html"
                target="_blank"
                rel="noopener noreferrer"
                download="Juan_Militante_CV.html"
              >
                <span>Download CV</span>
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>

            <div
              className="hero-tech-strip mobile-only-tech scroll-reveal"
              data-scroll-reveal
              aria-label="Technologies I work with"
            >
              <p className="hero-tech-heading">TECHNOLOGIES I WORK WITH</p>
              <div className="hero-tech-icons">
                {heroTechnologies.map((tech, idx) => (
                  <Link
                    key={tech}
                    href={`/skills?skill=${encodeURIComponent(tech === "React.js" ? "React" : tech)}#skills`}
                    className="hero-tech-badge scroll-reveal"
                    data-scroll-reveal
                    style={{ transitionDelay: `${120 + idx * 75}ms` }}
                    title={`Explore ${tech} projects & skills`}
                    aria-label={`Explore ${tech} projects & skills`}
                  >
                    <TechIcon name={tech} />
                    <span className="hero-tech-label">{tech}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AboutSection projectPlaceholder />
      <ProjectsSection slider={true} />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </SiteShell>
  );
}
