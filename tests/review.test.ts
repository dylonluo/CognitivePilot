import test from "node:test";
import assert from "node:assert/strict";

import { review } from "../index.js";
import { analyzeSixDimensions } from "../src/analyzers/six-dimensions.js";
import { detectScene } from "../src/scene-detector.js";

test("detectScene falls back to execution when no keywords match", () => {
  assert.equal(detectScene("").type, "execution");
  assert.equal(detectScene("hello world").type, "execution");
});

test("review describes framework time as suggested reflection time", async () => {
  const output = await review("团队里沟通反复、优先级不清，项目推进越来越慢");

  assert.match(output, /建议思考\d+分钟/u);
  assert.doesNotMatch(output, /预计\d+分钟/u);
});

test("six dimensions analysis adapts to technical dependency problems", () => {
  const analysis = analyzeSixDimensions("接口联调反复失败，依赖服务不稳定，发布时间又很紧");

  assert.match(analysis.core.contradiction, /依赖|技术稳定性|上线窗口/u);
  assert.match(analysis.core.keyTwenty, /复现路径|回滚|定位根因/u);
  assert.match(analysis.breakdown, /研发|测试|系统 owner/u);
});

test("six dimensions analysis adapts to alignment problems", () => {
  const analysis = analyzeSixDimensions("团队和经理对目标理解不一致，沟通反复，优先级一直变");

  assert.match(analysis.core.contradiction, /沟通口径不一致|优先级/u);
  assert.match(analysis.core.keyTwenty, /谁拍板|成功/u);
  assert.match(analysis.breakdown, /团队成员|直接负责人|关键协作者/u);
});
