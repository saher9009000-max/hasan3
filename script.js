// ==================== ميزة الترجمة الصوتية (Voice Recognition) ====================
let recognition = null;
let isRecording = false;

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast('المتصفح الخاص بك لا يدعم خاصية التعرف على الصوت', 'error');
        return null;
    }
    
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    
    // تحديد لغة التسجيل بناءً على اللغة المحددة في حقل المصدر
    rec.lang = els.sourceLang.value === 'auto' ? 'ar-SA' : els.sourceLang.value;
    
    rec.onstart = () => {
        isRecording = true;
        els.btnMic.classList.add('active');
        els.statusBar.textContent = '🎙️ جاري التسجيل... تحدث الآن';
        els.statusBar.className = 'status-bar';
    };
    
    rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        els.sourceText.value = transcript;
        els.charCount.textContent = transcript.length;
    };
    
    rec.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        showToast('حدث خطأ أثناء التسجيل الصوتي', 'error');
        stopRecordingUI();
    };
    
    rec.onend = () => {
        stopRecordingUI();
    };
    
    return rec;
}

function stopRecordingUI() {
    isRecording = false;
    if (els.btnMic) els.btnMic.classList.remove('active');
    els.statusBar.textContent = '';
}

// ربط زر المايكروفون
if (els.btnMic) {
    els.btnMic.addEventListener('click', () => {
        if (!recognition) {
            recognition = initSpeechRecognition();
        }
        
        if (!recognition) return;

        if (isRecording) {
            recognition.stop();
            stopRecordingUI();
        } else {
            try {
                // تحديث لغة التسجيل حسب اللغة المختارة حالياً
                recognition.lang = els.sourceLang.value === 'auto' ? 'ar-SA' : els.sourceLang.value;
                recognition.start();
            } catch (e) {
                recognition.stop();
                recognition.start();
            }
        }
    });
}
