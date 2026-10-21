"use client";

import React, { useState, useEffect } from "react";
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
  const [selectedModalMedia, setSelectedModalMedia] = useState<{
    type: "video" | "image";
    src: string;
    label: string;
  } | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedModalMedia(null);
    };
    if (selectedModalMedia) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedModalMedia]);

  // If no media at all, render fallback emblem
  if (!video && (!images || images.length === 0)) {
    return <div className="card-emblem-stage">{fallbackEmblem}</div>;
  }

  // Exactly check if this project has portrait screenshots (SigLa mobile translator)
  const isPortraitProject =
    title.toLowerCase().includes("sigla") ||
    images.some((img) => img.includes("SIGLA"));

  const isUnityOrGame =
    category === "Games & Animation" ||
    title.toLowerCase().includes("arena") ||
    title.toLowerCase().includes("force") ||
    title.toLowerCase().includes("jungle") ||
    title.toLowerCase().includes("game");

  const hasVideo = Boolean(video);

  return (
    <div className="project-media-stage-wrapper">
      {/* 
        MEDIA VIEWPORT:
        - Full-width hero media (video or lead screenshot) with NO awkward black bars.
        - For 16:9 video / landscape games: object-fit cover / fit.
        - For screenshots: natural clean aspect ratio.
      */}
      <div className="project-primary-hero-container">
        {hasVideo ? (
          <div
            className={
              "media-card-viewport video-hero-viewport" +
              (isUnityOrGame ? " unity-landscape-viewport" : "")
            }
          >
            <video
              src={video}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="media-video-element"
              title={title + " interactive demo preview"}
            >
              Your browser does not support the video tag.
            </video>
            <div className="video-live-badge">
              <span className="live-dot" />
              <span>LOOPING DEMO</span>
            </div>
          </div>
        ) : (
          images[0] && (
            <div
              className="media-card-viewport hero-image-viewport"
              onClick={() =>
                setSelectedModalMedia({
                  type: "image",
                  src: images[0],
                  label: title + " - Overview Preview",
                })
              }
            >
              <Image
                src={images[0]}
                alt={title + " main preview"}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="media-img-element cover-fit"
              />
              <span className="preview-zoom-hint">Click to enlarge</span>
            </div>
          )
        )}
      </div>

      {/* 
        SCREENSHOTS GRID:
        - Positioned cleanly with full responsive flexibility.
        - If Portrait (SigLa): 6 portrait mobile phone cards in a neat responsive grid.
        - If Landscape:
          * If 2 screenshots: 2 side-by-side equal cards (50% / 50%)
          * If 3 screenshots: Top 1 full-width, Bottom 2 twin side-by-side (50% / 50%)
      */}
      {images.length > 0 && (
        <div className="project-screenshots-gallery">
          <div className="gallery-header-row">
            <span className="gallery-lead-label">PROJECT SCREENSHOTS & UI</span>
            <span className="gallery-count-pill">{images.length} PREVIEWS</span>
          </div>

          {isPortraitProject ? (
            /* PORTRAIT MOBILE SCREENS */
            <div className="portrait-mobile-grid">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() =>
                    setSelectedModalMedia({
                      type: "image",
                      src: img,
                      label: title + " Mobile Screen " + String(idx + 1).padStart(2, "0"),
                    })
                  }
                  className="portrait-mobile-card"
                  aria-label={"View screenshot " + (idx + 1)}
                >
                  <div className="portrait-mobile-box">
                    <Image
                      src={img}
                      alt={title + " mobile screen " + (idx + 1)}
                      fill
                      sizes="180px"
                      className="portrait-mobile-img"
                    />
                  </div>
                  <span className="portrait-card-label">Screen {idx + 1}</span>
                </button>
              ))}
            </div>
          ) : (
            /* LANDSCAPE SCREENS:
               - If 2 screenshots: 2 equal cards side-by-side
               - If 3 screenshots: Top 1 full-width, bottom 2 equal twin cards
            */
            <div className="landscape-screens-mosaic">
              {images.length === 2 ? (
                <div className="landscape-twin-row">
                  <div
                    className="landscape-screen-card"
                    onClick={() =>
                      setSelectedModalMedia({
                        type: "image",
                        src: images[0],
                        label: title + " Screen 01",
                      })
                    }
                  >
                    <Image
                      src={images[0]}
                      alt={title + " Screen 01"}
                      fill
                      sizes="(max-width: 900px) 50vw, 450px"
                      className="media-img-element cover-fit"
                    />
                    <span className="screen-card-label">Screen 01</span>
                  </div>
                  <div
                    className="landscape-screen-card"
                    onClick={() =>
                      setSelectedModalMedia({
                        type: "image",
                        src: images[1],
                        label: title + " Screen 02",
                      })
                    }
                  >
                    <Image
                      src={images[1]}
                      alt={title + " Screen 02"}
                      fill
                      sizes="(max-width: 900px) 50vw, 450px"
                      className="media-img-element cover-fit"
                    />
                    <span className="screen-card-label">Screen 02</span>
                  </div>
                </div>
              ) : (
                <div className="landscape-three-stack">
                  <div
                    className="landscape-screen-card top-span-card"
                    onClick={() =>
                      setSelectedModalMedia({
                        type: "image",
                        src: images[0],
                        label: title + " Screen 01",
                      })
                    }
                  >
                    <Image
                      src={images[0]}
                      alt={title + " Screen 01"}
                      fill
                      sizes="(max-width: 900px) 100vw, 900px"
                      className="media-img-element cover-fit"
                    />
                    <span className="screen-card-label">Screen 01</span>
                  </div>
                  <div className="landscape-twin-row">
                    <div
                      className="landscape-screen-card"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[1],
                          label: title + " Screen 02",
                        })
                      }
                    >
                      <Image
                        src={images[1]}
                        alt={title + " Screen 02"}
                        fill
                        sizes="(max-width: 900px) 50vw, 450px"
                        className="media-img-element cover-fit"
                      />
                      <span className="screen-card-label">Screen 02</span>
                    </div>
                    <div
                      className="landscape-screen-card"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[2] || images[0],
                          label: title + " Screen 03",
                        })
                      }
                    >
                      <Image
                        src={images[2] || images[0]}
                        alt={title + " Screen 03"}
                        fill
                        sizes="(max-width: 900px) 50vw, 450px"
                        className="media-img-element cover-fit"
                      />
                      <span className="screen-card-label">Screen 03</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 
        MODAL LIGHTBOX:
        Clean, centered, responsive modal (matching the certifications & experience lightbox).
        Never overflows, maintains true resolution without black letterbox cutoffs.
      */}
      {selectedModalMedia && (
        <div
          className="cert-lightbox-backdrop"
          onClick={() => setSelectedModalMedia(null)}
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
              onClick={() => setSelectedModalMedia(null)}
              aria-label="Close preview"
            >
              ?
            </button>

            <div className="project-lightbox-media-wrapper">
              <Image
                src={selectedModalMedia.src}
                alt={selectedModalMedia.label}
                width={1600}
                height={1000}
                className="project-lightbox-image"
                unoptimized
                priority
              />
            </div>

            <div className="cert-lightbox-caption">
              <h3 className="cert-lightbox-title">{selectedModalMedia.label}</h3>
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
