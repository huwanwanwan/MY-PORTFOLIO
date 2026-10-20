"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { skills, categoryColors, type Skill } from "../data/skills-data";
import { projectsData, type ProjectItem } from "../data/projects-data";

/* ─── Individual Skill Icon (brand-colored SVG logos) ─── */
function SkillIcon({ name }: { name: string }) {
  const n = name.toLowerCase().trim();

  // HTML
  if (n === "html")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#E34F26" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" />
        <path fill="#EF652A" d="M12 3.6v16.7l5.9-1.5L19.3 3.6H12z" />
        <path fill="#EBEBEB" d="M12 8.1H7.8l.3 3.5h3.9v-3.5zm0 6.2l-2.6-.7-.2-1.9H7.2l.3 3.6 4.5 1.2v-2.2z" />
        <path fill="#FFFFFF" d="M12 8.1v3.5h3.6l-.3 3.9-3.3.9v2.3l4.5-1.2.6-7h-5.1z" />
      </svg>
    );

  // CSS
  if (n === "css")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#1572B6" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" />
        <path fill="#33A9DC" d="M12 3.6v16.7l5.9-1.5L19.3 3.6H12z" />
        <path fill="#EBEBEB" d="M12 8.1H7.8l.2 2H12v-2zm0 4.1H8.2l.2 2H12v-2zm0 4.1l-2.4-.6-.2-1.4H7.3l.3 2.9 4.4 1.2v-2.1z" />
        <path fill="#FFFFFF" d="M12 8.1v2h3.9l-.2 2.1H12v2h3.6l-.3 3.3-3.3.9v2.1l4.5-1.2.6-7.1H12z" />
      </svg>
    );

  // Tailwind CSS
  if (n.includes("tailwind"))
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );

  // JavaScript
  if (n === "javascript" || n === "js")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path fill="#000000" d="M7.7 18.2c.7.4 1.5.7 2.4.7 1.4 0 2.2-.7 2.2-2.1v-5.6H10v5.5c0 .6-.3.9-.9.9-.4 0-.8-.2-1.1-.4l-.3 1zm6.8 0c.9.5 2 .8 3.1.8 1.8 0 2.9-.9 2.9-2.3 0-1.3-.8-2-2.2-2.6l-.8-.3c-.8-.3-1.3-.7-1.3-1.3 0-.6.5-1.1 1.4-1.1.8 0 1.5.3 2 .6l.4-1.1c-.6-.4-1.4-.6-2.4-.6-1.7 0-2.7.9-2.7 2.2 0 1.2.7 1.9 2 2.4l.8.3c.9.4 1.5.8 1.5 1.5 0 .8-.7 1.3-1.7 1.3-.9 0-1.8-.3-2.4-.8l-.6 1.1z" />
      </svg>
    );

  // React
  if (n === "react")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );

  // Java
  if (n === "java")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path d="M7.7 17.5c4.7.4 9-.8 11.8-1.4l-.5 1.5c-4 1.3-9.5 1.7-13.8.5.8-.3 1.6-.4 2.5-.6z" fill="#E76F00" />
        <path d="M5.4 14.8c4.2.4 8-.7 10.5-1.3l-.5 1.4c-3.6 1.2-8.5 1.5-12.3.5.7-.3 1.5-.4 2.3-.6z" fill="#E76F00" />
        <path d="M12.3 8.3c1.2 1.3 1 2.5-.7 4.1-1.3 1.2-2.1 2.3-2.1 3.5 0 2 1.8 3.5 5 3.5 1.4 0 2.8-.3 4.2-.8l.4 1.4c-1.5.6-3.1.9-4.8.9-4.2 0-6.6-2.1-6.6-4.9 0-1.8 1.1-3.2 2.7-4.7 1.4-1.3 1.7-2.1.8-3.1-1.1-1.2-.5-2.6.2-3.8l1.3.7c-.6.9-1.2 2 .6 3.2z" fill="#5382A1" />
        <path d="M14.5 3.7c1.4 1.5 1.2 3-.8 4.8l-1.1-.9c1.5-1.4 1.7-2.4.6-3.5-.8-.9-.4-2 .2-3l1.3.7c-.4.7-.8 1.4.4 2.3c-.2-.2-.4-.2-.6-.4z" fill="#EA2D2E" />
      </svg>
    );

  // Node.js
  if (n.includes("node"))
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#5FA04E" d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" />
        <path fill="#407633" d="M12 22l8.7-5V7L12 12v10z" opacity="0.3" />
        <path fill="#FFFFFF" d="M12 7.5c-2.5 0-3.5 1.5-3.5 3s1 2.5 2.5 3c1.5.5 2 1 2 1.8 0 .8-.7 1.2-1.8 1.2-1.2 0-2-.5-2.5-1.2l-1.3 1c.8 1.2 2 1.8 3.8 1.8 2.5 0 3.7-1.4 3.7-3.1 0-1.8-1.2-2.5-2.8-3-1.3-.4-1.8-.8-1.8-1.5 0-.7.6-1.2 1.6-1.2 1 0 1.8.4 2.2 1l1.3-1c-.7-1-1.8-1.8-3.2-1.8z" />
      </svg>
    );

  // Express
  if (n === "express")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <text x="3" y="16" fontFamily="monospace" fontSize="10" fontWeight="900" fill="currentColor">eX</text>
      </svg>
    );

  // PHP
  if (n === "php")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="11" ry="7.5" fill="#777BB4" />
        <path fill="#FFFFFF" d="M6 14.5l.8-5h2.4c1.1 0 1.8.6 1.6 1.7-.2 1.2-1.1 1.8-2.2 1.8h-1l-.4 2.5H6zm1.8-3.1h.7c.5 0 .9-.3 1-.8.1-.5-.2-.8-.7-.8h-.7l-.3 1.6zm4.4 3.1l.8-5h1.2l-.3 2.1h1.7l.3-2.1h1.2l-.8 5h-1.2l.3-2h-1.7l-.3 2h-1.2zm6.2 0l.8-5h2.4c1.1 0 1.8.6 1.6 1.7-.2 1.2-1.1 1.8-2.2 1.8h-1l-.4 2.5h-1.2zm1.8-3.1h.7c.5 0 .9-.3 1-.8.1-.5-.2-.8-.7-.8h-.7l-.3 1.6z" />
      </svg>
    );

  // Python
  if (n === "python")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#3776AB" d="M11.9 2c-4 0-4.4 1.7-4.4 3.7V7.5h4.6v.7H4.4C2.4 8.2 1 9.7 1 12.2s1.4 3.8 3.4 3.8H6v-2.2c0-1.6 1.3-2.9 2.9-2.9h5.1c1.4 0 2.5-1.1 2.5-2.5V5.7C16.5 3.7 15.9 2 11.9 2zm-1.8 2.1c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
        <path fill="#FFD43B" d="M12.1 22c4 0 4.4-1.7 4.4-3.7v-1.8h-4.6v-.7h7.7c2 0 3.4-1.5 3.4-4s-1.4-3.8-3.4-3.8H18v2.2c0 1.6-1.3 2.9-2.9 2.9h-5.1c-1.4 0-2.5 1.1-2.5 2.5v2.7c0 2 .6 3.7 4.6 3.7zm1.8-2.1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
    );

  // Kotlin
  if (n === "kotlin")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <defs>
          <linearGradient id="kotlinG" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0095D5" />
            <stop offset="30%" stopColor="#3C83DC" />
            <stop offset="60%" stopColor="#7F52FF" />
            <stop offset="85%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#E44857" />
          </linearGradient>
        </defs>
        <path fill="url(#kotlinG)" d="M22 2H2v20h20L12 12 22 2z" />
      </svg>
    );

  // MySQL
  if (n === "mysql")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#00758F" d="M18.8 8.4c-.6-.8-1.5-1.4-2.5-1.6.4-.6.9-1.1 1.6-1.4-1.4-.1-2.7.4-3.7 1.3-1.5.1-3 .7-4.1 1.7C8.6 9.8 7.5 11.5 7 13.4c-.6 2.3-.3 4.8.8 6.9.3.6.8 1.2 1.3 1.7-1-.6-1.9-1.4-2.5-2.4-1.1-1.8-1.4-4-.8-6.1.6-2.1 2-3.9 3.8-5 1.5-.9 3.2-1.4 5-1.4.6 0 1.3.1 1.9.2-.5-.6-1.1-1-1.8-1.3 1.7-.1 3.3.6 4.4 1.8.8 1 1.2 2.2 1.2 3.5 0 .8-.2 1.6-.6 2.3l-.9-1.2c.4-.6.6-1.2.6-1.9 0-.7-.2-1.4-.6-2z" />
        <path fill="#F29111" d="M17.2 14c-.8-.5-1.7-.8-2.6-.9-.3 0-.7 0-1 .1 1 .5 2 1.2 2.8 2 .4.4.8.9 1.1 1.4.3-.7.4-1.5.4-2.2 0-.2 0-.3-.1-.4h-.6z" />
      </svg>
    );

  // PostgreSQL
  if (n === "postgresql" || n === "postgres")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#336791" d="M12.1 3c-4.4 0-7.8 3.2-8 7.5-.1 1.7.5 3.4 1.7 4.7.7.8 1.6 1.3 2.6 1.6v3.2h2.2v-2.8c.5.1 1 .1 1.5.1 4.5 0 8.1-3.6 8.1-8.1 0-3.4-2.8-6.2-8.1-6.2zm4.1 6.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
      </svg>
    );

  // MongoDB
  if (n === "mongodb")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#47A248" d="M12 2C12 2 8 8 8 13c0 3 1.8 5.5 4 6v1h.5v-1.1c2.2-.5 3.5-3 3.5-5.9 0-5-4-11-4-11z" />
        <path fill="#3B9837" d="M12 2s4 6 4 11c0 2.9-1.3 5.4-3.5 5.9V20H12V2z" opacity="0.6" />
        <rect x="11.5" y="18" width="1" height="4" rx="0.5" fill="#A6D388" />
      </svg>
    );

  // Supabase
  if (n === "supabase")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#3ECF8E" d="M13.5 21.5c-.5.7-1.6.3-1.6-.5V14h8.6c1.2 0 1.8 1.4 1 2.2l-8 5.3z" />
        <path fill="#3ECF8E" opacity="0.5" d="M10.5 2.5c.5-.7 1.6-.3 1.6.5V10H3.5c-1.2 0-1.8-1.4-1-2.2l8-5.3z" />
      </svg>
    );

  // Firebase
  if (n === "firebase")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#FFA000" d="M5.2 18.4L7.5 3.7c.1-.5.7-.6.9-.2l2.4 4.5-5.6 10.4z" />
        <path fill="#F57C00" d="M13.6 10.8l-2.8-5.3L5.2 18.4 13.6 10.8z" />
        <path fill="#FFCA28" d="M18.8 18.4L16.8 4.7c-.1-.5-.5-.7-.9-.4L5.2 18.4 11.7 22c.4.2.9.2 1.3 0l5.8-3.6z" />
        <path fill="#FFFFFF" opacity="0.25" d="M18.8 18.4L16.8 4.7c-.1-.5-.5-.7-.9-.4L5.2 18.4l6.5 3.6c.4.2.9.2 1.3 0l5.8-3.6z" />
      </svg>
    );

  // MariaDB
  if (n === "mariadb")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#003545" d="M12 4c-3.3 0-6 2.7-6 6v4c0 3.3 2.7 6 6 6s6-2.7 6-6v-4c0-3.3-2.7-6-6-6z" />
        <path fill="#C0765A" d="M12 6c-2.2 0-4 1.8-4 4v3c0 2.2 1.8 4 4 4s4-1.8 4-4v-3c0-2.2-1.8-4-4-4z" />
      </svg>
    );

  // Dart
  if (n === "dart")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#01579B" d="M4.7 4.7l2.7-.6L18.8 15.5l.6 3.9-4.8.5L4.7 4.7z" />
        <path fill="#40C4FF" d="M19.4 19.4l-.6-3.9L7.4 4.1 4.7 4.7l9.9 15.2 4.8-.5z" />
        <path fill="#29B6F6" d="M4.7 4.7L14.6 19.9l4.8-.5L7.4 4.1 4.7 4.7z" opacity="0.3" />
      </svg>
    );

  // Flutter
  if (n === "flutter")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#02569B" d="M14.4 2L3 12.9l3.5 3.5L20.7 2h-6.3zM14.4 12.3L9.7 17l3.5 3.5 1.2 1.5h6.3l-4.8-4.9-1.5-4.8z" />
        <path fill="#13B9FD" d="M9.7 17l4.7-4.7 1.5 4.8L9.7 17z" opacity="0.6" />
      </svg>
    );

  // C#
  if (n === "c#")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#68217A" />
        <text x="12" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#FFFFFF">C#</text>
      </svg>
    );

  // Unity
  if (n === "unity")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="currentColor" d="M10.4 14.4l-2.7 4.7-4.1-2.4L6 12 3.6 7.3l4.1-2.4 2.7 4.7h3.2L16.3 5l4.1 2.4L18 12l2.4 4.7-4.1 2.4-2.7-4.7h-3.2zm1.6-4l-2.1-3.7-2.1 1.2L9.3 11H12v-.6zm0 3.2H9.3l-1.5 3.1 2.1 1.2 2.1-3.7v-.6zm2.7-.6h2.7l1.5 3.1-2.1 1.2-2.1-3.7v-.6zm0-3.2v.6h2.7l1.5-3.1-2.1-1.2-2.1 3.7z" />
      </svg>
    );

  // AR Development / WebAR
  if (n === "ar development" || n === "webar")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="none" stroke="#4CAF50" strokeWidth="1.5" />
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );

  // Three.js
  if (n === "three.js")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="1.3" d="M3 20L12 4l9 16H3z" />
        <path fill="none" stroke="currentColor" strokeWidth="1" d="M7.5 12L12 4l4.5 8H7.5z" opacity="0.6" />
      </svg>
    );

  // Socket.IO
  if (n === "socket.io")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#010101" />
        <path fill="#FFFFFF" d="M12 6c-1 3-3 5-5 7h3c1-3 3-5 5-7h-3z" />
      </svg>
    );

  // Flask
  if (n === "flask")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="currentColor" d="M10 3v6L4 18c-.7 1.2.2 3 1.7 3h12.6c1.5 0 2.4-1.8 1.7-3L14 9V3h-4z" />
        <rect x="9" y="2" width="6" height="2" rx="1" fill="currentColor" />
        <ellipse cx="12" cy="16" rx="4" ry="2" fill="var(--card-surface)" opacity="0.3" />
      </svg>
    );

  // Arduino
  if (n === "arduino")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#00979C" d="M7 6A5.5 5.5 0 0 0 1.5 11.5 5.5 5.5 0 0 0 7 17c2.2 0 4.1-1.3 5.5-3.5 1.4 2.2 3.3 3.5 5.5 3.5a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 18 6c-2.2 0-4.1 1.3-5.5 3.5C11.1 7.3 9.2 6 7 6z" />
        <path stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" d="M5.5 11.5h3M16.5 11.5h3m-1.5-1.5v3" />
      </svg>
    );

  // Raspberry Pi
  if (n === "raspberry pi")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#C51A4A" d="M12 3C9 3 7 5.5 7 8v8c0 2.5 2 5 5 5s5-2.5 5-5V8c0-2.5-2-5-5-5z" />
        <circle cx="10" cy="10" r="1.2" fill="#FFFFFF" />
        <circle cx="14" cy="10" r="1.2" fill="#FFFFFF" />
        <rect x="10" y="14" width="4" height="1" rx="0.5" fill="#FFFFFF" />
        <path d="M7 10H5M19 10h-2M7 14H5M19 14h-2" stroke="#3E863D" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );

  // Tesseract OCR
  if (n === "tesseract ocr")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="17" cy="15" r="3" fill="none" stroke="#4CAF50" strokeWidth="1.2" />
        <path d="M19 17l2 2" stroke="#4CAF50" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );

  // Canva
  if (n === "canva")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#7D2AE8" />
        <text x="12" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#FFFFFF">C</text>
      </svg>
    );

  // ChatGPT
  if (n === "chatgpt")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#10A37F" />
        <path d="M12 6v4l3.5 2-3.5 2v4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 10l3.5 2-3.5 2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 10l-3.5 2 3.5 2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  // Gemini
  if (n === "gemini")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <defs>
          <linearGradient id="gemG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path fill="url(#gemG)" d="M12 2C12 8 8 12 2 12c6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10z" />
      </svg>
    );

  // Claude Code
  if (n === "claude code")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#D4A574" />
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 8l-2 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  // Git
  if (n === "git")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#F05032" d="M23.5 11.3L12.7.5c-.4-.4-1-.4-1.4 0L8.5 3.3l1.8 1.8c.5-.2 1-.1 1.4.3.4.4.5 1 .3 1.4l1.7 1.7c.5-.2 1.1-.1 1.5.3.5.5.5 1.4 0 1.9-.5.5-1.4.5-1.9 0-.4-.4-.5-1-.3-1.5L11.3 7.6v4.9c.1.1.3.2.4.3.5.5.5 1.4 0 1.9-.5.5-1.4.5-1.9 0-.5-.5-.5-1.4 0-1.9.2-.2.3-.3.5-.3V7.5c-.2-.1-.3-.2-.5-.3-.4-.4-.5-1.1-.3-1.5L7.8 3.9.5 11.3c-.4.4-.4 1 0 1.4l10.8 10.8c.4.4 1 .4 1.4 0L23.5 12.7c.4-.4.4-1 0-1.4z" />
      </svg>
    );

  // GitHub
  if (n === "github")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-1.02-.01-1.86-2.51.46-3.16-.61-3.36-1.17-.11-.29-.6-1.17-1.02-1.41-.35-.19-.85-.65-.01-.66.79-.01 1.35.73 1.54 1.03.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85.01 1.7.12 2.5.34 1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.67.91.67 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    );

  // VS Code
  if (n === "vs code")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#007ACC" d="M17 2l5 3v14l-5 3-7.5-6L5 20l-3-2V6l3-2 4.5 4L17 2z" />
        <path fill="#FFFFFF" opacity="0.6" d="M17 2l5 3v14l-5 3-7.5-6L5 20l-3-2V6l3-2 4.5 4L17 2zM9.5 12L5 8.5V15.5L9.5 12z" />
      </svg>
    );

  // Visual Studio 2022
  if (n.includes("visual studio"))
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#5C2D91" d="M2 7l2-2 5 5V5l4-3 9 5v10l-9 5-4-3v-5l-5 5-2-2V7z" />
        <path fill="#FFFFFF" opacity="0.4" d="M9 10l-5-5 5 5-5 5 5-5 4 3V7l-4 3z" />
      </svg>
    );

  // XAMPP
  if (n === "xampp")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#FB7A24" />
        <text x="12" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">X</text>
      </svg>
    );

  // TypeScript
  if (n === "typescript" || n === "ts")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path fill="#FFFFFF" d="M3 10.5h6v1.5H6.8v7.5H5.2V12H3v-1.5zm8.5 7.7c.8.5 1.8.8 2.8.8 1.6 0 2.6-.8 2.6-2.1 0-1.2-.7-1.8-2-2.3l-.7-.3c-.7-.3-1.2-.6-1.2-1.2 0-.5.5-1 1.3-1 .7 0 1.3.3 1.8.5l.4-1.2c-.5-.3-1.3-.5-2.2-.5-1.5 0-2.5.8-2.5 2 0 1.1.7 1.7 1.8 2.2l.7.3c.8.3 1.3.7 1.3 1.4 0 .7-.6 1.2-1.5 1.2-.8 0-1.6-.3-2.2-.7l-.5 1.2z" />
      </svg>
    );

  // Next.js
  if (n.includes("next"))
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="#000000" />
        <path fill="#FFFFFF" d="M15.5 8.5v7h-1.6V9.7l-5.4 7.3H7V8.5h1.6v5.8l5.4-7.3h1.5z" />
      </svg>
    );

  // Bootstrap
  if (n === "bootstrap")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#7952B3" />
        <path fill="#FFFFFF" d="M7 6h5c2.2 0 3.6 1.1 3.6 2.7 0 1.1-.6 1.9-1.6 2.3 1.3.4 2 1.4 2 2.7 0 1.8-1.5 3.3-3.9 3.3H7V6zm2.4 4.1h2.4c.8 0 1.4-.4 1.4-1.2s-.6-1.2-1.4-1.2H9.4v2.4zm0 5.1h2.7c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.4-1.6-1.4H9.4v2.8z" />
      </svg>
    );

  // C / C Language
  if (n === "c" || n.includes("c language") || n === "c-language")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="#00599C" />
        <path fill="#FFFFFF" d="M15.8 8.6c-.8-.7-1.9-1.1-3.2-1.1-2.6 0-4.6 1.9-4.6 4.5s2 4.5 4.6 4.5c1.3 0 2.4-.4 3.2-1.1l-1-1.3c-.6.5-1.3.8-2.2.8-1.7 0-3-1.2-3-2.9s1.3-2.9 3-2.9c.9 0 1.6.3 2.2.8l1-1.2z" />
      </svg>
    );

  // Laravel
  if (n === "laravel")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#FF2D20" d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4L12 2.5zm0 2.3L5.5 8.5v7l6.5 3.7 6.5-3.7v-7L12 4.8zm0 2.8l4.4 2.5v5L12 16.8l-4.4-2.5v-5L12 7.6z" />
      </svg>
    );

  // Grok
  if (n === "grok")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#18181B" />
        <path fill="#FFFFFF" d="M6 17.5l5.5-5.5L6 6.5h2.5l4.3 4.3 4.3-4.3H18L12.5 12l5.5 5.5h-2.5l-4.3-4.3-4.3 4.3H6z" />
      </svg>
    );

  // Figma
  if (n === "figma")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path d="M8 12a3.5 3.5 0 1 1 0-7h4v7H8z" fill="#F24E1E" />
        <path d="M12 5h4a3.5 3.5 0 0 1 0 7h-4V5z" fill="#FF7262" />
        <path d="M12 12h4a3.5 3.5 0 0 1 0 7h-4v-7z" fill="#1ABCFE" />
        <path d="M8 19a3.5 3.5 0 0 1 0-7h4v7a3.5 3.5 0 0 1-4 0z" fill="#0ACF83" />
        <path d="M8 12h4v3.5a3.5 3.5 0 0 1-4 0V12z" fill="#A259FF" />
      </svg>
    );

  // Vercel
  if (n === "vercel")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#000000" />
        <polygon points="12,5 20,19 4,19" fill="#FFFFFF" />
      </svg>
    );

  // Vite
  if (n === "vite")
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <defs>
          <linearGradient id="viteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="viteBolt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEA83" />
            <stop offset="100%" stopColor="#FFDD35" />
          </linearGradient>
        </defs>
        <path fill="url(#viteGrad)" d="M21.5 4.5L12.5 21l-9-16.5 8.5 2.5 8.5-2.5z" />
        <path fill="url(#viteBolt)" d="M13.2 4.2L7.5 12h3.5l-1.5 6.5 6-7.8h-3.6l1.3-6.5z" />
      </svg>
    );

  // Cloudflare
  if (n.includes("cloudflare"))
    return (
      <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
        <path fill="#F38020" d="M19.4 12.8c-.3-2.6-2.5-4.6-5.2-4.6-1.8 0-3.3.9-4.2 2.3-.6-.3-1.3-.4-2-.4-2.5 0-4.5 2-4.5 4.5 0 .3 0 .6.1.9C1.6 15.8 0 17.5 0 19.5 0 22 2 24 4.5 24h14.8c2.6 0 4.7-2.1 4.7-4.7 0-2.2-1.5-4-3.6-4.6-.3-.7-.6-1.3-1-1.9z" transform="scale(0.85) translate(2, 0)" />
      </svg>
    );

  // Fallback
  return (
    <svg viewBox="0 0 24 24" className="skill-card-icon" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="currentColor">
        {name.charAt(0).toUpperCase()}
      </text>
    </svg>
  );
}

