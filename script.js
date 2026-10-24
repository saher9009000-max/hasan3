const state = {
    engine: 'standard',
    currentModel: localStorage.getItem('translator_model') || 'gpt-3.5-turbo',
    currentType: 'natural',
    endpoint: localStorage.getItem('translator_endpoint') || 'https://api.openai.com/v1',
    apiKey: localStorage.getItem('translator_apikey') || '',
    history: JSON.parse(localStorage.getItem('translator_history') || '[]'),
    favorites: JSON.parse(localStorage.getItem('translator_favorites') || '[]'),
    theme: localStorage.getItem('translator_theme') || 'light',
    modelsList: []
};

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    setupEventListeners();
    updateEngineUI();
});

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('translator_theme', theme);
    const icon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

document.getElementById('themeToggleBtn').addEventListener('click', () => {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
});

function setupEventListeners() {
    document.querySelectorAll('.engine-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.engine-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.engine = tab.getAttribute('data-engine');
            updateEngineUI();
        });
    });

    const sourceText = document.getElementById('sourceText');
    sourceText.addEventListener('input', () => {
        const len = sourceText.value.length;
        document.getElementById('charCount').textContent = `${len} / 5000 حرف`;
    });

    document.getElementById('swapLangBtn').addEventListener('click', () => {
        const source = document.getElementById('sourceLang');
        const target = document.getElementById('targetLang');
        const temp = source.value;
        source.value = target.value;
        target.value = temp;
        
        const tempText = sourceText.value;
        sourceText.value = document.getElementById('resultOutput').textContent !== 'ستظهر النتيجة هنا...' ? document.getElementById('resultOutput').textContent : '';
        document.getElementById('resultOutput').textContent = tempText;
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        sourceText.value = '';
        document.getElementById('charCount').textContent = '0 / 5000 حرف';
    });

    document.getElementById('pasteBtn').addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            sourceText.value = text;
            document.getElementById('charCount').textContent = `${text.length} / 5000 حرف`;
            showToast('تم لصق النص بنجاح');
        } catch (err) {
            showToast('تعذر الوصول إلى الحافظة', 'error');
        }
    });

    document.getElementById('copyBtn').addEventListener('click', () => {
        const text = document.getElementById('resultOutput').textContent;
        if (!text || text === 'ستظهر النتيجة هنا...') return;
        navigator.clipboard.writeText(text);
        showToast('تم نسخ النتيجة إلى الحافظة');
    });

    document.getElementById('speakBtn').addEventListener('click', () => {
        const text = document.getElementById('resultOutput').textContent;
        if (!text || text === 'ستظهر النتيجة هنا...') return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.getElementById('targetLang').value;
        window.speechSynthesis.speak(utterance);
    });

    document.getElementById('favoriteBtn').addEventListener('click', () => {
        const src = sourceText.value;
        const res = document.getElementById('resultOutput').textContent;
        if (!res || res === 'ستظهر النتيجة هنا...') return;
        
        const item = {
            id: Date.now(),
            sourceLang: document.getElementById('sourceLang').value,
            targetLang: document.getElementById('targetLang').value,
            sourceText: src,
            resultText: res,
            date: new Date().toLocaleString('ar-SA')
        };

        state.favorites.push(item);
        localStorage.setItem('translator_favorites', JSON.stringify(state.favorites));
        document.getElementById('favoriteBtn').classList.add('active');
        showToast('تمت الإضافة إلى المفضلة');
    });

    document.getElementById('shareBtn').addEventListener('click', async () => {
        const res = document.getElementById('resultOutput').textContent;
        if (!res || res === 'ستظهر النتيجة هنا...') return;
        if (navigator.share) {
            try {
                await navigator.share({ title: 'ترجمة', text: res });
            } catch (e) {}
        } else {
            navigator.clipboard.writeText(res);
            showToast('تم النسخ للمشاركة');
        }
    });

    document.getElementById('translateBtn').addEventListener('click', performTranslation);
    setupModals();
}

function updateEngineUI() {
    const aiRow = document.getElementById('aiOptionsRow');
    if (state.engine === 'ai') {
        aiRow.classList.remove('hidden-control');
    } else {
        aiRow.classList.add('hidden-control');
    }
}

