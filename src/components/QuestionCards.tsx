const questions = [
  {
    number: "01",
    eyebrow: "测目标",
    icon: "◎",
    tone: "bg-[#F3DFC0]",
    text: "这次合作你最希望达成的具体结果是什么？\n我们怎么判断它算成功？",
  },
  {
    number: "02",
    eyebrow: "测边界",
    icon: "☑",
    tone: "bg-mint",
    text: "这件事双方分别投入什么资源？\n我的交付范围、时间周期和预算边界可以先确认一下吗？",
  },
  {
    number: "03",
    eyebrow: "测责任",
    icon: "?!",
    tone: "bg-blush/70",
    text: "如果中途需求变化，或者结果没有达到预期，\n我们怎么调整？责任和成本怎么分担？",
  },
];

export default function QuestionCards() {
  return (
    <section className="brand-card rounded-[28px] p-5">
      <div>
        <h2 className="text-2xl font-black text-ink">请先问对方三句话</h2>
        <p className="mt-1 text-sm font-medium text-muted">
          每句话仅一句内，越具体越准。
        </p>
      </div>
      <div className="mt-5 space-y-3">
        {questions.map((question) => (
          <article
            key={question.eyebrow}
            className="group grid grid-cols-[54px_1fr_44px] items-center gap-4 rounded-2xl border border-borderSoft bg-white p-4 transition hover:-translate-y-0.5 hover:border-accent"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${question.tone} text-sm font-black text-ink`}
            >
              {question.number}
            </div>
            <div>
              <p className="text-sm font-black text-accent">{question.eyebrow}</p>
              <p className="mt-1 whitespace-pre-line text-sm font-bold leading-6 text-ink">
                {question.text}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-lg font-black text-ink transition group-hover:bg-ink group-hover:text-white">
              {question.icon}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
