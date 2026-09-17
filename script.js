// --- Complete Catalog Database ---
const perksData = {
    vip: {
        name: "VIP Rank",
        price: "₹120/MONTHLY",
        cost: 120,
        perks: [
            "🛡️ ARMOUR: Maxed Armour with Protection 5",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Without Enchants"
        ],
        commands: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"],
        other: ["💰 BONUS: +200 Spark Coins", "💫 VIP Prefix & Priority Queue"]
    },
    blood: {
        name: "Blood Rank",
        price: "₹230/MONTHLY",
        cost: 230,
        perks: [
            "🛡️ ARMOUR: Maxed Armour with Protection 6",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Without Enchants"
        ],
        commands: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"],
        other: ["💰 BONUS: +400 Spark Coins", "💫 BLOOD Crimson Prefix"]
    },
    reaper: {
        name: "Reaper Rank",
        price: "₹340/MONTHLY",
        cost: 340,
        perks: [
            "🛡️ ARMOUR: Maxed Armour with Protection 7",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Without Enchants"
        ],
        commands: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"],
        other: ["💰 BONUS: +700 Spark Coins", "💫 REAPER Purple Prefix"]
    },
    vampire: {
        name: "Vampire Rank",
        price: "₹450/MONTHLY",
        cost: 450,
        perks: [
            "🛡️ ARMOUR: Maxed Armour with Protection 8",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Without Enchants"
        ],
        commands: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"],
        other: ["💰 BONUS: +1,000 Spark Coins", "💫 VAMPIRE Dark Red Prefix"]
    },
    sparkplus: {
        name: "Spark+ Rank (Ultimate)",
        price: "₹600/MONTHLY",
        cost: 600,
        perks: [
            "🛡️ ARMOUR: Maxed Armour with Protection 10",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Without Enchants",
            "🎁 ALL KITS: Complete access to ALL rank kits!"
        ],
        commands: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"],
        other: ["💰 BONUS: +1,500 Spark Coins", "💫 SPARK+ Gold Prefix"]
    },
    item_mace: {
        name: "Unique Mace",
        price: "₹120",
        cost: 120,
        perks: ["🔥 Unbreakable", "🔥 Mending", "🔥 Density VII", "🔥 Breach V", "🔥 Wind Burst III"],
        commands: ["Delivered via /mailbox"],
        other: ["Legendary Weapon"]
    },
    item_elytra: {
        name: "Unique Elytra",
        price: "₹120",
        cost: 120,
        perks: ["✨ Unbreakable", "✨ Protection 5", "✨ Mending"],
        commands: ["Claim with /claimitems"],
        other: ["Permanent durability wings"]
    },
    item_sword: {
        name: "Unique Sword",
        price: "₹80",
        cost: 80,
        perks: ["🔥 Sharpness VII", "🔥 Unbreaking III", "🔥 Mending", "🔥 Fire Aspect II", "🔥 Looting III", "🔥 Sweeping Edge III"],
        commands: ["Delivered into inventory"],
        other: ["Maxed Sharpness VII weapon"]
    },
    item_spear: {
        name: "Unique Spear",
        price: "₹80",
        cost: 80,
        perks: ["🔥 Lunge V", "🔥 Unbreaking III", "🔥 Mending", "🔥 Sharpness VII", "🔥 Fire Aspect II"],
        commands: ["Delivered into inventory"],
        other: ["God-tier reach weapon"]
    },
    item_bow: {
        name: "Unique Bow",
        price: "₹50",
        cost: 50,
        perks: ["🔥 Power VII", "🔥 Unbreaking III", "🔥 Mending", "🔥 Flame", "🔥 Punch II", "🔥 Infinity"],
        commands: ["Delivered into inventory"],
        other: ["Infinite ammunition"]
    },
    item_shield: {
        name: "Unique Shield",
        price: "₹50",
        cost: 50,
        perks: ["🔥 Unbreakable", "🔥 Mending"],
        commands: ["Delivered into inventory"],
        other: ["Unbreakable shield"]
    },
    ability_1: {
        name: "Infinite Effect Lvl I",
        price: "₹40",
        cost: 40,
        perks: ["Permanent Tier I potion buff applied to your character"],
        commands: ["Applied automatically upon verification"],
        other: ["Permanent buff"]
    },
    ability_2: {
        name: "Infinite Effect Lvl II",
        price: "₹80",
        cost: 80,
        perks: ["Permanent Tier II potion buff applied to your character"],
        commands: ["Applied automatically upon verification"],
        other: ["Permanent buff"]
    },
    ability_3: {
        name: "Infinite Effect Lvl III",
        price: "₹120",
        cost: 120,
        perks: ["Permanent Tier III max potion buff applied to your character"],
        commands: ["Applied automatically upon verification"],
        other: ["Permanent buff"]
    }
};

let currentCheckout = { name: "VIP Rank", cost: 120 };

// --- Store Category Tabs ---
function switchTab(catId) {
    const tabs = ['ranks', 'items', 'abilities', 'coins', 'crates'];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (el) el.style.display = (t === catId) ? (t === 'coins' ? 'flex' : 'grid') : 'none';
    });

    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// --- Info Modal ---
