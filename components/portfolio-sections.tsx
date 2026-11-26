import ProjectsSlider from "./projects-slider";
import Link from "next/link";
import AboutPortrait from "./about-portrait";
import ProjectsShowcase from "./projects-showcase";
import SkillsShowcase from "./skills-showcase";
import CertificationsShowcase from "./certifications-showcase";
import ExperienceList from "./experience-list";
import ContactHub from "./contact-hub";

const educationIcons = {
  school: "M22 10 12 4 2 10l10 6 10-6z M6 12v5c3 3 9 3 12 0v-5",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  graduation: "M22 10 12 5 2 10l10 5 10-5z M6 12v5c4 3 8 3 12 0v-5",
  code: "m8 8-4 4 4 4 m8-8 4 4-4 4 m-2-12-4 16",
} as const;

type EducationIconName = keyof typeof educationIcons;

function EducationIcon({ name }: { name: EducationIconName }) {
  return (
    <svg
      className="info-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={educationIcons[name]} />
    </svg>
  );
}

const aboutIcons = {
  person: "M20 21a8 8 0 0 0-16 0 M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z",
  music: "M9 18V5l12-2v13 M9 18a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3z M21 16a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3z",
  game: "M6 12h4m-2-2v4m8-1h.01M18 10h.01M7 6h10a4 4 0 0 1 3.9 3.2l1 5a3 3 0 0 1-5 2.8l-2.2-2H9.3l-2.2 2a3 3 0 0 1-5-2.8l1-5A4 4 0 0 1 7 6z",
  layers: "m12 3 10 5-10 5L2 8l10-5z M2 12l10 5 10-5 M2 16l10 5 10-5",
  growth: "M3 21h18 M5 21v-6h4v6 M11 21V11h4v10 M17 21V7h4v14 M4 10l6-5 4 2 6-5 M15 2h5v5",
  mail: "M3 5h18v14H3z M3 5l9 7 9-7",
  sparkles: "m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3z M19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14z",
  school: "M22 10 12 4 2 10l10 6 10-6z M6 12v5c3 3 9 3 12 0v-5",
  graduation: "M22 10 12 5 2 10l10 5 10-5z M6 12v5c4 3 8 3 12 0v-5 M22 10v6",
  work: "M3 7h18v13H3z M8 7V4h8v3 M3 12h18 M10 12v2h4v-2",
  pin: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  star: "m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z",
  film: "M4 4h16v16H4z M8 4v16 M16 4v16 M4 9h4m-4 6h4m8-6h4m-4 6h4",
  food: "M6 3v7m-3-7v4a3 3 0 0 0 6 0V3m-3 7v11m9-18v18m0-18c3 2 4 5 4 9h-4",
} as const;

type AboutIconName = keyof typeof aboutIcons;

function AboutIcon({ name }: { name: AboutIconName }) {
  return (
    <svg
      className="about-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={aboutIcons[name]} />
    </svg>
  );
}

function InterestArtwork({ kind }: { kind: "game" | "laptop" | "music" }) {
  return <div className={"about-interest-art about-interest-art-" + kind} aria-hidden="true">
    <span className="about-interest-art-glow" />
    <svg viewBox="0 0 120 110" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {kind === "music" ? <>
        <path d="M43 75V29l49-10v46 M43 41l49-10" /><ellipse cx="31" cy="78" rx="12" ry="9" transform="rotate(-20 31 78)" /><ellipse cx="80" cy="68" rx="12" ry="9" transform="rotate(-20 80 68)" />
      </> : kind === "game" ? <>
        <path d="M37 32c-11-3-18 6-21 19l-7 26c-3 13 5 19 14 10l16-14h35l15 16c8 9 17 5 16-8l-3-27c-1-14-9-21-20-20l-14 3-17-3-14-2Z" />
        <path d="M28 46v15m-7-8h15" /><circle cx="81" cy="49" r="2.5" /><circle cx="91" cy="58" r="2.5" /><circle cx="72" cy="58" r="2.5" /><circle cx="81" cy="67" r="2.5" />
        <circle cx="43" cy="66" r="5" /><circle cx="61" cy="66" r="5" /><path d="m49 48 9 1" />
      </> : <>
        <path d="m27 21 73 5-5 61-76-8 8-58Z M23 70l73 7 M19 79 5 89l80 12 10-14 M5 89l1 5 79 11 1-4" />
        <path d="m50 40-10 7 9 9m21-15 9 9-11 6m-7-20-7 24 M42 89l20 3" />
      </>}
    </svg>
  </div>;
}

