"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickLinks?: { label: string; href: string }[];
}

const FAQ_PRESETS = [
  {
    id: "projects",
    query: "What are your featured projects?",
    answer:
      "Juan has developed 14+ projects across web, mobile, games, and IoT! Key highlights include:\n\n• **SigLa**: Offline-first Sign Language translator mobile app in Kotlin for speech/hearing-impaired communities.\n• **DocuLink**: Document request & digital tracking web management platform.\n• **InventoPOS**: Real-time inventory and point-of-sale retail system.\n• **Attack on PDM**: Augmented reality (AR) interactive mobile game in Unity & C#.\n• **La Niña Detector**: Arduino microcontroller sensor detecting acoustic rainfall triggers.",
    links: [
      { label: "View All Projects ↗", href: "/projects" },
      { label: "Explore SigLa Showcase ↗", href: "/#sigla-showcase" },
    ],
  },
  {
    id: "skills",
    query: "What is your core tech stack & skills?",
    answer:
      "Juan specializes in full-stack web and mobile development:\n\n• **Frontend & Web**: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, PHP.\n• **Mobile Development**: Kotlin, Android Studio, offline-first mobile architecture.\n• **Databases & Backend**: MySQL, PostgreSQL, relational schemas, RESTful APIs.\n• **Interactive & IoT**: Unity, C#, AR development, Arduino microcontrollers & RFID systems.",
    links: [
      { label: "Inspect Tech Stack ↗", href: "/skills" },
      { label: "See Experience ↗", href: "/experience" },
    ],
  },
  {
    id: "hire",
    query: "Are you available for freelance or job opportunities?",
    answer:
      "Yes! Juan is currently open to freelance contracts, collaboration projects, internships, and junior Web/Mobile Developer positions.\n\nWhether you need a responsive web platform, a modern mobile app, or a full system consultation, Juan delivers high-quality software with dedicated support under WANCOR.",
    links: [
      { label: "Send Direct Inquiry ↗", href: "/contact" },
      { label: "Email Juan ↗", href: "mailto:militantejuanenricodomanico@gmail.com" },
    ],
  },
  {
    id: "contact",
    query: "How can I contact Juan directly?",
    answer:
      "You can connect directly with Juan through several channels:\n\n• **Contact Hub**: Send a message directly on the /contact page with live 0-100% confirmation!\n• **Email**: militantejuanenricodomanico@gmail.com\n• **LinkedIn**: /in/juan-domanico-militante-88606b445/\n• **GitHub**: github.com/huwanwanwan\n• **Facebook**: facebook.com/huwananan",
    links: [
      { label: "Open Contact Hub ↗", href: "/contact" },
      { label: "Connect on LinkedIn ↗", href: "https://www.linkedin.com/in/juan-domanico-militante-88606b445/" },
    ],
  },
  {
    id: "bio",
    query: "Tell me about Juan's background & education",
    answer:
      "**Juan Domanico Militante** is studying **Bachelor of Science in Information Technology** (BSIT) at **Pambayang Dalubhasaan ng Marilao** (PDM) in the Philippines.\n\nWith 4+ years of dedicated academic and practical software engineering study, he focuses on user-centric usability, high-performance architecture, and purposeful digital tools under the WANCOR brand.",
    links: [
      { label: "Read Full Bio ↗", href: "/about" },
      { label: "View Certifications ↗", href: "/experience#credentials" },
    ],
  },
];

