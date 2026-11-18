import type { CSSProperties } from "react";
import { TechIcon } from "./tech-icon";

const brandColors: Record<string, string> = {
  dart: "#0175c2", flutter: "#0288d1", riverpod: "#00a6a6",
  typescript: "#3178c6", "next.js": "#737373", nextjs: "#737373",
  "react.js": "#149eca", react: "#149eca", "tailwind css": "#06b6d4", tailwind: "#06b6d4",
  supabase: "#3ecf8e", postgresql: "#4169e1", plpgsql: "#4169e1", "maplibre gl": "#396cb2",
  "java programming": "#ed8b00", java: "#ed8b00", unity: "#777b85", "c#": "#9b4f96",
  "ms access": "#a4373a", "arduino ide": "#00979d", html: "#e34f26", css: "#1572b6",
  javascript: "#d4b400", mysql: "#00758f", php: "#777bb4", kotlin: "#a97bff",
  "node.js": "#5fa04e", python: "#3776ab", "game development": "#a855f7",
};

export default function TechBadge({ name }: { name: string }) {
  return (
    <span className="brand-tech-badge" style={{ "--tech-brand": brandColors[name.toLowerCase()] ?? "#648b82" } as CSSProperties}>
      <TechIcon name={name} /><span>{name}</span>
    </span>
  );
}