function setupModals() {
    const modelModal = document.getElementById('modelModal');
    document.getElementById('modelSelectBtn').addEventListener('click', () => {
        modelModal.classList.add('open');
        fetchAvailableModels();
    });
    document.getElementById('closeModelModal').addEventListener('click', () => modelModal.classList.remove('open'));
    document.getElementById('cancelModelBtn').addEventListener('click', () => modelModal.classList.remove('open'));

    const typeModal = document.getElementById('typeModal');
    document.getElementById('typeSelectBtn').addEventListener('click', () => typeModal.classList.add('open'));
    document.getElementById('closeTypeModal').addEventListener('click', () => typeModal.classList.remove('open'));
    document.getElementById('cancelTypeBtn').addEventListener('click', () => typeModal.classList.remove('open'));

    document.querySelectorAll('.type-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    document.getElementById('confirmTypeBtn').addEventListener('click', () => {
        const sel = document.querySelector('.type-card.selected');
        if (sel) {
            state.currentType = sel.getAttribute('data-type');
            document.getElementById('currentTypeText').textContent = sel.querySelector('.type-card-title').textContent.trim();
        }
        typeModal.classList.remove('open');
    });

    const settingsModal = document.getElementById('settingsModal');
    document.getElementById('settingsBtn').addEventListener('click', () => {
        settingsModal.classList.add('open');
        document.getElementById('apiEndpointInput').value = state.endpoint;
        document.getElementById('apiKeyInput').value = state.apiKey;
    });
    document.getElementById('closeSettingsModal').addEventListener('click', () => settingsModal.classList.remove('open'));

    document.getElementById('toggleKeyVisibility').addEventListener('click', () => {
        const input = document.getElementById('apiKeyInput');
        input.type = input.type === 'password' ? 'text' : 'password';
    });

    document.getElementById('saveSettingsBtn').addEventListener('click', () => {
        state.endpoint = document.getElementById('apiEndpointInput').value.trim();
        state.apiKey = document.getElementById('apiKeyInput').value.trim();
        localStorage.setItem('translator_endpoint', state.endpoint);
        localStorage.setItem('translator_apikey', state.apiKey);
        settingsModal.classList.remove('open');
        showToast('تم حفظ الإعدادات بنجاح');
    });

    document.getElementById('deleteKeyBtn').addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف مفتاح API والإعدادات؟')) {
            state.apiKey = '';
            localStorage.removeItem('translator_apikey');
            document.getElementById('apiKeyInput').value = '';
            showToast('تم حذف المفتاح');
        }
    });

    document.getElementById('testConnBtn').addEventListener('click', testConnection);

    const historyModal = document.getElementById('historyModal');
    document.getElementById('historyBtn').addEventListener('click', () => {
        historyModal.classList.add('open');
        renderHistoryList();
    });
    document.getElementById('closeHistoryModal').addEventListener('click', () => historyModal.classList.remove('open'));
    document.getElementById('closeHistoryBtn').addEventListener('click', () => historyModal.classList.remove('open'));
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        if (confirm('هل تريد مسح السجل بالكامل؟')) {
            state.history = [];
            localStorage.removeItem('translator_history');
            renderHistoryList();
            showToast('تم مسح السجل');
        }
    });

    document.getElementById('historySearchInput').addEventListener('input', (e) => {
        renderHistoryList(e.target.value);
    });

    const favoritesModal = document.getElementById('favoritesModal');
    document.getElementById('favoritesBtn').addEventListener('click', () => {
        favoritesModal.classList.add('open');
        renderFavoritesList();
    });
    document.getElementById('closeFavoritesModal').addEventListener('click', () => favoritesModal.classList.remove('open'));
    document.getElementById('closeFavoritesBtn').addEventListener('click', () => favoritesModal.classList.remove('open'));

    document.getElementById('favoritesSearchInput').addEventListener('input', (e) => {
        renderFavoritesList(e.target.value);
    });
}

async function fetchAvailableModels() {
    const container = document.getElementById('modelsListContainer');
    const statusContainer = document.getElementById('modelStatusContainer');
    container.innerHTML = '';
    statusContainer.innerHTML = '<div class="status-badge loading"><div class="spinner"></div> جاري جلب النماذج...</div>';

    try {
        const endpoint = state.endpoint.replace(/\/$/, '');
        const res = await fetch(`${endpoint}/models`, {
            headers: { 'Authorization': `Bearer ${state.apiKey}` }
        });

        if (!res.ok) throw new Error(`خطأ في الاتصال: ${res.status}`);
        const data = await res.json();
        const models = data.data || data.models || data;
        if (!Array.isArray(models)) throw new Error('تنسيق استجابة النماذج غير مدعوم');

        state.modelsList = models.map(m => m.id || m);
        statusContainer.innerHTML = '<div class="status-badge success">تم جلب النماذج بنجاح</div>';
        renderModelsList(state.modelsList);
    } catch (err) {
        statusContainer.innerHTML = `<div class="status-badge error">تعذر جلب النماذج: ${err.message}</div>`;
        state.modelsList = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o', 'gpt-4o-mini'];
        renderModelsList(state.modelsList);
    }
}

