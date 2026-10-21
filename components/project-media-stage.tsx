"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ProjectMediaStageProps {
  title: string;
  category: string;
  video?: string;
  images?: string[];
  fallbackEmblem: React.ReactNode;
}

export default function ProjectMediaStage({
  title,
  category,
  video,
  images = [],
  fallbackEmblem,
}: ProjectMediaStageProps) {
  // Collect all media items:
  // If video exists, it's item 0 ("Interactive Demo" or "Video Project").
  // Followed by all screenshots.
  const mediaList: Array<{ type: "video" | "image"; src: string; caption: string }> = [];

  if (video) {
    mediaList.push({
      type: "video",
      src: video,
      caption: title + " Demo Video",
    });
  }

  images.forEach((img, idx) => {
    // Generate clean friendly label
    let caption = "Screenshot " + String(idx + 1).padStart(2, "0");
    if (img.toLowerCase().includes("home")) caption = "Home Interface";
    else if (img.toLowerCase().includes("login")) caption = "Login Screen";
    else if (img.toLowerCase().includes("dashboard")) caption = "Dashboard View";
    else if (img.toLowerCase().includes("admin")) caption = "Admin Workspace";
    else if (img.toLowerCase().includes("partylist")) caption = "Partylist & Candidates";
    else if (img.toLowerCase().includes("settings")) caption = "System Settings";

    mediaList.push({
      type: "image",
      src: img,
      caption,
    });
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedLightbox, setSelectedLightbox] = useState<{
    type: "video" | "image";
    src: string;
    caption: string;
  } | null>(null);

  const thumbStripRef = useRef<HTMLDivElement | null>(null);

  if (mediaList.length === 0) {
    return <div className="card-emblem-stage">{fallbackEmblem}</div>;
  }

  const currentMedia = mediaList[activeIndex] || mediaList[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1));
    scrollThumbTo(activeIndex > 0 ? activeIndex - 1 : mediaList.length - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0));
    scrollThumbTo(activeIndex < mediaList.length - 1 ? activeIndex + 1 : 0);
  };

  const scrollThumbTo = (idx: number) => {
    if (!thumbStripRef.current) return;
    const itemWidth = 140;
    thumbStripRef.current.scrollTo({
      left: idx * itemWidth - 20,
      behavior: "smooth",
    });
  };

  return (
    <div className="smart-pdm-media-column">
      {/* 1. TOP MAIN SHOWCASE CARD (Hero with Caption Footer and Enlarge Button) */}
      <div className="smart-hero-card">
        <div className="smart-hero-viewport">
          {currentMedia.type === "video" ? (
            <div className="smart-video-wrapper">
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="smart-main-video"
                title={title + " video preview"}
              >
                Your browser does not support the video tag.
              </video>
              <div className="video-live-badge">
                <span className="live-dot" />
                <span>LOOPING DEMO</span>
              </div>
            </div>
          ) : (
            <div
              className="smart-image-wrapper"
              onClick={() => setSelectedLightbox(currentMedia)}
            >
              <Image
                src={currentMedia.src}
                alt={currentMedia.caption}
                fill
                sizes="(max-width: 900px) 100vw, 650px"
                className="smart-main-img"
              />
            </div>
          )}

          {/* Enlarge / Zoom button top-right (like in reference pic) */}
          <button
            type="button"
            className="smart-enlarge-btn"
            onClick={() => setSelectedLightbox(currentMedia)}
            aria-label="Enlarge view"
            title="Enlarge preview"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>

        {/* Caption Bar below the main screen (matching "Scholarship Homepage" in image) */}
        <div className="smart-hero-caption-bar">
          <span className="smart-hero-caption-title">{currentMedia.caption}</span>
        </div>
      </div>

      {/* 2. BOTTOM THUMBNAILS CAROUSEL (matching SCREENSHOT 01 / 09 with < > arrows in image) */}
      {mediaList.length > 1 && (
        <div className="smart-thumbnails-container">
          <div className="smart-thumbnails-nav-row">
            <span className="smart-counter-label">
              {currentMedia.type === "video"
                ? "MEDIA DEMO 01 / " + String(mediaList.length).padStart(2, "0")
                : "SCREENSHOT " +
                  String(activeIndex + 1).padStart(2, "0") +
                  " / " +
                  String(mediaList.length).padStart(2, "0")}
            </span>
            <div className="smart-nav-arrows">
              <button
                type="button"
                onClick={handlePrev}
                className="smart-arrow-btn"
                aria-label="Previous screenshot"
              >
                �
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="smart-arrow-btn"
                aria-label="Next screenshot"
              >
                �
              </button>
            </div>
          </div>

          <div className="smart-thumbs-scroll-strip" ref={thumbStripRef}>
            {mediaList.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.src + idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={"smart-thumb-card" + (isSelected ? " active-thumb" : "")}
                  aria-label={"Select " + item.caption}
                >
                  <div className="smart-thumb-preview-box">
                    {item.type === "video" ? (
                      <div className="smart-thumb-video-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="smart-thumb-video-text">VIDEO</span>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="160px"
                        className="smart-thumb-img"
                      />
                    )}
                  </div>
                  <span className="smart-thumb-caption-text">
                    {item.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. LIGHTBOX MODAL (Full Responsive Zoom on Click) */}
      {selectedLightbox && (
        <div
          className="cert-lightbox-backdrop"
          onClick={() => setSelectedLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cert-lightbox-container project-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={() => setSelectedLightbox(null)}
              aria-label="Close preview"
            >
              ?
            </button>

            <div className="project-lightbox-media-wrapper">
              {selectedLightbox.type === "video" ? (
                <video
                  src={selectedLightbox.src}
                  controls
                  autoPlay
                  className="smart-lightbox-video"
                />
              ) : (
                <Image
                  src={selectedLightbox.src}
                  alt={selectedLightbox.caption}
                  width={1400}
                  height={900}
                  className="project-lightbox-image"
                  unoptimized
                  priority
                />
              )}
            </div>

            <div className="cert-lightbox-caption">
              <h3 className="cert-lightbox-title">{selectedLightbox.caption}</h3>
              <p className="cert-lightbox-issuer">
                High-Resolution Preview � Click outside or press <strong>Esc</strong> to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
