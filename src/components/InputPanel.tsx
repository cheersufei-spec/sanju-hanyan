type InputPanelProps = {
  value: string;
  error: string;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
};

export default function InputPanel({
  value,
  error,
  title = "粘贴对方回复",
  description = "不接后端，不存数据，所有判断都在本地完成。",
  placeholder = "请粘贴对方对三句话的回复。例如：“这个事情你先做起来，不要一上来就谈预算。年轻人要有格局，我们后面资源很多……”",
  buttonLabel = "开始验登",
  onChange,
  onAnalyze,
}: InputPanelProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">{title}</h2>
          <p className="mt-1 text-sm text-muted">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onAnalyze}
          className="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-accent/25"
        >
          {buttonLabel}
        </button>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-5 min-h-44 w-full resize-y rounded-xl border border-black/10 bg-paper/70 p-4 text-base leading-7 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
      />

      {error ? (
        <p className="mt-3 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </section>
  );
}