function renderModelsList(list) {
    const container = document.getElementById('modelsListContainer');
    container.innerHTML = '';
    const searchVal = document.getElementById('modelSearchInput').value.toLowerCase();

    list.filter(m => m.toLowerCase().includes(searchVal)).forEach(modelName => {
        const div = document.createElement('div');
        div.className = `model-item ${modelName === state.currentModel ? 'selected' : ''}`;
        div.innerHTML = `<span>${modelName}</span>`;
        div.addEventListener('click', () => {
            document.querySelectorAll('.model-item').forEach(i => i.classList.remove('selected'));
            div.classList.add('selected');
            tempSelectedModel = modelName;
        });
        container.appendChild(div);
    });
}

let tempSelectedModel = state.currentModel;
document.getElementById('modelSearchInput').addEventListener('input', () => {
    renderModelsList(state.modelsList);
});

document.getElementById('refreshModelsBtn').addEventListener('click', fetchAvailableModels);

document.getElementById('confirmModelBtn').addEventListener('click', () => {
    state.currentModel = tempSelectedModel;
    localStorage.setItem('translator_model', state.currentModel);
    document.getElementById('currentModelText').textContent = state.currentModel;
    document.getElementById('modelModal').classList.remove('open');
});

async function testConnection() {
    const statusArea = document.getElementById('connectionStatusArea');
    statusArea.innerHTML = '<div class="status-badge loading"><div class="spinner"></div> جاري اختبار الاتصال...</div>';
    
    const endpoint = document.getElementById('apiEndpointInput').value.trim().replace(/\/$/, '');
    const key = document.getElementById('apiKeyInput').value.trim();

    try {
        const res = await fetch(`${endpoint}/models`, {
            headers: { 'Authorization': `Bearer ${key}` }
        });
        if (res.ok) {
            statusArea.innerHTML = '<div class="status-badge success">الاتصال ناجح تماماً!</div>';
        } else {
            statusArea.innerHTML = `<div class="status-badge error">فشل الاتصال: رمز الخطأ ${res.status}</div>`;
        }
    } catch (err) {
        statusArea.innerHTML = `<div class="status-badge error">خطأ في الاتصال بالشبكة أو CORS</div>`;
    }
}

async function performTranslation() {
    const text = document.getElementById('sourceText').value.trim();
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const resultDiv = document.getElementById('resultOutput');
    const statusSpan = document.getElementById('translateStatus');

    if (!text) {
        showToast('الرجاء إدخال نص للترجمة', 'error');
        return;
    }

    resultDiv.textContent = 'جاري الترجمة...';
    statusSpan.textContent = 'جاري المعالجة...';

    if (state.engine === 'standard') {
        await translateStandard(text, sourceLang, targetLang, resultDiv, statusSpan);
    } else {
        await translateAI(text, sourceLang, targetLang, resultDiv, statusSpan);
    }
}

async function translateStandard(text, src, tgt, resultDiv, statusSpan) {
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('فشل الاتصال بخدمة الترجمة العادية');
        const data = await res.json();
        
        if (data && data.responseData && data.responseData.translatedText) {
            const translation = data.responseData.translatedText;
            resultDiv.textContent = translation;
            statusSpan.textContent = 'اكتملت الترجمة بنجاح';
            saveToHistory(src, tgt, text, translation);
        } else {
            throw new Error('لم يتم استلام ترجمة صحيحة');
        }
    } catch (err) {
        resultDiv.textContent = 'حدث خطأ أثناء الترجمة العادية.';
        statusSpan.textContent = 'خطأ في الترجمة';
        showToast(err.message, 'error');
    }
}

