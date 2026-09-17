// --- Perk Database (BlockFun Style info icons) ---
const perksData = {
    vip: {
        name: "VIP Rank (+200 Coins)",
        price: "₹120",
        cost: 120,
        perks: [
            "Create up to 5 Set Homes",
            "Create up to 5 Auction Listings",
            "Priority Server Join Queue",
            "Keep Inventory in Spawn Realm"
        ],
        commands: [
            "/workbench (Portable crafting)",
            "/feed (Restore hunger with cooldown)",
            "/hat (Wear block as hat)",
            "/near (Detect nearby players)"
        ],
        other: [
            "[VIP] Chat Prefix & Tab Glow",
            "Monthly VIP Kit (/kit vip)",
            "200 Bonus Coins"
        ]
    },
    blood: {
        name: "Blood Rank (+500 Coins)",
        price: "₹250",
        cost: 250,
        perks: [
            "Create up to 10 Set Homes",
            "Create up to 10 Auction Listings",
            "Reduced Death Ban Timer",
            "Mine Spawners with Silk Touch",
            "Includes all VIP Rank Perks"
        ],
        commands: [
            "/anvil (Portable anvil)",
            "/smithingtable (Portable smithing)",
            "/repair (Repair held tool)",
            "/enderchest (Portable enderchest)"
        ],
        other: [
            "[BLOOD] Dark Red Prefix",
            "Custom Execution Kill Sound",
            "Blood Kit (/kit blood)",
            "500 Bonus Coins"
        ]
    },
    reaper: {
        name: "Reaper Rank (+1,000 Coins)",
        price: "₹450",
        cost: 450,
        perks: [
            "Create up to 15 Set Homes",
            "Create up to 15 Auction Listings",
            "50% Lower Death Ban Duration",
            "Includes all Blood Rank Perks"
        ],
        commands: [
            "/heal (Instant health restore with CD)",
            "/fly (Claim Flight Enabled)",
            "/condense (Auto turn ingots to blocks)"
        ],
        other: [
            "[REAPER] Purple Glow Prefix",
            "Reaper Scythe Kit (/kit reaper)",
            "1,000 Bonus Coins"
        ]
    },
    vampire: {
        name: "Vampire Rank (+2,000 Coins)",
        price: "₹750",
        cost: 750,
        perks: [
            "Create up to 25 Set Homes",
            "Create up to 25 Auction Listings",
            "75% Lower Death Ban Duration",
            "Includes all Reaper Perks"
        ],
        commands: [
            "/extinguish (Instant extinguish fire)",
            "/craft (Fast portable workbench)",
            "/trash (Open portable trash disposal)"
        ],
        other: [
            "[VAMPIRE] Crimson Prefix",
            "Permanent Night Vision Effect",
            "Vampire Kit (/kit vampire)",
            "2,000 Bonus Coins"
        ]
    },
    sparkplus: {
        name: "Spark+ Rank (Ultimate)",
        price: "₹1,200",
        cost: 1200,
        perks: [
            "Unlimited /sethome",
            "Zero Death Ban Timer (Instant Revive)",
            "Priority VIP Support Access",
            "Includes Perks of ALL Ranks Combined"
        ],
        commands: [
            "/fly (Enabled everywhere in claimed regions)",
            "/repair all (Repair entire inventory)",
            "/glow (Cosmetic glowing colors)"
        ],
        other: [
            "[SPARK+] Legendary Gold Prefix",
            "Full Spark+ Netherite Set",
            "5,000 Spark Coins"
        ]
    },
    mace: {
        name: "Custom Mace",
        price: "₹299",
        cost: 299,
        perks: ["Smash Attack AOE shockwave", "Unbreakable tier"],
        commands: ["Delivered to in-game /mailbox"],
        other: ["Season 1 Exclusive Weapon"]
    },
    elytra: {
        name: "Infinity Elytra",
        price: "₹349",
        cost: 349,
        perks: ["Infinite Durability (Never breaks)", "Custom Particle Trail"],
        commands: ["Claim with /claimitems"],
        other: ["Flame Wings visual"]
    },
    katana: {
        name: "Blood Katana",
        price: "₹249",
        cost: 249,
        perks: ["Sharpness VII Enchantment", "10% Lifesteal per hit"],
        commands: ["Delivered to /mailbox"],
        other: ["Blood Slash visuals"]
    },
    speed: {
        name: "Speed II Permanent",
        price: "₹149",
        cost: 149,
        perks: ["Permanent Speed II Buff on your character across all realms"],
        commands: ["Applied immediately upon order approval"],
        other: ["Permanent buff"]
    }
};

let currentCheckout = { name: "VIP Rank", cost: 120 };

// --- Store Category Switcher ---
function switchTab(catId) {
    const tabs = ['ranks', 'items', 'coins', 'abilities', 'crates'];
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

    // Reset Steps
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

    // Update Summary Screen
    document.getElementById('summaryIGN').textContent = ign;
    document.getElementById('summaryItem').textContent = currentCheckout.name;
    document.getElementById('summaryUTR').textContent = utr;

    // Switch to Pending Approval Step
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

// --- Floating Live Support Chat ---
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

    // Add user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = msg;
    msgsContainer.appendChild(userBubble);
    input.value = '';

    // Auto bot response
    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = `Your query has been recorded. For direct instant approval or rank activation, kindly create a ticket on our <a href="https://discord.gg/62xxMq2NKv" target="_blank" style="color:#ff2a4b; text-decoration:underline;">Discord Server</a>!`;
        msgsContainer.appendChild(botBubble);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }, 700);

    msgsContainer.scrollTop = msgsContainer.scrollHeight;
}

// Close popup when clicking backdrop
window.onclick = function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeInfo();
        closePayment();
    }
};
