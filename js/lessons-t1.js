/* ================= LESSONS — TẬP 1 =================
   Nhận biết nhóm số lượng (đầy/rỗng, nặng/nhẹ, số 0–10,
   đếm xuôi/ngược, liền trước/sau, đếm cách, tia số).
   (bản sao theo sách "Toán tư duy cùng Gấu KIKI 1")
=================================================== */
const VOL_T1 = (() => {
  const G = Game;
  const { rnd, pick, shuffle, sample, range } = G;

  const CARD = ['#1e88e5', '#e53935', '#43a047', '#fb8c00', '#8e24aa', '#ec407a', '#00acc1'];
  const rep = (e, n) => Array(Math.max(0, n)).fill(e).join('');
  const cluster = (e, n, fs = 24) => ({ html: `<span style="font-size:${fs}px;display:inline-flex;flex-wrap:wrap;justify-content:center;align-items:center;max-width:122px;line-height:1.15;gap:2px">${rep(e, n)}</span>` });
  const card = (n, i = 0) => ({ html: Art.numCard(n, CARD[i % CARD.length]) });
  function optsAround(ans, n = 4, max = 10) {
    const set = new Set([ans]); let g = 0;
    while (set.size < n && g++ < 60) { const d = ans + (rnd(2) ? 1 : -1) * (1 + rnd(3)); if (d >= 0 && d <= max) set.add(d); }
    let x = 0; while (set.size < n) { if (!set.has(x) && x <= max) set.add(x); x++; if (x > max + 5) break; }
    return shuffle([...set]);
  }
  const distinct = (arr) => [...new Set(arr)];

  // ---- các kiểu câu ----
  const countQ = (prompt, e, n) => ({ type: 'count', prompt, items: Array(n).fill(e), answer: n, options: optsAround(n), emSize: 42 });
  const bowlQ = (prompt, n) => ({
    type: 'count', prompt, answer: n, options: optsAround(n),
    sceneHTML: `<div style="position:relative;display:inline-block">${Art.bowl(1, 160)}<span style="position:absolute;inset:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;font-size:24px;max-width:160px;padding:34px 24px;line-height:1.2">${rep('🐠', n)}</span></div>`
  });
  const numeralTap = (prompt, target, maxN = 10) => {
    const others = shuffle(range(maxN + 1).filter(x => x !== target)).slice(0, 3);
    return { type: 'tap', prompt, items: shuffle([{ g: card(target, 0), correct: true }].concat(others.map((k, i) => ({ g: card(k, i + 1), correct: false })))) };
  };
  const groupTapN = (prompt, N, e) => {
    const counts = distinct([N, Math.max(0, N - 1), N + 1, Math.max(0, N - 2)]).slice(0, 3);
    if (!counts.includes(N)) counts[0] = N;
    return { type: 'tap', prompt, items: shuffle(counts.map(c => ({ g: cluster(e, c, 22), correct: c === N }))) };
  };
  const matchNumQty = (prompt, nums, e) => ({ type: 'match', prompt, pairs: nums.map((k, i) => [card(k, i), cluster(e, k, 18)]) });
  const fillSeq = (prompt, arr, answer, max = 10) => ({ type: 'pattern', prompt, sequence: arr.map(x => x === null ? '?' : String(x)), options: shuffle(optsAround(answer, 4, max).map(v => ({ g: String(v), correct: v === answer }))) });
  const seqTap = (prompt, nums, desc) => {
    const sorted = [...nums].sort((a, b) => desc ? b - a : a - b);
    return { type: 'seq', prompt, items: nums.map(v => ({ g: String(v), order: sorted.indexOf(v) + 1 })) };
  };
  const beforeAfter = (prompt, n, after) => ({ type: 'mc', cols: 3, prompt, options: shuffle([n - 1, n, n + 1].map(v => ({ label: String(v), correct: v === (after ? n + 1 : n - 1) }))) });

  // ---- Bài học số N (dùng chung) ----
  function numberUnit(N, e) {
    const nums = []; for (let k = N; k >= 1 && nums.length < 3; k--) nums.push(k);
    return [
      (e === '🐟' || e === '🐠') ? bowlQ(`Bài 1. Đếm xem có bao nhiêu con cá?`, N) : countQ(`Bài 1. Đếm xem có bao nhiêu ${e}?`, e, N),
      groupTapN(`Bài 2. Chạm vào nhóm có đúng ${N} vật.`, N, e),
      matchNumQty('Bài 3. Nối số với nhóm có số lượng phù hợp.', nums.length > 1 ? nums : [N, N + 1], e),
      numeralTap(`Bài 4. Chạm vào số ${N}.`, N),
    ];
  }

  // ===== PHẦN 1: đầy/rỗng, nặng/nhẹ =====
  function b1() {
    const fullJar = (e) => ({ html: `<div style="position:relative;display:inline-block">${Art.jarFill(1, 74)}<span style="position:absolute;left:0;right:0;top:24px;display:flex;flex-wrap:wrap;justify-content:center;font-size:13px;max-width:74px;margin:auto;padding:0 12px;line-height:1">${rep(e, 6)}</span></div>` });
    const emptyJar = () => ({ html: Art.jarFill(0, 74) });
    const bowlScene = (f) => `<div style="text-align:center">${Art.bowl(f, 130)}</div>`;
    return [
      { type: 'tap', prompt: 'Bài 1. Chạm vào vật chứa <b>đầy</b> đồ bên trong.', items: shuffle([{ g: fullJar('🍬'), correct: true }, { g: emptyJar(), correct: false }]) },
      { type: 'mc', cols: 3, prompt: 'Bài 2. Bình cá này thế nào? (đầy = 1, một phần = 2, rỗng = 0)', sceneHTML: bowlScene(1), options: [{ label: '1', correct: true }, { label: '2', correct: false }, { label: '0', correct: false }] },
      { type: 'mc', cols: 3, prompt: 'Bài 2. Bình cá này thế nào? (đầy = 1, một phần = 2, rỗng = 0)', sceneHTML: bowlScene(0.5), options: [{ label: '1', correct: false }, { label: '2', correct: true }, { label: '0', correct: false }] },
      { type: 'mc', cols: 3, prompt: 'Bài 2. Bình cá này thế nào? (đầy = 1, một phần = 2, rỗng = 0)', sceneHTML: bowlScene(0), options: [{ label: '1', correct: false }, { label: '2', correct: false }, { label: '0', correct: true }] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h', prompt: 'Bài 3. Chạm vào vật <b>nhẹ hơn</b> trong mỗi cặp.',
        groups: [
          { targets: [{ g: '🎈', correct: true }, { g: '⚽', correct: false }] },
          { targets: [{ g: '✏️', correct: true }, { g: '📚', correct: false }] },
          { targets: [{ g: '🍓', correct: true }, { g: '🍉', correct: false }] },
          { targets: [{ g: '🪶', correct: true }, { g: '🪨', correct: false }] },
        ] },
      numeralTap('Bài 6. Chạm vào số 0.', 0),
    ];
  }

  // ===== PHẦN 2: số 1–5 =====
  const b2 = () => numberUnit(1, '🍎');
  const b3 = () => numberUnit(2, '🦋');
  const b4 = () => numberUnit(3, '🍄');
  const b5 = () => numberUnit(4, '🐟');
  const b6 = () => numberUnit(5, '⭐');
  function b7() { // ôn tập ≤5
    return [
      countQ('Bài 1. Đếm xem có bao nhiêu 🍓?', '🍓', 4),
      matchNumQty('Bài 2. Nối số với nhóm phù hợp.', [3, 4, 5], '🌼'),
      groupTapN('Bài 3. Chạm vào nhóm có 5 vật.', 5, '🐠'),
      fillSeq('Bài 4. Điền số còn thiếu.', [1, 2, null, 4, 5], 3, 5),
    ];
  }
  function b8() { // luyện tập ≤5
    return [
      bowlQ('Bài 1. Đếm xem có bao nhiêu con cá?', 3),
      numeralTap('Bài 2. Chạm vào số 4.', 4, 5),
      matchNumQty('Bài 3. Nối số với nhóm phù hợp.', [2, 3, 5], '🍇'),
      seqTap('Bài 4. Chạm các số theo thứ tự từ bé đến lớn.', [4, 1, 3, 5, 2]),
    ];
  }

  // ===== số 6–10 =====
  const b9 = () => numberUnit(6, '🐝');
  const b10 = () => numberUnit(7, '🌼');
  const b11 = () => numberUnit(8, '🍇');
  const b12 = () => numberUnit(9, '🐞');
  const b13 = () => numberUnit(10, '🍅');

  // ===== đếm xuôi / ngược / ôn tập =====
  function b14() { // đếm xuôi 1–10
    return [
      fillSeq('Bài 1. Điền số còn thiếu (đếm xuôi).', [1, 2, 3, null, 5], 4),
      fillSeq('Bài 1. Điền số còn thiếu (đếm xuôi).', [5, 6, null, 8, 9], 7),
      groupTapN('Bài 2. Chạm vào nhóm có đúng 10 vật.', 10, '🍌'),
      seqTap('Bài 3. Chạm các số theo thứ tự 1 → 10.', range(10).map(i => i + 1)),
    ];
  }
  function b15() { // đếm ngược 10–1
    return [
      fillSeq('Bài 1. Điền số còn thiếu (đếm ngược).', [10, 9, null, 7], 8),
      fillSeq('Bài 1. Điền số còn thiếu (đếm ngược).', [6, null, 4, 3], 5),
      seqTap('Bài 2. Chạm các số theo thứ tự 10 → 1.', range(10).map(i => i + 1), true),
    ];
  }
  function b16() { // ôn tập ≤10
    return [
      countQ('Bài 1. Đếm xem có bao nhiêu 🐞?', '🐞', 8),
      matchNumQty('Bài 2. Nối số với nhóm phù hợp.', [8, 9, 10], '🍒'),
      groupTapN('Bài 3. Chạm vào nhóm có 7 vật.', 7, '🌸'),
      fillSeq('Bài 4. Điền số còn thiếu.', [6, 7, null, 9, 10], 8),
    ];
  }
  function b17() { // số liền trước – liền sau
    return [
      beforeAfter('Bài 1. Số đứng liền TRƯỚC số 3 là?', 3, false),
      beforeAfter('Bài 1. Số đứng liền SAU số 3 là?', 3, true),
      fillSeq('Bài 2. Điền số vào toa tàu.', [3, null, 5], 4),
      fillSeq('Bài 2. Điền số vào toa tàu.', [7, null, 9], 8),
      seqTap('Bài 3. Sắp xếp từ bé đến lớn.', [9, 3, 5]),
      seqTap('Bài 3. Sắp xếp từ bé đến lớn.', [8, 2, 6]),
    ];
  }
  function b18() { // đếm cách 2; 3
    return [
      fillSeq('Bài 1. Đếm cách 2: điền số còn thiếu.', [2, 4, 6, null], 8, 12),
      fillSeq('Bài 1. Đếm cách 2: điền số còn thiếu.', [1, 3, 5, null], 7, 12),
      fillSeq('Bài 2. Đếm cách 3: điền số còn thiếu.', [3, 6, null, 12], 9, 12),
      fillSeq('Bài 2. Đếm cách 3: điền số còn thiếu.', [null, 6, 9, 12], 3, 12),
    ];
  }
  function b19() { // làm quen với tia số
    return [
      fillSeq('Bài 1. Điền số còn thiếu trên tia số.', [0, 1, null, 3, 4], 2),
      fillSeq('Bài 1. Điền số còn thiếu trên tia số.', [5, null, 7, 8], 6),
      fillSeq('Bài 2. Điền số còn thiếu trên tia số.', [6, 7, 8, null, 10], 9),
    ];
  }
  function b20() { // ôn tập tổng hợp
    return [
      countQ('Bài 1. Đếm và chọn số đúng.', '🍌', 6),
      matchNumQty('Bài 2. Nối nhóm đồ vật với số phù hợp.', [2, 5, 9], '🍎'),
      groupTapN('Bài 2. Chạm vào nhóm có 6 vật.', 6, '🧁'),
      fillSeq('Bài 3. Điền số còn thiếu.', [4, 5, null, 7], 6),
      numeralTap('Bài 3. Chạm vào số 10.', 10),
    ];
  }

  const list = [
    { part: 1, num: 1, emoji: '🫙', title: 'Đầy – rỗng, nặng – nhẹ', build: b1 },
    { part: 1, num: 2, emoji: '1️⃣', title: 'Số 1', build: b2 },
    { part: 1, num: 3, emoji: '2️⃣', title: 'Số 2', build: b3 },
    { part: 1, num: 4, emoji: '3️⃣', title: 'Số 3', build: b4 },
    { part: 1, num: 5, emoji: '4️⃣', title: 'Số 4', build: b5 },
    { part: 1, num: 6, emoji: '5️⃣', title: 'Số 5', build: b6 },
    { part: 1, num: 7, emoji: '🧮', title: 'Ôn tập số ≤ 5', build: b7 },
    { part: 1, num: 8, emoji: '✏️', title: 'Luyện tập', build: b8 },
    { part: 2, num: 9, emoji: '6️⃣', title: 'Số 6', build: b9 },
    { part: 2, num: 10, emoji: '7️⃣', title: 'Số 7', build: b10 },
    { part: 2, num: 11, emoji: '8️⃣', title: 'Số 8', build: b11 },
    { part: 2, num: 12, emoji: '9️⃣', title: 'Số 9', build: b12 },
    { part: 2, num: 13, emoji: '🔟', title: 'Số 10', build: b13 },
    { part: 2, num: 14, emoji: '⬆️', title: 'Đếm xuôi 1 → 10', build: b14 },
    { part: 2, num: 15, emoji: '⬇️', title: 'Đếm ngược 10 → 1', build: b15 },
    { part: 2, num: 16, emoji: '🔢', title: 'Ôn tập số ≤ 10', build: b16 },
    { part: 2, num: 17, emoji: '↔️', title: 'Số liền trước – liền sau', build: b17 },
    { part: 2, num: 18, emoji: '⏭️', title: 'Đếm cách 2; 3', build: b18 },
    { part: 2, num: 19, emoji: '📏', title: 'Làm quen với tia số', build: b19 },
    { part: 2, num: 20, emoji: '🏆', title: 'Ôn tập tổng hợp', build: b20 },
  ];
  list.forEach(l => l.id = 't1-b' + l.num);
  return {
    id: 't1', num: 1, name: 'Tập 1', emoji: '🔢',
    subtitle: 'Nhận biết nhóm số lượng',
    parts: [
      { n: 1, title: 'Đầy/rỗng · Số 0 – 5', chip: 'Phần 1' },
      { n: 2, title: 'Số 6 – 10 · Đếm · Tia số', chip: 'Phần 2' },
    ],
    lessons: list,
  };
})();
