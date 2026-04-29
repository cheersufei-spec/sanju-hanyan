import { useState } from "react";
import type { ReplyScripts as ReplyScriptsType } from "../lib/types";

type ReplyScriptsProps = {
  scripts: ReplyScriptsType;
  title?: string;
};

const scriptCards: Array<{
  key: keyof ReplyScriptsType;
  title: string;
}> = [
  { key: "gentle", title: "温和版" },
  { key: "business", title: "商务版" },
  { key: "firm", title: "强硬版" },
];

export default function ReplyScripts({
  scripts,
  title = "三档话术",
}: ReplyScriptsProps) {
  const [copiedKey, setCopiedKey] = useState<keyof ReplyScriptsType | null>(
    null,
  );

  const handleCopy = async (key: keyof ReplyScriptsType) => {
    await navigator.clipboard.writeText(scripts[key]);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1400);
  };

  return (
    <section className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {scriptCards.map((card) => (
          <article
            key={card.key}
            className="flex min-h-56 flex-col rounded-2xl border border-black/10 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-black text-accent">{card.title}</h4>
              <button
                type="button"
                onClick={() => handleCopy(card.key)}
                className="rounded-xl border border-black/10 bg-paper px-3 py-2 text-xs font-bold text-ink transition hover:border-accent hover:text-accent"
              >
                {copiedKey === card.key ? "已复制" : "复制"}
              </button>
            </div>
            <p className="mt-3 flex-1 text-sm font-medium leading-7 text-ink">
              {scripts[card.key]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
