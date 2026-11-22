(()=>{
const root=document.getElementById('cc-proto');if(!root)return;
const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const clone=v=>JSON.parse(JSON.stringify(v));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=n=>`<i data-lucide="${n}" aria-hidden="true"></i>`;
const legacySampleRecords=[{"id":"intern","name":"森屿生活（虚构）","role":"产品实习生","section":"实习经历","date":"2024.03 — 2024.06","source":"示例实习记录.pdf","scores":[96,20,42],"tags":["用户研究","需求分析","产品设计"],"reason":"履约流程 · 需求分析 · 体验验证","points":[{"id":"i1","group":"到店自提流程","label":"需求调研","text":"走访 8 家社区门店，记录店员核销订单与处理缺货的操作过程；整理顾客取货时的等待与沟通问题，绘制从下单到提货的服务流程。","short":"走访 8 家社区门店，梳理订单核销、缺货处理与提货等待问题。"},{"id":"i2","group":"到店自提流程","label":"流程设计","text":"为预约提货设计时段选择、订单确认和到店提醒页面，补齐迟到、取消与部分缺货的异常状态；通过纸面原型与店员一起核对操作顺序。","short":"设计时段选择、订单确认和到店提醒页面，补齐取消与缺货状态。"},{"id":"i3","group":"到店自提流程","label":"数据核对","text":"用 SQL 汇总不同时段的核销记录，对比工作日与周末的到店分布；逐项核对异常订单，整理影响顾客等待时间的因素。","short":"用 SQL 汇总核销记录，比较到店时段分布并排查异常订单。"},{"id":"i4","group":"门店试用回访","label":"试用反馈","text":"编制 24 条操作任务，邀请店员试用订单处理页面，记录误触位置、重复操作与不清楚的状态提示，形成按影响程度排序的修改清单。","short":"编制 24 条试用任务，记录误触与重复操作，形成修改清单。"},{"id":"i5","group":"门店试用回访","label":"交付跟进","text":"按页面状态核对试用版本，对照问题清单复测修改结果；汇总门店反馈与仍需观察的问题，更新交接记录和操作指引。","short":"复测试用版本，汇总门店反馈并更新交接记录与操作指引。"}]},{"id":"agent","name":"社区维修预约助手","role":"课程实践","section":"个人项目","date":"2024.09 — 2024.12","source":"示例项目说明.docx","scores":[91,16,87],"tags":["AI产品","Agent","评测"],"reason":"服务流程 · 对话设计 · 边界处理","points":[{"id":"a1","label":"场景拆解","text":"围绕住户报修的信息遗漏问题，拆分故障描述、地址核对、时间选择与人工确认四个步骤；将无法判断的故障留给服务人员处理。","short":"拆分故障描述、地址核对与预约确认步骤，为不确定情况设置人工处理入口。"},{"id":"a2","label":"Agent 原型","text":"搭建多轮预约对话原型，按规则检查地址和时间字段；调用模拟排班表展示可预约时段，在提交前请住户确认完整工单。","short":"搭建预约对话原型，检查关键字段、查询模拟排班并确认工单。"},{"id":"a3","label":"流程评估","text":"设计重复报修、地址缺失和临时改约等 36 种测试情境，记录对话能否正确补问、保留已有信息并进入合适的处理分支。","short":"用 36 种测试情境检查补问、信息保留和异常分支处理。"}]},{"id":"campus","name":"场馆预约小程序","role":"交互设计课程","section":"个人项目","date":"2023.10 — 2023.12","source":"示例课程与课题.pdf","scores":[82,24,48],"tags":["用户研究","原型","产品设计"],"reason":"预约体验 · 状态反馈","points":[{"id":"c1","label":"问题梳理","text":"访谈场馆管理员和使用者，整理可用时段难查、预约规则分散与临时取消不便的问题，确定时段日历和预约记录为核心页面。","short":"整理时段查询、规则查阅与取消预约问题，确定日历和预约记录页面。"},{"id":"c2","label":"交互原型","text":"完成日期切换、场地选择和预约确认的连贯原型；区分可预约、已约满与维护中的状态，并在取消操作后展示即时反馈。","short":"完成场地预约原型，区分可预约、约满与维护状态。"},{"id":"c3","label":"可用性验证","text":"邀请 6 位同学完成预约与取消任务，根据操作记录调整时间选择方式和规则提示的位置，保留修改前后的任务完成记录。","short":"邀请 6 位同学试用，根据任务记录调整时间选择与规则提示。"}]},{"id":"rag","name":"设备说明书检索工具","role":"学习项目","section":"个人项目","date":"2024.01 — 2024.02","source":"示例项目说明.docx","scores":[73,35,95],"tags":["检索","RAG","知识库"],"reason":"文档结构 · 检索验证","points":[{"id":"r1","label":"资料整理","text":"选取公开的家用设备说明书，按型号、操作步骤与故障代码整理段落，为每段保留文档标题和章节位置，方便核对原始说明。","short":"按型号、操作步骤与故障代码整理说明书，并保留章节位置。"},{"id":"r2","label":"检索实现","text":"组合关键词匹配与语义检索，比较型号过滤前后的召回结果；对相似型号混淆和操作步骤缺失的问题建立可复查的错误记录。","short":"组合关键词与语义检索，比较型号过滤效果并记录召回错误。"},{"id":"r3","label":"答案校验","text":"编写 48 个操作与故障查询问题，逐一核对返回段落能否支持回答；当资料不足时标注缺失信息，避免把相近型号的步骤混用。","short":"用 48 个问题核对回答依据，标注资料不足并排查型号混用。"}]},{"id":"finance","name":"岚桥咨询（虚构）","role":"产业研究助理","section":"实习经历","date":"2023.07 — 2023.09","source":"示例实习记录.pdf","scores":[31,98,25],"tags":["金融","研究","数据分析"],"reason":"产业资料 · 财务口径","points":[{"id":"f1","label":"市场资料","text":"围绕家居照明行业整理公开年报与渠道资料，按产品类别比较收入结构和销售方式，建立带来源链接的资料索引。","short":"整理家居照明行业公开资料，比较收入结构与销售方式。"},{"id":"f2","label":"财务核对","text":"统一样本公司的收入、毛利率和存货周转口径，标记会计年度与披露单位差异；使用 Excel 维护可比指标表并复核异常变化。","short":"统一财务指标口径，使用 Excel 维护可比表并复核异常变化。"},{"id":"f3","label":"简报支持","text":"将资料更新整理为每周行业简报，区分原始披露、计算结果与待核实信息，协助准备后续访谈需要确认的问题。","short":"整理每周行业简报，区分披露与计算结果，准备待核实问题。"}]},{"id":"contest","name":"社区便利店经营沙盘赛","role":"财务分析成员","section":"比赛经历","date":"2022.11 — 2023.01","source":"示例经营沙盘.pdf","scores":[66,85,53],"tags":["数据分析","商业分析","策略"],"reason":"成本预算 · 经营取舍","points":[{"id":"b1","label":"经营测算","text":"使用比赛提供的模拟数据建立进货、库存与人工成本表，比较不同补货频次下的资金占用和缺货情况，为经营方案提供测算依据。","short":"基于模拟数据测算库存、人工成本与资金占用，比较补货方案。"},{"id":"b2","label":"方案汇报","text":"对租金变化和客流波动开展敏感性分析，说明各方案的收益条件与主要风险，在决赛展示中解释预算假设和选择理由。","short":"分析租金与客流变化的影响，说明预算假设、收益条件与风险。"}]},{"id":"research","name":"城市客流预测课题","role":"课题助理","section":"学术经历","date":"2023.10 — 2024.01","source":"示例课程与课题.pdf","scores":[20,10,98],"tags":["算法","模型","实验"],"reason":"时间序列 · 误差分析","points":[{"id":"s1","label":"数据准备","text":"使用公开的小时级客流样本，按时间顺序划分训练与验证区间；检查缺失时段、节假日标记和异常计数，记录各项处理规则。","short":"整理公开客流样本，检查缺失时段与异常计数，按时间划分数据。"},{"id":"s2","label":"模型比较","text":"对比移动平均和梯度提升模型在工作日与周末的预测表现，统一评估窗口与误差指标，保存每轮实验使用的参数和特征。","short":"比较移动平均与梯度提升模型，统一评估窗口并保存实验参数。"},{"id":"s3","label":"结果复核","text":"按高峰时段、天气变化与节假日检查较大误差，绘制预测曲线和残差图，协助整理课题报告的实验过程与局限。","short":"按时段和节假日复核误差，绘制残差图并整理实验局限。"}]}];

const sampleRecords = [
  {
    id: 'sample-product-intern', name: '禾沐到家（虚构）', role: '产品实习生',
    section: '实习经历', date: '2024.06 — 2024.09', source: '示例实习记录.pdf',
    tags: ['用户研究', '需求分析', '产品设计'], reason: '售后流程 · 需求优先级 · 试点验证',
    points: [
      {
        id: 'sample-product-intern-1', label: '用户研究',
        text: '访谈 12 位生鲜到家用户和 5 位客服，归纳退款进度难查、凭证重复提交等问题，绘制售后服务流程并按影响范围排序。',
        short: '访谈 12 位用户和 5 位客服，梳理售后流程并给退款痛点排序。'
      },
      {
        id: 'sample-product-intern-2', label: '产品设计',
        text: '用 Figma 设计上传凭证、退款进度和异常提醒三个页面，编写产品需求文档，和客服及研发逐项核对状态流转与验收条件。',
        short: '设计凭证、退款进度和异常提醒页面，编写需求及验收条件。'
      },
      {
        id: 'sample-product-intern-3', label: '试点验证',
        text: '为试点补充提交成功率和进度查询次数埋点，用 SQL 核对两周记录，发现凭证上传页流失较高并提交修改建议。',
        short: '用 SQL 核对试点埋点，定位凭证上传页流失并提出修改建议。'
      }
    ]
  },
  {
    id: 'sample-product-repair', name: '家电报修预约小程序', role: '课程项目产品负责人',
    section: '个人项目', date: '2024.10 — 2024.12', source: '示例项目说明.docx',
    tags: ['需求调研', '交互原型', '可用性测试'], reason: '预约流程 · 多轮对话 · 可用性测试',
    points: [
      {
        id: 'sample-product-repair-1', label: '需求拆解',
        text: '访谈 8 位潜在用户和 3 位维修人员，将家电报修拆成故障描述、时段预约和工单确认，依据频率和影响确定首版范围。',
        short: '访谈用户和维修人员，拆解报修任务并确定首版功能范围。'
      },
      {
        id: 'sample-product-repair-2', label: '交互原型',
        text: '用 Figma 制作预约与改约原型，设计 Agent 多轮对话的补问、人工转接和提交前确认规则，并用模拟排班表验证流程。',
        short: '制作预约原型，设计 Agent 补问、人工转接和工单确认规则。'
      },
      {
        id: 'sample-product-repair-3', label: '可用性测试',
        text: '组织 8 位同学完成预约和改约任务，另用 24 个异常情境检查对话分支，根据观察记录修改确认页和改约入口。',
        short: '组织预约和改约试用，覆盖 24 个异常情境并改进交互。'
      }
    ]
  },
  {
    id: 'sample-banking-intern', name: '澄远证券（虚构）', role: '投资银行实习生',
    section: '实习经历', date: '2024.01 — 2024.04', source: '示例实习记录.pdf',
    tags: ['尽职调查', '财务分析', '行业研究'], reason: 'IPO 尽调 · 底稿核对 · 风险分析',
    points: [
      {
        id: 'sample-banking-intern-1', label: '财务尽调',
        text: '协助工业零部件企业 IPO 尽职调查，用 Excel 核对三年审计报表、收入明细和主要客户合同，将确认时点差异记录到底稿。',
        short: '协助 IPO 财务尽调，核对三年收入记录和主要客户合同。'
      },
      {
        id: 'sample-banking-intern-2', label: '风险分析',
        text: '计算前五大客户收入占比和应收账款周转天数，比较报告期变动，并整理需向公司财务负责人确认的问题。',
        short: '分析客户集中度和应收账款周转，整理尽调待核实问题。'
      },
      {
        id: 'sample-banking-intern-3', label: '可比公司分析',
        text: '汇总 6 家上市可比公司的年报披露，统一收入和毛利率口径，保留数据出处并编制供项目组复核的行业对照表。',
        short: '统一 6 家可比公司的年报指标口径，编制带来源的行业对照表。'
      }
    ]
  },
  {
    id: 'sample-banking-valuation', name: '工业自动化企业并购估值', role: '金融课程项目成员',
    section: '个人项目', date: '2024.09 — 2024.12', source: '示例项目说明.docx',
    tags: ['并购', '财务模型', '估值'], reason: 'DCF · 可比公司法 · 敏感性分析',
    points: [
      {
        id: 'sample-banking-valuation-1', label: '财务建模',
        text: '用公开年报整理标的企业三年历史财务数据，在 Excel 搭建五年预测模型，联动营收、利润率、营运资本和资本开支。',
        short: '基于公开年报搭建五年财务预测，联动营收、成本及营运资本。'
      },
      {
        id: 'sample-banking-valuation-2', label: '并购估值',
        text: '用 DCF 估算企业价值，并用 5 家可比公司的 EV/EBITDA 倍数交叉核验，解释两种估值区间的差异。',
        short: '用 DCF 和可比公司 EV/EBITDA 倍数估值，核对估值区间。'
      },
      {
        id: 'sample-banking-valuation-3', label: '敏感性分析',
        text: '对 WACC 和永续增长率做双变量敏感性分析，补充基准、乐观及下行情景，整理主要假设和并购定价风险。',
        short: '对 WACC 和永续增长率做敏感性分析，说明并购定价风险。'
      }
    ]
  },
  {
    id: 'sample-algorithm-intern', name: '星垒数据（虚构）', role: '算法实习生',
    section: '实习经历', date: '2024.06 — 2024.09', source: '示例实习记录.pdf',
    tags: ['机器学习', 'Python', '时间序列'], reason: '时间序列预测 · 模型训练 · 批量推理',
    points: [
      {
        id: 'sample-algorithm-intern-1', label: '特征工程',
        text: '用 Python 清洗 18 个月的小时级客服工单，构建滞后量、滚动均值与节假日特征，按时间切分训练和验证窗口，避免数据泄漏。',
        short: '用 Python 构建时序特征，并按时间划分训练验证窗口。'
      },
      {
        id: 'sample-algorithm-intern-2', label: '模型评估',
        text: '比较季节性基线和 LightGBM，在同一时间验证集上将 WAPE 从 18.6% 降至 14.2%，并按高峰时段复核误差。',
        short: '在同一验证集上用 LightGBM 将 WAPE 从 18.6% 降至 14.2%。'
      },
      {
        id: 'sample-algorithm-intern-3', label: '批量推理',
        text: '把特征与模型推理封装为每日批处理脚本，记录输入版本和预测结果，添加缺失特征检查并用历史数据回放验证。',
        short: '封装每日批量推理脚本，加入数据检查并完成历史回放。'
      }
    ]
  },
  {
    id: 'sample-algorithm-retrieval', name: '家电维修说明书检索评测', role: '机器学习课程项目成员',
    section: '个人项目', date: '2024.10 — 2024.12', source: '示例项目说明.docx',
    tags: ['RAG', '语义检索', '评测'], reason: '混合检索 · 重排序 · 答案依据',
    points: [
      {
        id: 'sample-algorithm-retrieval-1', label: '检索数据集',
        text: '将 30 份公开家电说明书按型号和章节切分，人工构建 120 条维修查询及证据标注，其中包含易混型号和缺失信息问题。',
        short: '切分 30 份公开说明书，标注 120 条含易混型号的查询及证据。'
      },
      {
        id: 'sample-algorithm-retrieval-2', label: '召回与重排',
        text: '在 Python 中实现 BM25 与向量混合检索，加入型号过滤和候选重排序，在固定评测集将 Recall@5 从 72% 提升到 86%。',
        short: '实现混合检索与重排序，将固定评测集 Recall@5 从 72% 提升到 86%。'
      },
      {
        id: 'sample-algorithm-retrieval-3', label: '回答校验',
        text: '为 RAG 原型输出说明书章节引用，逐条核对答案依据，归类型号混淆和无依据回答，并添加证据不足时的回退提示。',
        short: '核对 RAG 答案的章节引用，对证据不足的查询给出回退提示。'
      }
    ]
  }
];
// Existing drafts store sample IDs instead of full copies of unchanged sample records.
const samplesById = new Map(
  [...legacySampleRecords, ...sampleRecords].map(record => [record.id, record])
);

const fileObjects=new Map(),audioObjects=new Map(),filePictureUrls=new Map();
const assistant = window.CareerCraftAssistant;
const resetFields = () => ({
  v: 1, stage: 'intake', files: [], records: [], messages: [],
  profile: { name: '', phone: '', email: '', education: '', skills: '' },
  sample: false, generated: false, reviewed: false, asked: false, pending: null, emphasis: ''
});
const device = window.CareerCraftDevice;
const materialReader = window.CareerCraftReader;
const organizer = window.CareerCraftOrganizer;
const activeFileReads = new Map();
let jdFileRead;
const materialExtensions = '.pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.bmp,.gif,.avif';
let flow = resetFields();
let voice = null, voiceTimer = null, exportBytes = null, flowBusy = false, generation = null, modelService = null;
const flowSteps = [['intake', '资料录入'], ['review', '经历库'], ['direction', '求职方向'], ['editor', '简历']];
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function packedFlow() {
  const saved = clone(flow);
  saved.records = saved.records.map(record => {
    const sample = samplesById.get(record.id);
    return sample && JSON.stringify(record) === JSON.stringify(sample) ? { sampleId: record.id } : record;
  });
  return saved;
}
function unpackFlow(saved) {
  const restored = clone(saved);
  restored.records = (restored.records || []).flatMap(record => {
    if (!record.sampleId) return [record];
    const sample = samplesById.get(record.sampleId);
    return sample ? [clone(sample)] : [];
  });
  return restored;
}
function flowHeader() {
  return `<header class="ff-header">
    <div class="cc-brand"><span class="cc-logo" aria-hidden="true">C</span>CareerCraft<span class="cc-demo">求职工作台</span></div>
    <nav class="ff-stepper" aria-label="制作简历">${flowSteps.map(([id, name]) =>
      `<button type="button" data-stage="${id}" ${flow.stage === id ? 'aria-current="step"' : ''} ${stageAllowed(id) ? '' : 'disabled'}>${name}</button>`).join('')}</nav>
    <div class="ff-version"></div>
    <button type="button" class="cc-button cc-settings" data-model-settings aria-label="生成设置">
      ${icon('list-checks')}${assistant.enabled() ? '模型已启用' : '生成设置'}</button>
  </header>`;
}
function stageAllowed(stage) {
  return stage === 'intake' || stage === 'review' ||
    (stage === 'direction' && flow.reviewed) || (stage === 'editor' && flow.generated);
}
function setStage(s){if(!stageAllowed(s))return;closeModal(false);flow.stage=s;ghost=null;render(false);save();root.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'})}
function renderFlow(){
 root.dataset.stage=flow.stage;$('.cc-app').hidden=flow.stage!=='editor';$('.ff-screen').hidden=flow.stage==='editor';
 const tabs=$('.ff-version .cc-tabs')||$('.cc-top .cc-tabs');$('.ff-header').outerHTML=flowHeader();$('.ff-header').inert=!!modal;if(tabs)$('.ff-version').append(tabs);
 if(flow.stage==='intake')$('.ff-screen').innerHTML=intakeHTML();
 else if(flow.stage==='review')$('.ff-screen').innerHTML=reviewHTML();
 else if(flow.stage==='direction')$('.ff-screen').innerHTML=directionHTML();
 icons();
}
function intakeHTML(){return `<div class="ff-heading"><div><h1>${flow.generated?'继续丰富你的经历':'从你的经历开始'}</h1><p>整理教育、实习和项目经历，生成你的第一份一页简历。</p></div><button type="button" class="cc-button cc-quiet" data-sample>试用示例资料</button></div><div class="ff-intake"><div><div class="ff-drop" data-drop>${icon('files')}<strong>把资料放在这里</strong><span class="cc-small">PDF、DOCX、图片、TXT、Markdown</span><span class="cc-small">${location.protocol === 'file:' ? '<a href="http://127.0.0.1:8787/">打开本地工作台</a>可自动识别 PDF 和图片' : '自动提取文字，整理成可核对的经历'}</span><button type="button" class="cc-button" data-upload>选择文件</button><input class="ff-file-input" type="file" multiple accept="${materialExtensions}" data-files aria-label="上传背景资料"></div><div class="ff-files">${flow.files.map(f=>`<div class="ff-file">${icon(f.kind==='audio'?'mic':f.kind==='image'?'image':'file-text')}<button type="button" class="ff-file-main" data-file="${f.id}"><strong>${esc(f.name)}</strong><span data-material-status="${f.id}">${esc(f.status)}</span></button><button type="button" class="cc-button cc-square" data-file-remove="${f.id}" aria-label="移除${esc(f.name)}">${icon('x')}</button></div>`).join('')}</div></div><div class="ff-chat"><div class="ff-chat-head"><span>聊聊你的经历</span><span class="cc-small">文字 / 语音</span></div><div class="ff-messages" aria-live="polite">${flow.messages.length?flow.messages.slice(-5).map(m=>`<div class="ff-bubble ${m.role==='user'?'user':''}">${m.voice?icon('audio-lines')+' ':''}${esc(m.text)}</div>`).join(''):'<div class="ff-chat-empty">最近做过什么？<br>从一段实习或项目说起。</div>'}</div>${flow.pending?'<div class="ff-skip"><button type="button" class="cc-button" data-skip-followup>暂时没有</button><button type="button" class="cc-button cc-quiet" data-new-story>聊下一段</button></div>':''}<div class="ff-compose"><textarea data-chat placeholder="写下来，或点击麦克风" aria-label="输入经历">${esc(flow.chatDraft)}</textarea><div class="ff-compose-bar"><button type="button" class="cc-button cc-quiet" data-voice>${icon('mic')}语音输入</button><button type="button" class="cc-button cc-main" data-chat-send aria-label="发送经历">发送</button></div></div></div></div><div class="ff-footer"><span class="cc-small">${all().length?`${all().length} 段经历`:'草稿仅保存在当前浏览器'}</span><button type="button" class="cc-button" data-record-new>手动添加</button><button type="button" class="cc-button cc-main" data-organize >${all().length || flow.files.length ? '查看整理结果' : '填写个人信息'}</button></div>`}
function reviewHTML(){return `<div class="ff-heading"><div><h1>这是你的经历</h1><p>${flow.sample?'当前资料中包含虚构示例，请在投递前替换。':'确认内容，之后随时可以补充。'}</p></div><button type="button" class="cc-button" data-voice>${icon('mic')}语音补充</button></div><section class="ff-profile"><h2>个人信息</h2><div class="ff-form-grid">${[['name','姓名','你的姓名'],['phone','手机','选填'],['email','邮箱','选填']].map(([key,label,placeholder])=>`<label class="cc-field ${key==='email'?'ff-full':''}"><span>${label}</span><input class="cc-input" data-profile="${key}" value="${esc(flow.profile[key])}" placeholder="${placeholder}"></label>`).join('')}<label class="cc-field ff-full"><span>教育背景</span><textarea class="cc-input" data-profile="education" rows="2" placeholder="学校、专业、学位、起止时间">${esc(flow.profile.education)}</textarea></label><label class="cc-field ff-full"><span>技能</span><textarea class="cc-input" data-profile="skills" rows="2" placeholder="语言、工具、专业技能">${esc(flow.profile.skills)}</textarea></label></div></section><div class="ff-records">${all().map(c=>`<div class="ff-record"><span class="ff-record-icon">${icon(c.section==='实习经历'?'briefcase-business':c.section==='学术经历'?'graduation-cap':'layers')}</span><div class="ff-record-info"><strong>${esc(c.name)}</strong><span>${esc(c.section)} · ${c.points.length} 个要点${c.date?' · '+esc(c.date):''}</span></div><button type="button" class="cc-button cc-quiet" data-record-edit="${c.id}">编辑</button>${flow.generated ? `<button type="button" class="cc-button cc-quiet" data-ca-locate="${c.id}">在简历中查看</button>` : ''}</div>`).join('')||'<div class="ff-empty">资料已添加。补充文字或语音，整理成经历。</div>'}</div>${flow.files.some(f=>f.needsText && !f.reading)?'<p class="ff-review-note">有材料尚未读出内容。在「资料录入」可查看识别状态或补充文字。</p>':''}<div class="ff-gap-list"><button type="button" class="ff-gap" data-record-new>${icon('plus')}添加经历</button></div><div class="ff-footer"><button type="button" class="cc-button" data-stage="intake">返回资料</button><button type="button" class="cc-button cc-main" data-review-next ${canBuildResume() ? '' : 'disabled'}>确认并继续</button></div>`}
function directionHTML(){return `<div class="ff-heading"><div><h1>想投递哪类岗位？</h1><p>先生成一份通用简历。</p></div></div><div class="ff-directions">${[['产品经理','panels-top-left','用户 · 产品 · 数据'],['投行','chart-no-axes-combined','财务 · 研究 · 分析'],['算法','network','模型 · 实验 · 工程']].map(([name,ico,sub])=>`<button type="button" class="ff-direction" data-direction="${name}" aria-pressed="${(flow.targetRole || state.role) === name}">${icon(ico)}<strong>${name === '投行' ? '投资银行分析师' : name === '算法' ? '算法工程师' : name}</strong><span>${sub}</span></button>`).join('')}</div><label class="cc-field ff-target"><span>想特别突出什么？</span><input class="cc-input" data-emphasis placeholder="选填，例如 AI 产品、金融科技" value="${esc(flow.emphasis)}"></label><div class="ff-footer"><button type="button" class="cc-button" data-stage="review">返回经历</button><button type="button" class="cc-button cc-main" data-generate-base>生成通用简历</button></div>`}
function useSample() {
  const fillProfile = !all().length && !flow.files.length && !Object.values(flow.profile).some(Boolean);
  const loadedSources = new Set(flow.files.filter(file => file.id.startsWith('sample')).map(file => file.name));
  const missingSources = [...new Set(sampleRecords.map(record => record.source))]
    .filter(source => !loadedSources.has(source));
  const missingRecords = sampleRecords.filter(record => !item(record.id));
  if (!missingSources.length && !missingRecords.length) {
    toast('已载入全部示例资料');
    return;
  }
  flow.sample = true;
  flow.files.push(...missingSources.map(name => ({
    id: uid('sample'), name, status: '虚构示例 · 已整理', kind: 'document'
  })));
  flow.records.push(...clone(missingRecords));
  if (fillProfile) {
    flow.profile = {
      name: '陈安禾', phone: '000 0000 0000', email: 'candidate@example.com',
      education: '青禾大学（虚构） · 信息管理 · 硕士 · 2023.09 — 2025.06\n南川学院（虚构） · 统计学 · 本科 · 2019.09 — 2023.06',
      skills: '工具：Figma、Excel、SQL、Python。\n方法：用户研究、财务建模、机器学习模型评估。'
    };
  }
  flow.messages.push({ role: 'assistant', text: `已载入 ${sampleRecords.length} 段示例经历。` });
  render(false);
  save();
}
function createRecord(text, source, extra = {}) {
  const id = uid('exp');
  const original = text.trim();
  const { sourceText = original, ...fields } = extra;
  const lines = original.split(/\n+/).map(line => line.trim()).filter(Boolean);
  const parts = lines.length > 1 ? lines : original.match(/[^。！？]+[。！？]?/g) || [original];
  const section = /实习|任职/.test(original) ? '实习经历'
    : /竞赛|比赛|获奖/.test(original) ? '比赛经历'
    : /论文|学术|课题/.test(original) ? '学术经历' : '个人项目';
  const name = lines[0]?.replace(/[。；，,].*$/, '').slice(0, 32) || '我的经历';
  return {
    id, name, role: '', section, date: '', source, sourceText, tags: [],
    reason: '来自你的原始记录',
    points: parts.map(part => part.trim()).filter(Boolean).map((part, index) => {
      const text = part.replace(/^(?:[-*•●]\s*|[（(]?\d+[).、．）]\s*)/, '').trim() || part;
      const short = text.replace(/^(?:我负责了|负责了)/, '负责')
        .replace(/^(?:我参与了|参与了)/, '参与')
        .replace(/^(?:本人|我)(?=负责|参与|组织|设计|开发|完成|搭建)/, '');
      return { id: id + 'p' + index, text, short };
    }),
    ...fields
  };
}
function submitStory(text,fromVoice=false,target=null){text=text.trim();if(!text)return;if(!fromVoice)flow.chatDraft='';const existing=target||flow.pending;let c=existing&&item(existing);flow.messages.push({role:'user',text,voice:fromVoice});if(c){const pid=uid('pt');c.points.push({id:pid,text,short:text});c.sourceText=(c.sourceText||c.points.slice(0,-1).map(p=>p.text).join('\n'))+'\n'+text;flow.pending=null;flow.messages.push({role:'assistant',text:'已补充到这段经历。'});}else{c=createRecord(text,fromVoice?'语音补充':'对话补充');flow.records.push(c);flow.pending=c.id;flow.messages.push({role:'assistant',text:'这段经历里，你主要负责什么？有没有可以补充的结果？'});}render(false);save();return c}
function skipFollowup(){flow.pending=null;flow.messages.push({role:'assistant',text:'好，保留已有信息。'});render(false);save()}
function canBuildResume() {
  return !!(all().length || flow.profile.education.trim() || flow.profile.skills.trim());
}
function reviewNext(){if(!canBuildResume())return;flow.reviewed=true;if(!flow.asked&&all().some(c=>!c.date)){flow.asked=true;openModal('还有这些信息吗？',`<p class="cc-message">经历的起止时间、你的职责或实际成果。</p><div class="ff-gap-list"><button type="button" class="cc-button" data-voice>${icon('mic')}语音补充</button><button type="button" class="cc-button" data-close>回去填写</button></div><div class="cc-dialog-actions"><button type="button" class="cc-button cc-main" data-skip-gaps>暂不补充，继续</button></div>`,'gaps')}else setStage('direction')}
function profileSections() {
  const lines = flow.profile.education.split('\n').map(line => line.trim()).filter(Boolean);
  if (!lines.length) return '';

  const rows = lines.map(line => {
    const { detail, date } = organizer.splitEducationLine(line);
    return `<div class="cc-education-row">${detail ? `<strong>${esc(detail)}</strong>` : ''}${date ? `<span class="cc-date">${esc(date)}</span>` : ''}</div>`;
  }).join('');
  return `<section class="cc-section cc-region" data-layout="education"><h2 class="cc-section-title">教育背景</h2>${rows}</section>`;
}
function skillSection(){if(!flow.profile.skills.trim())return '';return `<section class="cc-section cc-region" data-layout="skills"><h2 class="cc-section-title">专业技能</h2>${flow.profile.skills.split('\n').filter(Boolean).map(t=>`<p class="cc-skill">${esc(t)}</p>`).join('')}</section>`}
function editRecord(id){const c=id?item(id):null;openModal(c?'编辑经历':'添加经历',`<label class="cc-field"><span>名称</span><input class="cc-input" data-r-name value="${esc(c?.name)}" placeholder="公司、项目或比赛名称"></label><div class="ff-form-grid"><label class="cc-field"><span>类型</span><select class="cc-input" data-r-type>${sectionOrder.map(s=>`<option ${c?.section===s?'selected':''}>${s}</option>`).join('')}</select></label><label class="cc-field"><span>起止时间</span><input class="cc-input" data-r-date value="${esc(c?.date)}" placeholder="选填"></label></div><label class="cc-field"><span>角色</span><input class="cc-input" data-r-role value="${esc(c?.role)}" placeholder="选填"></label><label class="cc-field"><span>经历要点</span><textarea class="cc-input" rows="7" data-r-text placeholder="每行一个要点">${esc(c?.points.map(p=>p.text).join('\n'))}</textarea></label><div class="cc-dialog-actions">${c?`<button type="button" class="cc-button cc-quiet" data-record-delete="${c.id}">删除</button>`:''}<button type="button" class="cc-button" data-voice ${c?`data-voice-target="${c.id}"`:''}>${icon('mic')}语音补充</button><button type="button" class="cc-button cc-main" data-record-save="${c?.id||''}">保存</button></div><p class="cc-error" role="alert"></p>`,'record')}
function saveRecord(id) {
  const name = $('[data-r-name]').value.trim();
  const text = $('[data-r-text]').value.trim();
  if (!name || !text) {
    $('.cc-error').textContent = '请填写名称和经历要点。';
    return;
  }
  const fields = {
    name, section: $('[data-r-type]').value, date: $('[data-r-date]').value.trim(),
    role: $('[data-r-role]').value.trim()
  };
  const record = id && item(id);
  if (!record) {
    const created = createRecord(text, '手动录入', fields);
    flow.records.push(created);
    if (flow.stage === 'editor') state.open = created.id;
  }
  else {
    const updated = createRecord(text, record.source, fields);
    const before = record.points;
    const prior = before.slice();
    const canPreservePosition = before.length === updated.points.length &&
      updated.points.every((point, index) =>
        point.text === before[index].text || !before.some(old => old.text === point.text));
    const replaced = new Set();
    updated.points = updated.points.map((point, index) => {
      const oldIndex = prior.findIndex(old => old.text === point.text);
      if (oldIndex !== -1) return prior.splice(oldIndex, 1)[0];
      if (!canPreservePosition) return point;
      const old = before[index];
      prior.splice(prior.indexOf(old), 1);
      replaced.add(old.id);
      return { ...point, id: old.id, group: old.group, label: old.label };
    });
    record.sourceText ||= before.map(point => point.text).join('\n');
    const removed = new Set(prior.map(point => point.id));
    Object.assign(record, fields, { points: updated.points });
    if (removed.size || replaced.size) {
      for (const draft of [state.base, state.jd].filter(Boolean)) {
        draft.bullets[id] = (draft.bullets[id] || []).filter(pointId => !removed.has(pointId));
        if (!draft.bullets[id].length) draft.selected = draft.selected.filter(selectedId => selectedId !== id);
        for (const pointId of [...removed, ...replaced]) {
          delete draft.edits[pointId];
          delete draft.compact[pointId];
          for (const key of Object.keys(draft.manualEvidence || {})) {
            draft.manualEvidence[key] = draft.manualEvidence[key].filter(id => id !== pointId);
          }
        }
      }
    }
  }
  closeModal();
  render(false);
  save();
  toast(record ? '已保存经历，可在简历中核对改动。' : '已添加到经历库。');
}
function reopenRecordDraft(draft,text=''){editRecord(draft.id);for(const key of ['name','type','date','role'])$('[data-r-'+key+']').value=draft[key]||'';$('[data-r-text]').value=[draft.text,text].filter(Boolean).join('\n')}
function deleteRecord(id){flow.records=flow.records.filter(c=>c.id!==id);added=added.filter(c=>c.id!==id);for(const d of [state.base,state.jd].filter(Boolean))d.selected=d.selected.filter(x=>x!==id);if(flow.pending===id)flow.pending=null;closeModal();render(false);save()}
function fileModal(id){const f=flow.files.find(x=>x.id===id);if(!f)return;const raw=fileObjects.get(id);let media='';if (raw && f.kind === 'image' && !filePictureUrls.has(id)) filePictureUrls.set(id, URL.createObjectURL(raw));
if (raw && f.kind === 'image') media = `<img class="ff-file-picture" src="${filePictureUrls.get(id)}" alt="${esc(f.name)}">`;
  const audio = audioObjects.get(id);
  if (audio) media += `<audio class="ff-audio" controls src="${audio.url}"></audio>`;
  openModal('原始材料', `<div class="cc-file-row">${icon(f.kind === 'audio' ? 'mic' : 'file-text')}
    <div data-material-open="${id}"><strong>${esc(f.name)}</strong><span class="cc-small" data-material-status="${id}">${esc(f.status)}</span></div></div>
    ${f.method ? `<p class="cc-fold-note">${esc(f.method)}</p>` : ''}
    ${f.notes?.length ? `<p class="cc-fold-note">${esc(f.notes.join(' '))}</p>` : ''}
    ${media}${f.text ? `<div class="cc-source-text">${esc(f.text)}</div>`
      : f.needsText && !f.reading ? '<p class="cc-message">此文件暂未读取到文字。你可以补充文字或语音。</p>' : ''}
    <div class="cc-dialog-actions">${!f.reading && (f.needsText || f.notes?.length) ? `<button type="button" class="cc-button" data-voice data-voice-file="${id}">${icon('mic')}语音补充</button>
      <button type="button" class="cc-button" data-file-text="${id}">文字补充</button>` : ''}
      ${f.text ? '<button type="button" class="cc-button cc-main" data-stage="review">查看整理结果</button>' : '<button type="button" class="cc-button cc-main" data-close>完成</button>'}</div>`, 'file');
}
function fileTextModal(id){const f=flow.files.find(x=>x.id===id);openModal('补充资料内容',`<p class="cc-small">${esc(f.name)}</p><label class="cc-field"><span>文字内容</span><textarea class="cc-input" rows="7" data-file-copy placeholder="粘贴或输入相关经历"></textarea></label><div class="cc-dialog-actions"><button type="button" class="cc-button" data-close>取消</button><button type="button" class="cc-button cc-main" data-file-text-save="${id}">保存</button></div>`,'file-text')}
async function docxText(file){const bytes=new Uint8Array(await file.arrayBuffer()),v=new DataView(bytes.buffer);let end=bytes.length-22;for(;end>=Math.max(0,bytes.length-65557);end--)if(v.getUint32(end,true)===0x06054b50)break;if(end<0)throw Error('文档无法读取');let pos=v.getUint32(end+16,true),count=v.getUint16(end+10,true);for(let i=0;i<count;i++){if(v.getUint32(pos,true)!==0x02014b50)break;const method=v.getUint16(pos+10,true),size=v.getUint32(pos+20,true),unpacked=v.getUint32(pos+24,true),nl=v.getUint16(pos+28,true),el=v.getUint16(pos+30,true),cl=v.getUint16(pos+32,true),off=v.getUint32(pos+42,true);const name=new TextDecoder().decode(bytes.slice(pos+46,pos+46+nl));if(name==='word/document.xml'){if(unpacked>3_000_000)throw Error('文档过大');const start=off+30+v.getUint16(off+26,true)+v.getUint16(off+28,true),chunk=bytes.slice(start,start+size);let xml;if(method===0)xml=new TextDecoder().decode(chunk);else if(method===8)xml=await new Response(new Blob([chunk]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();else throw Error('压缩格式不支持');const dom=new DOMParser().parseFromString(xml,'application/xml');return [...dom.getElementsByTagNameNS('*','p')].map(p=>[...p.getElementsByTagNameNS('*','t')].map(t=>t.textContent).join('')).filter(Boolean).join('\n')}pos+=46+nl+el+cl}throw Error('未找到文档正文')}
function importText(text, file, { materialHasLayout = false, supplement = false } = {}) {
  const original = text.trim();
  if (!original || !file) return false;
  const { profile, records } = organizer.organize(original, file.name, { materialHasLayout });
  for (const [key, value] of Object.entries(profile)) {
    if (!value) continue;
    if (key === 'education' || key === 'skills') {
      const existing = flow.profile[key].split('\n').filter(line => line.trim());
      const canonical = line => line.trim().normalize('NFKC').replace(/\s+/g, ' ').toLowerCase();
      const seen = new Set(existing.map(canonical));
      const additions = value.split('\n').filter(line => {
        const normalized = canonical(line);
        if (!normalized || seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });
      if (additions.length) {
        flow.profile[key] = [...existing, ...additions].join('\n');
        const contributions = file.profileLines ??= {};
        (contributions[key] ??= []).push(...additions);
      }
    } else if (!flow.profile[key]) {
      flow.profile[key] = value;
      (file.profileContributions ??= {})[key] = value;
    }
  }
  const before = flow.records.filter(record => record.fileId === file.id);
  const sources = new Set(before.map(record => record.sourceText));
  const newRecords = records.filter(record => {
    if (sources.has(record.sourceText)) return false;
    sources.add(record.sourceText);
    return true;
  });
  for (const { points, ...record } of newRecords) {
    flow.records.push(createRecord(points.join('\n'), file.name, { ...record, fileId: file.id }));
  }
  const count = before.length + newRecords.length;
  file.text = supplement && file.text ? file.text + '\n\n' + original : original;
  file.needsText = false;
  const labels = [];
  if (count) labels.push(count + ' 段经历');
  if (Object.keys(file.profileContributions || {}).length || Object.keys(file.profileLines || {}).length) labels.push('个人资料');
  file.status = labels.length ? '已整理 ' + labels.join('及') + ' · 待确认' : '已读取文字 · 请核对';
  return true;
}

async function readMaterial(raw, { signal, onStatus } = {}) {
  const extension = raw.name.split('.').pop().toLowerCase();
  if (materialReader.mediaKind(raw)) return materialReader.read(raw, { signal, onStatus });
  if (extension === 'docx') return { text: await docxText(raw), method: '文档文字', notes: [] };
  if (['txt', 'md'].includes(extension)) return { text: await raw.text(), method: '文档文字', notes: [] };
  throw new Error('请选择 PDF、DOCX、TXT、Markdown 或支持的图片。');
}

function updateReadStatus(file, message) {
  file.status = message;
  for (const label of $$('[data-material-status="' + file.id + '"]')) label.textContent = message;
}

async function acceptFiles(files) {
  if (flowBusy) return toast('上一批材料仍在读取。');
  flowBusy = true;
  const targetFlow = flow;
  try {
    for (const raw of files) {
      if (targetFlow !== flow) break;
      if (raw.size > 20_000_000) {
        toast('单个文件不超过 20 MB。');
        continue;
      }
      const media = materialReader.mediaKind(raw);
      if (!media && !/\.(?:docx|txt|md)$/i.test(raw.name)) {
        toast('请选择 PDF、DOCX、TXT、Markdown 或 PNG、JPG 等常见图片。');
        continue;
      }
      const file = {
        id: uid('file'), name: raw.name, kind: media === 'image' ? 'image' : 'document',
        status: '正在读取…', reading: true, needsText: true
      };
      const controller = new AbortController();
      activeFileReads.set(file.id, controller);
      flow.files.push(file);
      fileObjects.set(file.id, raw);
      render(false);
      const stillPresent = () => targetFlow === flow && flow.files.includes(file);
      let result;
      try {
        result = await readMaterial(raw, {
          signal: controller.signal,
          onStatus: status => { if (stillPresent()) updateReadStatus(file, status); }
        });
        if (!stillPresent() || controller.signal.aborted) continue;
        file.method = result.method;
        file.notes = result.notes;
        if (result.text.length > 50_000) file.notes.push('已载入前 50,000 字。');
        if (!importText(result.text.slice(0, 50_000), file, { materialHasLayout: !!media })) {
          file.status = '未识别到文字 · 可补充或重新上传';
        }
      } catch (error) {
        if (stillPresent() && !controller.signal.aborted) {
          const extracted = result?.text.trim();
          if (extracted) file.text = extracted.slice(0, 50_000);
          const issueLabels = {
            'local-launch': '请先启动本地工作台再上传',
            'reader-unavailable': '识别组件未加载 · 点击查看启动方法',
            'pdf-password': 'PDF 需要密码 · 请上传解锁后的副本',
            'pdf-invalid': '文件不是可打开的 PDF',
            'image-invalid': '图片打不开 · 请转换为 PNG 或 JPG'
          };
          file.status = extracted ? '已读取文字 · 自动整理失败'
            : issueLabels[error.code] || '无法读取正文 · 点击查看原因';
          file.notes = [extracted ? '原文已保留，可查看并手动录入。'
            : media ? error.message : '请检查文件后重新上传，或手动补充文字。'];
        }
      } finally {
        activeFileReads.delete(file.id);
        if (stillPresent()) {
          file.reading = false;
          const showSource = modal === 'file' && !!$('[data-material-open="' + file.id + '"]');
          render(false);
          if (showSource) fileModal(file.id);
          save();
        }
      }
    }
  } finally {
    flowBusy = false;
  }
}
function removeFile(id){
  activeFileReads.get(id)?.abort();
  const removed = flow.files.find(file => file.id === id);
  for (const [key, value] of Object.entries(removed?.profileContributions || {})) {
    if (flow.profile[key] === value) flow.profile[key] = '';
  }
  for (const [key, addedLines] of Object.entries(removed?.profileLines || {})) {
    const additions = new Set(addedLines);
    flow.profile[key] = flow.profile[key].split('\n').filter(line => !additions.has(line)).join('\n');
  }
  if (filePictureUrls.has(id)) URL.revokeObjectURL(filePictureUrls.get(id));
  filePictureUrls.delete(id);
  const f=flow.files.find(x=>x.id===id);const records=all().filter(c=>c.fileId===id||(!c.fileId&&c.source===f?.name)).map(c=>c.id);flow.records=flow.records.filter(c=>!records.includes(c.id));added=added.filter(c=>!records.includes(c.id));for(const d of [state.base,state.jd].filter(Boolean))d.selected=d.selected.filter(x=>!records.includes(x));flow.files=flow.files.filter(x=>x.id!==id);fileObjects.delete(id);const a=audioObjects.get(id);if(a)URL.revokeObjectURL(a.url);audioObjects.delete(id);render(false);save()}
function voiceModal(target=null,draft=null,fileId=null){closeModal(false);voice={fileId,id:uid('voice'),status:'idle',text:'',url:null,audio:null,start:0,target,draft};openModal('语音补充',`<div class="ff-voice-center"><div class="ff-voice-timer">00:00</div><div class="ff-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><button type="button" class="ff-rec-button" data-record aria-label="开始录音">${icon('mic')}</button><span class="ff-voice-status" role="status">点击开始录音</span></div><audio class="ff-audio" controls hidden></audio><label class="cc-field"><span>转写内容</span><textarea class="cc-input" data-transcript rows="4" placeholder="录音后核对文字，也可直接填写"></textarea></label><label class="cc-voice-opt"><input type="checkbox" data-auto-transcribe> 使用浏览器语音转写（可能联网）</label><div class="cc-dialog-actions"><button type="button" class="cc-button" data-voice-retry hidden>重新录制</button><button type="button" class="cc-button" data-close>取消</button><button type="button" class="cc-button cc-main" data-voice-save disabled>确认并保存</button></div>`,'voice')}
function control(action, extra = {}) {
  if (action === 'voice-start') device.record(voice.id, $('[data-auto-transcribe]').checked);
  if (action === 'voice-stop') device.stop(voice.id);
  if (action === 'voice-cancel') device.stop(voice.id, true);
  if (action === 'download-pdf') {
    device.download(new Blob([extra.bytes], { type: 'application/pdf' }), extra.name);
    toast('PDF 已开始下载');
  }
}
function startVoice(){if(!voice)return;voice.status='requesting';$('[data-record]').disabled=true;$('.ff-voice-status').textContent='等待麦克风授权…';control('voice-start')}
function stopVoice(){if(!voice)return;voice.status='processing';clearInterval(voiceTimer);$('[data-record]').disabled=true;$('.ff-wave').classList.remove('active');$('.ff-voice-status').textContent='正在保存录音…';control('voice-stop')}
function disposeVoice(){if(!voice)return;clearInterval(voiceTimer);if(['requesting','recording','processing'].includes(voice.status))control('voice-cancel');if(voice.url&&!voice.saved)URL.revokeObjectURL(voice.url);voice=null}
window.addEventListener('careercraft-device', e => { const msg = e.detail;if(!voice||msg.id!==voice.id||modal!=='voice')return;const status=$('.ff-voice-status'),record=$('[data-record]');if(msg.event==='recording'){voice.status='recording';voice.start=Date.now();record.disabled=false;record.classList.add('is-recording');record.setAttribute('aria-label','停止录音');record.innerHTML=icon('square');$('.ff-wave').classList.add('active');status.textContent='正在录音';voiceTimer=setInterval(()=>{if(!voice)return;const sec=Math.floor((Date.now()-voice.start)/1000);$('.ff-voice-timer').textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');if(sec>=300)stopVoice()},250);icons()}else if(msg.event==='transcript'){voice.text=msg.text+(msg.interim||'');if(document.activeElement!==$('[data-transcript]'))$('[data-transcript]').value=voice.text}else if(msg.event==='finished'){clearInterval(voiceTimer);voice.status='done';voice.audio=msg.audio;voice.url=URL.createObjectURL(msg.audio);$('.ff-audio').src=voice.url;$('.ff-audio').hidden=false;record.hidden=true;$('.ff-wave').classList.remove('active');status.textContent=$('[data-transcript]').value.trim()?'录音完成，确认一下文字':'录音完成，可试听并补充文字';$('[data-voice-retry]').hidden=false;$('[data-voice-save]').disabled=!$('[data-transcript]').value.trim()}else if(msg.event==='transcription-unavailable'){status.textContent='正在录音 · 转写暂不可用，结束后可填写'}else if(msg.event==='error'){clearInterval(voiceTimer);voice.status='error';record.disabled=false;record.classList.remove('is-recording');record.innerHTML=icon('mic');record.setAttribute('aria-label','重新开始录音');$('.ff-wave').classList.remove('active');status.textContent=msg.message;$('[data-voice-save]').disabled=!$('[data-transcript]').value.trim();icons()}});
function saveVoice() {
  const text = $('[data-transcript]').value.trim();
  if (!voice || !text || ['recording', 'requesting', 'processing'].includes(voice.status)) return;
  const session = voice;
  const name = '语音记录 ' + new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  const file = session.fileId && flow.files.find(file => file.id === session.fileId);
  const audioId = session.audio ? file?.id || uid('audio') : null;
  if (audioId) {
    const oldAudio = audioObjects.get(audioId);
    if (oldAudio) URL.revokeObjectURL(oldAudio.url);
    audioObjects.set(audioId, { url: session.url, audio: session.audio });
    session.saved = true;
  }
  closeModal(false);
  if (file) {
    importText(text, file, { supplement: true });
    render(false);
    save();
    return;
  }
  if (audioId) flow.files.push({ id: audioId, name, kind: 'audio', status: '已确认文字', text });
  if (session.draft) {
    reopenRecordDraft(session.draft, text);
    save();
    return;
  }
  const record = submitStory(text, true, session.target);
  if (record && audioId && record.source === '语音补充' && !record.fileId) {
    Object.assign(record, { fileId: audioId, source: name });
    save();
  }
  toast('已保存到经历');
}
function pdfFromCanvas(canvas){const jpg=atob(canvas.toDataURL('image/jpeg',.95).split(',')[1]),imageBytes=Uint8Array.from(jpg,c=>c.charCodeAt(0)),enc=new TextEncoder();const chunks=[],offsets=[0];let length=0;const append=v=>{const b=typeof v==='string'?enc.encode(v):v;chunks.push(b);length+=b.length};const obj=(id,body)=>{offsets[id]=length;append(id+' 0 obj\n'+body+'\nendobj\n')};append('%PDF-1.4\n');obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');offsets[4]=length;append('4 0 obj\n<< /Type /XObject /Subtype /Image /Width '+canvas.width+' /Height '+canvas.height+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+imageBytes.length+' >>\nstream\n');append(imageBytes);append('\nendstream\nendobj\n');const content='q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ';obj(5,'<< /Length '+enc.encode(content).length+' >>\nstream\n'+content+'\nendstream');const start=length;append('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)append(String(offsets[i]).padStart(10,'0')+' 00000 n \n');append('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+start+'\n%%EOF');const out=new Uint8Array(length);let pos=0;for(const c of chunks){out.set(c,pos);pos+=c.length}return out.buffer}
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if (b.hasAttribute('data-model-settings')) {
   openModelSettings();
   return;
 }
 if (b.hasAttribute('data-draft-reset')) {
   openModal('清空本地草稿', `<p class="cc-message">当前浏览器保存的资料、简历和求职信会一并删除。</p>
     <div class="cc-dialog-actions"><button type="button" class="cc-button" data-close>取消</button>
       <button type="button" class="cc-button cc-main" data-draft-reset-confirm>确认清空</button></div>`, 'reset');
   return;
 }
 if (b.hasAttribute('data-draft-reset-confirm')) { resetDraft(); return; }
 if (b.hasAttribute('data-model-toggle')) {
   assistant.enable($('[data-model-consent]').checked);
   closeModal();
   render(false);
   return;
 }
 if (b.hasAttribute('data-stage')) { setStage(b.dataset.stage); return; }
 if(b.hasAttribute('data-sample')){useSample();return}
 if(b.hasAttribute('data-upload')){$('[data-files]').click();return}
 if(b.hasAttribute('data-file')){fileModal(b.dataset.file);return}
 if(b.hasAttribute('data-file-remove')){removeFile(b.dataset.fileRemove);return}
 if(b.hasAttribute('data-file-text')){fileTextModal(b.dataset.fileText);return}
 if(b.hasAttribute('data-file-text-save')){const t=$('[data-file-copy]').value.trim();if(!t)return;importText(t, flow.files.find(f => f.id === b.dataset.fileTextSave), { supplement: true });closeModal();render(false);save();return}
 if(b.hasAttribute('data-chat-send')){submitStory($('[data-chat]').value);return}
 if(b.hasAttribute('data-skip-followup')||b.hasAttribute('data-new-story')){skipFollowup();return}
 if(b.hasAttribute('data-organize')){setStage('review');return}
 if(b.hasAttribute('data-review-next')){reviewNext();return}
 if(b.hasAttribute('data-skip-gaps')){setStage('direction');return}
 if(b.hasAttribute('data-record-new')){editRecord();return}
 if(b.hasAttribute('data-record-edit')){editRecord(b.dataset.recordEdit);return}
 if(b.hasAttribute('data-record-save')){saveRecord(b.dataset.recordSave);return}
 if(b.hasAttribute('data-record-delete')){deleteRecord(b.dataset.recordDelete);return}
 if(b.hasAttribute('data-direction')){flow.targetRole=b.dataset.direction;render(false);save();return}
 if (b.hasAttribute('data-generate-base')) { generateVersion('base', b); return; }
 if(b.hasAttribute('data-voice')){const target=b.dataset.voiceTarget||null;const draft=modal==='record'?{id:target,name:$('[data-r-name]').value,type:$('[data-r-type]').value,date:$('[data-r-date]').value,role:$('[data-r-role]').value,text:$('[data-r-text]').value}:null;voiceModal(target,draft,b.dataset.voiceFile||null);return}
 if(b.hasAttribute('data-record')){if(voice.status==='recording')stopVoice();else startVoice();return}
 if(b.hasAttribute('data-voice-retry')){const {target,draft,fileId}=voice;disposeVoice();voiceModal(target,draft,fileId);return}
 if(b.hasAttribute('data-voice-save')){saveVoice();return}
 if(b.hasAttribute('data-download-pdf')&&exportBytes){control('download-pdf',{bytes:exportBytes,name:(flow.profile.name||'我的简历')+'-'+state.role+(state.mode==='jd'?'-定制版':'-通用版')+'.pdf'});return}
});
root.addEventListener('input',e=>{const t=e.target;if(t.hasAttribute('data-chat')){flow.chatDraft=t.value;save()}if(t.dataset.profile){flow.profile[t.dataset.profile]=t.value;const next=$('[data-review-next]');if(next)next.disabled=!canBuildResume();save()}if(t.hasAttribute('data-emphasis')){flow.emphasis=t.value;save()}if(t.hasAttribute('data-transcript')&&voice)$('[data-voice-save]').disabled=!t.value.trim()||['recording','processing','requesting'].includes(voice.status)});
root.addEventListener('change',e=>{if(e.target.hasAttribute('data-files'))acceptFiles([...e.target.files])});
root.addEventListener('keydown',e=>{if(e.target.hasAttribute('data-chat')&&e.key==='Enter'&&(e.metaKey||e.ctrlKey)){e.preventDefault();submitStory(e.target.value)}});
root.addEventListener('dragover',e=>{const d=e.target.closest('[data-drop]');if(d){e.preventDefault();d.classList.add('is-dragging')}});
root.addEventListener('dragleave',e=>{e.target.closest('[data-drop]')?.classList.remove('is-dragging')});
root.addEventListener('drop',e=>{const d=e.target.closest('[data-drop]');if(d){e.preventDefault();d.classList.remove('is-dragging');acceptFiles([...e.dataTransfer.files])}});

let added=[];const all=()=>[...flow.records,...added];const item=id=>all().find(c=>c.id===id);
const makeDoc = () => ({
  role: '产品经理', selected: [], bullets: {}, edits: {}, compact: {},
  font: 11, photo: false, regions: false
});
let state={v:5,mode:'base',role:'产品经理',base:makeDoc(),jd:null,jdText:'',jdTitle:'',context:'',open:'intern',mobile:'content'};
let history=[],ghost=null,focusId=null,scale=1,modal=null,toastTimer,focusBefore=null,anims=new Map();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const draftKey = 'careercraft:draft-v1';
const legacyDraftKey = 'careercraft:fictional-demo-v1:' + JSON.stringify([location.pathname, location.search]);
let draftSaved = true;
try {
  const saved = JSON.parse(localStorage.getItem(draftKey) || localStorage.getItem(legacyDraftKey) || 'null');
  const draft = saved?.privateContent || saved;
  if (draft?.state?.v === 5 && draft.flow) {
    state = draft.state;
    added = draft.added || [];
    flow = unpackFlow(draft.flow);
    for (const file of flow.files) {
      if (!file.reading) continue;
      file.reading = false;
      file.needsText = true;
      file.status = '识别中断 · 请重新上传或补充文字';
    }
  }
} catch { draftSaved = false; }
const doc = () => state.mode === 'jd' && state.jd ? state.jd : state.base;
function save() {
  try {
    localStorage.setItem(draftKey, JSON.stringify({ state, added, flow: packedFlow() }));
    draftSaved = true;
  } catch {
    if (draftSaved) toast('浏览器未能保存草稿，请在关闭页面前下载材料。');
    draftSaved = false;
  }
  return draftSaved;
}
function resetDraft() {
  for (const read of activeFileReads.values()) read.abort();
  closeModal(false);
  try {
    localStorage.removeItem(draftKey);
    localStorage.removeItem(legacyDraftKey);
  } catch {}
  for (const { url } of audioObjects.values()) URL.revokeObjectURL(url);
  for (const url of filePictureUrls.values()) URL.revokeObjectURL(url);
  for (const collection of [audioObjects, filePictureUrls, fileObjects]) collection.clear();
  flow = resetFields();
  state = { v: 5, mode: 'base', role: '产品经理', base: makeDoc(), jd: null,
    jdText: '', jdTitle: '', context: '', open: null, mobile: 'content' };
  added = [];
  history = [];
  ghost = focusId = exportBytes = null;
  render(false);
  if (save()) toast('已清空本地草稿');
}
function checkpoint(){history.push(clone({state,added}));if(history.length>24)history.shift();}
function undo(){if(!history.length)return;({state,added}=history.pop());ghost=null;closeModal(false);render();save();toast('已撤销');}
function rankedRecords({ role = state.role, jd = '', emphasis = '', plan = null } = {}) {
  const priorities = new Map((plan?.order || []).map((id, index) => [id, plan.order.length - index]));
  const relevanceFor = assistant.relevanceFor(role, jd, emphasis);
  return all().map(record => {
    const points = record.points.map(point => ({
      ...point,
      priority: priorities.get(point.id) || 0,
      relevance: relevanceFor(point.text)
    })).sort((a, b) => b.priority - a.priority || b.relevance - a.relevance);
    const metadata = [record.name, record.role, ...(record.tags || [])].join(' ');
    const relevance = relevanceFor(metadata) +
      (points[0]?.relevance || 0);
    return { ...record, points, score: relevance, priority: Math.max(0, ...points.map(p => p.priority)) };
  }).filter(record => record.points.length)
    .sort((a, b) => b.priority - a.priority || b.score - a.score);
}
function ranks() {
  const current = doc();
  const required = new Set([...current.selected, focusId, state.open].filter(Boolean));
  const sorted = rankedRecords({
    role: current.role,
    jd: state.mode === 'jd' ? state.jdText : '',
    emphasis: current.emphasis || (state.mode === 'jd' ? state.context : flow.emphasis),
    plan: current.plan
  });
  return sorted.sort((a, b) =>
    Number(current.selected.includes(b.id)) - Number(current.selected.includes(a.id)) ||
    Number(required.has(b.id)) - Number(required.has(a.id)) || b.priority - a.priority || b.score - a.score)
    .filter(record => required.has(record.id) || record.priority || record.score > 0 ||
      (!current.selected.length && record === sorted[0]))
    .slice(0, 10);
}
function openModelSettings() {
  openModal('生成设置', modelService
    ? `<p class="cc-message">启用后，生成通用简历或 JD 定制版时，已确认的经历名称和要点、岗位描述及你的侧重点将发送至 <strong>${esc(modelService.destination)}</strong>，由 ${esc(modelService.name)} 筛选。个人资料栏、原始附件和录音保留在本机。</p>
       <label class="cc-voice-opt"><input type="checkbox" data-model-consent ${assistant.enabled() ? 'checked' : ''}> 同意发送上述资料并启用模型</label>
       <div class="cc-dialog-actions"><button type="button" class="cc-button" data-draft-reset>清空本地草稿</button><button type="button" class="cc-button cc-main" data-model-toggle>保存设置</button></div>`
    : `<p class="cc-message">当前使用本地规则整理和筛选经历。配置模型服务后，可在此启用模型筛选和 JD 分析。</p>
       <div class="cc-dialog-actions"><button type="button" class="cc-button" data-draft-reset>清空本地草稿</button><button type="button" class="cc-button cc-main" data-close>完成</button></div>`, 'model-settings');
}
function descriptivePointLabel(point) {
  const label = (point.label || '').trim();
  return /^(?:要点\s*[\d０-９一二三四五六七八九十]+|补充)$/.test(label) ? '' : label;
}
function pointText(c,p,d=doc()){return d.edits[p.id]!==undefined?d.edits[p.id]:(d.compact[p.id]?p.short:p.text)}
function bullets(c,d=doc()){return c.points.filter(p=>(d.bullets[c.id]||[]).includes(p.id))}
const sectionOrder=['实习经历','个人项目','学术经历','比赛经历'];
function resumeHTML(d,ghostId=null){let selected=d.selected.map(item).filter(Boolean);let sections=sectionOrder.map(sec=>{let cards=selected.filter(c=>c.section===sec);if(!cards.length)return'';return `<section class="cc-section cc-region" data-layout="${sec}"><h2 class="cc-section-title">${sec}</h2>${cards.map(c=>{let pts=bullets(c,d);let prev='';return `<div class="cc-entry${ghostId===c.id?' is-ghost':''}${focusId===c.id?' is-highlighted':''}" data-entry="${c.id}" data-layout="${c.id}"><div class="cc-entry-head"><span>${esc(c.name)}${c.role && c.role !== c.section ? ' · ' + esc(c.role) : ''}</span><span class="cc-date">${esc(c.date)}</span></div>${pts.map(p=>{let h='';if(p.group&&p.group!==prev){h=`<div class="cc-subproject">${esc(p.group)}</div>`;prev=p.group}return `${h}<ul><li><button type="button" data-edit="${c.id}:${p.id}" title="编辑经历描述">${esc(pointText(c,p,d))}</button></li></ul>`}).join('')}</div>`}).join('')}</section>`}).join('');return `<div class="cc-resume"><header class="cc-person cc-region" data-layout="person"><h1>${esc(flow.profile.name||'姓名')}</h1><p class="cc-contact">${esc([flow.profile.phone,flow.profile.email].filter(Boolean).join('　|　'))}</p>${d.photo?'<div class="cc-photo">照片</div>':''}</header>${profileSections()}${sections}${skillSection()}</div><div class="cc-bottom-limit"><span>一页边界</span></div><div class="cc-paper-footer">1</div>`}
function measure(d){const m=$('.cc-measure');m.innerHTML=`<div class="cc-paper" style="position:relative;transform:none;font-size:${d.font*4/3}px">${resumeHTML(d)}</div>`;const a=m.querySelector('.cc-resume');let h=a.getBoundingClientRect().height;return{height:h,limit:1037,over:Math.max(0,h-1037),ratio:h/1037};}
function spring(el,from,key){if(reduced||Math.abs(from)<.8)return;const prev=anims.get(key);if(prev)cancelAnimationFrame(prev.frame);let x=from,v=prev?.v||0,last=performance.now();const rec={v,frame:0};anims.set(key,rec);el.style.transform=`translateY(${x}px)`;function tick(now){let dt=Math.min((now-last)/1000,.025);last=now;const omega=24;v+=(-omega*omega*x-2*omega*v)*dt;x+=v*dt;rec.v=v;el.style.transform=`translateY(${x}px)`;if(Math.abs(x)<.08&&Math.abs(v)<.5){el.style.transform='';anims.delete(key)}else rec.frame=requestAnimationFrame(tick)}rec.frame=requestAnimationFrame(tick)}
function drawPaper(animate=true){const paper=$('.cc-paper-wrap .cc-paper');const old=new Map([...paper.querySelectorAll('[data-layout]')].map(e=>[e.dataset.layout,e.getBoundingClientRect().top]));let d=doc();let display=d;if(ghost&&item(ghost)&&!d.selected.includes(ghost)){display=clone(d);display.selected.push(ghost);display.bullets[ghost]=display.bullets[ghost]?.length?display.bullets[ghost]:item(ghost).points.map(p=>p.id)}paper.style.fontSize=`${d.font*4/3}px`;paper.innerHTML=resumeHTML(display,ghost);paper.classList.toggle('show-regions',d.regions);const m=measure(display);paper.classList.toggle('is-over',m.over>1);paper.setAttribute('aria-label',`一页简历预览，${m.over>1?'内容超出一页':'内容在一页内'}`);resizePaper();if(animate&&!ghost)paper.querySelectorAll('[data-layout]').forEach(e=>{if(old.has(e.dataset.layout))spring(e,(old.get(e.dataset.layout)-e.getBoundingClientRect().top)/scale,e.dataset.layout)});$('.cc-cap-fill').style.width=`${Math.min(100,m.ratio*100)}%`;$('.cc-status').textContent=m.over>1?`超出 ${Math.ceil(m.over/(d.font*4/3*1.55))} 行`:`已用 ${Math.round(m.ratio*100)}%`;const actual=measure(d);$('.cc-notice').hidden=actual.over<1;$('.cc-notice span').textContent=`超出 ${Math.ceil(actual.over/(d.font*4/3*1.55))} 行`;$('.cc-export-label').textContent=actual.over>1?'调整至一页':'导出 PDF';}
function resizePaper(){let w=$('.cc-paper-wrap').clientWidth;if(w>0){scale=w/794;$('.cc-paper-wrap .cc-paper').style.transform=`scale(${scale})`;$('.cc-paper-wrap').style.height=`${1123*scale}px`;drawMobileMap();}}
function drawMobileMap(){const paper=$('.cc-paper-wrap .cc-paper'),pr=paper.getBoundingClientRect();const labels={person:'个人信息',education:'教育背景',skills:'专业技能'};$('.cc-mobile-map').innerHTML=[...paper.querySelectorAll('.cc-region')].map(el=>{const r=el.getBoundingClientRect(),key=el.dataset.layout,label=labels[key]||key,names=[...el.querySelectorAll('.cc-entry-head>span:first-child')].map(x=>x.textContent);return `<button type="button" class="cc-map-region" data-read-region="${esc(key)}" style="left:${r.left-pr.left-3}px;top:${r.top-pr.top-2}px;width:${r.width+6}px;height:${r.height+4}px"><strong>${esc(label)}</strong>${r.height>55?names.map(n=>`<span>${esc(n)}</span>`).join(''):''}</button>`}).join('')}
function readRegion(key){const label={person:'个人信息',education:'教育背景',skills:'专业技能'}[key]||key;const el=[...$('.cc-paper-wrap .cc-paper').querySelectorAll('[data-layout]')].find(e=>e.dataset.layout===key);if(!el)return;const cards=doc().selected.map(item).filter(c=>c.section===key);openModal(label,cards.length?cards.map(c=>`<h3>${esc(c.name)}</h3>${bullets(c).map(p=>`<button type="button" class="cc-read-point" data-edit="${c.id}:${p.id}">${esc(pointText(c,p))}</button>`).join('')}`).join(''):`<div class="cc-source-text">${esc(el.innerText)}</div>`,'reading')}
function cardHTML(c){const d=doc(),selected=d.selected.includes(c.id),opened=state.open===c.id;let last='';return `<section class="cc-exp${opened?' is-open':''}" data-card="${c.id}"><div class="cc-exp-head"><input class="cc-check" type="checkbox" ${selected?'checked':''} data-select="${c.id}" aria-label="${selected?'移出':'加入'}${esc(c.name)}"><button type="button" class="cc-exp-toggle" data-expand="${c.id}" aria-expanded="${opened}"><span><span class="cc-exp-name">${esc(c.name)}</span><span class="cc-exp-meta">${esc(c.role)}${selected?' · '+bullets(c).length+' 个要点':''}</span></span><span class="cc-chevron" aria-hidden="true">›</span></button></div>${opened?`<div class="cc-exp-detail"><p class="cc-reason">${esc(c.reason)}</p>${c.points.map(p=>{let h='';if(p.group&&p.group!==last){h=`<div class="cc-bullet-group">${esc(p.group)}</div>`;last=p.group}return h+`<div class="cc-point-row"><label class="cc-point"><input type="checkbox" class="cc-check" data-point="${c.id}:${p.id}" ${selected&&(d.bullets[c.id]||[]).includes(p.id)?'checked':''}><span>${descriptivePointLabel(p) ? `<strong>${esc(descriptivePointLabel(p))}</strong>` : ''}<span class="cc-point-copy">${esc(pointText(c,p))}</span></span></label><button type="button" class="cc-point-edit" data-edit="${c.id}:${p.id}" aria-label="编辑：${esc(descriptivePointLabel(p) || pointText(c,p))}" title="编辑经历描述">${icon('pencil')}</button></div>`}).join('')}<div class="cc-card-foot"><button type="button" class="cc-link" data-source="${c.id}">查看来源</button><button type="button" class="cc-link" data-edit-card="${c.id}">编辑</button></div></div>`:''}</section>`}
function drawCards(){let list=ranks();let selected=list.filter(c=>doc().selected.includes(c.id)),other=list.filter(c=>!doc().selected.includes(c.id));$('.cc-count').textContent=`${list.length} / 10`;$ ('.cc-card-list').innerHTML=`${selected.length?`<div class="cc-group-title"><span>已选</span><span>${selected.length}</span></div>${selected.map(cardHTML).join('')}`:''}${other.length?`<div class="cc-group-title"><span>备选</span><span>${other.length}</span></div>${other.map(cardHTML).join('')}`:''}`;icons();}
function icons(){try{globalThis.lucide?.createIcons({attrs:{width:16,height:16}})}catch(e){}}
function render(animate=true){renderFlow();root.dataset.mobile=state.mobile;$('.cc-role').value=state.role;$('.cc-version').textContent=state.mode==='jd'?(state.jdTitle||'定制版'):'通用版';$$('[data-mode]').forEach(b=>b.setAttribute('aria-selected',b.dataset.mode===state.mode));$$('button[data-mobile]').forEach(b=>b.setAttribute('aria-selected',b.dataset.mobile===state.mobile));$('.cc-jd-edit').hidden=state.mode!=='jd';$('.cc-regions').setAttribute('aria-pressed',doc().regions);$('.cc-undo').disabled=!history.length;drawCards();drawPaper(animate);icons();}
function commit(next){checkpoint();if(state.mode==='jd')state.jd=next;else state.base=next;ghost=null;render();save();}
function candidate(id,point){const d=clone(doc());if(!d.selected.includes(id))d.selected.push(id);if(point){d.bullets[id]=[...new Set([...(d.bullets[id]||[]),point])]}else d.bullets[id]=d.bullets[id]?.length?d.bullets[id]:item(id).points.map(p=>p.id);return d;}
function selectCard(id){const d=clone(doc());if(d.selected.includes(id)){d.selected=d.selected.filter(x=>x!==id);commit(d)}else{const next=candidate(id);if(measure(next).over>1)overflowModal(next,id);else commit(next)}}
function selectPoint(id,pid){const d=clone(doc());if(d.selected.includes(id)&&(d.bullets[id]||[]).includes(pid)){d.bullets[id]=d.bullets[id].filter(p=>p!==pid);if(!d.bullets[id].length)d.selected=d.selected.filter(x=>x!==id);commit(d)}else{const next=candidate(id,pid);if(measure(next).over>1)overflowModal(next,id);else commit(next)}}
function toast(t){clearTimeout(toastTimer);$('.cc-toast').textContent=t;$('.cc-toast').hidden=false;toastTimer=setTimeout(()=>$('.cc-toast').hidden=true,2000);}
function openModal(title,body,kind){ghost=null;drawPaper(false);focusBefore=document.activeElement;modal=kind;$('.cc-app').inert=true;$('.ff-screen').inert=true;$('.ff-header').inert=true;$('.cc-overlay-host').innerHTML=`<div class="cc-scrim"><section role="dialog" aria-modal="true" aria-label="${esc(title)}" class="cc-dialog"><div class="cc-dialog-head"><h2>${esc(title)}</h2><button type="button" class="cc-button cc-square" data-close aria-label="关闭">${icon('x')}</button></div>${body}</section></div>`;icons();const el=$('.cc-dialog');if(!reduced)el.animate([{opacity:0,transform:'translateY(12px) scale(.98)'},{opacity:1,transform:'none'}],{duration:180,easing:'cubic-bezier(.2,.8,.2,1)'});requestAnimationFrame(()=>{const first=el.querySelector('textarea,input,select,button');first?.focus({preventScroll:true});el.scrollIntoView({block:'nearest',behavior:'instant'})});}
function closeModal(restoreFocus=true){if(modal==='jd'){jdFileRead?.abort();jdFileRead=null;}const recordDraft=modal==='voice'?voice?.draft:null;if(modal==='voice')disposeVoice();modal=null;$('.cc-overlay-host').innerHTML='';$('.cc-app').inert=false;$('.ff-screen').inert=false;$('.ff-header').inert=false;if(restoreFocus&&recordDraft){reopenRecordDraft(recordDraft);return}if(restoreFocus&&focusBefore?.isConnected)focusBefore.focus({preventScroll:true});}
function overflowModal(next,id){ghost=null;const simple=clone(next);bullets(item(id),simple).forEach(p=>{if(simple.edits[p.id]===undefined)simple.compact[p.id]=true});let fit=measure(simple).over<=1;let alternatives=doc().selected.filter(x=>x!==id).sort((a,b)=>(ranks().find(c=>c.id===a)?.score||0)-(ranks().find(c=>c.id===b)?.score||0)).map(x=>{let n=clone(next);n.selected=n.selected.filter(z=>z!==x);return{id:x,fit:measure(n).over<=1}});let defaultReplace=alternatives.find(x=>x.fit)?.id||alternatives[0]?.id||'';let over=measure(next).over;openModal('一页放不下',`<p class="cc-message">加入「${esc(item(id).name)}」后，超出 ${Math.ceil(over/(doc().font*4/3*1.55))} 行。</p><div class="cc-row"><span>精简新增内容</span><button type="button" class="cc-button" data-fit-add ${fit?'':'disabled'}>精简后加入</button></div>${alternatives.length?`<label class="cc-field"><span>替换已选经历</span><select class="cc-input" data-replace-target>${alternatives.map(x=>`<option value="${x.id}" ${x.id===defaultReplace?'selected':''}>${esc(item(x.id).name)}${x.fit?'':' · 仍会超页'}</option>`).join('')}</select></label>`:''}<div class="cc-dialog-actions"><button type="button" class="cc-button" data-close>取消</button><button type="button" class="cc-button cc-main" data-replace-add ${alternatives.find(x=>x.id===defaultReplace)?.fit?'':'disabled'}>替换并加入</button></div>`,'overflow');modal={kind:'overflow',next,simple,id,alternatives};}
function layoutModal(){openModal('排版',`<div class="cc-row"><span>正文字号</span><div class="cc-stepper"><button type="button" data-font="-.5" aria-label="缩小字号">−</button><output class="cc-font-value">${doc().font} pt</output><button type="button" data-font=".5" aria-label="增大字号">+</button></div></div><label class="cc-row"><span>照片</span><input class="cc-native-switch" type="checkbox" data-photo ${doc().photo?'checked':''}></label><label class="cc-row"><span>区域边界</span><input class="cc-native-switch" type="checkbox" data-bounds ${doc().regions?'checked':''}></label><div class="cc-dialog-actions"><button type="button" class="cc-button cc-main" data-close>完成</button></div>`,'layout');}
function editModal(id, pid) {
  const record = item(id);
  const point = record?.points.find(p => p.id === pid) || record?.points[0];
  if (!point) return;
  const current = pointText(record, point);
  openModal('编辑简历要点', `<p class="cc-small">${esc(record.name)}</p>
    <label class="cc-field"><span>简历文案</span><textarea class="cc-input" data-edit-text rows="6">${esc(current)}</textarea></label>
    <details><summary>查看资料库原文</summary><blockquote class="cc-source-text">${esc(point.text)}</blockquote></details>
    <div class="cc-dialog-actions">
      <button type="button" class="cc-button cc-quiet" data-compact-point ${point.short === current ? 'disabled' : ''}>使用精简文案</button>
      <button type="button" class="cc-button" data-close>取消</button>
      <button type="button" class="cc-button cc-main" data-save-point>保存</button>
    </div>`, 'edit');
  modal = { kind: 'edit', id, pid: point.id };
}
const jdExample='售后服务产品经理实习生\n\n参与维修预约与客服知识库的需求分析、交互设计和试用验证；通过用户研究与 SQL 数据核对改善服务流程。\n\n希望具备多轮对话或 Agent 原型经验，理解 RAG 与设备资料检索，能够设计异常情境并检查答案依据。\n\n有 A/B 测试经验优先。';
function jdModal(){openModal('目标岗位',`<label class="cc-field"><span>岗位名称</span><input class="cc-input" data-jd-title value="${esc(state.jdTitle)}" placeholder="例如：AI 产品经理实习生"></label><label class="cc-field"><span>职位描述</span><textarea class="cc-input" rows="7" data-jd-text placeholder="粘贴 JD">${esc(state.jdText)}</textarea></label><div class="cc-actions"><button type="button" class="cc-button" data-jd-upload>${icon('paperclip')}上传 JD</button><span class="cc-small" data-jd-filename></span><input class="ff-file-input" type="file" data-jd-file accept="${materialExtensions}"></div><label class="cc-field"><span>这次想突出什么</span><input class="cc-input" data-jd-context value="${esc(state.context)}" placeholder="选填"></label><div class="cc-dialog-actions"><button type="button" class="cc-button cc-quiet" data-jd-example>使用示例 JD</button><button type="button" class="cc-button cc-main" data-jd-generate>生成定制版</button></div><span class="cc-error" role="alert"></span>`,'jd');}
function generateDoc({ role, jd, emphasis, plan, previous }) {
  const draft = makeDoc();
  Object.assign(draft, { role, emphasis, plan, font: previous.font, regions: previous.regions });
  const ranked = rankedRecords({ role, jd, emphasis, plan });
  const relevant = ranked.filter(record => record.score || record.priority);
  const pool = relevant.length ? relevant : ranked.slice(0, 1);
  let result = draft;
  for (const record of pool) {
    if (result.selected.length >= 3) break;
    let count = 0;
    const preferred = record.points.filter(point => point.relevance || point.priority);
    const points = preferred.length ? preferred : record.points;
    for (const point of points) {
      if (count >= 3) break;
      const next = clone(result);
      if (!count) next.selected.push(record.id);
      (next.bullets[record.id] ??= []).push(point.id);
      if (samplesById.has(record.id) && jd && point.short !== point.text) next.compact[point.id] = true;
      if (measure(next).over > 1) next.compact[point.id] = true;
      if (measure(next).over > 1) continue;
      count += 1;
      result = next;
    }
  }
  return result;
}

async function generateVersion(mode, button) {
  if (generation) return;
  const jd = mode === 'jd' ? $('[data-jd-text]').value.trim() : '';
  if (mode === 'jd' && !jd) {
    $('.cc-error').textContent = '请输入或上传职位描述。';
    $('[data-jd-text]').focus();
    return;
  }
  const title = mode === 'jd' ? $('[data-jd-title]').value.trim() ||
    jd.match(/^(?:岗位名称|职位名称)\s*[：:]\s*([^\n，。]+)/m)?.[1]?.trim() || '定制版' : '';
  const role = mode === 'base' ? (flow.targetRole || state.role) : state.base.role;
  const emphasis = mode === 'jd' ? $('[data-jd-context]').value.trim() : flow.emphasis;
  const previous = (mode === 'jd' && state.jd) || state.base;
  const token = {};
  generation = token;
  const usedModel = assistant.enabled();
  const startStage = flow.stage;
  const busyLabel = button.textContent;
  let modelFailed = false;
  try {
    let plan = null;
    if (usedModel) {
      button.disabled = true;
      button.textContent = '正在分析…';
      if (mode === 'jd') {
        $$('.cc-dialog input, .cc-dialog textarea, [data-jd-example], [data-jd-upload]')
          .forEach(field => { field.disabled = true; });
      }
      const records = rankedRecords({ role, jd, emphasis });
      const points = records.flatMap(record => record.points.map(point => ({
        id: point.id, experience: record.name.slice(0, 160), text: point.text.slice(0, 650)
      }))).slice(0, 100);
      try {
        plan = await assistant.plan({
          role, emphasis: emphasis.slice(0, 1200), points,
          lines: jd ? assistant.jdLines(jd, title).slice(0, 80)
            .map(line => ({ id: line.id, text: line.title.slice(0, 800) })) : []
        });
      } catch { modelFailed = true; }
      if (!button.isConnected || flow.stage !== startStage) return;
    }
    const next = generateDoc({ role, jd, emphasis, plan, previous });
    checkpoint();
    if (mode === 'jd') {
      const sameJD = state.jdText === jd && state.jdTitle === title;
      if (sameJD && previous.assist) next.assist = clone(previous.assist);
      if (sameJD && previous.manualEvidence) next.manualEvidence = clone(previous.manualEvidence);
      if (!sameJD && state.jd && state.letters) {
        const oldKey = assistKeyForJD(state.jdTitle, state.jdText);
        const newKey = assistKeyForJD(title, jd);
        for (const prefix of ['', 'base:' + state.base.role + ':']) {
          const priorLetter = state.letters[prefix + oldKey];
          if (priorLetter?.text && !state.letters[prefix + newKey]) {
            state.letters[prefix + newKey] = clone(priorLetter);
          }
        }
      }
      Object.assign(state, { jd: next, jdText: jd, jdTitle: title, context: emphasis });
    } else {
      state.base = next;
      flow.generated = true;
    }
    Object.assign(state, { role, mode, open: next.selected[0] || null });
    focusId = null;
    setStage('editor');
    if (mode === 'jd') reportModal();
    if (modelFailed) toast('模型暂不可用，已用本地规则生成。');
    else if (!next.selected.length) toast('已生成框架，可精简资料或手动选入经历。');
  } finally {
    if (generation === token) generation = null;
    if (button.isConnected) {
      if (mode === 'jd') $$('.cc-dialog input, .cc-dialog textarea, [data-jd-example], [data-jd-upload]')
        .forEach(field => { field.disabled = false; });
      button.disabled = false;
      button.textContent = busyLabel;
    }
  }
}
function sourceModal(id){const c=item(id);openModal('资料来源',`<div class="cc-file-row">${icon('file-text')}<div><strong>${esc(c.source)}</strong><span class="cc-small">${esc(c.name)}${samplesById.has(c.id)?' · 示例资料':''}</span></div></div><h3>原始记录</h3><div class="cc-source-text">${esc(c.sourceText||c.points.map(p => [descriptivePointLabel(p), p.text].filter(Boolean).join('：')).join('\n\n'))}</div><div class="cc-dialog-actions"><button type="button" class="cc-button cc-main" data-close>完成</button></div>`,'source');}


function resolveModal(){const d=doc();openModal('调整到一页',`<p class="cc-message">选择要精简或移出的经历。</p>${d.selected.map(id=>`<div class="cc-row"><span>${esc(item(id).name)}</span><div class="cc-actions"><button type="button" class="cc-button" data-trim="${id}">精简</button><button type="button" class="cc-button" data-remove="${id}">移出</button></div></div>`).join('')}<div class="cc-dialog-actions"><button type="button" class="cc-button cc-main" data-close>完成</button></div>`,'resolve');}
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if(b.hasAttribute('data-read-region')){readRegion(b.dataset.readRegion);return}
if(b.dataset.mode){if(b.dataset.mode==='jd'&&!state.jd)jdModal();else{state.mode=b.dataset.mode;state.role=doc().role||state.role;ghost=null;render();save()}return}
if(b.dataset.mobile){state.mobile=b.dataset.mobile;render(false);save();return}
if(b.hasAttribute('data-expand')){state.open=state.open===b.dataset.expand?null:b.dataset.expand;ghost=null;focusId=b.dataset.expand;drawCards();drawPaper(false);save();return}
if(b.hasAttribute('data-edit')){const [id,pid]=b.dataset.edit.split(':');editModal(id,pid);return}
if(b.hasAttribute('data-edit-card')){editModal(b.dataset.editCard);return}
if(b.hasAttribute('data-source')){sourceModal(b.dataset.source);return}
if(b.hasAttribute('data-close')){closeModal();return}
if(b.classList.contains('cc-undo')){undo();return}
if(b.classList.contains('cc-regions')){const n=clone(doc());n.regions=!n.regions;commit(n);return}
if(b.classList.contains('cc-layout')){layoutModal();return}
if (b.classList.contains('cc-library')) { setStage('review'); return; }
if(b.classList.contains('cc-add')){editRecord();return}
if(b.classList.contains('cc-jd-edit')){jdModal();return}
if(b.classList.contains('cc-resolve')){resolveModal();return}
if(b.hasAttribute('data-font')){let n=clone(doc());n.font=Math.max(9.5,Math.min(12,n.font+Number(b.dataset.font)));commit(n);$('.cc-font-value').textContent=n.font+' pt';return}
if(b.hasAttribute('data-fit-add')&&modal?.kind==='overflow'){const n=modal.simple;closeModal();commit(n);return}
if(b.hasAttribute('data-replace-add')&&modal?.kind==='overflow'){let n=clone(modal.next);n.selected=n.selected.filter(x=>x!==$('[data-replace-target]').value);if(measure(n).over<=1){closeModal();commit(n)}return}
if(b.hasAttribute('data-compact-point')){$('[data-edit-text]').value=item(modal.id).points.find(p=>p.id===modal.pid).short;return}
if(b.hasAttribute('data-save-point')){const t=$('[data-edit-text]').value.trim();if(!t){$('[data-edit-text]').focus();return}const n=clone(doc());n.edits[modal.pid]=t;closeModal();commit(n);return}
if(b.hasAttribute('data-jd-example')){$('[data-jd-title]').value='售后服务产品经理实习生';$('[data-jd-text]').value=jdExample;$('[data-jd-context]').value='突出预约流程、Agent 和设备资料检索经验';return}
if (b.hasAttribute('data-jd-generate')) { generateVersion('jd', b); return; }

if(b.hasAttribute('data-trim')){let n=clone(doc());item(b.dataset.trim).points.forEach(p=>{if(n.edits[p.id]===undefined)n.compact[p.id]=true});commit(n);if(measure(doc()).over<=1)closeModal();return}
if(b.hasAttribute('data-remove')){let n=clone(doc());n.selected=n.selected.filter(x=>x!==b.dataset.remove);commit(n);if(measure(doc()).over<=1)closeModal();else resolveModal();return}
if(b.classList.contains('cc-export')){exportPDF();return}
});
root.addEventListener('change',e=>{const el=e.target;if(el.dataset.select){selectCard(el.dataset.select);drawCards();return}if(el.dataset.point){const [id,pid]=el.dataset.point.split(':');selectPoint(id,pid);drawCards();return}if (el.classList.contains('cc-role')) { flow.targetRole = el.value; setStage('direction'); return; }if(el.hasAttribute('data-photo')||el.hasAttribute('data-bounds')){let n=clone(doc());n[el.hasAttribute('data-photo')?'photo':'regions']=el.checked;commit(n);return}if(el.hasAttribute('data-replace-target')&&modal?.kind==='overflow')$('[data-replace-add]').disabled=!modal.alternatives.find(x=>x.id===el.value)?.fit;});
root.addEventListener('pointerover',e=>{if(e.pointerType==='touch'||modal)return;const card=e.target.closest('[data-card]');if(card&&!card.contains(e.relatedTarget)){focusId=card.dataset.card;ghost=doc().selected.includes(focusId)?null:focusId;drawPaper(false)}});
root.addEventListener('pointerout',e=>{const card=e.target.closest('[data-card]');if(card&&!card.contains(e.relatedTarget)){ghost=null;focusId=null;drawPaper(false)}});
root.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal){e.preventDefault();closeModal()}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z'&&!['INPUT','TEXTAREA'].includes(e.target.tagName)){e.preventDefault();undo()}if(modal&&e.key==='Tab'){const f=[...$('.cc-dialog').querySelectorAll('button,input,textarea,select')].filter(x=>!x.disabled&&!x.hidden);if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f.at(-1)?.focus()}else if(!e.shiftKey&&document.activeElement===f.at(-1)){e.preventDefault();f[0]?.focus()}}});
async function exportPDF(){await document.fonts.ready;if(measure(doc()).over>1){resolveModal();return;}ghost=null;drawPaper(false);const paper=$('.cc-measure .cc-paper'),rect=paper.getBoundingClientRect(),s=rect.width/794,canvas=document.createElement('canvas');canvas.width=1588;canvas.height=2246;const ctx=canvas.getContext('2d');ctx.scale(2,2);ctx.fillStyle='#fff';ctx.fillRect(0,0,794,1123);ctx.fillStyle='#151515';ctx.textBaseline='top';const toRect=r=>({x:(r.left-rect.left)/s,y:(r.top-rect.top)/s,w:r.width/s,h:r.height/s});for(const el of paper.querySelectorAll('.cc-section-title,.cc-subproject')){let r=toRect(el.getBoundingClientRect());if(el.classList.contains('cc-subproject')){ctx.fillStyle='#f1f1f1';ctx.fillRect(r.x,r.y,r.w,r.h)}else{ctx.strokeStyle='#333';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(r.x,r.y+r.h);ctx.lineTo(r.x+r.w,r.y+r.h);ctx.stroke()}}const walker=document.createTreeWalker(paper.querySelector('.cc-resume'),NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(!n.textContent.trim())continue;const parent=n.parentElement,style=getComputedStyle(parent);if(style.display==='none')continue;ctx.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;ctx.fillStyle=parent.closest('.cc-date')?'#666':'#181818';const range=document.createRange();for(let i=0;i<n.textContent.length;i++){range.setStart(n,i);range.setEnd(n,i+1);let r=toRect(range.getBoundingClientRect());if(r.w&&r.h)ctx.fillText(n.textContent[i],r.x,r.y+Math.max(0,(r.h-parseFloat(style.fontSize))*.2));}}for(const li of paper.querySelectorAll('li')){let r=toRect(li.getBoundingClientRect());ctx.fillStyle='#222';ctx.beginPath();ctx.arc(r.x-9,r.y+doc().font*4/3*.7,1.8,0,Math.PI*2);ctx.fill()}if(doc().photo){let r=toRect(paper.querySelector('.cc-photo').getBoundingClientRect());ctx.strokeStyle='#bbb';ctx.strokeRect(r.x,r.y,r.w,r.h)}exportBytes=pdfFromCanvas(canvas);const png=canvas.toDataURL('image/png');openModal('导出预览',`<p class="cc-small">${esc(flow.profile.name||'我的简历')} · ${esc(state.mode === 'jd' ? state.jdTitle : state.role)} · PDF · A4 · 1 页</p><p class="cc-fold-note">文字以图片保存，招聘系统可能无法提取文字。</p><img class="cc-export-image" src="${png}" alt="简历 PDF 导出效果预览"><div class="cc-dialog-actions"><button type="button" class="cc-button" data-close>返回编辑</button><button type="button" class="cc-button cc-main" data-download-pdf>下载 PDF</button></div>`,'export');}


root.addEventListener('click',e=>{if(e.target.closest('[data-jd-upload]'))$('[data-jd-file]').click()});
root.addEventListener('change', async e => {
  const input = e.target;
  if (!input.hasAttribute('data-jd-file') || !input.files[0]) return;
  const file = input.files[0];
  const status = $('.cc-dialog .cc-error');
  const field = $('[data-jd-text]');
  const filename = $('[data-jd-filename]');
  const generate = $('[data-jd-generate]');
  jdFileRead?.abort();
  if (file.size > 20_000_000) {
    generate.disabled = false;
    status.textContent = '文件不超过 20 MB。';
    return;
  }
  const controller = new AbortController();
  jdFileRead = controller;
  const current = () => input.isConnected && !controller.signal.aborted;
  filename.textContent = file.name + ' · 正在读取…';
  generate.disabled = true;
  status.textContent = '';
  const previous = field.value;
  try {
    const result = await readMaterial(file, {
      signal: controller.signal,
      onStatus: progress => { if (current()) filename.textContent = file.name + ' · ' + progress; }
    });
    if (!current()) return;
    filename.textContent = file.name;
    if (!result.text.trim()) {
      status.textContent = ['未识别到职位描述，请粘贴文字或换一份文件。', ...result.notes].join(' ');
      return;
    }
    if (field.value !== previous) {
      status.textContent = '已保留识别期间编辑的内容。若要采用文件内容，可重新上传。';
      return;
    }
    field.value = result.text.slice(0, 20_000);
    status.textContent = [...result.notes, result.text.length > 20_000 ? '已载入前 20,000 字，请核对。' : ''].filter(Boolean).join(' ');
  } catch (error) {
    if (current()) {
      filename.textContent = file.name;
      status.textContent = materialReader.mediaKind(file) ? error.message : '读取失败，请手动输入职位描述。';
    }
  } finally {
    if (jdFileRead === controller) jdFileRead = null;
    if (current()) {
      input.value = '';
      generate.disabled = false;
    }
  }
});
const assistUI={filter:'all',issues:[],active:null};
const assistHash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(36)};
const assistKeyForJD = (title, text) => 'jd:' + assistHash(title + '\n' + text);
const assistKey = () => state.mode === 'jd' ? assistKeyForJD(state.jdTitle, state.jdText)
  : 'base:' + state.role + (state.jdText ? ':' + assistKeyForJD(state.jdTitle, state.jdText) : '');
const assistMeta=()=>{doc().assist??={dismissed:[],changes:[],skipped:[]};return doc().assist};
const chosenFacts=()=>doc().selected.flatMap(id=>{const c=item(id);return c?bullets(c).map(p=>({id:c.id,pid:p.id,name:c.name,role:c.role,text:pointText(c,p),source:p.text})):[]});
const sourceStamp = () => assistHash(JSON.stringify({
  facts: chosenFacts(), profile: flow.profile, jd: state.jdText, title: state.jdTitle,
  role: state.role, mode: state.mode, emphasis: state.context
}));
const requirementDefs=[
 ['用户研究与需求理解',['用户研究','需求分析','需求调研','访谈'],['走访','访谈','需求','调研']],
 ['交互设计与流程验证',['交互设计','原型','试用验证'],['原型','试用','页面','交互']],
 ['SQL 数据分析',['SQL'],['SQL']],
 ['多轮对话与 Agent',['多轮对话','Agent'],['对话','Agent']],
 ['知识库与资料检索',['RAG','知识库','检索'],['检索','召回','RAG']],
 ['异常情境与答案核对',['异常情境','答案依据','评测'],['测试情境','测试用例','答案','核对回答','异常分支']],
 ['A/B 测试',['A/B','AB 测试'],['A/B','AB 测试']],
 ['财务分析与估值',['财务','估值'],['财务','成本','估值']],
 ['行业研究',['行业研究','产业研究'],['行业','年报','简报']],
 ['Python 与模型实验',['Python','模型训练','算法'],['Python','模型','实验']],
 ['工程部署',['部署','上线经验'],['部署','上线']],
 ['英语沟通',['英语','英文沟通'],['英语','英文沟通']]
];
function reportRows() {
  const draft = doc();
  const selected = chosenFacts();
  const records = all().flatMap(record => record.points.map(point => ({
    id: record.id, pid: point.id, name: record.name, role: record.role, text: point.text
  })));
  const matchesByLine = new Map((draft.plan?.requirements || []).map(row => [row.lineId, row.matches]));
  return assistant.jdLines(state.jdText, state.jdTitle).map(line => {
    const key = assistHash(line.title + '\n' + line.sourceLine + '\n' + state.jdText);
    const modelMatches = matchesByLine.get(line.id) || [];
    const evidenceFor = assistant.evidenceFor(line.title);
    const manual = (draft.manualEvidence?.[key] || []).filter(id => records.some(fact => fact.pid === id));
    const score = fact => {
      if (manual.includes(fact.pid)) return 1000;
      if (modelMatches.some(match => match.pointId === fact.pid && fact.text.includes(match.quote))) return 100;
      return evidenceFor(fact.text);
    };
    const best = list => list.map(fact => ({ fact, score: score(fact) }))
      .sort((a, b) => b.score - a.score).find(match => match.score > 0)?.fact;
    const shown = best(selected);
    const available = best(records.filter(fact => !selected.some(current => current.pid === fact.pid)));
    const skills = flow.profile.skills.split('\n').find(text => evidenceFor(text));
    const skipped = assistMeta().skipped.includes(key);
    return { ...line, key, fact: shown || (skills ? null : available), profile: !shown && skills,
      status: shown || skills ? 'shown' : available ? 'available' : skipped ? 'skipped' : 'missing' };
  });
}
function reportModal(){
 if(!state.jdText.trim()||state.mode!=='jd'){openModal('JD 匹配报告',`<div class="ca-panel"><div class="ca-empty"><strong>先选择一个目标岗位</strong><p>添加 JD，查看这份简历呈现了哪些要求。</p><button class="cc-button cc-main" type="button" data-ca-open-jd>添加 JD</button>${state.jd?'<button class="cc-button" type="button" data-ca-use-jd>查看定制版</button>':''}</div></div>`,'report');return}
 const rows=reportRows();const names={shown:'已呈现',available:'可补入',missing:'待补充',skipped:'已跳过'};
 openModal('JD 匹配报告',`<div class="ca-panel"><p class="ca-context">${esc(state.jdTitle||state.role)} · 当前定制版</p><p class="cc-message">报告列出资料里的相关证据。待补充的条目可以核对、补充或跳过。</p><div class="ca-summary">${['shown','available','missing','skipped'].map(s=>`<div><strong>${rows.filter(r=>r.status===s).length}</strong>${names[s]}</div>`).join('')}</div><div class="ca-list">${rows.map(r=>`<article class="ca-row"><div class="ca-row-head"><strong>${esc(r.title)}</strong><span class="ca-badge ${r.status==='shown'?'is-solid':''}">${names[r.status]}</span></div><p class="ca-evidence">${r.fact?esc(r.fact.name)+' · '+esc(r.fact.text):r.profile?esc(r.profile):r.status==='skipped'?'已保留当前简历，不再追问。':'资料中尚未找到相关记录。'}</p><details><summary>${esc(r.kind)} · 查看 JD 原文</summary><blockquote>${esc(r.sourceLine)}</blockquote></details><div class="ca-actions">${r.fact?`<button type="button" class="cc-button" data-ca-locate="${r.fact.id}">定位经历</button>`:''}${r.status==='available'?`<button type="button" class="cc-button cc-main" data-ca-add="${r.fact.id}:${r.fact.pid}">加入简历</button>`:''}${r.status==='missing'?`<button type="button" class="cc-button" data-ca-gap="${r.key}">补充信息</button><button type="button" class="cc-button cc-quiet" data-ca-skip="${r.key}">暂不补充</button>`:''}${r.status==='skipped'?`<button type="button" class="cc-button cc-quiet" data-ca-unskip="${r.key}">重新补充</button>`:''}</div></article>`).join('')}</div><div class="ca-bottom"><button class="cc-button" type="button" data-ca-open-jd>修改 JD</button><button class="cc-button cc-main" type="button" data-close>继续编辑</button></div></div>`,'report');
}
function saveSkipped(key, skipped) {
  const values = new Set(assistMeta().skipped);
  if (skipped) values.add(key);
  else values.delete(key);
  assistMeta().skipped = [...values];
  save();
  if (skipped) reportModal();
  else gapModal(key);
}
function gapModal(key){const row=reportRows().find(r=>r.key===key);if(!row)return;openModal('补充信息',`<div class="ca-panel"><p>${esc(row.title)}</p><label class="cc-field"><span>你实际做过什么？</span><textarea class="cc-input" data-ca-gap-text rows="5" placeholder="职责、行动或结果，记得多少就写多少。"></textarea></label><div class="ca-bottom"><button type="button" class="cc-button" data-ca-report>返回报告</button><div class="cc-actions"><button type="button" class="cc-button" data-ca-skip="${key}">没有这项经历</button><button type="button" class="cc-button cc-main" data-ca-save-gap="${key}">确认并保存</button></div></div><p class="cc-error" role="alert"></p></div>`,'gap');}
function diagnose(){
 const issues=[];const seen=new Set();
 for(const f of chosenFacts()){
  const c=item(f.id),p=c.points.find(p=>p.id===f.pid);let title='',reason='',after='';
  if(seen.has(f.text)){title='内容重复';reason='同一句内容已经出现，移除这一处可以腾出页面空间。';after='';}
  else if(f.text===p.text&&p.short&&p.short!==p.text&&p.short.length<p.text.length*.85){title='表达可以更紧凑';reason='合并过程描述，保留原有行动与关键事实。职责、数字和结果没有新增。';after=p.short;}
  else if(/参与了?相关|负责了?相关|做了一些|一些工作|很多工作/.test(f.text)){title='行动描述不够具体';reason='当前材料没有说明具体工作；先补充实际行动，不能直接替你编写职责。';after=null;}
  else if(f.text.length>115){title='要点过长';reason='建议聚焦一个主要行动；请在编辑中保留必要数字、限定条件与责任边界。';after=null;}
  seen.add(f.text);if(!title)continue;const id=assistHash(f.id+f.pid+f.text+title);if(assistMeta().dismissed.includes(id))continue;
  issues.push({...f,id,exp:f.id,pid:f.pid,title,reason,before:f.text,after,type:after===''?'remove':after===null?'manual':'rewrite'});
 }
 return issues.slice(0,10);
}
function diagnosisModal(){
 assistUI.issues=diagnose();const changes=assistMeta().changes;const over=measure(doc()).over>1;
 openModal('简历诊断',`<div class="ca-panel"><p class="ca-context">${esc(state.mode==='jd'?state.jdTitle:state.role+' · 通用版')}</p><div class="ca-summary"><div><strong>${assistUI.issues.length}</strong>可改进</div><div><strong>${changes.filter(c=>!c.reverted).length}</strong>已采纳</div><div><strong>${over?'超页':'1 页'}</strong>当前排版</div></div>${over?'<div class="ca-stale">内容超出一页。精简或移出经历后再导出。<div class="ca-actions"><button type="button" class="cc-button" data-ca-layout>调整排版</button></div></div>':''}<div class="ca-list">${assistUI.issues.length?assistUI.issues.map(s=>`<article class="ca-row"><div class="ca-row-head"><strong>${esc(s.title)}</strong><span class="ca-badge">${s.type==='manual'?'需补充':'表达建议'}</span></div><p class="ca-evidence">${esc(s.name)}<br>${esc(s.before)}</p><div class="ca-actions"><button type="button" class="cc-button cc-main" data-ca-issue="${s.id}">查看建议</button><button type="button" class="cc-button cc-quiet" data-ca-dismiss="${s.id}">保留原文</button></div></article>`).join(''):'<div class="ca-empty"><strong>没有新的修改建议</strong><p>仍可逐项核对经历和事实。</p><button type="button" class="cc-button" data-close>返回简历</button></div>'}</div>${changes.length?`<details open><summary>修改记录 · ${changes.length}</summary>${changes.map((c,index)=>`<div class="ca-row" style="margin-top:9px"><div class="ca-row-head"><strong>${esc(c.name)}</strong><span class="ca-badge">${c.reverted?'已撤销':'已采纳'}</span></div><p class="ca-evidence">${esc(c.reason)}</p><div class="ca-actions"><button type="button" class="cc-button" data-ca-change="${index}">查看改动</button></div></div>`).reverse().join('')}</details>`:''}<div class="ca-bottom"><button type="button" class="cc-button" data-ca-recheck>重新检查</button><button type="button" class="cc-button cc-main" data-close>继续编辑</button></div></div>`,'diagnosis');
}
function suggestionModal(id,isChange=false){
 const s=isChange?assistMeta().changes[id]:assistUI.issues.find(c=>c.id===id);if(!s)return;assistUI.active=s;
 openModal(isChange?'修改解释':'修改建议',`<div class="ca-panel"><p class="ca-context">${esc(s.name)} · ${esc(s.title||'文案修改')}</p><div class="ca-diff"><div><small>原文</small>${esc(s.before)}</div><div><small>${s.type==='manual'?'需要补充':'修改后'}</small>${s.type==='manual'?'补充你实际采取的行动后，再优化表述。':s.type==='remove'?'移除这条重复内容':esc(s.after)}</div></div><p class="ca-reason">${esc(s.reason)}</p><details><summary>查看原始依据</summary><blockquote>${esc(s.source||item(s.exp)?.points.find(p=>p.id===s.pid)?.text||s.before)}</blockquote></details><div class="ca-bottom"><button type="button" class="cc-button" data-ca-diagnosis>返回诊断</button><div class="cc-actions">${isChange?s.reverted?'<span class="ca-success">已撤销这次修改</span>':`<button type="button" class="cc-button" data-ca-revert="${id}">撤销这次修改</button>`:`<button type="button" class="cc-button" data-ca-dismiss="${s.id}">保留原文</button><button type="button" class="cc-button cc-main" data-ca-apply="${s.id}">${s.type==='manual'?'编辑要点':'采纳修改'}</button>`}</div></div><p class="cc-error" role="alert"></p></div>`,'suggestion');
}
function applySuggestion(id){
 const s=assistUI.issues.find(c=>c.id===id);if(!s)return;
 if(s.type==='manual'){editModal(s.exp,s.pid);return}
 const current=item(s.exp)?.points.find(p=>p.id===s.pid);if(!current||pointText(item(s.exp),current)!==s.before){diagnosisModal();toast('内容已变化，已重新检查');return}
 const n=clone(doc());n.assist??={dismissed:[],changes:[],skipped:[]};
 if(s.type==='remove'){n.bullets[s.exp]=n.bullets[s.exp].filter(p=>p!==s.pid);if(!n.bullets[s.exp].length)n.selected=n.selected.filter(x=>x!==s.exp);}else n.edits[s.pid]=s.after;
 if(measure(n).over>1&&measure(n).over>measure(doc()).over){$('.cc-error').textContent='修改后会超页，请先调整内容。';return}
 n.assist.changes.push({...s,source:current.text,reverted:false});closeModal();commit(n);diagnosisModal();toast('已采纳，可在修改记录中撤销');
}
function revertSuggestion(index){
 const change=assistMeta().changes[index];if(!change||change.reverted)return;
 const p=item(change.exp)?.points.find(p=>p.id===change.pid);if(!p){toast('原经历已移除');return}
 if ((change.type !== 'remove' && pointText(item(change.exp), p) !== change.after) ||
     (change.type === 'remove' && pointText(item(change.exp), p) !== change.before)){$('.cc-error').textContent='这条要点已有后续修改，请在编辑器中处理，避免覆盖。';return}
 if (doc().selected.length >= 10 && !doc().selected.includes(change.exp)) {
   $('.cc-error').textContent = '请先移出一段经历，再恢复原文。';
   return;
 }
 const n=clone(doc());n.edits[change.pid]=change.before;if(!n.selected.includes(change.exp))n.selected.push(change.exp);n.bullets[change.exp]=[...new Set([...(n.bullets[change.exp]||[]),change.pid])];
 if(measure(n).over>1&&measure(n).over>measure(doc()).over){$('.cc-error').textContent='恢复原文后会超页，请先调整排版。';return}
 n.assist.changes[index].reverted=true;closeModal();commit(n);diagnosisModal();toast('已恢复原文');
}
function currentLetter(){state.letters??={};const key=assistKey();state.letters[key]??={company:'',motivation:'',tone:'concise',text:'',history:[],sources:[]};return state.letters[key]}
function materialsHTML(){
 const l = currentLetter(), stale = !!l.text && l.stamp !== sourceStamp();
 return `<div class="ff-heading"><div><h1>投递材料</h1><p>${esc(state.mode==='jd'?state.jdTitle:state.role+' · 通用版')}</p></div><button type="button" class="cc-button" data-stage="editor">返回简历</button></div><div class="ca-materials"><aside class="ca-resume-card"><div class="ca-resume-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></div><h2>简历</h2><p class="cc-small">${esc(flow.profile.name||'我的简历')} · ${doc().selected.length} 段经历</p><button type="button" class="cc-button cc-main" data-ca-resume-export>下载 PDF</button><button type="button" class="cc-button" data-ca-diagnosis>检查简历</button>${state.mode==='jd'?'<button type="button" class="cc-button" data-ca-report>JD 匹配报告</button>':''}</aside><section class="ca-letter"><div class="ca-letter-head"><h2>求职信</h2><span class="ca-badge">${l.text?'可直接编辑':'选填'}</span></div><div class="ca-letter-body">${l.text?`${stale?'<div class="ca-stale">简历或岗位已更新，求职信保留原稿。<div class="ca-actions"><button type="button" class="cc-button" data-ca-letter-refresh>更新草稿</button></div></div>':''}<textarea class="ca-letter-text" data-ca-letter-text maxlength="30000" aria-label="求职信正文" spellcheck="false">${esc(l.text)}</textarea><details><summary class="cc-small">使用的经历 · ${l.sources.length}</summary><div class="ca-actions">${l.sources.map(s => item(s.id) ? `<button class="ca-link-button" type="button" data-ca-source="${s.id}">${esc(s.name)}</button>` : `<span class="cc-small">${esc(s.name)}（已移出资料库）</span>`).join('')}</div></details>`:`${!state.jdText.trim()?'<div class="ca-empty"><strong>为这个岗位写一封信</strong><p>添加 JD，再用已选简历生成求职信。</p><button type="button" class="cc-button cc-main" data-ca-letter-jd>添加 JD</button></div>':`<p class="ca-context">基于当前简历与目标岗位「${esc(state.jdTitle || state.role)}」。</p><label class="cc-field"><span>公司名称</span><input class="cc-input" data-ca-letter-field="company" maxlength="120" value="${esc(l.company)}" placeholder="选填"></label><label class="cc-field"><span>为什么想申请这个岗位？</span><textarea class="cc-input" data-ca-letter-field="motivation" maxlength="2000" placeholder="选填，只写你的真实想法">${esc(l.motivation)}</textarea></label><label class="cc-field"><span>表达方式</span></label><div class="ca-tone"><button type="button" data-ca-tone="concise" aria-pressed="${l.tone==='concise'}">简洁</button><button type="button" data-ca-tone="formal" aria-pressed="${l.tone==='formal'}">正式</button></div><div class="ca-actions" style="margin-top:23px"><button type="button" class="cc-button cc-main" data-ca-letter-generate ${chosenFacts().length?'':'disabled'}>生成求职信</button></div>${!chosenFacts().length?'<p class="ca-context">先在简历中选入一段经历。</p>':''}`}`}</div>${l.text?`<div class="ca-letter-footer"><span class="ca-letter-status">${l.text.length} 字 · 已保存草稿</span><button type="button" class="cc-button" data-ca-letter-options>重新生成</button>${l.history.length?'<button type="button" class="cc-button" data-ca-letter-undo>恢复上一稿</button>':''}<button type="button" class="cc-button" data-ca-letter-copy>复制全文</button><button type="button" class="cc-button cc-main" data-ca-letter-download>下载 TXT</button></div>`:''}</section></div>`;
}
function letterOptions(){const l=currentLetter();openModal('重新生成求职信',`<div class="ca-panel"><label class="cc-field"><span>公司名称</span><input class="cc-input" data-ca-letter-field="company" maxlength="120" value="${esc(l.company)}" placeholder="选填"></label><label class="cc-field"><span>申请原因</span><textarea class="cc-input" data-ca-letter-field="motivation" maxlength="2000">${esc(l.motivation)}</textarea></label><label class="cc-field"><span>表达方式</span><select class="cc-input" data-ca-letter-tone><option value="concise" ${l.tone==='concise'?'selected':''}>简洁</option><option value="formal" ${l.tone==='formal'?'selected':''}>正式</option></select></label><p class="ca-context">当前稿会保留，可恢复。</p><div class="ca-bottom"><button type="button" class="cc-button" data-close>保留当前稿</button><button type="button" class="cc-button cc-main" data-ca-letter-generate>生成新稿</button></div></div>`,'letter-options')}
function generateLetter(){
 if (!state.jdText.trim()) { jdModal(); return; }
 const facts=chosenFacts();if(!facts.length){toast('先选择一段经历');return}const l=currentLetter();
 if(l.text){l.history.push({text:l.text,stamp:l.stamp,sources:clone(l.sources)});if(l.history.length>3)l.history.shift()}
 const relevance=f=>requirementDefs.reduce((sum,[,keys,evidence])=>sum+(keys.some(k=>state.jdText.toLowerCase().includes(k.toLowerCase()))&&evidence.some(k=>f.text.toLowerCase().includes(k.toLowerCase()))?1:0),0)+(item(f.id)?.tags||[]).filter(t=>(state.jdText+' '+state.context).toLowerCase().includes(t.toLowerCase())).length+2*(item(f.id)?.tags||[]).filter(t=>state.context.toLowerCase().includes(t.toLowerCase())).length;
 const picks=[];for(const f of facts.slice().sort((a,b)=>relevance(b)-relevance(a))){if(!picks.some(p=>p.id===f.id))picks.push(f);if(picks.length===2)break}
 const greeting=l.company?`${l.company}招聘团队：`:'招聘团队：';
 const intro=l.tone==='formal'?`您好！我希望申请${state.jdTitle||state.role}岗位，以下是与本次申请相关的经历。`:`您好，我希望申请${state.jdTitle||state.role}岗位。`;
 const body=picks.map(f=>`在${f.name}的经历中，${f.text.replace(/[。；]+$/,'')}。`).join('\n\n');
 const motivation=l.motivation.trim()?`\n\n申请动机：${l.motivation.trim()}`:'';
 l.text=`${greeting}\n\n${intro}\n\n${body}${motivation}\n\n${l.tone==='formal'?'感谢您审阅我的申请。如有进一步沟通的机会，我愿意详细介绍上述经历。':'感谢阅读，期待有机会进一步交流。'}\n\n${flow.profile.name||''}`.trim();
 l.sources=picks.map(f=>({id:f.id,pid:f.pid,name:f.name}));l.stamp=sourceStamp();l.manual=false;closeModal();flow.stage='deliver';render(false);save();
}
function locateExperience(id){if(!item(id))return;closeModal();flow.stage='editor';state.open=id;state.mobile='content';focusId=id;render(false);save();requestAnimationFrame(()=>{const el=$('[data-card="'+id+'"]');el?.scrollIntoView({block:'center',behavior:reduced?'instant':'smooth'});el?.querySelector('button')?.focus({preventScroll:true})})}
flowSteps.push(['deliver','投递材料']);
const originalStageAllowed=stageAllowed;stageAllowed=s=>s==='deliver'?flow.generated:originalStageAllowed(s);
const originalRenderFlow=renderFlow;renderFlow=function(){originalRenderFlow();if(flow.stage==='deliver')$('.ff-screen').innerHTML=materialsHTML();icons()};
const originalRender=render;render=function(animate=true){originalRender(animate);const n=diagnose().length;const b=$('[data-ca-diagnosis-count]');if(b)b.textContent=n?' · '+n:'';};
root.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.hasAttribute('data-ca-report')){reportModal();return}
 if(b.hasAttribute('data-ca-diagnosis')){diagnosisModal();return}
 if(b.hasAttribute('data-ca-materials')){setStage('deliver');return}
 if(b.hasAttribute('data-ca-open-jd')||b.hasAttribute('data-ca-letter-jd')){jdModal();return}
 if(b.hasAttribute('data-ca-use-jd')){state.mode='jd';state.role=doc().role;render(false);reportModal();return}
 if(b.hasAttribute('data-ca-locate')){locateExperience(b.dataset.caLocate);return}
 if(b.hasAttribute('data-ca-source')){sourceModal(b.dataset.caSource);return}
 if(b.hasAttribute('data-ca-add')){const [id,pid]=b.dataset.caAdd.split(':');if(doc().selected.length>=10&&!doc().selected.includes(id)){toast('先移出一段经历，再加入');return}const n=candidate(id,pid);if(measure(n).over>1){overflowModal(n,id);return}closeModal();commit(n);reportModal();toast('已加入当前简历');return}
 if(b.hasAttribute('data-ca-gap')){gapModal(b.dataset.caGap);return}
 if (b.hasAttribute('data-ca-skip')) {
   saveSkipped(b.dataset.caSkip, true);
   return;
 }
 if (b.hasAttribute('data-ca-unskip')) {
   saveSkipped(b.dataset.caUnskip, false);
   return;
 }
 if (b.hasAttribute('data-ca-save-gap')) {
   const text = $('[data-ca-gap-text]').value.trim();
   const key = b.dataset.caSaveGap;
   if (!text) {
     $('.cc-error').textContent = '写下经历，或选择暂不补充。';
     return;
   }
   if (/^(没有(?:这项)?(?:相关)?(?:经历|经验)?|没做过|暂无(?:相关)?(?:经历|经验)?|不知道|不清楚)[。！!\s]*$/.test(text)) {
     saveSkipped(key, true);
     return;
   }
   const record = createRecord(text, 'JD 报告补充');
   flow.records.push(record);
   doc().manualEvidence ??= {};
   doc().manualEvidence[key] = [...(doc().manualEvidence[key] || []), ...record.points.map(point => point.id)];
   assistMeta().skipped = assistMeta().skipped.filter(value => value !== key);
   save();
   render(false);
   reportModal();
   return;
 }
 if(b.hasAttribute('data-ca-issue')){suggestionModal(b.dataset.caIssue);return}
 if(b.hasAttribute('data-ca-dismiss')){assistMeta().dismissed.push(b.dataset.caDismiss);save();diagnosisModal();return}
 if(b.hasAttribute('data-ca-apply')){applySuggestion(b.dataset.caApply);return}
 if(b.hasAttribute('data-ca-change')){suggestionModal(b.dataset.caChange,true);return}
 if(b.hasAttribute('data-ca-revert')){revertSuggestion(b.dataset.caRevert);return}
 if(b.hasAttribute('data-ca-recheck')){diagnosisModal();return}
 if(b.hasAttribute('data-ca-layout')){closeModal();setStage('editor');resolveModal();return}
 if(b.hasAttribute('data-ca-resume-export')){exportPDF();return}
 if(b.hasAttribute('data-ca-tone')){currentLetter().tone=b.dataset.caTone;render(false);save();return}
 if(b.hasAttribute('data-ca-letter-generate')||b.hasAttribute('data-ca-letter-refresh')){generateLetter();return}
 if(b.hasAttribute('data-ca-letter-options')){letterOptions();return}
 if(b.hasAttribute('data-ca-letter-undo')){const l=currentLetter(),prev=l.history.pop();if(prev)Object.assign(l,prev);render(false);save();return}
 if (b.hasAttribute('data-ca-letter-copy')) {
   const text = currentLetter().text;
   if (!text.trim()) return toast('求职信正文为空');
   device.copy(text, $('[data-ca-letter-text]')).then(copied =>
     toast(copied ? '已复制求职信' : '已选中正文，请使用浏览器的复制快捷键'));
   return;
 }
 if (b.hasAttribute('data-ca-letter-download')) {
   const text = currentLetter().text;
   if (!text.trim()) return toast('求职信正文为空');
   device.download(new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' }),
     (flow.profile.name || '我的') + '-求职信.txt');
   toast('TXT 已开始下载');
   return;
 }
});
root.addEventListener('input',e=>{const t=e.target;if(t.hasAttribute('data-ca-letter-field')){currentLetter()[t.dataset.caLetterField]=t.value;save()}if(t.hasAttribute('data-ca-letter-text')){const l=currentLetter();l.text=t.value;l.manual=true;save();$('.ca-letter-status').textContent = l.text.length + (draftSaved ? ' 字 · 已保存草稿' : ' 字 · 草稿未保存')}});
root.addEventListener('change',e=>{if(e.target.hasAttribute('data-ca-letter-tone')){currentLetter().tone=e.target.value;save()}});


const ro=new ResizeObserver(()=>resizePaper());ro.observe($('.cc-paper-wrap'));
render(false);document.fonts.ready.then(()=>drawPaper(false));
assistant.discover().then(config => {
  modelService = config;
  const button = $('[data-model-settings]');
  if (button && assistant.enabled()) button.lastChild.textContent = '模型已启用';
});
})();
