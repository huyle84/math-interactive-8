// Cấu hình URL cho WebSocket
// Nếu chạy trên máy local, nó sẽ sử dụng localhost.
// KHI DEPLOY LÊN REPLIT: Hãy đổi wss://ten-du-an.username.repl.co thành URL thực tế mà Replit cung cấp cho bạn
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Cách sửa an toàn nhất để chạy được cả trên máy cá nhân và Vercel
// const currentOrigin = window.location.origin; // Nó sẽ tự lấy https://math-interactive-8.vercel.app
// const playerLink = `${currentOrigin}/player.html`;

window.WS_URL = isLocalhost
    ? 'ws://' + window.location.hostname + ':8000'
    : 'wss://a11539bf-f3eb-47fb-899a-f1445c5d24f8-00-2hl8sp6881z74.spock.replit.dev/'; // THAY ĐỔI DÒNG NÀY KHI DEPLOY REPLIT
