/* ================= STORE =================
   Lưu tiến trình học theo TRÌNH DUYỆT (localStorage):
   - Nhiều HỒ SƠ (Profile) cho các bé khác nhau
   - Mỗi hồ sơ có số sao từng bài + bài học gần nhất
   - Xuất / nhập FILE SAO LƯU để chuyển sang thiết bị khác
   Nạp trước engine.js để Game dùng chung.
========================================= */
window.Store = (function () {
  'use strict';
  const KEY = 'kiki_save_v1';
  const OLD_STARS = 'kiki_stars_v1';               // dữ liệu cũ (1 người) -> tự chuyển
  const EMOJIS = ['🐼', '🐶', '🐱', '🦊', '🐰', '🐨', '🐯', '🦁', '🐵', '🐸', '🐧', '🐥', '🦄', '🐙', '🦕', '🐳', '🐝', '🦋'];
  const COLORS = ['#ffd3e0', '#cfe8ff', '#d9f7d0', '#fff2bf', '#e7d9ff', '#ffe0c2', '#c9f7f0', '#ffd6d6'];
  const listeners = [];

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const uid = () => 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const emit = () => listeners.forEach(fn => { try { fn(); } catch (e) { } });

  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function write(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { } emit(); }

  function newProfile(name, emoji, color) {
    return {
      id: uid(), name: (name || 'Bé yêu').trim().slice(0, 20) || 'Bé yêu',
      emoji: emoji || pick(EMOJIS), color: color || pick(COLORS),
      stars: {}, last: null, created: Date.now(), updated: Date.now()
    };
  }

  // Lần đầu chạy: chuyển dữ liệu sao cũ (nếu có) vào 1 hồ sơ mặc định.
  // Dùng id cố định 'p_default' để khi khôi phục ở máy mới nó GỘP đúng vào
  // hồ sơ mặc định thay vì tạo thêm 1 "Bé yêu" trống bị trùng.
  function migrate() {
    let old = {};
    try { old = JSON.parse(localStorage.getItem(OLD_STARS) || '{}'); } catch (e) { }
    const p = newProfile('Bé yêu', '🐼', COLORS[0]);
    p.id = 'p_default';
    if (old && typeof old === 'object') p.stars = old;
    return { v: 1, activeId: p.id, profiles: [p] };
  }

  function data() {
    let d = read();
    if (!d || !Array.isArray(d.profiles) || !d.profiles.length) { d = migrate(); write(d); }
    if (!d.profiles.find(p => p.id === d.activeId)) { d.activeId = d.profiles[0].id; }
    return d;
  }

  /* ---------- hồ sơ ---------- */
  const getProfiles = () => data().profiles;
  const getActive = () => { const d = data(); return d.profiles.find(p => p.id === d.activeId) || d.profiles[0]; };
  function setActive(id) { const d = data(); if (d.profiles.find(p => p.id === id)) { d.activeId = id; write(d); } }
  function addProfile(name, emoji, color) { const d = data(); const p = newProfile(name, emoji, color); d.profiles.push(p); d.activeId = p.id; write(d); return p; }
  function updateProfile(id, patch) {
    const d = data(); const p = d.profiles.find(x => x.id === id);
    if (!p) return;
    if (patch.name != null) p.name = String(patch.name).trim().slice(0, 20) || p.name;
    if (patch.emoji) p.emoji = patch.emoji;
    if (patch.color) p.color = patch.color;
    p.updated = Date.now(); write(d);
  }
  function deleteProfile(id) {
    const d = data();
    if (d.profiles.length <= 1) return false;            // luôn giữ ít nhất 1 bé
    d.profiles = d.profiles.filter(p => p.id !== id);
    if (d.activeId === id) d.activeId = d.profiles[0].id;
    write(d); return true;
  }

  /* ---------- sao / tiến trình ---------- */
  const getStars = () => getActive().stars || {};
  function setStar(lessonId, n) {
    const d = data(); const p = d.profiles.find(x => x.id === d.activeId); if (!p) return;
    if (!p.stars) p.stars = {};
    if (!p.stars[lessonId] || n > p.stars[lessonId]) { p.stars[lessonId] = n; p.updated = Date.now(); write(d); }
  }
  const totalStars = (p) => Object.values((p || getActive()).stars || {}).reduce((a, b) => a + (b || 0), 0);
  const doneCount = (p) => Object.values((p || getActive()).stars || {}).filter(Boolean).length;

  function setLast(vol, lesson) { const d = data(); const p = d.profiles.find(x => x.id === d.activeId); if (p) { p.last = { vol, lesson }; write(d); } }
  const getLast = () => getActive().last;

  const onChange = (fn) => { if (typeof fn === 'function') listeners.push(fn); };

  /* ---------- xuất / nhập file sao lưu ---------- */
  function exportFile() {
    const d = data();
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const day = new Date().toISOString().slice(0, 10);
    a.href = url; a.download = 'kiki-toantuduy-sao-luu-' + day + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  // Gộp không mất dữ liệu: hồ sơ trùng id -> giữ sao CAO NHẤT; id mới -> thêm vào
  function importData(obj) {
    if (!obj || !Array.isArray(obj.profiles)) return { ok: false, error: 'File sao lưu không hợp lệ.' };
    const d = data();
    const byId = {}; d.profiles.forEach(p => (byId[p.id] = p));
    let added = 0, merged = 0;
    obj.profiles.forEach(ip => {
      if (!ip || !ip.id) return;
      const cur = byId[ip.id];
      if (cur) {
        const s = cur.stars || {}, is = ip.stars || {};
        Object.keys(is).forEach(k => { if (!s[k] || is[k] > s[k]) s[k] = is[k]; });
        cur.stars = s;
        cur.name = ip.name || cur.name; cur.emoji = ip.emoji || cur.emoji; cur.color = ip.color || cur.color;
        cur.last = ip.last || cur.last; merged++;
      } else {
        const np = {
          id: ip.id, name: ip.name || 'Bé', emoji: ip.emoji || '🐼', color: ip.color || COLORS[0],
          stars: (ip.stars && typeof ip.stars === 'object') ? ip.stars : {}, last: ip.last || null,
          created: ip.created || Date.now(), updated: Date.now()
        };
        d.profiles.push(np); byId[np.id] = np; added++;
      }
    });
    if (obj.activeId && d.profiles.find(p => p.id === obj.activeId)) d.activeId = obj.activeId;
    // dọn hồ sơ mặc định RỖNG mà máy mới tự tạo (tránh dư 1 "Bé yêu" trống)
    if (d.profiles.length > 1) {
      const def = d.profiles.find(p => p.id === 'p_default');
      if (def && totalStars(def) === 0 && !def.last) d.profiles = d.profiles.filter(p => p !== def);
      if (!d.profiles.find(p => p.id === d.activeId)) d.activeId = d.profiles[0].id;
    }
    write(d);
    return { ok: true, added, merged };
  }
  function importText(text) {
    let obj; try { obj = JSON.parse(text); } catch (e) { return { ok: false, error: 'Không đọc được file (JSON lỗi).' }; }
    return importData(obj);
  }

  return {
    EMOJIS, COLORS,
    getProfiles, getActive, setActive, addProfile, updateProfile, deleteProfile,
    getStars, setStar, totalStars, doneCount, setLast, getLast,
    onChange, exportFile, importText
  };
})();
