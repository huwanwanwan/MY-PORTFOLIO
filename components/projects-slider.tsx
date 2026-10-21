"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { projectsData, type ProjectItem } from "../data/projects-data";
import { TechIcon } from "./tech-icon";

type CategoryFilter =
  | "All"
  | "Mobile & AR"
  | "Web & Systems"
  | "Games & Animation"
  | "IoT & Hardware";

export default function ProjectsSlider() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const categories: CategoryFilter[] = [
    "All",
    "Mobile & AR",
    "Web & Systems",
    "Games & Animation",
    "IoT & Hardware",
  ];

  const filtered = useMemo(() => {
    let list = [...projectsData];
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    list.sort((a, b) => a.featuredIndex - b.featuredIndex);
    return list;
  }, [activeCategory]);

  function scroll(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;
    const cardWidth = 520;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className="projects-slider-section">
      {/* ── Top Header Controls with Category Pills & Arrows (identical pattern to Certifications) ── */}
      <div className="cert-gallery-header projects-slider-header" data-scroll-reveal>
        <div className="cert-gallery-intro">
          <p className="section-kicker">INTERACTIVE PROJECT CAROUSEL</p>
          <h2 className="cert-gallery-title">Slide through all 14 projects</h2>
          <p className="cert-gallery-subtitle">
            Browse video demos, stack, and roles across every college project. Use the arrows to explore.
          </p>
        </div>

        <div className="cert-gallery-actions">
          {/* Category Filter Tabs */}
          <div className="cert-filter-pills" role="tablist" aria-label="Project categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cert-pill-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Top-Right Arrow Buttons */}
          <div className="cert-carousel-nav" aria-label="Projects carousel navigation">
            <button
              type="button"
              className="cert-nav-arrow"
              onClick={() => scroll("left")}
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              type="button"
              className="cert-nav-arrow"
              onClick={() => scroll("right")}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ── Sliding Track with Floating Side Arrows ── */}
      <div className="cert-carousel-wrapper" data-scroll-reveal>
        <button
          type="button"
          className="cert-side-arrow cert-side-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Previous project"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className="cert-carousel-scroll projects-slider-scroll"
          tabIndex={0}
          aria-label="Projects sliding track"
        >
          {filtered.map((project: ProjectItem, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            const firstImage = project.images && project.images.length > 0 ? project.images[0] : null;

            return (
              <article
                key={project.id}
                className="project-slide-card scroll-reveal"
                data-scroll-reveal
                data-reveal-delay={(index % 4) * 80}
              >
                {/* Header: Category Badge + Index Number */}
                <div className="cert-card-topbar">
                  <span className="cert-card-badge">
                    {project.category}
                  </span>
                  <span className="cert-card-index">{indexStr} / {String(filtered.length).padStart(2, "0")}</span>
                </div>

                {/* Media Showcase: Video Demo, or First Project Picture Preview */}
                <div className="project-slide-media-box">
                  {project.video ? (
                    <div className="project-slide-video-wrap">
                      <video
                        src={project.video}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="project-slide-video"
                        title={`${project.title} video demo`}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <div className="video-live-badge">
                        <span className="live-dot" />
                        <span>DEMO VIDEO</span>
                      </div>
                    </div>
                  ) : firstImage ? (
                    <div className="project-slide-img-wrap">
                      <Image
                        src={firstImage}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 560px"
                        className="project-slide-img"
                        unoptimized
                      />
                      <div className="video-live-badge project-preview-badge">
                        <span>PROJECT PREVIEW</span>
                      </div>
                    </div>
                  ) : (
                    <div className="project-slide-fallback">
                      <div className="fallback-emblem-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="36" height="36">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                      <span className="fallback-project-title">{project.title}</span>
                      <span className="fallback-notice">Desktop / Web System</span>
                    </div>
                  )}
                </div>

                {/* Card Title & Type */}
                <div className="project-slide-info">
                  <h3 className="project-slide-title">{project.title}</h3>
                  <p className="project-slide-type">{project.type}</p>

                  {/* Short Description */}
                  <p className="project-slide-desc">{project.paragraphs[0]}</p>

                  {/* Role & Context Row */}
                  <div className="project-slide-meta-row">
                    <span className="meta-tag"><strong>Role:</strong> {project.role}</span>
                    {project.period && <span className="meta-tag"><strong>Context:</strong> {project.period}</span>}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="project-slide-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag-pill">
                        <TechIcon name={tag} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link to Full Directory */}
                <div className="cert-card-footer">
                  <Link
                    href={`/projects#project-${project.id}`}
                    className="cert-card-link-btn"
                  >
                    <span>View in projects directory</span>
                    <span aria-hidden="true" className="cert-link-arrow">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="cert-side-arrow cert-side-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Next project"
        >
          ›
        </button>
      </div>
    </div>
  );
}
