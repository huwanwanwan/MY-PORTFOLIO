"use client";

import { useMemo, useState } from "react";
import { ProjectItem, projectsData } from "../data/projects-data";
import { TechIcon } from "./tech-icon";

type CategoryFilter =
  | "All"
  | "Mobile & AR"
  | "Web & Systems"
  | "Games & Animation"
  | "IoT & Hardware";

interface ProjectsShowcaseProps {
  initialFilter?: CategoryFilter;
  featuredOnly?: boolean;
}

function ProjectEmblem({ id }: { id: string }) {
  switch (id) {
    case "sigla":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Hands signing & communication wave */}
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <path d="M22 38c-2-4-2-9 1-13 2.5-3.3 6.5-4 10-2" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 38c2-4 2-9-1-13-2.5-3.3-6.5-4-10-2" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 46c3.5 2 10.5 2 14 0" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 28a18 18 0 0 1 32 0" strokeWidth="1.7" strokeLinecap="round" opacity="0.7" />
          <path d="M11 24a24 24 0 0 1 42 0" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <circle cx="32" cy="30" r="3.5" fill="currentColor" />
        </svg>
      );
    case "recognizarenus":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Biometric Face + Turnstile Gate */}
          <rect x="14" y="10" width="36" height="44" rx="8" strokeWidth="1.8" />
          <path d="M22 17h-2a2 2 0 0 0-2 2v2m28-4h2a2 2 0 0 1 2 2v2m-32 20v2a2 2 0 0 0 2 2h2m28-4v2a2 2 0 0 1-2 2h-2" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="27" r="7" strokeWidth="1.8" />
          <path d="M24 43c1.5-4.5 4.5-6 8-6s6.5 1.5 8 6" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="32" cy="27" r="2" fill="currentColor" />
          <path d="M20 54l12-3 12 3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "inventopos":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* POS Terminal & Inventory Grid */}
          <rect x="12" y="12" width="40" height="26" rx="4" strokeWidth="1.8" />
          <path d="M18 20h28m-28 6h16m-16 6h8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M26 38v8h12v-8m-18 8h24a2 2 0 0 1 2 2v2H18v-2a2 2 0 0 1 2-2z" strokeWidth="1.8" />
          <circle cx="43" cy="29" r="3" strokeWidth="1.5" />
          <path d="M43 27v4m-2-2h4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "doculink":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Document & Tracking Pipeline */}
          <path d="M18 10h18l12 12v30a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z" strokeWidth="1.8" />
          <path d="M36 10v12h12" strokeWidth="1.8" />
          <path d="M23 28h18m-18 8h18m-18 8h10" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="44" cy="44" r="9" fill="var(--card-surface)" strokeWidth="1.8" />
          <path d="M41 44l2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "attack-on-pdm":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* AR Target Reticle + Mythical Sun */}
          <circle cx="32" cy="32" r="22" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
          <circle cx="32" cy="32" r="10" strokeWidth="1.8" />
          <circle cx="32" cy="32" r="3.5" fill="currentColor" />
          <path d="M32 6v6m0 40v6M6 32h6m40 0h6" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 19l4 4m18 18l4 4m0-26l-4 4m-18 18l-4 4" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "force-x":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Ranger X Solid Crystal Powers */}
          <path d="M32 6L48 22L32 58L16 22L32 6Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M16 22h32M32 6v52" strokeWidth="1.5" />
          <path d="M24 22l8 18 8-18" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="32" cy="22" r="2.5" fill="currentColor" />
        </svg>
      );
    case "almighty-jungle":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Jungle Amazon Foliage & Quest Compass */}
          <circle cx="32" cy="32" r="24" strokeWidth="1.8" />
          <path d="M32 14l5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13z" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
          <path d="M18 46c6-4 10-10 10-14" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "la-nina-detector":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Rain Cloud & Alarm Sound Waves */}
          <path d="M42 28a10 10 0 0 0-19-4 8 8 0 0 0-7 8 8 8 0 0 0 8 8h18a7 7 0 0 0 0-14z" strokeWidth="1.8" />
          <path d="M22 45l-3 7m8-7l-3 7m8-7l-3 7m8-7l-3 7" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 16a6 6 0 0 1 6 6m2-9a10 10 0 0 1 10 10" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    case "fitness-management-system":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Fitness Health Pulse & Database */}
          <rect x="12" y="14" width="40" height="36" rx="6" strokeWidth="1.8" />
          <path d="M12 24h40" strokeWidth="1.5" />
          <path d="M18 36h6l3-6 5 12 4-8 3 2h7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="19" r="1.5" fill="currentColor" />
          <circle cx="24" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );
    case "marilao-fantasy":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Animation Film Frames & Thunder Wave */}
          <rect x="12" y="12" width="40" height="40" rx="6" strokeWidth="1.8" />
          <path d="M20 12v40m24-40v40M12 24h8m0 16h-8m32-16h8m-8 16h8" strokeWidth="1.5" />
          <path d="M34 22l-6 11h6l-4 11 10-13h-6l4-9z" fill="currentColor" strokeWidth="1" />
        </svg>
      );
    case "halal-2025":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Ballot Box & Electronic Voting */}
          <rect x="12" y="24" width="40" height="30" rx="4" strokeWidth="1.8" />
          <path d="M8 24h48v6H8z" strokeWidth="1.8" />
          <path d="M25 24h14" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M22 8h20v16H22z" strokeWidth="1.8" fill="var(--card-surface)" />
          <path d="M27 15l3 3 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="40" r="4" strokeWidth="1.6" />
          <path d="M32 36v8M28 40h8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "class-project-game":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Game Controller & Collaborative Team Community Nodes */}
          <rect x="10" y="20" width="44" height="28" rx="14" strokeWidth="1.8" />
          {/* D-pad */}
          <path d="M22 28v12M16 34h12" strokeWidth="2.2" strokeLinecap="round" />
          {/* Action buttons */}
          <circle cx="42" cy="30" r="2.2" fill="currentColor" />
          <circle cx="48" cy="36" r="2.2" fill="currentColor" />
          <circle cx="36" cy="36" r="2.2" fill="currentColor" />
          <circle cx="42" cy="42" r="2.2" fill="currentColor" />
          {/* Team spark overhead */}
          <path d="M28 12l4-4 4 4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="14" r="2" fill="currentColor" />
          <path d="M22 14c2-4 6-6 10-6s8 2 10 6" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
        </svg>
      );
    case "isla-arena":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Tropical Island Battle Arena */}
          <ellipse cx="32" cy="48" rx="26" ry="6" strokeWidth="1.5" opacity="0.4" />
          <path d="M18 48c0-6 4-16 14-16s14 10 14 16" strokeWidth="1.8" />
          <path d="M30 32V14" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 14c4 2 12 6 14 10" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M30 18c3 1.5 9 5 11 8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M30 22c2 1.5 6 4 8 6" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="46" cy="16" r="6" strokeWidth="1.5" opacity="0.5" />
          <path d="M22 42l4-5 3 3 4-6 5 4 4-3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 38l2 2m34-2l-2 2" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "milktaste":
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          {/* Coffee Cup / Java Terminal */}
          <path d="M16 24h26v18a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8V24z" strokeWidth="1.8" />
          <path d="M42 28h5a4 4 0 0 1 0 8h-5" strokeWidth="1.8" />
          <path d="M12 54h36" strokeWidth="2" strokeLinecap="round" />
          <path d="M23 12c0 3-2 4-2 7m8-7c0 3-2 4-2 7m8-7c0 3-2 4-2 7" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
  }
}

