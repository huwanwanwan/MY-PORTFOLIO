"use client";

import Image from "next/image";
import { useId, useState } from "react";

export default function AboutPortrait() {
  const outlineId = useId().replace(/:/g, "");
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`about-portrait-frame${loaded || failed ? "" : " is-loading"}`}
      aria-busy={!loaded && !failed}
    >
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", overflow: "visible" }}>
        <defs>
          <filter id={outlineId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="expanded" />
            <feComposite in="expanded" in2="SourceAlpha" operator="out" result="edge" />
            <feFlood floodColor="var(--about-portrait-outline, #ff967e)" />
            <feComposite in2="edge" operator="in" result="outline" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.2" result="innerExpanded" />
            <feComposite in="innerExpanded" in2="SourceAlpha" operator="out" result="innerEdge" />
            <feFlood floodColor="var(--about-portrait-inner-outline, #fff0e8)" />
            <feComposite in2="innerEdge" operator="in" result="innerOutline" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="outerExpanded" />
            <feComposite in="outerExpanded" in2="SourceAlpha" operator="out" result="outerEdge" />
            <feFlood floodColor="var(--about-portrait-outer-outline, #ffffff)" />
            <feComposite in2="outerEdge" operator="in" result="outerOutline" />
            <feMerge><feMergeNode in="outerOutline" /><feMergeNode in="outline" /><feMergeNode in="innerOutline" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
      {!failed ? (
        <Image
          src="/profile/professional_profile_cutout.png"
          alt="Portrait of Juan Domanico Militante"
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="about-portrait-image"
          style={{ filter: `url(#${outlineId})` }}
          unoptimized
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="about-portrait-fallback" role="img" aria-label="Portrait unavailable">
          Portrait unavailable
        </span>
      )}
      {!failed && (
        <figcaption>
          <span>JUAN DOMANICO MILITANTE</span>
          <span>WEB &amp; MOBILE DEVELOPER</span>
        </figcaption>
      )}
    </figure>
  );
}
