// 🔥 GLOBAL STATE
let selectedTone = "FORMAL";
let selectedLength = "SHORT";
let isLoading = false;
let debounceTimer = null;

console.log("✅ content.js loaded!");

// 🟢 OBSERVER with DEBOUNCE
const observer = new MutationObserver(() => {
    const box = document.querySelector('div[role="textbox"]');
    if (box && !document.getElementById("ai-reply-toolbar")) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => injectToolbar(), 500);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// 🟢 INJECT TOOLBAR
function injectToolbar() {

    const composeBox = document.querySelector('div[role="textbox"]');

    if (!composeBox) return;

    if (document.getElementById("ai-reply-toolbar")) return;

    console.log("✅ Injecting toolbar...");

    const toolbar = document.createElement("div");
    toolbar.id = "ai-reply-toolbar";

    // 🔥 FORCED VISIBILITY STYLES
    toolbar.setAttribute("style", `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        z-index: 9999 !important;
        background-color: #f8f9fa !important;
        width: 100% !important;
        min-height: 40px !important;
        overflow: visible !important;
        gap: 6px !important;
        align-items: center !important;
        margin-bottom: 8px !important;
        flex-wrap: wrap !important;
        padding: 6px !important;
        box-sizing: border-box !important;
        border-bottom: 1px solid #e0e0e0 !important;
    `);

    // 🔧 COMMON STYLES
    function styleButton(btn) {
        btn.setAttribute("style", `
            padding: 5px 10px !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            background: white !important;
            color: black !important;
            font-size: 13px !important;
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            position: relative !important;
        `);
    }

    function select(btn) {
        btn.setAttribute("style", `
            padding: 5px 10px !important;
            border: 1px solid #1a73e8 !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            background: #1a73e8 !important;
            color: white !important;
            font-size: 13px !important;
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            position: relative !important;
        `);
    }

    function reset(btn) {
        btn.setAttribute("style", `
            padding: 5px 10px !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            background: white !important;
            color: black !important;
            font-size: 13px !important;
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            position: relative !important;
        `);
    }

    // 🎩 TONE BUTTONS
    const btnFormal = document.createElement("button");
    btnFormal.innerText = "🎩 Formal";
    styleButton(btnFormal);

    const btnCasual = document.createElement("button");
    btnCasual.innerText = "😊 Casual";
    styleButton(btnCasual);

    btnFormal.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedTone = "FORMAL";
        select(btnFormal);
        reset(btnCasual);
    };

    btnCasual.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedTone = "CASUAL";
        select(btnCasual);
        reset(btnFormal);
    };

    // 📝 LENGTH BUTTONS
    const btnShort = document.createElement("button");
    btnShort.innerText = "📝 Short";
    styleButton(btnShort);

    const btnLong = document.createElement("button");
    btnLong.innerText = "📄 Long";
    styleButton(btnLong);

    btnShort.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedLength = "SHORT";
        select(btnShort);
        reset(btnLong);
    };

    btnLong.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedLength = "LONG";
        select(btnLong);
        reset(btnShort);
    };

    // ✨ GENERATE BUTTON
    const generateBtn = document.createElement("button");
    generateBtn.id = "ai-reply-btn";
    generateBtn.innerText = "✨ Generate Reply";
    generateBtn.setAttribute("style", `
        background: #1a73e8 !important;
        color: white !important;
        border: none !important;
        padding: 6px 12px !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        font-weight: bold !important;
        font-size: 13px !important;
        display: inline-block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        position: relative !important;
    `);

    generateBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAIReply(generateBtn);
    };

    // ✅ DEFAULT SELECTED STATE
    select(btnFormal);
    select(btnShort);

    // 🧩 ASSEMBLE TOOLBAR
    toolbar.appendChild(btnFormal);
    toolbar.appendChild(btnCasual);
    toolbar.appendChild(btnShort);
    toolbar.appendChild(btnLong);
    toolbar.appendChild(generateBtn);

    // 📌 INSERT DIRECTLY BEFORE COMPOSE BOX
    composeBox.insertAdjacentElement("beforebegin", toolbar);

    console.log("✅ Toolbar injected successfully!");
}

// 🟢 HANDLE AI REPLY
function handleAIReply(button) {

    if (isLoading) {
        alert("Please wait... generating reply");
        return;
    }

    isLoading = true;

    const emailElement = document.querySelector("div.a3s.aiL")
        || document.querySelector("div[role='main']");

    if (!emailElement) {
        alert("No email found!");
        isLoading = false;
        return;
    }

    const emailText = emailElement.innerText;

    console.log("📧 Captured email text:", emailText.substring(0, 100));

    button.innerText = "⏳ Generating...";
    button.disabled = true;

    fetch("http://localhost:8085/api/email/generate-reply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailContent: emailText,
            tone: selectedTone.toLowerCase(),
            length: selectedLength.toLowerCase()
        })
    })
    .then(res => res.json())
    .then(data => {

        console.log("✅ API Response:", data);

        const reply = data.generatedReply || "No reply generated";

        const composeBox = document.querySelector('div[aria-label="Message Body"]')
            || document.querySelector('div[role="textbox"]');

        if (composeBox) {
            composeBox.innerHTML = reply.replace(/\n/g, "<br>");
            console.log("✅ Reply inserted into compose box!");
        } else {
            alert("Could not find compose box!");
        }
    })
    .catch(err => {
        console.error("❌ Error:", err);
        alert("Error: " + err.message);
    })
    .finally(() => {
        button.innerText = "✨ Generate Reply";
        button.disabled = false;
        setTimeout(() => {
            isLoading = false;
        }, 3000);
    });
}