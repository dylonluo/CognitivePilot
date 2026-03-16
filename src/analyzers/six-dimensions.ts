import type { SixDimensionsAnalysis } from "../types.js";
import { extractInputInsights } from "./input-insights.js";

function urgencyLabel(urgency: "low" | "medium" | "high"): string {
  if (urgency === "high") {
    return "高";
  }

  if (urgency === "medium") {
    return "中";
  }

  return "低";
}

function joinItems(items: string[]): string {
  return items.join("、");
}

export function analyzeSixDimensions(input: string): SixDimensionsAnalysis {
  const insights = extractInputInsights(input);
  const constraints = joinItems(insights.constraints);
  const stakeholders = joinItems(insights.stakeholders);
  const secondaryTopics =
    insights.secondaryTopics.length > 0 ? `，同时还牵涉到${joinItems(insights.secondaryTopics)}` : "";

  return {
    core: {
      essence: `第一性原理上，这不是单纯的“${insights.summary}”问题，而是在做“${insights.goal}”时，被“${insights.primaryTopic}”卡住${secondaryTopics}。要成立，至少要同时满足目标清晰、责任明确、约束可管理这三个条件。`,
      contradiction: `主要矛盾是：一边希望“${insights.goal}”，另一边又受到“${insights.friction}”和“${constraints}”的限制。先处理最影响结果的那一条，而不是平均用力。`,
      keyTwenty: `关键 20% 很可能就是“${insights.leveragePoint}”。如果这里只能做一件高杠杆动作，优先做它。`
    },
    breakdown: `建议按 MECE 拆成五块：目标定义是否一致；${stakeholders}分别承担什么责任；约束里最硬的是${constraints}；当前阻力是否集中在“${insights.primaryTopic}”；如果主路径不通，还有哪些备选路径。`,
    perspectives: [
      `事实视角：先验证“${insights.missingInfo[0]}”，别让判断建立在想象上。`,
      `关系视角：${stakeholders}里，谁需要先被对齐，谁是决定推进速度的人？`,
      `风险视角：如果继续按当前方式推进，最可能发生的是“${insights.risks[0]}”。`,
      `机会视角：最值得放大的小切口是“${insights.opportunities[0]}”。`,
      `创新视角：能不能通过重排顺序、缩小范围或改变协作方式来实现“${insights.leveragePoint}”？`,
      `整合视角：在当前紧迫度为${urgencyLabel(insights.urgency)}的情况下，什么顺序最能降低摩擦并提高成功率？`
    ],
    synthesis: `正题是“${insights.goal}”，反题是“${insights.friction}”，合题不是二选一，而是先用“${insights.leveragePoint}”撬开局面，再逐步处理剩余约束。`,
    priority: [
      `先处理最影响结果且当前可控的关键事项：${insights.nextAction}。`,
      `把重要但不紧急的准备动作提前安排，例如补齐“${insights.missingInfo[0]}”和“${insights.missingInfo[1] ?? insights.missingInfo[0]}”。`,
      `把低杠杆但会打断节奏的杂务尽量委派，避免继续被“${insights.friction}”牵着走。`,
      `删掉与“${insights.goal}”无关、又不能缓解“${insights.primaryTopic}”的动作。`
    ]
  };
}
