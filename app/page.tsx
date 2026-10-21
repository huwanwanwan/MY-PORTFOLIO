import Image from "next/image";
import Link from "next/link";
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
            Skilled in React.js, Kotlin, JavaScript, PHP, HTML, CSS, Unity, and
            Arduino. I build web applications, mobile apps, games, and IoT
            systems—turning ideas into useful, easy-to-use digital experiences.
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
        <figure className="home-portrait-frame">
          <Image
            src="/professional_profile_cutout.png"
            alt="Portrait of Juan Domanico Militante"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="home-portrait-image"
            unoptimized
          />
        </figure>
      </section>
      {/* Compact Summary Cards — each links to its full page */}
      <section className="home-summary-grid" data-scroll-reveal>
        <Link href="/about" className="home-summary-card">
          <span className="home-summary-kicker">ABOUT ME</span>
          <h2>Curious by nature. Building with purpose.</h2>
          <p>
            I&apos;m Juan Domanico Militante, an IT student from Bulacan, Philippines.
            I enjoy creating websites and mobile apps that make ideas useful and easy to experience.
          </p>
          <span className="home-summary-arrow">Learn more →</span>
        </Link>

        <Link href="/projects" className="home-summary-card">
          <span className="home-summary-kicker">PROJECTS</span>
          <h2>14 projects across web, mobile, games &amp; IoT.</h2>
          <p>
            From SigLa (sign language translator) to RecogniZarenus (facial recognition),
            InventoPOS, DocuLink, and Unity games — systems I&apos;ve built through college.
          </p>
          <span className="home-summary-arrow">View projects →</span>
        </Link>

        <Link href="/skills" className="home-summary-card">
          <span className="home-summary-kicker">SKILLS &amp; TECH</span>
          <h2>Languages, frameworks &amp; tools I work with.</h2>
          <p>
            React.js, Kotlin, JavaScript, PHP, Python, Unity, C#, Arduino IDE,
            HTML, CSS, Tailwind, Node.js, MySQL, and more.
          </p>
          <span className="home-summary-arrow">See all skills →</span>
        </Link>

        <Link href="/experience" className="home-summary-card">
          <span className="home-summary-kicker">EXPERIENCE</span>
          <h2>Learning through building &amp; real-world work.</h2>
          <p>
            Education at Pambayang Dalubhasaan ng Marilao (PDM), work experience at Lazada,
            academic honors, and professional certifications.
          </p>
          <span className="home-summary-arrow">View experience →</span>
        </Link>

        <Link href="/contact" className="home-summary-card">
          <span className="home-summary-kicker">CONTACT</span>
          <h2>Let&apos;s connect and work together.</h2>
          <p>
            Have an idea or want to collaborate? Reach out via email, LinkedIn, GitHub, or Facebook.
          </p>
          <span className="home-summary-arrow">Get in touch →</span>
        </Link>
      </section>
    </SiteShell>
  );
}