export default function ProjectsShowcase({
  initialFilter = "All",
  featuredOnly = false,
}: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialFilter);
  const [sortOrder, setSortOrder] = useState<"featured" | "chronological">("featured");

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: "All", count: projectsData.length },
    {
      label: "Mobile & AR",
      count: projectsData.filter((p) => p.category === "Mobile & AR").length,
    },
    {
      label: "Web & Systems",
      count: projectsData.filter((p) => p.category === "Web & Systems").length,
    },
    {
      label: "Games & Animation",
      count: projectsData.filter((p) => p.category === "Games & Animation").length,
    },
    {
      label: "IoT & Hardware",
      count: projectsData.filter((p) => p.category === "IoT & Hardware").length,
    },
  ];

  const filteredProjects = useMemo(() => {
    let list = featuredOnly ? projectsData.filter((p) => p.isFeatured) : [...projectsData];

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === "featured") {
      list.sort((a, b) => a.featuredIndex - b.featuredIndex);
    } else {
      list.sort((a, b) => a.chronologicalIndex - b.chronologicalIndex);
    }

    return list;
  }, [selectedCategory, sortOrder, featuredOnly]);

  return (
    <div className="projects-showcase-container">
      {/* Category Filter & Sort Bar */}
      <div className="projects-controls-bar">
        <div className="projects-category-tabs" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`project-filter-pill ${isActive ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.label)}
              >
                <span>{cat.label}</span>
                <span className="filter-count" aria-label={`${cat.count} projects`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="projects-sort-switch">
          <span className="sort-label">Order:</span>
          <button
            type="button"
            className={`sort-pill ${sortOrder === "featured" ? "active" : ""}`}
            onClick={() => setSortOrder("featured")}
            aria-pressed={sortOrder === "featured"}
          >
            Featured / Capstone First
          </button>
          <button
            type="button"
            className={`sort-pill ${sortOrder === "chronological" ? "active" : ""}`}
            onClick={() => setSortOrder("chronological")}
            aria-pressed={sortOrder === "chronological"}
          >
            Timeline Journey
          </button>
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="projects-meta-bar">
        <p className="projects-showing-text">
          Displaying <strong>{filteredProjects.length}</strong> of {projectsData.length} projects
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Side-by-Side Project Rows (Card Container on one side, Description Beside It) */}
      <div className="project-detail-rows">
        {filteredProjects.map((project: ProjectItem, index) => {
          const displayNumber = String(
            sortOrder === "featured" ? project.featuredIndex : project.chronologicalIndex
          ).padStart(2, "0");

          const isReversed = index % 2 === 1;

          return (
            <article
              key={project.id}
              className={`project-feature-row scroll-reveal ${isReversed ? "row-reversed" : ""}`}
              data-scroll-reveal
              id={`project-${project.id}`}
            >
              {/* Column 1: The Project Card Container */}
              <div className="project-card-container">
                <div className="project-card-glass">
                  <div className="card-top-header">
                    <span className="card-index-pill">
                      {displayNumber} / {String(projectsData.length).padStart(2, "0")}
                    </span>
                    <span className="card-category-badge">{project.category}</span>
                  </div>

                  <div className="card-emblem-stage">
                    <div className="emblem-halo">
                      <ProjectEmblem id={project.id} />
                    </div>
                    <h3 className="card-emblem-title">{project.title}</h3>
                    <p className="card-emblem-subtitle">{project.type}</p>
                  </div>

                  {/* Quick Facts Grid */}
                  <div className="card-spec-grid">
                    <div className="card-spec-item">
                      <span className="spec-label">MY ROLE</span>
                      <strong className="spec-value">{project.role}</strong>
                    </div>
                    <div className="card-spec-item">
                      <span className="spec-label">CONTEXT</span>
                      <strong className="spec-value">{project.period}</strong>
                    </div>
                    {project.highlights && project.highlights[0] && (
                      <div className="card-spec-item full-width-spec">
                        <span className="spec-label">{project.highlights[0].label.toUpperCase()}</span>
                        <strong className="spec-value highlight-accent">{project.highlights[0].value}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2: The Description Beside the Project */}
              <div className="project-description-container">
                <div className="description-header">
                  <div className="desc-meta-lead">
                    <span className="desc-index-mark">PROJECT {displayNumber}</span>
                    <span className="desc-divider">·</span>
                    <span className="desc-role-kicker">{project.role}</span>
                  </div>
                  <h2 className="desc-project-title">{project.title}</h2>
                  <p className="desc-project-type">{project.type}</p>
                </div>

                {/* Full story paragraphs */}
                <div className="description-narrative">
                  {project.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="desc-paragraph">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Additional Highlights Box */}
                {project.highlights && project.highlights.length > 1 && (
                  <div className="description-highlights-callout">
                    <p className="callout-heading">Project Highlights &amp; Features</p>
                    <ul className="callout-list">
                      {project.highlights.slice(1).map((h, hIdx) => (
                        <li key={hIdx}>
                          <span className="callout-bullet">◆</span>
                          <div>
                            <strong>{h.label}: </strong>
                            <span>{h.value}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack beside description */}
                <div className="description-stack-section">
                  <p className="stack-heading">Technologies &amp; Tools</p>
                  <div className="tag-row" aria-label={`Technologies used in ${project.title}`}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag-pill">
                        <TechIcon name={tag} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
