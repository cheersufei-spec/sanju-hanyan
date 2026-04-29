import { calculateRiskRadar } from "./radar";
import { scenarioAdvice, type CollaborationScenario } from "./scenarios";
import type { ReplyScripts, RiskRadar } from "./types";

export type RiskCategory =
  | "白嫖画饼"
  | "打压PUA"
  | "人格打压"
  | "边界模糊"
  | "责任转嫁"
  | "权力压迫"
  | "亲密越界";

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
  scenario: CollaborationScenario;
  radar: RiskRadar;
  replyScripts: ReplyScripts;
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
    "后面机会很多",
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
  亲密越界: [
    "美女",
    "漂亮",
    "头像挺漂亮",
    "照片",
    "发张照片",
    "发美照",
    "有没有男朋友",
    "你单身吗",
    "晚上单独",
    "晚上",
    "单独",
    "私下",
    "深夜",
    "不要告诉别人",
    "别让别人知道",
    "喝一杯",
    "陪我喝点",
    "来我酒店",
    "酒店",
    "去我房间",
    "房间",
    "车上",
    "乖",
    "宝贝",
    "撒个娇",
    "看你表现",
    "你让我开心了",
  ],
};

const scenarioRiskLexicon: Partial<
  Record<CollaborationScenario, Partial<Record<RiskCategory, string[]>>>
> = {
  创作者商务: {
    白嫖画饼: [
      "免费试稿",
      "试稿",
      "先出一版",
      "免费出一版",
      "先给个方案",
      "曝光置换",
      "没有预算",
      "预算有限",
      "预算不多",
      "先看看效果",
    ],
    边界模糊: [
      "改到满意为止",
      "多改几版",
      "授权",
      "商用",
      "买断",
      "全平台使用",
      "永久使用",
    ],
  },
  求职面试: {
    白嫖画饼: ["先做个方案", "回去做个作业", "完整增长方案"],
    边界模糊: ["试用期再说", "薪资后面谈", "薪资后面再聊", "岗位边界后面定"],
    打压PUA: [
      "你先证明自己",
      "抗压能力",
      "我们节奏很快",
      "年轻人要吃苦",
      "别太看重钱",
      "价值观匹配",
      "创业公司都这样",
    ],
  },
  投资人沟通: {
    白嫖画饼: [
      "我可以帮你介绍很多人",
      "我先看看",
      "以后可以投",
      "保持联系",
    ],
    边界模糊: ["先发数据", "把后台给我看看", "详细客户名单", "完整财务模型"],
    人格打压: ["估值太高", "你们还不够成熟", "你这个不性感", "市场太小", "你们壁垒不够"],
  },
  甲乙方合作: {
    白嫖画饼: ["顺手帮一下", "小改一下"],
    边界模糊: [
      "需求再加一点",
      "改到满意",
      "付款流程比较慢",
      "月底再付",
      "先上线再说",
      "验收后再谈",
      "这个不算新增需求",
      "预算不变",
      "时间不变",
    ],
    责任转嫁: ["你们负责到底"],
  },
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
  亲密越界: "越界型老登",
};

const emptyRiskHits = (): Record<RiskCategory, string[]> => ({
  白嫖画饼: [],
  打压PUA: [],
  人格打压: [],
  边界模糊: [],
  责任转嫁: [],
  权力压迫: [],
  亲密越界: [],
});

const uniqueHits = (text: string, keywords: string[]) =>
  keywords.filter((keyword) => text.includes(keyword));

const clampScore = (score: number) => Math.max(0, Math.min(100, score));

const getRiskLexicon = (scenario: CollaborationScenario) => {
  const merged = { ...riskLexicon };
  const scenarioLexicon = scenarioRiskLexicon[scenario];

  if (!scenarioLexicon) {
    return merged;
  }

  (Object.keys(scenarioLexicon) as RiskCategory[]).forEach((category) => {
    merged[category] = [
      ...merged[category],
      ...(scenarioLexicon[category] ?? []),
    ];
  });

  return merged;
};

const hasBudgetAvoidance = (text: string) =>
  [
    "不要一上来就谈预算",
    "先别谈预算",
    "别谈预算",
    "不谈预算",
    "不要谈预算",
    "预算后面再说",
    "预算不多",
    "预算有限",
    "没有预算",
  ].some((keyword) => text.includes(keyword));

const getGreenHits = (text: string) =>
  greenLexicon.filter((keyword) => {
    if (keyword === "预算" && hasBudgetAvoidance(text)) {
      return false;
    }

    return text.includes(keyword);
  });

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

