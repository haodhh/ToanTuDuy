/* ================= LESSONS =================
   20 bài học, mỗi bài là một hàm build() sinh
   ra danh sách câu hỏi NGẪU NHIÊN (chơi lại
   mỗi lần một khác). Dựa theo mục lục sách.
=========================================== */
const LESSONS = (() => {
  const G = Game;
  const { rnd, pick, shuffle, sample, range, COLOR_KEYS, SHAPES } = G;

  /* --- kho emoji --- */
  const P = {
    animal: ['🐶', '🐱', '🐰', '🐻', '🐼', '🦁', '🐯', '🐸', '🐵', '🐷', '🐮', '🐔', '🐤', '🐧', '🦉', '🐢', '🐟', '🐬', '🦀', '🐙', '🦋', '🐝', '🐌', '🐞', '🐴', '🦊', '🐭'],
    fruit: ['🍎', '🍐', '🍊', '🍌', '🍇', '🍉', '🍓', '🍑', '🥝', '🥭', '🍍', '🍒', '🥥'],
    veg: ['🥕', '🍆', '🌽', '🥦', '🍅', '🌶️', '🥔', '🧅', '🥬'],
    vehicle: ['🚗', '🚕', '🚌', '🚓', '🚑', '🚒', '🚚', '🚜', '🚲', '🏍️', '✈️', '🚀', '🚁', '⛵', '🚂', '🛴'],
    toy: ['🎈', '⚽', '🏀', '🧸', '🎁', '🪁', '🎨', '✏️', '📚', '🪀', '🎀', '🥁', '🎺'],
    food: ['🍔', '🍕', '🍟', '🌭', '🍩', '🍪', '🍰', '🧁', '🍦', '🍭', '🍬', '🍫'],
    sea: ['🐟', '🐠', '🐬', '🐳', '🐙', '🦀', '🦑', '🦐', '🐢', '⭐', '🐚', '🦈'],
    bird: ['🐔', '🐤', '🐧', '🦉', '🦆', '🦅', '🦜', '🕊️', '🦩'],
  };
  const uniq = (arr) => [...new Set(arr)];
  const allObjects = uniq([].concat(P.animal, P.fruit, P.vehicle, P.toy, P.food));
  const animalSea = uniq([].concat(P.animal, P.sea));

  // glyph hình có màu ngẫu nhiên
  const colorShape = (shape, color) => ({ shape, color });

  /* helper: tạo N câu bằng cách gọi gen() N lần, tránh trùng nếu có key */
  function many(n, gen) { return range(n).map(() => gen()); }

  /* ========== PHẦN 1: XÁC ĐỊNH VỊ TRÍ ========== */

  // Bài 1: TRÊN – DƯỚI – Ở GIỮA  (bản sao trung thực theo sách, trang 4-5, 7 bài nhỏ)
  function b1() {
    const S = G.Scenes;
    const pillow = { shape: 'square', color: 'green' };
    return [
      // Bài 1. Đồ vật nào ở dưới bàn?  (đáp án: C. đôi dép)
      {
        type: 'mc', noShuffle: true, cols: 1,
        prompt: 'Bài 1. Trong hình dưới đây, đồ vật nào ở <b>dưới bàn</b>?',
        sceneHTML: S.table(['🏺', '⏰'], ['🩴']),
        options: [
          { emoji: '🏺', label: 'A. Lọ hoa', correct: false },
          { emoji: '⏰', label: 'B. Đồng hồ để bàn', correct: false },
          { emoji: '🩴', label: 'C. Đôi dép', correct: true },
        ]
      },
      // Bài 2. Cái nào nằm ở giữa?  (hàng ngang: hoa – nơ – gối; đáp án: B. cái nơ)
      {
        type: 'mc', noShuffle: true, cols: 1,
        prompt: 'Bài 2. Trong hình dưới đây, cái nào nằm <b>ở giữa</b>?',
        sceneHTML: S.row(['🌸', '🎀', pillow]),
        options: [
          { emoji: '🌸', label: 'A. Bông hoa', correct: false },
          { emoji: '🎀', label: 'B. Cái nơ', correct: true },
          { glyph: pillow, label: 'C. Cái gối', correct: false },
        ]
      },
      // Bài 3. Con bọ rùa ở vị trí nào? (trong lọ)  (đáp án: A)
      {
        type: 'mc', noShuffle: true, cols: 2,
        prompt: 'Bài 3. Bé hãy xem hình 🐞 và cho biết ở vị trí nào?',
        sceneHTML: S.jar('🐞'),
        options: [
          { label: 'A. Trong lọ', correct: true },
          { label: 'B. Ngoài lọ', correct: false },
        ]
      },
      // Bài 4. Khối chữ ABC nằm ở vị trí nào? (trên cùng bên trái)  (đáp án: A)
      {
        type: 'mc', noShuffle: true, cols: 1,
        prompt: 'Bài 4. Khối chữ 🔤 nằm ở vị trí nào trong hình dưới đây?',
        sceneHTML: S.grid3(['🔤', '🗼', '🧸', '🚗', '🧩', '🏐', '🎹', '🤖', '🪀']),
        options: [
          { label: 'A. Trên cùng bên trái', correct: true },
          { label: 'B. Trên cùng bên phải', correct: false },
          { label: 'C. Dưới cùng bên phải', correct: false },
          { label: 'D. Dưới cùng bên trái', correct: false },
        ]
      },
      // Bài 5. Khoanh vào vật ở DƯỚI trong mỗi hình (3 hình có bàn/giường)
      {
        type: 'multitap', layout: 'row', groupFrame: 'table',
        prompt: 'Bài 5. Chạm vào vật ở <b>dưới</b> trong mỗi hình sau.',
        groups: [
          { targets: [{ g: '🏺', correct: false }, { g: '⚽', correct: true }] },
          { targets: [{ g: '💐', correct: false }, { g: '🎁', correct: true }] },
          { targets: [{ g: '🛏️', correct: false }, { g: '👟', correct: true }] },
        ]
      },
      // Bài 6. Khoanh vào vật ở TRÊN trong mỗi nhóm (6 nhóm xếp dọc)
      {
        type: 'multitap', layout: 'grid', groupFrame: 'pink', groupLayout: 'v',
        prompt: 'Bài 6. Chạm vào vật ở <b>trên</b> trong mỗi nhóm sau.',
        groups: [
          { targets: [{ g: '🧁', correct: true }, { g: '🧁', correct: false }] },
          { targets: [{ g: '🍓', correct: true }, { g: '🍏', correct: false }] },
          { targets: [{ g: '🍫', correct: true }, { g: '🍔', correct: false }] },
          { targets: [{ g: '🐤', correct: true }, { g: '🐤', correct: false }, { g: '🐤', correct: false }] },
          { targets: [{ g: '🦋', correct: true }, { g: '🦋', correct: false }, { g: '🦋', correct: false }] },
          { targets: [{ g: '🧸', correct: true }, { g: '🧸', correct: false }, { g: '🧸', correct: false }] },
        ]
      },
      // Bài 7. Đánh dấu X vào ô trống chậu cây ở GIỮA (3 chậu, đánh dấu chậu giữa)
      {
        type: 'multitap', layout: 'row', groupFrame: 'none', groupLayout: 'h', pot: true,
        prompt: 'Bài 7. Đánh dấu ✕ vào ô trống <b>chậu cây ở giữa</b>.',
        groups: [
          { targets: [{ g: '🌱', correct: false }, { g: '🪴', correct: true }, { g: '🌿', correct: false }] },
        ]
      },
    ];
  }

  // Bài 2: TRÁI – PHẢI, TRONG – NGOÀI (bản sao theo sách trang 6-7)
  function b2() {
    const S = G.Scenes;
    const IN = (cont, a) => ({ html: `<span class="io"><span class="io-c">${cont}</span><span class="io-a io-in">${a}</span></span>` });
    const OUT = (cont, a) => ({ html: `<span class="io"><span class="io-a">${a}</span><span class="io-c">${cont}</span></span>` });
    return [
      { type: 'mc', noShuffle: true, cols: 1,
        prompt: 'Bài 1. Trong hình dưới đây, cái nào nằm ở <b>bên trái</b>?',
        sceneHTML: S.row([{ html: Art.stamp(58) }, '🌷']),
        options: [
          { glyph: { html: Art.stamp(38) }, label: 'A. Con tem', correct: true },
          { emoji: '🌷', label: 'B. Bông hoa tuy líp', correct: false },
        ] },
      { type: 'mc', noShuffle: true, cols: 1,
        prompt: 'Bài 2. Bên <b>phải</b> của con chuột 🐭 là con nào?',
        sceneHTML: S.row(['🐱', '🐭', '🐢']),
        options: [
          { emoji: '🐱', label: 'A. Con mèo', correct: false },
          { emoji: '🐭', label: 'B. Con chuột', correct: false },
          { emoji: '🐢', label: 'C. Con rùa', correct: true },
        ] },
      { type: 'mc', noShuffle: true, cols: 1,
        prompt: 'Bài 3. Bên <b>trái</b> con ong 🐝 là con nào?',
        sceneHTML: S.row(['🐞', '🐝', '🦋']),
        options: [
          { emoji: '🐞', label: 'A. Con bọ rùa', correct: true },
          { emoji: '🐝', label: 'B. Con ong', correct: false },
          { emoji: '🦋', label: 'C. Con bướm', correct: false },
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 4. Chạm vào đồ vật ở <b>bên trái</b> trong mỗi cặp.',
        groups: [
          { targets: [{ g: '🧥', correct: true }, { g: '🧤', correct: false }] },
          { targets: [{ g: '🧢', correct: true }, { g: '🧣', correct: false }] },
          { targets: [{ g: '🧦', correct: true }, { g: '🥿', correct: false }] },
          { targets: [{ g: '👗', correct: true }, { g: '🩳', correct: false }] },
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 5. Chạm vào hình đúng theo yêu cầu mỗi ô.',
        groups: [
          { title: 'Con gà nằm trong ổ', targets: [{ ...OUT('🪺', '🐔'), correct: false }, { ...IN('🪺', '🐔'), correct: true }] },
          { title: 'Hoa quả nằm trong túi', targets: [{ ...IN('🛍️', '🍎'), correct: true }, { ...OUT('🛍️', '🍎'), correct: false }] },
          { title: 'Con bọ ở ngoài lọ', targets: [{ ...IN('🫙', '🐞'), correct: false }, { ...OUT('🫙', '🐞'), correct: true }] },
          { title: 'Chú gà ngoài vỏ trứng', targets: [{ ...OUT('🥚', '🐤'), correct: true }, { ...IN('🥚', '🐤'), correct: false }] },
        ] },
      { type: 'match',
        prompt: 'Bài 6. Nối 2 hình <b>trái ngược</b> nhau (trong ↔ ngoài).',
        pairs: [
          [OUT('🪺', '🐦'), IN('🪺', '🐦')],
          [IN('📦', '🐱'), OUT('📦', '🐱')],
          [IN('🏠', '🐶'), OUT('🏠', '🐶')],
        ] },
    ];
  }

  // Bài 3: XA – GẦN, TO – NHỎ (bản sao theo sách trang 8-9)
  function b3() {
    const XS = 28, S = 36, M = 48, L = 62, XL = 74;
    const pair = (e, aS, bS, aC) => ({ targets: [{ g: e, size: aS, correct: aC }, { g: e, size: bS, correct: !aC }] });
    const trio = (e, s1, s2, s3, ci) => ({ targets: [0, 1, 2].map(i => ({ g: e, size: [s1, s2, s3][i], correct: i === ci })) });
    return [
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'h', baseline: true,
        prompt: 'Bài 1. Chạm vào con vật/vật ở <b>xa hơn</b> (nhỏ hơn) trong mỗi hình.',
        groups: [pair('🦁', XL, S, false), pair('🐶', XL, S, false), pair('🏠', XL, S, false)] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'h', baseline: true,
        prompt: 'Bài 2. Chạm vào cái cây và con vịt ở <b>gần hơn</b> (to hơn).',
        groups: [pair('🌳', XL, S, true), pair('🦆', XL, S, true)] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'h', baseline: true,
        prompt: 'Bài 3. Chạm vào vật cùng loại <b>to hơn</b> vật đã cho.',
        groups: [
          { ref: { g: '⛄', size: S }, targets: [{ g: '⛄', size: L, correct: true }, { g: '⛄', size: XS, correct: false }] },
          { ref: { g: '🥕', size: S }, targets: [{ g: '🥕', size: L, correct: true }, { g: '🥕', size: XS, correct: false }] },
          { ref: { g: '🍬', size: S }, targets: [{ g: '🍬', size: L, correct: true }, { g: '🍬', size: XS, correct: false }] },
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 4. Chạm vào vật <b>bé nhất</b> trong mỗi ô.',
        groups: [
          trio('🎃', 54, 30, 58, 1), trio('🍐', 54, 42, 30, 2),
          trio('🌼', 30, 42, 54, 0), trio('🍆', 42, 30, 54, 1),
          trio('🌶️', 30, 54, 42, 0), trio('🥔', 42, 54, 30, 2),
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 5. Chạm vào vật <b>cùng kích thước</b> với vật viền hồng.',
        groups: [
          { ref: { g: '🐨', size: 54 }, targets: [{ g: '🐨', size: 32, correct: false }, { g: '🐨', size: 44, correct: false }, { g: '🐨', size: 54, correct: true }] },
          { ref: { g: '⭐', size: 54 }, targets: [{ g: '⭐', size: 44, correct: false }, { g: '⭐', size: 32, correct: false }, { g: '⭐', size: 54, correct: true }] },
          { ref: { g: '🐟', size: 32 }, targets: [{ g: '🐟', size: 54, correct: false }, { g: '🐟', size: 32, correct: true }, { g: '🐟', size: 44, correct: false }] },
          { ref: { g: '🧸', size: 44 }, targets: [{ g: '🧸', size: 54, correct: false }, { g: '🧸', size: 32, correct: false }, { g: '🧸', size: 44, correct: true }] },
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 6. Chạm vào vật <b>to nhất</b> trong mỗi ô.',
        groups: [
          trio('🫐', 58, 30, 44, 0), trio('🍍', 44, 30, 58, 2),
          trio('🍐', 30, 58, 44, 1), trio('🍎', 58, 44, 30, 0),
        ] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 7. Chạm vào con <b>lớn nhất</b> và con <b>nhỏ nhất</b> trong mỗi nhóm.',
        groups: [
          { targets: [{ g: '🐵', size: M, correct: false }, { g: '🐵', size: XL, correct: true }, { g: '🐵', size: XS, correct: true }] },
          { targets: [{ g: '🐋', size: XL, correct: true }, { g: '🐋', size: XS, correct: true }, { g: '🐋', size: M, correct: false }] },
        ] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 8. Chạm vào vật <b>nhỏ hơn</b> trong mỗi cặp.',
        groups: [pair('🍋', XL, S, false), pair('🍉', XL, S, false), pair('🍇', S, XL, true)] },
    ];
  }

  // Bài 4: CAO – THẤP (bản sao theo sách trang 10-11)
  function b4() {
    const XS = 30, M = 46, L = 62, XL = 78;
    return [
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h', baseline: true,
        prompt: 'Bài 1. Chạm vào hình đúng theo yêu cầu mỗi ô.',
        groups: [
          { title: 'Giá sách nào cao hơn?', targets: [{ html: Art.shelf(120), correct: true }, { html: Art.shelf(78), correct: false }] },
          { title: 'Cây nào thấp hơn?', targets: [{ g: '🌴', size: XL, correct: false }, { g: '🌴', size: M, correct: true }] },
          { title: 'Lọ hoa nào thấp hơn?', targets: [{ g: '💐', size: XL, correct: false }, { g: '💐', size: M, correct: true }] },
          { title: 'Hàng rào nào cao hơn?', targets: [{ html: Art.fence(92), correct: true }, { html: Art.fence(56), correct: false }] },
          { title: 'Bạn nào cao nhất?', targets: [{ g: '👧', size: L, correct: false }, { g: '👧', size: M, correct: false }, { g: '👧', size: XL, correct: true }] },
        ] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'h', baseline: true,
        prompt: 'Bài 2. Chạm vào con vật <b>lớn hơn</b> trong mỗi nhóm.',
        groups: [
          { targets: [{ g: '🦕', size: XL, correct: true }, { g: '🦖', size: M, correct: false }] },
          { targets: [{ g: '🦖', size: M, correct: false }, { g: '🦕', size: XL, correct: true }] },
          { targets: [{ g: '🦕', size: M, correct: false }, { g: '🦖', size: XL, correct: true }] },
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h', baseline: true,
        prompt: 'Bài 3. Chạm vào con vật/vật đúng theo yêu cầu.',
        groups: [
          { title: 'Con vật cao hơn', targets: [{ g: '🦔', size: M, correct: false }, { g: '🦒', size: XL, correct: true }] },
          { title: 'Con vật thấp hơn', targets: [{ g: '🦆', size: M, correct: true }, { g: '🦩', size: XL, correct: false }] },
          { title: 'Vật cao hơn', targets: [{ g: '🎩', size: L, correct: true }, { g: '👒', size: M, correct: false }] },
          { title: 'Cây hoa thấp hơn', targets: [{ g: '🌺', size: XL, correct: false }, { g: '🌻', size: M, correct: true }] },
          { title: 'Con vật cao hơn', targets: [{ g: '🐌', size: M, correct: false }, { g: '🦜', size: XL, correct: true }] },
          { title: 'Bạn thấp hơn', targets: [{ g: '👦', size: XL, correct: false }, { g: '👦', size: M, correct: true }] },
          { title: 'Con vật cao hơn', targets: [{ g: '🦚', size: XL, correct: true }, { g: '🐔', size: M, correct: false }] },
          { title: 'Con vật thấp hơn', targets: [{ g: '🐫', size: XL, correct: false }, { g: '🐸', size: M, correct: true }] },
        ] },
    ];
  }

  // Bài 5: DÀI – NGẮN (bản sao theo sách trang 12-13, dùng SVG bút/thước/rắn để chỉnh độ dài)
  function b5() {
    const pRow = (letter, len, color) => `<div style="display:flex;align-items:center;gap:10px;margin:2px 0"><b style="font-size:22px;width:22px;color:#1e88e5">${letter}</b>${Art.pencil(len, color)}</div>`;
    const lane = (n, wig, color) => ({ html: `<div style="display:flex;align-items:center;gap:6px">🐇 ${Art.path(wig, color, 90, 34)} 🥕 <b style="font-size:20px;color:#e53935">${n}</b></div>` });
    return [
      { type: 'mc', noShuffle: true, cols: 3,
        prompt: 'Bài 1. Chạm vào chữ cái dưới chiếc bút chì <b>dài nhất</b>.',
        sceneHTML: `<div style="display:flex;flex-direction:column;align-items:flex-start">${pRow('A', 210, '#e53935')}${pRow('B', 150, '#fb8c00')}${pRow('C', 190, '#43a047')}</div>`,
        options: [
          { label: 'A', correct: true }, { label: 'B', correct: false }, { label: 'C', correct: false },
        ] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'v',
        prompt: 'Bài 2. Chạm vào vật <b>dài hơn</b> trong mỗi khung.',
        groups: [
          { targets: [{ html: Art.crayon(160, '#43a047'), correct: true }, { html: Art.crayon(96, '#1e88e5'), correct: false }] },
          { targets: [{ html: Art.snake(170, '#ef6c00'), correct: true }, { html: Art.snake(86, '#66bb6a'), correct: false }] },
        ] },
      { type: 'multitap', layout: 'row', groupFrame: 'none', groupLayout: 'v',
        prompt: 'Bài 3. Chạm vào đường đi giúp thỏ đến củ cà rốt <b>nhanh nhất</b>.',
        groups: [
          { targets: [lane1(lane), lane2(lane), lane3(lane), lane4(lane)] },
        ] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'v',
        prompt: 'Bài 4. Chạm vào vật <b>dài hơn</b> trong mỗi cặp.',
        groups: [
          { title: 'Dây leo', targets: [{ html: `<span style="display:inline-flex;align-items:center">🐒${Art.path(4, '#66bb6a', 120, 26)}</span>`, correct: true }, { html: `<span style="display:inline-flex;align-items:center">🐒${Art.path(2, '#66bb6a', 60, 26)}</span>`, correct: false }] },
          { title: 'Bím tóc', targets: [{ html: `<span style="display:inline-flex;align-items:center">👧${Art.path(4, '#6d4c41', 110, 26)}</span>`, correct: true }, { html: `<span style="display:inline-flex;align-items:center">👧${Art.path(2, '#6d4c41', 56, 26)}</span>`, correct: false }] },
          { title: 'Đoàn tàu', targets: [{ html: `<span style="font-size:26px">🚂🚃🚃🚃🚃</span>`, correct: true }, { html: `<span style="font-size:26px">🚂🚃🚃</span>`, correct: false }] },
          { title: 'Con rắn', targets: [{ html: Art.snake(150, '#8e24aa'), correct: true }, { html: Art.snake(80, '#ec407a'), correct: false }] },
        ] },
      { type: 'multitap', layout: 'row', groupFrame: 'box', groupLayout: 'v',
        prompt: 'Bài 5. Chạm vào chiếc bút chì <b>dài nhất</b>.',
        groups: [
          { targets: [
            { html: Art.pencil(150, '#e53935'), correct: false },
            { html: Art.pencil(140, '#fb8c00'), correct: false },
            { html: Art.pencil(110, '#fdd835'), correct: false },
            { html: Art.pencil(160, '#43a047'), correct: false },
            { html: Art.pencil(210, '#1565c0'), correct: true },
            { html: Art.pencil(155, '#4dd0e1'), correct: false },
          ] },
        ] },
    ];
  }
  function lane1(lane) { return { ...lane('①', 0, '#1e88e5'), correct: true }; }
  function lane2(lane) { return { ...lane('②', 3, '#8e24aa'), correct: false }; }
  function lane3(lane) { return { ...lane('③', 2, '#ec407a'), correct: false }; }
  function lane4(lane) { return { ...lane('④', 4, '#43a047'), correct: false }; }

  // Bài 6: CÁC PHƯƠNG HƯỚNG (bản sao theo sách trang 14-15)
  function b6() {
    const rot = (a, deg) => ({ html: `<span style="display:inline-block;transform:rotate(${deg}deg);font-size:30px">${a}</span>` });
    const flip = (a) => ({ html: `<span style="display:inline-block;transform:scaleX(-1);font-size:30px">${a}</span>` });
    const combo = (a, arrow) => ({ html: `<span style="font-size:28px;white-space:nowrap">${a}${arrow}</span>` });
    return [
      { type: 'match', prompt: 'Bài 1a. Nối con vật với mũi tên <b>cùng hướng</b>.',
        pairs: [[combo('🐌', '➡️'), '➡️'], [combo('🐞', '⬆️'), '⬆️'], [combo('🕷️', '⬇️'), '⬇️'], [combo('🐝', '⬅️'), '⬅️']] },
      { type: 'match', prompt: 'Bài 1b. Nối con cá với mũi tên <b>cùng hướng</b>.',
        pairs: [[combo('🐟', '⬅️'), '⬅️'], [combo('🐠', '➡️'), '➡️'], [combo('🐡', '↗️'), '↗️'], [combo('🐥', '↙️'), '↙️']] },
      { type: 'match', prompt: 'Bài 1c. Nối chú gà với mũi tên <b>cùng hướng</b>.',
        pairs: [[combo('🐔', '⬅️'), '⬅️'], [combo('🐤', '⬆️'), '⬆️'], [combo('🐓', '⬇️'), '⬇️'], [combo('🦃', '➡️'), '➡️']] },
      { type: 'tally', prompt: 'Bài 2. Đếm số con bọ rùa theo mỗi hướng rồi chọn số.',
        gridGlyphs: shuffle([].concat(Array(6).fill(rot('🐞', 0)), Array(9).fill(rot('🐞', 180)))), gridSize: 30,
        rows: [{ g: rot('🐞', 0), answer: 6, options: optionsAround(6, 4) }, { g: rot('🐞', 180), answer: 9, options: optionsAround(9, 4) }] },
      { type: 'tally', prompt: 'Bài 3. Đếm số con koala quay mỗi bên rồi chọn số.',
        gridGlyphs: shuffle([].concat(Array(8).fill('🐨'), Array(7).fill(flip('🐨')))), gridSize: 30,
        rows: [{ g: '🐨', answer: 8, options: optionsAround(8, 4) }, { g: flip('🐨'), answer: 7, options: optionsAround(7, 4) }] },
      { type: 'multitap', layout: 'grid', groupFrame: 'box', groupLayout: 'h',
        prompt: 'Bài 4. Chạm vào mũi tên <b>ngược hướng</b> với mũi tên đã cho.',
        groups: [
          { ref: { g: '⬆️' }, targets: [{ g: '⬇️', correct: true }, { g: '⬅️', correct: false }, { g: '➡️', correct: false }] },
          { ref: { g: '↙️' }, targets: [{ g: '↗️', correct: true }, { g: '⬆️', correct: false }, { g: '⬇️', correct: false }] },
          { ref: { g: '⬅️' }, targets: [{ g: '➡️', correct: true }, { g: '⬆️', correct: false }, { g: '⬇️', correct: false }] },
          { ref: { g: '↗️' }, targets: [{ g: '↙️', correct: true }, { g: '⬅️', correct: false }, { g: '➡️', correct: false }] },
          { ref: { g: '⬇️' }, targets: [{ g: '⬆️', correct: true }, { g: '⬅️', correct: false }, { g: '➡️', correct: false }] },
        ] },
    ];
  }

  function optionsAround(ans, n) {
    const set = new Set([ans]);
    while (set.size < n) { const d = ans + (rnd(2) ? 1 : -1) * (1 + rnd(3)); if (d > 0) set.add(d); }
    return shuffle([...set]);
  }

  // Bài 7: LÀM QUEN THỐNG KÊ (bản sao theo sách trang 16-17)
  function b7() {
    const tri = (c) => ({ shape: 'triangle', color: c });
    const triGrid = ['yellow', 'green', 'red', 'green', 'blue', 'blue', 'yellow', 'blue', 'red', 'green', 'blue', 'green', 'green', 'yellow', 'red', 'yellow', 'blue', 'green', 'yellow', 'blue'].map(tri);
    const sea = shuffle([].concat(Array(7).fill('🐬'), Array(5).fill('🪼'), Array(6).fill('🐙'), Array(6).fill('⭐')));
    const farm = shuffle([].concat(Array(4).fill('🐴'), Array(3).fill('🥬'), Array(7).fill('🥕'), Array(2).fill('🐄'), Array(3).fill('🐑'), Array(3).fill('🎃')));
    return [
      { type: 'tally', prompt: 'Bài 1. Đếm số hình tam giác mỗi màu rồi chọn số.',
        gridGlyphs: triGrid, gridSize: 30,
        rows: [{ g: tri('yellow'), answer: 5, options: optionsAround(5, 4) }, { g: tri('red'), answer: 3, options: optionsAround(3, 4) }, { g: tri('blue'), answer: 6, options: optionsAround(6, 4) }, { g: tri('green'), answer: 6, options: optionsAround(6, 4) }] },
      { type: 'tally', prompt: 'Bài 2. Đếm số lượng từng con vật biển rồi chọn số.',
        gridGlyphs: sea, gridSize: 30,
        rows: [{ g: '🐬', answer: 7, options: optionsAround(7, 4) }, { g: '🪼', answer: 5, options: optionsAround(5, 4) }, { g: '🐙', answer: 6, options: optionsAround(6, 4) }, { g: '⭐', answer: 6, options: optionsAround(6, 4) }] },
      { type: 'tally', prompt: 'Bài 3. Đếm số con vật, cây trong tranh rồi chọn số.',
        gridGlyphs: farm, gridSize: 30,
        rows: [{ g: '🐴', answer: 4, options: optionsAround(4, 4) }, { g: '🥬', answer: 3, options: optionsAround(3, 4) }, { g: '🥕', answer: 7, options: optionsAround(7, 4) }, { g: '🐄', answer: 2, options: optionsAround(2, 4) }] },
    ];
  }

  // Bài 8: ÔN TẬP THỐNG KÊ (bản sao theo sách trang 18-19)
  function b8() {
    const sh = (s, c) => ({ shape: s, color: c });
    const shapesA = shuffle([].concat(Array(4).fill(sh('square', 'blue')), Array(5).fill(sh('star', 'red')), Array(3).fill(sh('circle', 'blue')), Array(2).fill(sh('triangle', 'orange'))));
    const vehicles = shuffle([].concat(Array(4).fill('🎈'), Array(3).fill('✈️'), Array(2).fill('🚙'), Array(2).fill('🚐'), Array(3).fill('🚗')));
    const shapesC = shuffle([].concat(Array(3).fill(sh('square', 'blue')), Array(5).fill(sh('circle', 'pink')), Array(4).fill(sh('triangle', 'green')), Array(6).fill(sh('star', 'orange')), Array(2).fill(sh('hexagon', 'purple'))));
    return [
      { type: 'tally', prompt: 'Bài 1. Đếm mỗi hình rồi chọn số.',
        gridGlyphs: shapesA, gridSize: 30,
        rows: [{ g: sh('square', 'blue'), answer: 4, options: optionsAround(4, 4) }, { g: sh('star', 'red'), answer: 5, options: optionsAround(5, 4) }, { g: sh('circle', 'blue'), answer: 3, options: optionsAround(3, 4) }, { g: sh('triangle', 'orange'), answer: 2, options: optionsAround(2, 4) }] },
      { type: 'tally', prompt: 'Bài 2. Đếm mỗi loại xe rồi chọn số.',
        gridGlyphs: vehicles, gridSize: 32,
        rows: [{ g: '🎈', answer: 4, options: optionsAround(4, 4) }, { g: '✈️', answer: 3, options: optionsAround(3, 4) }, { g: '🚙', answer: 2, options: optionsAround(2, 4) }, { g: '🚐', answer: 2, options: optionsAround(2, 4) }, { g: '🚗', answer: 3, options: optionsAround(3, 4) }] },
      { type: 'tally', prompt: 'Bài 3. Đếm mỗi hình rồi chọn số.',
        gridGlyphs: shapesC, gridSize: 30,
        rows: [{ g: sh('square', 'blue'), answer: 3, options: optionsAround(3, 4) }, { g: sh('circle', 'pink'), answer: 5, options: optionsAround(5, 4) }, { g: sh('triangle', 'green'), answer: 4, options: optionsAround(4, 4) }, { g: sh('star', 'orange'), answer: 6, options: optionsAround(6, 4) }, { g: sh('hexagon', 'purple'), answer: 2, options: optionsAround(2, 4) }] },
    ];
  }

  /* ========== PHẦN 2: TOÁN QUY LUẬT ========== */

  const pat = (code, seq, options) => ({ type: 'pattern', prompt: code + ' Chọn hình tiếp theo cho dấu ❓', sequence: seq, options: shuffle(options) });
  const opt2 = (a, b, correct) => [{ g: a, correct: a === correct }, { g: b, correct: b === correct }];

  // Bài 9: LÀM QUEN VỚI QUY LUẬT (bản sao theo sách trang 20-21)
  function b9() {
    return [
      pat('Bài 1.', ['🍓', '🍓', '🍌', '🍌', '🍓', '🍓', '?'], opt2('🍓', '🍌', '🍌')),
      pat('Bài 1.', ['🍆', '🍎', '🍆', '🍎', '?'], opt2('🍆', '🍎', '🍆')),
      pat('Bài 1.', ['🍔', '🧁', '🍔', '🧁', '🍔', '?'], opt2('🍔', '🧁', '🧁')),
      pat('Bài 2.', ['🍃', '🌸', '🍎', '🍃', '🌸', '🍎', '🍃', '?'], ['🌸', '🍃', '🍎'].map(o => ({ g: o, correct: o === '🌸' }))),
      pat('Bài 2.', ['🍃', '🌸', '🌸', '🍎', '🍃', '🌸', '🌸', '?'], ['🌸', '🍃', '🍎'].map(o => ({ g: o, correct: o === '🍎' }))),
      { type: 'seq', prompt: 'Bài 3. Sắp xếp chu trình phát triển của cây (chạm theo thứ tự 1→6).',
        items: [{ g: '🌰', order: 1, label: 'hạt' }, { g: '🌱', order: 2, label: 'nảy mầm' }, { g: '🌿', order: 3, label: 'cây' }, { g: '🌷', order: 4, label: 'nụ' }, { g: '🌸', order: 5, label: 'hoa' }, { g: '🍎', order: 6, label: 'quả' }] },
      { type: 'seq', prompt: 'Bài 4. Sắp xếp các số theo thứ tự tăng dần (chạm 1→5).',
        items: [{ g: '1', order: 1 }, { g: '2', order: 2 }, { g: '3', order: 3 }, { g: '4', order: 4 }, { g: '5', order: 5 }] },
    ];
  }

  // Bài 10: QUY LUẬT MÀU SẮC (bản sao theo sách trang 22-23)
  function b10() {
    const qd = (a, b, c, d) => ({ html: Art.quad(a, b, c, d, 50) });
    const cs = (s, c) => colorShape(s, c);
    const quadOpts = [
      { g: qd('pink', 'green', 'blue', 'orange'), correct: true },
      { g: qd('pink', 'blue', 'green', 'orange'), correct: false },
      { g: qd('green', 'pink', 'blue', 'orange'), correct: false },
      { g: qd('orange', 'green', 'pink', 'blue'), correct: false },
    ];
    return [
      { type: 'pattern', prompt: 'Bài 1. Chọn ô màu tiếp theo (các màu quay theo chiều kim đồng hồ).',
        sequence: [qd('blue', 'pink', 'orange', 'green'), qd('orange', 'blue', 'green', 'pink'), qd('green', 'orange', 'pink', 'blue'), '?'], options: shuffle(quadOpts) },
      { type: 'tally', prompt: 'Bài 2. Đếm số lượng mỗi chú chó rồi chọn số.',
        gridGlyphs: shuffle([].concat(Array(4).fill('🐕'), Array(2).fill('🐩'), Array(2).fill('🦮'), Array(1).fill('🐶'))), gridSize: 34,
        rows: [{ g: '🐕', answer: 4, options: optionsAround(4, 4) }, { g: '🐩', answer: 2, options: optionsAround(2, 4) }, { g: '🦮', answer: 2, options: optionsAround(2, 4) }, { g: '🐶', answer: 1, options: optionsAround(1, 4) }] },
      pat('Bài 3.', [cs('circle', 'pink'), cs('circle', 'green'), cs('circle', 'pink'), cs('circle', 'green'), cs('circle', 'pink'), '?'], [{ g: cs('circle', 'green'), correct: true }, { g: cs('circle', 'pink'), correct: false }]),
      pat('Bài 3.', [cs('star', 'yellow'), cs('star', 'blue'), cs('star', 'blue'), cs('star', 'yellow'), cs('star', 'blue'), cs('star', 'blue'), '?'], [{ g: cs('star', 'yellow'), correct: true }, { g: cs('star', 'blue'), correct: false }]),
      pat('Bài 3.', [cs('circle', 'green'), cs('circle', 'green'), cs('circle', 'red'), cs('circle', 'green'), cs('circle', 'green'), cs('circle', 'red'), '?'], [{ g: cs('circle', 'green'), correct: true }, { g: cs('circle', 'red'), correct: false }]),
      pat('Bài 4.', ['🍓', '🍌', '🍌', '🍓', '🍌', '🍌', '🍓', '?'], opt2('🍓', '🍌', '🍌')),
      pat('Bài 4.', ['🥭', '🍇', '🥭', '🍇', '🥭', '?'], opt2('🥭', '🍇', '🍇')),
    ];
  }

  // Bài 11: QUY LUẬT HÌNH KHỐI (bản sao theo sách trang 24-25)
  function b11() {
    const cs = (s, c) => colorShape(s, c);
    const four = ['triangle', 'circle', 'square', 'star'];
    const fc = { triangle: 'green', circle: 'yellow', square: 'pink', star: 'blue' };
    const g4 = (s) => cs(s, fc[s]);
    const opts4 = (correct) => four.map(s => ({ g: g4(s), correct: s === correct }));
    return [
      pat('Bài 1.', [cs('square', 'red'), cs('cross', 'green'), cs('square', 'red'), cs('cross', 'green'), cs('square', 'red'), '?'], [{ g: cs('cross', 'green'), correct: true }, { g: cs('square', 'red'), correct: false }]),
      pat('Bài 1.', [cs('circle', 'purple'), cs('star', 'yellow'), cs('circle', 'purple'), cs('star', 'yellow'), '?'], [{ g: cs('circle', 'purple'), correct: true }, { g: cs('star', 'yellow'), correct: false }]),
      pat('Bài 1.', [cs('triangle', 'green'), cs('heart', 'red'), cs('triangle', 'green'), cs('heart', 'red'), cs('triangle', 'green'), '?'], [{ g: cs('heart', 'red'), correct: true }, { g: cs('triangle', 'green'), correct: false }]),
      pat('Bài 2.', [g4('triangle'), g4('circle'), g4('square'), g4('star'), g4('triangle'), '?'], opts4('circle')),
      pat('Bài 2.', [g4('triangle'), g4('circle'), g4('square'), g4('star'), g4('triangle'), g4('circle'), g4('square'), '?'], opts4('star')),
    ];
  }

  // Bài 12: quy luật thứ tự (dãy dài, ô ? ở giữa)
  function b12() {
    return many(6, () => {
      const three = sample(animalSea, 3);
      const unit = [0, 1, 2];
      const seq = [];
      for (let i = 0; i < 6; i++) seq.push(three[unit[i % 3]]);
      const qpos = 1 + rnd(4); // vị trí ? (1..4)
      const answer = seq[qpos];
      seq[qpos] = '?';
      const options = shuffle(three.map(e => ({ g: e, correct: e === answer })));
      return { type: 'pattern', prompt: 'Điền hình còn thiếu vào ô ❓', sequence: seq, options };
    });
  }

  // Bài 13: đối chiếu hình ảnh (nối hình giống nhau ở 2 cột)
  function b13() {
    return many(5, () => {
      const set = sample(allObjects, 4);
      const pairs = set.map(e => [e, e]);
      return { type: 'match', prompt: 'Nối 2 hình giống nhau 🔗', pairs };
    });
  }

  // Bài 14: tìm vật chỉ xuất hiện MỘT lần
  function b14() {
    return many(6, () => {
      const kinds = sample(allObjects, 4);
      const unique = kinds[0];
      const others = kinds.slice(1);
      const items = [{ g: unique, correct: true }];
      // mỗi vật khác xuất hiện 2-3 lần
      others.forEach(e => { const c = 2 + rnd(2); for (let i = 0; i < c; i++) items.push({ g: e, correct: false }); });
      return { type: 'find', prompt: `Vật nào chỉ xuất hiện MỘT lần? 👆`, items: shuffle(items) };
    });
  }

  // Bài 15: tìm 2 hình giống hệt nhau
  function b15() {
    return many(6, () => {
      const twin = pick(allObjects);
      const others = shuffle(allObjects.filter(x => x !== twin)).slice(0, 6);
      const items = [{ g: twin, correct: true }, { g: twin, correct: true }]
        .concat(others.map(e => ({ g: e, correct: false })));
      return { type: 'find', prompt: 'Tìm 2 hình GIỐNG HỆT nhau 👯', items: shuffle(items) };
    });
  }

  // Bài 16: tìm hình ảnh có liên quan (nối con vật với thứ liên quan)
  function b16() {
    const relations = [
      ['🐶', '🦴'], ['🐱', '🐟'], ['🐰', '🥕'], ['🐵', '🍌'], ['🐻', '🍯'],
      ['🐮', '🥛'], ['🐝', '🌻'], ['🐭', '🧀'], ['🐦', '🪺'], ['🕷️', '🕸️'],
      ['🐛', '🍃'], ['🐢', '💧'], ['🦉', '🌙'], ['🐴', '🌾'], ['🐷', '🌽']
    ];
    return many(5, () => {
      const set = sample(relations, 4);
      return { type: 'match', prompt: 'Nối con vật với thứ liên quan 🔗', pairs: set.map(r => [r[0], r[1]]) };
    });
  }

  // Bài 17: tìm bóng cho hình (nối vật với "bóng" đen của nó)
  function b17() {
    return many(5, () => {
      const set = sample(allObjects, 4);
      return { type: 'match', prompt: 'Nối mỗi hình với BÓNG của nó 🌑', pairs: set.map(e => [e, e]), shadow: true };
    });
  }

  // Bài 18: tìm điểm khác biệt (2 lưới, vài ô khác)
  function b18() {
    return many(5, () => {
      const cols = 4, rows = 3, n = cols * rows;
      const base = range(n).map(() => pick(allObjects));
      const gridA = base.slice();
      const gridB = base.slice();
      const nd = 2 + rnd(2); // 2..3 điểm khác
      const diffs = sample(range(n), nd);
      diffs.forEach(i => { let ne; do { ne = pick(allObjects); } while (ne === gridA[i]); gridB[i] = ne; });
      return { type: 'spot', prompt: `Tìm ${nd} điểm KHÁC nhau giữa 2 tranh 🔍`, cols, gridA, gridB, diffs };
    });
  }

  // Bài 19: tìm điểm không hợp lí (vật lạc nhóm)
  function b19() {
    const groups = [P.animal, P.fruit, P.vehicle, P.toy, P.food, P.veg, P.sea, P.bird];
    return many(6, () => {
      const g = pick(groups);
      const other = pick(groups.filter(x => x !== g));
      const main = sample(g, 5);
      const odd = pick(other.filter(x => !main.includes(x)));
      const items = main.map(e => ({ g: e, correct: false })).concat([{ g: odd, correct: true }]);
      return { type: 'find', prompt: 'Vật nào KHÔNG cùng nhóm? 🤔', items: shuffle(items) };
    });
  }

  // Bài 20: ôn tập tổng hợp (rút ngẫu nhiên từ nhiều bài)
  function b20() {
    const gens = [b1, b4, b7, b9, b10, b12, b14, b15, b18, b19];
    const qs = [];
    shuffle(gens).slice(0, 7).forEach(fn => { qs.push(pick(fn())); });
    return qs;
  }

  /* --- danh sách bài học --- */
  const list = [
    { part: 1, num: 1, emoji: '⬆️', title: 'Trên – Dưới – Ở giữa', build: b1 },
    { part: 1, num: 2, emoji: '↔️', title: 'Trái – Phải, Trong – Ngoài', build: b2 },
    { part: 1, num: 3, emoji: '🔍', title: 'Xa – Gần, To – Nhỏ', build: b3 },
    { part: 1, num: 4, emoji: '🦒', title: 'Cao – Thấp', build: b4 },
    { part: 1, num: 5, emoji: '📏', title: 'Dài – Ngắn', build: b5 },
    { part: 1, num: 6, emoji: '🧭', title: 'Các phương hướng', build: b6 },
    { part: 1, num: 7, emoji: '🔺', title: 'Làm quen thống kê', build: b7 },
    { part: 1, num: 8, emoji: '🧮', title: 'Ôn tập thống kê', build: b8 },
    { part: 2, num: 9, emoji: '🍭', title: 'Làm quen quy luật', build: b9 },
    { part: 2, num: 10, emoji: '🎨', title: 'Quy luật màu sắc', build: b10 },
    { part: 2, num: 11, emoji: '🧩', title: 'Quy luật hình khối', build: b11 },
    { part: 2, num: 12, emoji: '🔢', title: 'Quy luật thứ tự', build: b12 },
    { part: 2, num: 13, emoji: '🪞', title: 'Đối chiếu hình ảnh', build: b13 },
    { part: 2, num: 14, emoji: '☝️', title: 'Vật xuất hiện một lần', build: b14 },
    { part: 2, num: 15, emoji: '👯', title: 'Tìm hình giống hệt', build: b15 },
    { part: 2, num: 16, emoji: '🔗', title: 'Hình ảnh có liên quan', build: b16 },
    { part: 2, num: 17, emoji: '🌑', title: 'Tìm bóng cho hình', build: b17 },
    { part: 2, num: 18, emoji: '🔎', title: 'Tìm điểm khác biệt', build: b18 },
    { part: 2, num: 19, emoji: '🤔', title: 'Tìm điểm không hợp lí', build: b19 },
    { part: 2, num: 20, emoji: '🏆', title: 'Ôn tập tổng hợp', build: b20 },
  ];
  list.forEach(l => l.id = 'b' + l.num);
  return list;
})();
