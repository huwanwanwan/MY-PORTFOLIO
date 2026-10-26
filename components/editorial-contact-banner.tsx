"use client";

import type { PageId } from "./site-shell";

interface BannerContent {
  eyebrow: string;
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  description: string;
}

const bannerContentMap: Record<PageId, BannerContent> = {
  home: {
    eyebrow: "GET IN TOUCH",
    badge: "Available for new projects",
    titleLine1: "Have a project or idea?",
    titleHighlight: "Let's connect",
    titleLine2: "and build it.",
    description:
      "Whether you need a responsive website, an Android mobile application, or a full-stack platform — reach out directly on any channel below.",
  },
  about: {
    eyebrow: "COLLABORATE & GROW",
    badge: "Open for opportunities",
    titleLine1: "Driven by curiosity,",
    titleHighlight: "ready for real",
    titleLine2: "challenges.",
    description:
      "Now that you know my background, values, and dedication to craft, let's talk about how I can contribute to your project or team.",
  },
  projects: {
    eyebrow: "START A BUILD",
    badge: "Ready to ship code",
    titleLine1: "Interested in these builds?",
    titleHighlight: "Let's discuss",
    titleLine2: "your next project.",
    description:
      "From offline-first tools like SIGLA to full-featured POS systems — I'm ready to bring your software requirements into reality.",
  },
  skills: {
    eyebrow: "TECHNICAL ROADMAP",
    badge: "Ready for development work",
    titleLine1: "Looking for these skills?",
    titleHighlight: "Let's collaborate",
    titleLine2: "on your roadmap.",
    description:
      "Ready to apply React, Kotlin, Node.js, and modern database workflows to solve practical technical challenges and deliver results.",
  },
  experience: {
    eyebrow: "HIRE OR PARTNER",
    badge: "Available for roles & projects",
    titleLine1: "Looking for a dedicated developer?",
    titleHighlight: "Let's work",
    titleLine2: "together.",
    description:
      "Grounded in strong academic performance with honors and real capstone leadership — let's connect for internships, roles, or freelance work.",
  },
  contact: {
    eyebrow: "DIRECT CHANNELS",
    badge: "Quick response time",
    titleLine1: "Ready to get in touch?",
    titleHighlight: "Reach out",
    titleLine2: "anytime.",
    description:
      "I actively monitor my email, Facebook, LinkedIn, and GitHub — send a message on your preferred channel and I'll get back to you promptly.",
  },
};

export default function EditorialContactBanner({ activePage }: { activePage: PageId }) {
  const content = bannerContentMap[activePage] || bannerContentMap.home;

  return (
    <section
      className="editorial-contact-band scroll-reveal"
      id="collaborate"
      data-scroll-reveal
      aria-label="Contact and collaboration channels"
    >
      <div className="editorial-contact-band-glow" aria-hidden="true" />
      <div className="editorial-contact-inner">
        {/* Top Header: Eyebrow + Availability Badge */}
        <div className="editorial-contact-top">
          <p className="editorial-eyebrow">
            <span className="editorial-eyebrow-dot" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <span className="editorial-contact-avail">
            <span className="editorial-avail-dot" aria-hidden="true" />
            {content.badge}
          </span>
        </div>

        {/* Big Statement Typography */}
        <h2 className="editorial-contact-statement editorial-title">
          {content.titleLine1}
          <br />
          <span className="contact-statement-outline">{content.titleHighlight}</span>{" "}
          {content.titleLine2}
        </h2>

        {/* Subtitle Description */}
        <p className="editorial-contact-sub">{content.description}</p>

        {/* Numbered Direct Channel Links (01, 02, 03, 04) */}
        <ul className="editorial-contact-index" role="list">
          <li>
            <a
              className="editorial-contact-link"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=militantejuanenricodomanico@gmail.com&su=%5BWANCOR%5D%20Project%20Inquiry%20%2F%20Collaboration&body=Hello%20Juan%20%28WANCOR%29%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20%2F%20opportunity%20with%20WANCOR%3A%0A%0A%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%0APROJECT%20SPECIFICATIONS%3A%0A%E2%80%A2%20Project%20Type%3A%20%5BWeb%20Development%20%2F%20Mobile%20App%20%2F%20Other%5D%0A%E2%80%A2%20Target%20Timeline%3A%20%5Be.g.%202-4%20weeks%20%2F%20Flexible%5D%0A%E2%80%A2%20Overview%20%26%20Scope%3A%20%0A%0ACLIENT%20DETAILS%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Company%20%2F%20Organization%3A%20%0A%E2%80%A2%20Phone%20%2F%20WhatsApp%3A%20%0A%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%0ASent%20via%20WANCOR%20Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send email to Juan Enrico Militante (WANCOR)"
            >
              <span className="editorial-index-num">01</span>
              <span className="editorial-index-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m3 6 9 7 9-7" />
                </svg>
              </span>
              <span className="editorial-index-label">Email</span>
              <span className="editorial-index-value">militantejuanenricodomanico@gmail.com</span>
              <span className="editorial-index-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a
              className="editorial-contact-link"
              href="https://www.facebook.com/huwananan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Juan Enrico Militante Facebook profile"
            >
              <span className="editorial-index-num">02</span>
              <span className="editorial-index-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z" />
                </svg>
              </span>
              <span className="editorial-index-label">Facebook</span>
              <span className="editorial-index-value">facebook.com/huwananan</span>
              <span className="editorial-index-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a
              className="editorial-contact-link"
              href="https://www.linkedin.com/in/juan-domanico-militante-88606b445/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Juan Enrico Militante LinkedIn profile"
            >
              <span className="editorial-index-num">03</span>
              <span className="editorial-index-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </span>
              <span className="editorial-index-label">LinkedIn</span>
              <span className="editorial-index-value">linkedin.com/in/juan-domanico-militante</span>
              <span className="editorial-index-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a
              className="editorial-contact-link"
              href="https://github.com/huwanwanwan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Juan Enrico Militante GitHub repository"
            >
              <span className="editorial-index-num">04</span>
              <span className="editorial-index-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.2 0 .63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.81 1.09.81 2.22v3.29c0 .31.2.67.79.55C20.71 21.39 24 17.08 24 12c0-6.35-5.37-11.5-12-11.5z" />
                </svg>
              </span>
              <span className="editorial-index-label">GitHub</span>
              <span className="editorial-index-value">github.com/huwanwanwan</span>
              <span className="editorial-index-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        {/* Location Subline */}
        <div className="editorial-contact-loc">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Bulacan / Manila, Philippines · Remote-friendly worldwide</span>
        </div>
      </div>
    </section>
  );
}

