import type { ReactNode } from "react";
import Mascot from "./Mascot";
import Sticker from "./Sticker";

type Mode = "check" | "self";

type HeaderProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export default function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <header className="sticky top-3 z-20 mx-auto flex max-w-[1440px] flex-col gap-3 rounded-3xl border border-borderSoft bg-card/90 p-3 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <Mascot compact />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-black text-ink">三句话验登</p>
            <Sticker tone="pink">Beta</Sticker>
          </div>
          <p className="text-xs font-medium text-muted">合作沟通风险预检工具</p>
        </div>
      </div>

      <nav className="grid grid-cols-2 gap-2 rounded-2xl border border-borderSoft bg-cream p-2 md:min-w-80">
        <TabButton active={mode === "check"} onClick={() => onModeChange("check")}>
          🔎 验对方
        </TabButton>
        <TabButton active={mode === "self"} onClick={() => onModeChange("self")}>
          🪞 验自己
        </TabButton>
      </nav>

      <button
        type="button"
        className="rounded-2xl border border-borderSoft bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
      >
        ? 使用指南
      </button>
    </header>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-sm font-black transition ${
        active
          ? "bg-ink text-white shadow-lg"
          : "bg-transparent text-muted hover:bg-[#F3DFC0]/50 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
