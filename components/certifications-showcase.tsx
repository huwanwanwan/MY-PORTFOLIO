"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  certificationsData,
  type CertificationItem,
} from "../data/certifications-data";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}

function getThemeSnapshot() {
  return window.localStorage.getItem("portfolio-theme") === "dark";
}

export default function CertificationsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxCert, setLightboxCert] = useState<CertificationItem | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", "Certifications", "Seminars", "Competitions"] as const;

  const filtered =
    activeCategory === "All"
      ? certificationsData
      : certificationsData.filter((c) => c.category === activeCategory);

  function scrollCertificates(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;
    const track = scrollContainerRef.current;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardWidth = (firstCard ? firstCard.getBoundingClientRect().width : 380) + gap;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  const handleCloseLightbox = useCallback(() => {
    setLightboxCert(null);
  }, []);

  const handleNextLightbox = useCallback(() => {
    if (!lightboxCert) return;
    const currentIndex = filtered.findIndex((c) => c.id === lightboxCert.id);
    const nextIndex = (currentIndex + 1) % filtered.length;
    setLightboxCert(filtered[nextIndex]);
  }, [lightboxCert, filtered]);

  const handlePrevLightbox = useCallback(() => {
    if (!lightboxCert) return;
    const currentIndex = filtered.findIndex((c) => c.id === lightboxCert.id);
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setLightboxCert(filtered[prevIndex]);
  }, [lightboxCert, filtered]);

  useEffect(() => {
    if (lightboxCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxCert]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!lightboxCert) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxCert, handleCloseLightbox, handleNextLightbox, handlePrevLightbox]);

  return (
    <section className="cert-gallery-section" id="certifications" data-scroll-reveal>
      {/* ── Top Header Row with Arrows ── */}
      <div className="cert-gallery-header" data-scroll-reveal>
        <div className="cert-gallery-intro">
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            VERIFIED CREDENTIALS &amp; SEMINARS
          </p>
          <h2 className="editorial-title">
            Certificates &amp; recognitions,
            <br />
            <span className="text-muted">earned through learning and competing.</span>
          </h2>
          <p className="cert-gallery-subtitle">
            Browse official certificates, technical seminars, and verified academic competition entries.
          </p>
        </div>

        <div className="cert-gallery-actions">
          {/* Category Filter Tabs */}
          <div className="cert-filter-pills" role="tablist" aria-label="Certification categories">
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
          <div className="cert-carousel-nav" aria-label="Certificate carousel navigation">
            <button
              type="button"
              className="cert-nav-arrow"
              onClick={() => scrollCertificates("left")}
              aria-label="Previous certificate"
            >
              ←
            </button>
            <button
              type="button"
              className="cert-nav-arrow"
              onClick={() => scrollCertificates("right")}
              aria-label="Next certificate"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ── Sliding Carousel Wrapper with Floating Arrows ── */}
      <div className="cert-carousel-wrapper" data-scroll-reveal>
        <button
          type="button"
          className="cert-side-arrow cert-side-arrow-left"
          onClick={() => scrollCertificates("left")}
          aria-label="Previous certificate"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className="cert-carousel-scroll"
          tabIndex={0}
          aria-label="Certificates sliding gallery"
        >
          {filtered.map((cert, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <article
                key={cert.id}
                className="cert-slide-card scroll-reveal"
                data-scroll-reveal
                data-reveal-delay={(index % 4) * 80}
              >
                {/* Header: Category Badge + Index Number */}
                <div className="cert-card-topbar">
                  <span className={`cert-card-badge cert-badge-${cert.category.toLowerCase()}`}>
                    {cert.category}
                  </span>
                  <span className="cert-card-index">{indexStr}</span>
                </div>

                {/* Landscape Certificate Picture: Fitted to Card */}
                <div
                  className="cert-card-image-box"
                  onClick={() => setLightboxCert(cert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxCert(cert);
                    }
                  }}
                  aria-label={`View full certificate: ${cert.title}`}
                >
                  <Image
                    src={cert.image}
                    alt={cert.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, 90vw"
                    className="cert-card-img"
                    unoptimized
                  />
                  <div className="cert-card-overlay">
                    <span className="cert-zoom-tag">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cert-zoom-svg"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Expand</span>
                    </span>
                  </div>
                </div>

                {/* Card Title & Issuer */}
                <h3 className="cert-slide-title">{cert.title}</h3>
                <p className="cert-slide-issuer">
                  {cert.issuer} · <time>{cert.date}</time>
                </p>

                {/* Description */}
                <p className="cert-slide-desc">{cert.description}</p>

                {/* Tag Pills */}
                <div className="cert-slide-tags">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="cert-tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Link to View Full */}
                <div className="cert-card-footer">
                  <button
                    type="button"
                    className="cert-card-link-btn"
                    onClick={() => setLightboxCert(cert)}
                  >
                    <span>View full certificate</span>
                    <span aria-hidden="true" className="cert-link-arrow">→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="cert-side-arrow cert-side-arrow-right"
          onClick={() => scrollCertificates("right")}
          aria-label="Next certificate"
        >
          ›
        </button>
      </div>

      {/* ── High-Resolution Lightbox Modal rendered via Portal directly to body ── */}
      {lightboxCert && mounted && typeof document !== "undefined" && createPortal(
        <div
          className={`cert-lightbox-backdrop${isDarkMode ? " dark" : ""}`}
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxCert.title}
        >
          <div
            className="cert-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={handleCloseLightbox}
              aria-label="Close preview"
            >
              ✕
            </button>

            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  className="cert-lightbox-arrow prev"
                  onClick={handlePrevLightbox}
                  aria-label="Previous certificate"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="cert-lightbox-arrow next"
                  onClick={handleNextLightbox}
                  aria-label="Next certificate"
                >
                  ›
                </button>
              </>
            )}

            <div className="cert-lightbox-media-wrapper">
              <Image
                src={lightboxCert.image}
                alt={lightboxCert.alt}
                width={1400}
                height={950}
                className="cert-lightbox-image"
                unoptimized
                priority
              />
            </div>

            <div className="cert-lightbox-caption">
              <div className="cert-lightbox-header">
                <span className={`cert-card-badge cert-badge-${lightboxCert.category.toLowerCase()}`}>
                  {lightboxCert.category}
                </span>
                <span className="cert-date">{lightboxCert.date}</span>
              </div>
              <h3 className="cert-lightbox-title">{lightboxCert.title}</h3>
              <p className="cert-lightbox-issuer">
                Issued by <strong>{lightboxCert.issuer}</strong> · Recipient: {lightboxCert.recipient}
              </p>
              <p className="cert-lightbox-desc">{lightboxCert.description}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
