import Image from "next/image";
import Link from "next/link";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "../components/portfolio-sections";
import SiteShell from "../components/site-shell";

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
            I&apos;m Ikoy, a front-end developer. I worked on SIGLA, my
            thesis/capstone project: a mobile sign language translator
            application for people with speech and/or hearing disabilities. I
            enjoy creating mobile apps and websites, and turning ideas into
            useful, easy-to-use experiences.
          </p>
          <div className="intro-actions">
            <Link className="intro-link" href="/projects">
              <span aria-hidden="true">▣</span> Explore my projects
            </Link>
            <Link className="intro-link intro-link-secondary" href="/about">
              About me
            </Link>
          </div>
        </div>
        <div className="portrait-column">
          <div className="portrait-mark">
            <Image
              className="portrait-image portrait-image-primary"
              src="/professional_profile_cutout.png"
              alt="Juan Domanico Militante in professional attire"
              width={2048}
              height={2048}
              sizes="(min-width: 1024px) 54vw, (min-width: 720px) 46vw, 90vw"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>
      <AboutSection projectPlaceholder />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </SiteShell>
  );
}
