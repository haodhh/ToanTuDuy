/* ================= TIẾNG ANH CHO BÉ =================
   Dựng các "lớp học" tiếng Anh từ dữ liệu chương trình (window.EN_CURRICULUM,
   bám sách giáo khoa tiếng Anh tiểu học của Bộ GD&ĐT). Mỗi UNIT (chủ đề) là 1
   bài; mỗi lần chơi TỰ SINH câu hỏi ngẫu nhiên nên chơi lại không nhàm:
     - Nghe rồi chọn hình / chọn từ đúng
     - Xem hình chọn từ tiếng Anh / đọc từ chọn hình
     - Nối hình với từ / nối từ với nghĩa tiếng Việt
   TỪ TIẾNG ANH được phát âm bằng TIẾNG ANH (engine.speak(text, 'en')).
==================================================== */
window.EN_VOLUMES = (function () {
  const G = (typeof Game !== 'undefined') ? Game : null;   // 'Game' là biến toàn cục của engine.js
  if (!G) return [];
  const { rnd, pick, shuffle, sample } = G;
  const DATA = window.EN_CURRICULUM || [];

  const gradeEmoji = (g) => ['📘', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'][g] || '🔤';
  const wordCard = (w) => ({ html: `<span class="en-word">${w}</span>` });
  const meanCard = (w) => ({ html: `<span class="vi-word">${w}</span>` });

  // chọn tối đa n "mồi nhử" khác item trong pool (needEmoji: chỉ lấy từ có emoji)
  function distractors(pool, item, n, needEmoji) {
    const cand = pool.filter(x => x.en !== item.en && (!needEmoji || x.emoji));
    return sample(cand, Math.min(n, cand.length));
  }

  /* ---- các kiểu câu hỏi cho 1 từ (item), dựa trên pool cùng unit ---- */

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

  /* ---- dựng 1 bài (unit): ~6-8 câu, trộn nhiều kiểu, mỗi lần chơi khác ---- */
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
    // đảm bảo có ít nhất 1 câu nối hình nếu đủ emoji
    if (withEmoji.length >= 3) {
      qs.splice(rnd(qs.length + 1), 0, qMatchPic(sample(withEmoji, Math.min(4, withEmoji.length))));
    }
    return qs.slice(0, 8);
  }
  // cờ nội bộ để "pick" chọn kiểu nối-nghĩa mà không cần pool riêng
  function qMatchMean0() {}

  /* ---- dựng volume cho từng lớp ---- */
  return DATA.map(grade => {
    const vol = {
      id: 'en' + grade.grade, num: grade.grade, subject: 'en',
      emoji: gradeEmoji(grade.grade), name: grade.title, subtitle: grade.subtitle,
      parts: [{ n: 1, title: 'Từ vựng theo chủ đề', chip: grade.title }],
      lessons: (grade.units || []).map((unit, i) => ({
        part: 1, num: i + 1, emoji: unit.emoji || '🔤', title: unit.title,
        build: () => buildUnit(unit)
      }))
    };
    vol.lessons.forEach(l => l.id = vol.id + '-u' + l.num);
    return vol;
  }).filter(v => v.lessons.length);
})();
