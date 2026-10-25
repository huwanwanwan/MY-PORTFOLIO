export function TechIcon({ name }: { name: string }) {
  const norm = name.toLowerCase().trim();

  // Java Programming
  if (norm.includes("java") && !norm.includes("script")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path d="M7.7 17.5c4.7.4 9-.8 11.8-1.4l-.5 1.5c-4 1.3-9.5 1.7-13.8.5.8-.3 1.6-.4 2.5-.6z" fill="#E76F00" />
        <path d="M5.4 14.8c4.2.4 8-.7 10.5-1.3l-.5 1.4c-3.6 1.2-8.5 1.5-12.3.5.7-.3 1.5-.4 2.3-.6z" fill="#E76F00" />
        <path d="M12.3 8.3c1.2 1.3 1 2.5-.7 4.1-1.3 1.2-2.1 2.3-2.1 3.5 0 2 1.8 3.5 5 3.5 1.4 0 2.8-.3 4.2-.8l.4 1.4c-1.5.6-3.1.9-4.8.9-4.2 0-6.6-2.1-6.6-4.9 0-1.8 1.1-3.2 2.7-4.7 1.4-1.3 1.7-2.1.8-3.1-1.1-1.2-.5-2.6.2-3.8l1.3.7c-.6.9-1.2 2 .6 3.2z" fill="#5382A1" />
        <path d="M14.5 3.7c1.4 1.5 1.2 3-.8 4.8l-1.1-.9c1.5-1.4 1.7-2.4.6-3.5-.8-.9-.4-2 .2-3l1.3.7c-.4.7-.8 1.4.4 2.3c-.2-.2-.4-.2-.6-.4z" fill="#EA2D2E" />
      </svg>
    );
  }

  // Unity
  if (norm.includes("unity")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="currentColor" d="M10.4 14.4l-2.7 4.7-4.1-2.4L6 12 3.6 7.3l4.1-2.4 2.7 4.7h3.2L16.3 5l4.1 2.4L18 12l2.4 4.7-4.1 2.4-2.7-4.7h-3.2zm1.6-4l-2.1-3.7-2.1 1.2L9.3 11H12v-.6zm0 3.2H9.3l-1.5 3.1 2.1 1.2 2.1-3.7v-.6zm2.7-.6h2.7l1.5 3.1-2.1 1.2-2.1-3.7v-.6zm0-3.2v.6h2.7l1.5-3.1-2.1-1.2-2.1 3.7z" />
      </svg>
    );
  }

  // MS Access
  if (norm.includes("access")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect x="2" y="3" width="20" height="18" rx="3.5" fill="#A4373A" />
        <path d="M2 3h10v18H2z" fill="#BA141A" opacity="0.35" />
        <path d="M8.2 16.5l3.2-9h1.5l3.2 9h-1.6l-.8-2.4H10l-.8 2.4H8.2zm2.2-3.8h3l-1.5-4.4-1.5 4.4z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Arduino IDE
  if (norm.includes("arduino")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#00979C" d="M7 6A5.5 5.5 0 0 0 1.5 11.5 5.5 5.5 0 0 0 7 17c2.2 0 4.1-1.3 5.5-3.5 1.4 2.2 3.3 3.5 5.5 3.5a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 18 6c-2.2 0-4.1 1.3-5.5 3.5C11.1 7.3 9.2 6 7 6zm0 2.2c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3-1.8 0-3.3-1.5-3.3-3.3 0-1.8 1.5-3.3 3.3-3.3zm11 0c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3-1.8 0-3.3-1.5-3.3-3.3 0-1.8 1.5-3.3 3.3-3.3z" />
        <path stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" d="M5.5 11.5h3M16.5 11.5h3m-1.5-1.5v3" />
      </svg>
    );
  }

  // HTML
  if (norm.includes("html")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#E34F26" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" />
        <path fill="#EF652A" d="M12 3.6v16.7l5.9-1.5L19.3 3.6H12z" />
        <path fill="#EBEBEB" d="M12 8.1H7.8l.3 3.5h3.9v-3.5zm0 6.2l-2.6-.7-.2-1.9H7.2l.3 3.6 4.5 1.2v-2.2z" />
        <path fill="#FFFFFF" d="M12 8.1v3.5h3.6l-.3 3.9-3.3.9v2.3l4.5-1.2.6-7h-5.1z" />
      </svg>
    );
  }

  // CSS
  if (norm === "css" || norm.includes("css")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#1572B6" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" />
        <path fill="#33A9DC" d="M12 3.6v16.7l5.9-1.5L19.3 3.6H12z" />
        <path fill="#EBEBEB" d="M12 8.1H7.8l.2 2H12v-2zm0 4.1H8.2l.2 2H12v-2zm0 4.1l-2.4-.6-.2-1.4H7.3l.3 2.9 4.4 1.2v-2.1z" />
        <path fill="#FFFFFF" d="M12 8.1v2h3.9l-.2 2.1H12v2h3.6l-.3 3.3-3.3.9v2.1l4.5-1.2.6-7.1H12z" />
      </svg>
    );
  }

  // JavaScript / JS
  if (norm === "js" || norm.includes("javascript")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path fill="#000000" d="M7.7 18.2c.7.4 1.5.7 2.4.7 1.4 0 2.2-.7 2.2-2.1v-5.6H10v5.5c0 .6-.3.9-.9.9-.4 0-.8-.2-1.1-.4l-.3 1zm6.8 0c.9.5 2 .8 3.1.8 1.8 0 2.9-.9 2.9-2.3 0-1.3-.8-2-2.2-2.6l-.8-.3c-.8-.3-1.3-.7-1.3-1.3 0-.6.5-1.1 1.4-1.1.8 0 1.5.3 2 .6l.4-1.1c-.6-.4-1.4-.6-2.4-.6-1.7 0-2.7.9-2.7 2.2 0 1.2.7 1.9 2 2.4l.8.3c.9.4 1.5.8 1.5 1.5 0 .8-.7 1.3-1.7 1.3-.9 0-1.8-.3-2.4-.8l-.6 1.1z" />
      </svg>
    );
  }

  // MySQL
  if (norm.includes("mysql")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#00758F" d="M18.8 8.4c-.6-.8-1.5-1.4-2.5-1.6.4-.6.9-1.1 1.6-1.4-1.4-.1-2.7.4-3.7 1.3-1.5.1-3 .7-4.1 1.7C8.6 9.8 7.5 11.5 7 13.4c-.6 2.3-.3 4.8.8 6.9.3.6.8 1.2 1.3 1.7-1-.6-1.9-1.4-2.5-2.4-1.1-1.8-1.4-4-.8-6.1.6-2.1 2-3.9 3.8-5 1.5-.9 3.2-1.4 5-1.4.6 0 1.3.1 1.9.2-.5-.6-1.1-1-1.8-1.3 1.7-.1 3.3.6 4.4 1.8.8 1 1.2 2.2 1.2 3.5 0 .8-.2 1.6-.6 2.3l-.9-1.2c.4-.6.6-1.2.6-1.9 0-.7-.2-1.4-.6-2z" />
        <path fill="#F29111" d="M17.2 14c-.8-.5-1.7-.8-2.6-.9-.3 0-.7 0-1 .1 1 .5 2 1.2 2.8 2 .4.4.8.9 1.1 1.4.3-.7.4-1.5.4-2.2 0-.2 0-.3-.1-.4h-.6z" />
      </svg>
    );
  }

  // React.js / React
  if (norm.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );
  }

  // PHP
  if (norm.includes("php")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="11" ry="7.5" fill="#777BB4" />
        <path fill="#FFFFFF" d="M6 14.5l.8-5h2.4c1.1 0 1.8.6 1.6 1.7-.2 1.2-1.1 1.8-2.2 1.8h-1l-.4 2.5H6zm1.8-3.1h.7c.5 0 .9-.3 1-.8.1-.5-.2-.8-.7-.8h-.7l-.3 1.6zm4.4 3.1l.8-5h1.2l-.3 2.1h1.7l.3-2.1h1.2l-.8 5h-1.2l.3-2h-1.7l-.3 2h-1.2zm6.2 0l.8-5h2.4c1.1 0 1.8.6 1.6 1.7-.2 1.2-1.1 1.8-2.2 1.8h-1l-.4 2.5h-1.2zm1.8-3.1h.7c.5 0 .9-.3 1-.8.1-.5-.2-.8-.7-.8h-.7l-.3 1.6z" />
      </svg>
    );
  }

  // Kotlin
  if (norm.includes("kotlin")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <defs>
          <linearGradient id="kotlinGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0095D5" />
            <stop offset="30%" stopColor="#3C83DC" />
            <stop offset="60%" stopColor="#7F52FF" />
            <stop offset="85%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#E44857" />
          </linearGradient>
        </defs>
        <path fill="url(#kotlinGrad)" d="M22 2H2v20h20L12 12 22 2z" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#5FA04E" d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" />
        <path fill="#407633" d="M12 22l8.7-5V7L12 12v10z" opacity="0.3" />
        <path fill="#FFFFFF" d="M12 7.5c-2.5 0-3.5 1.5-3.5 3s1 2.5 2.5 3c1.5.5 2 1 2 1.8 0 .8-.7 1.2-1.8 1.2-1.2 0-2-.5-2.5-1.2l-1.3 1c.8 1.2 2 1.8 3.8 1.8 2.5 0 3.7-1.4 3.7-3.1 0-1.8-1.2-2.5-2.8-3-1.3-.4-1.8-.8-1.8-1.5 0-.7.6-1.2 1.6-1.2 1 0 1.8.4 2.2 1l1.3-1c-.7-1-1.8-1.8-3.2-1.8z" />
      </svg>
    );
  }

  // Tailwind
  if (norm.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  // Python
  if (norm.includes("python")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#3776AB" d="M11.9 2c-4 0-4.4 1.7-4.4 3.7V7.5h4.6v.7H4.4C2.4 8.2 1 9.7 1 12.2s1.4 3.8 3.4 3.8H6v-2.2c0-1.6 1.3-2.9 2.9-2.9h5.1c1.4 0 2.5-1.1 2.5-2.5V5.7C16.5 3.7 15.9 2 11.9 2zm-1.8 2.1c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
        <path fill="#FFD43B" d="M12.1 22c4 0 4.4-1.7 4.4-3.7v-1.8h-4.6v-.7h7.7c2 0 3.4-1.5 3.4-4s-1.4-3.8-3.4-3.8H18v2.2c0 1.6-1.3 2.9-2.9 2.9h-5.1c-1.4 0-2.5 1.1-2.5 2.5v2.7c0 2 .6 3.7 4.6 3.7zm1.8-2.1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
    );
  }

  // PLpgSQL / PostgreSQL
  if (norm.includes("plpgsql") || norm.includes("pgsql") || norm.includes("postgres")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#336791" d="M12.1 3c-4.4 0-7.8 3.2-8 7.5-.1 1.7.5 3.4 1.7 4.7.7.8 1.6 1.3 2.6 1.6v3.2h2.2v-2.8c.5.1 1 .1 1.5.1 4.5 0 8.1-3.6 8.1-8.1 0-3.4-2.8-6.2-8.1-6.2zm4.1 6.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
      </svg>
    );
  }

  // Git
  if (norm === "git" || norm.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path
          fill="#F05032"
          d="M21.6 11.1L12.9 2.4c-.5-.5-1.3-.5-1.8 0L9.2 4.3l2.3 2.3c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.2 2.2c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.6l-2.1-2.1v5.4c.1.1.3.2.4.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.3-.3.5-.4V9.1c-.2-.1-.3-.2-.5-.4-.4-.4-.5-1-.3-1.5L8.2 4.9 2.4 10.7c-.5.5-.5 1.3 0 1.8l8.7 8.7c.5.5 1.3.5 1.8 0l8.7-8.7c.5-.5.5-1.3 0-1.4z"
        />
      </svg>
    );
  }

  // Fallback
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tech-icon-svg" aria-hidden="true">
      <path d="M8 8l-4 4 4 4m8-8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
