export type SelfRiskCategory =
  | "画饼不承诺"
  | "预算回避"
  | "语气打压"
  | "边界模糊"
  | "责任转嫁"
  | "权力压迫"
  | "亲密越界"
  | "过度说教";

export type SelfAnalysisResult = {
  score: number;
  level: string;
  title: string;
  summary: string;
  riskTags: string[];
  riskHits: Record<SelfRiskCategory, string[]>;
  potentialImpact: string;
  advice: string;
  rewrittenMessage: string;
};

const selfRiskLexicon: Record<SelfRiskCategory, string[]> = {
  画饼不承诺: [
    "长期价值",
    "以后资源很多",
    "后面机会很多",
    "后面资源不会少",
    "不会亏待你",
    "给你机会",
    "我可以给你介绍资源",
    "我可以带你见人",
    "先做起来",
    "先试试",
    "先帮忙",
    "先支持一下",
    "后面再说",
    "未来空间很大",
    "这个对你有好处",
  ],
  预算回避: [
    "先别谈预算",
    "不要一上来就谈钱",
    "不要一上来就谈预算",
    "钱不是最重要的",
    "预算后面再说",
    "先看效果",
    "看结果再定",
    "先做出东西",
    "先证明能力",
    "先跑起来",
    "别这么功利",
    "别太现实",
  ],
  语气打压: [
    "年轻人",
    "你不懂",
    "你还不成熟",
    "你这个阶段",
    "你要多学习",
    "你太敏感",
    "你太功利",
    "格局小了",
    "不要太计较",
    "能力配不上野心",
    "眼高手低",
    "你还不够格",
    "认清自己",
    "你这个水平",
    "你凭什么",
    "别太把自己当回事",
  ],
  边界模糊: [
    "看情况",
    "到时候再说",
    "差不多",
    "不用这么细",
    "不用写那么清楚",
    "没必要合同",
    "信任最重要",
    "流程不用那么复杂",
    "不用这么正式",
    "后面再定",
    "先口头确认",
    "别搞这么麻烦",
  ],
  责任转嫁: [
    "我要的是结果",
    "我只看结果",
    "过程不重要",
    "结果不好就是执行问题",
    "你们自己想办法",
    "这是你的能力问题",
    "别找理由",
    "你们要对结果负责",
    "做不到就是能力不行",
  ],
  权力压迫: [
    "这个圈子很小",
    "别把关系搞僵",
    "我认识很多人",
    "我可以给你背书",
    "我可以带你见很多投资人",
    "带你见很多投资人",
    "你以后还要发展",
    "我见过很多你这样的人",
    "你知道我是谁吗",
    "你要懂得把握机会",
    "这个机会不是谁都有",
  ],
  亲密越界: [
    "美女",
    "漂亮",
    "身材",
    "性感",
    "有女人味",
    "发张照片",
    "发美照",
    "有没有男朋友",
    "你单身吗",
    "晚上单独聊",
    "喝一杯",
    "陪我喝点",
    "来我酒店",
    "去我房间",
    "车上聊",
    "乖",
    "宝贝",
    "撒个娇",
    "女生温柔一点",
    "女生聪明一点",
    "女生不要太强势",
    "会来事",
    "看你表现",
    "你让我开心了",
  ],
  过度说教: [
    "我教你",
    "听我的",
    "我跟你说",
    "你应该",
    "你必须",
    "你要明白",
    "你要知道",
    "我这是为你好",
    "我比你经历多",
    "我吃过的盐比你吃过的饭多",
    "按我说的做",
    "不要反驳",
    "你先听完",
  ],
};

const positiveLexicon = [
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
  "尊重",
  "方便的话",
  "是否合适",
  "你觉得",
  "我们可以先确认",
  "如果你愿意",
  "我这边可以提供",
  "明确一下",
  "以文字为准",
];

const clearCooperationElements = [
  "预算",
  "合同",
  "交付",
  "边界",
  "时间",
  "责任",
  "付款",
  "验收",
  "目标",
  "双方",
  "书面",
  "确认",
];

