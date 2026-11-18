"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { skills, type Skill } from "../data/skills-data";
import { projectsData, type ProjectItem } from "../data/projects-data";
import { TechIcon } from "./tech-icon";

/* ─── Individual Skill Icon (brand-colored SVG logos) ─── */
function SkillIcon({ name }: { name: string }) {
  return <span className="skill-card-icon"><TechIcon name={name} /></span>;
}

const categories = ["All", "Frontend", "Backend", "Game Dev", "Database", "IoT", "AI", "Tools"] as const;

function getProjectsUsingSkill(skillName: string): ProjectItem[] {
  const normSkill = skillName.toLowerCase().trim();
  return projectsData.filter((project) =>
    project.tags.some((tag) => {
      const t = tag.toLowerCase().trim();
      if (t === normSkill) return true;
      if (normSkill === "react" && t.includes("react")) return true;
      if (normSkill === "javascript" && (t.includes("javascript") || t === "js")) return true;
      if (normSkill === "node.js" && t.includes("node")) return true;
      if (normSkill === "unity" && t.includes("unity")) return true;
      if (normSkill === "arduino" && t.includes("arduino")) return true;
      if (normSkill === "java" && t.includes("java") && !t.includes("script")) return true;
      if (normSkill === "php" && t.includes("php")) return true;
      if (normSkill === "mysql" && t.includes("mysql")) return true;
      if (normSkill === "css" && t.includes("css")) return true;
      if (normSkill === "html" && t.includes("html")) return true;
      if (normSkill === "python" && t.includes("python")) return true;
      if (normSkill === "kotlin" && t.includes("kotlin")) return true;
      if (normSkill === "tailwind css" && t.includes("tailwind")) return true;
      if (normSkill === "postgresql" && (t.includes("pgsql") || t.includes("postgres"))) return true;
      if (normSkill === "figma" && (t.includes("figma") || project.id === "inventopos" || project.id === "sigla")) return true;
      if (normSkill === "c language" && (t.includes(" c") || t === "c")) return true;
      return false;
    })
  );
}

