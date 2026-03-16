# CognitivePilot

一个基于 TypeScript 的 OpenClaw 插件，用来把自然语言问题映射到合适的思考框架，并生成结构化分析结果。

它适合处理这类输入：

- 团队协作中的沟通、冲突与推进问题
- 项目执行中的优先级、截止时间与卡点
- 技术决策、系统问题与排查思路
- 战略判断、方向选择与复杂权衡

## 核心能力

- 对输入内容做场景识别，判断问题类型、复杂度和影响范围
- 自动选择分析框架，也支持手动指定框架
- 内置三套框架：`four-questions`、`six-dimensions`、`nine-masters`
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

适合高影响、强不确定或更偏战略的问题。输出包括：

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
├── openclaw.plugin.json
├── package.json
├── tsconfig.json
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
- 适合做插件原型、规则引擎验证和思考流程封装
- 分析结果结构固定，便于后续接入前端或工作流系统

如果你接下来愿意，我也可以继续帮你把这个 README 再往前推进一版，比如补上更像产品说明的首页文案，或者改成更适合开源仓库展示的风格。
