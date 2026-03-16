import type { NineMastersAnalysis } from "../types.js";
import { extractInputInsights } from "./input-insights.js";

function joinItems(items: string[]): string {
  return items.join("、");
}

export function analyzeNineMasters(input: string): NineMastersAnalysis {
  const insights = extractInputInsights(input);
  const constraints = joinItems(insights.constraints);
  const stakeholders = joinItems(insights.stakeholders);

  return {
    essence: `亚里士多德视角：这件事的本体不是“${insights.summary}”本身，而是如何在“${constraints}”的条件下实现“${insights.goal}”。`,
    contradiction: `毛泽东视角：主要矛盾不是问题很多，而是“${insights.goal}”与“${insights.friction}”直接冲突。先抓主矛盾，其他问题才会跟着松动。`,
    keyTwenty: `帕累托视角：最能撬动结果的少数变量，很可能就是“${insights.leveragePoint}”。与其平均投入，不如先把这一点打穿。`,
    structure: `麦肯锡视角：把问题结构化为六块来看：目标是“${insights.goal}”；关键角色包括${stakeholders}；主要约束是${constraints}；主要风险是${joinItems(insights.risks.slice(0, 2))}；可利用机会是${joinItems(insights.opportunities.slice(0, 2))}；最后再定义检查点。`,
    rootCause: `5Why视角：从“${insights.friction}”往下追，很可能不是单点执行失误，而是目标定义、责任边界、约束管理或判断依据中的某一层出了偏差。`,
    sixHats: {
      white: `事实：先补齐“${insights.missingInfo[0]}”和“${insights.missingInfo[1] ?? insights.missingInfo[0]}”这两类关键事实。`,
      red: `情感：留意${stakeholders}在压力下的顾虑和预期，因为这些隐性情绪会影响配合度。`,
      black: `风险：当前最值得警惕的是“${insights.risks[0]}”，其次是“${insights.risks[1] ?? insights.risks[0]}”。`,
      yellow: `收益：如果先完成“${insights.leveragePoint}”，最大的直接收益会是“${insights.opportunities[0]}”。`,
      green: `创新：能否通过缩小范围、改变责任分配或调整动作顺序，来更快实现“${insights.goal}”？`,
      blue: `控制：把下一步决策节奏锚定在“${insights.nextAction}”，并明确谁负责、何时复盘。`
    },
    mentalModels: [
      `反演思维：如果继续让“${insights.friction}”存在，最可能怎样失败？`,
      `机会成本：为了“${insights.goal}”，这次应该明确放弃哪些次优动作？`,
      `系统效应：${constraints}里，哪一条最可能让局部优化破坏整体结果？`,
      `激励相容：${stakeholders}是否都愿意围绕同一个结果协作？`,
      `二阶影响：先做“${insights.nextAction}”会怎样改变后续局面？`
    ],
    synthesis: `黑格尔视角：真正可执行的方案，不是忽视约束去硬推目标，而是先用“${insights.leveragePoint}”打开突破口，再围绕“${insights.goal}”持续修正。`,
    priority: {
      urgent_important: [
        `立即确认“${insights.risks[0]}”是否正在扩大。`,
        `快速对齐${stakeholders}中最关键的一方与决策边界。`
      ],
      important_not_urgent: [
        `补齐“${insights.missingInfo[0]}”和“${insights.missingInfo[1] ?? insights.missingInfo[0]}”，建立判断依据。`,
        `围绕“${insights.goal}”设计中期路线和复盘机制。`
      ],
      urgent_not_important: [
        "处理需要响应但不该占用核心精力的外部噪音。",
        `将不能缓解“${insights.primaryTopic}”的低杠杆协调事项标准化或委派。`
      ],
      neither: [
        "避免为了显得忙碌而增加无效动作。",
        `暂停与“${insights.goal}”无关、又不能降低风险的额外扩张。`
      ]
    }
  };
}
