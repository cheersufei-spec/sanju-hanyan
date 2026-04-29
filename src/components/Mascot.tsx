type MascotProps = {
  compact?: boolean;
};

export default function Mascot({ compact = false }: MascotProps) {
  const size = compact ? "h-12 w-12" : "h-48 w-48 sm:h-60 sm:w-60";

  return (
    <div className={`relative ${size} floaty`} aria-hidden="true">
      <div className="absolute right-0 top-7 text-lg text-coral sparkle">✦</div>
      <div className="absolute -left-2 bottom-12 text-lg text-blush sparkle">♡</div>
      <div className="absolute bottom-3 right-7 rotate-12 text-sm font-black text-accent">
        paw
      </div>
      <svg viewBox="0 0 260 260" className="h-full w-full drop-shadow-xl">
        <defs>
          <linearGradient id="foxPink" x1="55" x2="200" y1="48" y2="214">
            <stop stopColor="#FF9FA8" />
            <stop offset="0.58" stopColor="#FFB8B8" />
            <stop offset="1" stopColor="#FF7F91" />
          </linearGradient>
          <linearGradient id="tailPink" x1="36" x2="116" y1="160" y2="226">
            <stop stopColor="#FF7F91" />
            <stop offset="1" stopColor="#FFD7D7" />
          </linearGradient>
        </defs>

        <circle cx="132" cy="132" r="112" fill="#F3DFC0" opacity="0.45" />

        <path
          d="M49 179c-18 25 2 56 40 46 25-7 36-29 24-49-13-22-45-24-64 3Z"
          fill="url(#tailPink)"
        />
        <path
          d="M68 202c11 14 33 11 43-1-5 17-22 28-44 24-16-3-25-12-26-24 8 5 17 6 27 1Z"
          fill="#FFFCF6"
          opacity="0.88"
        />

        <path
          d="M77 83c-11-39 2-58 36-22 14-6 30-7 45 0 34-36 47-17 36 22 21 17 34 43 34 72 0 54-43 86-96 86s-96-32-96-86c0-29 13-55 41-72Z"
          fill="url(#foxPink)"
        />
        <path
          d="M91 77c-7-23-2-33 19-13L98 105 91 77Z"
          fill="#FFFCF6"
          opacity="0.74"
        />
        <path
          d="M173 77c7-23 2-33-19-13l12 41 7-28Z"
          fill="#FFFCF6"
          opacity="0.74"
        />
        <path
          d="M76 154c7 37 29 61 56 61s49-24 56-61c-13 12-31 19-56 19s-43-7-56-19Z"
          fill="#FFFCF6"
        />
        <path
          d="M104 151c8 10 18 15 28 15s20-5 28-15c-10 4-19 5-28 5s-18-1-28-5Z"
          fill="#FFE5E5"
        />

        <circle cx="102" cy="133" r="17" fill="#252525" />
        <circle cx="162" cy="133" r="17" fill="#252525" />
        <circle cx="97" cy="126" r="5" fill="#fff" />
        <circle cx="156" cy="126" r="5" fill="#fff" />
        <circle cx="109" cy="141" r="3" fill="#fff" opacity="0.75" />
        <circle cx="169" cy="141" r="3" fill="#fff" opacity="0.75" />
        <circle cx="84" cy="151" r="8" fill="#FF7F91" opacity="0.48" />
        <circle cx="180" cy="151" r="8" fill="#FF7F91" opacity="0.48" />
        <path
          d="M125 151c4 5 10 5 14 0"
          stroke="#252525"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M132 156c0 7-5 11-12 12"
          stroke="#252525"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M132 156c0 7 5 11 12 12"
          stroke="#252525"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.65"
        />

        <path d="M95 62c17-16 56-19 77-2" stroke="#D7A978" strokeWidth="9" strokeLinecap="round" />
        <path d="M94 56h77l-12-17h-50L94 56Z" fill="#D7A978" />
        <path d="M108 39h51" stroke="#F3DFC0" strokeWidth="5" strokeLinecap="round" />

        <path
          d="M190 157c13 2 23 13 22 27l-8 28c-1 6-7 10-13 9l-25-5c-6-1-10-7-9-13l8-29c3-12 13-19 25-17Z"
          fill="#C99B6B"
        />
        <path d="M174 177l28 6" stroke="#8D6847" strokeWidth="4" strokeLinecap="round" opacity="0.45" />

        <circle cx="68" cy="158" r="22" fill="none" stroke="#252525" strokeWidth="8" />
        <circle cx="68" cy="158" r="15" fill="#DDF3E4" opacity="0.38" />
        <path d="M82 174l21 23" stroke="#252525" strokeWidth="8" strokeLinecap="round" />
        <path d="M99 197c8 7 15 5 20-1" stroke="#FF9FA8" strokeWidth="11" strokeLinecap="round" />

        <path d="M107 222c10 8 23 10 38 0" stroke="#FF9FA8" strokeWidth="14" strokeLinecap="round" />
        <circle cx="105" cy="224" r="6" fill="#FFFCF6" />
        <circle cx="146" cy="224" r="6" fill="#FFFCF6" />
      </svg>
    </div>
  );
}
