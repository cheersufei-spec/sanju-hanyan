export default function FooterBar() {
  return (
    <footer className="brand-card mx-auto mt-8 max-w-[1440px] rounded-[28px] p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-black text-ink">适合谁用？</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-muted">
            <span>👩‍💼 职场人</span>
            <span>🎨 创作者</span>
            <span>🚀 创业者</span>
            <span>📌 项目负责人</span>
          </div>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-muted sm:grid-cols-3">
          <p>三句话，快速识别沟通风险</p>
          <p>保护时间与精力，远离坑型合作</p>
          <p>所有分析仅在本地，不上传、不保存</p>
        </div>
        <blockquote className="rounded-2xl bg-ink px-4 py-3 text-sm font-bold leading-6 text-white">
          “先验登，再合作，才是真·专业。” ♡
        </blockquote>
      </div>
    </footer>
  );
}
