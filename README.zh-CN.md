# nine-dimensions

[English](./README.md) | [中文](./README.zh-CN.md)

一个面向复杂决策、战略规划、问题诊断和个人成长分析的 Claude Code skill。

`nine-dimensions` 不是普通的建议模板，而是把问题放进九类经典思维模型中重新拆解：

1. 亚里士多德：第一性原理
2. 毛泽东：矛盾分析法
3. 麦肯锡：七步法与 MECE
4. 丰田：5Why 根因分析
5. 黑格尔：正反合
6. 德博诺：六顶思考帽
7. 芒格：多元思维模型
8. 帕累托：二八法则
9. 艾森豪威尔：优先级矩阵

它适合处理这类问题：

- 为什么这个问题总是反复出现？
- 为什么团队总是不对齐？
- 这个方案到底该怎么设计？
- 我现在最该优先做什么、延后什么、委托什么、停止什么？

## 这是什么

这个仓库现在提供的是一个真正的 **skill**，不是 OpenClaw plugin。

它的目标不是替用户直接下结论，而是让 AI 先完成一轮结构化思考，再把这些关键信息清楚地呈现出来：

- 问题本质
- 主要矛盾
- 关键少数
- 根因链路
- 行动优先级
- 仍然需要用户亲自决定的关键决策点

## 适用场景

- 重大决策
- 战略规划
- 复杂问题诊断
- 人际协作分析
- 个人成长与职业选择

## 框架深度

这个 skill 支持三层分析深度：

- `four-questions`
  适合快速判断、技术问题、简单决策
- `six-dimensions`
  适合大多数中等复杂度问题，是默认框架
- `nine-dimensions`
  适合高影响、强不确定、重大决策场景

如果问题不需要完整九维，可以参考灵活组合指南，选择最小但有效的模型组合。

## 快速开始

推荐使用顺序：

1. 先读 [SKILL.md](/Users/dylonluo/Downloads/CognitivePilot-main/SKILL.md)，确认触发条件、框架选择和输出要求。
2. 再根据问题复杂度选择对应 prompt：
   `four-questions` / `six-dimensions` / `nine-dimensions`
3. 如果问题比较特殊，或时间有限，不想机械跑完整九维，再看 [flexible-combinations.md](/Users/dylonluo/Downloads/CognitivePilot-main/flexible-combinations.md)。
4. 如果你想统一输出风格，再参考 `examples/` 中的对应示例。

## 安装

这是一个 Claude Code custom skill，不是 plugin。

Claude Code 会从以下目录发现 skill：

- 项目级目录：`.claude/skills/<skill-name>/`
- 个人级目录：`~/.claude/skills/<skill-name>/`

### 安装到单个项目

```bash
mkdir -p .claude/skills
cp -R /path/to/nine-dimensions .claude/skills/nine-dimensions
```

然后在这个项目里重新开启一个 Claude Code 会话。

### 安装到全局

```bash
mkdir -p ~/.claude/skills
cp -R /path/to/nine-dimensions ~/.claude/skills/nine-dimensions
```

然后重启 Claude Code，或开启一个新会话。

### 本地开发同步

```bash
mkdir -p ~/.claude/skills
rsync -av --delete /path/to/CognitivePilot-main/ ~/.claude/skills/nine-dimensions/
```

每次修改后重新同步，再开启新会话测试。

### 如何确认安装成功

你可以在新会话里直接试这些表达：

- `帮我做一个九维分析`
- `我该不该辞职创业？`
- `为什么这个问题总是反复出现？`
- `帮我从第一性原理和矛盾分析法看这个问题`

如果安装成功，Claude Code 应该会在相关问题上自动发现并使用这个 skill。

## 仓库结构

```text
.
├── SKILL.md
├── prompts/
│   ├── four-questions.md
│   ├── six-dimensions.md
│   └── nine-dimensions.md
├── examples/
│   ├── technical.md
│   ├── interpersonal.md
│   └── strategic.md
└── flexible-combinations.md
```

## 文件说明

- [SKILL.md](/Users/dylonluo/Downloads/CognitivePilot-main/SKILL.md)
  skill 主入口，定义触发条件、框架选择和输出规则
- [prompts/four-questions.md](/Users/dylonluo/Downloads/CognitivePilot-main/prompts/four-questions.md)
  适合简单问题和快速判断
- [prompts/six-dimensions.md](/Users/dylonluo/Downloads/CognitivePilot-main/prompts/six-dimensions.md)
  适合大多数中等复杂度问题
- [prompts/nine-dimensions.md](/Users/dylonluo/Downloads/CognitivePilot-main/prompts/nine-dimensions.md)
  适合重大决策和高影响问题
- [flexible-combinations.md](/Users/dylonluo/Downloads/CognitivePilot-main/flexible-combinations.md)
  灵活组合指南，避免机械套模板
- [examples/technical.md](/Users/dylonluo/Downloads/CognitivePilot-main/examples/technical.md)
  技术问题示例
- [examples/interpersonal.md](/Users/dylonluo/Downloads/CognitivePilot-main/examples/interpersonal.md)
  人际问题示例
- [examples/strategic.md](/Users/dylonluo/Downloads/CognitivePilot-main/examples/strategic.md)
  战略问题示例

## 当前定位

- 一个可复用的九维思考 skill
- 一套结构化 prompt
- 一组可参考的示例输出

这个仓库不再包含旧的 plugin 运行代码。
