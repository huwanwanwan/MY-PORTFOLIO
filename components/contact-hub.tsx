"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactHub() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [sendProgress, setSendProgress] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Email suggestions & autocomplete state
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
  const emailAddress = "militantejuanenricodomanico@gmail.com";

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim());

  // Autocomplete suggestion generator
  const handleEmailChange = (val: string) => {
    setFormState((prev) => ({ ...prev, email: val }));
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (!trimmed.includes("@")) {
      setEmailSuggestions(emailDomains.map((d) => `${trimmed}@${d}`));
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    } else {
      const [user, domainPart] = trimmed.split("@");
      if (user && domainPart !== undefined) {
        const filtered = emailDomains
          .filter((d) => d.startsWith(domainPart.toLowerCase()) && d !== domainPart.toLowerCase())
          .map((d) => `${user}@${d}`);
        setEmailSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setActiveSuggestionIndex(-1);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setFormState((prev) => ({ ...prev, email: suggestion }));
    setShowSuggestions(false);
    setEmailSuggestions([]);
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleKeyDownEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || emailSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % emailSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev - 1 + emailSuggestions.length) % emailSuggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < emailSuggestions.length) {
        e.preventDefault();
        selectSuggestion(emailSuggestions[activeSuggestionIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        emailInputRef.current &&
        !emailInputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildTemplateBody = (name?: string, email?: string, phone?: string, subject?: string, message?: string) => {
    return [
      "Hello Juan (Wancor),",
      "",
      "I would like to discuss a project / inquiry with Wancor:",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "PROJECT / INQUIRY DETAILS:",
      `• Inquiry Subject: ${subject?.trim() || "[Web Development / Mobile App / Consultation]"}`,
      "• Target Timeline: [e.g. 2-4 weeks / Flexible]",
      "• Approximate Scope / Goals:",
      `${message?.trim() || "[Please outline what you would like to build or discuss]"}`,
      "",
      "CLIENT / SENDER INFORMATION:",
      `• Full Name: ${name?.trim() || "[Your Name]"}`,
      `• Email Address: ${email?.trim() || "[Your Email]"}`,
      `• Contact Phone: ${phone?.trim() || "[Your Phone / WhatsApp]"}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Dispatched via Wancor Portfolio Contact Hub",
    ].join("\n");
  };

  const getGmailComposeUrl = (name?: string, email?: string, phone?: string, subject?: string, message?: string) => {
    const su = encodeURIComponent(
      subject?.trim()
        ? `[Wancor] ${subject.trim()} - from ${name?.trim() || "Client"}`
        : "[Wancor] Project Inquiry / Collaboration"
    );
    const body = encodeURIComponent(buildTemplateBody(name, email, phone, subject, message));
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${su}&body=${body}`;
  };

  const getMailtoUrl = (name?: string, email?: string, phone?: string, subject?: string, message?: string) => {
    const su = encodeURIComponent(
      subject?.trim()
        ? `[Wancor] ${subject.trim()} - from ${name?.trim() || "Client"}`
        : "[Wancor] Project Inquiry / Collaboration"
    );
    const body = encodeURIComponent(buildTemplateBody(name, email, phone, subject, message));
    return `mailto:${emailAddress}?subject=${su}&body=${body}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setSendProgress(8);

    // Fast progress timer to animate up to 92% in ~300ms
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 350) {
        const p = Math.min(92, Math.round(8 + (elapsed / 350) * 84));
        setSendProgress(p);
      }
    }, 20);

    const dispatchTask = async () => {
      let sent = false;

      // 1. Primary dispatch: Direct EmailJS with Wancor branding, 'W' logo, and orange table
      try {
        emailjs.init({ publicKey: "kUDnhN5l63awEUq0y" });

        let res;
        try {
          res = await emailjs.send(
            "service_azcv23s",
            "template_3zl7lsk",
            {
              from_name: formState.name,
              from_email: formState.email,
              phone: formState.phone || "Not provided",
              subject: formState.subject || "General Project Discussion",
              message: formState.message,
            },
            { publicKey: "kUDnhN5l63awEUq0y" }
          );
        } catch (errPrimary) {
          console.warn("EmailJS primary template attempt notice:", errPrimary);
          // Fallback to secondary template ID if configured
          res = await emailjs.send(
            "service_azcv23s",
            "es1ha4f",
            {
              from_name: formState.name,
              from_email: formState.email,
              phone: formState.phone || "Not provided",
              subject: formState.subject || "General Project Discussion",
              message: formState.message,
            },
            { publicKey: "kUDnhN5l63awEUq0y" }
          );
        }

        if (res && res.status === 200) {
          sent = true;
        }
      } catch (err) {
        console.warn("EmailJS browser dispatch notice:", err);
      }

      // 2. Silent background fallback: Sends directly via Wancor relay with autoresponse back to user
      if (!sent) {
        try {
          const response = await fetch("https://formsubmit.co/ajax/militantejuanenricodomanico@gmail.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: `Wancor (${formState.name})`,
              email: formState.email,
              _replyto: formState.email,
              _subject: formState.subject
                ? `[Wancor] ${formState.subject} - from ${formState.name}`
                : `[Wancor] Project Inquiry from ${formState.name}`,
              _template: "box",
              _captcha: "false",
              _autoresponse: `Hello ${formState.name},\n\nThank you for reaching out to Wancor! We have received your project inquiry and will review your specifications promptly.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nWancor (Wan Company)\nWeb & Mobile Software Development\nOfficial Logo: https://portfolio.juandomanicomilitante.workers.dev/tab-logo.png\nWebsite: https://portfolio.juandomanicomilitante.workers.dev\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
              "Brand / Company": "Wancor",
              "Official Logo": "https://portfolio.juandomanicomilitante.workers.dev/tab-logo.png",
              "Client Name": formState.name,
              "Client Email": formState.email,
              "Contact Phone": formState.phone || "Not provided",
              "Inquiry Subject": formState.subject || "General Project Discussion",
              "Message Details": formState.message,
              "Platform Source": "Wancor Portfolio Contact Hub",
            }),
          });

          if (response.ok) {
            sent = true;
          }
        } catch (fallbackErr) {
          console.error("Background dispatch fallback error:", fallbackErr);
        }
      }

      return sent;
    };

    // Fast completion delay (~450ms) so users don't wait long
    const minDelay = new Promise((resolve) => setTimeout(resolve, 450));
    const [sent] = await Promise.all([dispatchTask(), minDelay]);

    clearInterval(progressInterval);
    setSendProgress(100);

    // Brief 120ms pause at 100% so user clearly sees full completion
    await new Promise((resolve) => setTimeout(resolve, 140));

    if (sent) {
      setFormStatus("success");
      setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
      setShowSuggestions(false);
    } else {
      setFormStatus("error");
    }
  };

  return (
    <section
      className="section-block content-section contact-signature-section scroll-reveal"
      id="contact"
      data-scroll-reveal
      aria-labelledby="contact-heading"
    >
      {/* Centered Editorial Header */}
      <div className="contact-hero-header">
        <p className="editorial-eyebrow">
          <span className="editorial-eyebrow-dot" aria-hidden="true" />
          LET&apos;S CONNECT &amp; BUILD
        </p>
        <h1 id="contact-heading" className="editorial-title">
          Let&apos;s start a conversation,
          <br />
          <span className="contact-statement-outline">open for opportunities</span> &amp; projects.
        </h1>
        <p className="contact-subtitle">
          Have an exciting project, collaboration inquiry, or question? Feel free to reach out directly through any channel or send a message below.
        </p>
      </div>

      <div className="contact-centered-wrapper">
        {/* Direct Channel Cards (Centered Row) */}
        <div className="contact-channels-grid">
          {/* Email Direct Channel Card */}
          <div className="contact-channel-card contact-channel-primary">
            <div className="channel-icon-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="channel-info">
              <span className="channel-label">Direct Email (Wancor)</span>
              <a
                href={getGmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-value email-value"
                title="Open formatted request template in Gmail"
              >
                {emailAddress}
              </a>
            </div>
            <div className="channel-actions">
              <a
                href={getGmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-action-btn email-send-btn"
                title="Open pre-formatted template in Gmail"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                <span>Open in Gmail</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href={getMailtoUrl()}
                className="channel-action-btn mail-client-btn"
                title="Open in default mail client with template"
              >
                <span>Mail App</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`channel-action-btn copy-btn ${copied ? "copied" : ""}`}
                aria-label="Copy email address"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="contact-channel-card">
            <div className="channel-icon-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <div className="channel-info">
              <span className="channel-label">Social &amp; Professional Profiles</span>
              <span className="channel-subtext">Connect, follow, or explore my code repositories</span>
            </div>
            <div className="social-pills-cluster">
              <a
                href="https://github.com/huwanwanwan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-brand-pill github-pill"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
                <span className="pill-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/juan-domanico-militante-88606b445/?isSelfProfile=true"
                target="_blank"
                rel="noopener noreferrer"
                className="social-brand-pill linkedin-pill"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.75A1.62 1.62 0 1 0 9.45 8.37a1.62 1.62 0 0 0-1.62-1.62z" />
                </svg>
                <span>LinkedIn</span>
                <span className="pill-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href="https://www.facebook.com/huwananan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-brand-pill facebook-pill"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
                <span className="pill-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Centered Message Card with Loading Overlay */}
        <div className="contact-main-card">
          {/* Loading Animation Overlay */}
          {formStatus === "submitting" && (
            <div className="form-dispatching-overlay" role="status" aria-live="polite">
              <div className="dispatching-card">
                <div className="dispatching-spinner-wrap">
                  <div className="dispatching-spinner-ring" />
                  <Image
                    src="/tab-logo.png"
                    alt="Wancor Logo"
                    width={48}
                    height={48}
                    className="dispatch-logo-img"
                  />
                </div>
                <h4 className="dispatching-title">Sending Message to Wancor</h4>
                <p className="dispatching-subtitle">
                  Packaging your inquiry specifications and delivering directly to Juan&apos;s Gmail inbox...
                </p>
                <div className="dispatch-progress-section">
                  <div className="dispatch-progress-header">
                    <span className="dispatch-progress-status">
                      {sendProgress < 100 ? "Uploading & Dispatching..." : "Dispatched Successfully!"}
                    </span>
                    <span className="dispatch-progress-percent">{Math.round(sendProgress)}%</span>
                  </div>
                  <div className="dispatch-progress-track">
                    <div
                      className="dispatch-progress-fill"
                      style={{ width: `${Math.min(100, Math.max(0, sendProgress))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card-top-decoration" aria-hidden="true">
            <span className="card-corner-line" />
            <span className="card-badge">DIRECT INQUIRY DISPATCH (WANCOR)</span>
            <span className="card-corner-line" />
          </div>

          <div className="card-intro-text">
            <h3>Send a Message</h3>
            <p>
              Send directly to Wancor right here on this page. You will receive an immediate confirmation.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="contact-styled-form">
            <div className="form-grid-row">
              <div className="form-group">
                <label htmlFor="contact-sender-name">
                  Your Name <span className="req-star">*</span>
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="styled-input"
                />
              </div>

              <div className="form-group email-input-container">
                <label htmlFor="contact-sender-email">
                  Your Email <span className="req-star">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    ref={emailInputRef}
                    id="contact-sender-email"
                    type="email"
                    required
                    placeholder="e.g. maria@example.com"
                    value={formState.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onKeyDown={handleKeyDownEmail}
                    onFocus={() => {
                      if (formState.email.trim() && emailSuggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    autoComplete="off"
                    className="styled-input"
                    style={{ paddingRight: isEmailValid ? "38px" : "14px" }}
                  />

                  {/* Valid Email Format Indicator */}
                  {isEmailValid && (
                    <svg className="email-valid-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Valid email format">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}

                  {/* Autocomplete Email Suggestions Dropdown */}
                  {showSuggestions && emailSuggestions.length > 0 && (
                    <div ref={dropdownRef} className="email-suggestions-dropdown" role="listbox">
                      {emailSuggestions.map((suggestion, index) => {
                        const [userPart, domainPart] = suggestion.split("@");
                        const isSelected = index === activeSuggestionIndex;
                        return (
                          <button
                            key={suggestion}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={`email-suggestion-item ${isSelected ? "active" : ""}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              selectSuggestion(suggestion);
                            }}
                          >
                            <span>
                              {userPart}@<span className="suggestion-domain">{domainPart}</span>
                            </span>
                            <span className="suggestion-hint">Select ↵</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-grid-row">
              <div className="form-group">
                <label htmlFor="contact-sender-phone">
                  Phone Number <span className="opt-tag">(optional)</span>
                </label>
                <input
                  id="contact-sender-phone"
                  type="tel"
                  placeholder="e.g. +63 912 345 6789"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="styled-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-sender-subject">
                  Subject <span className="opt-tag">(optional)</span>
                </label>
                <input
                  id="contact-sender-subject"
                  type="text"
                  placeholder="e.g. Collaboration on a new web app"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="styled-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="textarea-label-row">
                <label htmlFor="contact-sender-message">
                  Message Details <span className="req-star">*</span>
                </label>
                <span className="char-counter">{formState.message.length} / 1000</span>
              </div>
              <textarea
                id="contact-sender-message"
                required
                rows={5}
                maxLength={1000}
                placeholder="Share your ideas, project timeline, technical requirements, or inquiry..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="styled-textarea"
              />
            </div>

            {formStatus === "success" && (
              <div className="contact-status-banner success">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Thank you! Your message was sent directly to Wancor. A confirmation has been dispatched to your email.</span>
              </div>
            )}

            {formStatus === "error" && (
              <div className="contact-status-banner error" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>Unable to send message right now. Please check your internet connection and try again.</span>
              </div>
            )}

            <div className="form-footer-action">
              <div className="form-security-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Directly delivers to Wancor with instant email confirmation</span>
              </div>

              <button
                type="submit"
                className="submit-dispatch-btn"
                disabled={formStatus === "submitting"}
              >
                <span>{formStatus === "submitting" ? `Sending... ${Math.round(sendProgress)}%` : "Send Message"}</span>
                <span className="dispatch-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        </div>

        {/* Centered Resume Highlight Card */}
        <div className="contact-resume-card scroll-reveal" data-scroll-reveal>
          <div className="resume-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="resume-text-content">
            <h4>Curriculum Vitae / Resume</h4>
            <p>
              My complete professional CV with academic background, tech competencies, and project portfolio is ready for instant download or printing.
            </p>
          </div>
          <div className="resume-btn-wrap">
            <a
              href="/Juan_Militante_CV.html"
              target="_blank"
              rel="noopener noreferrer"
              download="Juan_Militante_CV.html"
              className="resume-pill-btn resume-pill-btn-active"
              title="Download Juan Militante CV"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>Download Resume</span>
              <span className="status-badge">Ready</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