export function analyzeText(
  text: string,
  scenario: CollaborationScenario = "商务合作",
): AnalysisResult {
  const normalizedText = text.trim();
  const riskHits = emptyRiskHits();
  const activeRiskLexicon = getRiskLexicon(scenario);
  let score = 10;

  (Object.keys(activeRiskLexicon) as RiskCategory[]).forEach((category) => {
    riskHits[category] = uniqueHits(normalizedText, activeRiskLexicon[category]);
    const hitWeight =
      category === "人格打压" ? 18 : category === "亲密越界" ? 16 : 10;
    score += riskHits[category].length * hitWeight;
  });

  const greenHits = getGreenHits(normalizedText);
  score -= greenHits.length * 5;

  const matchedCategories = (Object.keys(riskHits) as RiskCategory[]).filter(
    (category) => riskHits[category].length > 0,
  );

  const hasAnyRiskHit = matchedCategories.length > 0;
  const hasPersonaAttack = riskHits["人格打压"].length > 0;
  const hasGenerationalLabel = riskHits["打压PUA"].includes("年轻人");
  const hasCooperationElement = cooperationElements.some((keyword) => {
    if (keyword === "预算" && hasBudgetAvoidance(normalizedText)) {
      return false;
    }

    return normalizedText.includes(keyword);
  });

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

  if (
    riskHits["白嫖画饼"].includes("先做起来") &&
    hasBudgetAvoidance(normalizedText)
  ) {
    score += 10;
  }

  const scenarioAdjustment = getScenarioAdjustment(
    normalizedText,
    scenario,
    riskHits,
    greenHits,
  );
  score += scenarioAdjustment.score;

  const finalScore = clampScore(
    Math.max(score, scenarioAdjustment.minimumScore ?? 0),
  );
  const levelConfig = getLevelConfig(finalScore);
  const advice = scenarioAdjustment.advice ?? levelConfig.advice;
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
  const radar = calculateRiskRadar(normalizedText, finalScore);
  const replyScripts = getReplyScripts(
    finalScore,
    riskHits["亲密越界"].length > 0,
    hasPersonaAttack || riskHits["打压PUA"].length > 0,
  );

  return {
    score: finalScore,
    ...levelConfig,
    advice,
    riskTags,
    riskHits,
    greenHits,
    explanation: explanationParts.join(" "),
    shareConclusion,
    scenario,
    radar,
    replyScripts,
  };
}

function getReplyScripts(
  score: number,
  hasIntimacyRisk: boolean,
  hasRespectRisk: boolean,
): ReplyScripts {
  if (hasIntimacyRisk) {
    return {
      gentle:
        "我们还是先聚焦合作本身吧。关于目标、分工、预算和交付，我建议用文字确认一下。",
      business:
        "这次沟通我希望保持在正式合作范围内。私人话题和单独私密场合我这边不方便，如有合作需求可以通过正式会议或文字同步。",
      firm:
        "我不接受在酒店、酒局、车内或私密空间沟通合作。基于目前沟通方式，我这边暂停继续推进。",
    };
  }

  if (hasRespectRisk) {
    return {
      gentle:
        "我理解你有不同判断。为了让沟通更有效，我们可以先回到合作目标、分工和结果标准本身。",
      business:
        "我希望这次沟通聚焦具体合作事项，包括目标、预算、交付和责任机制。对个人能力或动机的评价暂时不作为讨论重点。",
      firm:
        "我不接受以人格评价或代际标签来替代合作讨论。后续如需继续沟通，请回到具体事项和书面确认。",
    };
  }

  if (score <= 20) {
    return {
      gentle:
        "感谢你的说明，我这边可以基于目前信息继续推进。我们把目标、分工和时间节点简单同步成文字，后续执行会更高效。",
      business:
        "为了保证合作推进效率，建议我们先确认合作目标、双方投入、交付范围、时间节点和书面确认方式。",
      firm:
        "我这边可以继续推进，但关键合作事项需要先形成文字确认，包括目标、交付、时间节点和责任边界。",
    };
  }

  if (score <= 45) {
    return {
      gentle:
        "我理解这件事有长期价值。为了让双方投入更有效，我们先把交付范围、预算边界和时间节点确认一下。",
      business:
        "正式推进前，建议先确认合作目标、预算范围、双方投入、交付内容、验收方式和后续变更机制。",
      firm:
        "在预算、交付和责任机制没有确认前，我这边暂时不会投入进一步执行资源。",
    };
  }

  if (score <= 70) {
    return {
      gentle:
        "我愿意继续了解，但在正式投入前，需要先明确目标、交付范围、预算和责任机制。这样对双方都更稳妥。",
      business:
        "目前合作边界还不够清晰。建议先以书面方式确认预算、交付范围、时间节点、验收标准和责任分工，再决定是否推进。",
      firm:
        "在合作目标、预算、交付范围和责任分工不清晰的情况下，我这边不继续推进执行。",
    };
  }

  return {
    gentle:
      "感谢你的邀请。基于目前沟通方式和合作边界，我判断这次暂时不适合继续推进。祝项目顺利。",
    business:
      "基于目前沟通内容，合作目标、边界和责任机制尚不清晰，我这边暂不继续投入。后续如有正式合作需求，请通过书面方式同步。",
    firm:
      "这次沟通已经超出我能接受的合作边界。我会停止继续投入，也不接受在边界不清的情况下继续推进。",
  };
}

