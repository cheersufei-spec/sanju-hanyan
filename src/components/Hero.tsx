import Mascot from "./Mascot";
import Sticker from "./Sticker";

type HeroProps = {
  isSelfMode: boolean;
};

export default function Hero({ isSelfMode }: HeroProps) {
  return (
    <section className="brand-card relative mx-auto mt-6 max-w-[1440px] overflow-hidden rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
      <div className="absolute right-10 top-8 text-xl sparkle">✦</div>
      <div className="absolute bottom-10 left-8 text-lg text-coral/60">♡</div>
      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="hand-underline text-5xl font-black tracking-normal text-ink sm:text-7xl">
              {isSelfMode ? "自评登味儿" : "三句话验登"}
            </h1>
            <Sticker tone="mint">稳住！</Sticker>
          </div>
          <p className="mt-6 text-2xl font-black leading-tight text-ink sm:text-3xl">
            合作前，先看清对方；发消息前，也照见自己。
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {isSelfMode
              ? "在发出消息前，检查自己的表达是否清晰、尊重、对等、有边界。"
              : "用三句话，识别合作沟通中的潜在风险，帮你少走弯路、少踩坑。"}
          </p>
          <div className="mt-5 inline-flex rounded-2xl border border-borderSoft bg-white/80 px-4 py-3 text-sm font-bold text-muted">
            本工具仅评估合作沟通风险，不涉及真实年龄或个人信息。
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Mascot />
        </div>
      </div>
    </section>
  );
}
