import Image from "next/image";
import Link from "next/link";

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

export function AboutSection() {
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
            <div className="about-identity-row">
              <span className="about-monogram">
                <Image
                  src="/professional_profile_cutout.png"
                  alt="Portrait of Juan Domanico Militante"
                  width={96}
                  height={96}
                  className="about-profile-photo"
                  unoptimized
                />
              </span>
              <div className="about-identity-name">
                <strong>Juan Domanico Militante</strong>
                <span>Web &amp; mobile developer</span>
              </div>
              <div className="about-location">
                <span>BASED IN</span>
                <strong>Bulacan, Philippines</strong>
              </div>
            </div>
          </div>
          <aside className="about-focus-card" aria-label="Current project focus">
            <span className="about-focus-number">01</span>
            <p className="section-kicker">THESIS / CAPSTONE</p>
            <h2>SIGLA</h2>
            <p>
              A mobile sign language translator designed for people with
              speech and/or hearing disabilities.
            </p>
            <div className="tag-row">
              <span>Mobile app</span>
              <span>Front-end</span>
              <span>Accessibility</span>
            </div>
            <Link className="about-text-link" href="/projects">
              Explore my projects <span aria-hidden="true">↗</span>
            </Link>
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
            The interests, music, stories, and food that make a day feel like
            mine.
          </p>
        </div>
        <div className="about-life-grid">
          <div className="about-copy">
            <p>
              I&apos;m an ambivert: sometimes talkative and playful, sometimes
              quiet, depending on the people and the mood. I enjoy Mobile
              Legends, League of Legends, CrossFire, and table tennis.
            </p>
            <p>
              I listen to Maroon 5, enjoy the film <em>More Than Blue</em>, and
              never say no to palabok. I&apos;d also like to learn guitar as I
              keep growing as a developer.
            </p>
          </div>
          <div className="about-motto">
            <span className="section-kicker">A MOTTO I LIVE BY</span>
            <blockquote>
              &ldquo;No one can do it for you, so take responsibility and do it
              yourself.&rdquo;
            </blockquote>
          </div>
        </div>
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