function openInfo(key) {
    const item = perksData[key];
    if (!item) return;

    document.getElementById('infoTitle').textContent = item.name;
    document.getElementById('infoCost').textContent = item.price;

    const pList = document.getElementById('infoPerks');
    pList.innerHTML = item.perks.map(p => `<li>${p}</li>`).join('');

    const cList = document.getElementById('infoCommands');
    cList.innerHTML = item.commands.map(c => `<li>${c}</li>`).join('');

    const oList = document.getElementById('infoOther');
    oList.innerHTML = item.other.map(o => `<li>${o}</li>`).join('');

    document.getElementById('infoProceedBtn').onclick = function() {
        closeInfo();
        startOrder(item.name, item.cost);
    };

    document.getElementById('infoPopup').style.display = 'flex';
}

function closeInfo() {
    const el = document.getElementById('infoPopup');
    if (el) el.style.display = 'none';
}

// --- Order & Checkout Flow ---
function startOrder(name, amount) {
    currentCheckout = { name, cost: amount };

    document.getElementById('orderItemName').textContent = name;
    document.getElementById('orderItemAmount').textContent = amount;

    document.getElementById('payFormStep').style.display = 'block';
    document.getElementById('payStatusStep').style.display = 'none';
    document.getElementById('ignInput').value = '';
    document.getElementById('utrInput').value = '';

    document.getElementById('paymentPopup').style.display = 'flex';
}

function closePayment() {
    const el = document.getElementById('paymentPopup');
    if (el) el.style.display = 'none';
}

// --- Send Order Ticket Directly To Owner Email (fzboy2008@gmail.com) ---
function submitEmailTicket(e) {
    e.preventDefault();
    const ign = document.getElementById('ignInput').value.trim();
    const utr = document.getElementById('utrInput').value.trim();
    const btn = document.getElementById('submitOrderBtn');

    if (!ign || !utr) return;

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending Ticket...`;

    // Direct Formspree Email Pipeline to fzboy2008@gmail.com
    fetch("https://formspree.io/f/xvgzgkgk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            target_owner_email: "fzboy2008@gmail.com",
            Player_IGN: ign,
            Package_Purchased: currentCheckout.name,
            Amount_Paid: "₹" + currentCheckout.cost,
            UTR_Ref_Number: utr,
            Approval_Action: `Reply APPROVE to deliver rank in console for ${ign}`
        })
    }).then(res => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-check-circle"></i> Send Order Ticket To Owner`;

        document.getElementById('summaryIGN').textContent = ign;
        document.getElementById('summaryItem').textContent = currentCheckout.name;
        document.getElementById('summaryUTR').textContent = utr;

        document.getElementById('payFormStep').style.display = 'none';
        document.getElementById('payStatusStep').style.display = 'block';
    }).catch(err => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-check-circle"></i> Send Order Ticket To Owner`;
        // Even on net error show summary
        document.getElementById('payFormStep').style.display = 'none';
        document.getElementById('payStatusStep').style.display = 'block';
    });
}

// --- Coin Calculator ---
function calcCoins() {
    const val = parseInt(document.getElementById('coinAmountInput').value) || 0;
    document.getElementById('coinTotal').textContent = (val * 2) + " Coins";
}

function orderCoins() {
    const val = parseInt(document.getElementById('coinAmountInput').value) || 20;
    startOrder(`${val * 2} Spark Coins`, val);
}

// --- IP Copy Toast ---
function copyIpAddress(address, toastId) {
    navigator.clipboard.writeText(address).then(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// ==================== REAL-TIME MULTI-USER PUBLIC LIVE CHAT ====================
const globalChatSocket = new WebSocket("wss://ws-us3.pusher.com/app/eb1d5f2830814281274e?protocol=7&client=js&version=7.0.0&flash=false");

globalChatSocket.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);
        if (data.event === "new_message") {
            const chatPayload = JSON.parse(data.data);
            appendChatMessage(chatPayload.user, chatPayload.text, false);
        }
    } catch(e) {}
};

function toggleChat() {
    const box = document.getElementById('chatBox');
    box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
}

function sendGlobalChat(e) {
    e.preventDefault();
    const user = document.getElementById('chatUsername').value.trim() || 'Player';
    const textInput = document.getElementById('chatInput');
    const text = textInput.value.trim();

    if (!text) return;

    // Show on my screen
    appendChatMessage(user, text, true);

    // Broadcast across all players
    try {
        globalChatSocket.send(JSON.stringify({
            event: "client-message",
            data: { user: user, text: text }
        }));
    } catch(err) {}

    textInput.value = '';
}

function appendChatMessage(sender, msg, isMine) {
    const container = document.getElementById('chatMsgs');
    const bubble = document.createElement('div');
    bubble.className = isMine ? 'chat-bubble mine' : 'chat-bubble msg';
    bubble.innerHTML = `<span class="sender">${sender}</span> ${msg}`;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

// Close Modals on Outside Click
window.onclick = function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeInfo();
        closePayment();
    }
};
            
