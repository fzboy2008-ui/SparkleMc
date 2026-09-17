// --- Rank & Items Perk Database (BlockFun Style) ---
const infoDatabase = {
    vip: {
        name: "VIP Rank (+200 Coins)",
        price: "₹120",
        amount: 120,
        perks: [
            "Create up to 5 Set Homes",
            "Create up to 5 Auction Listings",
            "Priority Queue in Server Join",
            "Keep Inventory in Spawn Realm"
        ],
        commands: [
            "/workbench (Portable crafting)",
            "/feed (Restore hunger with cooldown)",
            "/hat (Wear block as cosmetic)",
            "/near (View nearby players)"
        ],
        other: [
            "[VIP] Chat Prefix & Tab Glow",
            "VIP Kit (/kit vip)",
            "200 Spark Coins"
        ]
    },
    blood: {
        name: "Blood Rank (+500 Coins)",
        price: "₹250",
        amount: 250,
        perks: [
            "Create up to 10 Set Homes",
            "Create up to 10 Auction Listings",
            "Reduced Death Ban Timer",
            "Mine Spawners with Silk Touch",
            "All VIP Perks Included"
        ],
        commands: [
            "/anvil (Portable anvil access)",
            "/smithingtable (Portable smithing)",
            "/repair (Repair held items)",
            "/enderchest (Portable enderchest)"
        ],
        other: [
            "[BLOOD] Dark Red Prefix",
            "Blood Execution Kill Sound",
            "Blood Kit (/kit blood)",
            "500 Spark Coins"
        ]
    },
    reaper: {
        name: "Reaper Rank (+1,000 Coins)",
        price: "₹450",
        amount: 450,
        perks: [
            "Create up to 15 Set Homes",
            "Create up to 15 Auction Listings",
            "50% Lower Death Ban Duration",
            "All Blood Perks Included"
        ],
        commands: [
            "/heal (Instant health restore with CD)",
            "/fly (Access inside Claim Base)",
            "/condense (Auto turn ingots to blocks)"
        ],
        other: [
            "[REAPER] Purple Glow Prefix",
            "Reaper Scythe Kit (/kit reaper)",
            "1,000 Spark Coins"
        ]
    },
    vampire: {
        name: "Vampire Rank (+2,000 Coins)",
        price: "₹750",
        amount: 750,
        perks: [
            "Create up to 25 Set Homes",
            "Create up to 25 Auction Listings",
            "75% Lower Death Ban Duration",
            "All Reaper Perks Included"
        ],
        commands: [
            "/extinguish (Instant extinguish fire)",
            "/craft (Fast portable workbench)",
            "/trash (Open portable disposal)"
        ],
        other: [
            "[VAMPIRE] Crimson Prefix",
            "Permanent Night Vision",
            "Vampire Kit (/kit vampire)",
            "2,000 Spark Coins"
        ]
    },
    sparkplus: {
        name: "Spark+ Rank (Ultimate)",
        price: "₹1,200",
        amount: 1200,
        perks: [
            "Unlimited /sethome",
            "Zero Death Ban Timer (Instant Revive)",
            "Priority Support & In-game Tags",
            "All Ranks Perks Bundled Together"
        ],
        commands: [
            "/fly (Claim flight enabled)",
            "/repair all (Repair entire inventory)",
            "/glow (Cosmetic glowing color picker)"
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
        amount: 299,
        perks: ["Unique Smash Attack Damage", "Knockback AOE shockwave"],
        commands: ["Delivered in-game via delivery mailbox"],
        other: ["Unbreakable Tier Item"]
    },
    elytra: {
        name: "Infinity Elytra",
        price: "₹349",
        amount: 349,
        perks: ["Infinite Durability (Does not break)", "Custom Particle Flight Trail"],
        commands: ["Access via /claimitems"],
        other: ["Cosmetic Flame Flight Effect"]
    },
    sword: {
        name: "Blood Katana",
        price: "₹249",
        amount: 249,
        perks: ["Sharpness VII Enchantment", "10% Lifesteal Chance per Hit"],
        commands: ["Delivered via /mailbox"],
        other: ["Blood Slash visual particles"]
    },
    bow: {
        name: "Vortex Bow",
        price: "₹199",
        amount: 199,
        perks: ["Explosive Arrow Impact", "Flame & Punch Max Tier"],
        commands: ["Access via /claimitems"],
        other: ["Trail particle effect"]
    },
    speed: {
        name: "Infinite Speed II",
        price: "₹149",
        amount: 149,
        perks: ["Permanent Speed II Potion Effect across all survival realms"],
        commands: ["Active immediately upon account sync"],
        other: ["Permanent buff"]
    },
    strength: {
        name: "Permanent Strength",
        price: "₹199",
        amount: 199,
        perks: ["Permanent Strength I Boost during combat"],
        commands: ["Active immediately upon delivery"],
        other: ["PvP ready amplifier"]
    }
};

// --- Category Tabs Switching ---
function switchCategory(cat) {
    const categories = ['ranks', 'items', 'coins', 'abilities', 'kits'];
    categories.forEach(c => {
        const el = document.getElementById(`cat-${c}`);
        if (el) el.style.display = (c === cat) ? (c === 'coins' ? 'flex' : 'grid') : 'none';
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// --- Info Modal System ---
function openInfoModal(key) {
    const data = infoDatabase[key];
    if (!data) return;

    document.getElementById('modalRankTitle').textContent = data.name;
    document.getElementById('modalPriceText').textContent = data.price;

    const pList = document.getElementById('modalPerksList');
    pList.innerHTML = data.perks.map(p => `<li>${p}</li>`).join('');

    const cList = document.getElementById('modalCommandsList');
    cList.innerHTML = data.commands.map(c => `<li>${c}</li>`).join('');

    const oList = document.getElementById('modalOtherList');
    oList.innerHTML = data.other.map(o => `<li>${o}</li>`).join('');

    document.getElementById('modalBuyBtn').onclick = function() {
        closeInfoModal();
        openPaymentModal(data.name, data.amount);
    };

    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// --- UPI Payment Modal ---
function openPaymentModal(name, amount) {
    document.getElementById('payItemName').textContent = name;
    document.getElementById('payItemAmount').textContent = amount;
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// --- Coin Calculator ---
function updateCoins() {
    const inr = parseInt(document.getElementById('coinInput').value) || 0;
    document.getElementById('coinOutput').textContent = (inr * 2) + " Coins";
}

function buyCoins() {
    const inr = parseInt(document.getElementById('coinInput').value) || 10;
    openPaymentModal(`${inr * 2} Spark Coins`, inr);
}

// --- Server IP Copy Function ---
function copyIp(text, toastId) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// Close Modals on Outside Click
window.onclick = function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeInfoModal();
        closePaymentModal();
    }
};
