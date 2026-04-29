export type RiskCategory =
  | "白嫖画饼"
  | "打压PUA"
  | "人格打压"
  | "边界模糊"
  | "责任转嫁"
  | "权力压迫";

export type AnalysisResult = {
  score: number;
  level: string;
  title: string;
  advice: string;
  reply: string;
  riskTags: string[];
  riskHits: Record<RiskCategory, string[]>;
  greenHits: string[];
  explanation: string;
  shareConclusion: string;
};

const riskLexicon: Record<RiskCategory, string[]> = {
  白嫖画饼: [
    "先做起来",
    "以后资源",
    "长期价值",
    "不会亏待你",
    "给你机会",
    "资源很多",
    "先帮忙",
    "免费",
    "置换",
    "曝光",
    "后面合作",
    "先试试",
    "先支持一下",
  ],
  打压PUA: [
    "年轻人",
    "格局",
    "别计较",
    "太功利",
    "太敏感",
    "你不懂",
    "态度不对",
    "不成熟",
    "吃亏是福",
    "多做点没坏处",
    "你还年轻",
    "不要这么现实",
    "别那么计较",
  ],
  人格打压: [
    "能力配不上野心",
    "眼高手低",
    "心比天高",
    "不自量力",
    "你还不够格",
    "你配吗",
    "你以为你是谁",
    "你这个水平",
    "你这种人",
    "太把自己当回事",
    "年轻人别太狂",
    "先掂量自己",
    "你有什么资格",
    "你凭什么",
    "别太把自己当回事",
    "野心太大",
    "能力不行",
    "认清自己",
  ],
  边界模糊: [
    "看情况",
    "到时候再说",
    "差不多",
    "不用这么细",
    "不用写",
    "信任最重要",
    "没必要合同",
    "先别谈预算",
    "流程不用那么复杂",
    "不用这么正式",
    "后面再定",
  ],
  责任转嫁: [
    "结果不好就是执行问题",
    "我要的是结果",
    "不看过程",
    "你们自己想办法",
    "这是你的能力问题",
    "别找理由",
    "我只看结果",
    "结果没出来就没有意义",
    "你们要对结果负责",
  ],
  权力压迫: [
    "我认识很多人",
    "我给你背书",
    "这个圈子很小",
    "你以后还要发展",
    "别把关系搞僵",
    "你知道我是谁吗",
    "我见过很多你这样的人",
    "你这个阶段应该多学习",
  ],
};

const greenLexicon = [
  "预算",
  "合同",
  "交付",
  "边界",
  "时间周期",
  "里程碑",
  "双方",
  "责任",
  "确认",
  "书面",
  "付款",
  "报价",
  "需求变化",
  "复盘",
  "调整机制",
  "资源投入",
  "成功标准",
  "验收",
  "权益",
  "发票",
  "排期",
  "对齐",
];

const cooperationElements = [
  "目标",
  "预算",
  "交付",
  "边界",
  "合同",
  "责任",
  "时间",
  "验收",
  "付款",
  "双方",
  "资源投入",
  "成功标准",
];

const riskTagMap: Record<RiskCategory, string> = {
  白嫖画饼: "画饼型老登",
  打压PUA: "爹味型老登",
  人格打压: "羞辱型老登",
  边界模糊: "糊弄型老登",
  责任转嫁: "甩锅型老登",
  权力压迫: "压迫型老登",
};

const emptyRiskHits = (): Record<RiskCategory, string[]> => ({
  白嫖画饼: [],
  打压PUA: [],
  人格打压: [],
  边界模糊: [],
  责任转嫁: [],
  权力压迫: [],
});

const uniqueHits = (text: string, keywords: string[]) =>
  keywords.filter((keyword) => text.includes(keyword));

const clampScore = (score: number) => Math.max(0, Math.min(100, score));

const getLevelConfig = (score: number) => {
  if (score <= 20) {
    return {
      level: "低含登量",
      title: "清爽合作者",
      advice: "可以继续推进，但关键事项依然建议书面确认。",
      reply:
        "感谢你的说明，我这边可以基于目前信息继续推进。我们把目标、分工和时间节点简单同步成文字，后续执行会更高效。",
    };
  }

  if (score <= 45) {
    return {
      level: "轻微含登",
      title: "有点爹味，但暂时可控",
      advice: "可以继续聊，但要尽快确认预算、交付和责任边界。",
      reply:
        "我理解这件事有长期价值。为了保证双方投入都有效，我建议我们先把交付范围、预算边界和时间节点确认一下。",
    };
  }

  if (score <= 70) {
    return {
      level: "中高含登",
      title: "合作风险明显",
      advice: "建议降低投入，只接受书面确认后的合作。不要被画饼带节奏。",
      reply:
        "我愿意继续了解，但在正式投入前，需要先明确目标、交付范围、预算和责任机制。这样对双方都更稳妥。",
    };
  }

  return {
    level: "高含登量",
    title: "红灯老登",
    advice: "建议停止深度投入。对方大概率会白嫖、打压或事后改口。",
    reply:
      "感谢你的邀请。基于目前沟通方式和合作边界，我判断这次暂时不适合继续推进。祝项目顺利。",
  };
};

