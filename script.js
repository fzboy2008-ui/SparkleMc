// Switch Store Tabs
function switchTab(tabName) {
    // Hide all tabs
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Deactivate all tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show target tab
    const targetContent = document.getElementById('tab-' + tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }

    // Activate button
    event.currentTarget.classList.add('active');
}

// Coins Calculator (₹1 = 2 Coins)
function calculateCoins() {
    const inrInput = document.getElementById('coinInrInput');
    const totalSpan = document.getElementById('coinTotalAmount');
    let amount = parseInt(inrInput.value) || 0;
    if (amount < 0) amount = 0;
    totalSpan.innerText = amount * 2;
}

function buyCoins() {
    const inrInput = document.getElementById('coinInrInput');
    const amount = parseInt(inrInput.value) || 0;
    if (amount < 10) {
        alert('Minimum coin purchase amount is ₹10 (20 Coins)!');
        return;
    }
    const totalCoins = amount * 2;
    openPayment(`${totalCoins} Coins Package`, amount);
}

// Copy Java IP
function copyIP(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        const badge = document.getElementById('copy-badge-java');
        badge.innerText = 'Copied!';
        badge.style.background = '#22c55e';
        setTimeout(() => {
            badge.innerText = 'Copy';
            badge.style.background = 'rgba(0, 0, 0, 0.35)';
        }, 2000);
    });
}

// Copy Bedrock IP & Port
function copyBedrock(ip, port) {
    navigator.clipboard.writeText(`${ip}:${port}`).then(() => {
        const badge = document.getElementById('copy-badge-bedrock');
        badge.innerText = 'Copied!';
        badge.style.background = '#22c55e';
        setTimeout(() => {
            badge.innerText = 'Copy';
            badge.style.background = 'rgba(0, 0, 0, 0.35)';
        }, 2000);
    });
}

// Copy UPI ID
function copyUPI() {
    navigator.clipboard.writeText('6006283334@ptyes').then(() => {
        alert('UPI ID (6006283334@ptyes) copied to clipboard!');
    });
}

// Global variable to store active purchase
let currentItemName = '';

// Open Payment Modal
function openPayment(itemName, itemPrice) {
    currentItemName = itemName;
    document.getElementById('modal-rank-name').innerText = itemName;
    document.getElementById('modal-rank-price').innerText = '₹' + itemPrice;
    
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'flex';
}

// Close Modal
function closePayment() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

// Proceed from Modal to Ticket Form (auto-select category & prefill message)
function proceedToTicket() {
    closePayment();
    const msgArea = document.getElementById('ticketMessageArea');
    const categorySelect = document.getElementById('ticketCategorySelect');
    
    if (currentItemName.includes('Rank')) {
        categorySelect.value = 'Rank Purchase Verification';
    } else if (currentItemName.includes('Coins')) {
        categorySelect.value = 'Coins Purchase';
    } else if (currentItemName.includes('Infinite')) {
        categorySelect.value = 'Special Ability Purchase';
    } else {
        categorySelect.value = 'Unique Item Purchase';
    }

    msgArea.value = `I have completed the payment for: ${currentItemName}. Please verify my UTR and grant it in-game!`;
    document.getElementById('ticket').scrollIntoView({ behavior: 'smooth' });
}

// Close modal on background click
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
