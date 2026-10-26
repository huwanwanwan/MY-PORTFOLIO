"use client";

import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import EditorialContactBanner from "./editorial-contact-banner";
import FaqChatbot from "./faq-chatbot";
import ThemeTutorial from "./theme-tutorial";

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
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", darkMode);
      document.body.classList.toggle("dark", darkMode);
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
      document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  useEffect(() => {
    setIsPageSwitching(true);
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      try {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = "";
      } catch {
        window.scrollTo(0, 0);
      }
    }
    const timer = setTimeout(() => {
      setIsPageSwitching(false);
    }, 550);
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
    let ticking = false;

    const checkElementVisibility = (item: HTMLElement) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // When element is fully outside viewport (above or below), reset so it re-animates smoothly on re-entry
      if (rect.bottom < -40 || rect.top > windowHeight + 40) {
        if ((item as any)._revealTimer) {
          clearTimeout((item as any)._revealTimer);
          (item as any)._revealTimer = null;
        }
        item.dataset.revealVisible = "false";
        return;
      }

      // Check if element is positioned so user actually sees it animate:
      // When scrolling down (entering from bottom): rect.top <= windowHeight - 40
      // When scrolling up (entering from top): rect.top >= -80 || rect.bottom >= Math.min(windowHeight * 0.45, 260)
      const isEnteringFromTop = rect.top < 0;
      const isReadyToAnimate = isEnteringFromTop
        ? (rect.top >= -80 || rect.bottom >= Math.min(windowHeight * 0.45, 260))
        : (rect.top <= windowHeight - 40);

      if (isReadyToAnimate) {
        if (item.dataset.revealVisible !== "true" && !(item as any)._revealTimer) {
          // Intentional increased delay before entrance animation starts
          const delayAttr = item.dataset.revealDelay;
          const delayMs = delayAttr ? Math.max(parseInt(delayAttr, 10), 0) + 180 : 260;
          (item as any)._revealTimer = window.setTimeout(() => {
            item.dataset.revealVisible = "true";
            (item as any)._revealTimer = null;
          }, delayMs);
        }
      }
    };

    const updateAllReveals = () => {
      const items = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
      items.forEach((item) => {
        item.dataset.revealReady = "true";
        checkElementVisibility(item);
      });
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateAllReveals();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount / navigation: reveal elements as content slides up smoothly
    updateAllReveals();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    const mutationObserver = new MutationObserver(() => {
      updateAllReveals();
    });

    const pageContainer = document.querySelector(".page-content") || document.body;
    mutationObserver.observe(pageContainer, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      mutationObserver.disconnect();
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((item) => {
        if ((item as any)._revealTimer) {
          clearTimeout((item as any)._revealTimer);
          (item as any)._revealTimer = null;
        }
      });
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

        <div key={pathname} className={`dashboard-content page-content page-enter-up ${isPageSwitching ? "page-transitioning" : "page-entered"}`}>{children}</div>

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

        {/* Guided Theme Tutorial for New Visitors */}
        <ThemeTutorial darkMode={darkMode} onToggleTheme={toggleTheme} />

        {/* Floating Circle FAQ Chatbot on bottom-right */}
        <FaqChatbot />
      </article>
    </main>
  );
}
