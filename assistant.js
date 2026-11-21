(() => {
  const keywords = [
    ['用户访谈', '用户研究', '需求调研', '可用性测试', '需求分析', '产品设计', '产品经理', '原型', 'Figma', '产品运营', '交互', '用户反馈', '流程', '数据分析', '埋点', '指标', '调研', 'A/B 测试'],
    ['投资银行', '投行', '财务分析', '财务模型', '财务', '估值', '行业研究', '尽职调查', '公司研究', '年报', '证券', '并购', 'Excel', 'DCF', '研报', '统计', '融资'],
    ['算法', '机器学习', '深度学习', '自然语言处理', '模型训练', '模型', '实验', 'Python', 'PyTorch', 'TensorFlow', '检索', '评测', '召回', 'RAG', 'Agent', '部署', '工程', '知识库', '多轮对话'],
    ['SQL', 'JavaScript', 'TypeScript', 'Java', 'C++', 'React', 'Docker', 'Git', 'Linux', 'Tableau', 'Power BI', '英语', '英文', '财务建模', '数据处理', '可视化', '沟通', '需求', '自动化', '测试用例', '原型设计', '异常场景', '异常情境', '答案依据', '核对回答', 'AB 测试', '售后', '预约']
  ];
  const allTerms = [...new Set(keywords.flat())];
  const aliases = [
    ['a/b 测试', 'ab 测试', 'a/b测试', 'ab测试', 'a/b testing'],
    ['异常情境', '异常场景', '异常分支', '异常用例'],
    ['答案依据', '回答依据', '核对回答', '核对答案'],
    ['用户访谈', '访谈用户', '用户走访'],
    ['财务建模', '财务模型']
  ];
  const preferencesKey = 'careercraft:use-model';
  const http = ['http:', 'https:'].includes(location.protocol);
  let service = null;

  function normalized(text) {
    return String(text || '').normalize('NFKC').trim().toLowerCase();
  }

  function contains(text, term) {
    if (!/[\u3400-\u9fff]/.test(term)) {
      const pattern = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('(?:^|[^a-z0-9+#])' + pattern + '(?=$|[^a-z0-9+#])', 'i').test(text);
    }
    return text.includes(term);
  }

  function targetTerms(text) {
    const source = normalized(text);
    const latin = source.match(/[a-z][a-z0-9+#./-]{1,24}/g) || [];
    return [...new Set([
      ...allTerms.map(normalized).filter(term => contains(source, term)),
      ...latin.filter(term => !/^(and|the|for|with|from|work|skills|experience|job|you|will|are|our|required|in|to|of|at|on|or|we|is|be)$/.test(term))
    ])];
  }

  function score(text, terms) {
    const source = normalized(text);
    return terms.reduce((total, term) => total + (contains(source, term) ? Math.min(term.length, 6) : 0), 0);
  }

  function relevanceFor(role, jd, emphasis) {
    const direction = (keywords[['产品经理', '投行', '算法'].indexOf(role)] || []).map(normalized);
    const jdTerms = targetTerms(jd);
    const focusTerms = targetTerms(emphasis);
    const focus = normalized(emphasis);
    return text => score(text, direction) + 3 * score(text, jdTerms) + 5 * score(text, focusTerms) +
      (focus.length > 1 && normalized(text).includes(focus) ? 24 : 0);
  }

  function jdLines(text, jobTitle = '') {
    const header = /^(?:岗位职责|工作职责|职位描述|岗位描述|任职要求|任职资格|职位要求|岗位要求|加分项|优先条件|职责|要求|任职条件|职位信息|responsibilities|requirements|qualifications|preferred qualifications)$/i;
    const blocks = text.replace(/([^\n])((?:岗位职责|任职要求|加分项)[：:])/g, '$1\n$2')
      .split(/[\n；;。]+/).map(part => part.trim()).filter(Boolean);
    const lines = [];
    let kind = '岗位要求';
    for (const block of blocks) {
      const heading = block.match(/^([^：:]+)[：:]\s*(.*)$/);
      const label = heading?.[1] || block;
      if (header.test(label)) {
        kind = /加分|优先|preferred/i.test(label) ? '加分项' : '岗位要求';
        if (!heading?.[2]) continue;
      }
      if (/^(?:岗位名称|职位名称|工作地点|薪资|公司简介|投递方式|location|salary)\s*[：:]/i.test(block)) continue;
      const content = (heading && header.test(label) ? heading[2] : block)
        .replace(/^(?:[-*•●]\s*|[（(]?\d+[).、．）]\s*)/, '').trim();
      if (normalized(content) === normalized(jobTitle)) continue;
      const parts = content.split(/[，,]\s*(?=(?:能够|理解|熟悉|掌握|具备|负责|具有|优先|有.+经验|understand\b|be able to\b|have\b))/i);
      for (const part of parts) {
        const title = part.trim();
        if (title && !lines.some(line => line.sourceLine === block && line.title === title)) {
          lines.push({ id: 'r' + lines.length, sourceLine: block, title,
            kind: /优先|加分|preferred/i.test(title) ? '加分项' : kind });
        }
      }
    }
    return lines.length ? lines : [{ id: 'r0', sourceLine: text, title: text, kind: '待核对' }];
  }

  function evidenceFor(requirement) {
    const source = normalized(requirement);
    const terms = targetTerms(source).filter(term => term.length > 2 ||
      /^(sql|ab|沟通|数据|用户|测试|流程|部署|交互|模型|需求|财务|实验|算法|检索|统计|融资|估值|调研|原型|售后|预约)$/.test(term));
    const alternatives = aliases.filter(group => group.some(term => contains(source, term)));
    return fact => {
      const text = normalized(fact);
      if (/^(?:没有|暂无|不具备|不会|未接触|缺少|不熟悉|no\b|not\b)/i.test(text)) return 0;
      if (terms.length || alternatives.length) {
        return score(text, terms) + alternatives.filter(group => group.some(term => contains(text, term))).length * 4;
      }
      return source.length >= 3 && text.includes(source) ? source.length : 0;
    };
  }

  function enabled() {
    try { return !!service && localStorage.getItem(preferencesKey) === JSON.stringify([service.destination, service.name]); }
    catch { return false; }
  }

  function enable(value) {
    try {
      if (value && service) localStorage.setItem(preferencesKey, JSON.stringify([service.destination, service.name]));
      else localStorage.removeItem(preferencesKey);
      return enabled();
    } catch { return false; }
  }

  async function discover() {
    if (!http) return null;
    try {
      const response = await fetch('/api/model', { signal: AbortSignal.timeout(3000) });
      if (!response.ok) return null;
      const config = await response.json();
      service = config.enabled && typeof config.destination === 'string' ? config : null;
    } catch { service = null; }
    return service;
  }

  async function plan(input) {
    if (!enabled()) return null;
    const response = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(45_000)
    });
    if (!response.ok) throw new Error('模型请求未成功');
    return response.json();
  }

  window.CareerCraftAssistant = {
    relevanceFor, jdLines, evidenceFor, enabled, enable, discover, plan
  };
})();
