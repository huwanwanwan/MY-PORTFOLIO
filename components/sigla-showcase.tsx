"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function SiglaShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sigla-dual-stage" ref={containerRef}>
      {/* Left: Video Demo */}
      <div className="sigla-video-col">
        <div className="sigla-video-container">
          <video
            ref={videoRef}
            src="/SIGLA/mobile-demo.mp4"
            poster="/SIGLA/home.jpg"
            controls
            muted
            loop
            playsInline
            preload="none"
            className="sigla-main-video"
            title="SigLa mobile app demo video"
          >
            Your browser does not support the video tag.
          </video>
          <div className="video-live-badge">
            <span className="live-dot" />
            <span>DEMO VIDEO</span>
          </div>
        </div>
        <div className="sigla-video-caption">
          <span className="sigla-caption-title">SigLa — Sign Language Translator Demo</span>
        </div>
      </div>

      {/* Right: 3 Phone Mockups */}
      <div className="sigla-phones-col">
        <div className="sigla-phones-trio">
          {/* Phone 1: Left / Background */}
          <div className="phone-mockup phone-left">
            <div className="phone-bezel">
              <div className="phone-notch" />
              <div className="phone-screen">
                <Image
                  src="/SIGLA/home.jpg"
                  alt="SigLa Home Screen"
                  fill
                  sizes="260px"
                  className="phone-screen-img"
                  unoptimized
                />
              </div>
            </div>
            <span className="phone-label">Home Screen</span>
          </div>

          {/* Phone 2: Center / Front Hero */}
          <div className="phone-mockup phone-center">
            <div className="phone-bezel">
              <div className="phone-notch" />
              <div className="phone-screen">
                <Image
                  src="/SIGLA/demo.jpg"
                  alt="SigLa Live Translator Demo"
                  fill
                  sizes="280px"
                  className="phone-screen-img"
                  priority
                  unoptimized
                />
              </div>
            </div>
            <span className="phone-label">Live Recognition</span>
          </div>

          {/* Phone 3: Right / Background */}
          <div className="phone-mockup phone-right">
            <div className="phone-bezel">
              <div className="phone-notch" />
              <div className="phone-screen">
                <Image
                  src="/SIGLA/words.jpg"
                  alt="SigLa Word Bank / Vocabulary"
                  fill
                  sizes="260px"
                  className="phone-screen-img"
                  unoptimized
                />
              </div>
            </div>
            <span className="phone-label">Word Bank</span>
          </div>
        </div>
      </div>
    </div>
  );
}

