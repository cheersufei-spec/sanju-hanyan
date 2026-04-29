import type { AnalysisResult } from "../lib/scoring";

type ShareCardProps = {
  result: AnalysisResult;
};

const getRiskColor = (score: number) => {
  if (score <= 20) return "text-success";
  if (score <= 45) return "text-accent";
  if (score <= 70) return "text-warning";
  return "text-danger";
};

export default function ShareCard({ result }: ShareCardProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft sm:p-6">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-[#fffaf0]">
        <div className="border-b border-black/10 bg-ink px-6 py-5 text-white">
          <p className="text-sm font-semibold text-white/70">三句话验登报告</p>
          <h2 className="mt-1 text-2xl font-black">合作前风险快照</h2>
        </div>

        <div className="p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted">含登量</p>
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
            <ShareRow label="风险人格" value={result.riskTags.join("、")} />
            <ShareRow label="建议" value={result.advice} />
            <ShareRow label="验登结论" value={result.shareConclusion} />
            <ShareRow label="结论" value="这个合作，先让对方写清楚。" />
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
