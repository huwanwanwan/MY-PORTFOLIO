"use client";

import { useState, useRef, useMemo, useEffect } from "react";
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

function ProjectSlideMedia({
  project,
  firstImage,
}: {
  project: ProjectItem;
  firstImage: string | null;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!project.video || videoFailed) return;
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project.video, videoFailed]);

  if (project.video && !videoFailed) {
    const encodedVideoSrc = encodeURI(project.video);
    const encodedPoster = firstImage ? encodeURI(firstImage) : undefined;

    return (
      <div
        ref={wrapRef}
        className="project-slide-video-wrap"
        onMouseEnter={() => {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onMouseLeave={() => {
          // Keep playing if still on screen
        }}
      >
        <video
          ref={videoRef}
          src={encodedVideoSrc}
          poster={encodedPoster}
          controls
          muted
          loop
          playsInline
          preload="none"
          onError={() => setVideoFailed(true)}
          className="project-slide-video"
          title={`${project.title} video demo`}
        >
          Your browser does not support the video tag.
        </video>
        <div className="video-live-badge" style={{ pointerEvents: "none" }}>
          <span className="live-dot" />
          <span>DEMO VIDEO</span>
        </div>
      </div>
    );
  }

  if (firstImage) {
    return (
      <Link
        href={`/projects#project-${project.id}`}
        className="project-slide-img-wrap"
        style={{ display: "block" }}
        title={`View ${project.title} details`}
      >
        <Image
          src={encodeURI(firstImage)}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="project-slide-img"
          unoptimized
        />
        <div className="video-live-badge project-preview-badge" style={{ pointerEvents: "none" }}>
          <span>PROJECT PREVIEW</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects#project-${project.id}`}
      className="project-slide-fallback"
      style={{ textDecoration: "none", color: "inherit" }}
      title={`View ${project.title} details`}
    >
      <div className="fallback-emblem-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="36" height="36">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>
      <span className="fallback-project-title">{project.title}</span>
      <span className="fallback-notice">Desktop / Web System</span>
    </Link>
  );
}

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
    const track = scrollContainerRef.current;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardWidth = (firstCard ? firstCard.getBoundingClientRect().width : 520) + gap;
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
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            INTERACTIVE PROJECT CAROUSEL
          </p>
          <h2 className="editorial-title">
            Work that ships,
            <br />
            <span className="text-muted">and works.</span>
          </h2>
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

                {/* Media Showcase: Video Demo (with poster & fallback) or First Project Picture Preview */}
                <div className="project-slide-media-box">
                  <ProjectSlideMedia project={project} firstImage={firstImage} />
                </div>

                {/* Card Title & Type */}
                <div className="project-slide-info">
                  <h3 className="project-slide-title">
                    <Link
                      href={`/projects#project-${project.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {project.title}
                    </Link>
                  </h3>
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
                      <Link
                        key={tag}
                        href={`/skills?skill=${encodeURIComponent(tag === "React.js" ? "React" : tag)}#skills`}
                        className="tech-tag-pill"
                        style={{ textDecoration: "none", color: "inherit" }}
                        title={`See all projects using ${tag}`}
                      >
                        <TechIcon name={tag} />
                        <span>{tag}</span>
                      </Link>
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
