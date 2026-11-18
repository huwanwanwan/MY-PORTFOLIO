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

type CertificationsShowcaseProps = {
  variant?: "carousel" | "scrollable";
};

type GalleryCategory = "Certifications" | "Seminars" | "Competitions";
const galleryCategories: GalleryCategory[] = ["Certifications", "Seminars", "Competitions"];
const categoryIntroductions: Record<GalleryCategory, { eyebrow: string; lead: string; detail: string; description: string }> = {
  Certifications: {
    eyebrow: "COURSE COMPLETION & TECHNICAL LEARNING",
    lead: "Certifications,",
    detail: "building knowledge through continued learning.",
    description: "Explore completed courses and certificates in programming, cloud computing, data analytics, and academic learning events.",
  },
  Seminars: {
    eyebrow: "TECHNICAL EVENTS & SHARED KNOWLEDGE",
    lead: "Seminars,",
    detail: "exploring ideas and learning from others.",
    description: "Browse seminar and webinar events covering developer tools, artificial intelligence, and cybersecurity.",
  },
  Competitions: {
    eyebrow: "PRACTICAL PROJECTS & ACADEMIC PARTICIPATION",
    lead: "Competitions,",
    detail: "putting ideas into practice.",
    description: "Discover academic competition participation and hands-on projects that bring technical learning into the real world.",
  },
};

export default function CertificationsShowcase({ variant = "carousel" }: CertificationsShowcaseProps) {
  return (
    <section className="cert-gallery-section" id="certifications" data-scroll-reveal>
      <div className={`cert-category-groups${variant === "carousel" ? " cert-summary" : ""}`}>
        {variant === "carousel" ? (
          <>
            <CertificationCategoryGallery category="All" variant={variant} />
            <a className="cert-summary-more" href="/experience#certifications">View all certifications, seminars, and competitions <span aria-hidden="true">→</span></a>
          </>
        ) : galleryCategories.map(category => (
          <CertificationCategoryGallery key={category} category={category} variant={variant} />
        ))}
      </div>
    </section>
  );
}

function CertificationCategoryGallery({
  variant = "carousel",
  category,
}: CertificationsShowcaseProps & { category: GalleryCategory | "All" }) {
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

  // Use the primary category so combined labels do not duplicate entries.
  const filtered = category === "All"
    ? galleryCategories.flatMap(group => {
        const highlight = certificationsData.find(item => item.category.split("/")[0] === group);
        return highlight ? [highlight] : [];
      })
    : certificationsData.filter(item => item.category.split("/")[0] === category);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 60);
    return () => clearTimeout(timer);
  }, [category]);

  function scrollCertificates(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;
    const track = scrollContainerRef.current;
    const cards = Array.from(track.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el.matches(".cert-slide-card"));
    if (cards.length === 0) return;

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let activeIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = i;
      }
    }

    const targetIndex = direction === "left"
      ? Math.max(0, activeIndex - 1)
      : Math.min(cards.length - 1, activeIndex + 1);

    if (targetIndex === activeIndex) return;

    const targetCard = cards[targetIndex];
    if (!targetCard) return;

    const targetLeft = targetCard.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
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
    <section className="cert-category-group" aria-labelledby={`cert-category-${category.toLowerCase()}`}>
      <div className="cert-gallery-header cert-category-header" data-scroll-reveal>
        <div className="cert-category-intro">
          {category === "All" ? (
            <h3 className="cert-category-title" id="cert-category-all">Selected highlights <span className="cert-category-count">{filtered.length}</span></h3>
          ) : (
            <>
              <p className="editorial-eyebrow"><span className="editorial-eyebrow-dot" aria-hidden="true" />{categoryIntroductions[category].eyebrow}</p>
              <h3 className="editorial-title cert-category-editorial-title" id={`cert-category-${category.toLowerCase()}`}>
                {categoryIntroductions[category].lead}<br />
                <span className="text-muted">{categoryIntroductions[category].detail}</span>
              </h3>
              <p className="cert-gallery-subtitle">{categoryIntroductions[category].description}</p>
              <p className="cert-category-total">{filtered.length} {category.toLowerCase()} {filtered.length === 1 ? "entry" : "entries"}</p>
            </>
          )}
        </div>
        <div className="cert-gallery-actions">
          {/* Top-Right Arrow Buttons (Home Page Carousel Only) */}
          {variant === "carousel" && (
            <div className="cert-carousel-nav" aria-label="Certificate carousel navigation">
              <button
                type="button"
                className="cert-nav-arrow"
                onClick={(e) => { e.currentTarget.blur(); scrollCertificates("left"); }}
                aria-label="Previous certificate"
              >
                ←
              </button>
              <button
                type="button"
                className="cert-nav-arrow"
                onClick={(e) => { e.currentTarget.blur(); scrollCertificates("right"); }}
                aria-label="Next certificate"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Content View: Arrow-type Carousel for Home, Scrollable Animated Grid for Experience Page ── */}
      {variant === "carousel" ? (
        <div className="cert-carousel-wrapper" data-scroll-reveal>
          <button
            type="button"
            className="cert-side-arrow cert-side-arrow-left"
            onClick={(e) => { e.currentTarget.blur(); scrollCertificates("left"); }}
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
                  <div className="cert-card-topbar">
                    <span className={`cert-card-badge cert-badge-${cert.category.split("/")[0].toLowerCase()}`}>
                      {cert.category}
                    </span>
                    <span className="cert-card-index">{indexStr}</span>
                  </div>

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

                  <h3 className="cert-slide-title">{cert.title}</h3>
                  <p className="cert-slide-issuer">
                    {cert.issuer} · <time>{cert.date}</time>
                  </p>

                  <p className="cert-slide-desc">{cert.description}</p>

                  <div className="cert-slide-tags">
                    {cert.tags.map((tag) => (
                      <span key={tag} className="cert-tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

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
            onClick={(e) => { e.currentTarget.blur(); scrollCertificates("right"); }}
            aria-label="Next certificate"
          >
            ›
          </button>
        </div>
      ) : (
        /* Scrollable Grid Mode: No arrows, cards revealed with animation as user scrolls down */
        <div className="cert-scrollable-grid-wrapper" data-scroll-reveal>
          <div key={category} className="cert-scrollable-grid" role="region" aria-label="Certificates directory">
            {filtered.map((cert, index) => {
              const indexStr = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={cert.id}
                  className="cert-slide-card cert-grid-card scroll-reveal"
                  data-scroll-reveal
                  data-reveal-delay={(index % 3) * 90}
                >
                  <div className="cert-card-topbar">
                    <span className={`cert-card-badge cert-badge-${cert.category.split("/")[0].toLowerCase()}`}>
                      {cert.category}
                    </span>
                    <span className="cert-card-index">{indexStr}</span>
                  </div>

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
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 90vw"
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

                  <h3 className="cert-slide-title">{cert.title}</h3>
                  <p className="cert-slide-issuer">
                    {cert.issuer} · <time>{cert.date}</time>
                  </p>

                  <p className="cert-slide-desc">{cert.description}</p>

                  <div className="cert-slide-tags">
                    {cert.tags.map((tag) => (
                      <span key={tag} className="cert-tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

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
        </div>
      )}

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
                fill
                sizes="(max-width: 640px) 100vw, 900px"
                className="cert-lightbox-image"
                unoptimized
                priority
              />
            </div>

            <div className="cert-lightbox-caption">
              <div className="cert-lightbox-header">
                <span className={`cert-card-badge cert-badge-${lightboxCert.category.split("/")[0].toLowerCase()}`}>
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
