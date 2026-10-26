"use client";

import { useState, useEffect } from "react";

interface ThemeTutorialProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function ThemeTutorial({ darkMode, onToggleTheme }: ThemeTutorialProps) {
  const [isActive, setIsActive] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  const [initialMode, setInitialMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already completed or dismissed the theme tutorial in this session
    try {
      const completed = sessionStorage.getItem("wancor_theme_tutorial_done");
      if (!completed) {
        // Small 400ms delay for page elements to mount cleanly
        const timer = setTimeout(() => {
          setIsActive(true);
          setInitialMode(darkMode);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // sessionStorage unavailable, do not block
    }
  }, []);

  // Lock scrolling before they try the theme
  useEffect(() => {
    if (isActive) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isActive]);

  const handleToggle = () => {
    onToggleTheme();
    setHasToggled(true);
  };

  const handleFinish = () => {
    setIsActive(false);
    try {
      sessionStorage.setItem("wancor_theme_tutorial_done", "true");
    } catch {
      // ignore
    }
  };

  if (!isActive) return null;

  return (
    <div className="theme-tutorial-backdrop" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      {/* Target Spotlight Halo around Topbar button */}
      <div className="theme-spotlight-pulse" aria-hidden="true" />

      {/* Floating Tutorial Card */}
      <div className="theme-tutorial-card">
        {/* Pointer Arrow pointing to the topbar theme toggle */}
        <div className="tutorial-pointer-arrow" aria-hidden="true">
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
