export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Game Dev" | "Database" | "IoT" | "AI" | "Tools";
}

export const skills: Skill[] = [
  // Frontend
  { name: "Bootstrap", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Dart", category: "Frontend" },
  { name: "Flutter", category: "Frontend" },
  { name: "HTML", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Kotlin", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Three.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },

  // Backend
  { name: "C#", category: "Backend" },
  { name: "C Language", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Socket.IO", category: "Backend" },

  // Game Dev
  { name: "AR Development", category: "Game Dev" },
  { name: "Unity", category: "Game Dev" },
  { name: "WebAR", category: "Game Dev" },

  // Database
  { name: "Firebase", category: "Database" },
  { name: "MariaDB", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Database" },

  // IoT / Hardware
  { name: "Arduino", category: "IoT" },
  { name: "Raspberry Pi", category: "IoT" },
  { name: "Tesseract OCR", category: "IoT" },

  // AI
  { name: "Canva", category: "AI" },
  { name: "ChatGPT", category: "AI" },
  { name: "Claude Code", category: "AI" },
  { name: "Gemini", category: "AI" },
  { name: "Grok", category: "AI" },

  // Tools
  { name: "Cloudflare", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Visual Studio 2022", category: "Tools" },
  { name: "Vite", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "XAMPP", category: "Tools" },
];

export const categoryColors: Record<string, string> = {
  Frontend: "#c65336",
  Backend: "#2e7d32",
  "Game Dev": "#7b1fa2",
  Database: "#1565c0",
  IoT: "#00838f",
  AI: "#6a1b9a",
  Tools: "#4e342e",
};