/* ─── Category filter tabs ─── */
const categories = ["All", "Frontend", "Backend", "Game Dev", "Database", "IoT", "AI", "Tools"] as const;

/* Helper to count how many projects use a skill */
function getProjectsUsingSkill(skillName: string): ProjectItem[] {
  const normSkill = skillName.toLowerCase().trim();
  return projectsData.filter((project) =>
    project.tags.some((tag) => {
      const t = tag.toLowerCase().trim();
      if (t === normSkill) return true;
      if (normSkill === "react" && t.includes("react")) return true;
      if (normSkill === "javascript" && (t.includes("javascript") || t === "js")) return true;
      if (normSkill === "node.js" && t.includes("node")) return true;
      if (normSkill === "unity" && t.includes("unity")) return true;
      if (normSkill === "arduino" && t.includes("arduino")) return true;
      if (normSkill === "java" && t.includes("java") && !t.includes("script")) return true;
      if (normSkill === "php" && t.includes("php")) return true;
      if (normSkill === "mysql" && t.includes("mysql")) return true;
      if (normSkill === "css" && t.includes("css")) return true;
      if (normSkill === "html" && t.includes("html")) return true;
      if (normSkill === "python" && t.includes("python")) return true;
      if (normSkill === "kotlin" && t.includes("kotlin")) return true;
      if (normSkill === "tailwind css" && t.includes("tailwind")) return true;
      if (normSkill === "postgresql" && (t.includes("pgsql") || t.includes("postgres"))) return true;
      if (normSkill === "figma" && (t.includes("figma") || project.id === "inventopos" || project.id === "sigla")) return true;
      if (normSkill === "c language" && (t.includes(" c") || t === "c")) return true;
      return false;
    })
  );
}

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const filtered = (
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory)
  ).slice().sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  const matchingProjects = selectedSkill ? getProjectsUsingSkill(selectedSkill) : [];

  function scrollGallery(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;
    const cardWidth = 360;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className="skills-showcase">
      {/* ── Top Overview Banner ── */}
      <div className="skills-overview-banner" data-scroll-reveal>
        <div className="skills-stat-card scroll-reveal" data-scroll-reveal data-reveal-delay="0">
          <span className="skills-stat-num">{skills.length}</span>
          <span className="skills-stat-label">Technologies &amp; Tools</span>
        </div>
        <div className="skills-stat-card scroll-reveal" data-scroll-reveal data-reveal-delay="100">
          <span className="skills-stat-num">{projectsData.length}</span>
          <span className="skills-stat-label">Real Projects Built</span>
        </div>
        <div className="skills-stat-card scroll-reveal" data-scroll-reveal data-reveal-delay="200">
          <span className="skills-stat-num">7</span>
          <span className="skills-stat-label">Core Domains</span>
        </div>
      </div>

      {/* ── Category Filter Tabs ── */}
      <div className="skills-filter-bar" data-scroll-reveal>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="skills-click-tip" data-scroll-reveal>
        💡 <em>Click any skill below to reveal which projects use it:</em>
      </p>

      {/* ── Skills Grid ── */}
      <div className="skills-icon-grid" data-scroll-reveal>
        {filtered.map((skill, index) => {
          const isSelected = selectedSkill === skill.name;
          const count = getProjectsUsingSkill(skill.name).length;
          return (
            <button
              key={skill.name}
              type="button"
              className={`skill-icon-card scroll-reveal${isSelected ? " skill-card-selected" : ""}`}
              onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
              aria-pressed={isSelected}
              data-scroll-reveal
              style={{ transitionDelay: `${(index % 7) * 55}ms` }}
            >
              <div className="skill-icon-wrapper">
                <SkillIcon name={skill.name} />
              </div>
              <span className="skill-icon-name">{skill.name}</span>
              <span
                className="skill-icon-category"
                style={{
                  color: categoryColors[skill.category] || "var(--muted)",
                }}
              >
                {skill.category}
              </span>
              {count > 0 && (
                <span className="skill-project-badge" title={`${count} project(s) use this`}>
                  {count} proj
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Interactive Skill Project Connections Result ── */}
      {selectedSkill && (
        <aside className="skill-project-inspector" aria-live="polite" data-scroll-reveal>
          <div className="skill-inspector-header">
            <div className="skill-inspector-badge">
              <SkillIcon name={selectedSkill} />
              <div>
                <span className="skill-inspector-sub">SELECTED TECHNOLOGY</span>
                <h3 className="skill-inspector-title">{selectedSkill}</h3>
              </div>
            </div>
            <button
              type="button"
              className="skill-inspector-close"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close project preview"
            >
              ✕ Close
            </button>
          </div>

          <div className="skill-inspector-body">
            {matchingProjects.length > 0 ? (
              <>
                <p className="skill-inspector-lead">
                  Featured in <strong>{matchingProjects.length}</strong> project{matchingProjects.length > 1 ? "s" : ""}:
                </p>
                <div className="skill-project-cards-row">
                  {matchingProjects.map((p, idx) => (
                    <article
                      key={p.id}
                      className="skill-project-mini-card"
                      data-scroll-reveal
                      style={{ animationDelay: `${idx * 70}ms` }}
                    >
                      <div className="skill-project-mini-top">
                        <span className="skill-project-mini-cat">{p.category}</span>
                        <span className="skill-project-mini-role">{p.role}</span>
                      </div>
                      <h4 className="skill-project-mini-title">{p.title}</h4>
                      <p className="skill-project-mini-desc">
                        {p.paragraphs[0]?.slice(0, 140)}...
                      </p>
                      <div className="skill-project-mini-tags">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="skill-mini-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link href="/projects" className="skill-project-mini-link">
                        View in Projects <span>→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <p className="skill-inspector-empty">
                No major listed project stack for <strong>{selectedSkill}</strong> yet, but explored in labs, coursework, and personal experiments.
              </p>
            )}
          </div>
        </aside>
      )}

      {/* ── Capabilities Section with Cards & Explanations ── */}
      <section className="skills-capabilities-section" aria-labelledby="capabilities-heading" data-scroll-reveal>
        <div className="editorial-heading" data-scroll-reveal>
          <p className="section-kicker">02 — WHAT I BRING TO TEAMS</p>
          <h2 id="capabilities-heading">Core Capabilities</h2>
          <p>
            Hands-on disciplines grounded in real academic and collaborative software development.
          </p>
        </div>

        <div className="capabilities-cards-grid">
          <article className="capability-card scroll-reveal" data-scroll-reveal data-reveal-side="left">
            <span className="capability-num">01</span>
            <div className="capability-icon-wrap">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>Web &amp; System Development</h3>
            <p>
              Designing and building responsive web applications, document management platforms (DocuLink), and inventory POS systems (InventoPOS) using React, JavaScript, PHP, HTML/CSS, and relational database systems.
            </p>
          </article>

          <article className="capability-card scroll-reveal" data-scroll-reveal data-reveal-side="right">
            <span className="capability-num">02</span>
            <div className="capability-icon-wrap">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
              </svg>
            </div>
            <h3>Mobile &amp; Accessibility Solutions</h3>
            <p>
              Crafting mobile applications like <strong>SigLa</strong> (Sign Language Translator for hearing and speech-impaired communities) using Kotlin and mobile front-end frameworks, with offline translation and intuitive touch interactions.
            </p>
          </article>

          <article className="capability-card scroll-reveal" data-scroll-reveal data-reveal-side="left">
            <span className="capability-num">03</span>
            <div className="capability-icon-wrap">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 11h4M8 9v4M15 12h.01M18 10h.01" />
                <rect x="2" y="6" width="20" height="12" rx="6" />
              </svg>
            </div>
            <h3>Game Development &amp; AR</h3>
            <p>
              Developing augmented-reality mobile games (Attack on PDM) and interactive combat action games (Force X, Almighty Jungle) with Unity, C#, 2D animation (Marilao Fantasy), and character AI behaviors.
            </p>
          </article>

          <article className="capability-card scroll-reveal" data-scroll-reveal data-reveal-side="right">
            <span className="capability-num">04</span>
            <div className="capability-icon-wrap">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" />
                <line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" />
                <line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            </div>
            <h3>Hardware, IoT &amp; Sensors</h3>
            <p>
              Integrating physical microcontrollers with software workflows: automated attendance gates with RFID readers and camera face recognition (RecogniZarenus), and acoustic rainfall alert triggers (La Niña Detector) with Arduino.
            </p>
          </article>
        </div>
      </section>

      {/* ── Scrollable Projects Showcase Strip ── */}
      <section className="skills-projects-scroll-section" aria-labelledby="projects-strip-heading" data-scroll-reveal>
        <div className="skills-projects-header" data-scroll-reveal>
          <div>
            <p className="section-kicker">03 — PROJECT GALLERY</p>
            <h2 id="projects-strip-heading">Projects Powered by These Tools</h2>
            <p>
              Use the arrows to browse applications and experiments built with this tech stack.
            </p>
          </div>
          <div className="skills-gallery-actions">
            <div className="skills-carousel-nav" aria-label="Project carousel navigation">
              <button
                type="button"
                className="skills-nav-arrow"
                onClick={() => scrollGallery("left")}
                aria-label="Previous project"
              >
                ←
              </button>
              <button
                type="button"
                className="skills-nav-arrow"
                onClick={() => scrollGallery("right")}
                aria-label="Next project"
              >
                →
              </button>
            </div>
            <Link href="/projects" className="skills-all-projects-btn">
              View All 13 Projects →
            </Link>
          </div>
        </div>

        <div className="skills-projects-carousel-wrapper" data-scroll-reveal>
          <button
            type="button"
            className="skills-side-arrow skills-side-arrow-left"
            onClick={() => scrollGallery("left")}
            aria-label="Previous project"
          >
            ‹
          </button>

          <div
            ref={scrollContainerRef}
            className="skills-projects-horizontal-scroll"
            tabIndex={0}
            aria-label="Projects gallery carousel"
          >
            {projectsData.map((project, i) => (
              <article key={project.id} className="skills-scroll-card scroll-reveal" data-scroll-reveal>
                <div className="skills-scroll-card-header">
                  <span className="skills-scroll-badge">{project.category}</span>
                  <span className="skills-scroll-num">0{i + 1}</span>
                </div>
                <h3 className="skills-scroll-card-title">{project.title}</h3>
                <p className="skills-scroll-card-role">{project.role}</p>
                <p className="skills-scroll-card-desc">
                  {project.paragraphs[0]}
                </p>
                <div className="skills-scroll-card-tech">
                  {project.tags.map((t) => (
                    <span key={t} className="skills-scroll-tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="skills-scroll-card-footer">
                  <Link href="/projects" className="skills-scroll-card-link">
                    Read full case study <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="skills-side-arrow skills-side-arrow-right"
            onClick={() => scrollGallery("right")}
            aria-label="Next project"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
