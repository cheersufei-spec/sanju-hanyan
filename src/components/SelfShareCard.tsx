import type { SelfAnalysisResult } from "../lib/scoringSelf";
import { getTopRadarRisks } from "../lib/radar";

type SelfShareCardProps = {
  result: SelfAnalysisResult;
};

const getRiskColor = (score: number) => {
  if (score <= 20) return "text-success";
  if (score <= 45) return "text-accent";
  if (score <= 70) return "text-warning";
  return "text-danger";
};

export default function SelfShareCard({ result }: SelfShareCardProps) {
  const topRisks = getTopRadarRisks(result.radar);
  const suggestion =
    result.score <= 20
      ? "表达清爽，可以发送，关键事项记得书面确认。"
      : "先改写，再发送。";

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft sm:p-6">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-[#fffaf0]">
        <div className="border-b border-black/10 bg-ink px-6 py-5 text-white">
          <p className="text-sm font-semibold text-white/70">自评登味儿报告</p>
          <h2 className="mt-1 text-2xl font-black">发送前沟通快照</h2>
        </div>

        <div className="p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted">登味儿指数</p>
              <p className={`mt-1 text-5xl font-black ${getRiskColor(result.score)}`}>
                {result.score}
                <span className="text-lg text-muted">/100</span>
              </p>
            </div>
            <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-ink">
              {result.level}
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <ShareRow label="我的风险标签" value={result.riskTags.join("、")} />
            <ShareRow
              label="主要风险"
              value={
                topRisks.length > 0
                  ? topRisks
                      .map((risk, index) => `${index + 1}. ${risk.label}：${risk.score}/100`)
                      .join("；")
                  : "暂无明显高风险维度"
              }
            />
            <ShareRow label="对方可能感受" value={result.potentialImpact} />
            <ShareRow label="建议" value={suggestion} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function ShareRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <dt className="text-sm font-semibold text-accent">{label}</dt>
      <dd className="mt-1 text-base font-bold leading-7 text-ink">{value}</dd>
    </div>
  );
}
