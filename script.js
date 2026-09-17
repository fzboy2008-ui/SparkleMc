// --- IP Address Copy Toast ---
function copyIpAddress(address, toastId) {
    navigator.clipboard.writeText(address).then(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// --- Real-time Community Chat System ---
function postChatMessage(e) {
    e.preventDefault();
    const nickInput = document.getElementById('chatNick');
    const msgInput = document.getElementById('chatMessage');
    const nick = nickInput.value.trim() || 'Player';
    const msg = msgInput.value.trim();

    if (!msg) return;

    const chatBody = document.getElementById('chatFeed');
    const row = document.createElement('div');
    row.className = 'chat-row';
    row.innerHTML = `
        <div class="chat-avatar"><i class="fas fa-user"></i></div>
        <div class="chat-content">
            <span class="chat-author">${nick}</span>
            <p class="chat-text">${msg}</p>
        </div>
    `;
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Save to Local/Session store for persistence
    let chatHistory = JSON.parse(sessionStorage.getItem('sparkle_chats') || '[]');
    chatHistory.push({ nick, msg });
    sessionStorage.setItem('sparkle_chats', JSON.stringify(chatHistory));

    msgInput.value = '';
}

// Load Chat on Start
window.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatFeed');
    if (!chatBody) return;
    const history = JSON.parse(sessionStorage.getItem('sparkle_chats') || '[]');
    history.forEach(item => {
        const row = document.createElement('div');
        row.className = 'chat-row';
        row.innerHTML = `
            <div class="chat-avatar"><i class="fas fa-user"></i></div>
            <div class="chat-content">
                <span class="chat-author">${item.nick}</span>
                <p class="chat-text">${item.msg}</p>
            </div>
        `;
        chatBody.appendChild(row);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
});
