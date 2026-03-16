import type { FourQuestionsAnalysis } from "../types.js";
import { extractInputInsights } from "./input-insights.js";

function joinItems(items: string[]): string {
  return items.join("、");
}

export function analyzeFourQuestions(input: string): FourQuestionsAnalysis {
  const insights = extractInputInsights(input);
  const constraints = joinItems(insights.constraints);
  const stakeholders = joinItems(insights.stakeholders);

  return {
    whatMatters: `你描述的表象是“${insights.summary}”，但真正重要的是先围绕“${insights.goal}”重新定义问题。当前更值得优先盯住的不是所有症状，而是“${insights.friction}”。`,
    howToBreakdown: `先按四块拆开：1）目标是否真的是“${insights.goal}”；2）当前最大卡点是否集中在“${insights.primaryTopic}”；3）现实约束里最硬的部分是${constraints}；4）谁会影响推进结果，尤其是${stakeholders}。拆清这四块后，再决定先处理哪个最小闭环。`,
    missingPerspectives: [
      `是否把“${insights.goal}”说成了大家都能检验的成功标准？`,
      `有没有低估${constraints}对推进顺序的影响？`,
      `${insights.missingInfo[0]}`,
      `${insights.missingInfo[1] ?? `是否已经分别从${stakeholders}的角度看过问题？`}`
    ],
    nextActions: [
      `用一句话重述问题：为了${insights.goal}，我们必须先解决“${insights.friction}”。`,
      `列出 3 个已知事实和 3 个未知假设，优先验证“${insights.missingInfo[0]}”。`,
      `今天先执行的最小动作：${insights.nextAction}。`,
      `如果 24 小时内没有进展，就回头检查是否误判了“${insights.primaryTopic}”这个主卡点。`
    ]
  };
}
