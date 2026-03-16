import type { Complexity, Impact, Scene, SceneType } from "./types.js";

interface KeywordRule {
  type: SceneType;
  keywords: string[];
}

const SCENE_RULES: KeywordRule[] = [
  {
    type: "technical",
    keywords: [
      "code",
      "bug",
      "debug",
      "api",
      "system",
      "tool",
      "deploy",
      "architecture",
      "数据库",
      "代码",
      "系统",
      "工具",
      "接口",
      "技术"
    ]
  },
  {
    type: "interpersonal",
    keywords: [
      "team",
      "communication",
      "feedback",
      "conflict",
      "manager",
      "collaboration",
      "沟通",
      "团队",
      "反馈",
      "冲突",
      "关系",
      "同事"
    ]
  },
  {
    type: "strategic",
    keywords: [
      "strategy",
      "decision",
      "planning",
      "roadmap",
      "direction",
      "positioning",
      "决策",
      "规划",
      "方向",
      "战略",
      "路径",
      "布局"
    ]
  },
  {
    type: "execution",
    keywords: [
      "task",
      "deadline",
      "priority",
      "schedule",
      "todo",
      "deliver",
      "任务",
      "时间",
      "优先级",
      "截止",
      "执行",
      "安排"
    ]
  }
];

const COMPLEX_KEYWORDS = [
  "multiple",
  "trade-off",
  "tradeoff",
  "cross-team",
  "repeated",
  "stuck",
  "依赖",
  "多方",
  "复杂",
  "权衡",
  "长期",
  "反复",
  "卡住",
  "推进慢",
  "越来越慢"
];

const CHAOTIC_KEYWORDS = [
  "crisis",
  "uncertain",
  "chaos",
  "urgent change",
  "失控",
  "混乱",
  "危机",
  "高度不确定",
  "全面重构"
];

const MEDIUM_IMPACT_KEYWORDS = [
  "customer",
  "project",
  "manager",
  "交付",
  "项目",
  "团队",
  "客户"
];

const HIGH_IMPACT_KEYWORDS = [
  "company",
  "career",
  "business",
  "core system",
  "组织",
  "公司",
  "职业",
  "长期发展",
  "关键系统"
];

function scoreMatches(input: string, keywords: string[]): number {
  return keywords.reduce((score, keyword) => {
    return score + (input.includes(keyword) ? 1 : 0);
  }, 0);
}

function detectType(normalizedInput: string): SceneType {
  const priority: Record<SceneType, number> = {
    strategic: 4,
    interpersonal: 3,
    technical: 2,
    execution: 1
  };
  let bestType: SceneType = "execution";
  let bestScore = 0;

  for (const rule of SCENE_RULES) {
    const score = scoreMatches(normalizedInput, rule.keywords);
    if (score === 0) {
      continue;
    }

    if (score > bestScore || (score === bestScore && priority[rule.type] > priority[bestType])) {
      bestType = rule.type;
      bestScore = score;
    }
  }

  return bestType;
}

function detectComplexity(normalizedInput: string): Complexity {
  if (scoreMatches(normalizedInput, CHAOTIC_KEYWORDS) > 0 || normalizedInput.length > 180) {
    return "chaotic";
  }
  if (scoreMatches(normalizedInput, COMPLEX_KEYWORDS) > 0 || normalizedInput.length > 80) {
    return "complex";
  }
  return "simple";
}

function detectImpact(normalizedInput: string): Impact {
  if (scoreMatches(normalizedInput, HIGH_IMPACT_KEYWORDS) > 0) {
    return "high";
  }
  if (scoreMatches(normalizedInput, MEDIUM_IMPACT_KEYWORDS) > 0 || normalizedInput.length > 100) {
    return "medium";
  }
  return "low";
}

export function detectScene(input: string): Scene {
  const normalizedInput = input.toLowerCase().trim();

  return {
    type: detectType(normalizedInput),
    complexity: detectComplexity(normalizedInput),
    impact: detectImpact(normalizedInput)
  };
}
