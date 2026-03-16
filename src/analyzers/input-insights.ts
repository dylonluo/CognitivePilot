interface SignalProfile {
  id: string;
  topic: string;
  keywords: string[];
  goal: string;
  friction: string;
  leveragePoint: string;
  constraints: string[];
  stakeholders: string[];
  risks: string[];
  opportunities: string[];
  missingInfo: string[];
  action: string;
}

export interface InputInsights {
  summary: string;
  primaryTopic: string;
  secondaryTopics: string[];
  goal: string;
  friction: string;
  leveragePoint: string;
  constraints: string[];
  stakeholders: string[];
  risks: string[];
  opportunities: string[];
  missingInfo: string[];
  nextAction: string;
  urgency: "low" | "medium" | "high";
}

const PROFILES: SignalProfile[] = [
  {
    id: "alignment",
    topic: "协作对齐",
    keywords: [
      "team",
      "communication",
      "feedback",
      "conflict",
      "manager",
      "collaboration",
      "align",
      "沟通",
      "团队",
      "反馈",
      "冲突",
      "关系",
      "同事",
      "对齐",
      "反复",
      "口径",
      "拉扯"
    ],
    goal: "建立统一目标、优先级和协作节奏",
    friction: "沟通口径不一致，导致同一件事被重复确认、重复解释",
    leveragePoint: "先明确谁拍板、什么算成功，以及每个人对结果负责到哪一层",
    constraints: ["责任边界不清", "信息在多人之间传递时容易失真"],
    stakeholders: ["团队成员", "直接负责人", "关键协作者"],
    risks: ["反复对齐会持续吞掉推进时间", "情绪摩擦会放大执行阻力"],
    opportunities: ["一旦口径统一，推进速度和协作信任通常会同步改善"],
    missingInfo: ["谁拥有最终拍板权？", "当前最重要的共同目标是什么？"],
    action: "把目标、优先级和 owner 压缩成一页，先完成一次小范围对齐"
  },
  {
    id: "execution",
    topic: "执行推进",
    keywords: [
      "task",
      "deadline",
      "priority",
      "schedule",
      "todo",
      "deliver",
      "delivery",
      "launch",
      "任务",
      "时间",
      "优先级",
      "截止",
      "执行",
      "安排",
      "排期",
      "上线",
      "进度",
      "节奏",
      "交付"
    ],
    goal: "恢复可预测的推进节奏和交付确定性",
    friction: "任务顺序和节奏不稳定，导致人力频繁被打断",
    leveragePoint: "缩小当前周期的目标范围，冻结优先级，减少无效切换",
    constraints: ["时间窗口有限", "在制事项过多，切换成本高"],
    stakeholders: ["执行负责人", "上下游依赖方"],
    risks: ["关键节点延期", "临近交付时返工增加"],
    opportunities: ["一旦锁定优先级，团队会更容易形成稳定节奏"],
    missingInfo: ["当前不能延期的节点是什么？", "哪些任务可以延后、合并或删除？"],
    action: "冻结本周期优先级，只保留最关键的交付目标"
  },
  {
    id: "technical",
    topic: "技术稳定性",
    keywords: [
      "code",
      "bug",
      "debug",
      "api",
      "system",
      "tool",
      "deploy",
      "architecture",
      "database",
      "service",
      "数据库",
      "代码",
      "系统",
      "工具",
      "接口",
      "技术",
      "联调",
      "故障",
      "依赖",
      "重构",
      "异常",
      "发布"
    ],
    goal: "找出真正阻塞结果的技术瓶颈，并恢复系统稳定性",
    friction: "技术问题容易被表象症状覆盖，导致排查顺序失真",
    leveragePoint: "先固定复现路径、定位根因，再决定修补、隔离还是回滚",
    constraints: ["依赖链复杂", "系统反馈可能滞后或不完整"],
    stakeholders: ["研发", "测试", "相关系统 owner"],
    risks: ["误判根因会带来重复返工", "上线窗口内修复失败会放大影响"],
    opportunities: ["一旦定位根因，后续修复和预防会明显提速"],
    missingInfo: ["最近一次稳定状态发生在什么时候？", "最早出现异常的环节在哪里？"],
    action: "先固化复现步骤和监控证据，再安排最小范围验证"
  },
  {
    id: "strategy",
    topic: "战略取舍",
    keywords: [
      "strategy",
      "decision",
      "planning",
      "roadmap",
      "direction",
      "positioning",
      "business",
      "market",
      "growth",
      "决策",
      "规划",
      "方向",
      "战略",
      "路径",
      "布局",
      "业务",
      "市场",
      "转型",
      "取舍"
    ],
    goal: "在有限资源下做出可承受的方向选择",
    friction: "方向判断和资源投入节奏可能不匹配",
    leveragePoint: "先定义不做什么，再比较各路径的收益、代价和可逆性",
    constraints: ["信息不完全", "一旦投入，机会成本会快速累积"],
    stakeholders: ["决策者", "执行团队", "核心客户或业务方"],
    risks: ["选错主战场会稀释资源", "决策拖延会错过窗口"],
    opportunities: ["尽早聚焦主方向，可以减少低效试错"],
    missingInfo: ["这次选择服务的北极星指标是什么？", "不做什么的边界是否明确？"],
    action: "先把备选路径的收益、代价和放弃项摆到同一张表上"
  },
  {
    id: "resource",
    topic: "资源约束",
    keywords: [
      "resource",
      "budget",
      "capacity",
      "headcount",
      "approval",
      "权限",
      "资源",
      "预算",
      "人手",
      "产能",
      "审批",
      "支持"
    ],
    goal: "在有限资源下守住真正重要的目标",
    friction: "目标野心和资源现实之间存在张力",
    leveragePoint: "优先争取关键资源，而不是平均分配稀缺能力",
    constraints: ["资源有限", "权限或支持链条不完整"],
    stakeholders: ["资源拥有者", "项目负责人", "关键执行者"],
    risks: ["资源分散会让关键动作都做不深", "没有授权会让决策无法落地"],
    opportunities: ["聚焦关键资源后，可以提升单位投入产出"],
    missingInfo: ["最稀缺的资源到底是什么？", "哪些事情没有授权就无法推进？"],
    action: "先定义必须保住的核心结果，再重排资源投入顺序"
  },
  {
    id: "uncertainty",
    topic: "不确定局面",
    keywords: [
      "crisis",
      "uncertain",
      "chaos",
      "urgent change",
      "risk",
      "失控",
      "混乱",
      "危机",
      "高度不确定",
      "变化",
      "突发",
      "风险"
    ],
    goal: "快速稳住局面，降低不可逆后果",
    friction: "噪声很多，但真正关键的信息和动作还没有被挑出来",
    leveragePoint: "先收敛判断依据和决策节奏，再扩大动作范围",
    constraints: ["判断依据不稳定", "局面变化快，容错空间小"],
    stakeholders: ["核心决策者", "一线执行者", "受影响方"],
    risks: ["错误动作会制造新的连锁问题", "反应过慢会放大损失"],
    opportunities: ["先稳住局面后，后续就有空间做更优选择"],
    missingInfo: ["当前最不可逆的风险是什么？", "哪些信号值得每天复盘？"],
    action: "先设定临时控制面板，只盯最关键的风险和决策节点"
  }
];

