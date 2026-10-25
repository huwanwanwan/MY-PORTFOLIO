"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

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
  const navRef = useRef<HTMLElement | null>(null);
  const [isPageSwitching, setIsPageSwitching] = useState(false);
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  useEffect(() => {
    setIsPageSwitching(true);
    const timer = setTimeout(() => {
      setIsPageSwitching(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      home: "Home | Portfolio",
      about: "About Me | Portfolio",
      projects: "Projects | Portfolio",
      skills: "Skills | Portfolio",
      experience: "Experience | Portfolio",
      contact: "Contact | Portfolio",
    };
    if (pageTitles[activePage]) {
      document.title = pageTitles[activePage];
    }
  }, [activePage]);

  useEffect(() => {
    if (!navRef.current) return;
    if (activePage === "home") {
      navRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const activeEl = navRef.current.querySelector<HTMLElement>('[aria-current="page"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }
  }, [activePage, pathname]);

  useEffect(() => {
    const observeElement = (item: HTMLElement, observer?: IntersectionObserver) => {
      if (!("IntersectionObserver" in window) || !observer) {
        item.dataset.revealReady = "true";
        item.dataset.revealVisible = "true";
        return;
      }
      if (item.dataset.revealObserved === "true") return;
      item.dataset.revealObserved = "true";
      item.dataset.revealReady = "true";
      observer.observe(item);
    };

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>("[data-scroll-reveal]")
        .forEach((item) => observeElement(item));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            item.dataset.revealVisible = "false";
            return;
          }
          item.dataset.revealVisible = "true";
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    const scanAndObserve = () => {
      document
        .querySelectorAll<HTMLElement>("[data-scroll-reveal]")
        .forEach((item) => observeElement(item, observer));
    };

    scanAndObserve();

    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    const pageContainer = document.querySelector(".page-content") || document.body;
    mutationObserver.observe(pageContainer, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
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
          <nav className="primary-nav" aria-label="Main navigation" ref={navRef}>
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

        <div className={`dashboard-content page-content ${isPageSwitching ? "page-transitioning" : "page-entered"}`}>{children}</div>

        <footer className="site-mega-footer">
          <div className="site-mega-footer-content">
            {/* Column 1: Identity & Bio */}
            <div className="mega-footer-col brand-col">
              <Link href="/" className="mega-footer-logo">
                juanmilitante.
              </Link>
              <p className="mega-footer-tagline">
                Information Technology student building practical web, mobile, game, and IoT projects.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="mega-footer-col">
              <span className="mega-footer-heading">NAVIGATE</span>
              <ul className="mega-footer-list">
                <li><Link href="/about">About me</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/skills">Skills</Link></li>
                <li><Link href="/experience">Experience</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/experience#credentials">Certifications</Link></li>
              </ul>
            </div>

            {/* Column 3: Connect Links */}
            <div className="mega-footer-col">
              <span className="mega-footer-heading">CONNECT</span>
              <ul className="mega-footer-list">
                <li>
                  <a href="https://www.linkedin.com/in/juan-domanico-militante-88606b445/" target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href="https://github.com/huwanwanwan" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/huwananan" target="_blank" rel="noopener noreferrer">
                    Facebook ↗
                  </a>
                </li>
                <li>
                  <a href="mailto:militantejuanenricodomanico@gmail.com">
                    Email ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Education */}
            <div className="mega-footer-col">
              <span className="mega-footer-heading">EDUCATION</span>
              <div className="mega-footer-edu">
                <p className="mega-footer-degree">Information Technology</p>
                <p className="mega-footer-school">Pambayang Dalubhasaan ng Marilao</p>
              </div>
            </div>
          </div>

          <div className="site-mega-footer-bottom">
            <span>© 2026 Juan Enrico Domanico Militante</span>
            <span className="bottom-tag">Designed &amp; Developed by Juan Enrico Militante</span>
            <button
              type="button"
              className="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </article>
    </main>
  );
}
