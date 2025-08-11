// components/ProjectCard.tsx
import React from "react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

type Status = "Planning" | "In Progress" | "On Hold" | "Launched";

export type ProjectCardProps = {
  title: string;
  description?: string | null;
  status: Status;
  onClick?: () => void; // optional for navigation
};

function truncate(text: string, max = 140) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export default function ProjectCard({
  title,
  description = "",
  status,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 shadow-sm ring-1 ring-white/5 hover:bg-slate-900/80 hover:shadow transition"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        <ProjectStatusBadge status={status} />
      </div>

      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {truncate(description, 140)}
        </p>
      ) : null}
    </button>
  );
}