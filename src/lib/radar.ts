import type { RiskRadar } from "./types";

export const radarLabels: Record<keyof RiskRadar, string> = {
  boundaryRisk: "边界模糊风险",
  responsibilityRisk: "权责失衡风险",
  respectRisk: "尊重打压风险",
  commitmentRisk: "承诺空泛风险",
  intimacyRisk: "亲密越界风险",
  writtenProofRisk: "留痕抗拒风险",
};

const radarLexicon: Record<keyof RiskRadar, string[]> = {
  boundaryRisk: [
    "看情况",
    "到时候再说",
    "差不多",
    "不用这么细",
    "不用写",
    "信任最重要",
    "流程不用那么复杂",
    "不用这么正式",
    "后面再定",
    "先口头确认",
    "预算后面再说",
  ],
  responsibilityRisk: [
    "我要的是结果",
    "我只看结果",
    "结果不好就是执行问题",
    "你们自己想办法",
    "这是你的能力问题",
    "你们要对结果负责",
    "做不到就是能力不行",
    "资源不出",
    "责任你们担",
  ],
  respectRisk: [
    "年轻人",
    "格局",
    "你不懂",
    "你还不成熟",
    "能力配不上野心",
    "眼高手低",
    "你还不够格",
    "认清自己",
    "你这个水平",
    "你凭什么",
    "别太把自己当回事",
  ],
  commitmentRisk: [
    "长期价值",
    "以后资源很多",
    "后面机会很多",
    "不会亏待你",
    "给你机会",
    "先做起来",
    "先试试",
    "先帮忙",
    "先支持一下",
    "未来空间很大",
    "后面再说",
  ],
  intimacyRisk: [
    "美女",
    "漂亮",
    "身材",
    "性感",
    "发张照片",
    "发美照",
    "有没有男朋友",
    "你单身吗",
    "晚上单独聊",
    "喝一杯",
    "陪我喝点",
    "来我酒店",
    "酒店",
    "房间",
    "酒店房间",
    "去我房间",
    "车上聊",
    "乖",
    "宝贝",
    "撒个娇",
    "看你表现",
    "你让我开心了",
  ],
  writtenProofRisk: [
    "不用写",
    "没必要合同",
    "信任最重要",
    "先口头确认",
    "别搞这么正式",
    "合同后面再说",
    "不用留痕",
    "不用邮件",
    "不用这么麻烦",
    "先别写",
    "预算后面再说",
    "别让别人知道",
    "不要告诉别人",
  ],
};

const positiveCooperationWords = [
  "预算",
  "合同",
  "交付",
  "边界",
  "时间周期",
  "双方",
  "责任",
  "确认",
  "书面",
  "付款",
  "报价",
  "验收",
  "成功标准",
  "复盘",
];

const clamp = (score: number) => Math.max(0, Math.min(100, score));

export function calculateRiskRadar(text: string, totalScore: number): RiskRadar {
  const normalizedText = text.trim();
  const radar = Object.fromEntries(
    (Object.keys(radarLexicon) as Array<keyof RiskRadar>).map((dimension) => {
      const hits = radarLexicon[dimension].filter((keyword) =>
        normalizedText.includes(keyword),
      );
      let score = hits.length * 20;

      if (hits.length >= 2) {
        score += 15;
      }

      return [dimension, score];
    }),
  ) as RiskRadar;

  const hasPositiveCooperationWord = positiveCooperationWords.some((keyword) =>
    normalizedText.includes(keyword),
  );

  if (!hasPositiveCooperationWord) {
    radar.boundaryRisk += 10;
    radar.commitmentRisk += 10;
    radar.writtenProofRisk += 10;
  }

  const hasSecretPrivateInvite =
    normalizedText.includes("别让别人知道") ||
    normalizedText.includes("不要告诉别人");

  if (hasSecretPrivateInvite && radar.writtenProofRisk > 0) {
    radar.writtenProofRisk += 40;
  }

  (Object.keys(radar) as Array<keyof RiskRadar>).forEach((dimension) => {
    if (totalScore >= 70 && radar[dimension] > 0) {
      radar[dimension] = Math.max(radar[dimension], 45);
    }

    radar[dimension] = clamp(radar[dimension]);
  });

  return radar;
}

export function getTopRadarRisks(radar: RiskRadar) {
  const sorted = (Object.keys(radar) as Array<keyof RiskRadar>)
    .map((key) => ({
      key,
      label: radarLabels[key],
      score: radar[key],
    }))
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score >= 30);

  return sorted.slice(0, 2);
}
