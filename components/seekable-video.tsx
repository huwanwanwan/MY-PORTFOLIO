"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type VideoHTMLAttributes } from "react";

// Load these small demos as local media so seeking also works when the CDN
// serves an MP4 without byte-range support.
const SeekableVideo = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(
  function SeekableVideo({ src, ...props }, forwardedRef) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [localSource, setLocalSource] = useState<{ original: string; url: string } | null>(null);
    const needsLocalSource = typeof src === "string" && src.startsWith("/BAHALERTO/");
    useImperativeHandle(forwardedRef, () => videoRef.current!);

    useEffect(() => {
      if (!needsLocalSource || !src || !videoRef.current) return;
      const controller = new AbortController();
      let objectUrl: string | undefined;
      let started = false;
      const load = async () => {
        if (started) return;
        started = true;
        try {
          const response = await fetch(src, { signal: controller.signal });
          if (!response.ok) throw new Error("Demo unavailable");
          const blob = await response.blob();
          if (controller.signal.aborted) return;
          objectUrl = URL.createObjectURL(blob);
          setLocalSource({ original: src, url: objectUrl });
        } catch {
          if (!controller.signal.aborted) setLocalSource({ original: src, url: src });
        }
      };
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void load();
      }, { rootMargin: "200px" });
      observer.observe(videoRef.current);
      return () => {
        controller.abort();
        observer.disconnect();
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, [src, needsLocalSource]);

    useEffect(() => {
      const video = videoRef.current;
      if (!needsLocalSource || !localSource || !video) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && video.muted) video.play().catch(() => {});
        else video.pause();
      }, { threshold: 0.25 });
      observer.observe(video);
      return () => observer.disconnect();
    }, [localSource, needsLocalSource]);

    return <video {...props} ref={videoRef} src={needsLocalSource ? (localSource?.original === src ? localSource.url : undefined) : src} />;
  }
);

export default SeekableVideo;
