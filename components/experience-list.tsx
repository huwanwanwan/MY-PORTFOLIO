"use client";

import Link from "next/link";
import { projectsData } from "../data/projects-data";

export interface ExperienceItem {
  index: string;
  level: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export const experiencesList: ExperienceItem[] = [
  {
    index: "01",
    level: "Latest Capstone / Thesis",
    title: "SigLa: Sign Language Translator",
    role: "Front-End Developer & UI/UX",
    description: "Developed the mobile application's user interface and experience for a 5-tier sign language translation system with offline-first recognition.",
    tags: ["Kotlin", "React.js", "Tailwind"],
  },
  {
    index: "02",
    level: "College Game Development",
    title: "Class Project (Game Dev): Whole Class Project",
    role: "Game Developer & Systems Contributor",
    description: "Collaborated with our entire class on a comprehensive game development pipeline, contributing to gameplay mechanics, world design, and cross-functional team coordination.",
    tags: ["Unity", "C#", "Game Development"],
  },
  {
    index: "03",
    level: "Proposed Thesis",
    title: "RecogniZarenus: Facial Recognition Attendance",
    role: "Lead Developer",
    description: "Built a facial recognition attendance system with automated turnstile gate, RFID scanning, and real-time SMS parent notifications.",
    tags: ["PHP", "JavaScript", "Arduino"],
  },
  {
    index: "04",
    level: "Collab Case Study (2025)",
    title: "HALAL 2025: E-Voting System",
    role: "Co-Developer",
    description: "Developed an e-voting system combining Database Management Systems and OOP with Java and MySQL for voter verification and ballot tabulation.",
    tags: ["Java", "MySQL"],
  },
  {
    index: "05",
    level: "Web Dev & SAD Case Study",
    title: "InventoPOS: Point of Sale & Inventory",
    role: "UI/UX Designer",
    description: "Designed the UI/UX in Figma and built the interface with React.js. Received a perfect 100/100 grade for the completed system.",
    tags: ["React.js", "Figma", "CSS"],
  },
  {
    index: "06",
    level: "EDOOP Case Study · PDM",
    title: "DocuLink: Document Request System",
    role: "Front-End Developer",
    description: "Built the front-end for a web-based document request system with order-tracking-style status pipeline (Processing → Ongoing → Delivered).",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    index: "07",
    level: "Arduino Exhibit · 1st Year",
    title: "La Niña Detector: IoT Rain Alarm",
    role: "Hardware & Firmware Developer",
    description: "Developed an Arduino-based rain sensor alarm system, demonstrated live to the college dean at the Arduino Exhibit.",
    tags: ["Arduino", "IoT"],
  },
  {
    index: "08",
    level: "Database Systems Project",
    title: "Fitness Management System",
    role: "Co-Developer",
    description: "Co-developed a fitness management system using MS Access for user authentication, workout tracking, and reservation management.",
    tags: ["MS Access"],
  },
  {
    index: "09",
    level: "Game Development Projects",
    title: "Force X · Almighty Jungle · Isla Arena",
    role: "Game Developer & Animator",
    description: "Developed three Unity games: a 3D combat action game, an action-adventure quest, and a tropical island battle arena, including character design, animations, enemy AI, and combat mechanics.",
    tags: ["Unity", "C#", "3D"],
  },
  {
    index: "10",
    level: "College AR Project",
    title: "Attack on PDM: AR Game",
    role: "Co-Developer",
    description: "Co-developed a Pokémon GO-inspired augmented reality game in Unity featuring five Filipino mythology characters with real-world AR combat.",
    tags: ["Unity", "AR"],
  },
  {
    index: "11",
    level: "CGA Project",
    title: "Marilao Fantasy: 2D Animation",
    role: "Character Animator",
    description: "Animated characters frame by frame using FlipaClip for a 2D action animation featuring a hero with Thunder Wave and Dash abilities.",
    tags: ["FlipaClip", "Animation"],
  },
  {
    index: "12",
    level: "1st Year College",
    title: "Milktaste: Desktop Application",
    role: "Lead Developer",
    description: "Built my first college software project using Java as the sole developer in a two-member team, a foundational milestone in my development journey.",
    tags: ["Java"],
  },
  {
    index: "13",
    level: "4 months",
    title: "Lazada",
    role: "Warehouse Picker",
    description: "Found and collected items listed in customer orders and checked each item for accuracy before delivery.",
    tags: ["Order Picking", "Order Accuracy"],
  },
];

const experienceProjects: Record<string, string[]> = {
  "01": ["sigla"], "02": ["class-project-game"], "03": ["recognizarenus"],
  "04": ["halal-2025"], "05": ["inventopos"], "06": ["doculink"],
  "07": ["la-nina-detector"], "08": ["fitness-management-system"],
  "09": ["force-x", "almighty-jungle", "isla-arena"], "10": ["attack-on-pdm"],
  "11": ["marilao-fantasy"], "12": ["milktaste"],
};

export default function ExperienceList({ work = false }: { work?: boolean } = {}) {
  const entries = work
    ? experiencesList.filter((entry) => entry.title === "Lazada")
    : experiencesList.slice(0, 4);
  return (
    <div className="experience-list-container">
      {entries.map((entry) => (
        <article
          key={entry.index}
          className="journey-entry scroll-reveal visible"
          data-scroll-reveal
        >
          <span className="journey-index" aria-hidden="true" />
          <div>
            <p className="education-level">{entry.level}</p>
            <h4 className={work ? undefined : "journey-project-title"}>{entry.title}</h4>
            {work && <p className="journey-role">{entry.role}</p>}
            <p>{entry.description}</p>
            <div className="tag-row">
              {entry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="experience-project-links">
              {(experienceProjects[entry.index] ?? []).map((id) => {
                const project = projectsData.find((item) => item.id === id);
                return project ? (
                  <Link key={id} className="experience-project-link" href={`/projects/${id}`}>
                    View {project.title}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </article>
      ))}


    </div>
  );
}

