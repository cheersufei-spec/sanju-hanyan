import { useState } from "react";
import Mascot from "./Mascot";
import type { SelfAnalysisResult } from "../lib/scoringSelf";
import { getTopRadarRisks } from "../lib/radar";

type SelfShareCardProps = {
  result: SelfAnalysisResult;
};

const getRiskColor = (score: number) => {
  if (score <= 20) return "#027A48";
  if (score <= 70) return "#B54708";
  return "#B42318";
};

export default function SelfShareCard({ result }: SelfShareCardProps) {
  const [copyLabel, setCopyLabel] = useState("复制报告摘要");
  const topRisks = getTopRadarRisks(result.radar);
  const conclusion = getConclusion(result);
  const quote = getQuote(result);
  const topRiskText =
    topRisks.length > 0
      ? topRisks.map((risk) => `${risk.label}：${risk.score}/100`).join("、")
      : "暂无明显高风险维度";

  const copySummary = async () => {
    await navigator.clipboard.writeText(
      [
        "【自评登味儿报告】",
        `当前场景：${result.scenario}`,
        `登味儿指数：${result.score}/100`,
        `我的风险标签：${result.riskTags.join("、")}`,
        `主要风险：${topRiskText}`,
        `结论：${conclusion}`,
      ].join("\n"),
    );
    setCopyLabel("已复制");
    window.setTimeout(() => setCopyLabel("复制报告摘要"), 1400);
  };

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft sm:p-6">
      <div className="mx-auto max-w-[720px]">
        <button
          type="button"
          onClick={copySummary}
          className="mb-4 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-accent/25"
        >
          {copyLabel}
        </button>
      </div>

      <div className="mx-auto max-w-[720px] overflow-hidden rounded-3xl border border-black/10 bg-paper">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 bg-ink px-6 py-5 text-white">
          <div>
            <p className="text-sm font-semibold text-[#F7F6F1]/70">
              自评登味儿 · 发消息前照一照
            </p>
            <h2 className="mt-1 text-3xl font-black text-[#F7F6F1]">
              发送前表达体检
            </h2>
            <p className="mt-1 text-sm font-bold text-white/60">少伤人，多体面</p>
          </div>
          <div className="relative shrink-0">
            <Mascot compact />
            <span className="absolute -right-2 -top-2 rounded-full bg-mint px-2 py-1 text-xs font-black text-ink">
              稳了！
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted">登味儿指数</p>
              <p
                className="mt-1 text-6xl font-black"
                style={{ color: getRiskColor(result.score) }}
              >
                {result.score}
                <span className="text-lg text-muted">/100</span>
              </p>
            </div>
            <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-ink">
              {result.level}
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <ShareRow label="当前场景" value={result.scenario} />
            <ShareRow label="我的风险标签" value={result.riskTags.join("、")} />
            <ShareRow
              label="主要风险"
              value={
                topRisks.length > 0
                  ? topRisks
                      .map((risk) => `${risk.label}：${risk.score}/100`)
                      .join("；")
                  : "暂无明显高风险维度"
              }
            />
            <ShareRow label="验登结论" value={conclusion} highlight />
          </dl>

          <p className="mt-6 rounded-2xl border border-accent/30 bg-white px-5 py-4 text-center text-base font-black leading-7 text-ink">
            {quote}
          </p>
        </div>
      </div>
    </section>
  );
}

function ShareRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <dt className="text-sm font-semibold text-accent">{label}</dt>
      <dd
        className={`mt-1 text-base font-bold leading-7 ${
          highlight ? "text-danger" : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function getConclusion(result: SelfAnalysisResult) {
  if (result.score >= 71) {
    return "这段话容易制造压迫感。建议先改写，再发送。";
  }

  if (result.riskHits["亲密越界"].length > 0) {
    return "合作表达被暧昧化。建议删掉私人化内容，拉回正式合作。";
  }

  if (result.riskHits["语气打压"].length > 0) {
    return "这段话容易让对方觉得被评价。建议从评价人，改成讨论事。";
  }

  if (
    result.riskHits["预算回避"].length > 0 ||
    result.riskHits["画饼不承诺"].length > 0
  ) {
    return "这段话容易让对方产生白嫖感。建议补充预算、双方投入和交付边界。";
  }

  if (result.score <= 20) {
    return "表达清爽，可以发送，关键事项记得书面确认。";
  }

  return "先改写，再发送。";
}

function getQuote(result: SelfAnalysisResult) {
  if (result.score <= 20) {
    return "边界写清楚，合作才走得远。";
  }

  if (result.riskHits["亲密越界"].length > 0) {
    return "合作场景被暧昧化，立刻拉回正式沟通。";
  }

  return "发消息前照见自己，也是一种专业。";
}
