/* ================= ENGINE =================
   Tiện ích chung, âm thanh, giọng đọc, hình SVG,
   phản hồi, pháo giấy và các kiểu tương tác.
=========================================== */
const Game = (() => {
  'use strict';

  /* ---------- tiện ích ngẫu nhiên ---------- */
  const rnd = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rnd(arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1);[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (arr, k) => shuffle(arr).slice(0, k);
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const uid = (() => { let i = 0; return () => 'g' + (++i); })();

  /* ---------- tạo phần tử ---------- */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- âm thanh (Web Audio, không cần file) ---------- */
  let soundOn = true;
  let AC = null;
  function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } } return AC; }
  function tone(freq, dur, type = 'sine', when = 0, vol = 0.18) {
    if (!soundOn) return;
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq;
    o.connect(g); g.connect(c.destination);
    const t = c.currentTime + when;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }
  const sfx = {
    good() { tone(660, .12, 'triangle', 0); tone(880, .16, 'triangle', .1); tone(1180, .22, 'triangle', .22); },
    win() {[523, 659, 784, 1047].forEach((f, i) => tone(f, .22, 'triangle', i * .13, .2)); },
    bad() { tone(300, .18, 'sawtooth', 0, .12); tone(220, .22, 'sawtooth', .12, .12); },
    tap() { tone(520, .06, 'sine', 0, .12); },
    click() { tone(700, .05, 'square', 0, .08); }
  };

  /* ---------- giọng đọc tiếng Việt ---------- */
  let viVoice = null;
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    viVoice = vs.find(v => /vi[-_]?VN/i.test(v.lang) || /vietnam/i.test(v.name)) || null;
  }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function speak(text) {
    if (!soundOn || !('speechSynthesis' in window) || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN'; u.rate = 0.92; u.pitch = 1.08;
      if (viVoice) u.voice = viVoice;
      speechSynthesis.speak(u);
    } catch (e) { }
  }

  /* ---------- hình SVG (cho quy luật màu sắc / hình khối) ---------- */
  const COLORS = {
    red: '#e53935', orange: '#fb8c00', yellow: '#fdd835', green: '#43a047',
    blue: '#1e88e5', purple: '#8e24aa', pink: '#ec407a', teal: '#00acc1'
  };
  const COLOR_KEYS = Object.keys(COLORS);
  const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
  function shapeSVG(shape, color, size = 46) {
    const c = COLORS[color] || color || '#888';
    const s = size, m = s / 2;
    let inner = '';
    if (shape === 'circle') inner = `<circle cx="${m}" cy="${m}" r="${m - 3}" fill="${c}"/>`;
    else if (shape === 'square') inner = `<rect x="4" y="4" width="${s - 8}" height="${s - 8}" rx="6" fill="${c}"/>`;
    else if (shape === 'triangle') inner = `<polygon points="${m},4 ${s - 4},${s - 5} 4,${s - 5}" fill="${c}"/>`;
    else if (shape === 'diamond') inner = `<polygon points="${m},3 ${s - 3},${m} ${m},${s - 3} 3,${m}" fill="${c}"/>`;
    else if (shape === 'hexagon') { const r = m - 3; let p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; p.push((m + r * Math.cos(a)).toFixed(1) + ',' + (m + r * Math.sin(a)).toFixed(1)); } inner = `<polygon points="${p.join(' ')}" fill="${c}"/>`; }
    else if (shape === 'cross') inner = `<path d="M${m - 6} 5 h12 v${m - 11} h${m - 11} v12 h-${m - 11} v${m - 11} h-12 v-${m - 11} h-${m - 11} v-12 h${m - 11} z" fill="${c}"/>`;
    else if (shape === 'star') {
      const pts = starPoints(m, m, m - 3, (m - 3) * 0.45, 5);
      inner = `<polygon points="${pts}" fill="${c}"/>`;
    } else if (shape === 'heart') {
      inner = `<path transform="translate(${m},${m + 3}) scale(${(s - 6) / 32})" d="M0 8 C0 -2 -14 -6 -14 4 C-14 12 -2 18 0 20 C2 18 14 12 14 4 C14 -6 0 -2 0 8 Z" fill="${c}"/>`;
    }
    return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }
  function starPoints(cx, cy, R, r, n) {
    let p = [];
    for (let i = 0; i < n * 2; i++) {
      const ang = -Math.PI / 2 + i * Math.PI / n;
      const rad = i % 2 ? r : R;
      p.push((cx + rad * Math.cos(ang)).toFixed(1) + ',' + (cy + rad * Math.sin(ang)).toFixed(1));
    }
    return p.join(' ');
  }
  // vẽ một "glyph" = emoji hoặc hình có màu
  function glyph(g, size = 46) {
    if (!g) return '';
    if (typeof g === 'string') return `<span class="em" style="font-size:${size}px">${g}</span>`;
    if (g.html) return `<span class="artwrap">${g.html}</span>`;   // SVG minh hoạ tự vẽ
    if (g.emoji) return `<span class="em" style="font-size:${size}px">${g.emoji}</span>`;
    return shapeSVG(g.shape, g.color, size);
  }
  const glyphKey = (g) => typeof g === 'string' ? g : (g.html ? (g._k || 'html') : (g.emoji || (g.shape + ':' + g.color)));

  /* ---------- scene builders (bản sao trung thực theo sách) ---------- */
  function tableSVG() {
    return `<svg class="tbl-graphic" viewBox="0 0 190 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="180" height="16" rx="5" fill="#c8925a"/>
      <rect x="5" y="6" width="180" height="7" rx="4" fill="#dcae7c"/>
      <rect x="20" y="22" width="11" height="46" rx="3" fill="#a5703c"/>
      <rect x="159" y="22" width="11" height="46" rx="3" fill="#a5703c"/>
    </svg>`;
  }
  function jarSVG() {
    return `<svg viewBox="0 0 130 150" width="130" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect x="42" y="6" width="46" height="12" rx="3" fill="#b0863f"/>
      <path d="M30 20 h70 a10 10 0 0 1 10 10 v96 a14 14 0 0 1 -14 14 h-62 a14 14 0 0 1 -14 -14 v-96 a10 10 0 0 1 10 -10 z"
            fill="#bfe3f7" stroke="#8fc4e0" stroke-width="3" opacity=".7"/>
      <path d="M22 46 q8 6 0 12" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>
    </svg>`;
  }
  const Scenes = {
    table(topItems, underItems) {
      return `<div class="tbl-scene">
        <div class="tbl-top">${topItems.map(g => glyph(g, 46)).join('')}</div>
        ${tableSVG()}
        <div class="tbl-under">${underItems.map(g => glyph(g, 46)).join('')}</div>
      </div>`;
    },
    jar(inside) {
      return `<div class="jar-scene"><div class="jar">${jarSVG()}<span class="jar-inside">${typeof inside === 'string' ? inside : glyph(inside, 52)}</span></div></div>`;
    },
    stack(items) {
      return `<div class="stack-frame">${items.map(g => `<div class="cell">${glyph(g, 44)}</div>`).join('')}</div>`;
    },
    row(items) {
      return `<div class="stack-frame" style="flex-direction:row">${items.map(g => `<div class="cell">${glyph(g, 44)}</div>`).join('')}</div>`;
    },
    grid3(cells, blocksIdx) {
      const labels = ['', '', '', '', '', '', '', '', ''];
      return `<div class="grid3">${cells.map((c, i) => `<div class="g3cell">${glyph(c, 34)}</div>`).join('')}</div>`;
    }
  };

  /* ---------- panda mascot (SVG đơn giản) ---------- */
  function pandaSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="20" rx="12" ry="12" fill="#2b2b2b"/>
      <ellipse cx="76" cy="20" rx="12" ry="12" fill="#2b2b2b"/>
      <circle cx="50" cy="55" r="38" fill="#fff" stroke="#e0e0e0" stroke-width="2"/>
      <ellipse cx="34" cy="50" rx="11" ry="13" fill="#2b2b2b"/>
      <ellipse cx="66" cy="50" rx="11" ry="13" fill="#2b2b2b"/>
      <circle cx="35" cy="51" r="5" fill="#fff"/><circle cx="65" cy="51" r="5" fill="#fff"/>
      <circle cx="36" cy="52" r="2.6" fill="#1a1a1a"/><circle cx="64" cy="52" r="2.6" fill="#1a1a1a"/>
      <ellipse cx="50" cy="66" rx="6" ry="4.5" fill="#2b2b2b"/>
      <path d="M50 70 Q42 78 34 73" stroke="#2b2b2b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M50 70 Q58 78 66 73" stroke="#2b2b2b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="62" r="6" fill="#ffcdd2"/><circle cx="78" cy="62" r="6" fill="#ffcdd2"/>
    </svg>`;
  }

  /* ---------- phản hồi + pháo giấy ---------- */
  const feedbackLayer = () => document.getElementById('feedback');
  const GOOD_WORDS = ['Giỏi quá!', 'Đúng rồi!', 'Tuyệt vời!', 'Xuất sắc!', 'Hay lắm!', 'Chính xác!', 'Bé thông minh ghê!'];
  const BAD_WORDS = ['Gần đúng rồi!', 'Thử lại nhé!', 'Ơ, chưa đúng!', 'Cố lên nào!'];
  function toast(good) {
    const layer = feedbackLayer(); if (!layer) return;
    const word = good ? pick(GOOD_WORDS) : pick(BAD_WORDS);
    const t = el('div', 'toast ' + (good ? 'good' : 'bad'));
    t.innerHTML = `<span class="face">${good ? '🎉' : '💪'}</span>${word}`;
    layer.appendChild(t);
    good ? sfx.good() : sfx.bad();
    speak(word);
    setTimeout(() => t.remove(), 1100);
  }
  function confetti() {
    const cols = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa', '#ec407a'];
    for (let i = 0; i < 80; i++) {
      const c = el('div', 'confetti');
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = pick(cols);
      c.style.animation = `fall ${1.6 + Math.random() * 1.6}s linear ${Math.random() * .4}s forwards`;
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }

  /* ---------- bộ chạy bài học ---------- */
  let session = null; // {lesson, questions, idx, correct, onExit}
  const $ = (id) => document.getElementById(id);

  function startSession(lesson, onExit) {
    // sinh câu hỏi (mỗi lần chơi lại là ngẫu nhiên mới)
    const questions = lesson.build();
    session = { lesson, questions, idx: 0, correct: 0, firstTry: true, onExit };
    $('playTitle').textContent = lesson.title;
    renderStars(questions.length, 0);
    renderQuestion();
  }
  function renderStars(total, on) {
    const row = $('starsRow'); row.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const s = el('span', 's' + (i < on ? ' on' : ''), '⭐');
      row.appendChild(s);
    }
    $('progressFill').style.width = (on / total * 100) + '%';
  }

  function renderQuestion() {
    const s = session; if (!s) return;
    s.firstTry = true;
    const q = s.questions[s.idx];
    const body = $('playBody'); body.innerHTML = '';

    // câu dẫn (có nút loa)
    const p = el('div', 'prompt');
    p.innerHTML = `<span>${q.prompt}</span><span class="say" title="Nghe">🔊</span>`;
    p.querySelector('.say').onclick = () => speak(stripEmoji(q.prompt));
    body.appendChild(p);
    speak(stripEmoji(q.prompt));

    const host = el('div'); host.style.flex = '1'; body.appendChild(host);
    RENDERERS[q.type](q, host);
  }
  const stripEmoji = (t) => t.replace(/<[^>]+>/g, '').replace(/[\p{Emoji_Presentation}☀-➿✕✓]/gu, '').replace(/\s+/g, ' ').trim();

  // gọi khi trả lời xong 1 câu
  function answered(ok) {
    const s = session;
    if (ok) {
      if (s.firstTry) s.correct++;
      toast(true);
      setTimeout(() => {
        s.idx++;
        renderStars(s.questions.length, s.idx);
        if (s.idx >= s.questions.length) finish();
        else renderQuestion();
      }, 950);
    } else {
      s.firstTry = false;
      toast(false);
    }
  }

  function finish() {
    const s = session;
    const total = s.questions.length;
    const score = s.correct;
    const stars = score >= total ? 3 : score >= Math.ceil(total * 0.6) ? 2 : 1;
    saveStars(s.lesson.id, stars);
    sfx.win(); confetti();
    const face = stars === 3 ? '🏆' : stars === 2 ? '🌟' : '🐼';
    const msg = stars === 3 ? 'Hoàn hảo! Bé làm đúng hết!' : stars === 2 ? 'Bé làm rất tốt!' : 'Bé đã cố gắng, chơi lại nhé!';
    speak(stars === 3 ? 'Hoàn hảo! Bé giỏi quá!' : 'Bé làm tốt lắm!');
    const body = $('playBody'); body.innerHTML = '';
    const c = el('div', 'complete');
    c.innerHTML = `
      <div class="big">${face}</div>
      <h2>Xong bài rồi!</h2>
      <div class="starline">${'⭐'.repeat(stars)}${'▫️'.repeat(3 - stars)}</div>
      <p>Đúng ${score}/${total} câu. ${msg}</p>
      <div class="btns">
        <button class="bigbtn play">🔁 Chơi lại</button>
        <button class="bigbtn next">➡️ Bài tiếp theo</button>
        <button class="bigbtn home">🏠 Về trang chủ</button>
      </div>`;
    body.appendChild(c);
    $('progressFill').style.width = '100%';
    c.querySelector('.play').onclick = () => { sfx.click(); startSession(s.lesson, s.onExit); };
    c.querySelector('.next').onclick = () => { sfx.click(); s.onExit('next', s.lesson); };
    c.querySelector('.home').onclick = () => { sfx.click(); s.onExit('home'); };
  }

  /* ---------- lưu số sao ---------- */
  const SKEY = 'kiki_stars_v1';
  function loadAllStars() { try { return JSON.parse(localStorage.getItem(SKEY) || '{}'); } catch (e) { return {}; } }
  function saveStars(id, stars) {
    const all = loadAllStars();
    if (!all[id] || stars > all[id]) { all[id] = stars; try { localStorage.setItem(SKEY, JSON.stringify(all)); } catch (e) { } }
  }

  /* ================= RENDERERS ================= */
  const RENDERERS = {};

  /* --- 1) Trắc nghiệm: câu + cảnh + đáp án --- */
  RENDERERS.mc = (q, host) => {
    if (q.sceneHTML) {
      const sc = el('div', 'scene' + (q.scenePlain ? ' plain' : ''));
      sc.innerHTML = q.sceneHTML;
      host.appendChild(sc);
    } else if (q.scene) {
      const sc = el('div', 'scene' + (q.scenePlain ? ' plain' : ''));
      if (q.sceneVertical) sc.style.flexDirection = 'column';
      sc.innerHTML = q.scene.map(g => glyph(g, q.sceneSize || 60)).join('');
      host.appendChild(sc);
    }
    const cols = q.cols || (q.options.length <= 2 ? 2 : q.options.length === 4 ? 2 : q.options.length);
    const box = el('div', 'options cols-' + cols);
    (q.noShuffle ? q.options : shuffle(q.options)).forEach(o => {
      const b = el('div', 'opt');
      let inner = '';
      if (o.emoji) inner += `<span class="em">${o.emoji}</span>`;
      else if (o.glyph) inner += glyph(o.glyph, 44);
      if (o.label) inner += `<span class="lab">${o.label}</span>`;
      b.innerHTML = inner;
      b.onclick = () => {
        if (b.classList.contains('disabled')) return;
        sfx.tap();
        if (o.correct) { b.classList.add('correct'); lockOpts(box); answered(true); }
        else { b.classList.add('wrong'); b.classList.add('disabled'); answered(false); }
      };
      box.appendChild(b);
    });
    host.appendChild(box);
  };
  const lockOpts = (box) => box.querySelectorAll('.opt').forEach(o => o.classList.add('disabled'));

  /* --- 2) Chạm chọn vật đúng (1 hoặc nhiều) --- */
  RENDERERS.tap = (q, host) => {
    const need = q.need || 1;
    let got = 0;
    const grid = el('div', 'item-grid');
    q.items.forEach(it => {
      const d = el('div', 'item');
      const sz = it.size || 60;
      d.style.padding = Math.max(8, sz * 0.18) + 'px';
      d.innerHTML = glyph(it.g, sz);
      d.onclick = () => {
        if (d.classList.contains('correct') || d.classList.contains('disabled')) return;
        sfx.tap();
        if (it.correct) {
          d.classList.add('correct'); got++;
          if (got >= need) { grid.querySelectorAll('.item').forEach(x => x.classList.add('disabled')); answered(true); }
        } else { d.classList.add('wrong'); setTimeout(() => d.classList.remove('wrong'), 500); answered(false); }
      };
      grid.appendChild(d);
    });
    host.appendChild(grid);
  };

  /* --- 3) Quy luật: dãy có ô "?" , chọn đáp án --- */
  RENDERERS.pattern = (q, host) => {
    const row = el('div', 'pattern-row');
    q.sequence.forEach(g => {
      const cell = el('div', 'pcell');
      if (g === '?') { cell.classList.add('q'); cell.textContent = '?'; }
      else cell.innerHTML = glyph(g, 42);
      row.appendChild(cell);
    });
    host.appendChild(row);
    const box = el('div', 'options cols-' + Math.min(q.options.length, 4));
    shuffle(q.options).forEach(o => {
      const b = el('div', 'opt');
      b.innerHTML = glyph(o.g, 44);
      b.onclick = () => {
        if (b.classList.contains('disabled')) return;
        sfx.tap();
        if (o.correct) {
          b.classList.add('correct'); lockOpts(box);
          // điền vào ô ?
          const qcell = row.querySelector('.pcell.q');
          if (qcell) { qcell.classList.remove('q'); qcell.innerHTML = glyph(o.g, 42); }
          answered(true);
        } else { b.classList.add('wrong', 'disabled'); answered(false); }
      };
      box.appendChild(b);
    });
    host.appendChild(box);
  };

  /* --- 4) Đếm số lượng --- */
  RENDERERS.count = (q, host) => {
    const scene = el('div', 'count-scene');
    // rải vật ngẫu nhiên không chồng nhau (đơn giản: lưới lệch)
    const n = q.items.length;
    const positions = scatter(n);
    q.items.forEach((g, i) => {
      const s = el('span', 'cem');
      s.style.left = positions[i].x + '%';
      s.style.top = positions[i].y + '%';
      s.style.fontSize = (q.emSize || 40) + 'px';
      s.innerHTML = glyph(g, q.emSize || 40);
      scene.appendChild(s);
    });
    host.appendChild(scene);
    const box = el('div', 'options cols-' + Math.min(q.options.length, 4));
    shuffle(q.options).forEach(val => {
      const b = el('div', 'opt');
      b.innerHTML = `<span class="lab" style="font-size:28px;font-weight:900">${val}</span>`;
      b.onclick = () => {
        if (b.classList.contains('disabled')) return;
        sfx.tap();
        if (val === q.answer) { b.classList.add('correct'); lockOpts(box); answered(true); }
        else { b.classList.add('wrong', 'disabled'); answered(false); }
      };
      box.appendChild(b);
    });
    host.appendChild(box);
  };
  function scatter(n) {
    // tạo lưới rồi xáo, thêm nhiễu nhỏ
    const cols = Math.ceil(Math.sqrt(n * 1.6));
    const rows = Math.ceil(n / cols);
    const cells = shuffle(range(cols * rows)).slice(0, n);
    return cells.map(c => {
      const cx = c % cols, cy = Math.floor(c / cols);
      return {
        x: 6 + cx * (86 / cols) + rnd(6),
        y: 6 + cy * (80 / rows) + rnd(6)
      };
    });
  }

  /* --- 5) Nối cặp (2 cột) — dùng cả cho tìm bóng --- */
  RENDERERS.match = (q, host) => {
    const left = q.pairs.map((p, i) => ({ g: p[0], id: i }));
    const right = shuffle(q.pairs.map((p, i) => ({ g: p[1], id: i })));
    const area = el('div', 'match-area');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'match-svg');
    const wrap = el('div', 'match-wrap');
    const colL = el('div', 'match-col'), colR = el('div', 'match-col');
    let selLeft = null, done = 0;
    const lmap = {}, rmap = {};

    left.forEach(o => {
      const d = el('div', 'match-item');
      d.innerHTML = glyph(o.g, 42); lmap[o.id] = d;
      d.onclick = () => {
        if (d.classList.contains('done')) return;
        sfx.tap();
        colL.querySelectorAll('.match-item').forEach(x => x.classList.remove('sel'));
        selLeft = o; d.classList.add('sel');
      };
      colL.appendChild(d);
    });
    right.forEach(o => {
      const d = el('div', 'match-item' + (q.shadow ? ' shadow' : ''));
      d.innerHTML = glyph(o.g, 42); rmap[o.id] = d;
      d.onclick = () => {
        if (d.classList.contains('done')) return;
        if (!selLeft) { sfx.tap(); return; }
        sfx.tap();
        if (selLeft.id === o.id) {
          const ld = lmap[o.id];
          ld.classList.add('done'); ld.classList.remove('sel'); d.classList.add('done');
          drawLine(ld, d); selLeft = null; done++;
          if (done >= left.length) answered(true);
        } else {
          d.classList.add('wrong'); const ld = lmap[selLeft.id]; ld && ld.classList.add('wrong');
          setTimeout(() => { d.classList.remove('wrong'); ld && ld.classList.remove('wrong'); }, 500);
          answered(false);
        }
      };
      colR.appendChild(d);
    });
    wrap.appendChild(colL); wrap.appendChild(colR);
    area.appendChild(svg); area.appendChild(wrap); host.appendChild(area);

    function drawLine(a, b) {
      const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect(), pr = area.getBoundingClientRect();
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', ar.right - pr.left); line.setAttribute('y1', ar.top + ar.height / 2 - pr.top);
      line.setAttribute('x2', br.left - pr.left); line.setAttribute('y2', br.top + br.height / 2 - pr.top);
      line.setAttribute('stroke', pick(['#43a047', '#1e88e5', '#ec407a', '#fb8c00', '#8e24aa']));
      line.setAttribute('stroke-width', '5'); line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
    }
  };

  /* --- 6) Tìm trong lưới: vật xuất hiện 1 lần / cặp giống nhau --- */
  RENDERERS.find = (q, host) => {
    const grid = el('div', 'item-grid');
    const targets = q.items.filter(it => it.correct).length;
    let got = 0;
    q.items.forEach(it => {
      const d = el('div', 'item'); d.style.padding = '10px';
      d.innerHTML = glyph(it.g, it.size || 52);
      d.onclick = () => {
        if (d.classList.contains('correct') || d.classList.contains('disabled')) return;
        sfx.tap();
        if (it.correct) {
          d.classList.add('correct'); got++;
          if (got >= targets) { grid.querySelectorAll('.item').forEach(x => x.classList.add('disabled')); answered(true); }
        } else { d.classList.add('wrong'); setTimeout(() => d.classList.remove('wrong'), 500); answered(false); }
      };
      grid.appendChild(d);
    });
    host.appendChild(grid);
  };

  /* --- 7) Sắp thứ tự: chạm theo đúng thứ tự --- */
  RENDERERS.seq = (q, host) => {
    let next = 1;
    const grid = el('div', 'item-grid');
    shuffle(q.items.slice()).forEach(it => {
      const d = el('div', 'item'); d.style.padding = '12px'; d.style.flexDirection = 'column';
      d.innerHTML = glyph(it.g, 56) + (it.label ? `<div style="font-size:14px;margin-top:4px;color:#8a7a66">${it.label}</div>` : '');
      d.onclick = () => {
        if (d.classList.contains('done')) return;
        sfx.tap();
        if (it.order === next) {
          d.classList.add('correct', 'done');
          const badge = el('div'); badge.style.cssText = 'position:absolute;top:-8px;left:-8px;background:#43a047;color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px';
          badge.textContent = next; d.style.position = 'relative'; d.appendChild(badge);
          next++;
          if (next > q.items.length) { grid.querySelectorAll('.item').forEach(x => x.classList.add('disabled')); answered(true); }
        } else { d.classList.add('wrong'); setTimeout(() => d.classList.remove('wrong'), 500); answered(false); }
      };
      grid.appendChild(d);
    });
    host.appendChild(grid);
    const hint = el('div', '', `<div style="text-align:center;color:#8a7a66;margin-top:12px;font-size:15px">Chạm theo thứ tự: <b id="seqNext">1</b> → ${q.items.length}</div>`);
    host.appendChild(hint);
    const obs = new MutationObserver(() => { const n = host.querySelector('#seqNext'); if (n) n.textContent = Math.min(next, q.items.length); });
    obs.observe(grid, { subtree: true, attributes: true, attributeFilter: ['class'] });
  };

  /* --- 8d) Number bond: tách/gộp số lượng (điền số còn thiếu) --- */
  function nbNode(node, kind) {
    const d = el('div', 'nb-node ' + kind + (node.blank ? ' blank' : ''));
    if (node.blank) { d.dataset.blank = '1'; d.innerHTML = '<span class="nb-num">?</span>'; }
    else if (node.show === 'dots') d.innerHTML = range(node.n).map(() => '<span class="nb-dot"></span>').join('');
    else if (node.show === 'objs') d.innerHTML = range(node.n).map(() => `<span class="nb-em">${node.g}</span>`).join('');
    else d.innerHTML = `<span class="nb-num">${node.n}</span>`;
    return d;
  }
  RENDERERS.numberbond = (q, host) => {
    const wrap = el('div', 'nb-wrap');
    const parts = el('div', 'nb-parts');
    parts.appendChild(nbNode(q.parts[0], 'part'));
    parts.appendChild(nbNode(q.parts[1], 'part'));
    const conn = el('div', 'nb-connector');
    conn.innerHTML = `<svg viewBox="0 0 46 110" width="46" height="110" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="28" x2="44" y2="55" stroke="#90a4ae" stroke-width="4" stroke-linecap="round"/>
      <line x1="2" y1="82" x2="44" y2="55" stroke="#90a4ae" stroke-width="4" stroke-linecap="round"/></svg>`;
    const whole = nbNode(q.whole, 'whole');
    // thứ tự hiển thị: gộp = parts→whole; tách = whole→parts
    if (q.mode === 'tach') { wrap.appendChild(whole); const c2 = conn.cloneNode(true); c2.style.transform = 'scaleX(-1)'; wrap.appendChild(c2); wrap.appendChild(parts); }
    else { wrap.appendChild(parts); wrap.appendChild(conn); wrap.appendChild(whole); }
    host.appendChild(wrap);

    const box = el('div', 'options cols-' + Math.min(q.options.length, 4));
    (q.noShuffle ? q.options : shuffle(q.options)).forEach(v => {
      const b = el('div', 'opt');
      b.innerHTML = `<span class="lab" style="font-size:28px;font-weight:900">${v}</span>`;
      b.onclick = () => {
        if (b.classList.contains('disabled')) return;
        sfx.tap();
        if (v === q.answer) {
          b.classList.add('correct'); lockOpts(box);
          const blank = host.querySelector('[data-blank]');
          if (blank) { blank.classList.remove('blank'); blank.innerHTML = `<span class="nb-num">${q.answer}</span>`; }
          answered(true);
        } else { b.classList.add('wrong', 'disabled'); answered(false); }
      };
      box.appendChild(b);
    });
    host.appendChild(box);
  };

  /* --- 8c) Tally: đếm từng loại rồi chọn số (thống kê) --- */
  RENDERERS.tally = (q, host) => {
    if (q.sceneHTML) { const sc = el('div', 'scene'); sc.innerHTML = q.sceneHTML; host.appendChild(sc); }
    else if (q.gridGlyphs) {
      const sc = el('div', 'tally-grid');
      sc.innerHTML = q.gridGlyphs.map(g => `<span class="tg">${glyph(g, q.gridSize || 32)}</span>`).join('');
      host.appendChild(sc);
    }
    const need = q.rows.length; let done = 0;
    const box = el('div', 'tally-rows');
    q.rows.forEach(r => {
      const row = el('div', 'tally-row');
      const icon = el('div', 'tally-icon'); icon.innerHTML = glyph(r.g, 34); row.appendChild(icon);
      const opts = el('div', 'tally-opts');
      let rowDone = false;
      shuffle(r.options).forEach(v => {
        const b = el('div', 'tally-num'); b.textContent = v;
        b.onclick = () => {
          if (rowDone || b.classList.contains('correct')) return;
          sfx.tap();
          if (v === r.answer) {
            b.classList.add('correct'); rowDone = true; done++;
            opts.querySelectorAll('.tally-num').forEach(x => { if (x !== b) x.classList.add('dim'); });
            if (done >= need) answered(true);
          } else { b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 400); answered(false); }
        };
        opts.appendChild(b);
      });
      row.appendChild(opts); box.appendChild(row);
    });
    host.appendChild(box);
  };

  /* --- 8b) Multitap: chạm vật đúng trong mỗi nhóm (khoanh/đánh dấu) --- */
  RENDERERS.multitap = (q, host) => {
    const wrap = el('div', 'mt-wrap ' + (q.layout === 'row' ? 'mt-row' : 'mt-grid'));
    let doneGroups = 0; const total = q.groups.length;
    q.groups.forEach(group => {
      const frame = el('div', 'mt-group frame-' + (q.groupFrame || 'box'));
      const need = group.targets.filter(t => t.correct).length;
      let got = 0, groupDone = false;
      const mkTarget = (t, extraCls = '') => {
        const sz = t.size || 46;
        const cell = el('div', 'mt-target ' + extraCls);
        if (t.html) { cell.style.width = 'auto'; cell.style.height = 'auto'; cell.style.minWidth = '60px'; cell.style.padding = '8px'; }
        else if (t.size) { const b = Math.max(64, sz + 22); cell.style.width = b + 'px'; cell.style.height = b + 'px'; }
        cell.innerHTML = (t.html ? t.html : glyph(t.g, sz)) + '<span class="circle-mark"></span>';
        cell.onclick = () => {
          if (groupDone || cell.classList.contains('correct')) return;
          sfx.tap();
          if (t.correct) {
            cell.classList.add('correct'); got++;
            if (got >= need) { groupDone = true; doneGroups++; if (doneGroups >= total) answered(true); }
          } else { cell.classList.add('wrong'); setTimeout(() => cell.classList.remove('wrong'), 500); answered(false); }
        };
        return cell;
      };
      // tiêu đề nhóm (nếu có)
      if (group.title) frame.appendChild(el('div', 'mt-title', group.title));
      if (q.groupFrame === 'table') {
        const box = el('div', 'mt-targets tv');
        box.appendChild(mkTarget(group.targets[0]));
        box.appendChild(el('div', 'mt-table-bar'));
        box.appendChild(mkTarget(group.targets[1]));
        frame.appendChild(box);
      } else {
        const box = el('div', 'mt-targets ' + (q.groupLayout === 'h' ? 'th' : 'tv') + (q.baseline ? ' bl' : ''));
        if (group.ref) {
          const r = el('div', 'mt-ref');
          const rs = group.ref.size || 46;
          r.innerHTML = group.ref.html ? group.ref.html : glyph(group.ref.g, rs);
          box.appendChild(r);
        }
        const potCls = q.pot ? 'pot' : '';
        group.targets.forEach(t => box.appendChild(mkTarget(t, potCls)));
        frame.appendChild(box);
      }
      wrap.appendChild(frame);
    });
    host.appendChild(wrap);
  };

  /* --- 8) Tìm điểm khác biệt (2 lưới, chạm ô khác) --- */
  RENDERERS.spot = (q, host) => {
    const need = q.diffs.length;
    let got = 0;
    const wrap = el('div'); wrap.style.cssText = 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap';
    const mk = (interactive) => {
      const g = el('div');
      g.style.cssText = `display:grid;grid-template-columns:repeat(${q.cols},1fr);gap:6px;background:#fff;padding:10px;border-radius:16px;box-shadow:var(--shadow)`;
      q.gridB.forEach((cell, i) => {
        const c = el('div');
        c.style.cssText = 'width:46px;height:46px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#f7f7f7';
        const g2 = interactive ? q.gridB[i] : q.gridA[i];
        c.innerHTML = glyph(g2, 34);
        if (interactive) {
          c.onclick = () => {
            if (c.dataset.done) return;
            sfx.tap();
            if (q.diffs.includes(i)) {
              c.dataset.done = 1; c.style.background = '#e8f5e9'; c.style.outline = '3px solid #43a047'; got++;
              if (got >= need) answered(true);
            } else { c.style.outline = '3px solid #e53935'; setTimeout(() => c.style.outline = '', 400); answered(false); }
          };
        }
        g.appendChild(c);
      });
      return g;
    };
    const a = el('div'); a.style.textAlign = 'center';
    a.innerHTML = '<div style="font-weight:700;color:#8a7a66;margin-bottom:6px">Tranh mẫu</div>'; a.appendChild(mk(false));
    const b = el('div'); b.style.textAlign = 'center';
    b.innerHTML = '<div style="font-weight:700;color:#8a7a66;margin-bottom:6px">Tìm ô khác 👇</div>'; b.appendChild(mk(true));
    wrap.appendChild(a); wrap.appendChild(b); host.appendChild(wrap);
  };

  /* ---------- API công khai ---------- */
  return {
    // tiện ích cho lessons.js
    rnd, pick, shuffle, sample, range, COLORS, COLOR_KEYS, SHAPES,
    // điều khiển
    startSession, pandaSVG, glyph, Scenes,
    loadAllStars,
    setSound(on) { soundOn = on; if (!on && 'speechSynthesis' in window) speechSynthesis.cancel(); },
    getSound() { return soundOn; },
    speak, sfx,
    _answered: answered
  };
})();
