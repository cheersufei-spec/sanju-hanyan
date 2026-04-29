import { useMemo, useState } from "react";
import FooterBar from "./components/FooterBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
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
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 lg:px-8">
      <Header mode={mode} onModeChange={setMode} />
      <Hero isSelfMode={isSelfMode} />
      <div className="mx-auto max-w-[1440px]">
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
      <FooterBar />
    </main>
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
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,520px)_minmax(300px,380px)]">
      <section className="space-y-5">
        <QuestionCards />
        <ScenarioSelect value={scenario} onChange={onScenarioChange} />
        <InputPanel
          value={text}
          error={error}
          onChange={onTextChange}
          onAnalyze={onAnalyze}
        />
      </section>

      <section>
        {result ? (
          <ResultPanel result={result} />
        ) : (
          <EmptyState
            title="还没开始验登"
            description={`粘贴对方回复后点击按钮。示例高风险样本当前可算到 ${sampleScore} 分。`}
            actionLabel="填入高风险样例"
            onAction={onUseSample}
          />
        )}
      </section>

      <aside className="xl:sticky xl:top-28 xl:self-start">
        {result ? (
          <ShareCard result={result} />
        ) : (
          <SharePlaceholder />
        )}
      </aside>
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
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,520px)_minmax(300px,380px)]">
      <section className="space-y-5">
        <ScenarioSelect value={scenario} onChange={onScenarioChange} />
        <InputPanel
          value={text}
          error={error}
          title="粘贴你准备发送的话"
          description="不接后端，不存数据，只做发送前的本地表达风险自检。"
          placeholder="请粘贴你准备发给对方的话。例如：“你们先做起来吧，年轻人不要一上来就谈预算。这个事情长期价值很大，后面资源不会少……”"
          buttonLabel="✨ 开始自评"
          onChange={onTextChange}
          onAnalyze={onAnalyze}
        />
      </section>

      <section>
        {result ? (
          <SelfResultPanel result={result} />
        ) : (
          <EmptyState
            title="还没开始自评"
            description="粘贴准备发送的话，先把压迫感、画饼感和越界感拦在发送键前。"
          />
        )}
      </section>

      <aside className="xl:sticky xl:top-28 xl:self-start">
        {result ? (
          <SelfShareCard result={result} />
        ) : (
          <SharePlaceholder />
        )}
      </aside>
    </div>
  );
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <section className="brand-card rounded-[28px] border-dashed p-6">
      <p className="inline-flex rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">
        等待分析
      </p>
      <h2 className="mt-4 text-2xl font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-full border border-accent/40 bg-white px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

function SharePlaceholder() {
  return (
    <section className="brand-card rounded-[28px] p-5">
      <p className="text-sm font-black text-ink">一键分享你的验登卡片</p>
      <div className="mt-4 rounded-3xl bg-ink p-5 text-white">
        <p className="text-sm text-white/60">三句话验登</p>
        <p className="mt-2 text-2xl font-black">合作前验一验</p>
        <p className="mt-1 text-sm text-white/70">少踩坑，多安心</p>
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-white/60">分享卡片将在分析后生成</p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-borderSoft bg-white p-4 text-center text-sm font-bold text-muted">
        长按识别二维码，试试「三句话验登」
      </div>
    </section>
  );
}
