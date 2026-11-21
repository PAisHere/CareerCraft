(() => {
  const sectionAliases = [
    [/^(?:个人信息|基本信息|联系方式|个人资料|profile|contact|personal information)$/i, 'intro'],
    [/^(?:教育背景|教育经历|教育情况|教育信息|学习经历|教育|education|academic background)$/i, 'education'],
    [/^(?:专业技能|个人技能|技能特长|技能证书|证书与技能|语言能力|技术技能|技能|(?:technical )?skills|certifications)$/i, 'skills'],
    [/^(?:实习经历|实习经验|工作经历|工作经验|实践经历|实习|工作|internships?|(?:work|professional) experience|experience)$/i, '实习经历'],
    [/^(?:个人项目|项目经历|项目经验|项目实践|项目|projects?|project experience)$/i, '个人项目'],
    [/^(?:比赛经历|竞赛经历|赛事经历|竞赛获奖|获奖经历|competitions?|awards)$/i, '比赛经历'],
    [/^(?:学术经历|科研经历|研究经历|科研项目|学术|科研|research(?: experience)?)$/i, '学术经历'],
    [/^(?:科研|学术|研究)(?:与|和|及|、|\/|&)(?:项目|项目实践)(?:经历|经验)?$|^(?:项目|项目实践)(?:与|和|及|、|\/|&)(?:科研|学术|研究)(?:经历|经验)?$/i, 'mixed-projects']
  ];
  const fields = /^(姓名(?:\s*\(中文\))?|name|电话|手机|phone|邮箱|e-?mail|角色|职位|职务|role|时间|起止时间|date|项目名称|项目|公司|单位|名称)\s*:\s*(.+)$/i;
  const datePart = '(?:19|20)\\d{2}(?:\\s*[./年-]\\s*\\d{1,2}\\s*月?)?';
  const dateRange = new RegExp(datePart + '\\s*(?:[-–—~至到]+|\\bto\\b)\\s*(?:' + datePart + '|至今|现在|present|current)', 'i');
  const bullet = /^(?:[-*•●⚫○◉▪◦·\uf0b7]\s*|[（(]?\d{1,2}[).、．）]\s*)/;
  const action = /^(?:负责|主导|参与|协助|完成|设计|开发|构建|搭建|推进|使用|通过|基于|撰写|维护|组织|梳理|跟进|优化|实现|收集|分析|输出|管理|支持|协调|(?:built|led|designed|developed|implemented|managed|created|improved)\b)/i;
  const education = /大学|学院|本科|硕士|博士|学士|专业|university|college|bachelor|master|phd/i;
  const school = /大学|学院|学校|university|college|school/i;
  const role = /实习生|研究员|分析师|工程师|产品经理|助理|组长|负责人|开发者|成员|设计师|intern\b|analyst\b|engineer\b|designer\b|manager\b|developer\b|assistant\b/i;
  const headingEdge = /^[\s|—–:：·•■◆#【\[]+|[\s|—–:：·•■◆#】\]]+$/g;

  const normalize = value => value.normalize('NFKC').replace(/[\u200b\u200c\u200d\ufeff]/g, '');
  const compactChinese = value => value.replace(/([\u3400-\u9fff])\s+(?=[\u3400-\u9fff])/g, '$1');
  const trimEdges = value => value.replace(headingEdge, '').trim();

  function identifySection(line) {
    const separated = line.match(/^([^:]+)(?::\s*(.*))?$/);
    if (!separated) return null;
    const name = compactChinese(trimEdges(separated[1]));
    if (name === '项目' && separated[2]) return null;
    const type = sectionAliases.find(([pattern]) => pattern.test(name))?.[1];
    return type && { type, detail: separated[2] || '' };
  }

  function classify(title, position, active) {
    const text = title + ' ' + position;
    if (active === 'mixed-projects') {
      return /科研|课题|论文|学术|毕业设计|research|thesis/i.test(text) ? '学术经历' : '个人项目';
    }
    if (active && active !== 'intro') return active;
    if (/实习|有限公司|公司|internship|intern\b/i.test(text)) return '实习经历';
    if (/比赛|竞赛|竞标|competition|hackathon/i.test(text)) return '比赛经历';
    if (/学术|课题|论文|research project/i.test(text)) return '学术经历';
    return '个人项目';
  }

  function isTitle(text) {
    return !!text && text.length <= 80 && !bullet.test(text) && !action.test(text) &&
      !/[。；！?!]/.test(text) && !/@|https?:\/\//i.test(text);
  }

  function addLayoutLine(items, raw, line, mergeWrapped) {
    const previous = items.at(-1);
    const value = raw.replace(bullet, '').trim() || raw;
    if (mergeWrapped && previous && !bullet.test(line) && !action.test(line) &&
        !/[。！？.!?；;]$/.test(previous) && previous.length >= 32) {
      items[items.length - 1] = previous + (/[a-z0-9]$/i.test(previous) && /^[a-z]/i.test(value) ? ' ' : '') + value;
    } else items.push(value);
  }

  function entryFromLine(text, date) {
    const title = trimEdges(date ? text.replace(date, '') : text);
    const columns = title.split(/\s*\|\s*|\s+[·•]\s+| {2,}|\t+/).map(trimEdges).filter(Boolean);
    if (columns.length < 2) {
      const possible = title.match(/^(.*(?:公司|团队|实验室|项目|社团|中心|研究所))\s+(.+)$/);
      if (possible && role.test(possible[2])) return { name: possible[1], role: possible[2], date };
      const plain = title.match(/^(.+?)\s+([^ ]*(?:实习生|工程师|分析师|助理|研究员|组长|成员))$/);
      if (plain) return { name: plain[1], role: plain[2], date };
    }
    return { name: columns[0] || '', role: columns.slice(1).join(' · '), date };
  }

  function organize(text, filename, { materialHasLayout = false } = {}) {
    const profile = { name: '', phone: '', email: '', education: '', skills: '' };
    const sections = { education: [], skills: [] };
    const records = [];
    const unclassified = [];
    const rawLines = text.split(/\r?\n/);
    const lines = rawLines.map((raw, i) => ({
      raw: raw.trim(),
      line: normalize(raw.trim()).replace(/^#{1,6}\s+/, '').replace(/^\*\*(.*?)\*\*$/, '$1').trim(),
      markdownHeading: /^#{2,6}\s+/.test(raw.trim()),
      gap: i > 0 && !rawLines[i - 1]?.trim()
    })).filter(item => item.line);
    let section = 'intro';
    let record;
    const flush = () => {
      if (record && (record.points.length || record.name && (record.date || record.role))) records.push(record);
      record = null;
    };
    const newRecord = (header, raw) => {
      flush();
      record = { section: classify(header.name, header.role, section), ...header, points: [], source: [raw] };
    };
    const append = (raw, line) => {
      if (!record) newRecord({ name: '', role: '', date: '' }, raw);
      else record.source.push(raw);
      addLayoutLine(record.points, raw, line, materialHasLayout);
    };

    for (const [index, { raw, line, markdownHeading, gap }] of lines.entries()) {
      const heading = identifySection(line);
      if (heading) {
        flush();
        section = heading.type;
        if (heading.detail && sections[section]) sections[section].push(heading.detail);
        else if (heading.detail && section !== 'intro') append(heading.detail, heading.detail);
        continue;
      }
      const field = line.match(fields);
      const label = field?.[1].toLowerCase() || '';
      if (/^姓名|^name$/.test(label)) { profile.name ||= field[2]; continue; }
      if (/电话|手机|^phone$/.test(label)) { profile.phone ||= field[2]; continue; }
      if (/邮箱|mail/.test(label)) { profile.email ||= field[2]; continue; }
      if (sections[section]) {
        addLayoutLine(sections[section], raw, line, materialHasLayout && section === 'skills');
        continue;
      }

      const date = line.match(dateRange)?.[0] || '';
      const nameField = /^(项目名称|项目|公司|单位|名称)$/.test(label);
      const roleField = /^(角色|职位|职务|role)$/.test(label);
      const dateField = /^(时间|起止时间|date)$/.test(label);
      const headingText = trimEdges(line.replace(date || /$^/, ''));
      const next = lines[index + 1]?.line || '';
      if (section === 'intro' && !record && date && school.test(headingText) && education.test(line) &&
          isTitle(headingText)) {
        sections.education.push(raw);
        continue;
      }
      if (section === 'intro' && !record && /^(?:技能|工具|技术栈|工具栈|languages|tools|technologies)\s*:/i.test(line)) {
        sections.skills.push(raw);
        continue;
      }
      if (roleField || dateField || date && !headingText) {
        if (!record) newRecord({ name: '', role: '', date: '' }, raw);
        else record.source.push(raw);
        if (roleField) record.role = field[2];
        else record.date = date || field?.[2] || '';
        continue;
      }
      const looksLikeEntry = nameField || (isTitle(headingText) && (
        !!date || markdownHeading ||
        (section !== 'intro' && (bullet.test(next) || dateRange.test(next) || role.test(next) && isTitle(next)) &&
          (!record || gap || /公司|项目|实验室|团队|研究所|实习|比赛|竞赛/.test(headingText)))
      ));
      if (looksLikeEntry) {
        newRecord(entryFromLine(field?.[2] || line, date), raw);
      } else if (record && !record.role && !record.points.length && isTitle(line) && role.test(line)) {
        record.role = raw;
        record.source.push(raw);
      } else if (section !== 'intro' || record) append(raw, line);
      else unclassified.push(raw);
    }
    flush();

    const normalized = normalize(text);
    const email = normalized.match(/[\w.+-]+@(?:[\w-]+\.)+[A-Za-z]{2,}/);
    const phone = normalized.match(/(?:\+?86[- ]?)?1[3-9](?:[- ]?\d){9}(?!\d)/);
    const candidate = compactChinese(unclassified[0] || '').trim();
    const chineseName = /^[\u3400-\u9fff·]{2,5}$/.test(candidate) && !/简历|候选人|个人/.test(candidate);
    const latinName = /^(?:\p{Lu}[\p{Ll}\p{M}'’-]+\s+){1,4}\p{Lu}[\p{Ll}\p{M}'’-]+$/u.test(candidate) &&
      !/resume|résumé|curriculum|vitae|engineer|manager|designer|developer/i.test(candidate);
    if (!profile.name && (email || phone) && (chineseName || latinName)) profile.name = candidate;
    profile.phone ||= phone?.[0] || '';
    profile.email ||= email?.[0] || '';
    profile.education = [...new Set(sections.education)].join('\n');
    profile.skills = [...new Set(sections.skills)].join('\n');

    if (!records.length && !profile.education && !profile.skills) {
      const points = unclassified.filter(raw => {
        const line = normalize(raw);
        return raw !== profile.name && compactChinese(raw) !== profile.name &&
          !/^(?:个人)?简历$|^r[ée]sum[ée]$|^curriculum vitae$/i.test(line) &&
          (!email || !line.includes(email[0])) && (!phone || !line.includes(phone[0]));
      });
      if (points.length) records.push({
        name: '', role: '', date: '', section: classify('', points.join(' '), section), points, source: points
      });
    }
    const name = filename.replace(/\.[^.]+$/, '');
    return {
      profile,
      records: records.map(({ source, ...entry }) => ({
        ...entry, name: entry.name || name, sourceText: [...new Set(source)].join('\n')
      }))
    };
  }

  window.CareerCraftOrganizer = { organize };
})();