async function translateAI(text, src, tgt, resultDiv, statusSpan) {
    if (!state.apiKey) {
        showToast('الرجاء إدخال مفتاح API من الإعدادات', 'error');
        statusSpan.textContent = 'مفتاح API مطلوب';
        resultDiv.textContent = 'مفتاح API مفقود. يرجى ضبط الإعدادات.';
        return;
    }

    const typePrompts = {
        natural: 'Translate the following text naturally and fluently.',
        literal: 'Translate the following text literally and accurately.',
        formal: 'Translate the following text using formal, diplomatic language.',
        informal: 'Translate the following text in a casual, conversational tone.',
        academic: 'Translate the following text using advanced academic terminology.',
        professional: 'Translate the following text with professional business terminology.',
        explain: 'Translate the following text and provide a detailed explanation of its meaning.'
    };

    const systemPrompt = `You are a professional expert translator. ${typePrompts[state.currentType] || typePrompts.natural} Translate from ${src} to ${tgt}. Return ONLY the translation or result.`;

    try {
        const endpoint = state.endpoint.replace(/\/$/, '');
        const res = await fetch(`${endpoint}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.apiKey}`
            },
            body: JSON.stringify({
                model: state.currentModel,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: text }
                ],
                temperature: 0.3
            })
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error?.message || `خطأ في المصادقة أو الاتصال: ${res.status}`);
        }

        const data = await res.json();
        const translation = data.choices?.[0]?.message?.content?.trim();

        if (translation) {
            resultDiv.textContent = translation;
            statusSpan.textContent = 'اكتملت الترجمة الذكية';
            saveToHistory(src, tgt, text, translation);
        } else {
            throw new Error('لم يتم استلام رد صحيح من النموذج');
        }
    } catch (err) {
        resultDiv.textContent = `خطأ: ${err.message}`;
        statusSpan.textContent = 'فشل الاتصال';
        showToast(err.message, 'error');
    }
}

function saveToHistory(src, tgt, srcText, resText) {
    const item = {
        id: Date.now(),
        sourceLang: src,
        targetLang: tgt,
        sourceText: srcText,
        resultText: resText,
        date: new Date().toLocaleString('ar-SA')
    };
    state.history.unshift(item);
    if (state.history.length > 50) state.history.pop();
    localStorage.setItem('translator_history', JSON.stringify(state.history));
}

function renderHistoryList(filter = '') {
    const container = document.getElementById('historyListContainer');
    container.innerHTML = '';
    const filtered = state.history.filter(h => h.sourceText.includes(filter) || h.resultText.includes(filter));

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد ترجمات في السجل</div>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-header">
                <span>${item.sourceLang.toUpperCase()} ➔ ${item.targetLang.toUpperCase()}</span>
                <span>${item.date}</span>
            </div>
            <div class="history-content">
                <div><strong>الأصل:</strong> ${escapeHtml(item.sourceText)}</div>
                <div><strong>الترجمة:</strong> ${escapeHtml(item.resultText)}</div>
            </div>
            <div class="history-actions">
                <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="reuseHistory(${item.id})">استخدام</button>
                <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="copyHistory('${encodeURIComponent(item.resultText)}')">نسخ</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderFavoritesList(filter = '') {
    const container = document.getElementById('favoritesListContainer');
    container.innerHTML = '';
    const filtered = state.favorites.filter(h => h.sourceText.includes(filter) || h.resultText.includes(filter));

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد عناصر في المفضلة</div>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-header">
                <span>${item.sourceLang.toUpperCase()} ➔ ${item.targetLang.toUpperCase()}</span>
                <span>${item.date}</span>
            </div>
            <div class="history-content">
                <div><strong>الأصل:</strong> ${escapeHtml(item.sourceText)}</div>
                <div><strong>الترجمة:</strong> ${escapeHtml(item.resultText)}</div>
            </div>
            <div class="history-actions">
                <button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="removeFavorite(${item.id})">حذف</button>
                <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="reuseHistory(${item.id})">استخدام</button>
            </div>
        `;
        container.appendChild(div);
    });
}

window.reuseHistory = function(id) {
    const item = state.history.find(h => h.id === id) || state.favorites.find(h => h.id === id);
    if (item) {
        document.getElementById('sourceLang').value = item.sourceLang;
        document.getElementById('targetLang').value = item.targetLang;
        document.getElementById('sourceText').value = item.sourceText;
        document.getElementById('resultOutput').textContent = item.resultText;
        document.getElementById('charCount').textContent = `${item.sourceText.length} / 5000 حرف`;
        document.getElementById('historyModal').classList.remove('open');
        document.getElementById('favoritesModal').classList.remove('open');
        showToast('تم استعادة الترجمة بنجاح');
    }
};

window.copyHistory = function(encodedText) {
    navigator.clipboard.writeText(decodeURIComponent(encodedText));
    showToast('تم النسخ');
};

window.removeFavorite = function(id) {
    state.favorites = state.favorites.filter(f => f.id !== id);
    localStorage.setItem('translator_favorites', JSON.stringify(state.favorites));
    renderFavoritesList();
    showToast('تم الحذف من المفضلة');
};

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10b981' : '#ef4444'}" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}
