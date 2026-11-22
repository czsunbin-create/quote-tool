"use strict";
const trades = ["水电", "泥瓦", "木工", "油漆", "安装"];
const traps = [
 ["拆除按项打包","只写拆旧一项，没有墙体、地面及保留部分的边界。","能把要拆的部位、面积和保护范围列在图上吗？"],
 ["垃圾清运只到楼下","搬下楼和运出小区被合写成清运。","从房间到指定消纳点，每一段谁负责、谁付费？"],
 ["水电预估没有上限","预算按预估米数，结算按现场实际长度。","能先画走线路径，约定计量方法和超量签字条件吗？"],
 ["开槽与封槽分计","水电单价写了开槽，封槽人工和砂浆另列。","不同墙材的开槽、封槽分别含哪些费用？"],
 ["强弱电点位口径不同","一个插座可能按面板、底盒或回路计数。","能逐房列点位，并标清双联面板怎样计数吗？"],
 ["配电箱只报箱体","清单只列箱体规格，未列断路器和回路数量。","回路配置、开关型号及接线人工各含多少？"],
 ["给水配件另计","管材有每米价格，弯头、三通和阀门没有数量。","接头、阀门、试压分别是否包含，怎么验收？"],
 ["排水改位缺接驳","排水管报价未说明接入原管和修复地面的费用。","每个改位点包含哪些管件、接驳和修复？"],
 ["防水高度没标明","只报地面面积，墙面涂刷范围没有图示。","各面墙做到多高，门口和管根的处理含在报价里吗？"],
 ["闭水试验责任不清","工序表只写涂刷，没有试验及复验安排。","谁负责封堵、试验记录和整改后的复验？"],
 ["地面找平另算厚度","按平方米报基础价，厚度增加时没有计价规则。","现场实测高差是多少，超过约定厚度怎么计费？"],
 ["瓷砖规格触发加价","铺贴人工按常规砖，未注明适用尺寸。","我选的砖尺寸、铺法和上墙位置对应哪档人工？"],
 ["倒角与收边另计","转角只写收口，没有注明倒角、收边条或长度。","每处阳角采用什么做法，材料和人工如何算？"],
 ["铺贴辅料列项不全","只写水泥砂浆，未说明瓷砖胶等适用部位。","请按选砖及基层列出所需辅料、用量和单价好吗？"],
 ["美缝按不同单位报价","材料按组出售，施工按米或平方米收费。","按实际砖缝宽度、长度计算，清缝和施工各多少钱？"],
 ["门槛石缺加工安装","只列石材价格，磨边、切割和安装未列。","每块成品按什么尺寸交付，开孔和安装是否包含？"],
 ["吊顶展开面积不明","造型顶只标投影面积，没有侧面和灯槽口径。","能在剖面图上标出每一段如何计量吗？"],
 ["木作背板规格缺失","柜体有板材型号，背板厚度及封边工艺没有写。","背板、层板各用什么规格，哪些边做封边？"],
 ["柜门五金只含基础款","写含五金，却未列铰链、抽屉轨和拉手的配置。","请逐柜列出五金型号、数量以及选配差价好吗？"],
 ["墙面基层处理另列","油漆报价列底漆面漆，没有旧层清除和修补。","哪些墙要铲除、修补或挂网，工程量如何确认？"],
 ["调色和分色另计","乳胶漆按单色报价，深色和多色交界另收费。","按已选颜色和分色线长度，材料与人工合计多少？"],
 ["门窗洞口计量含糊","墙面面积未说明是否扣洞口及如何计算侧壁。","能按同一规则列出洞口扣减和侧壁增加量吗？"],
 ["成品保护范围过窄","只列地膜，入户门、电梯和已装设备未写明。","哪些部位要保护，铺设、拆除和损坏修复谁负责？"],
 ["上楼搬运重复收费","材料单写含配送，施工单又按楼层计搬运。","配送终点在哪里，电梯可用时还有哪些搬运费？"],
 ["主材供货边界模糊","全包项目只列品类，没有品牌系列及交付数量。","能逐项写出型号、数量、供货方和替换审批方式吗？"],
 ["洁具安装缺小配件","安装费列了件数，角阀、软管和密封件另购。","按这套洁具实际接口，谁提供每件配件并承担安装？"],
 ["灯具安装按复杂度加价","仅写普通灯具安装，没有界定吊灯或嵌入灯。","请按灯具清单列出开孔、加固、安装和调试费用好吗？"],
 ["计费基数不清","管理费或服务费只写百分比，没有写乘哪一项。","请列计算基数、费率及含税总额，让我复算好吗？"],
 ["暂定金额误作固定价","合计里含暂估项目，备注却写按实结算。","哪些金额待定，什么材料到场或尺寸确认后能锁价？"],
 ["变更只靠口头确认","合同未写增减项如何定价和签认。","变更前能否先列数量、单价、工期影响，由双方确认再施工？"]
];
const el = id => document.getElementById(id);
const money = n => n.toLocaleString("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2});
for (const trade of trades) {
 const label = document.createElement("label");
 const box = document.createElement("input");
 box.type = "checkbox"; box.value = trade;
 label.append(box,trade); el("items").append(label);
}
function resetResult() {
 el("unit").textContent = "—";
 el("comparison").textContent = "请核对输入后重新计算。";
 el("missing").textContent = "等待本次核算。";
 el("error").textContent = "";
}
el("quote").addEventListener("input", e => {
 resetResult();
 // 切换模式后重新采集同口径参考价。
 if (e.target.name === "mode") { el("low").value = ""; el("high").value = ""; }
});
el("quote").addEventListener("submit", e => {
 e.preventDefault();
 const area = el("area").valueAsNumber, price = el("price").valueAsNumber;
 const low = el("low").valueAsNumber, high = el("high").valueAsNumber;
 const reference = el("low").value !== "" || el("high").value !== "";
 const unit = price / area;
 if (!Number.isFinite(unit) || (reference && (!Number.isFinite(low) || !Number.isFinite(high) || low > high || !Number.isFinite(area*high)))) {
   resetResult(); el("error").textContent = "请检查金额与面积。参考区间请同时填写两端，最低价应小于或等于最高价。"; return;
 }
 const mode = e.target.elements.mode.value;
 el("unit").textContent = money(unit);
 // 对比总价与区间边界，以分为精度，避免显示边界与判断矛盾。
 const cents = n => Math.round((n + Number.EPSILON)*100);
 const position = cents(price) < cents(area*low) ? "低于" : cents(price) > cents(area*high) ? "高于" : "落在";
 el("comparison").textContent = reference ? mode+"报价"+position+"当地参考区间（"+money(low)+"–"+money(high)+" 元/㎡）。按本次面积，参考总价为 "+money(area*low)+"–"+money(area*high)+" 元。请复核材料规格与施工范围。" : mode+"单价已算出。补充当地同口径最低和最高单价后，可判断是否在参考区间内。";
 const unchecked = [...el("items").querySelectorAll("input")].filter(box => !box.checked).map(box => box.value);
 el("missing").textContent = (unchecked.length ? "尚未确认："+unchecked.join("、")+"。请施工方注明是否包含、另计或由业主负责。" : "五类项目均已勾选，请逐项核实数量、规格和计量单位。")+(mode === "半包" ? "半包另核主材采购与安装分工。" : "全包另核主材型号、限额和替换差价。");
});
// 文件模式或隐私模式下存储可能不可用，本页仍可切换。
const storageKey = "quote-tool-access-v1";
let unlocked = false;
try { unlocked = UNLOCK_CODES.has(localStorage.getItem(storageKey)); } catch {}
function render() {
 const entries = unlocked ? traps : traps.slice(0,3);
 el("list").replaceChildren();
 for (const [title,signal,question] of entries) {
   const details = document.createElement("details"), summary = document.createElement("summary");
   summary.textContent = title; details.append(summary);
   for (const [label,content] of [["怎么识别",signal],["怎么问施工方",question]]) {
     const line = document.createElement("p"), name = document.createElement("b");
     name.textContent = label; line.append(name,content); details.append(line);
   }
   el("list").append(details);
 }
 el("count").textContent = entries.length+" / 30 条";
 el("access").textContent = unlocked ? "完整版已解锁" : "完整版 · ¥19.9";
 el("benefit").textContent = unlocked ? "30 条识别方法与询价问题均可查看。" : "解锁其余 27 条，逐项核对施工范围与费用。";
 el("toggle").textContent = unlocked ? "切换免费版" : "解锁全部";
}
function setAccess(code) {
 unlocked = UNLOCK_CODES.has(code);
 try { if (unlocked) localStorage.setItem(storageKey,code); else localStorage.removeItem(storageKey); } catch {}
 render();
}
el("toggle").onclick = () => {
 if (unlocked) { setAccess(null); return; }
 el("code").value = ""; el("invalid").textContent = ""; el("dialog").showModal(); el("code").focus();
};
el("close").onclick = () => el("dialog").close();
el("unlock").onsubmit = e => {
 e.preventDefault();
 const code = el("code").value.trim();
 if (!UNLOCK_CODES.has(code)) { el("invalid").textContent = "解锁码不匹配，请核对后重试。"; return; }
 setAccess(code); el("dialog").close();
};
render();
