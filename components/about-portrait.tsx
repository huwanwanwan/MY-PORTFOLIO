"use client";

import Image from "next/image";
import { useState } from "react";

export default function AboutPortrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`about-portrait-frame${loaded || failed ? "" : " is-loading"}`}
      aria-busy={!loaded && !failed}
    >
      {!failed ? (
        <Image
          src="/profile/professional_profile_cutout.png"
          alt="Portrait of Juan Domanico Militante"
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="about-portrait-image"
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
