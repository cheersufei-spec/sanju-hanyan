import type { ReactNode } from "react";

type StickerProps = {
  children: ReactNode;
  tone?: "pink" | "gold" | "mint" | "dark";
};

const toneClass = {
  pink: "border-coral/25 bg-blush/40 text-ink",
  gold: "border-accent/30 bg-[#F3DFC0]/70 text-ink",
  mint: "border-success/20 bg-mint text-ink",
  dark: "border-ink bg-ink text-white",
};

export default function Sticker({ children, tone = "gold" }: StickerProps) {
  return (
    <span
      className={`inline-flex rotate-[-2deg] items-center rounded-full border px-3 py-1 text-xs font-black shadow-sm ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
