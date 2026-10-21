"use client";

import Image from "next/image";

export default function SiglaShowcase() {
  return (
    <div className="sigla-dual-stage">
      {/* Left: Video Demo */}
      <div className="sigla-video-col">
        <div className="sigla-video-container">
          <video
            src="/SIGLA/mobile-demo.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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
