import {
  scenarioDescriptions,
  scenarioOptions,
  type CollaborationScenario,
} from "../lib/scenarios";

type ScenarioSelectProps = {
  value: CollaborationScenario;
  onChange: (scenario: CollaborationScenario) => void;
};

export default function ScenarioSelect({
  value,
  onChange,
}: ScenarioSelectProps) {
  return (
    <section className="brand-card rounded-[28px] p-5 sm:p-6">
      <label className="block text-sm font-bold text-ink" htmlFor="scenario">
        当前场景：
      </label>
      <select
        id="scenario"
        value={value}
        onChange={(event) => onChange(event.target.value as CollaborationScenario)}
        className="mt-3 w-full rounded-2xl border border-borderSoft bg-card px-4 py-3 text-base font-bold text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
      >
        {scenarioOptions.map((scenario) => (
          <option key={scenario} value={scenario}>
            {scenario}
          </option>
        ))}
      </select>
      <p className="mt-3 text-sm leading-6 text-muted">
        {scenarioDescriptions[value]}
      </p>
    </section>
  );
}
