// --- Database Specifications & Enchants ---
const storeCatalog = {
    // RANKS
    sparkplus: {
        title: "Spark+ Rank",
        price: "₹600",
        cost: 600,
        specs: [
            "🛡️ ARMOUR: Maxed Armour with Protection 10",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Base Attack Ready",
            "🎁 COMPLETE ACCESS: Access to ALL server rank kits!"
        ],
        cmds: ["/feed", "/echest", "/repair all", "/anvil", "/hat", "/craft", "/back", "/heal", "/fly"]
    },
    dragon: {
        title: "Dragon Rank",
        price: "₹450",
        cost: 450,
        specs: [
            "🛡️️ ARMOUR: Maxed Armour with Protection 8",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Base Attack Ready",
            "🐉 Dragon Breath Particle Trail"
        ],
        cmds: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"]
    },
    eclipse: {
        title: "Eclipse Rank",
        price: "₹340",
        cost: 340,
        specs: [
            "🛡️ ARMOUR: Maxed Armour with Protection 7",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Base Attack Ready"
        ],
        cmds: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"]
    },
    blood: {
        title: "Blood Rank",
        price: "₹230",
        cost: 230,
        specs: [
            "🛡️ ARMOUR: Maxed Armour with Protection 6",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Base Attack Ready"
        ],
        cmds: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back", "/heal"]
    },
    elite: {
        title: "Elite Rank",
        price: "₹120",
        cost: 120,
        specs: [
            "🛡️ ARMOUR: Maxed Armour with Protection 5",
            "⚔️ SWORD: Sharpness 5",
            "🪄 MACE: Base Attack Ready"
        ],
        cmds: ["/feed", "/echest", "/repair", "/anvil", "/hat", "/craft", "/back"]
    },

    // UNIQUE ITEMS
    item_mace: {
        title: "Unique Mace",
        price: "₹150",
        cost: 150,
        specs: ["🔥 Unbreakable", "🔥 Mending", "🔥 Density VII", "🔥 Breach V", "🔥 Wind Burst III"],
        cmds: ["Delivered into player inventory via mailbox"]
    },
    item_elytra: {
        title: "Unique Elytra",
        price: "₹150",
        cost: 150,
        specs: ["✨ Unbreakable", "✨ Protection 5", "✨ Mending"],
        cmds: ["Access via /claimitems"]
    },
    item_sword: {
        title: "Unique Sword",
        price: "₹100",
        cost: 100,
        specs: ["🔥 Sharpness VII", "🔥 Unbreaking III", "🔥 Mending", "🔥 Fire Aspect II", "🔥 Looting III", "🔥 Sweeping Edge III"],
        cmds: ["Delivered into player inventory"]
    },
    item_spear: {
        title: "Unique Spear",
        price: "₹100",
        cost: 100,
        specs: ["🔥 Lunge V", "🔥 Unbreaking III", "🔥 Mending", "🔥 Sharpness VII", "🔥 Fire Aspect II"],
        cmds: ["Delivered into player inventory"]
    },
    item_bow: {
        title: "Unique Bow",
        price: "₹80",
        cost: 80,
        specs: ["🔥 Power VII", "🔥 Unbreaking III", "🔥 Mending", "🔥 Flame", "🔥 Punch II", "🔥 Infinity"],
        cmds: ["Delivered into player inventory"]
    },

    // SPECIAL EFFECTS
    eff_1: {
        title: "Special Effect Lvl I",
        price: "₹50",
        cost: 50,
        specs: ["⚡ Permanent Infinite Buff (Level 1)", "Choice: Regeneration, Fire Resistance, Strength, Speed, or Invisibility"],
        cmds: ["Applied permanently across all survival realms"]
    },
    eff_2: {
        title: "Special Effect Lvl II",
        price: "₹100",
        cost: 100,
        specs: ["⚡ Permanent Infinite Buff (Level 2)", "Choice: Regeneration, Fire Resistance, Strength, Speed, or Invisibility"],
        cmds: ["Applied permanently across all survival realms"]
    },
    eff_3: {
        title: "Special Effect Lvl III",
        price: "₹150",
        cost: 150,
        specs: ["⚡ Permanent Infinite Buff (Level 3 - Max)", "Choice: Regeneration, Fire Resistance, Strength, Speed, or Invisibility"],
        cmds: ["Applied permanently across all survival realms"]
    }
};

