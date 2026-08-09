/* ================= ART =================
   Thư viện hình minh hoạ SVG chi tiết, tự vẽ
   (không sao chép tranh trong sách). Dùng cho
   các bài cần độ chính xác về kích thước:
   dài/ngắn, cao/thấp, và các đồ vật hay lặp lại.
======================================== */
window.Art = (() => {
  'use strict';
  const wrap = (w, h, inner, cls = '') =>
    `<svg class="art ${cls}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

  /* ---- BÚT CHÌ (độ dài thay đổi được) ---- */
  function pencil(len = 160, color = '#ff9800') {
    const h = 30, er = 13, band = 9, tipW = 20;
    const bodyW = Math.max(20, len - er - band - tipW);
    const bx = er + band;
    return wrap(len, h, `
      <rect x="0" y="5" width="${er}" height="20" rx="5" fill="#f48fb1"/>
      <rect x="0" y="5" width="4" height="20" rx="2" fill="#f06292"/>
      <rect x="${er}" y="5" width="${band}" height="20" fill="#cfd8dc"/>
      <rect x="${er + 2}" y="5" width="2" height="20" fill="#eceff1"/>
      <rect x="${bx}" y="5" width="${bodyW}" height="20" fill="${color}"/>
      <rect x="${bx}" y="5" width="${bodyW}" height="6" fill="rgba(255,255,255,.35)"/>
      <polygon points="${bx + bodyW},5 ${bx + bodyW},25 ${bx + bodyW + tipW - 6},15" fill="#f3d19b"/>
      <polygon points="${bx + bodyW + tipW - 7},9 ${bx + bodyW + tipW - 7},21 ${len},15" fill="#4a3b2a"/>
    `);
  }

  /* ---- SÁP MÀU / CRAYON (độ dài thay đổi được) ---- */
  function crayon(len = 150, color = '#1e88e5') {
    const h = 30, tipW = 16;
    const bodyW = Math.max(24, len - tipW);
    return wrap(len, h, `
      <rect x="0" y="6" width="${bodyW}" height="18" rx="6" fill="${color}"/>
      <rect x="8" y="9" width="${Math.max(6, bodyW - 26)}" height="6" rx="3" fill="rgba(255,255,255,.85)"/>
      <polygon points="${bodyW},6 ${bodyW},24 ${len},15" fill="${color}"/>
      <polygon points="${bodyW},6 ${bodyW},24 ${bodyW + 6},15" fill="rgba(0,0,0,.15)"/>
    `);
  }

  /* ---- THƯỚC KẺ (độ dài thay đổi được) ---- */
  function ruler(len = 170, color = '#43a047') {
    const h = 26; let ticks = '';
    for (let x = 10; x < len - 6; x += 15) {
      const tall = ((x - 10) % 30 === 0);
      ticks += `<rect x="${x}" y="3" width="2" height="${tall ? 11 : 7}" fill="rgba(0,0,0,.4)"/>`;
    }
    return wrap(len, h, `
      <rect x="0" y="3" width="${len}" height="20" rx="4" fill="${color}" opacity=".9"/>
      <rect x="0" y="3" width="${len}" height="7" rx="4" fill="rgba(255,255,255,.3)"/>
      ${ticks}`);
  }

  /* ---- ĐƯỜNG NGOẰN NGOÈO (đường đi, độ dài khác nhau) ---- */
  function path(wiggles = 3, color = '#8e24aa', w = 150, h = 60) {
    if (wiggles <= 0) return wrap(w, h, `<path d="M6 ${h / 2} L ${w - 6} ${h / 2}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`);
    let d = `M6 ${h / 2}`; const seg = (w - 12) / (wiggles * 2);
    for (let i = 0; i < wiggles * 2; i++) {
      const up = i % 2 === 0 ? -1 : 1;
      d += ` q ${seg / 2} ${up * (h / 2 - 6)} ${seg} 0`;
    }
    return wrap(w, h, `<path d="${d}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`);
  }

  /* ---- RẮN (dài/ngắn) ---- */
  function snake(len = 160, color = '#66bb6a') {
    const h = 44; const wig = Math.max(2, Math.round(len / 45));
    let d = `M8 ${h / 2}`; const seg = (len - 16) / wig;
    for (let i = 0; i < wig; i++) d += ` q ${seg / 2} ${(i % 2 ? 1 : -1) * 12} ${seg} 0`;
    return wrap(len, h, `
      <path d="${d}" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${len - 8}" cy="${h / 2 - 3}" r="3.2" fill="#000"/>`);
  }

  /* ---- CÂY (cao/thấp, chiều cao thay đổi) ---- */
  function tree(height = 120, w = 90) {
    const trunkH = height * 0.32, trunkW = w * 0.16;
    const cx = w / 2, crownR = w * 0.42, crownCy = (height - trunkH) * 0.55;
    return wrap(w, height, `
      <rect x="${cx - trunkW / 2}" y="${height - trunkH}" width="${trunkW}" height="${trunkH}" rx="4" fill="#8d6e63"/>
      <circle cx="${cx}" cy="${crownCy}" r="${crownR}" fill="#66bb6a"/>
      <circle cx="${cx - crownR * 0.6}" cy="${crownCy + crownR * 0.4}" r="${crownR * 0.7}" fill="#4caf50"/>
      <circle cx="${cx + crownR * 0.6}" cy="${crownCy + crownR * 0.4}" r="${crownR * 0.7}" fill="#43a047"/>
      <circle cx="${cx}" cy="${crownCy - crownR * 0.4}" r="${crownR * 0.7}" fill="#81c784"/>`);
  }

  /* ---- KỆ SÁCH (cao/thấp) ---- */
  function shelf(height = 120, w = 96) {
    const rows = Math.max(1, Math.round(height / 46));
    let books = '';
    const rowH = (height - 8) / rows;
    const cols = ['#e53935', '#1e88e5', '#fdd835', '#43a047', '#8e24aa', '#fb8c00'];
    for (let r = 0; r < rows; r++) {
      const y = 4 + r * rowH; let x = 8;
      while (x < w - 12) { const bw = 8 + (x % 3) * 3; books += `<rect x="${x}" y="${y + 6}" width="${bw}" height="${rowH - 12}" fill="${cols[(r + x) % cols.length]}"/>`; x += bw + 3; }
      books += `<rect x="4" y="${y + rowH - 6}" width="${w - 8}" height="5" fill="#8d6e63"/>`;
    }
    return wrap(w, height, `<rect x="2" y="2" width="${w - 4}" height="${height - 2}" rx="6" fill="#a1887f"/>${books}`);
  }

  /* ---- HÀNG RÀO (cao/thấp) ---- */
  function fence(height = 90, w = 120) {
    const n = 5, gap = w / n; let pk = '';
    for (let i = 0; i < n; i++) {
      const x = i * gap + 6;
      pk += `<polygon points="${x},${height} ${x},14 ${x + gap - 10},14 ${x + gap - 10},${height}" fill="#f5f0e6" stroke="#c9bfa5" stroke-width="2"/>
             <polygon points="${x},14 ${x + (gap - 10) / 2},4 ${x + gap - 10},14" fill="#f5f0e6" stroke="#c9bfa5" stroke-width="2"/>`;
    }
    return wrap(w, height, `${pk}<rect x="2" y="${height * 0.4}" width="${w - 4}" height="8" fill="#e6dcc3"/><rect x="2" y="${height * 0.72}" width="${w - 4}" height="8" fill="#e6dcc3"/>`);
  }

  /* ---- TỔ CHIM / HỘP / NHÀ (dùng cho nối trong-ngoài) ---- */
  function nest(w = 90) {
    return wrap(w, 60, `<ellipse cx="${w / 2}" cy="42" rx="${w / 2 - 4}" ry="16" fill="#a1887f"/>
      <ellipse cx="${w / 2}" cy="34" rx="${w / 2 - 8}" ry="12" fill="#d7ccc8"/>
      <path d="M6 44 q${w / 2} -30 ${w - 12} 0" fill="none" stroke="#8d6e63" stroke-width="5"/>`);
  }
  function box(w = 84) {
    return wrap(w, 66, `<rect x="8" y="24" width="${w - 16}" height="34" rx="3" fill="#c8925a"/>
      <polygon points="8,24 ${w / 2},10 ${w - 8},24 ${w - 8},24 ${w / 2},38 8,24" fill="#dcae7c"/>
      <polygon points="8,24 ${w / 2},38 ${w / 2},58 8,58" fill="#b07c46"/>`);
  }
  function house(w = 90) {
    return wrap(w, 78, `<rect x="14" y="34" width="${w - 28}" height="40" fill="#ffd54f"/>
      <polygon points="6,36 ${w / 2},8 ${w - 6},36" fill="#e53935"/>
      <rect x="${w / 2 - 9}" y="50" width="18" height="24" rx="2" fill="#6d4c41"/>`);
  }

  /* ---- CON TEM (stamp) ---- */
  function stamp(w = 70) {
    const h = w * 0.78;
    return wrap(w, h, `
      <rect x="3" y="3" width="${w - 6}" height="${h - 6}" fill="#fff" stroke="#e53935" stroke-width="3" stroke-dasharray="2 3"/>
      <rect x="9" y="9" width="${w - 18}" height="${h - 18}" fill="#ffe0b2"/>
      <circle cx="${w / 2}" cy="${h / 2 - 3}" r="${w * 0.18}" fill="#ff7043"/>
      <ellipse cx="${w / 2}" cy="${h / 2 + 2}" rx="8" ry="6" fill="#333"/>
      <polygon points="${w / 2 + 6},${h / 2} ${w / 2 + 16},${h / 2 - 2} ${w / 2 + 6},${h / 2 + 3}" fill="#fdd835"/>
      <text x="${w / 2}" y="${h - 8}" font-size="8" text-anchor="middle" fill="#555" font-family="sans-serif">44</text>`);
  }

  /* ---- id duy nhất cho clipPath ---- */
  let _id = 0; const nid = () => 'art' + (++_id);

  /* ---- BÌNH CÁ / LỌ có mức nước (đầy – rỗng) ---- */
  function bowl(fill = 1, w = 108) {
    const h = w, cx = w / 2, cy = h * 0.56, rx = w * 0.44, ry = h * 0.42;
    const id = nid();
    const top = cy - ry, waterTop = cy + ry - (2 * ry) * Math.max(0, Math.min(1, fill));
    return wrap(w, h, `
      <defs><clipPath id="${id}"><ellipse cx="${cx}" cy="${cy}" rx="${rx - 3}" ry="${ry - 3}"/></clipPath></defs>
      <rect x="${cx - rx * 0.5}" y="${top - 6}" width="${rx}" height="8" rx="4" fill="#cfeaf7"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#eaf7ff" stroke="#7fb9d6" stroke-width="3"/>
      <rect x="0" y="${waterTop}" width="${w}" height="${h}" fill="#6fd0f5" opacity=".7" clip-path="url(#${id})"/>
      <ellipse cx="${cx - rx * 0.35}" cy="${cy - ry * 0.4}" rx="${rx * 0.18}" ry="${ry * 0.28}" fill="#fff" opacity=".55"/>`);
  }
  /* ---- LỌ THUỶ TINH có mức chứa ---- */
  function jarFill(fill = 1, w = 88) {
    const h = w * 1.25, id = nid();
    const bx = w * 0.16, bw = w * 0.68, bodyTop = h * 0.2, bodyH = h * 0.72;
    const contentTop = bodyTop + bodyH - bodyH * Math.max(0, Math.min(1, fill));
    return wrap(w, h, `
      <defs><clipPath id="${id}"><rect x="${bx + 2}" y="${bodyTop + 2}" width="${bw - 4}" height="${bodyH - 4}" rx="10"/></clipPath></defs>
      <rect x="${w * 0.3}" y="4" width="${w * 0.4}" height="${h * 0.09}" rx="3" fill="#c8a24a"/>
      <rect x="${bx}" y="${bodyTop}" width="${bw}" height="${bodyH}" rx="12" fill="#eef7fb" stroke="#9cc6da" stroke-width="3"/>
      <rect x="0" y="${contentTop}" width="${w}" height="${h}" fill="#f6c945" opacity=".85" clip-path="url(#${id})"/>`);
  }
  /* ---- THẺ SỐ to (số 0–10) ---- */
  function numCard(n, color = '#1e88e5', size = 60) {
    return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:16px;background:${color};color:#fff;font-size:${Math.round(size * 0.58)}px;font-weight:900;box-shadow:0 4px 0 rgba(0,0,0,.16);font-family:inherit">${n}</span>`;
  }

  /* ---- Ô VUÔNG 2x2 NHIỀU MÀU (quy luật màu sắc) ---- */
  const QC = { red: '#e53935', orange: '#fb8c00', yellow: '#fdd835', green: '#43a047', blue: '#1e88e5', purple: '#8e24aa', pink: '#ec407a', teal: '#00acc1' };
  function quad(tl, tr, bl, br, s = 50) {
    const h = s / 2, c = (k) => QC[k] || k;
    return wrap(s, s, `<rect x="0" y="0" width="${h}" height="${h}" fill="${c(tl)}"/><rect x="${h}" y="0" width="${h}" height="${h}" fill="${c(tr)}"/><rect x="0" y="${h}" width="${h}" height="${h}" fill="${c(bl)}"/><rect x="${h}" y="${h}" width="${h}" height="${h}" fill="${c(br)}"/><rect x="0" y="0" width="${s}" height="${s}" fill="none" stroke="#fff" stroke-width="2"/>`);
  }

  /* ---- KHỐI 3D (lập phương, hộp, cầu, trụ, nón) ---- */
  function solid(kind, color = 'purple', w = 78) {
    const c = QC[color] || color, dark = shade(c, -28), light = shade(c, 18), h = w;
    if (kind === 'cube' || kind === 'cuboid') {
      const bw = kind === 'cube' ? w * 0.62 : w * 0.8, bh = w * 0.55, d = w * 0.22, x = (w - bw) / 2, y = h - bh - 6;
      return wrap(w, h, `
        <polygon points="${x},${y} ${x + d},${y - d} ${x + bw + d},${y - d} ${x + bw},${y}" fill="${light}"/>
        <polygon points="${x + bw},${y} ${x + bw + d},${y - d} ${x + bw + d},${y + bh - d} ${x + bw},${y + bh}" fill="${dark}"/>
        <rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${c}"/>`);
    }
    if (kind === 'sphere') {
      const id = nid();
      return wrap(w, h, `<defs><radialGradient id="${id}" cx="38%" cy="34%" r="70%"><stop offset="0%" stop-color="${light}"/><stop offset="100%" stop-color="${dark}"/></radialGradient></defs>
        <circle cx="${w / 2}" cy="${h / 2}" r="${w * 0.42}" fill="url(#${id})"/>`);
    }
    if (kind === 'cylinder') {
      const bw = w * 0.56, x = (w - bw) / 2, ey = w * 0.12, top = w * 0.16, bot = h * 0.86;
      return wrap(w, h, `
        <rect x="${x}" y="${top}" width="${bw}" height="${bot - top}" fill="${c}"/>
        <ellipse cx="${w / 2}" cy="${bot}" rx="${bw / 2}" ry="${ey}" fill="${dark}"/>
        <rect x="${x}" y="${top}" width="${bw / 3}" height="${bot - top}" fill="${light}" opacity=".35"/>
        <ellipse cx="${w / 2}" cy="${top}" rx="${bw / 2}" ry="${ey}" fill="${light}"/>`);
    }
    if (kind === 'cone') {
      const bw = w * 0.6, x = (w - bw) / 2, bot = h * 0.82, ey = w * 0.11;
      return wrap(w, h, `
        <polygon points="${w / 2},${w * 0.12} ${x},${bot} ${x + bw},${bot}" fill="${c}"/>
        <polygon points="${w / 2},${w * 0.12} ${x},${bot} ${w / 2},${bot}" fill="${light}" opacity=".4"/>
        <ellipse cx="${w / 2}" cy="${bot}" rx="${bw / 2}" ry="${ey}" fill="${dark}"/>`);
    }
    return '';
  }
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16); let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  return { wrap, pencil, crayon, ruler, path, snake, tree, shelf, fence, nest, box, house, stamp, quad, bowl, jarFill, numCard, solid };
})();
