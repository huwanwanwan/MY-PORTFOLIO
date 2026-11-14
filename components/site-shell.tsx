"use client";

import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import EditorialContactBanner from "./editorial-contact-banner";

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
] as const;

export type PageId = (typeof navigationItems)[number]["key"];

type SiteShellProps = {
  activePage: PageId;
  children: ReactNode;
};

export default function SiteShell({ activePage, children }: SiteShellProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  useLayoutEffect(() => {
    // Reset before painting the destination so only its entrance animation plays.
    // Let project and certification anchor links keep their intended destination.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", darkMode);
      document.body.classList.toggle("dark", darkMode);
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
      document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);


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
    const nav = navRef.current;
    if (activePage === "home") {
      nav.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const activeEl = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (activeEl) {
        const navRect = nav.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        const offsetLeft = elRect.left - navRect.left;
        const targetScrollLeft = nav.scrollLeft + offsetLeft - (navRect.width / 2) + (elRect.width / 2);
        nav.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: "smooth" });
      }
    }
  }, [activePage, pathname]);

  useEffect(() => {
    const container = document.querySelector(".page-content");
    if (!container) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new Set<HTMLElement>();
    const reveal = (item: HTMLElement) => {
      item.dataset.revealVisible = "true";
      observer?.unobserve(item);
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        }, { threshold: 0 })
      : null;

    const observeItems = () => {
      container.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((item) => {
        if (motionPreference.matches || !observer) {
          reveal(item);
          return;
        }
        if (observed.has(item)) return;
        observed.add(item);

        // Keep already visible content visible during hydration and navigation.
        const rect = item.getBoundingClientRect();
        if (item.dataset.revealVisible === "true" ||
            (rect.top < window.innerHeight && rect.bottom > 0 &&
             rect.left < window.innerWidth && rect.right > 0)) {
          reveal(item);
        } else {
          item.dataset.revealReady = "true";
          observer.observe(item);
        }
      });
    };

    observeItems();
    const mutations = new MutationObserver(observeItems);
    mutations.observe(container, { childList: true, subtree: true });
    motionPreference.addEventListener("change", observeItems);

    return () => {
      observer?.disconnect();
      mutations.disconnect();
      motionPreference.removeEventListener("change", observeItems);
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
            <Link className="brand-link" href="/" aria-label="Juan Domanico Militante Home">
              <Image
                src="/tab-logo.png"
                alt="Wancor Logo"
                width={56}
                height={56}
                className="brand-logo-img"
                priority
              />
              <div className="brand-text">
                <span className="brand-name">Juan Domanico Militante</span>
                <p className="active-mode">Web &amp; Mobile Developer</p>
              </div>
            </Link>
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
              id="topbar-theme-toggle"
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

        <div key={pathname} className="dashboard-content page-content page-enter-up">{children}</div>

        <EditorialContactBanner activePage={activePage} />

        <footer className="site-mega-footer">
          <div className="site-mega-footer-content">
            {/* Column 1: Identity & Bio */}
            <div className="mega-footer-col brand-col">
              <Link href="/" className="mega-footer-logo-link">
                <Image
                  src="/tab-logo.png"
                  alt="Wancor Logo"
                  width={38}
                  height={38}
                  className="mega-footer-logo-img"
                />
                <span className="mega-footer-logo">Huwananan</span>
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
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=militantejuanenricodomanico@gmail.com&su=%5BWancor%5D%20Project%20Inquiry%20%2F%20Collaboration&body=Hello%20Juan%20%28Wancor%29%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20%2F%20opportunity%20with%20Wancor%3A%0A%0A%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%0APROJECT%20SPECIFICATIONS%3A%0A%E2%80%A2%20Project%20Type%3A%20%5BWeb%20Development%20%2F%20Mobile%20App%20%2F%20Other%5D%0A%E2%80%A2%20Target%20Timeline%3A%20%5Be.g.%202-4%20weeks%20%2F%20Flexible%5D%0A%E2%80%A2%20Overview%20%26%20Scope%3A%20%0A%0ACLIENT%20DETAILS%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Company%20%2F%20Organization%3A%20%0A%E2%80%A2%20Phone%20%2F%20WhatsApp%3A%20%0A%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%0ASent%20via%20Wancor%20Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
