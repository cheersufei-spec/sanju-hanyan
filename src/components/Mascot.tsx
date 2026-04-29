type MascotProps = {
  compact?: boolean;
};

export default function Mascot({ compact = false }: MascotProps) {
  const size = compact ? "h-12 w-12" : "h-44 w-44 sm:h-56 sm:w-56";

  return (
    <div className={`relative ${size} floaty`} aria-hidden="true">
      <div className="absolute -right-2 top-4 text-lg sparkle">✦</div>
      <div className="absolute -left-3 bottom-8 text-lg sparkle">♡</div>
      <div className="absolute right-4 bottom-0 rotate-12 text-sm text-accent">paw</div>
      <svg viewBox="0 0 240 240" className="h-full w-full drop-shadow-xl">
        <circle cx="120" cy="120" r="104" fill="#F3DFC0" opacity="0.55" />
        <path
          d="M64 72c-7-31 5-44 34-15 15-8 31-8 46 0 29-29 41-16 34 15 19 15 31 38 31 63 0 48-39 79-88 79s-88-31-88-79c0-25 12-48 31-63Z"
          fill="#FFB8B8"
        />
        <path d="M73 70c-2-15 2-21 16-8l-9 25-7-17Z" fill="#D94A3D" opacity="0.5" />
        <path d="M167 70c2-15-2-21-16-8l9 25 7-17Z" fill="#D94A3D" opacity="0.5" />
        <path
          d="M78 130c8 32 28 49 43 49s35-17 43-49c-11 8-24 12-43 12s-32-4-43-12Z"
          fill="#FFFCF6"
        />
        <circle cx="91" cy="116" r="8" fill="#252525" />
        <circle cx="149" cy="116" r="8" fill="#252525" />
        <circle cx="94" cy="113" r="2.6" fill="#fff" />
        <circle cx="152" cy="113" r="2.6" fill="#fff" />
        <path d="M116 132c3 5 7 5 10 0" stroke="#252525" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M95 48c18-14 57-14 75 0"
          fill="none"
          stroke="#252525"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path d="M83 42h78l-13-18H96L83 42Z" fill="#252525" />
        <circle cx="178" cy="143" r="22" fill="none" stroke="#252525" strokeWidth="8" />
        <path d="M194 160l22 22" stroke="#252525" strokeWidth="8" strokeLinecap="round" />
        <path d="M45 172c-18 16 4 43 35 21" fill="none" stroke="#FFB8B8" strokeWidth="22" strokeLinecap="round" />
      </svg>
    </div>
  );
}
