"use client";

import { useState } from "react";

export default function ContactHub() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const emailAddress = "militantejuanenricodomanico@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formState.name || "Visitor"}`
    );
    const bodyContent = `Name: ${formState.name}
Email: ${formState.email}
Phone: ${formState.phone || "Not provided"}

Message:
${formState.message}`;

    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${encodeURIComponent(
      bodyContent
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section className="section-block contact-hub-container" id="contact" data-scroll-reveal>
      <div className="contact-hub-grid">
        {/* Left Column: Greeting, Links, Resume */}
        <div className="contact-hub-left">
          <div className="contact-hub-kicker">CONTACT</div>
          <h1 className="contact-hub-title">
            Say hello<span className="contact-hub-dot">.</span>
          </h1>
          <p className="contact-hub-desc">
            I&apos;m open to collaboration and opportunities to keep learning by building useful products. Send me a note or reach out directly—I&apos;d be happy to talk through my projects.
          </p>

          {/* Primary Email link */}
          <div className="contact-email-row">
            <a
              href={`mailto:${emailAddress}`}
              className="contact-main-email-link"
              title="Open Gmail to email me"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact-mail-icon"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{emailAddress}</span>
              <span className="contact-arrow-icon" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="contact-social-row">
            <a
              href="https://github.com/huwanwanwan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-chip"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
              <span className="contact-arrow-icon" aria-hidden="true">↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/juan-domanico-militante-88606b445/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-chip"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.75A1.62 1.62 0 1 0 9.45 8.37a1.62 1.62 0 0 0-1.62-1.62z" />
              </svg>
              <span>LinkedIn</span>
              <span className="contact-arrow-icon" aria-hidden="true">↗</span>
            </a>

            <a
              href="https://www.facebook.com/huwananan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-chip"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
              <span className="contact-arrow-icon" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Copy Email Button */}
          <div className="contact-copy-row">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="contact-copy-btn"
              aria-label="Copy email address"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-copy-icon" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>{copied ? "Copied to clipboard!" : "Copy email address"}</span>
            </button>
          </div>

          <hr className="contact-hub-divider" />

          {/* Resume Section */}
          <div className="contact-resume-block">
            <h2 className="contact-resume-title">My resume</h2>
            <p className="contact-resume-desc">
              My resume will be available for download soon. You can reach me directly for inquiries.
            </p>
            <div className="contact-resume-actions">
              <button
                type="button"
                className="contact-resume-btn disabled"
                title="Resume download coming soon"
                disabled
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-download-icon" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                <span>Download resume</span>
                <span className="contact-coming-soon-pill">Coming soon</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Write a Message Form Card */}
        <div className="contact-hub-right">
          <div className="contact-card-box">
            <div className="contact-card-header">
              <span className="contact-card-kicker">WRITE A MESSAGE</span>
              <span className="contact-card-required-hint">Fields marked with * are required.</span>
            </div>

            <form onSubmit={handleFormSubmit} className="contact-form-body">
              <div className="contact-form-row-2col">
                <div className="contact-field-group">
                  <label htmlFor="contact-name">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field-group">
                  <label htmlFor="contact-email">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-phone">
                  Phone <span className="contact-label-opt">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="contact-input"
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  maxLength={1000}
                  placeholder="Tell me about your project, idea, or role..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="contact-textarea"
                />
              </div>

              <div className="contact-form-bottom">
                <span className="contact-char-count">{formState.message.length}/1000</span>
                <button type="submit" className="contact-send-btn">
                  <span>Send message</span>
                  <span className="contact-arrow-icon" aria-hidden="true">↗</span>
                </button>
              </div>

              <p className="contact-form-footnote">
                Your email app will open with the message filled in directed to {emailAddress}.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
