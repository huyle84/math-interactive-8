document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const exerciseArea = document.getElementById('exercise-area');
    const topicTitle = document.getElementById('topic-title');
    const topicDesc = document.getElementById('topic-desc');

    const topicsInfo = {
        'expressions': { title: 'Biểu thức đại số', desc: 'Đơn thức, đa thức nhiều biến, phép toán đa thức, hằng đẳng thức và các loại phân thức.' },
        'solids': { title: 'Các hình khối trong thực tiễn', desc: 'Tính thể tích và diện tích xung quanh của hình chóp tam giác đều, tứ giác đều.' },
        'quadrilaterals': { title: 'Các loại tứ giác thường gặp', desc: 'Định nghĩa và tính chất các loại tứ giác, hình thang, hình chữ nhật, hình thoi, hình vuông.' },
        'pythagoras': { title: 'Định lý Pythagore', desc: 'Tính khoảng cách và chứng minh tam giác vuông.' },
        'statistics': { title: 'Một số yếu tố thống kê', desc: 'Thu thập, phân loại và biểu diễn phân tích dữ liệu trên biểu đồ.' },
        'equations': { title: 'Phương trình bậc nhất', desc: '40 câu hỏi luyện tập và giải phương trình.' },
        'functions': { title: 'Hàm số bậc nhất', desc: 'Dạng bài tính chất đồ thị hàm số và vị trí tương đối.' },
        'thales': { title: 'Định lý Thales', desc: 'Tính tỉ lệ đồng dạng đoạn thẳng.' },
        'similartriangles': { title: 'Hình đồng dạng', desc: 'Tỉ số đồng dạng và tính toán liên quan.' },
        'probability': { title: 'Xác suất', desc: 'Đánh giá không gian mẫu và tính xác suất thực nghiệm.' },
        'gamemode_hk1': { title: 'Game Ôn Tập Học Kỳ 1', desc: 'Xây dựng phòng thi đấu bốc ngẫu nhiên từ 5 Chủ đề của Học Kỳ 1.' },
        'gamemode_hk2': { title: 'Game Ôn Tập Học Kỳ 2', desc: 'Xây dựng phòng thi đấu bốc ngẫu nhiên từ 5 Chủ đề của Học Kỳ 2.' }
    };

    function loadTopic(topicId) {
        navItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-topic="${topicId}"]`).classList.add('active');

        const info = topicsInfo[topicId];
        topicTitle.textContent = info.title;
        topicDesc.textContent = info.desc;

        exerciseArea.innerHTML = '';
        
        if (topicId === 'gamemode_hk1' || topicId === 'gamemode_hk2') {
            const template = document.getElementById('tpl-gamemode');
            exerciseArea.appendChild(template.content.cloneNode(true));
            initGameMode(topicId);
            return;
        }

        const template = document.getElementById('tpl-topic');
        exerciseArea.appendChild(template.content.cloneNode(true));
        
        // Initialize general questions
        initGeneralTopic(topicId);
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            loadTopic(item.dataset.topic);
        });
    });

    if (window.location.search.includes('play=true')) {
        loadTopic('gamemode_hk1');
    } else {
        loadTopic('expressions'); 
    }
});

function renderMath(element) {
    if (window.renderMathInElement && element) {
        renderMathInElement(element, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});
    }
}

function showToast(message, type) {
    const toast = document.getElementById('feedback-toast');
    const icon = toast.querySelector('.icon');
    const msgSpan = toast.querySelector('.message');
    toast.className = 'toast';
    toast.classList.add(type, 'show');
    msgSpan.textContent = message;
    icon.className = type === 'success' ? 'icon fa-solid fa-circle-check' : 'icon fa-solid fa-circle-xmark';
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// =========================================================================
// GENERALIZED TOPIC RENDERER (Supports MCQ, Fill, TF)
// =========================================================================

let currentTopicData = [];
let currentQId = 0;
let currentAnswer = "";

function initGeneralTopic(topicId) {
    currentQId = 0;
    currentTopicData = [...topicData[topicId]];
    // Shuffle logic temporarily disabled so user can see they follow a pattern
    // currentTopicData.sort(() => 0.5 - Math.random());
    renderGeneralQuestion();
}

function renderGeneralQuestion() {
    if (currentQId >= currentTopicData.length) {
        showToast('Tuyệt vời! Bạn đã hoàn thành 40/40 câu hỏi chủ đề này!', 'success');
        currentQId = 0;
    }
    
    const qObj = currentTopicData[currentQId];
    currentAnswer = qObj.answer;
    
    document.getElementById('q-num').textContent = currentQId + 1;
    document.getElementById('q-text').innerHTML = qObj.q;
    
    const badge = document.getElementById('q-type-badge');
    const optDiv = document.getElementById('q-options');
    optDiv.innerHTML = '';
    
    if (qObj.type === 'mcq') {
        badge.textContent = "TRẮC NGHIỆM 4 LỰA CHỌN";
        badge.style.background = "var(--primary)";
        optDiv.style.gridTemplateColumns = '1fr 1fr';
        
        // Shuffle options dynamically on render
        const opts = [...qObj.options].sort(() => 0.5 - Math.random());
        opts.forEach(opt => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="gen-q" value="${opt}"> ${opt}`;
            optDiv.appendChild(label);
        });
    } else if (qObj.type === 'tf') {
        badge.textContent = "ĐÚNG HAY SAI";
        badge.style.background = "#f59e0b"; // Warning orange
        optDiv.style.gridTemplateColumns = '1fr 1fr';
        
        qObj.options.forEach(opt => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="gen-q" value="${opt}"> ${opt}`;
            optDiv.appendChild(label);
        });
    } else if (qObj.type === 'fill') {
        badge.textContent = "ĐIỀN KHUYẾT";
        badge.style.background = "var(--success)";
        optDiv.style.gridTemplateColumns = '1fr';
        optDiv.innerHTML = `<input type="text" id="gen-fill-answer" class="text-input" placeholder="Hãy nhập số liệu chính xác vào đây..." style="width: 100%; padding: 1rem; border-radius: 0.5rem; border: 2px solid var(--border); font-size: 1.2rem; outline: none; transition: 0.2s;">`;
    }
    
    // UI reseting
    document.getElementById('btn-submit').style.display = 'inline-block';
    document.getElementById('btn-next').style.display = 'none';
    
    // Render KaTeX mathematically
    renderMath(document.getElementById('q-text'));
    renderMath(optDiv);
}

window.checkGeneralAnswer = function() {
    const qObj = currentTopicData[currentQId];
    let selected = null;
    
    if (qObj.type === 'mcq' || qObj.type === 'tf') {
        const radios = document.getElementsByName('gen-q');
        radios.forEach(r => { if(r.checked) selected = r.value; });
    } else if (qObj.type === 'fill') {
        const input = document.getElementById('gen-fill-answer');
        if(input) selected = input.value.trim();
    }
    
    if (!selected || selected === "") {
        showToast('Vui lòng chọn hoặc nhập đáp án trước khi Chốt!', 'error');
        return;
    }
    
    // UI enhancements for correct/incorrect feedback
    const radios = document.getElementsByName('gen-q');
    
    if (selected === currentAnswer) {
        showToast('Chính xác!', 'success');
        if(qObj.type === 'fill') {
            document.getElementById('gen-fill-answer').style.border = "4px solid var(--success)";
            document.getElementById('gen-fill-answer').style.backgroundColor = "#e0facd";
        } else {
            radios.forEach(r => {
                if (r.value === currentAnswer) r.parentElement.style.backgroundColor = "var(--success)";
                else r.parentElement.style.opacity = "0.5";
                r.parentElement.style.color = "white";
                r.disabled = true;
            });
        }
        document.getElementById('btn-submit').style.display = 'none';
        document.getElementById('btn-next').style.display = 'inline-block';
        // Auto continue after 1.5s
        setTimeout(() => { document.getElementById('btn-next').click(); }, 1500);
    } else {
        showToast('Sai rồi, hãy cố gắng thử lại!', 'error');
        if(qObj.type === 'fill') {
            document.getElementById('gen-fill-answer').style.border = "4px solid var(--error)";
            document.getElementById('gen-fill-answer').style.backgroundColor = "#ffe5e5";
            document.getElementById('gen-fill-answer').classList.add('shake');
            setTimeout(() => document.getElementById('gen-fill-answer').classList.remove('shake'), 400);
        } else {
            radios.forEach(r => {
                if(r.checked) {
                    r.parentElement.style.backgroundColor = "var(--error)";
                    r.parentElement.style.color = "white";
                }
            });
        }
    }
}

window.nextGeneralQuestion = function() {
    currentQId++;
    renderGeneralQuestion();
}

// =========================================================================
// 9. GAME MODE / BỘ ĐỀ TỔNG HỢP LOGIC (320 QUESTIONS)
// =========================================================================

let gamePool = [];
function buildGamePool() {
    gamePool = [];
    Object.values(topicData).forEach(topicArray => {
        topicArray.forEach(q => {
            let optionsForGame = q.options;
            // Pad options for games
            if(q.type === 'fill') {
                // Determine wrong variations for game UI which forces 4 options
                let aStr = q.answer.toString() + "0";
                let bStr = "-" + q.answer.toString();
                let cStr = "1";
                let opts = [q.answer, aStr, bStr, cStr];
                // Remove duplicates in case answer is 0
                opts = [...new Set(opts)];
                while(opts.length < 4) { opts.push(opts.length.toString()); }
                optionsForGame = opts.sort(() => Math.random() - 0.5);
            }
            if(q.type === 'tf') {
                optionsForGame = ["Đúng", "Sai"];
            }
            gamePool.push({
                text: "[" + (q.type==='tf'?'Đúng/Sai':q.type==='fill'?'Điền Khuyết':'Trắc nghiệm') + "] " + q.q,
                options: optionsForGame,
                answer: q.answer
            });
        });
    });
}

let gameSocket = null;
let wsUrl = 'ws://' + window.location.hostname + ':8765';

function initGameMode(topicId) {
    buildGamePool();
    const welcomeEl = document.getElementById('game-welcome');
    if (welcomeEl) welcomeEl.style.display = 'none'; 
    document.getElementById('host-lobby').style.display = 'block';
    document.getElementById('host-play').style.display = 'none';
    document.getElementById('host-result').style.display = 'none';

    // Determine target topics based on semester mode
    let targetTopics = [];
    if (topicId === 'gamemode_hk1') {
        targetTopics = ['expressions', 'solids', 'pythagoras', 'quadrilaterals', 'statistics'];
    } else {
        targetTopics = ['equations', 'functions', 'thales', 'similartriangles', 'probability'];
    }

    try {
        gameSocket = new WebSocket(wsUrl);
        gameSocket.onopen = () => {
             gameSocket.send(JSON.stringify({action: 'hostJoin'}));
             
             let sessionQuestions = [];
             
             // Clone the game pool by topic
             let poolByTopic = {};
             targetTopics.forEach(t => {
                 poolByTopic[t] = [...gamePool]
                     .filter(q => topicData[t] && topicData[t].some(td => q.text.includes(td.q)))
                     .sort(() => 0.5 - Math.random());
             });

             // Evenly distribute 12 questions
             let tIndex = 0;
             for (let i = 0; i < 12; i++) {
                 let t = targetTopics[tIndex % targetTopics.length];
                 if (poolByTopic[t] && poolByTopic[t].length > 0) {
                     sessionQuestions.push(poolByTopic[t].pop());
                 }
                 tIndex++;
             }
             
             // Final shuffle so the topics don't appear in order
             sessionQuestions = sessionQuestions.sort(() => 0.5 - Math.random());
             
             gameSocket.send(JSON.stringify({action: 'hostCreateGame', questions: sessionQuestions}));
        };
        gameSocket.onmessage = (event) => {
             const data = JSON.parse(event.data);
             if (data.type === 'updatePlayers') {
                 const list = document.getElementById('host-player-list');
                 document.getElementById('player-count').textContent = Object.keys(data.players).length;
                 if(list) {
                     list.innerHTML = '';
                     if(Object.keys(data.players).length === 0) list.innerHTML = `<li style="color:var(--text-muted); font-size: 1rem; font-style: italic;">Chưa có học sinh nào...</li>`;
                     Object.values(data.players).forEach(p => { list.innerHTML += `<li><i class="fa-solid fa-user" style="color:var(--primary);"></i> ${p.name}</li>`; });
                 }
             } else if (data.type === 'playerAnswered') {
                 const statusDiv = document.getElementById('host-live-status');
                 statusDiv.innerHTML = '';
                 Object.values(data.players).forEach(p => {
                     let color = "gray", icon = "fa-clock";
                     if(p.status === true) { color = "var(--success)"; icon = "fa-check"; }
                     else if(p.status === false) { color = "var(--error)"; icon = "fa-xmark"; }
                     statusDiv.innerHTML += `<span style="color:${color};"><i class="fa-solid ${icon}"></i> ${p.name} (${p.score})</span>`;
                 });
             } else if (data.type === 'newQuestion') {
                 document.getElementById('host-q-num').textContent = data.index + 1;
                 document.getElementById('host-q-text').innerHTML = data.q.text;
                 const optsDiv = document.getElementById('host-options'); optsDiv.innerHTML = '';
                 data.q.options.forEach(opt => {
                     const btn = document.createElement('div'); btn.className = 'btn'; btn.innerHTML = opt; btn.style.background = '#e2e8f0';
                     if (opt === data.q.answer) btn.style.border = "3px solid #10b981";
                     optsDiv.appendChild(btn);
                 });
                 const statusDiv = document.getElementById('host-live-status');
                 statusDiv.innerHTML = '';
                 renderMath(document.getElementById('host-q-text')); renderMath(optsDiv);
                 
                 // Start Timer
                 let timeLeft = 30;
                 const timerDiv = document.getElementById('host-countdown');
                 timerDiv.style.display = 'flex';
                 timerDiv.textContent = timeLeft;
                 if(window.gameTimer) clearInterval(window.gameTimer);
                 window.gameTimer = setInterval(() => {
                     timeLeft--;
                     timerDiv.textContent = timeLeft;
                     if(timeLeft <= 0) {
                         clearInterval(window.gameTimer);
                         timerDiv.textContent = "0";
                         // Automatically move to the next question when time is up
                         hostNextQuestion();
                     }
                 }, 1000);

             } else if (data.type === 'gameEnded') {
                 if(window.gameTimer) clearInterval(window.gameTimer);
                 document.getElementById('host-play').style.display = 'none';
                 document.getElementById('host-result').style.display = 'block';
                 const sorted = Object.values(data.players).sort((a,b) => b.score - a.score);
                 const list = document.getElementById('leaderboard'); list.innerHTML = '';
                 sorted.forEach((p, idx) => {
                      let medal = idx===0?"<i class='fa-solid fa-medal' style='color:#f59e0b'></i> 1. ":idx===1?"<i class='fa-solid fa-medal' style='color:#94a3b8'></i> 2. ":idx===2?"<i class='fa-solid fa-medal' style='color:#b45309'></i> 3. ":`${idx+1}. `;
                      list.innerHTML += `<div style="padding: 1rem; border-bottom: 1px solid #ccc;">${medal} <strong>${p.name}</strong>: ${p.score} điểm</div>`;
                 });
             }
        };
    } catch(e) { console.error("Websocket failed", e); }

    const joinUrl = `http://${window.location.hostname}:8201/player.html`;
    document.getElementById('host-ip').innerHTML = joinUrl;
    const qrContainer = document.getElementById('qrcode');
    if(qrContainer) { qrContainer.innerHTML = ''; new QRCode(qrContainer, { text: joinUrl, width: 160, height: 160 }); }
}

window.hostStartGame = function() {
    if(gameSocket) gameSocket.send(JSON.stringify({action: 'hostStartGame'}));
    document.getElementById('host-lobby').style.display = 'none';
    document.getElementById('host-play').style.display = 'block';
}

window.hostNextQuestion = function() {
    if(gameSocket) gameSocket.send(JSON.stringify({action: 'hostNextQuestion'}));
}
