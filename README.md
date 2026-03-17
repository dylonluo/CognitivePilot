# nine-dimensions

一个面向复杂决策、战略规划、问题诊断和个人成长分析的 Codex skill。

它不是普通的建议模板，而是把问题放进九类经典思维方法中重新拆解：

1. 亚里士多德：第一性原理
2. 毛泽东：矛盾分析法
3. 麦肯锡：七步法与 MECE
4. 丰田：5Why 分析
5. 黑格尔：正反合
6. 德博诺：六顶思考帽
7. 芒格：多元思维模型
8. 帕累托：二八法则
9. 艾森豪威尔：优先级矩阵

它适合处理这类问题：

- 我该不该辞职创业？
- 为什么团队总是不配合？
- 这个方案到底该怎么设计？
- 为什么这个问题总是反复出现？
- 我现在最该优先做什么、放弃什么？

## 这是什么

这个仓库现在提供的是一个真正的 **skill**，不是 OpenClaw plugin。

它的目标不是直接替用户下结论，而是让 AI 先完成一轮结构化思考，再把以下内容清楚地呈现出来：

- 问题本质
- 主要矛盾
- 关键少数
- 根因链路
- 行动优先级
- 需要用户亲自决定的决策点

## 适用场景

- 重大决策
- 战略规划
- 复杂问题诊断
- 人际协作分析
- 个人成长与职业选择

## 工作方式

这个 skill 按问题复杂度分成三层：

- `four-questions`
  适合快速判断、技术问题、简单决策
- `six-dimensions`
  适合大多数中等复杂度问题，是默认分析框架
- `nine-dimensions`
  适合高影响、强不确定、重大决策场景

如果问题不需要完整九维，可以参考灵活组合指南，按最小必要集选择维度。

## 快速使用

推荐的使用顺序：

1. 先读 [SKILL.md](/Users/dylonluo/Downloads/CognitivePilot-main/SKILL.md)，确认触发条件、选维方式和输出要求。
2. 再根据问题复杂度选择对应 prompt：
   `four-questions` / `six-dimensions` / `nine-dimensions`
3. 如果问题比较特殊，或不想机械跑完整九维，再看 [flexible-combinations.md](/Users/dylonluo/Downloads/CognitivePilot-main/flexible-combinations.md) 做组合调整。
4. 如果你想统一输出风格，再参考 `examples/` 中的对应示例。

## 安装指南

这是一个 Claude Code custom skill，不是 plugin。

根据 Claude Code 的官方约定，skill 可以安装在：

- 项目级目录：`.claude/skills/<skill-name>/`
- 个人级目录：`~/.claude/skills/<skill-name>/`

### 方式一：安装到单个项目

把这个目录复制到当前项目里：

```bash
mkdir -p .claude/skills
cp -R /path/to/nine-dimensions .claude/skills/nine-dimensions
```

然后在这个项目里重新开启一个 Claude Code 会话。

### 方式二：安装到全局

把这个目录复制到个人 Claude skills 目录：

```bash
mkdir -p ~/.claude/skills
cp -R /path/to/nine-dimensions ~/.claude/skills/nine-dimensions
```

然后重启 Claude Code，或开启一个新会话。

### 方式三：本地开发联调

如果你正在本地迭代这个 skill，可以直接把当前仓库同步到 Claude skills 目录：

```bash
mkdir -p ~/.claude/skills
rsync -av --delete /path/to/CognitivePilot-main/ ~/.claude/skills/nine-dimensions/
```

每次修改后重新同步，再开启新会话测试触发效果。

### 安装后如何确认生效

你可以在新会话里直接用这些表达测试：

- `Help me do a nine-dimensions analysis`
- `Should I quit my job to start a company?`
- `Why does this problem keep repeating?`
- `Analyze this with first principles and contradiction analysis`

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
  skill 的主入口，定义触发条件、深度选择和输出原则
- [prompts/four-questions.md](/Users/dylonluo/Downloads/CognitivePilot-main/prompts/four-questions.md)
  四问框架，适合快速判断与简单问题
- [prompts/six-dimensions.md](/Users/dylonluo/Downloads/CognitivePilot-main/prompts/six-dimensions.md)
  六维框架，适合大多数中等复杂度问题
- [prompts/nine-dimensions.md](/Users/dylonluo/Downloads/CognitivePilot-main/prompts/nine-dimensions.md)
  九维框架，适合重大决策和高影响问题
- [flexible-combinations.md](/Users/dylonluo/Downloads/CognitivePilot-main/flexible-combinations.md)
  灵活组合原则，避免机械套模板
- [examples/technical.md](/Users/dylonluo/Downloads/CognitivePilot-main/examples/technical.md)
  技术问题示例
- [examples/interpersonal.md](/Users/dylonluo/Downloads/CognitivePilot-main/examples/interpersonal.md)
  人际问题示例
- [examples/strategic.md](/Users/dylonluo/Downloads/CognitivePilot-main/examples/strategic.md)
  战略问题示例

## 当前定位

- 一个可复用的九维思考 skill
- 一套结构化分析 prompt
- 一组可参考的示例输出

它不再包含原来的 plugin 运行代码；当前仓库只保留 skill 相关内容。
