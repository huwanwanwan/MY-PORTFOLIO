import Link from "next/link";
import AboutPortrait from "./about-portrait";

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
  return (
    <>
      <section
        className="section-block content-section about-hero"
        id="about"
        data-scroll-reveal
        aria-labelledby="about-heading"
      >
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <p className="section-kicker">ABOUT ME · BULACAN, PHILIPPINES</p>
            <h1 id="about-heading">
              Curious by nature.
              <br />
              Building with <em>purpose.</em>
            </h1>
            <p className="about-lead">
              I&apos;m Juan Domanico Militante, known as Ikoy. I enjoy creating
              websites and mobile apps that make ideas useful and easy to
              experience.
            </p>
            <p className="about-supporting-copy">
              As a front-end developer, I contributed to SIGLA, my
              thesis/capstone project: a mobile sign language translator
              application for people with speech and/or hearing disabilities.
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
          <aside className="about-profile-card" aria-label="About Juan">
            {projectPlaceholder ? (
              <div
                className="home-project-placeholder about-project-placeholder"
                role="img"
                aria-label="Reserved space for a future thesis project showcase"
              />
            ) : (
              <AboutPortrait />
            )}
            <div className="about-profile-meta">
              <span className="section-kicker">
                <AboutIcon name="pin" /> BASED IN
              </span>
              <strong>Bulacan, Philippines</strong>
              <p>Front-end developer · App and website creator</p>
            </div>
            {projectPlaceholder && (
              <div className="about-focus-card">
                <p className="section-kicker">THESIS / CAPSTONE</p>
                <h2>SIGLA</h2>
                <p>
                  A mobile sign language translator for people with speech
                  and/or hearing disabilities.
                </p>
                <div className="tag-row">
                  <span>Mobile app</span>
                  <span>Front-end</span>
                  <span>Accessibility</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section
        className="section-block content-section about-approach"
        id="about-approach"
        data-scroll-reveal
        aria-labelledby="about-approach-heading"
      >
        <div className="content-section-heading editorial-heading">
          <p className="section-kicker">01 — HOW I LIKE TO BUILD</p>
          <h2 id="about-approach-heading">Thoughtful work, useful results.</h2>
          <p>
            I like making digital experiences clear, approachable, and
            purposeful.
          </p>
        </div>
        <div className="about-principles-grid">
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <span>01</span>
            <h3>Start with the people</h3>
            <p>
              I think about who will use a project and what they need it to help
              them do.
            </p>
          </article>
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <span>02</span>
            <h3>Shape a clear experience</h3>
            <p>
              I enjoy building friendly interfaces for websites and mobile
              applications.
            </p>
          </article>
          <article className="about-principle scroll-reveal" data-scroll-reveal>
            <span>03</span>
            <h3>Keep learning by building</h3>
            <p>
              Each project helps me practice, improve, and make my next work
              more useful.
            </p>
          </article>
        </div>
      </section>

      <section
        className="section-block content-section about-life"
        id="about-life"
        data-scroll-reveal
        aria-labelledby="about-life-heading"
      >
        <div className="content-section-heading editorial-heading">
          <p className="section-kicker">02 — OUTSIDE DEVELOPMENT</p>
          <h2 id="about-life-heading">Life beyond the screen.</h2>
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
                <p className="about-detail-highlight">
                  <AboutIcon name="heart" />
                  <span>
                    The little things make me happy—especially when friends or
                    others remember something about me. It makes me feel special
                    and appreciated.
                  </span>
                </p>
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
                  <p>AFGBMTS</p>
                  <ul>
                    <li>Graduated from Senior High School with Honors</li>
                    <li>Received a Conduct Award</li>
                  </ul>
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

export function ProjectsSection() {
  return (
    <section
      className="section-block content-section"
      id="projects"
      data-scroll-reveal
      aria-labelledby="projects-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="section-kicker">SELECTED WORK</p>
        <h1 id="projects-heading">Projects</h1>
        <p>Ideas I&apos;ve explored through building and collaboration.</p>
      </div>
      <div className="work-list project-grid">
        <article className="work-card scroll-reveal" data-scroll-reveal>
          <div className="project-mark" aria-hidden="true">01</div>
          <div className="work-title-row">
            <h3>SIGLA</h3>
            <span className="work-type">MOBILE APP</span>
          </div>
          <p>
            A Filipino Sign Language translator that turns recognized gestures
            into text and voice.
          </p>
          <div className="tag-row">
            <span>Kotlin</span>
            <span>Machine Learning</span>
            <span>FSL</span>
          </div>
        </article>
        <article className="work-card scroll-reveal" data-scroll-reveal>
          <div className="project-mark" aria-hidden="true">02</div>
          <div className="work-title-row">
            <h3>NAZATRACK</h3>
            <span className="work-type">WEB APP</span>
          </div>
          <p>
            An RFID attendance system designed to improve attendance monitoring
            and record management.
          </p>
          <div className="tag-row">
            <span>PHP</span>
            <span>MySQL</span>
            <span>RFID</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section
      className="section-block content-section"
      id="skills"
      data-scroll-reveal
      aria-labelledby="skills-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="section-kicker">WHAT I&apos;M LEARNING</p>
        <h1 id="skills-heading">Skills</h1>
        <p>
          Growing my technical toolkit while staying curious beyond the screen.
        </p>
      </div>
      <div className="skill-rows">
        <article className="skill-row scroll-reveal" data-scroll-reveal>
          <div className="skill-row-heading">
            <span>01</span>
            <div>
              <h3>Development</h3>
              <p>Building a strong foundation in software and application development.</p>
            </div>
          </div>
          <div className="tag-row">
            <span>Web Development</span>
            <span>Mobile Development</span>
            <span>UI/UX Design</span>
            <span>Databases</span>
          </div>
        </article>
        <article className="skill-row scroll-reveal" data-scroll-reveal>
          <div className="skill-row-heading">
            <span>02</span>
            <div>
              <h3>Tools &amp; technologies</h3>
              <p>Technologies I&apos;ve explored through projects and practice.</p>
            </div>
          </div>
          <div className="tag-row">
            <span>Kotlin</span>
            <span>PHP</span>
            <span>MySQL</span>
            <span>Machine Learning</span>
            <span>RFID</span>
          </div>
        </article>
        <article className="skill-row scroll-reveal" data-scroll-reveal>
          <div className="skill-row-heading">
            <span>03</span>
            <div>
              <h3>Outside the code</h3>
              <p>Interests that keep me curious and balanced.</p>
            </div>
          </div>
          <div className="tag-row">
            <span>Mobile Legends</span>
            <span>League of Legends</span>
            <span>CrossFire</span>
            <span>Table Tennis</span>
            <span>Learning Guitar</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section
      className="section-block content-section"
      id="experience"
      data-scroll-reveal
      aria-labelledby="experience-heading"
    >
      <div className="content-section-heading editorial-heading">
        <p className="section-kicker">LEARNING THROUGH WORK</p>
        <h1 id="experience-heading">Experience</h1>
        <p>Work and education milestones from my professional journey.</p>
      </div>
      <div className="experience-education-grid">
        <div className="journey-column">
          <h2 className="journey-column-heading">Experience</h2>
          <article className="journey-entry scroll-reveal" data-scroll-reveal>
            <span className="journey-index">01</span>
            <div>
              <p className="education-level">4 months</p>
              <h4>Lazada</h4>
              <p className="journey-role">Warehouse picker</p>
              <p>
                Found and collected items listed in customer orders and checked
                each item for accuracy before delivery.
              </p>
              <div className="tag-row">
                <span>Order Picking</span>
                <span>Order Accuracy</span>
              </div>
            </div>
          </article>
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
              <p className="journey-role">AFGBMTS · Graduated with Honors · Conduct Award</p>
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
        </div>
      </div>
      <div className="credentials-grid">
        <article className="credential-panel scroll-reveal" id="credentials" data-scroll-reveal>
          <p className="section-kicker">CREDENTIALS</p>
          <h2>Academic recognition</h2>
          <p>
            Graduated with Honors and received a Conduct Award from
            Assemblywoman Felicita&apos;s G. Bernardino Memorial Trade School.
          </p>
        </article>
        <article className="credential-panel scroll-reveal" id="certifications" data-scroll-reveal>
          <p className="section-kicker">CERTIFICATIONS</p>
          <h2>Certifications</h2>
          <p>No certification details have been added yet.</p>
        </article>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      className="section-block content-section contact-section"
      id="contact"
      data-scroll-reveal
      aria-labelledby="contact-heading"
    >
      <p className="section-kicker">LET&apos;S CONNECT</p>
      <h1 id="contact-heading">Contact</h1>
      <p>
        I&apos;m always interested in sharing ideas, collaborating, and taking
        on new challenges.
      </p>
      <a className="intro-link" href="mailto:your-email@example.com">
        Get in touch <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
