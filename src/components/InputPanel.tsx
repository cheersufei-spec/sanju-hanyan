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
  placeholder = "在这里粘贴对方的回复...\n越完整越准，支持多段内容。",
  buttonLabel = "✨ 开始验登",
  onChange,
  onAnalyze,
}: InputPanelProps) {
  return (
    <section className="brand-card rounded-[28px] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-ink">{title}</h2>
          <p className="mt-1 text-sm font-medium text-muted">{description}</p>
        </div>
        <p className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">
          Ctrl + Enter 立即验登
        </p>
      </div>

      <div className="relative mt-5">
        <textarea
          value={value}
          maxLength={5000}
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
              onAnalyze();
            }
          }}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-52 w-full resize-y rounded-[24px] border border-borderSoft bg-card p-5 pb-10 text-base leading-7 text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
        />
        <span className="absolute bottom-4 right-5 text-xs font-bold text-muted">
          {value.length} / 5000
        </span>
      </div>

      {error ? (
        <p className="mt-3 rounded-2xl border border-danger/20 bg-coral/10 px-4 py-3 text-sm font-bold text-danger">
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex items-center gap-4">
        <span className="hidden text-2xl text-accent sm:block">↘</span>
        <button
          type="button"
          onClick={onAnalyze}
          className="w-full rounded-full bg-gradient-to-r from-ink to-[#3a302b] px-7 py-4 text-base font-black text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-accent/25 sm:w-auto sm:min-w-64"
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}
