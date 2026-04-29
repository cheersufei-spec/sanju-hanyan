import { useState } from "react";
import Badge from "./Badge";
import type {
  SelfAnalysisResult,
  SelfRiskCategory,
} from "../lib/scoringSelf";

type SelfResultPanelProps = {
  result: SelfAnalysisResult;
};

const categories: SelfRiskCategory[] = [
  "画饼不承诺",
  "预算回避",
  "语气打压",
  "边界模糊",
  "责任转嫁",
  "权力压迫",
  "亲密越界",
  "过度说教",
];

const getTone = (score: number) => {
  if (score <= 20) return "success";
  if (score <= 45) return "accent";
  if (score <= 70) return "warning";
  return "danger";
};

const getScoreColor = (score: number) => {
  if (score <= 20) return "text-success";
  if (score <= 45) return "text-accent";
  if (score <= 70) return "text-warning";
  return "text-danger";
};

export default function SelfResultPanel({ result }: SelfResultPanelProps) {
  const [copyLabel, setCopyLabel] = useState("复制改写话术");
  const riskSignals = categories.flatMap((category) =>
    result.riskHits[category].map((hit) => `${category}：${hit}`),
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.rewrittenMessage);
    setCopyLabel("已复制");
    window.setTimeout(() => setCopyLabel("复制改写话术"), 1400);
  };

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="rounded-2xl border border-black/10 bg-paper p-5">
          <p className="text-sm font-semibold text-muted">登味儿指数</p>
          <div className={`mt-2 text-6xl font-black ${getScoreColor(result.score)}`}>
            {result.score}
          </div>
          <p className="mt-2 text-sm font-semibold text-muted">/ 100</p>
          <div className="mt-5">
            <Badge tone={getTone(result.score)}>{result.level}</Badge>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-ink">{result.title}</h2>
            <Badge tone="neutral">当前场景：{result.scenario}</Badge>
            {result.riskTags.map((tag) => (
              <Badge key={tag} tone={tag === "清爽合作感" ? "success" : "accent"}>
                {tag}
              </Badge>
            ))}
          </div>

          <p className="mt-4 text-base leading-7 text-muted">
            {result.summary}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock
              title="命中的登味信号"
              empty="暂未命中明显登味表达。"
              items={riskSignals}
              tone="danger"
            />
            <div className="rounded-2xl border border-black/10 bg-paper p-5">
              <h3 className="text-base font-bold text-ink">对方可能的感受</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {result.potentialImpact}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-paper p-5">
          <h3 className="text-base font-bold text-ink">建议动作</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{result.advice}</p>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-bold text-ink">更体面的改写版本</h3>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-accent/40 bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
            >
              {copyLabel}
            </button>
          </div>
          <p className="mt-3 rounded-xl bg-white p-4 text-sm font-semibold leading-7 text-ink">
            {result.rewrittenMessage}
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  title,
  empty,
  items,
  tone,
}: {
  title: string;
  empty: string;
  items: string[];
  tone: "success" | "danger";
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-paper p-5">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {items.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge key={item} tone={tone}>
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-muted">{empty}</p>
      )}
    </div>
  );
}
