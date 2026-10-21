"use client";

import { useMemo, useRef, useState } from "react";
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
          <path d="M18 10h18l12 12v30a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z" strokeWidth="1.8" />
          <path d="M36 10v12h12" strokeWidth="1.8" />
          <path d="M23 28h18m-18 8h18m-18 8h10" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="44" cy="44" r="9" fill="var(--card-surface)" strokeWidth="1.8" />
          <path d="M41 44l2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="emblem-svg" aria-hidden="true">
          <rect x="12" y="12" width="40" height="40" rx="6" strokeWidth="1.8" />
          <path d="M20 12v40m24-40v40M12 24h8m0 16h-8m32-16h8m-8 16h8" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3" />
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

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

  // Reset slide when filter changes
  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    setCurrentSlide(0);
    scrollToSlide(0);
  };

  const handleSortChange = (order: "featured" | "chronological") => {
    setSortOrder(order);
    setCurrentSlide(0);
    scrollToSlide(0);
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const slide = sliderRef.current.children[index] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  const handlePrev = () => {
    const newIdx = currentSlide > 0 ? currentSlide - 1 : filteredProjects.length - 1;
    setCurrentSlide(newIdx);
    scrollToSlide(newIdx);
  };

  const handleNext = () => {
    const newIdx = currentSlide < filteredProjects.length - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(newIdx);
    scrollToSlide(newIdx);
  };

  const currentProject = filteredProjects[currentSlide];

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
                onClick={() => handleCategoryChange(cat.label)}
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
            onClick={() => handleSortChange("featured")}
            aria-pressed={sortOrder === "featured"}
          >
            Featured / Capstone First
          </button>
          <button
            type="button"
            className={`sort-pill ${sortOrder === "chronological" ? "active" : ""}`}
            onClick={() => handleSortChange("chronological")}
            aria-pressed={sortOrder === "chronological"}
          >
            Timeline Journey
          </button>
        </div>
      </div>

      {/* Showing count + slider nav */}
      <div className="projects-meta-bar">
        <p className="projects-showing-text">
          Displaying <strong>{filteredProjects.length}</strong> of {projectsData.length} projects
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* ─── PROJECT SLIDER ─── */}
      {filteredProjects.length > 0 && currentProject && (
        <div className="project-slider-wrapper" data-scroll-reveal>
          {/* Project Info Column */}
          <div className="project-slider-info">
            <div className="smart-kicker-meta">
              <span className="smart-kicker-number">
                {String(currentSlide + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>
              <span className="smart-kicker-sep">&bull;</span>
              <span className="smart-kicker-cat">{currentProject.category.toUpperCase()}</span>
            </div>

            <h2 className="smart-info-title">{currentProject.title}</h2>
            <p className="smart-info-subtitle">{currentProject.type}</p>

            <div className="smart-info-desc-box">
              <p className="smart-info-overview">{currentProject.paragraphs[0]}</p>
            </div>

            <div className="smart-spec-row">
              <div className="smart-spec-cell">
                <span className="smart-spec-name">MY ROLE</span>
                <strong className="smart-spec-val">{currentProject.role}</strong>
              </div>
              {currentProject.period && (
                <div className="smart-spec-cell">
                  <span className="smart-spec-name">CONTEXT</span>
                  <strong className="smart-spec-val">{currentProject.period}</strong>
                </div>
              )}
            </div>

            {currentProject.highlights && currentProject.highlights[0] && (
              <div className="smart-highlight-banner">
                <span className="smart-highlight-dot">&bull;</span>
                <div>
                  <strong>{currentProject.highlights[0].label}: </strong>
                  <span>{currentProject.highlights[0].value}</span>
                </div>
              </div>
            )}

            <div className="smart-tech-section">
              <span className="smart-tech-heading">BUILT WITH</span>
              <div className="smart-tech-tags" aria-label={`Technologies used in ${currentProject.title}`}>
                {currentProject.tags.map((tag) => (
                  <span key={tag} className="tech-tag-pill">
                    <TechIcon name={tag} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video / Emblem Display */}
          <div className="project-slider-media">
            <div className="project-slider-viewport">
              {currentProject.video ? (
                <div className="project-slider-video-wrap">
                  <video
                    key={currentProject.video}
                    src={currentProject.video}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="project-slider-video"
                    title={currentProject.title + " video demo"}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-live-badge">
                    <span className="live-dot" />
                    <span>LOOPING DEMO</span>
                  </div>
                </div>
              ) : (
                <div className="project-slider-emblem-fallback">
                  <div className="card-emblem-stage">
                    <div className="emblem-halo">
                      <ProjectEmblem id={currentProject.id} />
                    </div>
                    <h3 className="card-emblem-title">{currentProject.title}</h3>
                    <p className="card-emblem-subtitle">{currentProject.type}</p>
                    <p className="card-emblem-no-demo">No video demo available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slider Arrow Controls */}
          <div className="project-slider-controls">
            <button
              type="button"
              className="project-slider-arrow prev"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="project-slider-dots">
              {filteredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  className={`project-slider-dot${idx === currentSlide ? " active" : ""}`}
                  onClick={() => {
                    setCurrentSlide(idx);
                    scrollToSlide(idx);
                  }}
                  aria-label={`Go to project ${idx + 1}: ${p.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="project-slider-arrow next"
              onClick={handleNext}
              aria-label="Next project"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
