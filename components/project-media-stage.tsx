"use client";

import { useState } from "react";
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
  // Video goes on top / first slot if present, followed by all screenshot images
  const mediaItems: Array<{ type: "video" | "image"; src: string; label: string }> = [];

  if (video) {
    mediaItems.push({
      type: "video",
      src: video,
      label: "Project Demo Video",
    });
  }

  images.forEach((img, idx) => {
    mediaItems.push({
      type: "image",
      src: img,
      label: `Screenshot ${String(idx + 1).padStart(2, "0")}`,
    });
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // If no media files at all, fallback gracefully to the SVG emblem stage
  if (mediaItems.length === 0) {
    return <div className="card-emblem-stage">{fallbackEmblem}</div>;
  }

  const currentMedia = mediaItems[activeIndex] || mediaItems[0];
  const isUnityOrGame =
    category === "Games & Animation" ||
    title.toLowerCase().includes("arena") ||
    title.toLowerCase().includes("force") ||
    title.toLowerCase().includes("jungle") ||
    title.toLowerCase().includes("game");

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="project-media-stage">
      {/* Top Main Showcase Display: Video or Selected Screenshot (Landscape Fit/Crop) */}
      <div
        className={`project-media-viewport ${
          isUnityOrGame ? "unity-landscape-viewport" : ""
        }`}
      >
        {currentMedia.type === "video" ? (
          <div className="video-player-container">
            <video
              src={currentMedia.src}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="landscape-media-video"
              title={`${title} demo video preview`}
            >
              Your browser does not support the video tag.
            </video>
            <div className="video-live-badge">
              <span className="live-dot" />
              <span>LOOPING DEMO</span>
            </div>
          </div>
        ) : (
          <div className="image-viewport-container">
            <Image
              src={currentMedia.src}
              alt={`${title} - ${currentMedia.label}`}
              fill
              sizes="(max-width: 900px) 100vw, 550px"
              className={`landscape-media-image ${
                isUnityOrGame ? "unity-crop-landscape" : "contain-landscape"
              }`}
              priority={false}
            />
          </div>
        )}

        {/* Caption / Label at the bottom of the viewport */}
        <div className="viewport-caption-bar">
          <span className="caption-text">{currentMedia.label}</span>
          <span className="caption-counter">
            {activeIndex + 1} / {mediaItems.length}
          </span>
        </div>
      </div>

      {/* Bottom Thumbnail Strip + Controls (Matching the Thrifly mockup) */}
      {mediaItems.length > 1 && (
        <div className="media-thumbnail-section">
          <div className="thumbnail-header-row">
            <span className="thumbnail-lead-title">
              {currentMedia.type === "video"
                ? "MEDIA DEMO 01 / " + String(mediaItems.length).padStart(2, "0")
                : `SCREENSHOT ${String(
                    currentMedia.type === "video" ? activeIndex : activeIndex + (video ? 0 : 1)
                  ).padStart(2, "0")} / ${String(
                    video ? mediaItems.length - 1 : mediaItems.length
                  ).padStart(2, "0")}`}
            </span>
            <div className="thumbnail-nav-arrows">
              <button
                type="button"
                onClick={handlePrev}
                className="thumb-nav-btn"
                aria-label="Previous preview"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="thumb-nav-btn"
                aria-label="Next preview"
              >
                ›
              </button>
            </div>
          </div>

          <div className="media-thumbnails-strip">
            {mediaItems.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.src + idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`media-thumb-item ${isSelected ? "selected" : ""}`}
                  aria-label={`Select ${item.label}`}
                >
                  <div className="thumb-preview-box">
                    {item.type === "video" ? (
                      <div className="thumb-video-icon-box">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="thumb-play-icon"
                          aria-hidden="true"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="thumb-video-tag">VIDEO</span>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={`Thumbnail preview ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="thumb-img"
                      />
                    )}
                  </div>
                  <span className="thumb-item-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

