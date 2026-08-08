# 🐼 Toán Tư Duy cùng Gấu KIKI

Trang web trò chơi học toán tư duy cho bé chuẩn bị vào lớp 1, chuyển thể từ cuốn
**“Phiếu luyện Toán tư duy cùng Gấu KIKI 3 – Xác định vị trí & Các dạng toán quy luật”**
(tác giả Trần Thị Hường – MegaBook).

Thay vì viết vào sách chỉ chơi được **một lần**, bé có thể vào chơi **lại bao nhiêu lần cũng được** —
mỗi lần chơi câu hỏi lại được **tạo ngẫu nhiên mới**. 🎉

## ✨ Tính năng

- **20 bài học** đúng theo mục lục sách, chia 2 phần:
  - *Phần 1 – Xác định vị trí:* trên/dưới/giữa, trái/phải, trong/ngoài, xa/gần, to/nhỏ, cao/thấp, dài/ngắn, phương hướng, thống kê số liệu.
  - *Phần 2 – Toán quy luật:* quy luật màu sắc, hình khối, thứ tự, đối chiếu hình, tìm vật xuất hiện 1 lần, tìm hình giống hệt, hình liên quan, tìm bóng, tìm điểm khác biệt, tìm điểm không hợp lí, ôn tập.
- Câu hỏi **ngẫu nhiên mỗi lần chơi** → chơi lại không nhàm chán.
- **Giọng đọc tiếng Việt** đọc câu hỏi (nếu thiết bị có sẵn giọng vi-VN).
- **Âm thanh vui nhộn**, ngôi sao thưởng ⭐ và pháo giấy 🎊 khi hoàn thành.
- **Lưu kết quả** số sao của bé (trong máy, dùng localStorage).
- Chạm to, dễ bấm — phù hợp **điện thoại & máy tính bảng**. Chạy **offline**, không cần mạng.

## ▶️ Chơi thử trên máy

Chỉ cần mở file `index.html` bằng trình duyệt là chơi được. Nếu muốn chạy như một web server nhỏ:

```bash
npx serve .
```

rồi mở địa chỉ hiện ra (ví dụ `http://localhost:3000`).

## 🚀 Đưa lên GitHub Pages (miễn phí)

1. Tạo một repository mới trên GitHub (ví dụ tên `toan-tu-duy-kiki`).
2. Đẩy toàn bộ thư mục này lên nhánh `main`:

   ```bash
   git init
   git add .
   git commit -m "Toán tư duy cùng Gấu KIKI"
   git branch -M main
   git remote add origin https://github.com/<tên-của-bạn>/<tên-repo>.git
   git push -u origin main
   ```

3. Vào repo trên GitHub → **Settings** → **Pages**.
4. Mục **Build and deployment** → **Source**: chọn **Deploy from a branch**.
5. Chọn nhánh **main**, thư mục **/ (root)** → **Save**.
6. Đợi khoảng 1 phút, trang sẽ chạy tại:
   `https://<tên-của-bạn>.github.io/<tên-repo>/`

> File `.nojekyll` đã có sẵn để GitHub Pages phục vụ file tĩnh đúng cách.

## 📁 Cấu trúc

```
index.html          # trang chính
css/style.css       # giao diện
js/engine.js        # bộ máy trò chơi (âm thanh, giọng đọc, hình SVG, các kiểu chơi)
js/lessons.js       # 20 bài học (bộ sinh câu hỏi ngẫu nhiên)
js/main.js          # menu & điều hướng
ref/                # ảnh chụp sách gốc (tham khảo, không cần cho web)
.nojekyll           # để GitHub Pages phục vụ file tĩnh
```

## 📝 Ghi chú

Toàn bộ hình ảnh trong web dùng **emoji và hình khối SVG tự vẽ**, **không** sao chép tranh
minh hoạ trong sách. Nội dung học tập dựa theo *dạng bài* của sách để bé luyện tập lại.
