"use client";

import React, { useState } from "react";
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
    <div
      className={`project-media-showcase-mosaic ${
        isPortraitProject ? "portrait-mode" : "landscape-mode"
      } ${hasVideo ? "has-video" : "no-video"}`}
    >
      {/* 
        LAYOUT ARCHITECTURE:
        DEMO | PICTURES  (Side by Side horizontally inside the project card)
      */}
      {isPortraitProject ? (
        /* PORTRAIT MODE (e.g. SigLa Mobile):
           Clean side-by-side: Video Demo on left, Portrait Screenshots beside on right with crisp contained ratio */
        <div className="portrait-beside-container">
          {hasVideo && (
            <div className="portrait-primary-video-col">
              <div className="media-card-viewport video-hero-viewport">
                <video
                  src={video}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="media-video-element"
                  title={`${title} demo video`}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="video-live-badge">
                  <span className="live-dot" />
                  <span>LOOPING DEMO</span>
                </div>
              </div>
            </div>
          )}

          {images.length > 0 && (
            <div className="portrait-side-screens-col">
              <div className="portrait-screens-scroll-grid">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() =>
                      setSelectedModalMedia({
                        type: "image",
                        src: img,
                        label: `${title} Screen ${String(idx + 1).padStart(2, "0")}`,
                      })
                    }
                    className="portrait-screen-thumb-card"
                    aria-label={`View screenshot ${idx + 1}`}
                  >
                    <div className="portrait-thumb-box">
                      <Image
                        src={img}
                        alt={`${title} screen ${idx + 1}`}
                        fill
                        sizes="160px"
                        className="portrait-thumb-img"
                      />
                    </div>
                    <span className="portrait-thumb-tag">Screen {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* LANDSCAPE MODE (Games, Web, Systems, IoT):
           DEMO | PICTURES side-by-side
           - Video demo (or main screen) on the Left
           - 2 or 3 screenshots on the Right:
             * If 2 screenshots: Stacked Top & Bottom
             * If 3 screenshots: Top 1 full-width, Bottom 2 side-by-side with same combined width
        */
        <div className="landscape-mosaic-row">
          {/* LEFT: Video Hero or Lead Screen */}
          <div className="landscape-lead-col">
            {hasVideo ? (
              <div
                className={`media-card-viewport video-hero-viewport ${
                  isUnityOrGame ? "unity-landscape-viewport" : ""
                }`}
              >
                <video
                  src={video}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="media-video-element"
                  title={`${title} interactive demo preview`}
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
                      label: `${title} - Overview Preview`,
                    })
                  }
                >
                  <Image
                    src={images[0]}
                    alt={`${title} main preview`}
                    fill
                    sizes="(max-width: 900px) 100vw, 650px"
                    className="media-img-element landscape-contain-fit"
                  />
                  <span className="preview-zoom-hint">Click to enlarge</span>
                </div>
              )
            )}
          </div>

          {/* RIGHT: Screenshots beside the video demo */}
          {images.length > 0 && (
            <div className="landscape-beside-col">
              {hasVideo ? (
                // When Video is on left: display images[0], images[1], images[2]
                images.length === 2 ? (
                  // Exactly 2 screenshots: Top and Bottom
                  <div className="side-grid-two-stacked">
                    <div
                      className="side-screen-box"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[0],
                          label: `${title} Preview 01`,
                        })
                      }
                    >
                      <Image
                        src={images[0]}
                        alt={`${title} Screen 01`}
                        fill
                        sizes="320px"
                        className="media-img-element landscape-contain-fit"
                      />
                      <span className="screen-card-label">Screen 01</span>
                    </div>
                    <div
                      className="side-screen-box"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[1],
                          label: `${title} Preview 02`,
                        })
                      }
                    >
                      <Image
                        src={images[1]}
                        alt={`${title} Screen 02`}
                        fill
                        sizes="320px"
                        className="media-img-element landscape-contain-fit"
                      />
                      <span className="screen-card-label">Screen 02</span>
                    </div>
                  </div>
                ) : (
                  // 3 or more screenshots: Top 1, Bottom 2 side-by-side with same width
                  <div className="side-grid-three-mosaic">
                    <div
                      className="side-screen-box side-top-span"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[0],
                          label: `${title} Preview 01`,
                        })
                      }
                    >
                      <Image
                        src={images[0]}
                        alt={`${title} Screen 01`}
                        fill
                        sizes="320px"
                        className="media-img-element landscape-contain-fit"
                      />
                      <span className="screen-card-label">Screen 01</span>
                    </div>
                    <div className="side-bottom-twin-row">
                      <div
                        className="side-screen-box twin-box"
                        onClick={() =>
                          setSelectedModalMedia({
                            type: "image",
                            src: images[1],
                            label: `${title} Preview 02`,
                          })
                        }
                      >
                        <Image
                          src={images[1]}
                          alt={`${title} Screen 02`}
                          fill
                          sizes="180px"
                          className="media-img-element landscape-contain-fit"
                        />
                        <span className="screen-card-label">Screen 02</span>
                      </div>
                      <div
                        className="side-screen-box twin-box"
                        onClick={() =>
                          setSelectedModalMedia({
                            type: "image",
                            src: images[2] || images[0],
                            label: `${title} Preview 03`,
                          })
                        }
                      >
                        <Image
                          src={images[2] || images[0]}
                          alt={`${title} Screen 03`}
                          fill
                          sizes="180px"
                          className="media-img-element landscape-contain-fit"
                        />
                        <span className="screen-card-label">Screen 03</span>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                // When No Video: images[0] is on the left, so images[1..3] go on the right
                images.slice(1).length === 2 ? (
                  <div className="side-grid-two-stacked">
                    <div
                      className="side-screen-box"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[1],
                          label: `${title} Preview 02`,
                        })
                      }
                    >
                      <Image
                        src={images[1]}
                        alt={`${title} Screen 02`}
                        fill
                        sizes="320px"
                        className="media-img-element landscape-contain-fit"
                      />
                      <span className="screen-card-label">Screen 02</span>
                    </div>
                    <div
                      className="side-screen-box"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[2],
                          label: `${title} Preview 03`,
                        })
                      }
                    >
                      <Image
                        src={images[2]}
                        alt={`${title} Screen 03`}
                        fill
                        sizes="320px"
                        className="media-img-element landscape-contain-fit"
                      />
                      <span className="screen-card-label">Screen 03</span>
                    </div>
                  </div>
                ) : (
                  <div className="side-grid-three-mosaic">
                    <div
                      className="side-screen-box side-top-span"
                      onClick={() =>
                        setSelectedModalMedia({
                          type: "image",
                          src: images[1] || images[0],
                          label: `${title} Preview 02`,
                        })
                      }
                    >
                      <Image
                        src={images[1] || images[0]}
                        alt={`${title} Screen 02`}
                        fill
                        sizes="320px"
                        className="media-img-element landscape-contain-fit"
                      />
                      <span className="screen-card-label">Screen 02</span>
                    </div>
                    <div className="side-bottom-twin-row">
                      <div
                        className="side-screen-box twin-box"
                        onClick={() =>
                          setSelectedModalMedia({
                            type: "image",
                            src: images[2] || images[0],
                            label: `${title} Preview 03`,
                          })
                        }
                      >
                        <Image
                          src={images[2] || images[0]}
                          alt={`${title} Screen 03`}
                          fill
                          sizes="180px"
                          className="media-img-element landscape-contain-fit"
                        />
                        <span className="screen-card-label">Screen 03</span>
                      </div>
                      <div
                        className="side-screen-box twin-box"
                        onClick={() =>
                          setSelectedModalMedia({
                            type: "image",
                            src: images[3] || images[1] || images[0],
                            label: `${title} Preview 04`,
                          })
                        }
                      >
                        <Image
                          src={images[3] || images[1] || images[0]}
                          alt={`${title} Screen 04`}
                          fill
                          sizes="180px"
                          className="media-img-element landscape-contain-fit"
                        />
                        <span className="screen-card-label">Screen 04</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* FULL RESOLUTION LIGHTBOX MODAL */}
      {selectedModalMedia && (
        <div
          className="media-lightbox-backdrop"
          onClick={() => setSelectedModalMedia(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="media-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedModalMedia(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <div className="lightbox-media-wrapper">
              <Image
                src={selectedModalMedia.src}
                alt={selectedModalMedia.label}
                fill
                sizes="95vw"
                className="lightbox-img"
              />
            </div>
            <div className="lightbox-caption">{selectedModalMedia.label}</div>
          </div>
        </div>
      )}
    </div>
  );
}