let currentOrder = { name: "Spark+ Rank", amount: 600, isEffect: false };

// --- Category Tab Switching ---
function switchCategory(cat) {
    ['ranks', 'items', 'effects', 'coins'].forEach(c => {
        const el = document.getElementById(`cat-${c}`);
        if (el) el.style.display = (c === cat) ? (c === 'coins' ? 'flex' : 'grid') : 'none';
    });

    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// --- Info Details Modal Fix ---
function openDetails(key) {
    const item = storeCatalog[key];
    if (!item) {
        console.error("Item key not found in catalog:", key);
        return;
    }

    const titleEl = document.getElementById('modalItemTitle');
    const priceEl = document.getElementById('modalItemPrice');
    const sList = document.getElementById('modalSpecList');
    const cList = document.getElementById('modalCmdList');
    const orderBtn = document.getElementById('modalOrderNowBtn');
    const modal = document.getElementById('infoModal');

    if (titleEl) titleEl.textContent = item.title;
    if (priceEl) priceEl.textContent = item.price;

    if (sList && item.specs) {
        sList.innerHTML = item.specs.map(s => `<li>${s}</li>`).join('');
    }
    if (cList && item.cmds) {
        cList.innerHTML = item.cmds.map(c => `<li>${c}</li>`).join('');
    }

    if (orderBtn) {
        orderBtn.onclick = function() {
            closeDetails();
            openGateway(item.title, item.cost);
        };
    }

    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
    }
}

function closeDetails() {
    const el = document.getElementById('infoModal');
    if (el) el.style.setProperty('display', 'none', 'important');
}

// --- Paytm Gateway & Invoice Flow Fix ---
function openGateway(name, cost) {
    const isEffect = name.includes("Special Effect");
    currentOrder = { name, amount: cost, isEffect };

    const nameEl = document.getElementById('gwItemName');
    const amountEl = document.getElementById('gwAmount');
    const effectGroup = document.getElementById('effectSelectionGroup');
    const modal = document.getElementById('gatewayModal');

    if (nameEl) nameEl.textContent = name;
    if (amountEl) amountEl.textContent = cost;
    if (effectGroup) effectGroup.style.display = isEffect ? 'block' : 'none';

    // Paytm Direct App Trigger Intent URL
    const upiPaytmIntent = `paytmmp://pay?pa=6006283334@ptyes&pn=SparkleMc&am=${cost}&cu=INR&tn=${encodeURIComponent('SparkleMc_' + name)}`;
    const paytmDirectBtn = document.getElementById('paytmDirectBtn');
    if (paytmDirectBtn) paytmDirectBtn.href = upiPaytmIntent;

    const formStep = document.getElementById('gatewayFormStep');
    const successStep = document.getElementById('gatewaySuccessStep');
    if (formStep) formStep.style.display = 'block';
    if (successStep) successStep.style.display = 'none';

    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
    }
}

function closeGateway() {
    const el = document.getElementById('gatewayModal');
    if (el) el.style.setProperty('display', 'none', 'important');
}

