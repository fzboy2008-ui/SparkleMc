// --- Exact Store Catalog Database ---
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
            "💫 VIP Chat Tag & Priority Queue"
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
            "💫 BLOOD Dark Red Chat Prefix"
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
            "💫 VAMPIRE Crimson Prefix"
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
        commands: ["Delivered via in-game delivery (/mailbox)"],
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
        perks: ["Permanent Tier I potion buff applied to your character across all realms"],
        commands: ["Activated directly on player sync"],
        other: ["Permanent buff"]
    },
    ability_2: {
        name: "Infinite Effect Lvl II",
        price: "₹80",
        cost: 80,
        perks: ["Permanent Tier II potion buff applied to your character across all realms"],
        commands: ["Activated directly on player sync"],
        other: ["Permanent buff"]
    },
    ability_3: {
        name: "Infinite Effect Lvl III",
        price: "₹120",
        cost: 120,
        perks: ["Permanent Tier III max potion buff applied to your character across all realms"],
        commands: ["Activated directly on player sync"],
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

// --- BlockFun Info Modal ---
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
    document.getElementById('infoPopup').style.display = 'none';
}

// --- Checkout & Payment Order ---
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
    document.getElementById('paymentPopup').style.display = 'none';
}

function submitOrder(e) {
    e.preventDefault();
    const ign = document.getElementById('ignInput').value.trim();
    const utr = document.getElementById('utrInput').value.trim();

    if (!ign || !utr) return;

    document.getElementById('summaryIGN').textContent = ign;
    document.getElementById('summaryItem').textContent = currentCheckout.name;
    document.getElementById('summaryUTR').textContent = utr;

    document.getElementById('payFormStep').style.display = 'none';
    document.getElementById('payStatusStep').style.display = 'block';
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

// --- IP Copy Function ---
function copyIpAddress(address, toastId) {
    navigator.clipboard.writeText(address).then(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// --- Live Support Chat ---
function toggleChat() {
    const box = document.getElementById('chatBox');
    box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
}

function sendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;

    const msgsContainer = document.getElementById('chatMsgs');

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = msg;
    msgsContainer.appendChild(userBubble);
    input.value = '';

    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = `Your query has been recorded. For direct instant approval or rank activation, kindly create a ticket on our <a href="https://discord.gg/62xxMq2NKv" target="_blank" style="color:#ff2a4b; text-decoration:underline;">Discord Server</a>!`;
        msgsContainer.appendChild(botBubble);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }, 700);

    msgsContainer.scrollTop = msgsContainer.scrollHeight;
}

// Close Modals on Outside Click
window.onclick = function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeInfo();
        closePayment();
    }
};
