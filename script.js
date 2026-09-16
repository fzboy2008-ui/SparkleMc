// Copy Minecraft Server IP
function copyIP(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        const badge = document.getElementById('copy-badge');
        const originalText = badge.innerText;
        badge.innerText = 'Copied!';
        badge.style.background = '#22c55e';
        badge.style.color = '#fff';

        setTimeout(() => {
            badge.innerText = originalText;
            badge.style.background = 'rgba(0, 0, 0, 0.3)';
        }, 2500);
    }).catch(err => {
        alert('Server IP: ' + ip);
    });
}

// Copy UPI ID
function copyUPI() {
    navigator.clipboard.writeText('6006283334@ptyes').then(() => {
        alert('UPI ID (6006283334@ptyes) copied to clipboard!');
    });
}

// Open Payment Modal
function openPayment(rankName, rankPrice) {
    document.getElementById('modal-rank-name').innerText = rankName;
    document.getElementById('modal-rank-price').innerText = '₹' + rankPrice;
    
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'flex';
}

// Close Payment Modal
function closePayment() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

// Close when clicking outside of modal
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
