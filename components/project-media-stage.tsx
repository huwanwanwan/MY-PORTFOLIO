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

  const isUnityOrGame =
    category === "Games & Animation" ||
    title.toLowerCase().includes("arena") ||
    title.toLowerCase().includes("force") ||
    title.toLowerCase().includes("jungle") ||
    title.toLowerCase().includes("game");

  // Determine if project screenshots are portrait (e.g. Mobile like SigLa)
  const isPortraitProject =
    category === "Mobile & AR" ||
    title.toLowerCase().includes("sigla") ||
    title.toLowerCase().includes("mobile");

  // Primary video or lead showcase
  const hasVideo = Boolean(video);
  const screenshotCount = images.length;

  return (
    <div
      className={`project-media-showcase-mosaic ${
        isPortraitProject ? "portrait-mode" : "landscape-mode"
      } ${hasVideo ? "has-video" : "no-video"}`}
    >
      {/* LEFT / PRIMARY MEDIA CONTAINER: Video Hero (or Main Screenshot if no video) */}
      <div className="mosaic-primary-col">
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
          /* If no video, slot first screenshot in primary viewport */
          images[0] && (
            <div
              className={`media-card-viewport hero-image-viewport ${
                isPortraitProject ? "portrait-viewport" : "landscape-viewport"
              }`}
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
                sizes="(max-width: 900px) 100vw, 700px"
                className={`media-img-element ${
                  isPortraitProject
                    ? "portrait-contain"
                    : isUnityOrGame
                    ? "unity-crop-landscape"
                    : "landscape-cover"
                }`}
              />
              <span className="preview-zoom-hint">Click to enlarge</span>
            </div>
          )
        )}
      </div>

      {/* RIGHT / SIDE SCREENSHOTS STACK */}
      {screenshotCount > 0 && (
        <div
          className={`mosaic-screenshots-col ${
            isPortraitProject
              ? "portrait-screenshots-scroll"
              : hasVideo
              ? `landscape-beside-stack count-${Math.min(screenshotCount, 3)}`
              : `landscape-grid-rest count-${Math.min(screenshotCount - 1, 4)}`
          }`}
        >
          {isPortraitProject ? (
            /* PORTRAIT / MOBILE PROJECT (e.g. SigLa):
               Scrollable horizontal row or clean responsive portrait cards that fit the full mobile phone height without cropping */
            <div className="portrait-screen-strip">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() =>
                    setSelectedModalMedia({
                      type: "image",
                      src: img,
                      label: `${title} Mobile Screen ${String(idx + 1).padStart(2, "0")}`,
                    })
                  }
                  className="portrait-screen-card"
                  aria-label={`View screenshot ${idx + 1}`}
                >
                  <div className="portrait-img-box">
                    <Image
                      src={img}
                      alt={`${title} screen ${idx + 1}`}
                      fill
                      sizes="180px"
                      className="portrait-img-element"
                    />
                  </div>
                  <span className="screen-card-label">Screen {idx + 1}</span>
                </button>
              ))}
            </div>
          ) : hasVideo ? (
            /* LANDSCAPE PROJECT WITH VIDEO:
               User rule:
               - If 2 screenshots: top and bottom (2 rows)
               - If 3 screenshots: top 1 full width, bottom 2 side-by-side with same combined width
            */
            <div
              className={`landscape-beside-grid ${
                screenshotCount === 2 ? "grid-two-stacked" : "grid-three-layout"
              }`}
            >
              {screenshotCount === 2 ? (
                // Exactly 2 screenshots: Top & Bottom
                <>
                  <div
                    className="side-screen-item item-top"
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
                      alt={`${title} Preview 01`}
                      fill
                      sizes="400px"
                      className="media-img-element landscape-cover"
                    />
                    <span className="screen-card-label">Screen 01</span>
                  </div>
                  <div
                    className="side-screen-item item-bottom"
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
                      alt={`${title} Preview 02`}
                      fill
                      sizes="400px"
                      className="media-img-element landscape-cover"
                    />
                    <span className="screen-card-label">Screen 02</span>
                  </div>
                </>
              ) : (
                // 3 or more screenshots: 1 on top, 2 on bottom sharing the exact same total width
                <>
                  <div
                    className="side-screen-item item-top-full"
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
                      alt={`${title} Preview 01`}
                      fill
                      sizes="450px"
                      className="media-img-element landscape-cover"
                    />
                    <span className="screen-card-label">Screen 01</span>
                  </div>
                  <div className="bottom-two-split-row">
                    <div
                      className="side-screen-item item-split"
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
                        alt={`${title} Preview 02`}
                        fill
                        sizes="250px"
                        className="media-img-element landscape-cover"
                      />
                      <span className="screen-card-label">Screen 02</span>
                    </div>
                    <div
                      className="side-screen-item item-split"
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
                        alt={`${title} Preview 03`}
                        fill
                        sizes="250px"
                        className="media-img-element landscape-cover"
                      />
                      <span className="screen-card-label">Screen 03</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* LANDSCAPE PROJECT WITHOUT VIDEO (images[0] is in hero, remaining images beside/below): */
            <div
              className={`landscape-beside-grid ${
                images.slice(1).length === 2 ? "grid-two-stacked" : "grid-three-layout"
              }`}
            >
              {images.slice(1, 4).length === 2 ? (
                <>
                  <div
                    className="side-screen-item item-top"
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
                      alt={`${title} Preview 02`}
                      fill
                      sizes="400px"
                      className="media-img-element landscape-cover"
                    />
                    <span className="screen-card-label">Screen 02</span>
                  </div>
                  <div
                    className="side-screen-item item-bottom"
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
                      alt={`${title} Preview 03`}
                      fill
                      sizes="400px"
                      className="media-img-element landscape-cover"
                    />
                    <span className="screen-card-label">Screen 03</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="side-screen-item item-top-full"
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
                      alt={`${title} Preview 02`}
                      fill
                      sizes="450px"
                      className="media-img-element landscape-cover"
                    />
                    <span className="screen-card-label">Screen 02</span>
                  </div>
                  <div className="bottom-two-split-row">
                    <div
                      className="side-screen-item item-split"
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
                        alt={`${title} Preview 03`}
                        fill
                        sizes="250px"
                        className="media-img-element landscape-cover"
                      />
                      <span className="screen-card-label">Screen 03</span>
                    </div>
                    <div
                      className="side-screen-item item-split"
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
                        alt={`${title} Preview 04`}
                        fill
                        sizes="250px"
                        className="media-img-element landscape-cover"
                      />
                      <span className="screen-card-label">Screen 04</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* LIGHTBOX MODAL FOR PREVIEWING AT FULL RESOLUTION */}
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
