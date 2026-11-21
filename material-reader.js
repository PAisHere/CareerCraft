(() => {
  const MAX_PAGES = 20;
  const MAX_TEXT = 50_000;
  const ROOT = '/reader/';
  const imageTypes = /^(?:jpe?g|png|webp|bmp|gif|avif)$/i;
  const readableImages = /^(?:image\/(?:jpeg|png|webp|bmp|gif|avif|x-ms-bmp))$/i;
  const asset = path => new URL(ROOT + path, location.href).href;
  const usefulLength = text => (text.match(/[\p{L}\p{N}]/gu) || []).length;
  const failure = (code, message) => Object.assign(new Error(message), { code });

  function mediaKind(file) {
    if (file.type === 'application/pdf' || /\.pdf$/i.test(file.name)) return 'pdf';
    if (readableImages.test(file.type) || imageTypes.test(file.name.split('.').pop())) return 'image';
    return null;
  }

  function cleanText(value) {
    return value.replace(/[\u0000-\u0008\u000b\u000e-\u001f\ufffd]/g, '')
      .replace(/\r\n?/g, '\n').trim();
  }

  // A timeout also covers worker setup, which can stall on older browsers.
  async function waitFor(promise, signal, timeout, message) {
    let abort;
    let timer;
    const stop = new Promise((_, reject) => {
      abort = () => reject(signal.reason);
      timer = setTimeout(() => reject(new Error(message)), timeout);
      signal?.addEventListener('abort', abort, { once: true });
      if (signal?.aborted) abort();
    });
    try {
      return await Promise.race([promise, stop]);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
    }
  }

  async function loadEngine(path) {
    try {
      return await import(asset(path));
    } catch {
      throw failure('reader-unavailable', '识别组件未加载。请关闭旧服务，再双击 Start CareerCraft.cmd 启动。');
    }
  }

  function createOcrSession(signal, onStatus) {
    let worker;
    let pending;
    let closed = false;
    let pageLabel = '';
    let workerFailure;
    return {
      async read(canvas, label = '') {
        pageLabel = label;
        if (!worker) {
          onStatus('正在准备本地文字识别…');
          const engine = (await loadEngine('ocr/tesseract.mjs')).default;
          signal?.throwIfAborted();
          let failWorker;
          workerFailure = new Promise((_, reject) => { failWorker = reject; });
          pending = engine.createWorker(['chi_sim', 'eng'], 1, {
            workerPath: asset('ocr/worker.min.js'),
            corePath: asset('ocr/core'),
            langPath: asset('ocr/lang'),
            workerBlobURL: false,
            errorHandler: () => failWorker(new Error('本地 OCR 组件无法完成识别。')),
            logger: ({ status, progress }) => {
              if (status === 'recognizing text' && !closed && !signal?.aborted) {
                onStatus('正在识别' + (pageLabel || '图片') + ' · ' + Math.round(progress * 100) + '%');
              }
            }
          });
          worker = await waitFor(Promise.race([pending, workerFailure]), signal, 45_000, '本地识别组件启动超时。');
          await waitFor(Promise.race([workerFailure, worker.setParameters({
            tessedit_pageseg_mode: engine.PSM.AUTO, preserve_interword_spaces: '1'
          })]), signal, 15_000, '本地 OCR 组件设置超时。');
        }
        onStatus('正在识别' + (pageLabel || '图片') + '…');
        const result = await waitFor(Promise.race([workerFailure, worker.recognize(canvas, { rotateAuto: true })]), signal, 60_000,
          '文字识别超时，请尝试更清晰或更小的图片。');
        return cleanText(result.data.text);
      },
      close() {
        closed = true;
        pending?.then(value => value.terminate(), () => {}).catch(() => {});
      }
    };
  }

  function canvasOf(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    return canvas;
  }

  async function decodeImage(file) {
    if (typeof createImageBitmap === 'function') {
      try { return await createImageBitmap(file); } catch {}
    }
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      return image;
    } catch {
      throw failure('image-invalid', '图片打不开，请转换为 PNG 或 JPG 后重新上传。');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function readImage(file, ocr, signal) {
    const image = await decodeImage(file);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;
    const side = Math.max(width, height);
    const scale = Math.min(2800 / side, Math.sqrt(5_000_000 / (width * height)), Math.max(1, Math.min(2, 1600 / side)));
    const canvas = canvasOf(width * scale, height * scale);
    try {
      signal?.throwIfAborted();
      const context = canvas.getContext('2d', { alpha: false });
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const text = await ocr.read(canvas);
      return { text: usefulLength(text) >= 3 ? text : '', method: '图片 OCR', notes: [] };
    } finally {
      image.close?.();
      canvas.width = canvas.height = 1;
    }
  }

  function textFromItems(items, viewport) {
    const fragments = items.filter(item => item.str?.trim()).map(item => {
      const [x, y] = viewport.convertToViewportPoint(item.transform[4], item.transform[5]);
      return { x, y, width: item.width, height: item.height, text: item.str };
    }).sort((a, b) => a.y - b.y || a.x - b.x);
    const rows = [];
    for (const fragment of fragments) {
      const last = rows.at(-1);
      if (last && Math.abs(fragment.y - last.y) <= Math.max(2, Math.min(fragment.height, 15) * .35)) {
        last.parts.push(fragment);
      } else rows.push({ y: fragment.y, parts: [fragment] });
    }
    return cleanText(rows.map(row => {
      let right = null;
      return row.parts.sort((a, b) => a.x - b.x).map(part => {
        const gap = right === null ? 0 : part.x - right;
        right = Math.max(right ?? 0, part.x + part.width);
        const separator = gap > Math.max(52, viewport.width * .11) ? '  '
          : gap > Math.max(1.5, part.height * .18) ? ' ' : '';
        return separator + part.text;
      }).join('');
    }).join('\n'));
  }

  async function scanPage(page, ocr, label, signal) {
    const view = page.getViewport({ scale: 1 });
    const scale = Math.min(3.1, 2600 / Math.max(view.width, view.height));
    const viewport = page.getViewport({ scale });
    const canvas = canvasOf(viewport.width, viewport.height);
    const rendering = page.render({ canvas, viewport, background: '#fff' });
    try {
      await waitFor(rendering.promise, signal, 25_000, '扫描页处理超时。');
      return await ocr.read(canvas, label);
    } finally {
      rendering.cancel();
      canvas.width = canvas.height = 1;
    }
  }

  async function readPdf(file, ocr, signal, onStatus) {
    const pdf = await loadEngine('pdf/pdf.mjs');
    pdf.GlobalWorkerOptions.workerSrc = asset('pdf/pdf.worker.mjs');
    const data = new Uint8Array(await file.arrayBuffer());
    signal?.throwIfAborted();
    const loading = pdf.getDocument({
      data, isEvalSupported: false, useWorkerFetch: true,
      cMapUrl: asset('pdf/cmaps/'), cMapPacked: true,
      standardFontDataUrl: asset('pdf/standard_fonts/'),
      iccUrl: asset('pdf/iccs/'), wasmUrl: asset('pdf/wasm/'),
      maxImageSize: 25_000_000, canvasMaxAreaInBytes: 64_000_000
    });
    let passwordRequired = false;
    const notes = [];
    const unread = [];
    const pages = [];
    let ocrPages = 0;
    let textLength = 0;
    let ocrUnavailable;
    loading.onPassword = () => {
      passwordRequired = true;
      loading.destroy().catch(() => {});
    };
    try {
      const document = await waitFor(loading.promise, signal, 25_000, 'PDF 打开超时。');
      const count = Math.min(document.numPages, MAX_PAGES);
      if (document.numPages > MAX_PAGES) notes.push('本次最多读取前 ' + MAX_PAGES + ' 页。');
      for (let number = 1; number <= count; number += 1) {
        signal?.throwIfAborted();
        if (textLength >= MAX_TEXT) {
          notes.push('文字已达到 50,000 字上限。');
          break;
        }
        const label = '第 ' + number + '/' + count + ' 页';
        onStatus('正在读取 PDF · ' + label);
        let text = '';
        let page;
        try {
          page = await waitFor(document.getPage(number), signal, 25_000, 'PDF 页面读取超时。');
          try {
            const content = await waitFor(page.getTextContent(), signal, 25_000, 'PDF 文字层读取超时。');
            text = textFromItems(content.items, page.getViewport({ scale: 1 }));
          } catch { signal?.throwIfAborted(); }
          if (usefulLength(text) < 25) {
            if (ocrUnavailable) throw ocrUnavailable;
            try {
              const scanned = await scanPage(page, ocr, label, signal);
              if (usefulLength(scanned) >= Math.max(3, usefulLength(text))) {
                text = scanned;
                ocrPages += 1;
              } else if (!text) unread.push(number);
            } catch (error) {
              if (/组件|超时/.test(error.message)) ocrUnavailable = error;
              throw error;
            }
          }
        } catch (error) {
          signal?.throwIfAborted();
          unread.push(number);
        } finally {
          page?.cleanup();
        }
        if (text && usefulLength(text) >= 3) {
          pages.push(text);
          textLength += text.length + 2;
        }
      }
      if (unread.length) notes.push('第 ' + unread.join('、') + ' 页未能完整读取。');
      if (ocrUnavailable) notes.push(ocrUnavailable.message);
      return { text: pages.join('\n\n'), method: ocrPages ? 'PDF 文字 / OCR' : 'PDF 文字层', notes };
    } catch (error) {
      if (passwordRequired) throw failure('pdf-password', 'PDF 需要密码，请上传解锁后的副本。');
      if (error.name === 'InvalidPDFException') throw failure('pdf-invalid', '此文件无法作为 PDF 打开。');
      throw error;
    } finally {
      await loading.destroy().catch(() => {});
    }
  }

  async function read(file, { signal, onStatus = () => {} } = {}) {
    const kind = mediaKind(file);
    if (!kind) throw new Error('请选择 PDF、PNG、JPG、WebP、BMP、GIF 或 AVIF。');
    if (location.protocol === 'file:') {
      throw failure('local-launch', '当前是直接打开的 index.html。请双击 Start CareerCraft.cmd，再在本地工作台重新上传。');
    }
    const ocr = createOcrSession(signal, onStatus);
    try {
      return kind === 'pdf' ? await readPdf(file, ocr, signal, onStatus) : await readImage(file, ocr, signal);
    } finally {
      ocr.close();
    }
  }

  window.CareerCraftReader = { mediaKind, read };
})();
