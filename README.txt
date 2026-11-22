CareerCraft · 求职工作台

开始使用
1. Windows 双击 Start CareerCraft.cmd，或按下方命令启动本地工作台。
2. 在“资料录入”选择或拖入文件。读取完成后，点击“查看整理结果”，
   在“经历库”核对、修改个人资料和各段经历。也可点击“试用示例资料”。
3. 选择求职方向，生成通用简历。如有目标岗位，在“JD 定制”添加职位描述。
4. 核对匹配报告和诊断建议，从“投递材料”下载 PDF 和可选的求职信 TXT。

本地服务
需要 Node.js 22.13 或更新的 Node.js 22 LTS，或 Node.js 24 及以上。在此目录运行：

  npm ci --ignore-scripts
  npm start

浏览器打开 http://127.0.0.1:8787/。依赖首次安装时下载，识别时可以离线使用。
直接打开 index.html 仍可手动录入及导入 DOCX、TXT、Markdown。
PDF 和图片自动识别需要本地工作台。两个入口各自保存浏览器草稿。

DeepSeek 模型接入（可选，已实测）
已用真实 DeepSeek API 和虚构资料验证 deepseek-flash 的通用简历筛选、JD 定制和证据匹配。

1. 将仓库根目录的 .env.example 复制为 .env，并填写自己的 CAREERCRAFT_API_KEY。
   模板已填好 DeepSeek 官方 API 地址和 deepseek-flash 模型名。
2. 运行 npm start，或在 Windows 双击 Start CareerCraft.cmd。服务启动时会自动读取 .env。
   修改配置后需要重启服务。
3. 在网页的“生成设置”确认目标服务，勾选同意并保存。可先使用“试用示例资料”。

仓库提供空白密钥模板，实际密钥由每位使用者在本地配置。.env 已加入 Git 忽略规则，
密钥由服务端读取。DeepSeek 密钥留空时仍可使用本地规则。终端中已设置的同名环境变量
优先于 .env。

Windows 也可将 Start CareerCraft DeepSeek.example.cmd 复制为
Start CareerCraft DeepSeek.local.cmd，把 set "CAREERCRAFT_API_KEY=********" 中的星号
换成自己的密钥，再双击本地脚本启动。这个 .local.cmd 同样由 Git 忽略。

也可以将 CAREERCRAFT_API_BASE 和 CAREERCRAFT_MODEL 换成支持 OpenAI Chat Completions
和 JSON 输出的服务。例如本机模型服务可使用 http://127.0.0.1:11434/v1 及已安装的模型名，
并按该服务的认证要求设置密钥。

模型服务接收筛选所需的经历名称和要点、岗位方向、JD 条目和侧重点。模型返回要点 ID
和引用，应用会核对引用是否来自资料。简历和求职信基于已有事实组织内容。模型调用失败
时会自动回退到本地规则。

材料和导出
- PDF 优先提取文字层，扫描页自动使用 OCR。PNG、JPG、WebP、BMP、GIF 和 AVIF
  支持简体中文和英文 OCR，文件内容在浏览器中处理，无需模型 API。
- 也支持 DOCX、TXT 和 Markdown。识别出的教育经历、技能、实习和项目等会进入
  经历库，整理规则会保留原文，未识别的字段可以手动填写。
- 单个文件最大 20 MB，PDF 最多读取前 20 页。模糊图片、复杂分栏和加密 PDF
  可能需要重新上传清晰或解锁后的材料，也可补充文字或语音。
- 浏览器允许录音后，可回放、重录、编辑转写和确认保存。自动转写需单独启用，
  依赖浏览器能力，可能联网。也可以在语音窗口手动输入文字。
- 简历采用固定单栏 A4 模板，新增或导出前检查是否超出一页。
  PDF 是图片型文件，有些招聘系统无法自动提取文字。
- 已确认的文字和草稿保存在当前浏览器。原始文件与音频只在当前页面会话可用，
  草稿可在“生成设置”中清空。
