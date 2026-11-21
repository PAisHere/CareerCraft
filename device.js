(() => {
  let active;

  function notify(id, event, details = {}) {
    window.dispatchEvent(new CustomEvent('careercraft-device', {
      detail: { id, event, ...details }
    }));
  }

  function release(session) {
    try { session.recognition?.stop(); } catch {}
    session.stream?.getTracks().forEach(track => track.stop());
    if (active === session) active = null;
  }

  function transcribe(session) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const unavailable = () => notify(session.id, 'transcription-unavailable');
    if (!Recognition) return unavailable();
    const recognition = new Recognition();
    session.recognition = recognition;
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = ({ results }) => {
      let text = '', interim = '';
      for (const result of results) {
        if (result.isFinal) text += result[0].transcript;
        else interim += result[0].transcript;
      }
      if (!session.cancelled) notify(session.id, 'transcript', { text, interim });
    };
    recognition.onerror = ({ error }) => {
      if (!session.cancelled && !['aborted', 'no-speech'].includes(error)) unavailable();
    };
    try { recognition.start(); } catch { unavailable(); }
  }

  async function record(id, autoTranscribe) {
    if (active) return notify(id, 'error', { message: '已有录音正在进行' });
    const session = { id, cancelled: false, chunks: [] };
    active = session;
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        throw new Error('浏览器无法录音，可直接填写文字。');
      }
      session.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (session.cancelled) return release(session);
      const type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm']
        .find(candidate => MediaRecorder.isTypeSupported(candidate));
      const recorder = new MediaRecorder(session.stream, type ? { mimeType: type } : {});
      session.recorder = recorder;
      recorder.ondataavailable = ({ data }) => {
        if (data.size) session.chunks.push(data);
      };
      recorder.onstop = () => {
        const audio = new Blob(session.chunks, { type: recorder.mimeType });
        release(session);
        if (!session.cancelled) notify(id, 'finished', { audio });
      };
      recorder.onerror = () => {
        session.cancelled = true;
        release(session);
        notify(id, 'error', { message: '录音中断，请重试或直接填写文字。' });
      };
      recorder.start(250);
      notify(id, 'recording');
      if (autoTranscribe) transcribe(session);
    } catch (error) {
      release(session);
      const message = error.name === 'NotAllowedError' ? '麦克风未获授权，可直接填写文字。'
        : error.name === 'NotFoundError' ? '没有找到麦克风，可直接填写文字。'
        : error.message || '无法开始录音，可直接填写文字。';
      if (!session.cancelled) notify(id, 'error', { message });
    }
  }

  function stop(id, cancel = false) {
    const session = active;
    if (!session || session.id !== id) return;
    session.cancelled = cancel;
    try {
      if (session.recorder?.state === 'recording') session.recorder.stop();
      else release(session);
    } catch {
      release(session);
      if (!cancel) notify(id, 'error', { message: '无法保存录音，可直接填写文字。' });
    }
  }

  function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').slice(0, 120);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  async function copy(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      if (!field) return false;
      field.focus();
      field.select();
      try { return document.execCommand('copy'); } catch { return false; }
    }
  }

  window.CareerCraftDevice = { record, stop, download, copy };
  window.addEventListener('pagehide', () => {
    if (active) stop(active.id, true);
  });
})();
