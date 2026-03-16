# CognitivePilot

一个基于 TypeScript 的 OpenClaw 插件，用来把自然语言问题映射到结构化思维框架，并生成可执行的分析结果。

CognitivePilot 的核心定位不是“随便给建议”，而是把问题放进一组经典思想工具里重新拆解。当前实现重点吸收了九类高影响力思维方法：

1. 亚里士多德的第一性原理
2. 毛泽东的矛盾分析法
3. 麦肯锡七步法与 MECE 原则
4. 5 Why 分析
5. 黑格尔的正反合三段论
6. 德博诺的六顶思考帽
7. 查理·芒格的多元思维模型与跨学科类比
8. 帕累托二八法则
9. 艾森豪威尔矩阵

它的目标不是替代人思考，而是把复杂问题重新组织成更清晰的目标、矛盾、约束、机会和行动路径。

它适合处理这类输入：

- 团队协作中的沟通、冲突与推进问题
- 项目执行中的优先级、截止时间与卡点
- 技术决策、系统问题与排查思路
- 战略判断、方向选择与复杂权衡

## 核心能力

- 对输入内容做场景识别，判断问题类型、复杂度和影响范围
- 自动选择分析框架，也支持手动指定框架
- 内置三套分析层级：`four-questions`、`six-dimensions`、`nine-masters`
- `nine-masters` 会显式组合九类经典思想方法来分析问题
- 支持两种输出格式：`markdown` 和 `json`
- 暴露 OpenClaw 工具 `review`
- 支持本地 CLI 快速体验

## 工作流程

```text
自然语言输入
  -> 场景识别
  -> 框架选择
  -> 执行分析
  -> 输出 Markdown 或 JSON
```

## 内置框架

### `four-questions`

适合相对聚焦、低影响、可快速拆解的问题。输出包括：

- 问题本质
- 系统拆解
- 漏掉的视角
- 行动建议

### `six-dimensions`

默认使用最多的平衡型框架，适合大多数执行、人际和中等复杂度问题。输出包括：

- 第一性原理
- 主要矛盾
- 关键 20%
- 系统拆解
- 多维视角
- 辩证统一
- 优先级排序

### `nine-masters`

适合高影响、强不确定或更偏战略的问题。这个层级会重点调用九类经典思想方法：

- 亚里士多德：追问问题本质
- 毛泽东：识别主要矛盾
- 帕累托：提炼关键 20%
- 麦肯锡 / MECE：做结构化拆解
- 5 Why：追根溯源
- 黑格尔：把目标与约束统一起来
- 六顶思考帽：补齐多视角判断
- 芒格式多元模型：用跨学科视角补充盲区
- 艾森豪威尔矩阵：完成优先级落地

输出包括：

- 本质、矛盾、关键 20%
- 结构化拆解与根因分析
- 六顶思考帽
- 心智模型补充
- 综合判断
- 四象限优先级

## 自动选框架规则

当前代码里的默认规则如下：

- `technical + simple + low` -> `four-questions`
- `interpersonal + complex + medium` -> `six-dimensions`
- `strategic + chaotic + high` -> `nine-masters`
- 其他情况默认使用 `six-dimensions`

场景识别基于关键词匹配和输入长度判断，强调简单直接、易于维护。

## 项目结构

```text
CognitivePilot-main/
├── index.ts
├── dist/
│   └── index.js
├── openclaw.plugin.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── src/
│   ├── framework-selector.ts
│   ├── scene-detector.ts
│   ├── types.ts
│   └── analyzers/
│       ├── four-questions.ts
│       ├── six-dimensions.ts
│       └── nine-masters.ts
└── README.md
```

## 安装

```bash
npm install
```

安装时会自动执行 `prepare`，生成 OpenClaw 实际加载的编译产物 `dist/index.js`。

## OpenClaw 安装说明

- 插件运行入口现在是 `dist/index.js`
- `package.json` 和 `openclaw.plugin.json` 都已指向编译后的 JS 入口
- 从源码安装后，执行 `npm install` 会自动构建，不需要再手动先跑一次 `npm run build`

## 本地使用

### 类型检查

```bash
npm run check
```

### 构建

```bash
npm run build
```

### CLI 示例

```bash
npm start -- "团队里沟通反复、优先级不清，项目推进越来越慢"
```

默认会输出 Markdown 结果。

开发时也可以直接运行 TypeScript 入口：

```bash
npm run dev -- "团队里沟通反复、优先级不清，项目推进越来越慢"
```

## 代码调用

```ts
import { review } from "./index.js";

const result = await review("如何平衡团队冲突和项目交付？");
console.log(result);
```

手动指定框架和输出格式：

```ts
import { review } from "./index.js";

const result = await review("是否要调整业务方向", {
  framework: "nine-masters",
  format: "markdown"
});

console.log(result);
```

输出 `json`：

```ts
import { review } from "./index.js";

const result = await review("上线节奏混乱，团队反馈分散", {
  format: "json"
});

console.log(result);
```

## OpenClaw 工具信息

插件会注册一个名为 `review` 的工具。

参数如下：

- `input`: 要分析的文本内容
- `framework`: 可选，支持 `four-questions`、`six-dimensions`、`nine-masters`
- `format`: 可选，支持 `markdown`、`json`

## 输出说明

### Markdown

默认输出为适合阅读的中文结构化文本，包含：

- 场景判断
- 选用框架
- 对应框架的分析结果

### JSON

`json` 模式会返回一个结构化对象，顶层字段包括：

- `scene`
- `framework`
- `analysis`

## 开发说明

- 入口文件是 `index.ts`
- 场景识别逻辑位于 `src/scene-detector.ts`
- 框架选择逻辑位于 `src/framework-selector.ts`
- 各分析器位于 `src/analyzers/`
- 当前默认输出语言为中文

## 当前实现特点

- 规则驱动，不依赖外部模型服务
- 适合做结构化思维插件、规则引擎验证和认知流程封装
- 分析结果结构固定，便于后续接入前端或工作流系统