export function analyzeText(text: string): AnalysisResult {
  const normalizedText = text.trim();
  const riskHits = emptyRiskHits();
  let score = 10;

  (Object.keys(riskLexicon) as RiskCategory[]).forEach((category) => {
    riskHits[category] = uniqueHits(normalizedText, riskLexicon[category]);
    const hitWeight = category === "人格打压" ? 18 : 10;
    score += riskHits[category].length * hitWeight;
  });

  const greenHits = uniqueHits(normalizedText, greenLexicon);
  score -= greenHits.length * 5;

  const matchedCategories = (Object.keys(riskHits) as RiskCategory[]).filter(
    (category) => riskHits[category].length > 0,
  );

  const hasAnyRiskHit = matchedCategories.length > 0;
  const hasPersonaAttack = riskHits["人格打压"].length > 0;
  const hasGenerationalLabel = riskHits["打压PUA"].includes("年轻人");
  const hasCooperationElement = cooperationElements.some((keyword) =>
    normalizedText.includes(keyword),
  );

  if (hasGenerationalLabel && hasPersonaAttack) {
    score += 15;
    // The combo bonus already accounts for "年轻人" as a generational attack.
    score -= 10;
  }

  if (greenHits.length === 0 && hasAnyRiskHit) {
    score += 15;
  }

  if (!hasCooperationElement && hasAnyRiskHit) {
    score += 10;
  }

  if (matchedCategories.length >= 3) {
    score += 10;
  }

  if (
    riskHits["打压PUA"].includes("年轻人") &&
    riskHits["打压PUA"].includes("格局")
  ) {
    score += 10;
  }

  const hasBudgetAvoidance =
    normalizedText.includes("不要一上来就谈预算") ||
    normalizedText.includes("先别谈预算") ||
    normalizedText.includes("别谈预算") ||
    normalizedText.includes("不谈预算") ||
    normalizedText.includes("不要谈预算");

  if (riskHits["白嫖画饼"].includes("先做起来") && hasBudgetAvoidance) {
    score += 10;
  }

  const finalScore = clampScore(score);
  const levelConfig = getLevelConfig(finalScore);
  const riskTags =
    matchedCategories.length > 0
      ? matchedCategories.map((category) => riskTagMap[category])
      : ["正常合作型"];

  const riskCount = matchedCategories.length;
  const explanationParts =
    riskCount === 0
      ? [
          "这段回复里没有明显打压、画饼、甩锅或边界模糊表达，并出现了可推进合作的具体信号。",
        ]
      : [
          `这段回复命中了 ${riskCount} 类风险信号：${matchedCategories.join("、")}。建议先把目标、预算、交付和责任写清楚，再决定投入程度。`,
        ];

  if (hasPersonaAttack) {
    explanationParts.push(
      "对方没有回应合作中的目标、边界或责任，转而评价你的能力与野心。这是典型的人格打压信号。",
    );
  }

  if (hasGenerationalLabel && hasPersonaAttack) {
    explanationParts.push(
      "对方使用代际标签压低你的表达位置，容易让合作从事实讨论变成人身评判。",
    );
  }

  const shareConclusion = getShareConclusion(finalScore, hasPersonaAttack);

  return {
    score: finalScore,
    ...levelConfig,
    riskTags,
    riskHits,
    greenHits,
    explanation: explanationParts.join(" "),
    shareConclusion,
  };
}

function getShareConclusion(score: number, hasPersonaAttack: boolean) {
  if (hasPersonaAttack) {
    return "对方没有回答合作问题，转而评价你这个人。建议降权。";
  }

  if (score >= 71) {
    return "不要先交付，不要先垫资源，不要被画饼带节奏。";
  }

  if (score <= 20) {
    return "对方能讨论目标、边界和责任，可以继续推进，但建议书面确认。";
  }

  return "这个合作，先让对方写清楚。";
}
