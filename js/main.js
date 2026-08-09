/* ================= MAIN =================
   Dựng thanh chọn tập sách (sidebar) + menu bài học,
   hồ sơ học tập cho từng bé, sao lưu/khôi phục dữ liệu,
   và điều hướng giữa các màn hình.
====================================== */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const VOLUMES = [VOL_T1, VOL_T2, VOL_T3, VOL_T4, VOL_T5];

  /* ---- PHẦN 3: ÔN TẬP (tự dựng cho mỗi tập) ----
     1) "Ôn tập bài đã học": lấy ngẫu nhiên 10 câu từ các bài ĐÃ HỌC (câu thật).
     2) "Kiểm tra đánh giá": lấy 10 bài cũ ngẫu nhiên rồi TỰ SINH câu mới theo
        cùng cơ chế -> đánh giá khách quan hơn (bé không học vẹt đáp án). */
  const REV_N = 10;
  // ưu tiên bài đã học (có sao); nếu chưa học bài nào thì ôn toàn bộ
  function reviewPool(base) {
    const stars = Game.loadAllStars();
    const learned = base.filter(l => stars[l.id]);
    return learned.length ? learned : base.slice();
  }
  const tag = (q, id) => { if (q) q._srcId = id; return q; };   // gắn bài gốc để ghi nhận "hay sai"
  function reviewOld(base, n) {
    const pool = reviewPool(base);
    let qs = [];
    pool.forEach(l => { try { const b = l.build(); b.forEach(q => tag(q, l.id)); qs = qs.concat(b); } catch (e) { } });
    qs = Game.shuffle(qs);
    let guard = 0;                                   // nếu chưa đủ n thì sinh thêm
    while (qs.length < n && guard++ < 40) { const l = Game.pick(pool); try { const b = l.build(); if (b.length) qs.push(tag(Game.pick(b), l.id)); } catch (e) { } }
    return qs.slice(0, n);
  }
  function reviewNew(base, n) {
    const pool = reviewPool(base);
    const order = Game.shuffle(pool.slice());        // chọn 10 bài khác nhau nếu đủ
    const qs = [];
    for (let i = 0; i < n; i++) {
      const l = order.length >= n ? order[i] : Game.pick(pool);
      try { const b = l.build(); if (b.length) qs.push(tag(Game.pick(b), l.id)); } catch (e) { }
    }
    return qs.slice(0, n);
  }
  const freshQ = (l) => { try { const b = l.build(); if (b.length) return tag(Game.pick(b), l.id); } catch (e) { } return null; };
  // Luyện các bài bé HAY SAI: ưu tiên bài có điểm sai cao, tự sinh câu mới
  function reviewWeak(base, n) {
    const miss = (window.Store && Store.getMiss) ? Store.getMiss() : {};
    const weak = base.filter(l => (miss[l.id] || 0) > 0).sort((a, b) => (miss[b.id] || 0) - (miss[a.id] || 0));
    const qs = [];
    if (!weak.length) {                              // chưa có lỗi -> xoay vòng các bài đã học
      const pool = reviewPool(base);
      let i = 0, g = 0;
      while (qs.length < n && g++ < n * 5) { const q = freshQ(pool[i++ % pool.length]); if (q) qs.push(q); }
      return qs.slice(0, n);
    }
    // pass 1: mỗi bài yếu ít nhất 1 câu (bài sai nhiều xếp trước)
    for (const l of weak) { if (qs.length >= n) break; const q = freshQ(l); if (q) qs.push(q); }
    // pass 2: lấp phần còn lại theo TRỌNG SỐ điểm sai (bài càng hay sai càng xuất hiện nhiều)
    const bag = [];
    weak.forEach(l => { for (let k = 0; k < (miss[l.id] || 1); k++) bag.push(l); });
    let g = 0;
    while (qs.length < n && g++ < n * 6) { const q = freshQ(Game.pick(bag)); if (q) qs.push(q); }
    return qs.slice(0, n);
  }
  function addReviewPart(vol) {
    const base = vol.lessons.filter(l => l.part !== 3);
    if (!base.length) return;
    const maxNum = Math.max.apply(null, base.map(l => l.num));
    vol.parts.push({ n: 3, title: 'Ôn tập tổng hợp', chip: 'Phần 3' });
    vol.lessons.push({ part: 3, num: maxNum + 1, emoji: '📝', title: 'Ôn tập bài đã học', id: vol.id + '-rv1', build: () => reviewOld(base, REV_N) });
    vol.lessons.push({ part: 3, num: maxNum + 2, emoji: '🎯', title: 'Kiểm tra đánh giá', id: vol.id + '-rv2', build: () => reviewNew(base, REV_N) });
    vol.lessons.push({ part: 3, num: maxNum + 3, emoji: '💪', title: 'Luyện phần hay sai', id: vol.id + '-rv3', build: () => reviewWeak(base, REV_N) });
  }
  VOLUMES.forEach(addReviewPart);

  // mở lại đúng tập bé đang học dở
  let currentVol = VOLUMES[0];
  const _last0 = Store.getLast();
  if (_last0) { const v = VOLUMES.find(x => x.id === _last0.vol); if (v) currentVol = v; }

  $('menuMascot').innerHTML = Game.pandaSVG();

  /* nút âm thanh */
  const st = $('soundToggle');
  st.onclick = () => {
    const on = !Game.getSound();
    Game.setSound(on);
    st.textContent = on ? '🔊' : '🔇';
    if (on) Game.sfx.click();
  };

  /* ---- nút hồ sơ trên header ---- */
  function updateProfileChip() {
    const p = Store.getActive();
    $('pfEmoji').textContent = p.emoji;
    $('pfEmoji').style.background = p.color;
    $('pfName').textContent = p.name;
  }

  /* ---- sidebar chọn tập ---- */
  function buildSidebar() {
    const wrap = $('volList'); wrap.innerHTML = '';
    const stars = Game.loadAllStars();
    VOLUMES.forEach(v => {
      const core = v.lessons.filter(l => l.part !== 3);      // không tính phần ôn tập
      const done = core.filter(l => stars[l.id]).length;
      const card = document.createElement('button');
      card.className = 'vol-item' + (v.id === currentVol.id ? ' active' : '');
      card.innerHTML = `
        <span class="vol-emoji">${v.emoji}</span>
        <span class="vol-text"><b>${v.name}</b><small>${v.subtitle}</small>
        <span class="vol-prog">${done}/${core.length} bài ✔</span></span>`;
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

    // thanh "Học tiếp" bài đang học dở của tập này
    const last = Store.getLast();
    if (last && last.vol === currentVol.id) {
      const lesson = currentVol.lessons.find(l => l.id === last.lesson);
      if (lesson) {
        const got = stars[lesson.id] || 0;
        const bar = document.createElement('div');
        bar.className = 'resume-bar';
        bar.innerHTML = `
          <span class="rz-ic">${lesson.emoji}</span>
          <span class="rz-tx"><b>Học tiếp: Bài ${lesson.num} · ${lesson.title}</b>
            <small>${got ? '⭐'.repeat(got) + ' — chơi lại nhé' : 'bé đang học dở bài này'}</small></span>
          <span class="rz-go">▶ Tiếp tục</span>`;
        bar.onclick = () => { Game.sfx.click(); openLesson(lesson); };
        body.appendChild(bar);
      }
    }

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
  function openLesson(lesson) {
    Store.setLast(currentVol.id, lesson.id);   // nhớ bài đang học để lần sau học tiếp
    show('screen-play');
    Game.startSession(lesson, onExit);
  }
  function onExit(action, lesson) {
    if (action === 'next') {
      const ls = currentVol.lessons;
      const idx = ls.findIndex(l => l.id === lesson.id);
      const nx = ls[(idx + 1) % ls.length];
      Store.setLast(currentVol.id, nx.id);
      Game.startSession(nx, onExit);
    } else {
      buildSidebar(); buildMenu(); show('screen-menu');
    }
  }
  $('btnBack').onclick = () => { Game.sfx.click(); Game.stopSpeak(); buildSidebar(); buildMenu(); show('screen-menu'); };
  $('btnSpeak').onclick = () => Game.replay();

  /* ================= HỒ SƠ + SAO LƯU ================= */
  let formState = null;   // null | {mode:'add'|'edit'|'delete', id?, name, emoji, color}
  let modalMsg = null;    // {text, err}

  function openProfileModal() { modalMsg = null; formState = null; $('profileModal').hidden = false; renderProfileModal(); }
  function closeProfileModal() { $('profileModal').hidden = true; formState = null; modalMsg = null; }

  function renderProfileModal() {
    const card = $('profileCard'); card.innerHTML = '';
    const active = Store.getActive();

    const h = document.createElement('h3'); h.textContent = '👤 Hồ sơ học tập'; card.appendChild(h);
    const hint = document.createElement('div'); hint.className = 'modal-hint';
    hint.textContent = 'Mỗi bé một hồ sơ riêng — sao và tiến trình lưu tách biệt.'; card.appendChild(hint);

    // danh sách bé
    const list = document.createElement('div'); list.className = 'pf-list';
    Store.getProfiles().forEach(p => {
      const row = document.createElement('div');
      row.className = 'pf-row' + (p.id === active.id ? ' active' : '');
      const av = document.createElement('span'); av.className = 'pf-av'; av.style.background = p.color; av.textContent = p.emoji;
      const info = document.createElement('span'); info.className = 'pf-info';
      const nm = document.createElement('b'); nm.textContent = p.name;
      const sm = document.createElement('small');
      sm.textContent = (p.id === active.id ? '✓ đang chọn • ' : '') + `⭐ ${Store.totalStars(p)} • ${Store.doneCount(p)} bài đã học`;
      info.appendChild(nm); info.appendChild(sm);
      const acts = document.createElement('span'); acts.className = 'pf-actions';
      const edit = document.createElement('button'); edit.textContent = '✏️'; edit.title = 'Sửa tên/hình';
      edit.onclick = (e) => { e.stopPropagation(); Game.sfx.click(); formState = { mode: 'edit', id: p.id, name: p.name, emoji: p.emoji, color: p.color }; modalMsg = null; renderProfileModal(); };
      acts.appendChild(edit);
      if (Store.getProfiles().length > 1) {
        const del = document.createElement('button'); del.textContent = '🗑️'; del.title = 'Xoá bé';
        del.onclick = (e) => { e.stopPropagation(); Game.sfx.click(); formState = { mode: 'delete', id: p.id, name: p.name }; modalMsg = null; renderProfileModal(); };
        acts.appendChild(del);
      }
      row.appendChild(av); row.appendChild(info); row.appendChild(acts);
      row.onclick = () => { if (p.id !== active.id) { Store.setActive(p.id); Game.sfx.good(); } closeProfileModal(); };
      list.appendChild(row);
    });
    card.appendChild(list);

    // form thêm/sửa/xoá HOẶC nút "thêm bé"
    if (formState) card.appendChild(buildForm());
    else {
      const add = document.createElement('button'); add.className = 'mini-btn btn-add'; add.textContent = '➕ Thêm bé mới';
      add.onclick = () => {
        Game.sfx.click();
        formState = { mode: 'add', name: '', emoji: rand(Store.EMOJIS), color: rand(Store.COLORS) };
        modalMsg = null; renderProfileModal();
      };
      card.appendChild(add);
    }

    if (modalMsg) { const m = document.createElement('div'); m.className = 'modal-msg' + (modalMsg.err ? ' err' : ''); m.textContent = modalMsg.text; card.appendChild(m); }

    // sao lưu
    const bt = document.createElement('div'); bt.className = 'modal-sec-title'; bt.textContent = '💾 Sao lưu & khôi phục'; card.appendChild(bt);
    const brow = document.createElement('div'); brow.className = 'backup-row';
    const exp = document.createElement('button'); exp.className = 'mini-btn'; exp.innerHTML = '⬇️ Tải file sao lưu';
    exp.onclick = () => { Game.sfx.click(); Store.exportFile(); modalMsg = { text: 'Đã tạo file sao lưu — tìm trong thư mục Tải về (Downloads).' }; renderProfileModal(); };
    const imp = document.createElement('button'); imp.className = 'mini-btn'; imp.innerHTML = '⬆️ Khôi phục từ file';
    imp.onclick = () => { Game.sfx.click(); $('importFile').click(); };
    brow.appendChild(exp); brow.appendChild(imp); card.appendChild(brow);
    const bh = document.createElement('div'); bh.className = 'modal-hint';
    bh.textContent = 'Tải file .json để giữ toàn bộ hồ sơ & tiến trình. Khi đổi sang máy/điện thoại khác: mở web, bấm “Khôi phục” rồi chọn lại file này.';
    card.appendChild(bh);

    const close = document.createElement('button'); close.className = 'mini-btn modal-close'; close.textContent = 'Đóng';
    close.onclick = () => { Game.sfx.click(); closeProfileModal(); };
    card.appendChild(close);
  }

  const rand = (a) => a[Math.floor(Math.random() * a.length)];

  function buildForm() {
    const f = document.createElement('div'); f.className = 'pf-form';

    if (formState.mode === 'delete') {
      const q = document.createElement('div');
      q.innerHTML = `<b>Xoá hồ sơ “${formState.name}”?</b><div class="modal-hint" style="margin-top:4px">Toàn bộ sao & tiến trình của bé này sẽ mất và không khôi phục được.</div>`;
      f.appendChild(q);
      const btns = document.createElement('div'); btns.className = 'pf-form-btns';
      const yes = document.createElement('button'); yes.className = 'mini-btn save'; yes.style.background = 'var(--red)'; yes.textContent = '🗑️ Xoá';
      yes.onclick = () => { Store.deleteProfile(formState.id); formState = null; modalMsg = { text: 'Đã xoá hồ sơ.' }; renderProfileModal(); };
      const no = document.createElement('button'); no.className = 'mini-btn cancel'; no.textContent = 'Huỷ';
      no.onclick = () => { formState = null; renderProfileModal(); };
      btns.appendChild(yes); btns.appendChild(no); f.appendChild(btns);
      return f;
    }

    // add / edit
    const title = document.createElement('div'); title.className = 'modal-sec-title'; title.style.marginTop = '0';
    title.textContent = formState.mode === 'add' ? '➕ Thêm bé mới' : '✏️ Sửa hồ sơ';
    f.appendChild(title);

    const inp = document.createElement('input'); inp.className = 'pf-name-in'; inp.type = 'text'; inp.maxLength = 20;
    inp.placeholder = 'Tên của bé (VD: Bé An)'; inp.value = formState.name || '';
    inp.oninput = () => { formState.name = inp.value; };
    f.appendChild(inp);

    // chọn hình
    const eg = document.createElement('div'); eg.className = 'pick-grid';
    Store.EMOJIS.forEach(em => {
      const b = document.createElement('button'); b.className = 'pick-em' + (em === formState.emoji ? ' sel' : ''); b.textContent = em;
      b.onclick = () => { formState.emoji = em; eg.querySelectorAll('.pick-em').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); };
      eg.appendChild(b);
    });
    f.appendChild(eg);

    // chọn màu
    const cg = document.createElement('div'); cg.className = 'pick-grid';
    Store.COLORS.forEach(co => {
      const b = document.createElement('button'); b.className = 'pick-co' + (co === formState.color ? ' sel' : ''); b.style.background = co;
      b.onclick = () => { formState.color = co; cg.querySelectorAll('.pick-co').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); };
      cg.appendChild(b);
    });
    f.appendChild(cg);

    const btns = document.createElement('div'); btns.className = 'pf-form-btns';
    const save = document.createElement('button'); save.className = 'mini-btn save'; save.textContent = '💾 Lưu';
    save.onclick = () => {
      const name = (formState.name || '').trim();
      if (!name) { inp.focus(); inp.style.borderColor = 'var(--red)'; return; }
      if (formState.mode === 'add') { Store.addProfile(name, formState.emoji, formState.color); modalMsg = { text: 'Đã thêm bé “' + name + '” và chuyển sang hồ sơ này.' }; }
      else { Store.updateProfile(formState.id, { name, emoji: formState.emoji, color: formState.color }); modalMsg = { text: 'Đã lưu hồ sơ.' }; }
      formState = null; renderProfileModal();
    };
    const cancel = document.createElement('button'); cancel.className = 'mini-btn cancel'; cancel.textContent = 'Huỷ';
    cancel.onclick = () => { formState = null; renderProfileModal(); };
    btns.appendChild(save); btns.appendChild(cancel); f.appendChild(btns);
    return f;
  }

  // mở modal từ nút header
  $('profileBtn').onclick = () => { Game.sfx.click(); openProfileModal(); };
  // bấm nền tối để đóng
  $('profileModal').onclick = (e) => { if (e.target === $('profileModal')) closeProfileModal(); };

  // nhập file sao lưu
  $('importFile').onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = Store.importText(String(reader.result));   // ghi -> onChange -> refreshAll
      modalMsg = res.ok
        ? { text: `Khôi phục xong! Thêm ${res.added} bé mới, cập nhật ${res.merged} bé.` }
        : { text: res.error, err: true };
      if ($('profileModal').hidden) { $('profileModal').hidden = false; formState = null; }
      renderProfileModal();
    };
    reader.onerror = () => { modalMsg = { text: 'Không đọc được file.', err: true }; renderProfileModal(); };
    reader.readAsText(file);
  };

  /* khi dữ liệu đổi (đổi bé / thêm / xoá / khôi phục) -> dựng lại giao diện */
  Store.onChange(() => { updateProfileChip(); buildSidebar(); buildMenu(); });

  /* ---- mở khoá âm thanh lần chạm đầu ---- */
  document.body.addEventListener('pointerdown', function unlock() {
    Game.sfx.tap();
    document.body.removeEventListener('pointerdown', unlock);
  }, { once: true });

  /* ---- khởi động ---- */
  updateProfileChip();
  buildSidebar();
  buildMenu();
})();
