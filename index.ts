import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { detectScene } from "./src/scene-detector.js";
import { selectFramework } from "./src/framework-selector.js";
import { analyzeFourQuestions } from "./src/analyzers/four-questions.js";
import { analyzeSixDimensions } from "./src/analyzers/six-dimensions.js";
import { analyzeNineMasters } from "./src/analyzers/nine-masters.js";
import type {
  FourQuestionsAnalysis,
  Framework,
  NineMastersAnalysis,
  OutputFormat,
  ReviewAnalysis,
  ReviewOptions,
  Scene,
  SixDimensionsAnalysis
} from "./src/types.js";

function sceneLabel(scene: Scene): string {
  const typeMap = {
    technical: "技术",
    interpersonal: "人际",
    strategic: "战略",
    execution: "执行"
  } as const;

  const complexityMap = {
    simple: "简单",
    complex: "复杂",
    chaotic: "混沌"
  } as const;

  const impactMap = {
    low: "低影响",
    medium: "中影响",
    high: "高影响"
  } as const;

  return `${typeMap[scene.type]}/${complexityMap[scene.complexity]}/${impactMap[scene.impact]}`;
}

function frameworkLabel(framework: Framework): string {
  const labels: Record<Framework, string> = {
    "four-questions": "四问",
    "six-dimensions": "六维",
    "nine-masters": "九维"
  };

  return labels[framework];
}

function suggestedReflectionTime(framework: Framework): string {
  const minutes: Record<Framework, string> = {
    "four-questions": "建议思考10分钟",
    "six-dimensions": "建议思考15分钟",
    "nine-masters": "建议思考25分钟"
  };

  return minutes[framework];
}

function formatFourQuestions(analysis: FourQuestionsAnalysis): string {
  return [
    "【问题本质】",
    `- 什么是真正重要的：${analysis.whatMatters}`,
    "",
    "【系统拆解】",
    analysis.howToBreakdown,
    "",
    "【漏掉的视角】",
    ...analysis.missingPerspectives.map((item) => `- ${item}`),
    "",
    "【行动建议】",
    ...analysis.nextActions.map((item, index) => `${index + 1}. ${item}`)
  ].join("\n");
}

function formatSixDimensions(analysis: SixDimensionsAnalysis): string {
  return [
    "【问题本质】",
    `- 第一性原理：${analysis.core.essence}`,
    `- 主要矛盾：${analysis.core.contradiction}`,
    `- 关键20%：${analysis.core.keyTwenty}`,
    "",
    "【系统拆解】",
    analysis.breakdown,
    "",
    "【多维视角】",
    ...analysis.perspectives.map((item) => `- ${item}`),
    "",
    "【辩证统一】",
    analysis.synthesis,
    "",
    "【优先级排序】",
    ...analysis.priority.map((item) => `- ${item}`)
  ].join("\n");
}

function formatNineMasters(analysis: NineMastersAnalysis): string {
  return [
    "【九维洞察】",
    `- 亚里士多德（本质）：${analysis.essence}`,
    `- 毛泽东（矛盾）：${analysis.contradiction}`,
    `- 帕累托（关键20%）：${analysis.keyTwenty}`,
    `- 麦肯锡（结构）：${analysis.structure}`,
    `- 5Why（根因）：${analysis.rootCause}`,
    "",
    "【六顶思考帽】",
    `- 白帽：${analysis.sixHats.white}`,
    `- 红帽：${analysis.sixHats.red}`,
    `- 黑帽：${analysis.sixHats.black}`,
    `- 黄帽：${analysis.sixHats.yellow}`,
    `- 绿帽：${analysis.sixHats.green}`,
    `- 蓝帽：${analysis.sixHats.blue}`,
    "",
    "【心智模型】",
    ...analysis.mentalModels.map((item) => `- ${item}`),
    "",
    "【辩证统一】",
    analysis.synthesis,
    "",
    "【优先级排序】",
    "重要且紧急：",
    ...analysis.priority.urgent_important.map((item) => `- ${item}`),
    "重要不紧急：",
    ...analysis.priority.important_not_urgent.map((item) => `- ${item}`),
    "紧急不重要：",
    ...analysis.priority.urgent_not_important.map((item) => `- ${item}`),
    "不重要不紧急：",
    ...analysis.priority.neither.map((item) => `- ${item}`)
  ].join("\n");
}

function formatOutput(
  scene: Scene,
  framework: Framework,
  analysis: ReviewAnalysis,
  format: OutputFormat = "markdown"
): string {
  if (format === "json") {
    return JSON.stringify(
      {
        scene,
        framework,
        analysis
      },
      null,
      2
    );
  }

  const header = [
    `【场景判断】${sceneLabel(scene)}`,
    `【选用框架】${frameworkLabel(framework)}（${suggestedReflectionTime(framework)}）`,
    ""
  ];

  if (framework === "four-questions") {
    return header.concat(formatFourQuestions(analysis as FourQuestionsAnalysis)).join("\n");
  }

  if (framework === "six-dimensions") {
    return header.concat(formatSixDimensions(analysis as SixDimensionsAnalysis)).join("\n");
  }

  return header.concat(formatNineMasters(analysis as NineMastersAnalysis)).join("\n");
}

function runAnalysis(input: string, framework: Framework): ReviewAnalysis {
  switch (framework) {
    case "four-questions":
      return analyzeFourQuestions(input);
    case "six-dimensions":
      return analyzeSixDimensions(input);
    case "nine-masters":
      return analyzeNineMasters(input);
    default: {
      const exhaustiveCheck: never = framework;
      throw new Error(`Unsupported framework: ${String(exhaustiveCheck)}`);
    }
  }
}

export async function review(input: string, options: ReviewOptions = {}): Promise<string> {
  const scene = detectScene(input);
  const framework = options.framework ?? selectFramework(scene);
  const analysis = runAnalysis(input, framework);

  return formatOutput(scene, framework, analysis, options.format);
}

export default function register(plugin: OpenClawPluginApi): void {
  plugin.tool(
    "review",
    "对输入内容进行四问、六维或九维思考框架分析",
    {
      input: plugin.schema.string().describe("要分析的内容"),
      framework: plugin.schema
        .enum(["four-questions", "six-dimensions", "nine-masters"])
        .optional()
        .describe("指定框架，可选，默认自动选择"),
      format: plugin.schema.enum(["markdown", "json"]).optional().describe("输出格式")
    },
    async (args) => {
      const input = String(args.input ?? "");
      const framework = args.framework as Framework | undefined;
      const format = args.format as OutputFormat | undefined;
      return review(input, { framework, format });
    }
  );
}

async function runCli(): Promise<void> {
  const input = process.argv.slice(2).join(" ").trim();
  if (!input) {
    return;
  }

  const result = await review(input);
  console.log(result);
}

const cliEntry = process.argv[1] ?? "";

if (cliEntry.endsWith("index.ts") || cliEntry.endsWith("index.js")) {
  void runCli();
}
