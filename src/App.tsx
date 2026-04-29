import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import InputPanel from "./components/InputPanel";
import QuestionCards from "./components/QuestionCards";
import ResultPanel from "./components/ResultPanel";
import ScenarioSelect from "./components/ScenarioSelect";
import ShareCard from "./components/ShareCard";
import SelfResultPanel from "./components/SelfResultPanel";
import SelfShareCard from "./components/SelfShareCard";
import { analyzeText, type AnalysisResult } from "./lib/scoring";
import type { CollaborationScenario } from "./lib/scenarios";
import {
  analyzeSelfText,
  type SelfAnalysisResult,
} from "./lib/scoringSelf";

const sampleText =
  "这个事情你先做起来，不要一上来就谈预算。年轻人要有格局，我们后面资源很多，不会亏待你。具体怎么合作到时候再说，先看你们执行能力。";

type Mode = "check" | "self";

export default function App() {
  const [mode, setMode] = useState<Mode>("check");
  const [text, setText] = useState("");
  const [scenario, setScenario] =
    useState<CollaborationScenario>("商务合作");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selfText, setSelfText] = useState("");
  const [selfScenario, setSelfScenario] =
    useState<CollaborationScenario>("商务合作");
  const [selfError, setSelfError] = useState("");
  const [selfResult, setSelfResult] = useState<SelfAnalysisResult | null>(null);

  const sampleResult = useMemo(() => analyzeText(sampleText, scenario), [scenario]);

  const handleTextChange = (value: string) => {
    setText(value);
    setError("");

    if (!value.trim()) {
      setResult(null);
      return;
    }

    if (result) {
      setResult(analyzeText(value, scenario));
    }
  };

  const handleScenarioChange = (nextScenario: CollaborationScenario) => {
    setScenario(nextScenario);

    if (text.trim() && result) {
      setResult(analyzeText(text, nextScenario));
    }
  };

  const handleAnalyze = () => {
    if (!text.trim()) {
      setError("先粘贴对方回复，再开始验登。");
      return;
    }

    setError("");
    setResult(analyzeText(text, scenario));
  };

  const handleSelfTextChange = (value: string) => {
    setSelfText(value);
    setSelfError("");

    if (!value.trim()) {
      setSelfResult(null);
      return;
    }

    if (selfResult) {
      setSelfResult(analyzeSelfText(value, selfScenario));
    }
  };

  const handleSelfScenarioChange = (nextScenario: CollaborationScenario) => {
    setSelfScenario(nextScenario);

    if (selfText.trim() && selfResult) {
      setSelfResult(analyzeSelfText(selfText, nextScenario));
    }
  };

  const handleSelfAnalyze = () => {
    if (!selfText.trim()) {
      setSelfError("先粘贴你准备发送的话，再开始自评。");
      return;
    }

    setSelfError("");
    setSelfResult(analyzeSelfText(selfText, selfScenario));
  };

  const isSelfMode = mode === "self";

  return (
    <main className="min-h-screen bg-paper px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[960px]">
        <nav className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-soft">
          <TabButton
            active={mode === "check"}
            onClick={() => setMode("check")}
          >
            三句话验登
          </TabButton>
          <TabButton active={isSelfMode} onClick={() => setMode("self")}>
            自评登味儿
          </TabButton>
        </nav>

        <header className="rounded-3xl border border-black/10 bg-white px-6 py-8 shadow-soft sm:px-8 sm:py-10">
          <div className="inline-flex rounded-full border border-accent/35 bg-accent/15 px-4 py-2 text-sm font-bold text-ink">
            {isSelfMode ? "发送前沟通自检" : "合作风险预检工具"}
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-normal text-ink sm:text-6xl">
            {isSelfMode ? "自评登味儿" : "三句话验登"}
          </h1>
          <p className="mt-4 text-xl font-bold text-ink sm:text-2xl">
            {isSelfMode
              ? "发消息前，也照见自己。"
              : "合作前，先看清对方。"}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
            {isSelfMode
              ? "有时候我们被别人打压，也有时候我们在压力、惯性和权力位置里，不小心把沟通变成了压迫。「自评登味儿」帮你在发出消息前，检查自己的表达是否清晰、尊重、对等、有边界。"
              : "粘贴对方在合作沟通中的回复，识别打压、白嫖、画饼、甩锅、越界和事后改口风险。"}
          </p>
          <p className="mt-3 text-sm font-medium text-muted">
            {isSelfMode
              ? "本功能用于合作沟通自检，帮助你把话说得更清楚、更体面、更不伤人。"
              : "本工具评估的是合作沟通风险，不评估真实年龄。"}
          </p>
        </header>

        {isSelfMode ? (
          <SelfMode
            text={selfText}
            scenario={selfScenario}
            error={selfError}
            result={selfResult}
            onTextChange={handleSelfTextChange}
            onScenarioChange={handleSelfScenarioChange}
            onAnalyze={handleSelfAnalyze}
          />
        ) : (
          <CheckMode
            text={text}
            scenario={scenario}
            error={error}
            result={result}
            sampleScore={sampleResult.score}
            onTextChange={handleTextChange}
            onScenarioChange={handleScenarioChange}
            onAnalyze={handleAnalyze}
            onUseSample={() => {
              setText(sampleText);
              setError("");
              setResult(analyzeText(sampleText, scenario));
            }}
          />
        )}
      </div>
    </main>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-sm font-black transition ${
        active
          ? "bg-ink text-white"
          : "bg-transparent text-muted hover:bg-paper hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function CheckMode({
  text,
  scenario,
  error,
  result,
  sampleScore,
  onTextChange,
  onScenarioChange,
  onAnalyze,
  onUseSample,
}: {
  text: string;
  scenario: CollaborationScenario;
  error: string;
  result: AnalysisResult | null;
  sampleScore: number;
  onTextChange: (value: string) => void;
  onScenarioChange: (scenario: CollaborationScenario) => void;
  onAnalyze: () => void;
  onUseSample: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <QuestionCards />
      <ScenarioSelect value={scenario} onChange={onScenarioChange} />
      <InputPanel
        value={text}
        error={error}
        onChange={onTextChange}
        onAnalyze={onAnalyze}
      />

      {result ? (
        <>
          <ResultPanel result={result} />
          <ShareCard result={result} />
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-black/15 bg-white/65 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-ink">还没开始验登</h2>
              <p className="mt-1 text-sm leading-6 text-muted">
                粘贴对方回复后点击按钮。示例高风险样本当前可算到{" "}
                <span className="font-bold text-danger">{sampleScore}</span> 分。
              </p>
            </div>
            <button
              type="button"
              onClick={onUseSample}
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
            >
              填入高风险样例
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function SelfMode({
  text,
  scenario,
  error,
  result,
  onTextChange,
  onScenarioChange,
  onAnalyze,
}: {
  text: string;
  scenario: CollaborationScenario;
  error: string;
  result: SelfAnalysisResult | null;
  onTextChange: (value: string) => void;
  onScenarioChange: (scenario: CollaborationScenario) => void;
  onAnalyze: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <ScenarioSelect value={scenario} onChange={onScenarioChange} />
      <InputPanel
        value={text}
        error={error}
        title="粘贴你准备发送的话"
        description="不接后端，不存数据，只做发送前的本地表达风险自检。"
        placeholder="请粘贴你准备发给对方的话。例如：“你们先做起来吧，年轻人不要一上来就谈预算。这个事情长期价值很大，后面资源不会少……”"
        buttonLabel="开始自评"
        onChange={onTextChange}
        onAnalyze={onAnalyze}
      />

      {result ? (
        <>
          <SelfResultPanel result={result} />
          <SelfShareCard result={result} />
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-black/15 bg-white/65 p-6">
          <h2 className="text-lg font-bold text-ink">还没开始自评</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            粘贴准备发送的话，先把压迫感、画饼感和越界感拦在发送键前。
          </p>
        </section>
      )}
    </div>
  );
}
