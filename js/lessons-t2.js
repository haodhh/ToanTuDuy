/* ================= LESSONS — TẬP 2 =================
   Làm quen với hình khối (hình phẳng cơ bản + khối 3D).
   (bản sao theo sách "Toán tư duy cùng Gấu KIKI 2")
=================================================== */
const VOL_T2 = (() => {
  const G = Game;
  const { rnd, pick, shuffle, sample, range, COLOR_KEYS } = G;

  const SH = ['heart', 'star', 'triangle', 'square', 'rectangle', 'circle', 'trapezoid', 'diamond', 'oval'];
  const SOLIDS = ['cube', 'cuboid', 'sphere', 'cylinder', 'cone'];
  const sh = (k, c) => ({ shape: k, color: c || pick(COLOR_KEYS) });
  const sol = (k, c) => ({ html: Art.solid(k, c || pick(COLOR_KEYS), 66) });
  function optsAround(ans, n = 4, max = 12) {
    const set = new Set([ans]); let g = 0;
    while (set.size < n && g++ < 60) { const d = ans + (rnd(2) ? 1 : -1) * (1 + rnd(3)); if (d >= 0 && d <= max) set.add(d); }
    let x = 0; while (set.size < n) { if (!set.has(x)) set.add(x); x++; if (x > max + 6) break; }
    return shuffle([...set]);
  }

  // chạm tất cả hình dạng kind
  function tapAll(prompt, kind) {
    const others = shuffle(SH.filter(s => s !== kind));
    const nC = 2 + rnd(2); const items = [];
    for (let i = 0; i < nC; i++) items.push({ g: sh(kind), correct: true, size: 46 });
    const nN = 3 + rnd(3);
    for (let i = 0; i < nN; i++) items.push({ g: sh(others[i % others.length]), correct: false, size: 46 });
    return { type: 'tap', need: nC, prompt, items: shuffle(items) };
  }
  // đếm số hình kind
  const countShape = (prompt, kind, n) => ({ type: 'count', prompt, items: Array.from({ length: n }, () => sh(kind)), answer: n, options: optsAround(n, 4, 10), emSize: 40 });
  // chọn đúng hình
  function pickShape(prompt, kind) {
    const others = shuffle(SH.filter(s => s !== kind)).slice(0, 3);
    return { type: 'mc', cols: 4, prompt, options: shuffle([{ glyph: sh(kind), correct: true }].concat(others.map(s => ({ glyph: sh(s), correct: false })))) };
  }
  // nối hình cùng hình dạng
  function matchSame(prompt, kind) {
    const kinds = shuffle([kind].concat(shuffle(SH.filter(s => s !== kind)).slice(0, 3)));
    return { type: 'match', prompt, pairs: kinds.map(s => [sh(s), sh(s)]) };
  }
  // 3D
  function pickSolid(prompt, kind) {
    const others = shuffle(SOLIDS.filter(s => s !== kind)).slice(0, 3);
    return { type: 'mc', cols: 4, prompt, options: shuffle([{ glyph: sol(kind), correct: true }].concat(others.map(s => ({ glyph: sol(s), correct: false })))) };
  }
  const matchObjSolid = (prompt, pairs) => ({ type: 'match', prompt, pairs: pairs.map(([o, k]) => [o, sol(k)]) });

  const nm = { heart: 'trái tim', star: 'ngôi sao', triangle: 'tam giác', square: 'vuông', rectangle: 'chữ nhật', circle: 'tròn', trapezoid: 'thang', diamond: 'thoi', oval: 'bầu dục' };
  function shapeUnit(kind) {
    const name = nm[kind];
    return [
      tapAll(`Bài 1. Chạm vào tất cả hình ${name}.`, kind),
      countShape(`Bài 2. Đếm xem có bao nhiêu hình ${name}?`, kind, 3 + rnd(4)),
      pickShape(`Bài 3. Hình nào là hình ${name}?`, kind),
      matchSame('Bài 4. Nối các hình cùng hình dạng.', kind),
    ];
  }

  const b1 = () => shapeUnit('heart');
  const b2 = () => shapeUnit('star');
  const b3 = () => shapeUnit('triangle');
  const b4 = () => shapeUnit('square');
  const b5 = () => shapeUnit('rectangle');
  const b6 = () => shapeUnit('circle');
  function b7() { // luyện tập
    return [
      matchSame('Bài 1. Nối các hình cùng hình dạng.', 'triangle'),
      pickShape('Bài 2. Hình nào là hình vuông?', 'square'),
      pickShape('Bài 2. Hình nào là hình tròn?', 'circle'),
      tapAll('Bài 3. Chạm vào tất cả hình chữ nhật.', 'rectangle'),
    ];
  }
  function b8() { // ôn tập hình cơ bản
    return [
      pickShape('Bài 1. Hình nào là hình tam giác?', 'triangle'),
      pickShape('Bài 1. Hình nào là hình trái tim?', 'heart'),
      countShape('Bài 2. Đếm xem có bao nhiêu hình ngôi sao?', 'star', 4 + rnd(3)),
      matchSame('Bài 3. Nối các hình cùng hình dạng.', 'circle'),
    ];
  }
  const b9 = () => shapeUnit('trapezoid');
  function b10() { // hình thoi & bầu dục
    return [
      pickShape('Bài 1. Hình nào là hình thoi?', 'diamond'),
      pickShape('Bài 1. Hình nào là hình bầu dục?', 'oval'),
      tapAll('Bài 2. Chạm vào tất cả hình thoi.', 'diamond'),
      countShape('Bài 3. Đếm xem có bao nhiêu hình bầu dục?', 'oval', 3 + rnd(3)),
    ];
  }
  function b11() { // khối lập phương, khối hộp chữ nhật
    return [
      matchObjSolid('Bài 1. Nối đồ vật với khối phù hợp.', [['🎲', 'cube'], ['🎁', 'cube'], ['📦', 'cuboid'], ['📗', 'cuboid']]),
      pickSolid('Bài 2. Đâu là khối lập phương?', 'cube'),
      pickSolid('Bài 2. Đâu là khối hộp chữ nhật?', 'cuboid'),
      { type: 'tap', need: 2, prompt: 'Bài 3. Chạm vào tất cả khối lập phương.',
        items: shuffle([{ g: sol('cube'), correct: true }, { g: sol('cube'), correct: true }, { g: sol('cuboid'), correct: false }, { g: sol('cylinder'), correct: false }, { g: sol('sphere'), correct: false }]) },
    ];
  }
  function b12() { // khối cầu & khối trụ
    return [
      matchObjSolid('Bài 1. Nối đồ vật với khối phù hợp.', [['⚽', 'sphere'], ['🌐', 'sphere'], ['🥫', 'cylinder'], ['🥁', 'cylinder']]),
      pickSolid('Bài 2. Đâu là khối cầu?', 'sphere'),
      pickSolid('Bài 2. Đâu là khối trụ?', 'cylinder'),
      matchObjSolid('Bài 3. Nối đồ vật với khối phù hợp.', [['🎉', 'cone'], ['🍦', 'cone'], ['🎲', 'cube'], ['⚽', 'sphere']]),
    ];
  }
  function b13() { // luyện tập
    return [
      pickShape('Bài 1. Hình nào là hình thang?', 'trapezoid'),
      pickSolid('Bài 2. Đâu là khối trụ?', 'cylinder'),
      matchObjSolid('Bài 3. Nối đồ vật với khối phù hợp.', [['🎲', 'cube'], ['⚽', 'sphere'], ['🥫', 'cylinder'], ['📦', 'cuboid']]),
      tapAll('Bài 4. Chạm vào tất cả hình tròn.', 'circle'),
    ];
  }
  function b14() { // ôn tập hình khối
    return [
      pickSolid('Bài 1. Đâu là khối lập phương?', 'cube'),
      pickSolid('Bài 1. Đâu là khối cầu?', 'sphere'),
      pickSolid('Bài 2. Đâu là khối hộp chữ nhật?', 'cuboid'),
      matchObjSolid('Bài 3. Nối đồ vật với khối phù hợp.', [['🥫', 'cylinder'], ['🎁', 'cube'], ['🌐', 'sphere'], ['📗', 'cuboid']]),
    ];
  }
  function b15() { // ôn tập
    return [
      pickShape('Bài 1. Hình nào là hình vuông?', 'square'),
      pickShape('Bài 1. Hình nào là hình thoi?', 'diamond'),
      pickSolid('Bài 2. Đâu là khối nón?', 'cone'),
      matchSame('Bài 3. Nối các hình cùng hình dạng.', 'star'),
    ];
  }
  function b16() { // bé tập vẽ (nhận biết thay cho vẽ)
    return [
      pickShape('Bài 1. Chọn hình trái tim để tô.', 'heart'),
      pickShape('Bài 1. Chọn hình ngôi sao để tô.', 'star'),
      pickShape('Bài 2. Chọn hình tam giác để tô.', 'triangle'),
      pickShape('Bài 2. Chọn hình tròn để tô.', 'circle'),
    ];
  }

  const list = [
    { part: 1, num: 1, emoji: '❤️', title: 'Hình trái tim', build: b1 },
    { part: 1, num: 2, emoji: '⭐', title: 'Hình ngôi sao', build: b2 },
    { part: 1, num: 3, emoji: '🔺', title: 'Hình tam giác', build: b3 },
    { part: 1, num: 4, emoji: '🟦', title: 'Hình vuông', build: b4 },
    { part: 1, num: 5, emoji: '▭', title: 'Hình chữ nhật', build: b5 },
    { part: 1, num: 6, emoji: '🔵', title: 'Hình tròn', build: b6 },
    { part: 1, num: 7, emoji: '✏️', title: 'Luyện tập', build: b7 },
    { part: 1, num: 8, emoji: '🧩', title: 'Ôn tập hình cơ bản', build: b8 },
    { part: 2, num: 9, emoji: '🔶', title: 'Hình thang', build: b9 },
    { part: 2, num: 10, emoji: '🔷', title: 'Hình thoi & bầu dục', build: b10 },
    { part: 2, num: 11, emoji: '🧊', title: 'Khối lập phương, hộp', build: b11 },
    { part: 2, num: 12, emoji: '⚽', title: 'Khối cầu & khối trụ', build: b12 },
    { part: 2, num: 13, emoji: '✏️', title: 'Luyện tập', build: b13 },
    { part: 2, num: 14, emoji: '📦', title: 'Ôn tập hình khối', build: b14 },
    { part: 2, num: 15, emoji: '🏆', title: 'Ôn tập', build: b15 },
    { part: 2, num: 16, emoji: '🎨', title: 'Bé tập vẽ hình', build: b16 },
  ];
  list.forEach(l => l.id = 't2-b' + l.num);
  return {
    id: 't2', num: 2, name: 'Tập 2', emoji: '🔷',
    subtitle: 'Làm quen với hình khối',
    parts: [
      { n: 1, title: 'Hình phẳng cơ bản', chip: 'Phần 1' },
      { n: 2, title: 'Hình phẳng khác · Khối 3D', chip: 'Phần 2' },
    ],
    lessons: list,
  };
})();
