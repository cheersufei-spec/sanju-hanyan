import { useState } from "react";
import Mascot from "./Mascot";
import type { AnalysisResult } from "../lib/scoring";
import { getTopRadarRisks } from "../lib/radar";

type ShareCardProps = {
  result: AnalysisResult;
};

const getRiskColor = (score: number) => {
  if (score <= 20) return "#027A48";
  if (score <= 70) return "#B54708";
  return "#B42318";
};

export default function ShareCard({ result }: ShareCardProps) {
  const [copyLabel, setCopyLabel] = useState("复制报告摘要");
  const topRisks = getTopRadarRisks(result.radar);
  const conclusion = getConclusion(result);
  const quote = getQuote(result, conclusion);
  const topRiskText =
    topRisks.length > 0
      ? topRisks.map((risk) => `${risk.label}：${risk.score}/100`).join("、")
      : "暂无明显高风险维度";

  const copySummary = async () => {
    await navigator.clipboard.writeText(
      [
        "【三句话验登报告】",
        `当前场景：${result.scenario}`,
        `含登量：${result.score}/100`,
        `风险人格：${result.riskTags.join("、")}`,
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
              三句话验登 · 合作前验一验
            </p>
            <h2 className="mt-1 text-3xl font-black text-[#F7F6F1]">
              合作前风险快照
            </h2>
            <p className="mt-1 text-sm font-bold text-white/60">少踩坑，多安心</p>
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
              <p className="text-sm font-semibold text-muted">含登量</p>
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
            <ShareRow label="风险人格" value={result.riskTags.join("、")} />
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

function getConclusion(result: AnalysisResult) {
  const intimacyHits = result.riskHits["亲密越界"];
  const hasIntimacyRisk = intimacyHits.length > 0;
  const hasHighRiskPrivateSignal = intimacyHits.some((hit) =>
    ["酒店", "房间", "车上", "照片", "不要告诉别人", "看你表现", "你让我开心了"].some(
      (keyword) => hit.includes(keyword),
    ),
  );

  if (hasHighRiskPrivateSignal) {
    return "高危越界信号。不要去酒店、酒局、车内或任何私密空间，保留记录，停止单独沟通。";
  }

  if (hasIntimacyRisk && result.score >= 70) {
    return "合作场景被暧昧化。不要单独赴约，把沟通拉回正式、公开、书面。";
  }

  if (
    result.riskHits["人格打压"].length > 0 ||
    result.radar.respectRisk >= 60
  ) {
    return "对方没有回答合作问题，转而评价你这个人。建议降权。";
  }

  if (
    result.riskHits["白嫖画饼"].length > 0 ||
    result.radar.commitmentRisk >= 60
  ) {
    return "只谈未来资源，不谈当下投入。不要先交付，先确认预算和边界。";
  }

  if (result.radar.boundaryRisk >= 60) {
    return "边界没有写清楚前，不要投入执行。先确认 scope、时间和责任。";
  }

  if (result.radar.responsibilityRisk >= 60) {
    return "资源不清、责任先行。这类合作容易后期甩锅，建议书面确认责任机制。";
  }

  if (result.score <= 20) {
    return "对方能讨论目标、边界和责任，可以继续推进，但建议书面确认。";
  }

  return "这个合作，先让对方写清楚。";
}

function getQuote(result: AnalysisResult, conclusion: string) {
  if (conclusion.includes("暧昧化") || conclusion.includes("越界")) {
    return "合作场景被暧昧化，立刻拉回正式沟通。";
  }

  if (
    result.riskHits["人格打压"].length > 0 ||
    result.radar.respectRisk >= 60
  ) {
    return "对方没回答问题，先评价你这个人，建议降权。";
  }

  if (
    result.riskHits["白嫖画饼"].length > 0 ||
    result.radar.commitmentRisk >= 60
  ) {
    return "不要用未来资源，替代当下承诺。";
  }

  if (result.score <= 20) {
    return "边界写清楚，合作才走得远。";
  }

  return "真正成熟的合作，会谈目标、边界、预算和责任。";
}
