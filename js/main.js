/* ================= MAIN =================
   Dựng thanh chọn tập sách (sidebar) + menu bài học,
   điều hướng giữa các màn hình.
====================================== */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const VOLUMES = [VOL_T3, VOL_T4];
  let currentVol = VOLUMES[0];

  $('menuMascot').innerHTML = Game.pandaSVG();

  /* nút âm thanh */
  const st = $('soundToggle');
  st.onclick = () => {
    const on = !Game.getSound();
    Game.setSound(on);
    st.textContent = on ? '🔊' : '🔇';
    if (on) Game.sfx.click();
  };

  /* ---- sidebar chọn tập ---- */
  function buildSidebar() {
    const wrap = $('volList'); wrap.innerHTML = '';
    const stars = Game.loadAllStars();
    VOLUMES.forEach(v => {
      const done = v.lessons.filter(l => stars[l.id]).length;
      const card = document.createElement('button');
      card.className = 'vol-item' + (v.id === currentVol.id ? ' active' : '');
      card.innerHTML = `
        <span class="vol-emoji">${v.emoji}</span>
        <span class="vol-text"><b>${v.name}</b><small>${v.subtitle}</small>
        <span class="vol-prog">${done}/${v.lessons.length} bài ✔</span></span>`;
      card.onclick = () => { Game.sfx.click(); selectVolume(v); closeDrawer(); };
      wrap.appendChild(card);
    });
  }

  function selectVolume(v) {
    currentVol = v;
    buildSidebar();
    buildMenu();
    $('menuBody').scrollTop = 0;
  }

  /* ---- lưới bài học của tập hiện tại ---- */
  function buildMenu() {
    const body = $('menuBody'); body.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'vol-head';
    head.innerHTML = `<h2>${currentVol.emoji} ${currentVol.name}</h2><p>${currentVol.subtitle}</p>`;
    body.appendChild(head);

    const stars = Game.loadAllStars();
    currentVol.parts.forEach(pt => {
      const inPart = currentVol.lessons.filter(l => l.part === pt.n);
      if (!inPart.length) return;
      const h = document.createElement('div');
      h.className = 'part-title';
      h.innerHTML = `<span class="chip">${pt.chip}</span> ${pt.title}`;
      body.appendChild(h);
      const grid = document.createElement('div');
      grid.className = 'lesson-grid';
      inPart.forEach(l => {
        const got = stars[l.id] || 0;
        const card = document.createElement('div');
        card.className = 'lesson-card' + (got ? ' done' : '');
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

  /* ---- drawer (mobile) ---- */
  function openDrawer() { $('sidebar').classList.add('open'); $('scrim').classList.add('show'); }
  function closeDrawer() { $('sidebar').classList.remove('open'); $('scrim').classList.remove('show'); }
  $('menuToggle').onclick = () => { Game.sfx.click(); $('sidebar').classList.contains('open') ? closeDrawer() : openDrawer(); };
  $('scrim').onclick = closeDrawer;

  /* ---- điều hướng ---- */
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
    window.scrollTo(0, 0);
  }
  function openLesson(lesson) { show('screen-play'); Game.startSession(lesson, onExit); }
  function onExit(action, lesson) {
    if (action === 'next') {
      const ls = currentVol.lessons;
      const idx = ls.findIndex(l => l.id === lesson.id);
      Game.startSession(ls[(idx + 1) % ls.length], onExit);
    } else {
      buildSidebar(); buildMenu(); show('screen-menu');
    }
  }
  $('btnBack').onclick = () => { Game.sfx.click(); if ('speechSynthesis' in window) speechSynthesis.cancel(); buildSidebar(); buildMenu(); show('screen-menu'); };
  $('btnSpeak').onclick = () => { const p = document.querySelector('.prompt span'); if (p) Game.speak(p.textContent); };

  document.body.addEventListener('pointerdown', function unlock() {
    Game.sfx.tap();
    document.body.removeEventListener('pointerdown', unlock);
  }, { once: true });

  buildSidebar();
  buildMenu();
})();
