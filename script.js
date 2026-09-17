// ==================== STORE CATALOG DATABASE ====================
const perksData = {
    // --- RANKS ---
    vip: {
        name: "VIP Rank",
        price: "₹120/MONTHLY",
        cost: 120,
        perks: [
            "🛡️ ARMOUR: Maxed Armour with Protection 5",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Without Enchants"
        ],
        commands: [
            "/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"
        ],
        other: [
            "💰 BONUS: +200 Spark Coins",
            "💫 VIP Prefix & Priority Join Queue"
        ]
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
        commands: [
            "/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"
        ],
        other: [
            "💰 BONUS: +400 Spark Coins",
            "💫 BLOOD Crimson Chat Prefix"
        ]
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
        commands: [
            "/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"
        ],
        other: [
            "💰 BONUS: +700 Spark Coins",
            "💫 REAPER Purple Glow Chat Prefix"
        ]
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
        commands: [
            "/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"
        ],
        other: [
            "💰 BONUS: +1,000 Spark Coins",
            "💫 VAMPIRE Dark Red Chat Prefix"
        ]
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
        commands: [
            "/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"
        ],
        other: [
            "💰 BONUS: +1,500 Spark Coins",
            "💫 SPARK+ Legendary Gold Prefix"
        ]
    },

    // --- UNIQUE ITEMS ---
    item_mace: {
        name: "Unique Mace",
        price: "₹120",
        cost: 120,
        perks: [
            "🔥 Unbreakable",
            "🔥 Mending",
            "🔥 Density VII",
            "🔥 Breach V",
            "🔥 Wind Burst III"
        ],
        commands: ["Delivered via in-game /mailbox"],
        other: ["Season 1 Legendary God Tier Weapon"]
    },
    item_elytra: {
        name: "Unique Elytra",
        price: "₹120",
        cost: 120,
        perks: [
            "✨ Unbreakable",
            "✨ Protection 5",
            "✨ Mending"
        ],
        commands: ["Claim with in-game /claimitems"],
        other: ["Permanent durability wings"]
    },
    item_sword: {
        name: "Unique Sword",
        price: "₹80",
        cost: 80,
        perks: [
            "🔥 Sharpness VII",
            "🔥 Unbreaking III",
            "🔥 Mending",
            "🔥 Fire Aspect II",
            "🔥 Looting III",
            "🔥 Sweeping Edge III"
        ],
        commands: ["Delivered directly into your inventory"],
        other: ["Maxed Sharpness VII weapon"]
    },
    item_spear: {
        name: "Unique Spear",
        price: "₹80",
        cost: 80,
        perks: [
            "🔥 Lunge V",
            "🔥 Unbreaking III",
            "🔥 Mending",
            "🔥 Sharpness VII",
            "🔥 Fire Aspect II"
        ],
        commands: ["Delivered directly into your inventory"],
        other: ["God-tier reach weapon"]
    },
    item_bow: {
        name: "Unique Bow",
        price: "₹50",
        cost: 50,
        perks: [
            "🔥 Power VII",
            "🔥 Unbreaking III",
            "🔥 Mending",
            "🔥 Flame",
            "🔥 Punch II",
            "🔥 Infinity"
        ],
        commands: ["Delivered directly into your inventory"],
        other: ["Infinite ammunition enabled"]
    },
    item_shield: {
        name: "Unique Shield",
        price: "₹50",
        cost: 50,
        perks: [
            "🔥 Unbreakable",
            "🔥 Mending"
        ],
        commands: ["Delivered directly into your inventory"],
        other: ["Unbreakable defense gear"]
    },

    // --- SPECIAL ABILITIES ---
    ability_1: {
        name: "Infinite Effect Lvl I",
        price: "₹40",
        cost: 40,
        perks: ["Permanent Tier I potion buff applied across all survival realms"],
        commands: ["Activated automatically upon verification"],
        other: ["Permanent buff"]
    },
    ability_2: {
        name: "Infinite Effect Lvl II",
        price: "₹80",
        cost: 80,
        perks: ["Permanent Tier II potion buff applied across all survival realms"],
        commands: ["Activated automatically upon verification"],
        other: ["Permanent buff"]
    },
    ability_3: {
        name: "Infinite Effect Lvl III",
        price: "₹120",
        cost: 120,
        perks: ["Permanent Tier III potion buff applied across all survival realms"],
        commands: ["Activated automatically upon verification"],
        other: ["Permanent buff"]
    }
};

let currentCheckout = { name: "VIP Rank", cost: 120 };

// ==================== STORE CATEGORY SWITCHER ====================
function switchTab(catId) {
    const tabs = ['ranks', 'items', 'abilities', 'coins', 'crates'];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (el) {
            el.style.display = (t === catId) ? (t === 'coins' ? 'flex' : 'grid') : 'none';
        }
    });

    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// ==================== INFO POPUP MODAL ====================
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

    const popup = document.getElementById('infoPopup');
    if (popup) popup.style.display = 'flex';
}

function closeInfo() {
    const el = document.getElementById('infoPopup');
    if (el) el.style.display = 'none';
}

