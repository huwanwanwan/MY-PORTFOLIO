"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BahalertoShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    }, { threshold: 0.25 });
    container.querySelectorAll("video").forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bahalerto-showcase" ref={containerRef} aria-labelledby="bahalerto-demo-heading">
      <h3 id="bahalerto-demo-heading">BAHAlerto — A More Prepared Community</h3>
      <div className="bahalerto-videos">
        {[
          { src: "community-demo.mp4", poster: "website-home.png", label: "Community website demo" },
          { src: "admin-demo.mp4", poster: "admin-login.png", label: "Administration portal demo" },
        ].map((demo) => (
          <figure key={demo.src} className="sigla-video-col">
            <div className="sigla-video-container bahalerto-video-container">
              <video src={`/BAHALERTO/${demo.src}`} poster={`/BAHALERTO/${demo.poster}`} controls muted loop playsInline preload="none" className="sigla-main-video" title={`BAHAlerto ${demo.label}`}>
                Your browser does not support the video tag.
              </video>
              <div className="video-live-badge"><span className="live-dot" /><span>DEMO VIDEO</span></div>
            </div>
            <figcaption className="sigla-video-caption">{demo.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="bahalerto-phone-previews">
        {[
          { src: "mobile-home.png", label: "Mobile home screen", width: 360, height: 693 },
          { src: "mobile-login.png", label: "Mobile login screen", width: 338, height: 686 },
        ].map((screen) => (
          <figure key={screen.src}>
            <Image src={`/BAHALERTO/${screen.src}`} alt={`BAHAlerto ${screen.label}`} width={screen.width} height={screen.height} sizes="(max-width: 600px) 40vw, 240px" unoptimized />
            <figcaption className="sigla-video-caption">{screen.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