export default function SkillsShowcase({ projectLimit }: { projectLimit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skillParam = params.get("skill");
    if (!skillParam) return;
    const normalized = skillParam.toLowerCase().trim();
    const matched = skills.find(
      (s) =>
        s.name.toLowerCase() === normalized ||
        (normalized === "react.js" && s.name === "React") ||
        (normalized === "tailwind" && s.name === "Tailwind CSS") ||
        (normalized === "c" && s.name === "C Language"),
    );
    if (matched) {
      setSelectedSkill(matched.name);
    }
  }, []);

  const filtered = (
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory)
  ).slice().sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  const matchingProjects = selectedSkill ? getProjectsUsingSkill(selectedSkill) : [];


  return (
    <div className="skills-showcase">
      {/* ── Top Overview Banner ── */}
      <div className="skills-overview-banner" data-scroll-reveal>
        <div className="skills-stat-card scroll-reveal" data-scroll-reveal data-reveal-delay="0">
          <span className="skills-stat-num">{skills.length}</span>
          <span className="skills-stat-label">Technologies &amp; Tools</span>
        </div>
        <div className="skills-stat-card scroll-reveal" data-scroll-reveal data-reveal-delay="100">
          <span className="skills-stat-num">{projectsData.length}</span>
          <span className="skills-stat-label">Real Projects Built</span>
        </div>
        <div className="skills-stat-card scroll-reveal" data-scroll-reveal data-reveal-delay="200">
          <span className="skills-stat-num">7</span>
          <span className="skills-stat-label">Core Domains</span>
        </div>
      </div>

      {/* ── Category Filter Tabs ── */}
      <div className="skills-filter-bar" data-scroll-reveal>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="skills-click-tip" data-scroll-reveal>
        💡 <em>Click any skill below to reveal which projects use it:</em>
      </p>

      {/* ── Skills Grid ── */}
      <div className="skills-icon-grid" data-scroll-reveal>
        {filtered.map((skill, index) => {
          const isSelected = selectedSkill === skill.name;
          const count = getProjectsUsingSkill(skill.name).length;
          return (
            <button
              key={skill.name}
              type="button"
              className={`skill-icon-card scroll-reveal${isSelected ? " skill-card-selected" : ""}`}
              onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
              aria-pressed={isSelected}
              data-scroll-reveal
              style={{ transitionDelay: `${(index % 7) * 55}ms` }}
            >
              <div className="skill-icon-wrapper">
                <SkillIcon name={skill.name} />
              </div>
              <span className="skill-icon-name">{skill.name}</span>
              <span
                className="skill-icon-category"
              >
                {skill.category}
              </span>
              {count > 0 && (
                <span className="skill-project-badge" title={`${count} project(s) use this`}>
                  {count} proj
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Interactive Skill Project Connections Result ── */}
      {selectedSkill && (
        <aside className="skill-project-inspector" aria-live="polite" data-scroll-reveal>
          <div className="skill-inspector-header">
            <div className="skill-inspector-badge">
              <SkillIcon name={selectedSkill} />
              <div>
                <span className="skill-inspector-sub">SELECTED TECHNOLOGY</span>
                <h3 className="skill-inspector-title">{selectedSkill}</h3>
              </div>
            </div>
            <button
              type="button"
              className="skill-inspector-close"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close project preview"
            >
              ✕ Close
            </button>
          </div>

          <div className="skill-inspector-body">
            {matchingProjects.length > 0 ? (
              <>
                <p className="skill-inspector-lead">
                  Featured in <strong>{matchingProjects.length}</strong> project{matchingProjects.length > 1 ? "s" : ""}:
                </p>
                <div className="skill-project-cards-row">
                  {matchingProjects.map((p, idx) => (
                    <article
                      key={p.id}
                      className="skill-project-mini-card"
                      data-scroll-reveal
                      style={{ animationDelay: `${idx * 70}ms` }}
                    >
                      <div className="skill-project-mini-top">
                        <span className="skill-project-mini-cat">{p.category}</span>
                        <span className="skill-project-mini-role">{p.role}</span>
                      </div>
                      <h4 className="skill-project-mini-title">{p.title}</h4>
                      <p className="skill-project-mini-desc">
                        {p.paragraphs[0]?.slice(0, 140)}...
                      </p>
                      <div className="skill-project-mini-tags">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="skill-mini-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link href={`/projects#project-${p.id}`} className="skill-project-mini-link">
                        View in Projects <span>→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <p className="skill-inspector-empty">
                No major listed project stack for <strong>{selectedSkill}</strong> yet, but explored in labs, coursework, and personal experiments.
              </p>
            )}
          </div>
        </aside>
      )}

      {/* ── Capabilities Section with Cards & Explanations ── */}
      <section className="skills-capabilities-section" aria-labelledby="capabilities-heading" data-scroll-reveal>
        <div className="editorial-heading" data-scroll-reveal>
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            02 — CORE TECHNICAL STRENGTHS
          </p>
          <h2 id="capabilities-heading" className="editorial-title">
            <span className="heading-highlight">Key areas of focus,</span>
            <br />
            <span className="text-muted">from interface design to backend logic.</span>
          </h2>
          <p>
            Disciplines developed through <strong className="editorial-highlight">offline-first mobile architecture</strong>, full-stack web platforms, and interactive engineering.
          </p>
        </div>

        <div className="capabilities-cards-grid">
          {/* Card 01: Web & System Development */}
          <article className="capability-card capability-card-colonized scroll-reveal" data-scroll-reveal data-reveal-side="left">
            <div className="capability-card-bg" aria-hidden="true">
              <Image
                src="/v1.jpg"
                alt="Web & System Development Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="capability-bg-img"
              />
              <div className="capability-bg-overlay" />
            </div>
            <div className="capability-content-layer">
              <span className="capability-num">01</span>
              <h3>Web &amp; System Development</h3>
              <p>
                Designing and building responsive web applications, document management platforms (DocuLink), and inventory POS systems (InventoPOS) using React, JavaScript, PHP, HTML/CSS, and relational database systems.
              </p>
            </div>
          </article>

          {/* Card 02: Mobile & Accessibility Solutions */}
          <article className="capability-card capability-card-colonized scroll-reveal" data-scroll-reveal data-reveal-side="right">
            <div className="capability-card-bg" aria-hidden="true">
              <Image
                src="/v2.jpg"
                alt="Mobile & Accessibility Solutions Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="capability-bg-img"
              />
              <div className="capability-bg-overlay" />
            </div>
            <div className="capability-content-layer">
              <span className="capability-num">02</span>
              <h3>Mobile &amp; Accessibility Solutions</h3>
              <p>
                Crafting mobile applications like <strong>SigLa</strong> (Sign Language Translator for hearing and speech-impaired communities) using Kotlin and mobile front-end frameworks, with offline translation and intuitive touch interactions.
              </p>
            </div>
          </article>

          {/* Card 03: Game Development & AR */}
          <article className="capability-card capability-card-colonized scroll-reveal" data-scroll-reveal data-reveal-side="left">
            <div className="capability-card-bg" aria-hidden="true">
              <Image
                src="/v3.jpg"
                alt="Game Development & AR Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="capability-bg-img"
              />
              <div className="capability-bg-overlay" />
            </div>
            <div className="capability-content-layer">
              <span className="capability-num">03</span>
              <h3>Game Development &amp; AR</h3>
              <p>
                Developing augmented-reality mobile games (Attack on PDM) and interactive combat action games (Force X, Almighty Jungle) with Unity, C#, 2D animation (Marilao Fantasy), and character AI behaviors.
              </p>
            </div>
          </article>

          {/* Card 04: Hardware, IoT & Sensors */}
          <article className="capability-card capability-card-colonized scroll-reveal" data-scroll-reveal data-reveal-side="right">
            <div className="capability-card-bg" aria-hidden="true">
              <Image
                src="/LA NINA DETECTOR/1.png"
                alt="Hardware, IoT & Sensors Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="capability-bg-img"
              />
              <div className="capability-bg-overlay" />
            </div>
            <div className="capability-content-layer">
              <span className="capability-num">04</span>
              <h3>Hardware, IoT &amp; Sensors</h3>
              <p>
                Integrating physical microcontrollers with software workflows: automated attendance gates with RFID readers and camera face recognition (RecogniZarenus), and acoustic rainfall alert triggers (La Niña Detector) with Arduino.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="skills-project-timeline-section" aria-labelledby="projects-strip-heading" data-scroll-reveal>
        <div className="skills-project-timeline-heading" data-scroll-reveal>
          <p className="editorial-eyebrow"><span className="editorial-eyebrow-dot" aria-hidden="true" />03 &mdash; EXPLORE BY TECHNOLOGY</p>
          <h2 id="projects-strip-heading" className="editorial-title">
            <span className="heading-highlight">Projects built with these tools,</span><br />
            <span className="text-muted">across four years of IT study.</span>
          </h2>
          <p>Browse individual project summaries, roles, and technical stacks developed at Pambayang Dalubhasaan ng Marilao.</p>
        </div>
        <ol className="skills-project-timeline" aria-label="Project development timeline">
          {projectsData.slice(0, projectLimit).map(project => {
            const thumbnail = project.images?.[0];
            return (
              <li className="skills-project-timeline-entry" key={project.id} data-project-category={project.category}>
                <span className="skills-project-timeline-marker" aria-hidden="true" />
                <article className="skills-project-timeline-card scroll-reveal" data-scroll-reveal>
                  <div className="skills-project-timeline-card-heading">
                    <div className="skills-project-timeline-thumbnail">
                      {thumbnail ? <Image src={thumbnail} alt={`${project.title} preview`} fill sizes="60px" unoptimized /> : <span aria-hidden="true">&lt;/&gt;</span>}
                    </div>
                    <div className="skills-project-timeline-identity">
                      <span className="skills-project-timeline-category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.role}</p>
                    </div>
                  </div>
                  <p className="skills-project-timeline-description">{project.paragraphs[0]}</p>
                  <Link className="skills-project-timeline-link" href={`/projects#project-${project.id}`}>View project details <span aria-hidden="true">&#8599;</span></Link>
                </article>
              </li>
            );
          })}
        </ol>
        <Link href="/projects" className="skills-all-projects-btn skills-project-timeline-more">View All {projectsData.length} Projects <span aria-hidden="true">&#8594;</span></Link>
      </section>
    </div>
  );
}
