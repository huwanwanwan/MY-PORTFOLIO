export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Game Dev" | "Database" | "IoT" | "AI" | "Tools";
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Dart", category: "Frontend" },
  { name: "Flutter", category: "Frontend" },
  { name: "Kotlin", category: "Frontend" },
  { name: "Three.js", category: "Frontend" },

  // Backend
  { name: "Java", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: "Socket.IO", category: "Backend" },

  // Game Dev
  { name: "Unity", category: "Game Dev" },
  { name: "AR Development", category: "Game Dev" },
  { name: "WebAR", category: "Game Dev" },

  // Database
  { name: "PostgreSQL", category: "Database" },
  { name: "MariaDB", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Firebase", category: "Database" },

  // IoT / Hardware
  { name: "Arduino", category: "IoT" },
  { name: "Raspberry Pi", category: "IoT" },
  { name: "Tesseract OCR", category: "IoT" },

  // AI
  { name: "ChatGPT", category: "AI" },
  { name: "Gemini", category: "AI" },
  { name: "Claude Code", category: "AI" },
  { name: "Canva", category: "AI" },

  // Tools
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Visual Studio 2022", category: "Tools" },
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

