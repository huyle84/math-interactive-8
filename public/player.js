const wsUrl = 'ws://' + window.location.hostname + ':8765';
let socket;
let myName = '';
let currentQuestion = null;
const app = document.getElementById('app');

function connect() {
    socket = new WebSocket(wsUrl);
    socket.onopen = () => { showLogin(); };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'playerJoinedStatus') {
            app.innerHTML = `
                <h2 style="color:var(--success); font-size: 2rem;"><i class="fa-solid fa-check-circle"></i> Đăng nhập thành công</h2>
                <p style="font-size: 1.5rem;">Thí sinh: <strong>${data.name}</strong></p>
                <p style="margin-top: 2rem; color: var(--text-muted);">Chú ý màn hình giáo viên, game sắp bắt đầu...</p>
                <div style="font-size:3rem; margin-top:2rem; color: var(--primary);"><i class="fa-solid fa-spinner fa-spin"></i></div>
            `;
        } else if (data.type === 'newQuestion') {
            currentQuestion = data.q;
            let html = `
                <p style="font-size:1.2rem; color:var(--text-muted); font-weight: 600;">Câu hỏi ${data.index + 1}/12</p>
                <div style="font-size:1.5rem; margin-bottom: 2rem; padding: 2rem; background: rgba(79,70,229,0.05); border-radius: 1rem; border:2px dashed var(--primary);">${data.q.text}</div>
                <div style="display:grid; grid-template-columns: 1fr; gap:1rem;">
            `;
            data.q.options.forEach((opt, idx) => {
                html += `<button class="btn option-btn" style="background:white; padding: 1.5rem; font-size: 1.5rem; border:2px solid var(--border); width: 100%; border-radius:1rem;" onclick="submitAnswer('${idx}')">${opt}</button>`;
            });
            html += `</div>`;
            app.innerHTML = html;
            renderMathGlob();
        } else if (data.type === 'gameEnded') {
            const meID = Object.keys(data.players).find(id => data.players[id].name === myName);
            const myScore = meID ? data.players[meID].score : 0;
            app.innerHTML = `
                <i class="fa-solid fa-trophy" style="font-size: 5rem; color: #f59e0b; margin-bottom: 1.5rem;"></i>
                <h2 style="font-size: 2.5rem;">Đã hoàn thành!</h2>
                <p style="font-size: 1.5rem;">Điểm của bạn: <strong style="color: var(--primary);">${myScore}</strong></p>
                <p style="font-size: 1.2rem;">Vui lòng xem kết quả trên máy chiếu của giáo viên.</p>
            `;
        }
    };
    socket.onclose = () => {
        app.innerHTML = `<h2 style="color:var(--error);">Mất kết nối với máy chủ</h2><button class="btn btn-primary" onclick="location.reload()">Kết nối lại</button>`;
    };
}

function renderMathGlob() {
    if(window.renderMathInElement) { renderMathInElement(app, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]}); }
}

function showLogin() {
    app.innerHTML = `
        <i class="fa-solid fa-graduation-cap" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
        <h2 style="color:var(--text-main); font-size: 2rem;">Vào Phòng Thi</h2>
        <input type="text" id="playerName" placeholder="Nhập tên thật của bạn..." style="width: 100%; padding: 1rem; margin: 2rem 0; font-size: 1.5rem; border-radius:0.5rem; border:2px solid var(--border); text-align:center;">
        <button class="btn btn-primary" style="width: 100%; padding:1.5rem; font-size: 1.5rem;" onclick="joinGame()">Tham gia Game</button>
    `;
}

window.joinGame = function() {
    const name = document.getElementById('playerName').value;
    if(!name) return alert('Vui lòng nhập tên để giáo viên ghi nhận điểm!');
    myName = name;
    socket.send(JSON.stringify({ action: 'playerJoin', name: name }));
};

window.submitAnswer = function(optIndex) {
    const selected = currentQuestion.options[optIndex];
    const isCorrect = (selected === currentQuestion.answer);
    socket.send(JSON.stringify({ action: 'playerAnswer', isCorrect: isCorrect }));
    app.innerHTML = `
        <h2 style="font-size: 2rem; color: var(--text-main);">Đã khóa đáp án:</h2>
        <div style="font-size: 2rem; margin:2rem 0; padding:2rem; border:4px solid var(--primary); border-radius:1rem; background: rgba(79, 70, 229, 0.1); color: var(--primary); font-weight: bold;">
            ${selected}
        </div>
        <p style="font-style:italic; font-size: 1.2rem; color: var(--text-muted);"><i class="fa-solid fa-hourglass-half fa-spin"></i> Chờ giáo viên chuyển qua câu tiếp theo...</p>
    `;
    renderMathGlob();
};

window.onload = connect;
