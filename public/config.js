// Cấu hình URL cho WebSocket
// Nếu chạy trên máy local, nó sẽ sử dụng localhost.
// KHI DEPLOY LÊN REPLIT: Hãy đổi wss://ten-du-an.username.repl.co thành URL thực tế mà Replit cung cấp cho bạn
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Cách sửa an toàn nhất để chạy được cả trên máy cá nhân và Vercel
const currentOrigin = window.location.origin; // Nó sẽ tự lấy https://math-interactive-8.vercel.app
const playerLink = `${currentOrigin}/player.html`;

window.WS_URL = isLocalhost
    ? 'ws://' + window.location.hostname
    : 'wss://add0fede-139d-4f54-a86d-9958bcc2ead1-00-27w4vuw9sgzo7.picard.replit.dev/'; // THAY ĐỔI DÒNG NÀY KHI DEPLOY REPLIT
