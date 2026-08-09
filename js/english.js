/* ================= TIẾNG ANH CHO BÉ =================
   Dựng các "lớp học" tiếng Anh từ dữ liệu chương trình (window.EN_CURRICULUM,
   bám sách giáo khoa tiếng Anh tiểu học của Bộ GD&ĐT). Mỗi lần chơi TỰ SINH câu
   hỏi ngẫu nhiên nên chơi lại không nhàm:
     - Từ vựng: nghe chọn hình / chọn từ, xem hình chọn từ, nối hình–từ, nối từ–nghĩa
     - Mẫu câu (Lớp 3-5): nghe câu chọn nghĩa, chọn câu theo nghĩa, nối câu–nghĩa
     - Ôn tập tổng hợp: trộn từ vựng & mẫu câu của TẤT CẢ các lớp
   TỪ/CÂU TIẾNG ANH được phát âm bằng TIẾNG ANH (engine.speak(text, 'en')).
==================================================== */
window.EN_VOLUMES = (function () {
  const G = (typeof Game !== 'undefined') ? Game : null;   // 'Game' là biến toàn cục của engine.js
  if (!G) return [];
  const { rnd, pick, shuffle, sample } = G;
  const DATA = window.EN_CURRICULUM || [];

  const gradeEmoji = (g) => ({ 0: '🧸', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣' }[g] || '🔤');
  const wordCard = (w) => ({ html: `<span class="en-word">${w}</span>` });
  const meanCard = (w) => ({ html: `<span class="vi-word">${w}</span>` });
  const enSentCard = (s) => ({ html: `<span class="en-sent">${s}</span>` });
  const viSentCard = (s) => ({ html: `<span class="vi-sent">${s}</span>` });

  // chọn tối đa n "mồi nhử" khác item trong pool (needEmoji: chỉ lấy từ có emoji)
  function distractors(pool, item, n, needEmoji) {
    const cand = pool.filter(x => x.en !== item.en && (!needEmoji || x.emoji));
    return sample(cand, Math.min(n, cand.length));
  }

  /* ================= TỪ VỰNG ================= */

  // Nghe -> chọn HÌNH đúng (cần emoji). Kèm chữ để bé vừa nghe vừa nhận mặt chữ.
  function qListenPic(item, pool) {
    const ds = distractors(pool, item, 3, true);
    const opts = shuffle([{ emoji: item.emoji, correct: true }]
      .concat(ds.map(d => ({ emoji: d.emoji, correct: false }))));
    return {
      type: 'mc', cols: 2, lang: 'en', say: item.en, sayCorrect: item.en,
      prompt: `Nghe rồi chọn hình đúng 🔊 <span class="en-hint">${item.en}</span>`,
      options: opts
    };
  }
  // Xem HÌNH -> chọn TỪ tiếng Anh (cần emoji). Không tự đọc để bé tự chọn.
  function qPicWord(item, pool) {
    const ds = distractors(pool, item, 3, false);
    const opts = shuffle([{ label: item.en, correct: true }]
      .concat(ds.map(d => ({ label: d.en, correct: false }))));
    return {
      type: 'mc', cols: 2, noSpeak: true, lang: 'en', say: item.en, sayCorrect: item.en,
      prompt: 'Đây là hình gì? Chọn từ tiếng Anh đúng.',
      sceneHTML: `<div class="en-big-emoji">${item.emoji}</div>`, options: opts
    };
  }
  // Đọc TỪ (nghe) -> chọn HÌNH (cần emoji).
  function qWordPic(item, pool) {
    const ds = distractors(pool, item, 3, true);
    const opts = shuffle([{ emoji: item.emoji, correct: true }]
      .concat(ds.map(d => ({ emoji: d.emoji, correct: false }))));
    return {
      type: 'mc', cols: 2, lang: 'en', say: item.en, sayCorrect: item.en,
      prompt: 'Chọn hình đúng với từ 🔊',
      sceneHTML: `<div class="en-word-lead">${item.en}</div>`, options: opts
    };
  }
  // Nghe -> chọn TỪ viết đúng (không cần emoji) — luyện nhận mặt chữ.
  function qListenWord(item, pool) {
    const ds = distractors(pool, item, 3, false);
    const opts = shuffle([{ label: item.en, correct: true }]
      .concat(ds.map(d => ({ label: d.en, correct: false }))));
    return {
      type: 'mc', cols: 2, lang: 'en', say: item.en, sayCorrect: item.en,
      prompt: 'Nghe rồi chọn từ đúng 🔊', options: opts
    };
  }
  // Nối HÌNH với TỪ (cần emoji).
  function qMatchPic(group) {
    return {
      type: 'match', noSpeak: true, lang: 'en', say: group.map(x => x.en).join(', '),
      prompt: 'Nối hình với từ tiếng Anh 🔗',
      pairs: group.map(x => [x.emoji, wordCard(x.en)])
    };
  }
  // Nối TỪ tiếng Anh với NGHĨA tiếng Việt.
  function qMatchMean(group) {
    return {
      type: 'match', noSpeak: true, lang: 'en', say: group.map(x => x.en).join(', '),
      prompt: 'Nối từ tiếng Anh với nghĩa tiếng Việt 🔗',
      pairs: group.map(x => [wordCard(x.en), meanCard(x.vi)])
    };
  }

  // dựng 1 bài từ vựng (unit): ~6-8 câu, trộn nhiều kiểu, mỗi lần chơi khác
  function buildUnit(unit) {
    const items = (unit.items || []).filter(x => x && x.en && x.vi);
    if (items.length < 2) return [];
    const withEmoji = items.filter(x => x.emoji);
    const qs = [];
    const N = Math.min(7, Math.max(5, items.length));
    shuffle(items).slice(0, N).forEach(item => {
      const gens = [qListenWord, qMatchMean0];
      if (item.emoji && withEmoji.length >= 4) gens.push(qListenPic, qPicWord, qWordPic);
      const gen = pick(gens);
      qs.push(gen === qMatchMean0 ? qMatchMean(sample(items, Math.min(4, items.length)))
        : gen(item, items));
    });
    if (withEmoji.length >= 3) {   // đảm bảo có ít nhất 1 câu nối hình nếu đủ emoji
      qs.splice(rnd(qs.length + 1), 0, qMatchPic(sample(withEmoji, Math.min(4, withEmoji.length))));
    }
    return qs.slice(0, 8);
  }
  // cờ nội bộ để "pick" chọn kiểu nối-nghĩa mà không cần pool riêng
  function qMatchMean0() {}

  // 1 câu từ vựng ngẫu nhiên từ 1 unit (dùng cho ôn tập tổng hợp giữa các lớp)
  function oneVocabQuestion(unit) {
    const items = (unit.items || []).filter(x => x && x.en && x.vi);
    if (items.length < 2) return null;
    const withEmoji = items.filter(x => x.emoji);
    if (withEmoji.length >= 4 && rnd(5) === 0) return qMatchPic(sample(withEmoji, Math.min(4, withEmoji.length)));
    if (items.length >= 3 && rnd(5) === 0) return qMatchMean(sample(items, Math.min(4, items.length)));
    const item = pick(items);
    const gens = [qListenWord];
    if (item.emoji && withEmoji.length >= 4) gens.push(qListenPic, qPicWord, qWordPic);
    return pick(gens)(item, items);
  }

  /* ================= MẪU CÂU (phrases, Lớp 3-5) ================= */

  function phraseDistractors(pool, ph, n) {
    const cand = pool.filter(p => p.en !== ph.en);
    return sample(cand, Math.min(n, cand.length));
  }
  // Nghe CÂU tiếng Anh -> chọn NGHĨA tiếng Việt.
  function qPhraseListen(ph, pool) {
    const ds = phraseDistractors(pool, ph, 3);
    const opts = shuffle([{ label: ph.vi, correct: true }]
      .concat(ds.map(d => ({ label: d.vi, correct: false }))));
    return {
      type: 'mc', cols: 1, lang: 'en', say: ph.en, sayCorrect: ph.en,
      prompt: 'Nghe câu rồi chọn nghĩa đúng 🔊', options: opts
    };
  }
  // Đọc NGHĨA tiếng Việt -> chọn CÂU tiếng Anh đúng.
  function qPhraseRead(ph, pool) {
    const ds = phraseDistractors(pool, ph, 3);
    const opts = shuffle([{ label: ph.en, correct: true }]
      .concat(ds.map(d => ({ label: d.en, correct: false }))));
    return {
      type: 'mc', cols: 1, noSpeak: true, lang: 'en', say: ph.en, sayCorrect: ph.en,
      prompt: 'Chọn câu tiếng Anh đúng với nghĩa:',
      sceneHTML: `<div class="vi-sent-lead">${ph.vi}</div>`, options: opts
    };
  }
  // Nối CÂU tiếng Anh với NGHĨA tiếng Việt.
  function qPhraseMatch(group) {
    return {
      type: 'match', noSpeak: true, lang: 'en', say: group.map(x => x.en).join('. '),
      prompt: 'Nối câu tiếng Anh với nghĩa 🔗',
      pairs: group.map(x => [enSentCard(x.en), viSentCard(x.vi)])
    };
  }
  function onePhraseQuestion(ph, pool) {
    const r = rnd(3);
    if (r === 2 && pool.length >= 3) return qPhraseMatch(sample(pool, 3));
    return r === 1 ? qPhraseRead(ph, pool) : qPhraseListen(ph, pool);
  }
  function buildPhrases(phrases) {
    const pool = (phrases || []).filter(p => p && p.en && p.vi);
    if (pool.length < 2) return [];
    const qs = []; const N = Math.min(7, Math.max(4, pool.length));
    shuffle(pool).slice(0, N).forEach(ph => qs.push(onePhraseQuestion(ph, pool)));
    return qs.slice(0, 8);
  }

  /* ============ ÔN TẬP TỔNG HỢP (giữa các lớp) ============ */

  const gradePhrases = (g) => (g.units || []).reduce((a, u) => a.concat(u.phrases || []), []).filter(p => p && p.en && p.vi);
  const allPhrases = () => DATA.reduce((a, g) => a.concat(gradePhrases(g)), []);
  function reviewVocab(grades, n) {
    const units = [];
    grades.forEach(g => (g.units || []).forEach(u => { if ((u.items || []).length >= 2) units.push(u); }));
    if (!units.length) return [];
    const qs = []; let guard = 0;
    while (qs.length < n && guard++ < n * 6) { const q = oneVocabQuestion(pick(units)); if (q) qs.push(q); }
    return qs;
  }
  function reviewPhrases(n) {
    const pool = allPhrases();
    if (pool.length < 2) return [];
    const qs = []; let guard = 0;
    while (qs.length < n && guard++ < n * 6) qs.push(onePhraseQuestion(pick(pool), pool));
    return qs;
  }

  /* ---- dựng volume cho từng lớp ---- */
  const vols = DATA.map(grade => {
    const units = grade.units || [];
    const lessons = units.map((unit, i) => ({
      part: 1, num: i + 1, emoji: unit.emoji || '🔤', title: unit.title,
      build: () => buildUnit(unit)
    }));
    const parts = [{ n: 1, title: 'Từ vựng theo chủ đề', chip: grade.title }];
    const phr = gradePhrases(grade);
    if (phr.length >= 2) {   // lớp có câu mẫu -> thêm bài "Mẫu câu giao tiếp" riêng
      parts.push({ n: 2, title: 'Mẫu câu giao tiếp', chip: 'Giao tiếp' });
      lessons.push({
        part: 2, num: units.length + 1, emoji: '💬', title: 'Mẫu câu giao tiếp (Sentences)',
        build: () => buildPhrases(phr)
      });
    }
    const vol = {
      id: 'en' + grade.grade, num: grade.grade, subject: 'en',
      emoji: gradeEmoji(grade.grade), name: grade.title, subtitle: grade.subtitle,
      parts, lessons
    };
    vol.lessons.forEach(l => l.id = vol.id + '-u' + l.num);
    return vol;
  }).filter(v => v.lessons.length);

  /* ---- volume ÔN TẬP TỔNG HỢP giữa các lớp (đặt cuối danh sách) ---- */
  if (vols.length) {
    const easy = DATA.filter(g => g.grade <= 2);
    const hard = DATA.filter(g => g.grade >= 3);
    const rv = [];
    if (easy.length) rv.push({ emoji: '🐤', title: 'Ôn từ vựng lớp bé', build: () => reviewVocab(easy, 10) });
    if (hard.length) rv.push({ emoji: '📚', title: 'Ôn từ vựng lớp lớn', build: () => reviewVocab(hard, 10) });
    rv.push({ emoji: '🎯', title: 'Ôn tất cả từ vựng', build: () => reviewVocab(DATA, 10) });
    if (allPhrases().length >= 2) rv.push({ emoji: '💬', title: 'Ôn mẫu câu giao tiếp', build: () => reviewPhrases(10) });
    rv.forEach((l, i) => { l.part = 1; l.num = i + 1; l.id = 'enrv-' + (i + 1); });
    vols.push({
      id: 'enrv', num: 99, subject: 'en', noReview: true, emoji: '🏆',
      name: 'Ôn tập tổng hợp', subtitle: 'Ôn từ vựng & mẫu câu tất cả các lớp',
      parts: [{ n: 1, title: 'Ôn tập tiếng Anh tổng hợp', chip: 'Tổng hợp' }],
      lessons: rv
    });
  }

  return vols;
})();
