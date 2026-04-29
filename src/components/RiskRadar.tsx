import { radarLabels } from "../lib/radar";
import type { RiskRadar as RiskRadarType } from "../lib/types";

type RiskRadarProps = {
  radar: RiskRadarType;
  title: string;
  description: string;
};

const radarOrder: Array<keyof RiskRadarType> = [
  "boundaryRisk",
  "responsibilityRisk",
  "respectRisk",
  "commitmentRisk",
  "intimacyRisk",
  "writtenProofRisk",
];

const getRiskColor = (score: number) => {
  if (score <= 30) return "#027A48";
  if (score <= 60) return "#B54708";
  return "#B42318";
};

export default function RiskRadar({
  radar,
  title,
  description,
}: RiskRadarProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-paper p-5">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted">{description}</p>

      <div className="mt-5 space-y-4">
        {radarOrder.map((dimension) => {
          const score = radar[dimension];
          const color = getRiskColor(score);

          return (
            <div key={dimension}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-ink">
                  {radarLabels[dimension]}
                </span>
                <span className="text-sm font-black" style={{ color }}>
                  {score}/100
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${score}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
