# Math 8 Interactive Quiz System

Hệ thống ôn tập Toán 8 tương tác thời gian thực dành cho lớp học.

## Tính năng chính
- **Hai chế độ Học kỳ:** Chia rõ rệt kiến thức Học kỳ 1 và Học kỳ 2.
- **Game Mode Real-time:** Giáo viên chủ trì phòng thi, học sinh tham gia qua QR Code và thi đấu trực tiếp.
- **Đa dạng câu hỏi:** Trắc nghiệm, Điền khuyết, Đúng/Sai với 320 câu hỏi bao quát chương trình MOET.
- **Giao diện hiện đại:** Tích hợp KaTeX để hiển thị công thức toán học sắc nét.

## Cách khởi chạy
1. Cài đặt thư viện: `pip install websockets`
2. Chạy Server đồng bộ: `python server.py`
3. Chạy Web Server (trong thư mục `public`): `python -m http.server 8201`
4. Truy cập: `http://localhost:8201`

## Cấu trúc thư mục
- `/public`: Chứa giao diện người dùng (Giáo viên & Học sinh).
- `server.py`: Server WebSocket quản lý trạng thái game.
- `generate_data.py`: Script tạo dữ liệu câu hỏi tự động.
