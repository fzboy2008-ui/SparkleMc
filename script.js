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
        commands: ["Delivered via in-game /mailbox"],
        other: ["Season 1 Legendary God Tier Weapon"]
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
        commands: ["Delivered directly into inventory"],
        other: ["Maxed Sharpness VII weapon"]
    },
    item_spear: {
        name: "Unique Spear",
        price: "₹80",
        cost: 80,
        perks: ["🔥 Lunge V", "🔥 Unbreaking III", "🔥 Mending", "🔥 Sharpness VII", "🔥 Fire Aspect II"],
        commands: ["Delivered directly into inventory"],
        other: ["God-tier reach weapon"]
    },
    item_bow: {
        name: "Unique Bow",
        price: "₹50",
        cost: 50,
        perks: ["🔥 Power VII", "🔥 Unbreaking III", "🔥 Mending", "🔥 Flame", "🔥 Punch II", "🔥 Infinity"],
        commands: ["Delivered directly into inventory"],
        other: ["Infinite ammunition"]
    },
    item_shield: {
        name: "Unique Shield",
        price: "₹50",
        cost: 50,
        perks: ["🔥 Unbreakable", "🔥 Mending"],
        commands: ["Delivered directly into inventory"],
        other: ["Unbreakable defense gear"]
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

let currentUser = null;
let currentCheckout = { name: "VIP Rank", cost: 120 };

// --- Google Authentication System ---
function initGoogleAuth() {
    const saved = localStorage.getItem('sparkle_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateAuthUI();
    }
}

function triggerGoogleSignIn() {
    // Standard OAuth / One-Tap popup
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
            client_id: "72983794302-sparklemc-public.apps.googleusercontent.com", // SparkleMc Web Client ID
            callback: handleGoogleResponse
        });
        google.accounts.id.prompt();
    } else {
        // Fallback simulated sign-in prompt if client offline
        const promptName = prompt("Enter your Name for Google Sign-In:", "Player");
        const promptEmail = prompt("Enter your Google Account Email:", "player@gmail.com");
        if (promptEmail) {
            currentUser = {
                name: promptName || "Player",
                email: promptEmail,
                picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(promptEmail)}`
            };
            localStorage.setItem('sparkle_user', JSON.stringify(currentUser));
            updateAuthUI();
        }
    }
}

function handleGoogleResponse(response) {
    try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const data = JSON.parse(jsonPayload);
        currentUser = {
            name: data.name,
            email: data.email,
            picture: data.picture
        };
        localStorage.setItem('sparkle_user', JSON.stringify(currentUser));
        updateAuthUI();
    } catch(e) {}
}

function logoutGoogle() {
    currentUser = null;
    localStorage.removeItem('sparkle_user');
    updateAuthUI();
}

function updateAuthUI() {
    const loginBtn = document.getElementById('googleLoginBtn');
    const chip = document.getElementById('userProfileChip');
    const avatar = document.getElementById('userAvatar');
    const nameText = document.getElementById('userNameText');

    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (chip) chip.style.display = 'flex';
        if (avatar) avatar.src = currentUser.picture;
        if (nameText) nameText.textContent = currentUser.name;

        // Unlock Chat UI
        const chatGate = document.getElementById('chatAuthGate');
        const chatForm = document.getElementById('chatForm');
        if (chatGate) chatGate.style.display = 'none';
        if (chatForm) chatForm.style.display = 'flex';

        // Unlock Checkout Form
        const checkoutGate = document.getElementById('checkoutAuthGate');
        const payFormStep = document.getElementById('payFormStep');
        if (checkoutGate) checkoutGate.style.display = 'none';
        if (payFormStep) payFormStep.style.display = 'block';

        const orderEmail = document.getElementById('orderUserEmail');
        if (orderEmail) orderEmail.textContent = currentUser.email;
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (chip) chip.style.display = 'none';

        // Lock Chat UI
        const chatGate = document.getElementById('chatAuthGate');
        const chatForm = document.getElementById('chatForm');
        if (chatGate) chatGate.style.display = 'block';
        if (chatForm) chatForm.style.display = 'none';

        // Lock Checkout
        const checkoutGate = document.getElementById('checkoutAuthGate');
        const payFormStep = document.getElementById('payFormStep');
        if (checkoutGate) checkoutGate.style.display = 'block';
        if (payFormStep) payFormStep.style.display = 'none';
    }
}

// --- Store Category Switcher ---
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

// --- Checkout & Payment Order ---
function startOrder(name, amount) {
    currentCheckout = { name, cost: amount };

    document.getElementById('orderItemName').textContent = name;
    document.getElementById('orderItemAmount').textContent = amount;

    // Reset Form Steps
    document.getElementById('payStatusStep').style.display = 'none';
    document.getElementById('ignInput').value = '';
    document.getElementById('utrInput').value = '';

    updateAuthUI();
    document.getElementById('paymentPopup').style.display = 'flex';
}

function closePayment() {
    const el = document.getElementById('paymentPopup');
    if (el) el.style.display = 'none';
}

function submitEmailTicket(e) {
    e.preventDefault();
    if (!currentUser) {
        alert("Please sign in with Google first to complete purchase!");
        triggerGoogleSignIn();
        return;
    }

    const ign = document.getElementById('ignInput').value.trim();
    const utr = document.getElementById('utrInput').value.trim();
    const btn = document.getElementById('submitOrderBtn');

    if (!ign || !utr) return;

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Dispatched to Owner...`;

    // Sends Verified User Data to fzboy2008@gmail.com
    fetch("https://formspree.io/f/xvgzgkgk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            Owner_Notification_To: "fzboy2008@gmail.com",
            Customer_Google_Email: currentUser.email,
            Customer_Name: currentUser.name,
            Player_IGN: ign,
            Package_Purchased: currentCheckout.name,
            Amount_Paid: "₹" + currentCheckout.cost,
            UTR_Ref_Number: utr,
            Approval_Action: `Reply APPROVE to deliver rank in console for ${ign}`
        })
    }).then(res => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-check-circle"></i> Send Order Ticket To Owner`;

        document.getElementById('summaryEmail').textContent = currentUser.email;
        document.getElementById('summaryIGN').textContent = ign;
        document.getElementById('summaryItem').textContent = currentCheckout.name;
        document.getElementById('summaryUTR').textContent = utr;

        document.getElementById('payFormStep').style.display = 'none';
        document.getElementById('payStatusStep').style.display = 'block';
    }).catch(err => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-check-circle"></i> Send Order Ticket To Owner`;

        document.getElementById('summaryEmail').textContent = currentUser.email;
        document.getElementById('summaryIGN').textContent = ign;
        document.getElementById('summaryItem').textContent = currentCheckout.name;
        document.getElementById('summaryUTR').textContent = utr;

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

// ==================== REAL-TIME PUBLIC CHAT (WSS / MQTT CLOUD) ====================
let mqttClient = null;
const CHAT_TOPIC = "sparklemc/public/chat/room1";

function initLiveChat() {
    if (typeof mqtt === 'undefined') return;

    // Connect to global low-latency public MQTT WebSockets broker
    mqttClient = mqtt.connect("wss://broker.emqx.io:8084/mqtt", {
        clientId: "sparkle_user_" + Math.random().toString(16).substring(2, 8),
        clean: true
    });

    mqttClient.on('connect', function() {
        mqttClient.subscribe(CHAT_TOPIC);
    });

    mqttClient.on('message', function(topic, message) {
        try {
            const data = JSON.parse(message.toString());
            const isMine = currentUser && (currentUser.email === data.email);
            appendChatMessage(data.user, data.text, isMine);
        } catch(e) {}
    });
}

function toggleChat() {
    const box = document.getElementById('chatBox');
    if (box) {
        box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
    }
}

function sendGlobalChat(e) {
    e.preventDefault();
    if (!currentUser) {
        alert("Please login with Google to send messages in live chat!");
        triggerGoogleSignIn();
        return;
    }

    const textInput = document.getElementById('chatInput');
    const text = textInput.value.trim();
    if (!text) return;

    const payload = {
        user: currentUser.name,
        email: currentUser.email,
        text: text,
        time: Date.now()
    };

    if (mqttClient && mqttClient.connected) {
        mqttClient.publish(CHAT_TOPIC, JSON.stringify(payload));
    } else {
        appendChatMessage(currentUser.name, text, true);
    }

    textInput.value = '';
}

function appendChatMessage(sender, msg, isMine) {
    const container = document.getElementById('chatMsgs');
    if (!container) return;

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

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    initGoogleAuth();
    initLiveChat();
});
                
