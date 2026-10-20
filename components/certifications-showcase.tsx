"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  certificationsData,
  type CertificationItem,
} from "../data/certifications-data";

export default function CertificationsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxCert, setLightboxCert] = useState<CertificationItem | null>(null);

  const categories = ["All", "Certifications", "Seminars", "Competitions"] as const;

  const filtered =
    activeCategory === "All"
      ? certificationsData
      : certificationsData.filter((c) => c.category === activeCategory);

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
    <div className="certifications-showcase" id="certifications" data-scroll-reveal>
      {/* ── Section Title & Filter Tabs ── */}
      <div className="certifications-header-row">
        <div>
          <p className="section-kicker">VERIFIED CREDENTIALS &amp; PARTICIPATION</p>
          <h2 className="certifications-title">Certifications &amp; Achievements</h2>
          <p className="certifications-subtitle">
            Official training certificates, technical seminars, and competition entries. Sized in landscape layout for full legibility.
          </p>
        </div>

        <div className="cert-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cert-filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Landscape Cards Grid ── */}
      <div className="cert-landscape-grid">
        {filtered.map((cert, idx) => (
          <article
            key={cert.id}
            className="cert-landscape-card scroll-reveal"
            data-scroll-reveal
            data-reveal-delay={(idx % 4) * 80}
          >
            {/* Landscape Picture Frame */}
            <div
              className="cert-image-frame"
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
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                className="cert-picture"
                unoptimized
              />
              <div className="cert-image-overlay">
                <span className="cert-zoom-pill">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cert-zoom-icon"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>Click to Expand</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="cert-card-body">
              <div className="cert-meta-row">
                <span className={`cert-badge cert-badge-${cert.category.toLowerCase()}`}>
                  {cert.category}
                </span>
                <time className="cert-date">{cert.date}</time>
              </div>

              <h3 className="cert-card-title">{cert.title}</h3>
              <p className="cert-card-issuer">Issued by <strong>{cert.issuer}</strong></p>
              <p className="cert-card-desc">{cert.description}</p>

              <div className="cert-tags-row">
                {cert.tags.map((tag) => (
                  <span key={tag} className="cert-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="cert-action-row">
                <button
                  type="button"
                  className="cert-preview-btn"
                  onClick={() => setLightboxCert(cert)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cert-btn-icon"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Preview Full Certificate</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      {lightboxCert && (
        <div
          className="cert-lightbox-backdrop"
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
                width={1200}
                height={800}
                className="cert-lightbox-image"
                unoptimized
                priority
              />
            </div>

            <div className="cert-lightbox-caption">
              <div className="cert-lightbox-header">
                <span className={`cert-badge cert-badge-${lightboxCert.category.toLowerCase()}`}>
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
        </div>
      )}
    </div>
  );
}

