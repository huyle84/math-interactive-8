// Cấu hình URL cho WebSocket
// Nếu chạy trên máy local, nó sẽ sử dụng localhost.
// KHI DEPLOY LÊN REPLIT: Hãy đổi wss://ten-du-an.username.repl.co thành URL thực tế mà Replit cung cấp cho bạn
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.WS_URL = isLocalhost 
    ? 'ws://' + window.location.hostname + ':8080' 
    : 'wss://YOUR_REPLIT_URL_HERE.repl.co'; // THAY ĐỔI DÒNG NÀY KHI DEPLOY REPLIT