const selfRiskTagMap: Record<SelfRiskCategory, string> = {
  画饼不承诺: "画饼感",
  预算回避: "白嫖感",
  语气打压: "爹味感",
  边界模糊: "糊弄感",
  责任转嫁: "甩锅感",
  权力压迫: "压迫感",
  亲密越界: "越界感",
  过度说教: "说教感",
};

const emptyRiskHits = (): Record<SelfRiskCategory, string[]> => ({
  画饼不承诺: [],
  预算回避: [],
  语气打压: [],
  边界模糊: [],
  责任转嫁: [],
  权力压迫: [],
  亲密越界: [],
  过度说教: [],
});

const uniqueHits = (text: string, keywords: string[]) =>
  keywords.filter((keyword) => text.includes(keyword));

const clampScore = (score: number) => Math.max(0, Math.min(100, score));

const hasBudgetAvoidance = (text: string) =>
  [
    "先别谈预算",
    "不要一上来就谈预算",
    "预算后面再说",
    "别谈预算",
    "不谈预算",
  ].some((keyword) => text.includes(keyword));

const getPositiveHits = (text: string) =>
  positiveLexicon.filter((keyword) => {
    if (keyword === "预算" && hasBudgetAvoidance(text)) {
      return false;
    }

    return text.includes(keyword);
  });

const getLevelConfig = (score: number) => {
  if (score <= 20) {
    return {
      level: "清爽表达",
      title: "表达清楚，边界感在线",
      summary: "你的表达比较尊重、清晰、对等，可以发送。",
      advice: "建议保留关键合作事项的书面确认。",
    };
  }

  if (score <= 45) {
    return {
      level: "微量登味",
      title: "有点上位，但可以修",
      summary: "这段话里有少量含糊、说教或压迫感，建议优化后再发。",
      advice: "减少评价对方，增加目标、预算、交付和边界。",
    };
  }

  if (score <= 70) {
    return {
      level: "登味明显",
      title: "对方可能会不舒服",
      summary: "这段话容易让对方感到被打压、被画饼或边界不清。",
      advice: "建议重写，把表达从评价人改成讨论事。",
    };
  }

  return {
    level: "登味爆表",
    title: "建议不要直接发送",
    summary: "这段话可能造成明显压迫感、白嫖感或越界感。",
    advice: "请先删除打压、画饼、暧昧或权力压迫表达，再重新组织合作信息。",
  };
};

export function analyzeSelfText(text: string): SelfAnalysisResult {
  const normalizedText = text.trim();
  const riskHits = emptyRiskHits();
  let score = 5;

  (Object.keys(selfRiskLexicon) as SelfRiskCategory[]).forEach((category) => {
    riskHits[category] = uniqueHits(normalizedText, selfRiskLexicon[category]);
    const hitWeight =
      category === "亲密越界" ? 16 : category === "语气打压" ? 14 : 10;
    score += riskHits[category].length * hitWeight;
  });

  const positiveHits = getPositiveHits(normalizedText);
  score -= positiveHits.length * 6;

  const matchedCategories = (
    Object.keys(riskHits) as SelfRiskCategory[]
  ).filter((category) => riskHits[category].length > 0);

  const hasRiskHit = matchedCategories.length > 0;
  const hasYoungCombo =
    normalizedText.includes("年轻人") &&
    ["格局", "不成熟", "多学习", "太计较", "能力配不上野心"].some(
      (keyword) => normalizedText.includes(keyword),
    );
  const hasResourcePromise = ["资源", "机会", "介绍", "背书"].some(
    (keyword) => normalizedText.includes(keyword),
  );
  const hasPreCommitAsk = [
    "先做起来",
    "先帮忙",
    "先试试",
    "预算后面再说",
  ].some((keyword) => normalizedText.includes(keyword));
  const hasPrivateBoundaryRisk = riskHits["亲密越界"].length > 0;
  const hasCooperationContext = [
    "合作",
    "资源",
    "机会",
    "投资",
    "客户",
    "项目",
    "介绍",
  ].some((keyword) => normalizedText.includes(keyword));
  const hasClearCooperationElement = clearCooperationElements.some((keyword) => {
    if (keyword === "预算" && hasBudgetAvoidance(normalizedText)) {
      return false;
    }

    return normalizedText.includes(keyword);
  });

  if (hasYoungCombo) {
    score += 15;
  }

  if (hasResourcePromise && hasPreCommitAsk) {
    score += 15;
  }

  if (hasPrivateBoundaryRisk && hasCooperationContext) {
    score += 20;
  }

  if (!hasClearCooperationElement && hasRiskHit) {
    score += 15;
  }

  const finalScore = clampScore(score);
  const levelConfig = getLevelConfig(finalScore);
  const riskTags =
    matchedCategories.length > 0
      ? matchedCategories.map((category) => selfRiskTagMap[category])
      : ["清爽合作感"];

  return {
    score: finalScore,
    ...levelConfig,
    riskTags,
    riskHits,
    potentialImpact: getPotentialImpact(matchedCategories, riskHits),
    rewrittenMessage: getRewrittenMessage(matchedCategories),
  };
}