const HIGH_URGENCY_KEYWORDS = [
  "urgent",
  "deadline",
  "launch",
  "crisis",
  "紧急",
  "很紧",
  "临近",
  "快到了",
  "尽快",
  "失控",
  "危机",
  "截止",
  "上线",
  "立刻",
  "马上"
];

const MEDIUM_URGENCY_KEYWORDS = ["project", "manager", "customer", "项目", "经理", "客户", "交付"];

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

function countMatches(input: string, keywords: string[]): number {
  return keywords.reduce((score, keyword) => score + (input.includes(keyword) ? 1 : 0), 0);
}

function splitClauses(input: string): string[] {
  return input
    .split(/[。！？!?；;，,\n]/u)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function summarize(input: string): string {
  const clauses = splitClauses(input);
  if (clauses.length === 0) {
    return input.trim().slice(0, 80);
  }

  const joined = clauses.slice(0, 2).join("；");
  return joined.slice(0, 80);
}

function inferUrgency(normalizedInput: string): "low" | "medium" | "high" {
  if (countMatches(normalizedInput, HIGH_URGENCY_KEYWORDS) > 0) {
    return "high";
  }

  if (countMatches(normalizedInput, MEDIUM_URGENCY_KEYWORDS) > 0 || normalizedInput.length > 80) {
    return "medium";
  }

  return "low";
}

function buildFallbackInsights(input: string): InputInsights {
  return {
    summary: summarize(input),
    primaryTopic: "问题澄清",
    secondaryTopics: [],
    goal: "先把目标、现状和限制条件说清楚，再决定行动",
    friction: "表面症状存在，但真正决定结果的卡点还没有被拆开",
    leveragePoint: "把问题压缩成一句目标描述，再补齐最关键的缺失信息",
    constraints: ["有效信息不足，需要先补齐事实"],
    stakeholders: ["问题相关的直接参与者"],
    risks: ["在问题没定义清楚前，动作越多越容易跑偏"],
    opportunities: ["一旦定义清楚成功标准，后续决策会更快"],
    missingInfo: ["什么结果才算解决？", "当前最受限制的条件是什么？"],
    nextAction: "先补齐事实和约束，再决定是否需要扩大分析范围",
    urgency: inferUrgency(input.toLowerCase())
  };
}

function pickMatchedProfiles(normalizedInput: string): SignalProfile[] {
  return PROFILES.map((profile) => ({
    profile,
    score: countMatches(normalizedInput, profile.keywords)
  }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((item) => item.profile);
}

function directStakeholders(normalizedInput: string): string[] {
  const matches: string[] = [];

  if (normalizedInput.includes("客户") || normalizedInput.includes("customer")) {
    matches.push("客户");
  }
  if (normalizedInput.includes("经理") || normalizedInput.includes("manager")) {
    matches.push("经理");
  }
  if (normalizedInput.includes("团队") || normalizedInput.includes("team")) {
    matches.push("团队");
  }
  if (normalizedInput.includes("同事")) {
    matches.push("同事");
  }
  if (normalizedInput.includes("公司") || normalizedInput.includes("business")) {
    matches.push("业务方");
  }

  return matches;
}

function directConstraints(normalizedInput: string): string[] {
  const matches: string[] = [];

  if (normalizedInput.includes("依赖")) {
    matches.push("依赖关系多，单点变化容易牵动整体");
  }
  if (
    normalizedInput.includes("deadline") ||
    normalizedInput.includes("截止") ||
    normalizedInput.includes("时间") ||
    normalizedInput.includes("上线")
  ) {
    matches.push("时间窗口明确，试错和返工空间有限");
  }
  if (
    normalizedInput.includes("资源") ||
    normalizedInput.includes("预算") ||
    normalizedInput.includes("权限") ||
    normalizedInput.includes("人手")
  ) {
    matches.push("资源或授权有限，需要先争取关键支持");
  }
  if (
    normalizedInput.includes("混乱") ||
    normalizedInput.includes("uncertain") ||
    normalizedInput.includes("变化") ||
    normalizedInput.includes("风险")
  ) {
    matches.push("信息噪声较大，需要更快校准判断依据");
  }

  return matches;
}

export function extractInputInsights(input: string): InputInsights {
  const trimmed = input.trim();
  const normalizedInput = trimmed.toLowerCase();
  const matches = pickMatchedProfiles(normalizedInput);

  if (matches.length === 0) {
    return buildFallbackInsights(trimmed);
  }

  const primary = matches[0];
  const secondaryTopics = matches.slice(1).map((profile) => profile.topic);

  return {
    summary: summarize(trimmed),
    primaryTopic: primary.topic,
    secondaryTopics,
    goal: primary.goal,
    friction: matches.map((profile) => profile.friction).slice(0, 2).join("；"),
    leveragePoint: primary.leveragePoint,
    constraints: unique(matches.flatMap((profile) => profile.constraints).concat(directConstraints(normalizedInput))).slice(0, 4),
    stakeholders: unique(matches.flatMap((profile) => profile.stakeholders).concat(directStakeholders(normalizedInput))).slice(0, 4),
    risks: unique(matches.flatMap((profile) => profile.risks)).slice(0, 4),
    opportunities: unique(matches.flatMap((profile) => profile.opportunities)).slice(0, 4),
    missingInfo: unique(matches.flatMap((profile) => profile.missingInfo)).slice(0, 4),
    nextAction: primary.action,
    urgency: inferUrgency(normalizedInput)
  };
}
