/* ================= MAIN =================
   Dựng menu, điều hướng giữa các màn hình.
====================================== */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);

  /* mascot */
  $('menuMascot').innerHTML = Game.pandaSVG();

  /* nút âm thanh */
  const st = $('soundToggle');
  st.onclick = () => {
    const on = !Game.getSound();
    Game.setSound(on);
    st.textContent = on ? '🔊' : '🔇';
    if (on) Game.sfx.click();
  };

  /* dựng menu */
  function buildMenu() {
    const body = $('menuBody'); body.innerHTML = '';
    const stars = Game.loadAllStars();
    const parts = [
      { n: 1, title: 'Xác định vị trí', chip: 'Phần 1' },
      { n: 2, title: 'Toán quy luật', chip: 'Phần 2' }
    ];
    parts.forEach(pt => {
      const h = document.createElement('div');
      h.className = 'part-title';
      h.innerHTML = `<span class="chip">${pt.chip}</span> ${pt.title}`;
      body.appendChild(h);
      const grid = document.createElement('div');
      grid.className = 'lesson-grid';
      LESSONS.filter(l => l.part === pt.n).forEach(l => {
        const card = document.createElement('div');
        card.className = 'lesson-card' + (stars[l.id] ? ' done' : '');
        const got = stars[l.id] || 0;
        card.innerHTML = `
          <span class="num">${l.num}</span>
          <span class="emoji">${l.emoji}</span>
          <span class="name">${l.title}</span>
          <span class="stars">${got ? '⭐'.repeat(got) : '&nbsp;'}</span>`;
        card.onclick = () => { Game.sfx.click(); openLesson(l); };
        grid.appendChild(card);
      });
      body.appendChild(grid);
    });
  }

  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
    window.scrollTo(0, 0);
  }

  function openLesson(lesson) {
    show('screen-play');
    Game.startSession(lesson, onExit);
  }

  function onExit(action, lesson) {
    if (action === 'next') {
      const idx = LESSONS.findIndex(l => l.id === lesson.id);
      const nxt = LESSONS[(idx + 1) % LESSONS.length];
      Game.startSession(nxt, onExit);
    } else { // home
      buildMenu();
      show('screen-menu');
    }
  }

  $('btnBack').onclick = () => { Game.sfx.click(); if ('speechSynthesis' in window) speechSynthesis.cancel(); buildMenu(); show('screen-menu'); };
  $('btnSpeak').onclick = () => { const p = document.querySelector('.prompt span'); if (p) Game.speak(p.textContent); };

  // khởi động: mở khoá âm thanh khi chạm lần đầu (chính sách trình duyệt)
  document.body.addEventListener('pointerdown', function unlock() {
    Game.sfx.tap();
    document.body.removeEventListener('pointerdown', unlock);
  }, { once: true });

  buildMenu();
})();