function getPotentialImpact(
  categories: SelfRiskCategory[],
  riskHits: Record<SelfRiskCategory, string[]>,
) {
  if (categories.length === 0) {
    return "对方大概率会觉得这段表达比较清楚、尊重，合作事项也有继续对齐的空间。";
  }

  const impactMap: Record<SelfRiskCategory, string> = {
    画饼不承诺:
      "对方可能会觉得你在用未来资源替代当下承诺，容易产生被画饼或被免费使用的感觉。",
    预算回避: "对方可能会觉得你在回避成本和付款问题，合作安全感会下降。",
    语气打压: "对方可能会觉得你在评价 TA 这个人，而不是讨论具体合作问题。",
    边界模糊: "对方可能会觉得这件事没有清晰范围，后续容易加需求或改口。",
    责任转嫁:
      "对方可能会担心自己承担全部结果压力，而你没有承担相应资源和责任。",
    权力压迫: "对方可能会感到你在用身份、圈层或资源位置施压。",
    亲密越界:
      "对方可能会觉得合作场景被私人化、暧昧化，安全感和专业感都会下降。",
    过度说教: "对方可能会觉得自己被教育、被矮化，沟通会从合作变成上下级训话。",
  };

  const impacts = categories.map((category) => impactMap[category]);
  const hasGenderedBoundary =
    riskHits["亲密越界"].some((hit) => hit.includes("女生")) ||
    riskHits["亲密越界"].includes("会来事");

  if (hasGenderedBoundary) {
    impacts.push("尤其是性别化表达，会让正式合作显得不够专业和对等。");
  }

  return impacts.join("");
}

function getRewrittenMessage(categories: SelfRiskCategory[]) {
  if (categories.includes("亲密越界")) {
    return "我们先聚焦合作本身。关于目标、预算、交付和时间安排，可以通过文字或正式会议确认。";
  }

  if (categories.includes("预算回避") || categories.includes("画饼不承诺")) {
    return "这件事我们可以先对齐目标、双方投入、预算范围和交付边界。如果方向合适，我们再确认时间节点和书面合作方式。";
  }

  if (categories.includes("语气打压")) {
    return "我理解我们对这件事的判断可能不完全一样。为了让合作更顺利，我们可以先聚焦目标、分工、时间节点和预期结果来讨论。";
  }

  if (categories.includes("责任转嫁")) {
    return "结果很重要，所以前期需要把目标、资源投入、执行分工和复盘机制一起确认清楚。这样双方都能对结果负责。";
  }

  if (categories.includes("权力压迫")) {
    return "我这边可以提供相关资源和连接，但合作是否推进，还是建议基于目标匹配、双方投入和明确交付来判断。";
  }

  if (categories.includes("边界模糊")) {
    return "我们可以先把合作范围、时间节点、交付内容和变更机制写清楚，再进入执行。";
  }

  if (categories.includes("过度说教")) {
    return "我理解我们对这件事的判断可能不完全一样。为了让合作更顺利，我们可以先聚焦目标、分工、时间节点和预期结果来讨论。";
  }

  return "这段表达整体比较清晰，可以发送。建议补充具体时间节点、交付范围或书面确认方式，让合作更稳。";
}
