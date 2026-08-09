/* ================= LESSONS — TẬP 5 =================
   Làm quen với phép tính (cộng & trừ trong phạm vi 10).
   (bản sao theo sách "Toán tư duy cùng Gấu KIKI 5")
=================================================== */
const VOL_T5 = (() => {
  const G = Game;
  const { rnd, pick, shuffle, range } = G;
  const rep = (e, n) => Array(Math.max(0, n)).fill(e).join('');
  function optsAround(ans, n = 4, max = 10) {
    const set = new Set([ans]); let g = 0;
    while (set.size < n && g++ < 60) { const d = ans + (rnd(2) ? 1 : -1) * (1 + rnd(3)); if (d >= 0 && d <= max) set.add(d); }
    let x = 0; while (set.size < n) { if (!set.has(x) && x <= max) set.add(x); x++; if (x > max + 5) break; }
    return shuffle([...set]);
  }
  const numOpts = (ans, max = 10) => optsAround(ans, 4, max).map(v => ({ label: String(v), correct: v === ans }));

  // cộng có hình minh hoạ
  const addObj = (code, a, b, e) => ({
    type: 'mc', cols: 4, prompt: code + ' Đếm rồi tính kết quả.',
    say: `${code} Đếm rồi tính. ${a} cộng ${b} bằng mấy?`,
    sceneHTML: `<div class="calc"><span class="grp">${rep(e, a)}</span><span class="op">+</span><span class="grp">${rep(e, b)}</span><span class="op">=</span><span class="q">?</span></div>`,
    options: numOpts(a + b),
  });
  // trừ có hình minh hoạ (gạch bớt b vật)
  const subObj = (code, a, b, e) => ({
    type: 'mc', cols: 4, prompt: code + ' Đếm rồi tính kết quả.',
    say: `${code} Đếm rồi tính. ${a} trừ ${b} bằng mấy?`,
    sceneHTML: `<div class="calc"><span class="grp">${Array.from({ length: a }, (_, i) => `<span style="${i >= a - b ? 'opacity:.28;text-decoration:line-through 3px #e53935' : ''}">${e}</span>`).join('')}</span><span class="op">−</span><b>${b}</b><span class="op">=</span><span class="q">?</span></div>`,
    options: numOpts(a - b),
  });
  // phép tính bằng số
  const calc = (code, a, op, b) => {
    const ans = op === '+' ? a + b : a - b;
    return { type: 'mc', cols: 4, prompt: code + ' Tính kết quả.', say: `${code} Tính. ${a} ${op === '+' ? 'cộng' : 'trừ'} ${b} bằng mấy?`, sceneHTML: `<div class="calc"><b style="font-size:44px">${a} ${op === '+' ? '+' : '−'} ${b} = ?</b></div>`, options: numOpts(ans) };
  };
  // phép tính cột dọc
  const col = (code, a, op, b) => {
    const ans = op === '+' ? a + b : a - b;
    return { type: 'mc', cols: 4, prompt: code + ' Tính theo cột dọc.', say: `${code} Tính theo cột dọc. ${a} ${op === '+' ? 'cộng' : 'trừ'} ${b} bằng mấy?`, sceneHTML: `<div style="display:flex;justify-content:center"><div class="calc-col"><div>${a}</div><div class="op-row"><span style="color:#f57c00">${op === '+' ? '+' : '−'}</span><span>${b}</span></div><div class="bar"></div><div class="q" style="color:#f57c00">?</div></div></div>`, options: numOpts(ans) };
  };
  // điền số còn thiếu: a + ? = c  (trò chơi ô số)
  const fillAdd = (code, a, c) => ({ type: 'mc', cols: 4, prompt: `${code} ${a} + ? = ${c}. Số cần điền là?`, say: `${code} ${a} cộng mấy bằng ${c}? Số cần điền là mấy?`, options: numOpts(c - a) });

  function b1() { return [ // cộng ≤3
    addObj('Bài 1.', 1, 1, '🍎'), addObj('Bài 1.', 1, 2, '🫐'), addObj('Bài 1.', 2, 1, '🍑'),
    calc('Bài 3.', 1, '+', 2), calc('Bài 3.', 3, '+', 0),
  ]; }
  function b2() { return [ // cộng ≤5
    addObj('Bài 1.', 2, 2, '🐬'), addObj('Bài 1.', 3, 1, '🦀'), addObj('Bài 1.', 3, 2, '🐟'),
    calc('Bài 2.', 2, '+', 3), calc('Bài 2.', 4, '+', 1),
  ]; }
  function b3() { return [ // cộng ≤6
    addObj('Bài 1.', 3, 3, '⭐'), addObj('Bài 1.', 4, 2, '🍇'), calc('Bài 2.', 5, '+', 1), calc('Bài 2.', 2, '+', 4), col('Bài 3.', 3, '+', 3),
  ]; }
  function b4() { return [ // cộng ≤10 (đếm vật)
    addObj('Bài 1.', 8, 1, '🚗'), addObj('Bài 1.', 2, 4, '🐴'), addObj('Bài 1.', 3, 3, '🤖'), addObj('Bài 1.', 5, 5, '🚀'), addObj('Bài 1.', 7, 2, '🚂'),
  ]; }
  function b5() { return [ // luyện tập cộng ≤10
    calc('Bài 1.', 6, '+', 3), calc('Bài 1.', 4, '+', 5), calc('Bài 1.', 7, '+', 2), col('Bài 2.', 5, '+', 4), col('Bài 2.', 6, '+', 2),
  ]; }
  function b6() { return [ // ôn tập cộng
    addObj('Bài 1.', 4, 3, '🧁'), calc('Bài 2.', 8, '+', 2), calc('Bài 2.', 3, '+', 6), col('Bài 3.', 7, '+', 3), calc('Bài 3.', 5, '+', 5),
  ]; }
  function b7() { return [ // trò chơi ô số với phép cộng
    fillAdd('Bài 1.', 2, 5), fillAdd('Bài 1.', 3, 7), fillAdd('Bài 1.', 4, 6), fillAdd('Bài 2.', 1, 9), fillAdd('Bài 2.', 5, 10),
  ]; }
  function b8() { return [ // trừ ≤5
    subObj('Bài 1.', 3, 1, '🍓'), subObj('Bài 1.', 5, 2, '🍌'), subObj('Bài 1.', 4, 3, '🍊'), calc('Bài 2.', 5, '-', 1), calc('Bài 2.', 4, '-', 2),
  ]; }
  function b9() { return [ // trừ ≤6
    subObj('Bài 1.', 6, 2, '🐝'), subObj('Bài 1.', 6, 4, '🐞'), calc('Bài 2.', 6, '-', 3), calc('Bài 2.', 5, '-', 4), col('Bài 3.', 6, '-', 1),
  ]; }
  function b10() { return [ // trừ cột dọc ≤8
    col('Bài 1.', 8, '-', 3), col('Bài 1.', 7, '-', 2), col('Bài 1.', 8, '-', 5), col('Bài 2.', 6, '-', 4), col('Bài 2.', 8, '-', 8),
  ]; }
  function b11() { return [ // trừ ≤10
    subObj('Bài 1.', 10, 4, '🎈'), calc('Bài 2.', 9, '-', 3), calc('Bài 2.', 10, '-', 5), calc('Bài 2.', 8, '-', 6), col('Bài 3.', 10, '-', 7),
  ]; }
  function b12() { return [ // luyện tập trừ ≤10
    calc('Bài 1.', 9, '-', 4), calc('Bài 1.', 10, '-', 2), calc('Bài 1.', 7, '-', 5), col('Bài 2.', 9, '-', 6), col('Bài 2.', 10, '-', 3),
  ]; }
  function b13() { return [ // trang trí tranh bằng kết quả phép tính (tính → kết quả)
    calc('Bài 1.', 4, '+', 4), calc('Bài 1.', 9, '-', 2), calc('Bài 1.', 3, '+', 5), calc('Bài 1.', 10, '-', 6), calc('Bài 1.', 6, '+', 1),
  ]; }
  function b14() { return [ // ôn tập
    addObj('Bài 1.', 5, 4, '🍎'), subObj('Bài 1.', 8, 3, '🐠'), calc('Bài 2.', 7, '+', 2), calc('Bài 2.', 9, '-', 5), col('Bài 3.', 6, '+', 4), col('Bài 3.', 10, '-', 4),
  ]; }

  const list = [
    { part: 1, num: 1, emoji: '➕', title: 'Phép cộng ≤ 3', build: b1 },
    { part: 1, num: 2, emoji: '➕', title: 'Phép cộng ≤ 5', build: b2 },
    { part: 1, num: 3, emoji: '➕', title: 'Phép cộng ≤ 6', build: b3 },
    { part: 1, num: 4, emoji: '➕', title: 'Phép cộng ≤ 10', build: b4 },
    { part: 1, num: 5, emoji: '✏️', title: 'Luyện tập cộng ≤ 10', build: b5 },
    { part: 1, num: 6, emoji: '🧮', title: 'Ôn tập về phép cộng', build: b6 },
    { part: 1, num: 7, emoji: '🎲', title: 'Trò chơi ô số (cộng)', build: b7 },
    { part: 2, num: 8, emoji: '➖', title: 'Phép trừ ≤ 5', build: b8 },
    { part: 2, num: 9, emoji: '➖', title: 'Phép trừ ≤ 6', build: b9 },
    { part: 2, num: 10, emoji: '➖', title: 'Phép trừ cột dọc ≤ 8', build: b10 },
    { part: 2, num: 11, emoji: '➖', title: 'Phép trừ ≤ 10', build: b11 },
    { part: 2, num: 12, emoji: '✏️', title: 'Luyện tập trừ ≤ 10', build: b12 },
    { part: 2, num: 13, emoji: '🎨', title: 'Trang trí bằng kết quả', build: b13 },
    { part: 2, num: 14, emoji: '🏆', title: 'Ôn tập', build: b14 },
  ];
  list.forEach(l => l.id = 't5-b' + l.num);
  return {
    id: 't5', num: 5, name: 'Tập 5', emoji: '➕',
    subtitle: 'Làm quen với phép tính',
    parts: [
      { n: 1, title: 'Phép cộng', chip: 'Phần 1' },
      { n: 2, title: 'Phép trừ', chip: 'Phần 2' },
    ],
    lessons: list,
  };
})();
