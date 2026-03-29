console.log("✅ Smart Email Assistant UI loaded");

const observer = new MutationObserver(() => {
    // Find Gmail's classic blue Send button container
    const sendButtons = document.querySelectorAll('.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');
    sendButtons.forEach(btn => {
        const parent = btn.parentElement;
        if (parent && !parent.querySelector('.ai-smart-btn')) {
            const aiBtn = document.createElement("button");
            aiBtn.className = "ai-smart-btn";
            aiBtn.innerHTML = "✨ AI Reply";
            aiBtn.onclick = (e) => {
                e.preventDefault();
                openAIModal(btn);
            };
            parent.appendChild(aiBtn);
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

function openAIModal(sendBtn) {
    if (document.getElementById('ai-modal-overlay')) return;

    const composeContainer = sendBtn.closest('.M9') || sendBtn.closest('table') || document.body;
    const composeBox = composeContainer.querySelector('div[role="textbox"]');
    
    // Scrape incoming email text robustly (often inside .a3s.aiL in Gmail threads)
    let emailBody = "";
    document.querySelectorAll('.a3s.aiL').forEach(el => emailBody += " " + el.innerText);

    const overlay = document.createElement('div');
    overlay.id = 'ai-modal-overlay';
    overlay.className = 'ai-modal-overlay';
    
    overlay.innerHTML = `
        <div class="ai-modal">
            <div class="ai-modal-header">
                <div>✨ AI Draft Assistant</div>
                <div class="ai-modal-close" id="ai-close-modal">&times;</div>
            </div>
            <div class="ai-modal-body">
                <div class="ai-modal-title">What should the AI write?</div>
                <textarea id="ai-custom-prompt" class="ai-input-box" placeholder="e.g. Tell them I am sick, ask to reschedule for Monday..." rows="3"></textarea>
                
                <div class="ai-pill-container">
                    <div class="ai-pill selected" data-tone="FORMAL">🎩 Formal</div>
                    <div class="ai-pill" data-tone="CASUAL">😊 Casual</div>
                </div>
                <div class="ai-pill-container">
                    <div class="ai-pill selected" data-length="SHORT">📝 Short</div>
                    <div class="ai-pill" data-length="LONG">📄 Long</div>
                </div>

                <div id="ai-draft-container" style="display:none; margin-top: 16px;">
                    <div class="ai-modal-title">Draft Preview:</div>
                    <div id="ai-draft-preview" class="ai-draft-preview"></div>
                </div>
                <div id="ai-skeleton" class="ai-skeleton" style="display:none; height: 100px;"></div>
            </div>
            <div class="ai-modal-footer">
                <button class="ai-btn-secondary" id="ai-generate-btn">💡 Generate Draft</button>
                <button class="ai-btn-primary" id="ai-insert-btn" disabled>✏️ Insert into Email</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    let selectedTone = "FORMAL";
    let selectedLength = "SHORT";
    let generatedDraft = "";

    document.getElementById('ai-close-modal').onclick = () => overlay.remove();

    const tonePills = overlay.querySelectorAll('[data-tone]');
    tonePills.forEach(p => p.onclick = () => {
        tonePills.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        selectedTone = p.dataset.tone;
    });

    const lengthPills = overlay.querySelectorAll('[data-length]');
    lengthPills.forEach(p => p.onclick = () => {
        lengthPills.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        selectedLength = p.dataset.length;
    });

    const generateBtn = document.getElementById('ai-generate-btn');
    const insertBtn = document.getElementById('ai-insert-btn');
    const draftPreview = document.getElementById('ai-draft-preview');
    const draftContainer = document.getElementById('ai-draft-container');
    const skeleton = document.getElementById('ai-skeleton');

    generateBtn.onclick = async () => {
        const customPrompt = document.getElementById('ai-custom-prompt').value;
        
        draftContainer.style.display = 'none';
        skeleton.style.display = 'block';
        generateBtn.disabled = true;
        insertBtn.disabled = true;
        generateBtn.innerText = "⏳ Generating...";

        try {
            const res = await fetch("http://localhost:8085/api/email/generate-reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailContent: emailBody || "No previous email content available.",
                    tone: selectedTone,
                    length: selectedLength,
                    customPrompt: customPrompt
                })
            });
            const data = await res.json();
            generatedDraft = data.generatedReply || "Error side-loading reply.";
            
            draftPreview.innerText = generatedDraft;
            draftContainer.style.display = 'block';
            skeleton.style.display = 'none';
            generateBtn.innerText = "🔄 Regenerate";
            insertBtn.disabled = false;
        } catch (e) {
            draftPreview.innerText = "Connection failed. Please ensure your backend is running!";
            draftContainer.style.display = 'block';
            skeleton.style.display = 'none';
        } finally {
            generateBtn.disabled = false;
        }
    };

    insertBtn.onclick = () => {
        if (composeBox) {
            composeBox.innerHTML = generatedDraft.replace(/\\n/g, '<br>');
        }
        overlay.remove();
    };
}