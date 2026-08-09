/* ================= LESSONS — TẬP 4 =================
   Tách gộp nhóm số lượng & Làm quen với so sánh.
   (bản sao theo sách "Toán tư duy cùng Gấu KIKI 4")
=================================================== */
const VOL_T4 = (() => {
  const G = Game;
  const { rnd, pick, shuffle, sample, range } = G;

  function optsAround(ans, n = 4, max = 10) {
    const set = new Set([ans]);
    let guard = 0;
    while (set.size < n && guard++ < 60) { const d = ans + (rnd(2) ? 1 : -1) * (1 + rnd(3)); if (d >= 0 && d <= max) set.add(d); }
    let x = 0; while (set.size < n) { if (x <= max && !set.has(x)) set.add(x); x++; if (x > max + n) break; }
    return shuffle([...set]);
  }
  const rep = (e, n) => Array(Math.max(0, n)).fill(e).join('');
  // ---- node helpers ----
  const numN = (n, blank) => ({ n, show: 'num', blank: !!blank });
  const dotN = (n, blank) => ({ n, show: 'dots', blank: !!blank });
  const objN = (n, g, blank) => ({ n, show: 'objs', g, blank: !!blank });
  // ---- number bond (một ô trống) ----
  function bond(prompt, mode, p1, p2, whole) {
    const b = [p1, p2, whole].find(x => x.blank);
    return { type: 'numberbond', mode, prompt, parts: [p1, p2], whole, answer: b.n, options: optsAround(b.n) };
  }
  const gop = (prompt, p1, p2) => bond(prompt, 'gop', p1, p2, numN(p1.n + p2.n, true)); // tìm tổng (parts obj/dot)
  const gopN = (prompt, a, b) => bond(prompt, 'gop', numN(a), numN(b), numN(a + b, true));
  const tach = (prompt, whole, part, otherBlank) => bond(prompt, 'tach', numN(part), numN(otherBlank, true), numN(whole)); // tìm phần còn lại
  // ---- dãy số (điền số) ----
  function seqNum(prompt, arr, answer, max = 12) {
    const seq = arr.map(x => x === null ? '?' : String(x));
    return { type: 'pattern', prompt, sequence: seq, options: shuffle(optsAround(answer, 4, max).map(v => ({ g: String(v), correct: v === answer }))) };
  }
  // cụm vật (bọc gọn để nhiều vật không tràn)
  const cluster = (e, n, fs = 22) => ({ html: `<span style="font-size:${fs}px;display:inline-flex;flex-wrap:wrap;justify-content:center;align-items:center;max-width:128px;line-height:1.1;gap:2px">${rep(e, n)}</span>` });
  // ---- so sánh nhóm (chạm nhóm đúng) ----
  const cmp = (prompt, groups, correctIdx) =>
    ({ type: 'tap', prompt, items: groups.map((gr, i) => ({ g: cluster(gr.e, gr.n), correct: i === correctIdx })) });
  // ---- so sánh hai số (khoanh số lớn/nhỏ hơn) ----
  const cmpNum = (prompt, a, b, wantLarger) =>
    ({ type: 'mc', cols: 2, prompt, options: [{ label: String(a), correct: wantLarger ? a > b : a < b }, { label: String(b), correct: wantLarger ? b > a : b < a }] });
  // ---- nối nhóm bằng nhau ----
  const eqMatch = (prompt, pairs) => ({ type: 'match', prompt, pairs: pairs.map(([x, y]) => [cluster(x.e, x.n, 18), cluster(y.e, y.n, 18)]) });
  // ---- khoanh vật cùng kích thước (ref + lựa chọn) ----
  const sizeGroup = (e, refSize, sizes, correctIdx) => ({ ref: { g: e, size: refSize }, targets: sizes.map((s, i) => ({ g: e, size: s, correct: i === correctIdx })) });

  /* ===================== PHẦN 1: TÁCH GỘP ===================== */

  // Bài 1: GỘP TRONG PHẠM VI 3
  function b1() {
    return [
      gop('Bài 1. Gộp lại có tất cả mấy chấm tròn?', dotN(1), dotN(2)),
      gop('Bài 2. Điền số thích hợp: có tất cả mấy ⭐?', objN(1, '⭐'), objN(1, '⭐')),
      gop('Bài 2. Có tất cả mấy chấm tròn?', dotN(2), dotN(1)),
      bond('Bài 3. Điền số vào ô trống (theo mẫu).', 'gop', objN(2, '🚗'), objN(1, '🚗'), numN(3, true)),
      bond('Bài 3. Điền số vào ô trống.', 'gop', objN(1, '🎈'), objN(2, '🎈'), numN(3, true)),
      seqNum('Bài 5. Điền số thích hợp vào ô trống.', [1, 3, 5, null], 7),
      seqNum('Bài 5. Điền số thích hợp vào ô trống.', [2, 4, 6, null], 8),
    ];
  }
  // Bài 2: GỘP TRONG PHẠM VI 5
  function b2() {
    return [
      bond('Bài 1. Điền số vào ô trống (theo mẫu).', 'gop', objN(3, '🦀'), objN(1, '🦀'), numN(4, true)),
      bond('Bài 1. Điền số vào ô trống.', 'gop', objN(2, '🪼'), objN(2, '🪼'), numN(4, true)),
      bond('Bài 1. Điền số vào ô trống.', 'gop', objN(3, '🐟'), objN(2, '🐟'), numN(5, true)),
      bond('Bài 1. Điền số vào ô trống.', 'gop', objN(1, '🐚'), objN(3, '🐚'), numN(4, true)),
      bond('Bài 2. Điền số vào ô trống.', 'gop', objN(3, '🐝'), objN(2, '🐝'), numN(5, true)),
      gop('Bài 3. Có tất cả mấy chấm tròn?', dotN(2), dotN(3)),
    ];
  }
  // Bài 3: GỘP TRONG PHẠM VI 10
  function b3() {
    return [
      bond('Bài 1. Điền số vào ô trống.', 'gop', dotN(1), dotN(2), numN(3, true)),
      bond('Bài 1. Điền số vào ô trống.', 'gop', dotN(3), dotN(6), numN(9, true)),
      bond('Bài 1. Điền số vào ô trống.', 'gop', dotN(5), dotN(4), numN(9, true)),
      gopN('Bài 2. 4 và 4 gộp lại được mấy?', 4, 4),
      bond('Bài 3. Điền số vào ô trống.', 'gop', objN(5, '🍎'), objN(4, '🍎'), numN(9, true)),
      bond('Bài 3. Điền số vào ô trống.', 'gop', objN(5, '🐸'), objN(5, '🐸'), numN(10, true)),
    ];
  }
  // Bài 4: LUYỆN TẬP VỀ GỘP NHÓM SỐ LƯỢNG (xúc xắc, ≤ 10)
  function b4() {
    return [
      gop('Bài 1. Gộp lại được mấy chấm tròn?', dotN(4), dotN(6)),
      gop('Bài 1. Gộp lại được mấy chấm tròn?', dotN(3), dotN(4)),
      gop('Bài 1. Gộp lại được mấy chấm tròn?', dotN(3), dotN(1)),
      gop('Bài 1. Gộp lại được mấy chấm tròn?', dotN(3), dotN(3)),
      gop('Bài 1. Gộp lại được mấy chấm tròn?', dotN(1), dotN(5)),
      gop('Bài 1. Gộp lại được mấy chấm tròn?', dotN(5), dotN(5)),
    ];
  }
  // Bài 5: TÁCH NHÓM SỐ LƯỢNG TRONG PHẠM VI 3
  function b5() {
    return [
      tach('Bài 1. 3 tách thành 2 và mấy? (theo mẫu)', 3, 2, 1),
      tach('Bài 1. 2 tách thành 1 và mấy?', 2, 1, 1),
      tach('Bài 1. 3 tách thành 3 và mấy?', 3, 3, 0),
      tach('Bài 2. 3 tách thành 1 và mấy?', 3, 1, 2),
      tach('Bài 2. 2 tách thành 0 và mấy?', 2, 0, 2),
    ];
  }
  // Bài 6: TÁCH TRONG PHẠM VI 5
  function b6() {
    return [
      bond('Bài 1. Điền số vào ô trống (theo mẫu).', 'tach', numN(2), numN(3, true), numN(5)),
      bond('Bài 1. Điền số vào ô trống.', 'tach', numN(2), numN(2, true), numN(4)),
      bond('Bài 1. Điền số vào ô trống.', 'tach', numN(1), numN(3, true), numN(4)),
      tach('Bài 3. 5 tách thành 3 và mấy?', 5, 3, 2),
      tach('Bài 3. 4 tách thành 1 và mấy?', 4, 1, 3),
      tach('Bài 4. 5 tách thành 4 và mấy?', 5, 4, 1),
    ];
  }
  // Bài 7: TÁCH TRONG PHẠM VI 10
  function b7() {
    return [
      tach('Bài 1. 10 tách thành 7 và mấy?', 10, 7, 3),
      tach('Bài 1. 6 tách thành 4 và mấy?', 6, 4, 2),
      tach('Bài 1. 9 tách thành 2 và mấy?', 9, 2, 7),
      tach('Bài 1. 8 tách thành 4 và mấy?', 8, 4, 4),
      bond('Bài 3. Điền số vào ô trống (theo mẫu).', 'tach', numN(5), numN(5, true), numN(10)),
      bond('Bài 4. 5 bông hoa gồm 3 cam và mấy tím?', 'tach', numN(3), numN(2, true), numN(5)),
    ];
  }
  // Bài 8: LUYỆN TẬP TÁCH
  function b8() {
    return [
      tach('Bài 1. 6 gồm 1 và mấy?', 6, 1, 5),
      tach('Bài 1. 6 gồm 4 và mấy?', 6, 4, 2),
      tach('Bài 1. 9 gồm 6 và mấy?', 9, 6, 3),
      tach('Bài 1. 8 gồm 5 và mấy?', 8, 5, 3),
      tach('Bài 2. 7 gồm 2 và mấy?', 7, 2, 5),
    ];
  }
  // Bài 9: VẬT CÓ KÍCH THƯỚC & SỐ LƯỢNG (so sánh)
  function b9() {
    return [
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 1. Chạm vào quả <b>cùng kích thước</b> với quả trong ô hồng.',
        groups: [
          sizeGroup('🍎', 48, [56, 48, 36], 1),
          sizeGroup('🍍', 34, [56, 44, 34], 2),
          sizeGroup('🍇', 46, [58, 36, 46], 2),
          sizeGroup('🥭', 56, [56, 44, 32], 0),
        ] },
      eqMatch('Bài 2. Nối 2 nhóm có <b>số lượng bằng nhau</b>.',
        [[{ e: '🦋', n: 5 }, { e: '🐌', n: 5 }], [{ e: '🐝', n: 6 }, { e: '🐞', n: 6 }], [{ e: '🍓', n: 8 }, { e: '🍋', n: 8 }]]),
    ];
  }
  // Bài 10: SỐ LƯỢNG BẰNG NHAU (nối nhóm bằng nhau)
  function b10() {
    return [
      eqMatch('Bài 1. Nối 2 nhóm có <b>số lượng bằng nhau</b>.',
        [[{ e: '🍬', n: 3 }, { e: '🧁', n: 3 }], [{ e: '🍢', n: 4 }, { e: '🍭', n: 4 }], [{ e: '🍫', n: 5 }, { e: '👜', n: 5 }], [{ e: '🍡', n: 2 }, { e: '🍮', n: 2 }]]),
      eqMatch('Bài 1. Nối 2 nhóm có <b>số lượng bằng nhau</b>.',
        [[{ e: '🍎', n: 9 }, { e: '🌶️', n: 9 }], [{ e: '🍓', n: 8 }, { e: '🍋', n: 8 }], [{ e: '🍆', n: 7 }, { e: '🫐', n: 7 }]]),
    ];
  }

  /* ===================== PHẦN 2: SO SÁNH ===================== */

  // Bài 11: SO SÁNH HƠN – KÉM (nhóm nhiều hơn / nhiều nhất)
  function b11() {
    return [
      cmp('Bài 1. Chạm vào nhóm có <b>nhiều hơn</b>.', [{ e: '🥕', n: 2 }, { e: '🍅', n: 3 }], 1),
      cmp('Bài 2. Chạm vào nhóm có <b>nhiều hơn</b>.', [{ e: '🍎', n: 5 }, { e: '🍏', n: 8 }], 1),
      cmp('Bài 3. Chạm vào nhóm có <b>nhiều nhất</b>.', [{ e: '🐑', n: 6 }, { e: '🐑', n: 9 }, { e: '🐑', n: 8 }], 1),
      cmp('Bài 4. Chạm vào nhóm có <b>nhiều nhất</b>.', [{ e: '☂️', n: 8 }, { e: '🌸', n: 7 }, { e: '✏️', n: 9 }], 2),
      cmp('Bài 5. Chạm vào hàng có <b>nhiều đồ chơi hơn</b>.', [{ e: '🧸', n: 5 }, { e: '🧸', n: 6 }], 1),
    ];
  }
  // Bài 12: NHIỀU HƠN – ÍT HƠN
  function b12() {
    return [
      cmp('Bài 1. Chạm vào nhóm có <b>nhiều nhất</b>.', [{ e: '🧁', n: 9 }, { e: '🍩', n: 6 }, { e: '🍪', n: 4 }], 0),
      cmp('Bài 2. Chạm vào nhóm có <b>ít nhất</b>.', [{ e: '🍭', n: 3 }, { e: '🍬', n: 7 }, { e: '🍫', n: 5 }], 0),
      cmp('Bài 3. Chạm vào nhóm có <b>nhiều hơn</b>.', [{ e: '🐝', n: 5 }, { e: '🐞', n: 3 }], 0),
      cmp('Bài 3. Chạm vào nhóm có <b>nhiều hơn</b>.', [{ e: '🎈', n: 4 }, { e: '🎈', n: 6 }], 1),
      { type: 'tally', prompt: 'Bài 4. Đếm rồi chọn số lượng mỗi loại.',
        gridGlyphs: shuffle([].concat(Array(8).fill('🌸'), Array(6).fill('🏺'))), gridSize: 28,
        rows: [{ g: '🌸', answer: 8, options: optsAround(8) }, { g: '🏺', answer: 6, options: optsAround(6) }] },
    ];
  }
  // Bài 13: THÊM HOẶC BỚT NHÓM SỐ LƯỢNG
  function b13() {
    const addsub = (prompt, a, op, b) => {
      const ans = op === '+' ? a + b : a - b;
      return { type: 'mc', cols: 4, prompt, options: optsAround(ans).map(v => ({ label: String(v), correct: v === ans })) };
    };
    return [
      addsub('Bài 1. 2 thêm 2 là mấy?', 2, '+', 2),
      addsub('Bài 1. 3 thêm 1 là mấy?', 3, '+', 1),
      addsub('Bài 1. 6 bớt 1 còn mấy?', 6, '-', 1),
      addsub('Bài 1. 7 bớt 2 còn mấy?', 7, '-', 2),
      cmp('Bài 2. Chạm vào nhóm có <b>nhiều hơn</b>.', [{ e: '🚗', n: 5 }, { e: '✈️', n: 7 }], 1),
    ];
  }
  // Bài 14: ÔN TẬP
  function b14() {
    return [
      cmp('Bài 1. Chạm vào bên có <b>nhiều hơn</b>.', [{ e: '🔵', n: 6 }, { e: '🔴', n: 5 }], 0),
      cmp('Bài 1. Chạm vào bên có <b>nhiều hơn</b>.', [{ e: '🟢', n: 4 }, { e: '🟡', n: 3 }], 0),
      cmpNum('Bài 2. Khoanh vào số <b>lớn hơn</b>.', 7, 4, true),
      cmpNum('Bài 2. Khoanh vào số <b>lớn hơn</b>.', 5, 9, true),
      seqNum('Bài 3. Điền số còn thiếu.', [0, null, 2, 3], 1, 10),
      eqMatch('Bài 4. Nối 2 nhóm có số lượng <b>bằng nhau</b>.',
        [[{ e: '🐔', n: 4 }, { e: '🦆', n: 4 }], [{ e: '🥣', n: 1 }, { e: '🥄', n: 1 }], [{ e: '☁️', n: 5 }, { e: '☀️', n: 5 }], [{ e: '👦', n: 3 }, { e: '👧', n: 3 }]]),
    ];
  }

  const list = [
    { part: 1, num: 1, emoji: '🍎', title: 'Gộp số lượng (≤ 3)', build: b1 },
    { part: 1, num: 2, emoji: '🦀', title: 'Gộp số lượng (≤ 5)', build: b2 },
    { part: 1, num: 3, emoji: '🐸', title: 'Gộp số lượng (≤ 10)', build: b3 },
    { part: 1, num: 4, emoji: '➕', title: 'Luyện tập gộp', build: b4 },
    { part: 1, num: 5, emoji: '🍄', title: 'Tách số lượng (≤ 3)', build: b5 },
    { part: 1, num: 6, emoji: '🧤', title: 'Tách số lượng (≤ 5)', build: b6 },
    { part: 1, num: 7, emoji: '⭐', title: 'Tách số lượng (≤ 10)', build: b7 },
    { part: 1, num: 8, emoji: '🐞', title: 'Luyện tập tách', build: b8 },
    { part: 2, num: 9, emoji: '🍍', title: 'Kích thước & số lượng', build: b9 },
    { part: 2, num: 10, emoji: '🟰', title: 'Số lượng bằng nhau', build: b10 },
    { part: 2, num: 11, emoji: '🍅', title: 'So sánh hơn – kém', build: b11 },
    { part: 2, num: 12, emoji: '🧁', title: 'Nhiều hơn – ít hơn', build: b12 },
    { part: 2, num: 13, emoji: '✈️', title: 'Thêm hoặc bớt', build: b13 },
    { part: 2, num: 14, emoji: '🏆', title: 'Ôn tập', build: b14 },
  ];
  list.forEach(l => l.id = 't4-b' + l.num);
  return {
    id: 't4', num: 4, name: 'Tập 4', emoji: '🧮',
    subtitle: 'Tách gộp số lượng · So sánh',
    parts: [
      { n: 1, title: 'Tách gộp nhóm số lượng', chip: 'Phần 1' },
      { n: 2, title: 'Làm quen với so sánh', chip: 'Phần 2' },
    ],
    lessons: list,
  };
})();
