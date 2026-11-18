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
import GitHubContributions from "../components/github-contributions";

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
        <svg className="hero-waves" viewBox="0 0 1600 180" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hero-wave" x1="0%" y1="0%" x2="100%" y2="0%"><stop stopColor="#FFA586"/><stop offset=".25" stopColor="#B51A2B"/><stop offset=".52" stopColor="#384358"/><stop offset="1" stopColor="#B51A2B"/></linearGradient>
            <linearGradient id="hero-wave-shadow"><stop stopColor="#384358" stopOpacity=".5"/><stop offset=".5" stopColor="#161B2F" stopOpacity=".1"/><stop offset="1" stopColor="#541A2E"/></linearGradient>
          </defs>
          <path d="M0 12C150 42 165 153 385 179C650 146 715 183 905 180C1200 185 1320 74 1455 48C1520 35 1560 35 1600 38V180H0Z" fill="url(#hero-wave-shadow)"/>
          <path d="M0 112C145 114 245 169 385 180C650 160 720 177 905 180C1235 198 1330 55 1475 42C1535 35 1575 38 1600 41V180H0Z" fill="url(#hero-wave)"/>
          <path d="M0 179C410 180 520 165 710 174S1035 202 1220 161C1390 128 1460 83 1600 91V180H0Z" fill="url(#hero-wave-shadow)"/>
        </svg>
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
            >
              <span>View CV</span>
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
            <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", overflow: "visible" }}>
              <defs>
                <filter id="home-portrait-outline" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
                  <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="outerExpanded" />
                  <feFlood floodColor="#ffffff" />
                  <feComposite in2="outerExpanded" operator="in" result="whiteOutline" />
                  <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="innerExpanded" />
                  <feFlood floodColor="#c8102e" />
                  <feComposite in2="innerExpanded" operator="in" result="redOutline" />
                  <feMerge><feMergeNode in="whiteOutline" /><feMergeNode in="redOutline" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
            </svg>
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
                >
                <span>View CV</span>
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
      <GitHubContributions />
      <ProjectsSection slider={true} />
      <AboutSection projectPlaceholder />
      <SkillsSection compact />
      <ExperienceSection slider={true} />
      <ContactSection compact />
    </SiteShell>
  );
}