export function AboutSection({
  projectPlaceholder = false,
}: {
  projectPlaceholder?: boolean;
}) {
  if (projectPlaceholder) {
    return (
      <section
        className="section-block content-section home-about-showcase scroll-reveal"
        id="about"
        data-scroll-reveal
        aria-labelledby="about-heading"
      >
        <div className="home-about-reversed-grid">
          {/* Four stacked stat rows (clickable links) */}
          <div className="home-about-stats-matrix">
            <Link
              href="/about#about-education-heading"
              className="home-stat-cell scroll-reveal"
              data-scroll-reveal
              style={{ transitionDelay: "0ms" }}
              title="View my educational background"
            >
              <div className="home-stat-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="home-stat-text">
                <strong>4+</strong>
                <span>Years IT Study</span>
              </div>
            </Link>

            <Link
              href="/projects"
              className="home-stat-cell scroll-reveal"
              data-scroll-reveal
              style={{ transitionDelay: "70ms" }}
              title="Explore all 14+ projects"
            >
              <div className="home-stat-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
              </div>
              <div className="home-stat-text">
                <strong>14+</strong>
                <span>Projects Completed</span>
              </div>
            </Link>

            <Link
              href="/experience#certifications"
              className="home-stat-cell scroll-reveal"
              data-scroll-reveal
              style={{ transitionDelay: "140ms" }}
              title="View verified certificates"
            >
              <div className="home-stat-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div className="home-stat-text">
                <strong>11+</strong>
                <span>Verified Certificates</span>
              </div>
            </Link>

            <Link
              href="/about"
              className="home-stat-cell scroll-reveal"
              data-scroll-reveal
              style={{ transitionDelay: "210ms" }}
              title="Read more about me"
            >
              <div className="home-stat-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div className="home-stat-text">
                <strong>100%</strong>
                <span>Dedication &amp; Craft</span>
              </div>
            </Link>
          </div>

          {/* Description & Learn More Button */}
          <div
            className="home-about-copy-right scroll-reveal"
            data-scroll-reveal
            style={{ transitionDelay: "120ms" }}
          >
            <p className="editorial-eyebrow">
              <span className="editorial-eyebrow-dot" aria-hidden="true" />
              ABOUT ME · PHILIPPINES
            </p>
            <h2 id="about-heading" className="editorial-title">
              <span className="heading-highlight">Engineering web &amp; mobile solutions,</span>
              <br />
              <span className="text-muted">focused on usability and purpose.</span>
            </h2>
            <p className="home-about-desc">
              A Web and Mobile Developer with <strong className="editorial-highlight">2 years of experience</strong> creating websites and mobile applications using <strong className="editorial-highlight">HTML, CSS, JavaScript, React, Kotlin, Node.js, and PostgreSQL</strong>. Focused on building responsive websites and mobile apps that are simple, useful, and easy to use.
            </p>
            <div className="home-about-action">
              <Link className="home-about-outline-btn" href="/about">
                <span>Learn More About Me</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-block content-section about-life about-personal-hero" id="about" aria-labelledby="about-heading">
        <header className="about-personal-heading">
          <div><p className="editorial-eyebrow"><span className="editorial-eyebrow-dot" aria-hidden="true" />02: OUTSIDE THE CODE EDITOR</p>
          <h1 id="about-heading" className="editorial-title"><span className="heading-highlight">Life and interests,</span><br /><span className="text-muted">outside daily development.</span></h1></div>
        </header>
        <div className="about-personal-layout">
          <div className="about-personal-story">
            <div className="about-personal-portrait"><AboutPortrait /></div>
            <div className="about-personal-bio">
              <p className="section-kicker">A LITTLE ABOUT ME</p>
              <h2><span className="about-name-line">Juan Domanico</span><span className="about-name-line">Militante <span className="about-name-nickname">(Ikoy)</span></span></h2>
              <p>I&apos;m an ambivert. Sometimes I&apos;m talkative and energetic, while other times I&apos;m quiet. It depends on my mood and the people I&apos;m with.</p>
              <p>I may look serious or hard to approach at first, but I&apos;m actually friendly, caring, and a little clingy once you get to know me.</p>
            </div>
            <aside className="about-personal-facts" aria-label="Location, role, and focus">
              <div><span className="about-personal-fact-icon"><AboutIcon name="pin" /></span><div><p>Based in</p><strong>Bulacan, Philippines</strong></div></div>
              <div><span className="about-personal-fact-icon"><EducationIcon name="code" /></span><div><p>Role</p><strong>Web &amp; Mobile Developer</strong></div></div>
              <div><span className="about-personal-fact-icon"><AboutIcon name="graduation" /></span><div><p>Focus</p><strong>Building useful and<br /> user-friendly solutions</strong></div></div>
            </aside>
            <blockquote className="about-personal-quote"><span aria-hidden="true">&#8220;</span><p>I appreciate the little things, especially when someone remembers something about me. Even the smallest gestures mean a lot.</p></blockquote>
          </div>
          <div className="about-personal-interests">
            <article className="about-personal-interest about-personal-favorites">
              <h2>My Favorites</h2>
              <dl className="about-favorites-list">
                  <div><dt><AboutIcon name="music" /> Song</dt><dd>&ldquo;This Time I Fall&rdquo; by Jesse Lawrence</dd></div>
                  <div><dt><AboutIcon name="star" /> Artist</dt><dd>Maroon 5</dd></div>
                  <div><dt><AboutIcon name="film" /> Movie</dt><dd><em>More Than Blue</em></dd></div>
                  <div><dt><AboutIcon name="food" /> Food</dt><dd>Palabok</dd></div>
                </dl>
              <InterestArtwork kind="music" />
            </article>
            <article className="about-personal-interest about-personal-game">
              <h2>In My Free Time</h2><h3>Play, move, unwind.</h3>
              <p>I enjoy online games like Mobile Legends, League of Legends, and CrossFire. I also like playing table tennis during my free time.</p>
              <InterestArtwork kind="game" />
            </article>
            <article className="about-personal-interest about-personal-next">
              <h2>What&apos;s Next</h2><h3>Always learning.</h3>
              <p>I want to learn more programming languages, improve my coding skills, and discover more about software development.</p>
              <InterestArtwork kind="laptop" />
            </article>
          </div>
        </div>
      </section>
      <section className="section-block content-section about-life" aria-label="Education and work experience">
        <div className="about-detail-groups">
            <section
              className="about-detail-group"
              aria-labelledby="about-education-heading"
            >
              <div className="about-detail-heading">
                <p className="section-kicker">EXPERIENCE &amp; EDUCATION</p>
                <h3 id="about-education-heading">My journey in tech and learning.</h3>
              </div>
              <div className="about-journey-layout">
                <div className="about-journey-timeline">
                  <article className="about-journey-row">
                    <span className="about-journey-icon"><AboutIcon name="graduation" /></span>
                    <div><h4>BS in Information Technology</h4><p>Pambayang Dalubhasaan ng Marilao</p></div>
                    <span className="about-journey-date">Currently studying</span>
                  </article>
                  <article className="about-journey-row">
                    <span className="about-journey-icon"><AboutIcon name="work" /></span>
                    <div><h4>IT Capstone Project Developer</h4><p>SIGLA ? Mobile Sign Language Translator</p></div>
                    <span className="about-journey-date">Capstone</span>
                  </article>
                  <article className="about-journey-row">
                    <span className="about-journey-icon"><EducationIcon name="code" /></span>
                    <div><h4>Personal Projects</h4><p>Web, Mobile, and Game Development</p></div>
                    <span className="about-journey-date">Ongoing</span>
                  </article>
                </div>
                <aside className="about-journey-summary" aria-label="Education and availability">
                  <div><span className="about-journey-icon"><AboutIcon name="graduation" /></span><div><h4>Education</h4><strong>BS in Information Technology</strong><p>Pambayang Dalubhasaan ng Marilao</p></div></div>
                  <div><span className="about-journey-icon"><AboutIcon name="pin" /></span><div><h4>Location</h4><p>Bulacan, Philippines</p></div></div>
                  <div><span className="about-journey-icon"><AboutIcon name="sparkles" /></span><div><h4>Open to</h4><p>Internship ? Collaborations ? Opportunities</p></div></div>
                </aside>
              </div>
              <div className="about-school-details">
              <div className="about-details-grid about-details-grid-education">
                <article
                  className="about-detail-card"
                  data-scroll-reveal
                >
                  <p className="section-kicker about-card-kicker">
                    <AboutIcon name="school" /> ELEMENTARY
                  </p>
                  <h4>Nazarenus College and Hospital Foundation, Inc.</h4>
                  <p>NCHFI</p>
                </article>
                <article
                  className="about-detail-card"
                  data-scroll-reveal
                >
                  <p className="section-kicker about-card-kicker">
                    <AboutIcon name="school" /> HIGH SCHOOL
                  </p>
                  <h4>Marilao Central School</h4>
                  <p>MCS</p>
                </article>
                <article
                  className="about-detail-card"
                  data-scroll-reveal
                >
                  <p className="section-kicker about-card-kicker">
                    <AboutIcon name="school" /> JUNIOR &amp; SENIOR HIGH SCHOOL
                  </p>
                  <h4>
                    Assemblywoman Felicita&apos;s G. Bernardino Memorial Trade
                    School
                  </h4>
                  <p>AFGBMTS · Graduated from Senior High School</p>
                  <div className="education-honor-badges">
                    <span className="education-honor-tag">★ With Honors</span>
                    <span className="education-honor-tag">🏅 Conduct Award</span>
                  </div>
                </article>
                <article
                  className="about-detail-card"
                  data-scroll-reveal
                >
                  <p className="section-kicker about-card-kicker">
                    <AboutIcon name="graduation" /> COLLEGE · CURRENTLY STUDYING
                  </p>
                  <h4>Bachelor of Science in Information Technology</h4>
                  <p>Pambayang Dalubhasaan ng Marilao (PDM)</p>
                </article>
              </div>
              </div>
            </section>

            <section
              className="about-detail-group"
              aria-labelledby="about-work-heading"
            >
              <div className="about-detail-heading">
                <p className="section-kicker">WORK EXPERIENCE</p>
                <h3 id="about-work-heading">Learning on the job</h3>
              </div>
              <article
                className="about-detail-card about-work-card"
                data-scroll-reveal
                data-about-side="left"
              >
                <div>
                  <p className="section-kicker about-card-kicker">
                    <AboutIcon name="work" /> 4 MONTHS
                  </p>
                  <h4>Warehouse Picker · Lazada</h4>
                </div>
                <p>
                  I found and collected the items listed in customer orders,
                  then checked that each item was correct before it was
                  prepared for delivery.
                </p>
              </article>
            </section>

        </div>
      </section>
      <section
        className="section-block content-section about-approach about-reference-approach scroll-reveal"
        id="about-approach"
        data-scroll-reveal
        aria-labelledby="about-approach-heading"
      >
        <div className="content-section-heading editorial-heading">
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            01: MY DEVELOPMENT PRINCIPLES
          </p>
          <h2 id="about-approach-heading" className="editorial-title">
            <span className="heading-highlight">How I approach every build,</span>
            <br />
            <span className="text-muted">practicality, clarity, and growth.</span>
          </h2>
          <p>
            <span className="about-focus-line">I focus on building solutions that are</span><span className="about-focus-line"><strong className="editorial-highlight">clear, approachable, and purposeful</strong>.</span>
          </p>
        </div>
        <div className="about-principles-grid">
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <div className="about-principle-top">
              <span className="about-principle-symbol"><EducationIcon name="code" /></span>
              <span className="about-principle-highlight">01: PLAN &amp; UNDERSTAND</span>
            </div>
            <h3>Start with the problem.</h3>
            <p>
              I take time to understand the goals and requirements before writing code.
            </p>

          </article>
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <div className="about-principle-top">
              <span className="about-principle-symbol"><AboutIcon name="layers" /></span>
              <span className="about-principle-highlight">02: BUILD &amp; ITERATE</span>
            </div>
            <h3>Shape a clear solution.</h3>
            <p>
              I break the idea into smaller, practical steps and build it with intention.
            </p>

          </article>
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <div className="about-principle-top">
              <span className="about-principle-symbol"><AboutIcon name="growth" /></span>
              <span className="about-principle-highlight">03: IMPROVE &amp; GROW</span>
            </div>
            <h3>Keep learning by building.</h3>
            <p>
              I revisit, refine, and explore new tools and ideas to make each project better.
            </p>

          </article>
        </div>
        <div className="about-closing-link"><p>Have an idea or want to work together?</p><Link className="intro-link" href="/contact">Let&apos;s connect <span aria-hidden="true">&#8599;</span></Link></div>
      </section>


    </>
  );
}

export function ProjectsSection({
  featuredOnly = false,
  limit,
  slider = false,
}: {
  featuredOnly?: boolean;
  limit?: number;
  slider?: boolean;
} = {}) {
  return (
    <section
      className="section-block content-section"
      id="projects"
      aria-labelledby={slider ? undefined : "projects-heading"}
      aria-label={slider ? "Featured projects" : undefined}
    >
      {!slider && <div className="content-section-heading editorial-heading">
        <p className="editorial-eyebrow">
          <span className="editorial-eyebrow-dot" aria-hidden="true" />
          SELECTED ACADEMIC &amp; PERSONAL WORK
        </p>
        <h1 id="projects-heading" className="editorial-title">
          <span className="heading-highlight">Featured project portfolio,</span>
          <br />
          <span className="text-muted">from concepts to practical applications.</span>
        </h1>
        <p>
          Ideas and systems I&apos;ve built across <strong className="editorial-highlight">Mobile &amp; AR</strong>, <strong className="editorial-highlight">Web &amp; Systems</strong>, Game Development, and IoT hardware.
        </p>
      </div>}
      {slider ? (
        <ProjectsSlider />
      ) : (
        <>
          <ProjectsShowcase featuredOnly={featuredOnly} limit={limit} />
          {featuredOnly && (
            <div className="projects-view-all-wrap">
              <Link className="intro-link" href="/projects">
                <span>Explore all 14 projects in the full directory</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export function SkillsSection({ compact = false }: { compact?: boolean } = {}) {
  const Heading = compact ? "h2" : "h1";
  return (
    <section
      className="section-block content-section"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="editorial-eyebrow">
          <span className="editorial-eyebrow-dot" aria-hidden="true" />
          TECHNICAL TOOLKIT &amp; ARCHITECTURE
        </p>
        <Heading id="skills-heading" className="editorial-title">
          <span className="heading-highlight">Technologies I build with,</span>
          <br />
          <span className="text-muted">tested through hands-on projects.</span>
        </Heading>
        <p>
          The languages, frameworks, platforms, and tools I&apos;ve explored through my projects and studies. Select any technology below to see which projects use it in their stack.
        </p>
      </div>
      <SkillsShowcase projectLimit={compact ? 3 : undefined} />
    </section>
  );
}

export function ExperienceSection({
  slider = false,
}: {
  slider?: boolean;
} = {}) {
  const Heading = slider ? "h2" : "h1";
  return (
    <section
      className="section-block content-section experience-reference"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="editorial-eyebrow">
          <span className="editorial-eyebrow-dot" aria-hidden="true" />
          EXPERIENCE &amp; EDUCATION
        </p>
        <Heading id="experience-heading" className="editorial-title">
          <span className="heading-highlight">Experience &amp; Education</span>
        </Heading>
        <p>A look at my work experience, the projects I&apos;ve built, and what I&apos;ve learned along the way.</p>
      </div>
      <div className="experience-education-grid">
        <div className="journey-column">
          <h2 className="journey-column-heading">Project Experience</h2>
          <ExperienceList />
        </div>
        <div className="journey-column">
          <h2 className="journey-column-heading">Education</h2>
          <article className="journey-entry scroll-reveal" data-scroll-reveal>
            <span className="journey-index"><EducationIcon name="code" /></span>
            <div>
              <p className="education-level">College: Current</p>
              <h4>Bachelor of Science in Information Technology</h4>
              <p className="journey-role">Pambayang Dalubhasaan ng Marilao (PDM)</p>
              <p>Currently pursuing a BS in Information Technology.</p>
            </div>
          </article>
          <article className="journey-entry scroll-reveal" data-scroll-reveal>
            <span className="journey-index"><EducationIcon name="graduation" /></span>
            <div>
              <p className="education-level">Junior &amp; Senior High School</p>
              <h4>Assemblywoman Felicita&apos;s G. Bernardino Memorial Trade School</h4>
              <p className="journey-role">AFGBMTS · Graduated</p>
              <div className="education-honor-badges">
                <span className="education-honor-tag">★ With Honors</span>
                <span className="education-honor-tag">🏅 Conduct Award</span>
              </div>
            </div>
          </article>
          <article className="journey-entry scroll-reveal" data-scroll-reveal>
            <span className="journey-index"><EducationIcon name="book" /></span>
            <div>
              <p className="education-level">High School</p>
              <h4>Marilao Central School</h4>
              <p className="journey-role">MCS</p>
            </div>
          </article>
          <article className="journey-entry scroll-reveal" data-scroll-reveal>
            <span className="journey-index"><EducationIcon name="school" /></span>
            <div>
              <p className="education-level">Elementary</p>
              <h4>Nazarenus College and Hospital Foundation, Inc.</h4>
              <p className="journey-role">NCHFI</p>
            </div>
          </article>

          <h2 className="journey-column-heading">Work Experience</h2>
          <ExperienceList work />

        </div>
      </div>
      <CertificationsShowcase variant={slider ? "carousel" : "scrollable"} />
    </section>
  );
}

export function ContactSection({ compact = false }: { compact?: boolean } = {}) {
  return <ContactHub compact={compact} />;
}
