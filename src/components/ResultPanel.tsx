import Badge from "./Badge";
import ReplyScripts from "./ReplyScripts";
import RiskRadar from "./RiskRadar";
import Sticker from "./Sticker";
import type { AnalysisResult, RiskCategory } from "../lib/scoring";

type ResultPanelProps = {
  result: AnalysisResult;
};

const categories: RiskCategory[] = [
  "白嫖画饼",
  "打压PUA",
  "人格打压",
  "边界模糊",
  "责任转嫁",
  "权力压迫",
  "亲密越界",
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

export default function ResultPanel({ result }: ResultPanelProps) {
  const riskSignals = categories.flatMap((category) =>
    result.riskHits[category].map((hit) => `${category}：${hit}`),
  );
  const time = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <section className="brand-card rounded-[28px] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-ink">验登结果</h2>
          <p className="mt-1 text-sm font-bold text-muted">刚刚完成 · {time}</p>
        </div>
        <Sticker tone="pink">合作需谨慎！</Sticker>
      </div>
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="rounded-[24px] border border-borderSoft bg-white p-5">
          <p className="text-sm font-semibold text-muted">含登量分数</p>
          <div className={`mt-2 text-7xl font-black ${getScoreColor(result.score)}`}>
            {result.score}
          </div>
          <p className="mt-2 text-sm font-semibold text-muted">/ 100</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-mint">
            <div
              className="h-full rounded-full bg-gradient-to-r from-success via-warning to-coral"
              style={{ width: `${result.score}%` }}
            />
          </div>
          <div className="mt-5">
            <Badge tone={getTone(result.score)}>{result.level}</Badge>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-black text-ink">{result.title}</h3>
            <Badge tone="neutral">当前场景：{result.scenario}</Badge>
            {result.riskTags.map((tag) => (
              <Badge key={tag} tone={tag === "正常合作型" ? "success" : "accent"}>
                {tag}
              </Badge>
            ))}
          </div>

          <p className="mt-4 text-base leading-7 text-muted">
            {result.explanation}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock
              title="命中的风险信号"
              empty="暂未命中明显风险话术。"
              items={riskSignals}
              tone="danger"
            />
            <InfoBlock
              title="正向合作信号"
              empty="暂未看到明确的预算、合同、交付或责任信号。"
              items={result.greenHits}
              tone="success"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <RiskRadar
          radar={result.radar}
          title="六维风险雷达"
          description="分数越高，代表该维度风险越明显。"
        />
      </div>

      <div className="mt-5">
        <div className="rounded-2xl border border-success/20 bg-mint p-5">
          <h3 className="text-base font-bold text-ink">建议动作</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{result.advice}</p>
        </div>
      </div>

      <div className="mt-5">
        <ReplyScripts scripts={result.replyScripts} title="三档体面回复" />
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