export default function FaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! 👋 I'm Juan's virtual assistant at **WANCOR**.\n\nHow can I help you today? Tap any of the popular FAQs below or type your question!",
      timestamp: "Just now",
      quickLinks: [
        { label: "Projects", href: "/projects" },
        { label: "Skills", href: "/skills" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Handle FAQ Chip click
  const handleSelectFaq = (faqId: string) => {
    const selected = FAQ_PRESETS.find((f) => f.id === faqId);
    if (!selected) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: selected.query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: "b-" + Date.now(),
        sender: "bot",
        text: selected.answer,
        timestamp: "Just now",
        quickLinks: selected.links,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  // Freeform user query handling
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Keyword matching logic
    setTimeout(() => {
      const q = query.toLowerCase();
      let answerText = "";
      let links: { label: string; href: string }[] | undefined;

      if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("built") || q.includes("app")) {
        const p = FAQ_PRESETS.find((f) => f.id === "projects")!;
        answerText = p.answer;
        links = p.links;
      } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("react") || q.includes("kotlin") || q.includes("language")) {
        const s = FAQ_PRESETS.find((f) => f.id === "skills")!;
        answerText = s.answer;
        links = s.links;
      } else if (q.includes("hire") || q.includes("freelance") || q.includes("job") || q.includes("work with") || q.includes("rate") || q.includes("available")) {
        const h = FAQ_PRESETS.find((f) => f.id === "hire")!;
        answerText = h.answer;
        links = h.links;
      } else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("message")) {
        const c = FAQ_PRESETS.find((f) => f.id === "contact")!;
        answerText = c.answer;
        links = c.links;
      } else if (q.includes("who") || q.includes("about") || q.includes("education") || q.includes("school") || q.includes("plmar") || q.includes("pdm") || q.includes("dalubhasaan") || q.includes("bsit") || q.includes("marilao")) {
        const b = FAQ_PRESETS.find((f) => f.id === "bio")!;
        answerText = b.answer;
        links = b.links;
      } else if (q.includes("sigla")) {
        answerText =
          "**SigLa** (Sign Language Translator) is one of Juan's major mobile projects! Built in Kotlin for Android, it empowers deaf and speech-impaired individuals with offline-first translation, intuitive gesture recognition, and accessibility workflows.";
        links = [{ label: "View SigLa on Home ↗", href: "/#sigla-showcase" }];
      } else if (q.includes("doculink")) {
        answerText =
          "**DocuLink** is an end-to-end web document processing and request tracking system developed by Juan. It helps educational and corporate institutions automate paperless requests and track dispatch status in real time.";
        links = [{ label: "Explore Projects ↗", href: "/projects" }];
      } else if (q.includes("cv") || q.includes("resume") || q.includes("download")) {
        answerText =
          "You can review Juan's verified credentials, project timelines, and technical summary directly on the Experience page or request his formal CV through the Contact Hub!";
        links = [
          { label: "View Experience & Credentials ↗", href: "/experience" },
          { label: "Contact Juan for CV ↗", href: "/contact" },
        ];
      } else {
        answerText =
          "Thanks for reaching out! While I may not have the exact answer for that specific question, Juan would be happy to discuss it with you directly. You can send him a message through the Contact Hub or reach out via email!";
        links = [
          { label: "Go to Contact Hub ↗", href: "/contact" },
          { label: "Email Directly ↗", href: "mailto:militantejuanenricodomanico@gmail.com" },
        ];
      }

      const botMsg: ChatMessage = {
        id: "b-" + Date.now(),
        sender: "bot",
        text: answerText,
        timestamp: "Just now",
        quickLinks: links,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <aside className="chatbot-floating-root" aria-label="Wancor Assistant & FAQ Chatbot">
      {/* Floating Circle Button */}
      <button
        type="button"
        className={`chatbot-fab-btn ${isOpen ? "active-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="wancor-faq-chat-window"
        aria-label={isOpen ? "Close FAQ Chatbot" : "Open Wancor FAQ Chatbot"}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="fab-icon-wrapper">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="fab-sparkle" aria-hidden="true">✦</span>
          </div>
        )}

        {/* Pulse Dot indicator when closed */}
        {!isOpen && unreadBadge && (
          <span className="fab-online-dot" aria-label="Online status">
            <span className="fab-pulse-ring" />
          </span>
        )}
      </button>

      {/* Greeting Bubble Prompt (visible before first click) */}
      {!isOpen && unreadBadge && (
        <div className="chatbot-teaser-pill" onClick={() => setIsOpen(true)}>
          <span className="teaser-wave">👋</span>
          <span className="teaser-text">Have questions? Ask Juan&apos;s FAQ bot!</span>
          <button
            type="button"
            className="teaser-close"
            onClick={(e) => {
              e.stopPropagation();
              setUnreadBadge(false);
            }}
            aria-label="Dismiss chat prompt"
          >
            ×
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <section
          id="wancor-faq-chat-window"
          className="chatbot-window"
          role="dialog"
          aria-labelledby="chatbot-header-title"
        >
          {/* Header Bar */}
          <header className="chatbot-window-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-wrap">
                <Image
                  src="/tab-logo.png"
                  alt="WANCOR Assistant"
                  width={34}
                  height={34}
                  className="chatbot-avatar-img"
                />
                <span className="chatbot-online-indicator" aria-hidden="true" />
              </div>
              <div>
                <h3 id="chatbot-header-title" className="chatbot-title">
                  WANCOR Assistant
                </h3>
                <p className="chatbot-status">Juan&apos;s Portfolio AI &amp; FAQ • Online</p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-action-icon"
                onClick={() =>
                  setMessages([
                    {
                      id: "welcome-reset",
                      sender: "bot",
                      text: "Chat cleared! How else can I assist you with Juan's portfolio?",
                      timestamp: "Just now",
                    },
                  ])
                }
                title="Restart Chat"
                aria-label="Restart Chat"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>

              <button
                type="button"
                className="chatbot-action-icon"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                aria-label="Close Chat"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Quick FAQ Suggestion Chips Strip */}
          <div className="chatbot-chips-bar" aria-label="Quick FAQ questions">
            <span className="chips-label">Quick FAQs:</span>
            <div className="chips-scroll">
              {FAQ_PRESETS.map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  className="faq-chip-btn"
                  onClick={() => handleSelectFaq(faq.id)}
                >
                  {faq.query}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="chatbot-messages-container" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="bot-tiny-avatar" aria-hidden="true">
                    W
                  </div>
                )}
                <div className={`chat-bubble ${msg.sender}`}>
                  <div className="chat-bubble-text">
                    {msg.text.split("\n").map((line, lIdx) => {
                      if (!line) return <br key={lIdx} />;
                      // Simple bold renderer
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={lIdx} className="bubble-paragraph">
                          {parts.map((p, pIdx) => {
                            if (p.startsWith("**") && p.endsWith("**")) {
                              return <strong key={pIdx}>{p.slice(2, -2)}</strong>;
                            }
                            return p;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {msg.quickLinks && msg.quickLinks.length > 0 && (
                    <div className="bubble-links-grid">
                      {msg.quickLinks.map((link, kIdx) => (
                        <Link
                          key={kIdx}
                          href={link.href}
                          className="bubble-action-link"
                          onClick={() => {
                            if (link.href.startsWith("/")) {
                              // keep chat open or user can navigate
                            }
                          }}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className="bubble-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row bot">
                <div className="bot-tiny-avatar" aria-hidden="true">
                  W
                </div>
                <div className="chat-bubble bot typing-indicator-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Bar */}
          <form onSubmit={handleSendMessage} className="chatbot-input-bar">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question (e.g. skills, projects)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="chatbot-input-field"
              aria-label="Ask chatbot a question"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="chatbot-send-btn"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </aside>
  );
}

