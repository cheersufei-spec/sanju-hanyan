const questions = [
  {
    eyebrow: "第一句：测目标",
    text: "这次合作你最希望达成的具体结果是什么？我们怎么判断它算成功？",
  },
  {
    eyebrow: "第二句：测边界",
    text: "这件事双方分别投入什么资源？我的交付范围、时间周期和预算边界可以先确认一下吗？",
  },
  {
    eyebrow: "第三句：测责任",
    text: "如果中途需求变化，或者结果没有达到预期，我们怎么调整？责任和成本怎么分担？",
  },
];

export default function QuestionCards() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {questions.map((question) => (
        <article
          key={question.eyebrow}
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft"
        >
          <p className="text-sm font-semibold text-accent">{question.eyebrow}</p>
          <p className="mt-3 text-base font-medium leading-7 text-ink">
            {question.text}
          </p>
        </article>
      ))}
    </section>
  );
}