function getScenarioAdjustment(
  text: string,
  scenario: CollaborationScenario,
  riskHits: Record<RiskCategory, string[]>,
  greenHits: string[],
) {
  const adjustment: {
    score: number;
    minimumScore?: number;
    advice?: string;
  } = {
    score: 0,
    advice: scenarioAdvice[scenario],
  };

  if (scenario === "商务合作") {
    const hasBusinessContext = ["预算", "合作", "交付", "资源", "合同"].some(
      (keyword) => text.includes(keyword),
    );
    const hasPromise = ["先做起来", "后面再说", "长期价值", "以后资源"].some(
      (keyword) => text.includes(keyword),
    );

    if (hasBusinessContext && hasPromise) {
      adjustment.score += 10;
    }
  }

  if (scenario === "职场女性对外合作") {
    if (riskHits["亲密越界"].length > 0) {
      adjustment.score += 15;
    }

    const hasPrivateInvite = [
      "酒店",
      "房间",
      "车上",
      "私下",
      "单独",
      "晚上",
      "深夜",
      "不要告诉别人",
    ].some((keyword) => text.includes(keyword));

    if (hasPrivateInvite) {
      adjustment.minimumScore = 75;
    }
  }

  if (scenario === "创作者商务") {
    if (
      ["免费试稿", "先出一版", "免费出一版", "先看看效果", "曝光置换"].some(
        (keyword) => text.includes(keyword),
      )
    ) {
      adjustment.score += 15;
    }

    const hasBroadUsage = ["永久使用", "买断", "全平台使用"].some((keyword) =>
      text.includes(keyword),
    );
    const hasCommercialTerms = ["报价", "合同", "授权", "付款"].some(
      (keyword) => greenHits.includes(keyword) || text.includes(keyword),
    );

    if (hasBroadUsage && !hasCommercialTerms) {
      adjustment.score += 20;
    }
  }

  if (scenario === "求职面试") {
    const hasFreeAssignment = ["先做个方案", "回去做个作业", "完整增长方案"].some(
      (keyword) => text.includes(keyword),
    );
    const hasJobTerms = ["薪资", "岗位", "职责", "汇报线"].some((keyword) =>
      text.includes(keyword),
    );

    if (hasFreeAssignment && !hasJobTerms) {
      adjustment.score += 20;
    }

    if (
      ["薪资后面谈", "薪资后面再聊", "试用期再说", "你先证明自己"].some(
        (keyword) => text.includes(keyword),
      )
    ) {
      adjustment.score += 15;
    }
  }

  if (scenario === "投资人沟通") {
    if (
      ["完整数据", "后台", "客户名单", "财务模型", "把后台给我看看"].some(
        (keyword) => text.includes(keyword),
      )
    ) {
      adjustment.score += 20;
    }

    const hasValuationPressure = [
      "估值太高",
      "不够成熟",
      "不性感",
      "市场太小",
    ].some((keyword) => text.includes(keyword));

    if (hasValuationPressure && riskHits["人格打压"].length > 0) {
      adjustment.score += 15;
    }
  }

  if (scenario === "甲乙方合作") {
    const hasScopeCreep = ["新增需求", "需求再加一点", "这个不算新增需求"].some(
      (keyword) => text.includes(keyword),
    );
    const hasFixedConstraint = ["预算不变", "时间不变"].some((keyword) =>
      text.includes(keyword),
    );

    if (hasScopeCreep && hasFixedConstraint) {
      adjustment.score += 20;
    }

    if (
      ["付款流程比较慢", "付款流程慢", "月底再付", "验收后再谈"].some(
        (keyword) => text.includes(keyword),
      )
    ) {
      adjustment.score += 15;
    }
  }

  return adjustment;
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
