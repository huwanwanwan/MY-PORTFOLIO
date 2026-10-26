"use client";

import { useState, useEffect, useCallback } from "react";

interface ThemeTutorialProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function ThemeTutorial({ darkMode, onToggleTheme }: ThemeTutorialProps) {
  const [isActive, setIsActive] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  const [initialMode, setInitialMode] = useState<boolean | null>(null);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);

  const measureTarget = useCallback(() => {
    const btn = document.getElementById("topbar-theme-toggle");
    if (btn) {
      const rect = btn.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  }, []);

  useEffect(() => {
    try {
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const forceTutorial = urlParams?.has("tutorial") || urlParams?.has("theme");
      const completed = sessionStorage.getItem("wancor_theme_tutorial_done");
      if (!completed || forceTutorial) {
        const timer = setTimeout(() => {
          setIsActive(true);
          setInitialMode(darkMode);
          measureTarget();
        }, 450);
        return () => clearTimeout(timer);
      }
    } catch {
      // sessionStorage unavailable, do not block
    }
  }, [darkMode, measureTarget]);

  // Lock scrolling before they try the theme & measure button on window events
  useEffect(() => {
    if (isActive) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Elevate the topbar theme toggle above the dimmed backdrop
      const btn = document.getElementById("topbar-theme-toggle");
      if (btn) {
        btn.classList.add("theme-toggle-spotlight");
      }

      measureTarget();

      const handleResizeOrScroll = () => {
        measureTarget();
      };

      window.addEventListener("resize", handleResizeOrScroll, { passive: true });
      window.addEventListener("scroll", handleResizeOrScroll, { passive: true });

      // Run quick periodic measurements to catch font/CSS settle
      const interval = setInterval(measureTarget, 200);

      return () => {
        document.body.style.overflow = originalOverflow;
        if (btn) {
          btn.classList.remove("theme-toggle-spotlight");
        }
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll);
        clearInterval(interval);
      };
    }
  }, [isActive, measureTarget]);

  const handleToggle = () => {
    onToggleTheme();
    setHasToggled(true);
  };

  const handleFinish = () => {
    setIsActive(false);
    const btn = document.getElementById("topbar-theme-toggle");
    if (btn) {
      btn.classList.remove("theme-toggle-spotlight");
    }
    try {
      sessionStorage.setItem("wancor_theme_tutorial_done", "true");
    } catch {
      // ignore
    }
  };

  if (!isActive) return null;

  const safeTarget = targetRect || (typeof window !== "undefined" ? {
    top: 14,
    left: Math.max(16, window.innerWidth - 56),
    width: 38,
    height: 38,
  } : null);

  // Calculate dynamic card & arrow position based on measured safeTarget
  let cardStyle: React.CSSProperties | undefined = undefined;
  let arrowStyle: React.CSSProperties | undefined = undefined;

  if (safeTarget && typeof window !== "undefined") {
    const winW = window.innerWidth;
    const buttonCenterX = safeTarget.left + safeTarget.width / 2;
    const buttonCenterFromRight = winW - buttonCenterX;

    // Position card right below the button
    const cardTop = Math.round(safeTarget.top + safeTarget.height + 14);

    if (winW > 600) {
      // Align card right edge comfortably near the button
      const cardRight = Math.max(16, Math.min(winW - 420, Math.round(winW - (safeTarget.left + safeTarget.width) - 16)));
      cardStyle = {
        position: "fixed",
        top: `${cardTop}px`,
        right: `${cardRight}px`,
        maxWidth: "420px",
        margin: 0,
      };

      // Arrow position pointing directly to button center
      const arrowRight = Math.max(22, Math.min(380, Math.round(buttonCenterFromRight - cardRight - 11)));
      arrowStyle = {
        right: `${arrowRight}px`,
      };
    } else {
      // Mobile screen: center card horizontally
      cardStyle = {
        position: "fixed",
        top: `${Math.max(68, cardTop)}px`,
        left: "16px",
        right: "16px",
        maxWidth: "calc(100vw - 32px)",
        margin: "0 auto",
      };

      const arrowRight = Math.max(20, Math.min(winW - 50, Math.round(buttonCenterFromRight - 27)));
      arrowStyle = {
        right: `${arrowRight}px`,
      };
    }
  }

  return (
    <div className="theme-tutorial-backdrop" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      {/* Target Spotlight Halo around Topbar button */}
      <div
        className="theme-spotlight-pulse"
        style={
          safeTarget
            ? {
                position: "fixed",
                top: `${Math.round(safeTarget.top - 7)}px`,
                left: `${Math.round(safeTarget.left - 7)}px`,
                width: `${Math.round(safeTarget.width + 14)}px`,
                height: `${Math.round(safeTarget.height + 14)}px`,
                right: "auto",
                bottom: "auto",
                margin: 0,
                pointerEvents: "none",
                zIndex: 10002,
              }
            : undefined
        }
        aria-hidden="true"
      />

      {/* Prominently visible interactive Light / Dark Button positioned right inside the circle recommendation */}
      <button
        type="button"
        id="spotlight-active-theme-btn"
        className="spotlight-interactive-toggle-btn"
        onClick={handleToggle}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Click to switch to Light Mode" : "Click to switch to Dark Mode"}
        style={
          safeTarget
            ? {
                position: "fixed",
                top: `${Math.round(safeTarget.top)}px`,
                left: `${Math.round(safeTarget.left)}px`,
                width: `${Math.round(safeTarget.width)}px`,
                height: `${Math.round(safeTarget.height)}px`,
                zIndex: 10004,
              }
            : undefined
        }
      >
        <span aria-hidden="true" className="spotlight-theme-icon">
          {darkMode ? "☀" : "☾"}
        </span>
      </button>

      {/* Floating Tutorial Card */}
      <div className="theme-tutorial-card" style={cardStyle}>
        {/* Pointer Arrow pointing to the topbar theme toggle */}
        <div className="tutorial-pointer-arrow" style={arrowStyle} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </div>

        <div className="tutorial-badge-row">
          <span className="tutorial-badge">
            <span className="tutorial-dot" />
            STEP 1 • THEME PREFERENCE
          </span>
          <button
            type="button"
            className="tutorial-skip-btn"
            onClick={handleFinish}
            aria-label="Skip theme tutorial"
          >
            Skip ✕
          </button>
        </div>

        <h3 id="tutorial-title" className="tutorial-title">
          {hasToggled ? "✨ Notice the Difference!" : "Try Dark & Light Mode First"}
        </h3>

        <p className="tutorial-desc">
          {hasToggled
            ? `You switched to ${darkMode ? "Dark ☾" : "Light ☀"} mode! Notice how the contrast, background glass, and typography adapt. You can toggle it anytime in the header.`
            : `Welcome to Juan's portfolio! Before scrolling, try switching between Dark and Light mode to preview the design in your preferred aesthetic.`}
        </p>

        {/* Action Buttons */}
        <div className="tutorial-actions-row">
          <button
            type="button"
            className="tutorial-toggle-btn"
            onClick={handleToggle}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            <span className="toggle-icon-wrap" aria-hidden="true">
              {darkMode ? "☀" : "☾"}
            </span>
            <span>Switch to {darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            type="button"
            className="tutorial-continue-btn"
            onClick={handleFinish}
          >
            <span>{hasToggled ? "Explore Portfolio ➔" : "Continue with this Mode ➔"}</span>
          </button>
        </div>

        {/* Helpful subtext */}
        <div className="tutorial-footer-note">
          <span>Scroll is paused so you can choose your favorite look first</span>
        </div>
      </div>
    </div>
  );
}