// ==================== ORDER & PAYMENT POPUP ====================
function startOrder(name, amount) {
    currentCheckout = { name, cost: amount };

    const nameEl = document.getElementById('orderItemName');
    const amountEl = document.getElementById('orderItemAmount');
    if (nameEl) nameEl.textContent = name;
    if (amountEl) amountEl.textContent = amount;

    const formStep = document.getElementById('payFormStep');
    const statusStep = document.getElementById('payStatusStep');
    if (formStep) formStep.style.display = 'block';
    if (statusStep) statusStep.style.display = 'none';

    const ignIn = document.getElementById('ignInput');
    const utrIn = document.getElementById('utrInput');
    if (ignIn) ignIn.value = '';
    if (utrIn) utrIn.value = '';

    const payPopup = document.getElementById('paymentPopup');
    if (payPopup) payPopup.style.display = 'flex';
}

function closePayment() {
    const el = document.getElementById('paymentPopup');
    if (el) el.style.display = 'none';
}

// ==================== TICKET EMAIL DISPATCH SYSTEM ====================
function submitEmailTicket(e) {
    e.preventDefault();
    const ign = document.getElementById('ignInput').value.trim();
    const utr = document.getElementById('utrInput').value.trim();
    const btn = document.getElementById('submitOrderBtn');

    if (!ign || !utr) return;

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting Ticket...`;
    }

    // Direct Ticket Dispatch to Owner Email
    fetch("https://formspree.io/f/xvgzgkgk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            Owner_Target: "fzboy2008@gmail.com",
            Player_IGN: ign,
            Package_Purchased: currentCheckout.name,
            Amount_INR: "₹" + currentCheckout.cost,
            UTR_Ref_Code: utr,
            Admin_Action_Instruction: `Login to SparkleMc Console and run: lp user ${ign} parent add ${currentCheckout.name.toLowerCase()}`
        })
    }).finally(() => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-check-circle"></i> Send Order Ticket To Owner`;
        }

        const sumIgn = document.getElementById('summaryIGN');
        const sumItem = document.getElementById('summaryItem');
        const sumUtr = document.getElementById('summaryUTR');
        if (sumIgn) sumIgn.textContent = ign;
        if (sumItem) sumItem.textContent = currentCheckout.name;
        if (sumUtr) sumUtr.textContent = utr;

        const formStep = document.getElementById('payFormStep');
        const statusStep = document.getElementById('payStatusStep');
        if (formStep) formStep.style.display = 'none';
        if (statusStep) statusStep.style.display = 'block';
    });
}

// ==================== COIN CALCULATOR ====================
function calcCoins() {
    const input = document.getElementById('coinAmountInput');
    const out = document.getElementById('coinTotal');
    if (!input || !out) return;
    const val = parseInt(input.value) || 0;
    out.textContent = (val * 2) + " Coins";
}

function orderCoins() {
    const input = document.getElementById('coinAmountInput');
    const val = input ? (parseInt(input.value) || 20) : 20;
    startOrder(`${val * 2} Spark Coins`, val);
}

// ==================== SERVER IP CLIPBOARD COPY ====================
function copyIpAddress(address, toastId) {
    navigator.clipboard.writeText(address).then(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// ==================== MAIN PAGE REAL-TIME COMMUNITY CHAT ====================
function postChatMessage(e) {
    e.preventDefault();
    const nickInput = document.getElementById('chatNick');
    const msgInput = document.getElementById('chatMessage');
    const nick = nickInput ? (nickInput.value.trim() || 'Player') : 'Player';
    const msg = msgInput ? msgInput.value.trim() : '';

    if (!msg) return;

    renderChatMessage(nick, msg);

    // Save chat in local storage for session view
    let stored = JSON.parse(localStorage.getItem('sparkle_public_chat') || '[]');
    stored.push({ nick, msg });
    if (stored.length > 50) stored.shift(); // Keep last 50 messages
    localStorage.setItem('sparkle_public_chat', JSON.stringify(stored));

    if (msgInput) msgInput.value = '';
}

function renderChatMessage(author, message) {
    const feed = document.getElementById('chatFeed');
    if (!feed) return;

    const row = document.createElement('div');
    row.className = 'chat-row';
    row.innerHTML = `
        <div class="chat-avatar"><i class="fas fa-user"></i></div>
        <div class="chat-content">
            <span class="chat-author">${author}</span>
            <p class="chat-text">${message}</p>
        </div>
    `;
    feed.appendChild(row);
    feed.scrollTop = feed.scrollHeight;
}

// Sync messages across all open tabs/windows
window.addEventListener('storage', (e) => {
    if (e.key === 'sparkle_public_chat') {
        const feed = document.getElementById('chatFeed');
        if (!feed) return;
        feed.innerHTML = `
            <div class="chat-row bot-row">
                <div class="chat-avatar bot-av"><i class="fas fa-robot"></i></div>
                <div class="chat-content">
                    <span class="chat-author bot-author">SparkleBot</span>
                    <p class="chat-text">Welcome to SparkleMc global lobby chat! Send a message to chat with players online.</p>
                </div>
            </div>
        `;
        const updated = JSON.parse(e.newValue || '[]');
        updated.forEach(item => renderChatMessage(item.nick, item.msg));
    }
});

// Load Chat on Window Load
window.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('chatFeed');
    if (!feed) return;
    const existing = JSON.parse(localStorage.getItem('sparkle_public_chat') || '[]');
    existing.forEach(item => renderChatMessage(item.nick, item.msg));
});

// Close Modals on Outside Click
window.onclick = function(e) {
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
        closeInfo();
        closePayment();
    }
};