// --- Ticket Submission to Discord Webhook & Owner Email ---
function processOrderTicket(e) {
    e.preventDefault();
    const email = document.getElementById('gwEmailInput').value.trim();
    const ign = document.getElementById('gwIgnInput').value.trim();
    const utr = document.getElementById('gwUtrInput').value.trim();
    const effect = currentOrder.isEffect ? document.getElementById('gwEffectType').value : 'N/A';
    const invoiceId = 'SPK-' + Math.floor(100000 + Math.random() * 900000);

    const btn = document.getElementById('btnSubmitTicket');
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing Ticket...`;

    // 1. DISCORD EMBED PAYLOAD WITH INTERACTIVE ACTION BUTTONS
    const discordPayload = {
        username: "SparkleMc Payment Gateway",
        avatar_url: "https://www.sparklemc.fun/logo.png",
        embeds: [{
            title: "🔔 New Order Ticket Received!",
            color: 16722507, // #ff2a4b Crimson
            fields: [
                { name: "Invoice ID", value: invoiceId, inline: true },
                { name: "Amount", value: `₹${currentOrder.amount}`, inline: true },
                { name: "Package", value: currentOrder.name, inline: true },
                { name: "Player IGN", value: `\`${ign}\``, inline: true },
                { name: "Customer Email", value: email, inline: true },
                { name: "Effect Type", value: effect, inline: true },
                { name: "Paytm UTR / Ref No", value: `**${utr}**`, inline: false },
                { name: "Server Console Action", value: `/lp user ${ign} parent set ${currentOrder.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`, inline: false }
            ],
            footer: { text: "SparkleMc Automated Billing Hub • Reply directly to customer email" },
            timestamp: new Date().toISOString()
        }]
    };

    // Replace with your actual channel webhook URL
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1317070191296778320/REPLACE_WITH_YOUR_NEW_WEBHOOK";

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload)
    }).catch(() => {});

    // 2. PRE-FILLED MAILTO TO fzboy2008@gmail.com
    const subject = encodeURIComponent(`[SparkleMc Order Invoice] ${invoiceId} - ${currentOrder.name} (${ign})`);
    const mailBody = encodeURIComponent(
`==============================================
         SPARKLEMC OFFICIAL INVOICE
==============================================
Invoice ID     : ${invoiceId}
Package        : ${currentOrder.name}
Amount         : ₹${currentOrder.amount}
Customer Email : ${email}
Player IGN     : ${ign}
Effect Chosen  : ${effect}
Paytm / UTR No : ${utr}
==============================================
ACTION: Check Paytm statement & approve rank delivery.`
    );

    const mailtoUrl = `mailto:fzboy2008@gmail.com?subject=${subject}&body=${mailBody}`;

    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-check-circle"></i> Submit Payment Ticket`;

    // Populate Invoice Screen
    document.getElementById('invId').textContent = invoiceId;
    document.getElementById('invEmail').textContent = email;
    document.getElementById('invIgn').textContent = ign;
    document.getElementById('invItem').textContent = currentOrder.name + (currentOrder.isEffect ? ` (${effect})` : '');
    document.getElementById('invAmount').textContent = `₹${currentOrder.amount}`;
    document.getElementById('invUtr').textContent = utr;

    const mailBtn = document.getElementById('btnMailDispatch');
    if (mailBtn) mailBtn.href = mailtoUrl;

    document.getElementById('gatewayFormStep').style.display = 'none';
    document.getElementById('gatewaySuccessStep').style.display = 'block';
}

// --- Coin Calculator ---
function calculateCoins() {
    const inr = parseInt(document.getElementById('calcInrInput').value) || 0;
    document.getElementById('calcOutputCoins').textContent = (inr * 2) + " Coins";
}

function orderCalculatedCoins() {
    const inr = parseInt(document.getElementById('calcInrInput').value) || 20;
    openGateway(`${inr * 2} Spark Coins`, inr);
}

// --- Reviews System (Showcase Page) ---
function submitReview(e) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value) || 5;
    const comment = document.getElementById('reviewComment').value.trim();

    if (!name || !comment) return;

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    const bubble = document.createElement('div');
    bubble.className = 'review-bubble';
    bubble.innerHTML = `
        <div class="rev-header">
            <strong>${name}</strong>
            <span class="stars">${stars}</span>
        </div>
        <p>${comment}</p>
    `;

    document.getElementById('reviewsList').prepend(bubble);
    document.getElementById('reviewComment').value = '';
    alert("Thank you! Your review has been published.");
}

// --- IP Copy Toast Function ---
function copyIp(text, toastId) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// Close Modals on click outside
window.onclick = function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeDetails();
        closeGateway();
    }
};
