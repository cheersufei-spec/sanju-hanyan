import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
};

const toneClass = {
  neutral: "border-black/10 bg-white/70 text-ink",
  accent: "border-accent/35 bg-accent/15 text-ink",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  danger: "border-danger/20 bg-danger/10 text-danger",
};

export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
