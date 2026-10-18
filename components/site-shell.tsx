"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

const themeChangeEvent = "portfolio-theme-change";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

function getThemeSnapshot() {
  return window.localStorage.getItem("portfolio-theme") === "dark";
}

const navigationItems = [
  { label: "Home", href: "/", key: "home" },
  { label: "About Me", href: "/about", key: "about" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "Skills", href: "/skills", key: "skills" },
  { label: "Experience", href: "/experience", key: "experience" },
  { label: "Contact", href: "/contact", key: "contact" },
];

type SiteShellProps = {
  activePage: (typeof navigationItems)[number]["key"];
  children: ReactNode;
};

export default function SiteShell({ activePage, children }: SiteShellProps) {
  const pathname = usePathname();
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal]",
    );

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => {
        item.dataset.revealVisible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          item.dataset.revealVisible = String(entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    revealItems.forEach((item) => {
      item.dataset.revealReady = "true";
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [pathname]);

  function toggleTheme() {
    const next = !darkMode;
    window.localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <main className={`page${darkMode ? " dark" : ""}`}>
      <article className="portfolio-shell">
        <header className="topbar">
          <div className="brand-block">
            <Link className="brand-name" href="/">
              Juan Domanico Militante
            </Link>
            <p className="active-mode">Web &amp; Mobile Developer</p>
          </div>
          <nav className="primary-nav" aria-label="Main navigation">
            {navigationItems.map(({ label, href, key }) => (
              <Link
                aria-current={activePage === key ? "page" : undefined}
                href={href}
                key={key}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="topbar-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkMode}
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
            </button>
          </div>
        </header>

        <div className="dashboard-content page-content">{children}</div>

        <footer className="footer">
          <Link href="/">Juan Domanico Militante</Link>
          <span>© 2026 · BUILT WITH CURIOSITY</span>
        </footer>
      </article>
    </main>
  );
}
