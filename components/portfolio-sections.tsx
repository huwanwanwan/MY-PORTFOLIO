import SiglaShowcase from "./sigla-showcase";
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
          {/* LEFT COLUMN: 2x2 Stats Matrix (Clickable Links) */}
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

          {/* RIGHT COLUMN: Description & Learn More Button */}
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
              Building digital solutions,
              <br />
              <span className="text-muted">with purpose and craft.</span>
            </h2>
            <p className="home-about-desc">
              I&apos;m <strong className="editorial-highlight">Juan Domanico Militante (Ikoy)</strong>, a Web and Mobile Developer from Bulacan, Philippines. From building <strong className="editorial-highlight">SIGLA</strong>—our offline-first mobile sign language translator capstone—to crafting POS systems, IoT hardware, and Unity games, I love turning ideas into clean, efficient, and user-friendly experiences.
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
      <section
        className="section-block content-section about-hero scroll-reveal"
        id="about"
        data-scroll-reveal
        aria-labelledby="about-heading"
      >
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <p className="editorial-eyebrow">
              <span className="editorial-eyebrow-dot" aria-hidden="true" />
              ABOUT ME · BULACAN, PHILIPPINES
            </p>
            <h1 id="about-heading" className="editorial-title">
              The whole story,
              <br />
              <span className="text-muted">told properly.</span>
            </h1>
            <p className="about-lead">
              I&apos;m <strong className="editorial-highlight">Juan Domanico Militante (known as Ikoy)</strong>—a Web &amp; Mobile
              Developer dedicated to crafting responsive digital products,
              intuitive interfaces, and performant user experiences.
            </p>
            <p className="about-supporting-copy">
              From clean front-end architecture to offline-first engineering in
              projects like <strong className="editorial-highlight">SIGLA</strong> (a mobile sign language translator app), I build
              purposeful software that connects ideas with real-world accessibility.
            </p>
            <div className="intro-actions about-actions">
              <Link className="intro-link" href="/projects">
                View my projects <span aria-hidden="true">↗</span>
              </Link>
              <Link className="intro-link intro-link-secondary" href="/contact">
                Contact me
              </Link>
            </div>
          </div>
          {projectPlaceholder ? (
            <div className="about-sigla-standalone-wrapper">
              <SiglaShowcase />
            </div>
          ) : (
            <aside className="about-profile-card" aria-label="About Juan">
              <AboutPortrait />
              <div className="about-profile-meta">
                <span className="section-kicker">
                  <AboutIcon name="pin" /> BASED IN
                </span>
                <strong>Bulacan, Philippines</strong>
                <p>Front-end developer · App and website creator</p>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section
        className="section-block content-section about-approach scroll-reveal"
        id="about-approach"
        data-scroll-reveal
        aria-labelledby="about-approach-heading"
      >
        <div className="content-section-heading editorial-heading">
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            01 — HOW I LIKE TO BUILD
          </p>
          <h2 id="about-approach-heading" className="editorial-title">
            Thoughtful work,
            <br />
            <span className="text-muted">useful results.</span>
          </h2>
          <p>
            I like making digital experiences <strong className="editorial-highlight">clear, approachable, and purposeful</strong>.
          </p>
        </div>
        <div className="about-principles-grid">
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <div className="about-principle-top">
              <span>01</span>
              <span className="about-principle-highlight">HUMAN-CENTERED</span>
            </div>
            <h3>Start with the people</h3>
            <p>
              I think about who will use a project and what they need it to help
              them do.
            </p>
          </article>
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <div className="about-principle-top">
              <span>02</span>
              <span className="about-principle-highlight">INTUITIVE UI</span>
            </div>
            <h3>Shape a clear experience</h3>
            <p>
              I enjoy building friendly interfaces for websites and mobile
              applications.
            </p>
          </article>
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <div className="about-principle-top">
              <span>03</span>
              <span className="about-principle-highlight">GROWTH MINDSET</span>
            </div>
            <h3>Keep learning by building</h3>
            <p>
              Each project helps me practice, improve, and make my next work
              more useful.
            </p>
          </article>
        </div>
      </section>

      <section
        className="section-block content-section about-life scroll-reveal"
        id="about-life"
        data-scroll-reveal
        aria-labelledby="about-life-heading"
      >
        <div className="content-section-heading editorial-heading">
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            02 — OUTSIDE DEVELOPMENT
          </p>
          <h2 id="about-life-heading" className="editorial-title">
            Life beyond
            <br />
            <span className="text-muted">the screen.</span>
          </h2>
          <p>
            {projectPlaceholder
              ? "A little about who I am beyond the work I do."
              : "The interests, music, stories, and food that make a day feel like mine."}
          </p>
        </div>
        {projectPlaceholder ? (
          <div className="about-life-grid">
            <div className="about-copy">
              <p>
                I enjoy making time for the things and people that help me feel
                balanced, and I like continuing to learn as I grow.
              </p>
            </div>
            <div className="about-motto">
              <span className="section-kicker">A MOTTO I LIVE BY</span>
              <blockquote>
                &ldquo;No one can do it for you, so take responsibility and do
                it yourself.&rdquo;
              </blockquote>
            </div>
          </div>
        ) : (
          <div className="about-detail-groups">
            <div className="about-details-grid about-details-grid-personal">
              <article
                className="about-detail-card about-detail-card-wide"
                data-scroll-reveal
                data-about-side="left"
              >
                <p className="section-kicker about-card-kicker">
                  <AboutIcon name="person" /> A LITTLE ABOUT ME
                </p>
                <h3>Juan Domanico Militante <span>(Ikoy)</span></h3>
                <p>
                  I&apos;m an ambivert. Sometimes I&apos;m talkative and noisy,
                  and other times I&apos;m quiet—it depends on my mood and the
                  people around me.
                </p>
                <p>
                  I may look serious or a little intimidating at first, but
                  I&apos;m actually clingy and not as serious as I seem. Once
                  people get to know me, they see a different side.
                </p>
                <div className="about-detail-highlight">
                  <div className="about-highlight-header">
                    <span className="about-highlight-icon-badge">
                      <AboutIcon name="heart" />
                    </span>
                    <span className="about-highlight-kicker">PERSONAL NOTE</span>
                  </div>
                  <p className="about-highlight-quote">
                    &ldquo;The little things make me happy—especially when friends or
                    others remember something about me. It makes me feel special
                    and appreciated.&rdquo;
                  </p>
                </div>
              </article>
              <article
                className="about-detail-card"
                data-scroll-reveal
                data-about-side="right"
              >
                <p className="section-kicker about-card-kicker">
                  <AboutIcon name="star" /> MY FAVORITES
                </p>
                <dl className="about-favorites-list">
                  <div><dt><AboutIcon name="music" /> Song</dt><dd>&ldquo;This Time I Fall&rdquo; — Jesse Lawrence</dd></div>
                  <div><dt><AboutIcon name="star" /> Artist</dt><dd>Maroon 5</dd></div>
                  <div><dt><AboutIcon name="film" /> Movie</dt><dd><em>More Than Blue</em></dd></div>
                  <div><dt><AboutIcon name="food" /> Food</dt><dd>Palabok</dd></div>
                </dl>
              </article>
              <article
                className="about-detail-card"
                data-scroll-reveal
                data-about-side="left"
              >
                <p className="section-kicker about-card-kicker">
                  <AboutIcon name="game" /> IN MY FREE TIME
                </p>
                <h3>Play, move, unwind.</h3>
                <p>
                  I enjoy online games like Mobile Legends, League of Legends,
                  and CrossFire. I also like playing table tennis during my free
                  time.
                </p>
              </article>
              <article
                className="about-detail-card"
                data-scroll-reveal
                data-about-side="right"
              >
                <p className="section-kicker about-card-kicker">
                  <AboutIcon name="sparkles" /> WHAT&apos;S NEXT
                </p>
                <h3>Always learning.</h3>
                <p>
                  I want to learn more programming languages, improve my coding
                  skills, and discover more about software development.
                </p>
              </article>
            </div>

            <section
              className="about-detail-group"
              aria-labelledby="about-education-heading"
            >
              <div className="about-detail-heading">
                <p className="section-kicker">MY LEARNING JOURNEY</p>
                <h3 id="about-education-heading">Educational background</h3>
              </div>
              <div className="about-details-grid about-details-grid-education">
                <article
                  className="about-detail-card"
                  data-scroll-reveal
                  data-about-side="left"
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
                  data-about-side="right"
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
                  data-about-side="left"
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
                  data-about-side="right"
                >
                  <p className="section-kicker about-card-kicker">
                    <AboutIcon name="graduation" /> COLLEGE · CURRENTLY STUDYING
                  </p>
                  <h4>Bachelor of Science in Information Technology</h4>
                  <p>Pambayang Dalubhasaan ng Marilao (PDM)</p>
                </article>
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
        )}
        <div className="about-closing-link">
          <p>Have an idea or want to work together?</p>
          <Link className="intro-link" href="/contact">
            Let&apos;s connect <span aria-hidden="true">↗</span>
          </Link>
        </div>
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
      aria-labelledby="projects-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="editorial-eyebrow">
          <span className="editorial-eyebrow-dot" aria-hidden="true" />
          SELECTED WORK &amp; CASE STUDIES
        </p>
        <h1 id="projects-heading" className="editorial-title">
          Work that ships,
          <br />
          <span className="text-muted">and works.</span>
        </h1>
        <p>
          Ideas and systems I&apos;ve built across <strong className="editorial-highlight">Mobile &amp; AR</strong>, <strong className="editorial-highlight">Web &amp; Systems</strong>, Game Development, and IoT hardware.
        </p>
      </div>
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

export function SkillsSection() {
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
        <h1 id="skills-heading" className="editorial-title">
          Tools I use to
          <br />
          <span className="text-muted">ship great products.</span>
        </h1>
        <p>
          The languages, frameworks, platforms, and tools I&apos;ve explored through my projects and studies. Select any technology below to see which projects use it in their stack.
        </p>
      </div>
      <SkillsShowcase />
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section
      className="section-block content-section"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="editorial-eyebrow">
          <span className="editorial-eyebrow-dot" aria-hidden="true" />
          TRACK RECORD &amp; JOURNEY
        </p>
        <h1 id="experience-heading" className="editorial-title">
          Where I&apos;ve built
          <br />
          <span className="text-muted">and shipped.</span>
        </h1>
        <p>Projects, systems, and academic milestones from my development journey.</p>
      </div>
      <div className="experience-education-grid">
        <div className="journey-column">
          <h2 className="journey-column-heading">Experience</h2>
          <ExperienceList />
        </div>
        <div className="journey-column">
          <h2 className="journey-column-heading">Education</h2>
          <article className="journey-entry scroll-reveal" data-scroll-reveal>
            <span className="journey-index"><EducationIcon name="code" /></span>
            <div>
              <p className="education-level">College</p>
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

          {/* Academic Awards & Recognition Highlight Card */}
          <div className="education-awards-card scroll-reveal" data-scroll-reveal>
            <span className="education-awards-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              Academic Honors &amp; Awards
            </span>
            <div className="education-awards-grid">
              <div className="education-award-item">
                <svg className="award-medal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" fillOpacity="0.2" />
                </svg>
                <div className="award-details">
                  <h5>Graduated With Honors</h5>
                  <p>Assemblywoman Felicita&apos;s G. Bernardino Memorial Trade School (AFGBMTS)</p>
                </div>
              </div>
              <div className="education-award-item">
                <svg className="award-medal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                  <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" fill="currentColor" fillOpacity="0.2" />
                </svg>
                <div className="award-details">
                  <h5>Conduct Awardee</h5>
                  <p>Recognized for exemplary deportment, discipline, and moral character</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="credentials-single">
        <article className="credential-panel scroll-reveal" id="credentials" data-scroll-reveal>
          <p className="section-kicker">ACADEMIC HONORS</p>
          <h2>Academic Recognition</h2>
          <p>
            Graduated with Honors and received a Conduct Award from
            Assemblywoman Felicita&apos;s G. Bernardino Memorial Trade School.
          </p>
        </article>
      </div>

      <CertificationsShowcase />
    </section>
  );
}

export function ContactSection() {
  return <ContactHub />;
}
