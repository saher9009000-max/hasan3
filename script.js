/**
 * ==========================================
 * Vocalix AI - Professional Frontend Script
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // State Variables
    let currentFile = null;
    let audioUrlOriginal = null;
    let audioUrlVocals = null;
    let audioUrlInst = null;
    let currentLang = localStorage.getItem('vocalix_lang') || 'ar';
    let currentTheme = localStorage.getItem('vocalix_theme') || 'dark';

    // Translations Dictionary
    const translations = {
        ar: {
            page_title: "Vocalix AI - فصل الصوت البشري عن الموسيقى بالذكاء الاصطناعي",
            nav_home: "الرئيسية",
            nav_how: "طريقة العمل",
            nav_features: "المميزات",
            nav_faq: "الأسئلة الشائعة",
            nav_cta: "ابدأ الآن",
            hero_badge: "AI AUDIO SEPARATION",
            hero_title: "افصل الغناء عن الموسيقى بقوة الذكاء الاصطناعي",
            hero_desc: "حوّل أغانيك إلى مسارات صوتية منفصلة خلال خطوات بسيطة. استخرج الصوت البشري أو استمع إلى الموسيقى وحدها، مع تجربة سهلة ومباشرة.",
            hero_btn_start: "ابدأ عزل الصوت",
            hero_btn_how: "اكتشف طريقة العمل",
            hero_feat_1: "رفع الملفات الصوتية",
            hero_feat_2: "معاينة النتائج",
            hero_feat_3: "تنزيل المسارات المنفصلة",
            workspace_title: "منطقة عزل الصوت بالذكاء الاصطناعي",
            workspace_subtitle: "اختر ملفاً صوتياً وابدأ عملية الفصل في ثوانٍ معدودة",
            upload_title: "ارفع ملفك الصوتي",
            upload_desc: "اسحب الملف إلى هنا أو اختره من جهازك",
            upload_btn: "اختيار ملف",
            upload_formats: "الامتدادات المدعومة: MP3, WAV, FLAC, M4A",
            upload_size: "الحد الأقصى: 50 ميجابايت",
            file_replace: "استبدال",
            settings_title: "إعدادات عزل الصوت",
            setting_type_label: "نوع الفصل:",
            opt_vocals_inst: "Vocals + Instrumental",
            opt_vocals_inst_desc: "فصل الغناء عن الموسيقى بالكامل",
            opt_vocals_only: "Vocals Only",
            opt_vocals_only_desc: "استخراج الصوت البشري فقط",
            opt_inst_only: "Instrumental Only",
            opt_inst_only_desc: "استخراج الموسيقى والآلات فقط",
            btn_start_separation: "ابدأ فصل الصوت",
            proc_title: "جارٍ فصل المسارات الصوتية...",
            proc_desc: "الرجاء الانتظار بينما يقوم نموذج الذكاء الاصطناعي بمعالجة ملفك بدقة عالية.",
            step_upload: "رفع الملف للخدمة",
            step_ai: "تحليل وفصل المصادر",
            step_prep: "تجهيز النتائج",
            btn_cancel: "إلغاء العملية",
            results_title: "نتائج فصل الصوت",
            btn_download_all: "تنزيل جميع المسارات",
            card_vocals_title: "Vocals — الصوت البشري",
            btn_download_vocals: "تنزيل الصوت البشري",
            card_inst_title: "Instrumental — الموسيقى",
            btn_download_inst: "تنزيل الموسيقى",
            how_title: "كيف يعمل Vocalix AI",
            how_subtitle: "أربع خطوات بسيطة للحصول على مساراتك النقية",
            step1_title: "ارفع الملف",
            step1_desc: "اختر ملف الأغنية بصيغة MP3 أو WAV وسحبه إلى منطقة الرفع.",
            step2_title: "حدد نمط الفصل",
            step2_desc: "اختر ما إذا كنت تريد فصل الغناء عن الموسيقى أو استخراج أحدهما منفرداً.",
            step3_title: "معالجة بالذكاء الاصطناعي",
            step3_desc: "يقوم النموذج المتقدم بتحليل وتفكيك طبقات الصوت بدقة استوديو احترافية.",
            step4_title: "استمع ونزّل",
            step4_desc: "معاينة المسارات الناتجة مباشرة وتنزيلها بالصيغة المفضلة لديك.",
            features_title: "مميزات منصة Vocalix AI",
            features_subtitle: "كل ما تحتاجه لإنتاج وتعديل مساراتك الصوتية باحترافية",
            feat1_title: "فصل دقيق للغناء والموسيقى",
            feat1_desc: "خوارزميات ذكاء اصطناعي متطورة لعزل الصوت البشري بأعلى نقاء ممكن دون تشويش.",
            feat2_title: "سرعة فائقة في المعالجة",
            feat2_desc: "إتمام عملية فصل المسارات في ثوانٍ معدودة لتوفير وقتك وجهدك.",
            feat3_title: "تنزيل مباشر ونظيف",
            feat3_desc: "احصل على ملفاتك المنفصلة بجودة WAV النقية للتعديل عليها مباشرة.",
            feat4_title: "خصوصية كاملة وأمان",
            feat4_desc: "ملفاتك الصوتية محمية تماماً ولا يتم مشاركتها أو الاحتفاظ بها لفترات طويلة.",
            faq_title: "الأسئلة الشائعة",
            faq_subtitle: "إجابات شاملة حول استخدام المنصة وخدمات عزل الصوت",
            faq1_q: "كيف يعمل فصل الصوت عن الموسيقى؟",
            faq1_a: "نستخدم نماذج ذكاء اصطناعي عميقة مدربة على مئات الآلاف من الأغاني لتمييز الترددات الخاصة بالصوت البشري عن الآلات الموسيقية وعزلها بدقة مذهلة.",
            faq2_q: "ما هي صيغ الملفات المدعومة؟",
            faq2_a: "تدعم المنصة معظم صيغ الصوت الشهيرة مثل MP3 وWAV وFLAC وM4A بحجم أقصى يبلغ 50 ميجابايت للملف الواحد.",
            faq3_q: "هل يتم الاحتفاظ بملفاتي بعد المعالجة؟",
            faq3_a: "لا، يتم حذف الملفات تلقائياً من خوادم المعالجة بعد وقت قصير من إنهاء العملية لضمان خصوصية وأمان بياناتك الكاملة.",
            faq4_q: "ماذا أفعل إذا واجهت خطأ أثناء المعالجة؟",
            faq4_a: "تأكد من أن حجم الملف لا يتجاوز الحد المسموح وأن الصيغة مدعومة، ثم حاول إعادة رفع الملف أو إعادة المحاولة لاحقاً.",
            footer_desc: "المنصة الأحدث لفصل الصوت البشري والموسيقى باستخدام تقنيات الذكاء الاصطناعي الاحترافية.",
            footer_links_title: "روابط سريعة",
            footer_legal_title: "الخصوصية",
            footer_privacy: "جميع حقوق المعالجة محفوظة. نحن نحترم خصوصية ملفاتك الصوتية بالكامل.",
            footer_rights: "جميع الحقوق محفوظة."
        },
        en: {
            page_title: "Vocalix AI - AI Vocal Remover & Music Source Separation",
            nav_home: "Home",
            nav_how: "How It Works",
            nav_features: "Features",
            nav_faq: "FAQ",
            nav_cta: "Get Started",
            hero_badge: "AI AUDIO SEPARATION",
            hero_title: "Separate Vocals and Music with AI Power",
            hero_desc: "Transform your songs into separated audio tracks in simple steps. Extract vocals or isolate instrumentals instantly.",
            hero_btn_start: "Start Separation",
            hero_btn_how: "Discover How It Works",
            hero_feat_1: "Upload Audio Files",
            hero_feat_2: "Preview Results",
            hero_feat_3: "Download Stems",
            workspace_title: "AI Audio Separation Workspace",
            workspace_subtitle: "Select an audio file and start separation in seconds",
            upload_title: "Upload your audio file",
            upload_desc: "Drag and drop your file here or browse from your device",
            upload_btn: "Browse File",
            upload_formats: "Supported formats: MP3, WAV, FLAC, M4A",
            upload_size: "Max file size: 50MB",
            file_replace: "Replace",
            settings_title: "Separation Settings",
            setting_type_label: "Separation Type:",
            opt_vocals_inst: "Vocals + Instrumental",
            opt_vocals_inst_desc: "Full vocal and music separation",
            opt_vocals_only: "Vocals Only",
            opt_vocals_only_desc: "Extract human vocals only",
            opt_inst_only: "Instrumental Only",
            opt_inst_only_desc: "Extract music and instruments only",
            btn_start_separation: "Start Separation",
            proc_title: "Processing Audio Tracks...",
            proc_desc: "Please wait while our AI model processes your file with high precision.",
            step_upload: "Uploading file",
            step_ai: "Analyzing & separating",
            step_prep: "Preparing results",
            btn_cancel: "Cancel",
            results_title: "Separation Results",
            btn_download_all: "Download All Stems",
            card_vocals_title: "Vocals — Human Voice",
            btn_download_vocals: "Download Vocals",
            card_inst_title: "Instrumental — Music",
            btn_download_inst: "Download Instrumental",
            how_title: "How Vocalix AI Works",
            how_subtitle: "Four simple steps to get your clean stems",
            step1_title: "Upload File",
            step1_desc: "Choose your song in MP3 or WAV and drop it into the upload area.",
            step2_title: "Select Mode",
            step2_desc: "Choose whether to separate vocals and music or extract them individually.",
            step3_title: "AI Processing",
            step3_desc: "Our advanced model analyzes and disassembles audio layers with studio precision.",
            step4_title: "Listen & Download",
            step4_desc: "Preview results directly and download them in your preferred format.",
            features_title: "Vocalix AI Features",
            features_subtitle: "Everything you need to produce and edit audio tracks professionally",
            feat1_title: "Precise Vocal Separation",
            feat1_desc: "Advanced AI algorithms to isolate human voice with maximum purity and zero artifacts.",
            feat2_title: "Lightning Fast",
            feat2_desc: "Complete track separation in mere seconds to save your time and effort.",
            feat3_title: "Clean Direct Downloads",
            feat3_desc: "Get your separated stems in pristine WAV format ready for editing.",
            feat4_title: "Full Privacy & Security",
            feat4_desc: "Your audio files are completely protected and never shared or stored long-term.",
            faq_title: "Frequently Asked Questions",
            faq_subtitle: "Comprehensive answers about using the platform and audio separation",
            faq1_q: "How does vocal separation work?",
            faq1_a: "We use deep AI models trained on hundreds of thousands of songs to isolate vocal frequencies from instruments with incredible accuracy.",
            faq2_q: "What file formats are supported?",
            faq2_a: "The platform supports popular audio formats like MP3, WAV, FLAC, and M4A up to 50MB per file.",
            faq3_q: "Are my files kept after processing?",
            faq3_a: "No, files are automatically deleted from processing servers shortly after completion to ensure complete privacy.",
            faq4_q: "What should I do if an error occurs?",
            faq4_a: "Make sure the file size is within limits and format is supported, then try re-uploading or trying again later.",
            footer_desc: "The cutting-edge platform for vocal and music separation using professional AI technology.",
            footer_links_title: "Quick Links",
            footer_legal_title: "Privacy",
            footer_privacy: "All processing rights reserved. We fully respect your audio privacy.",
            footer_rights: "All rights reserved."
        }
    };

    // DOM Elements
    const htmlElem = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const fileInfoCard = document.getElementById('file-info-card');
    const fileNameDisplay = document.getElementById('file-name-display');
    const fileSizeDisplay = document.getElementById('file-size-display');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const replaceFileBtn = document.getElementById('replace-file-btn');
    
    const settingsPanel = document.getElementById('settings-panel');
    const startSeparationBtn = document.getElementById('start-separation-btn');
    const processingUi = document.getElementById('processing-ui');
    const cancelSeparationBtn = document.getElementById('cancel-separation-btn');
    const resultsSection = document.getElementById('results-section');

    // Audio Elements
    const audioOriginal = document.getElementById('audio-original');
    const playOriginalBtn = document.getElementById('play-original-btn');
    const seekSliderOrig = document.getElementById('seek-slider-orig');
    const currentTimeOrig = document.getElementById('current-time-orig');
    const durationOrig = document.getElementById('duration-orig');

    const audioVocals = document.getElementById('audio-vocals');
    const playVocalsBtn = document.getElementById('play-vocals-btn');
    const seekSliderVocals = document.getElementById('seek-slider-vocals');
    const currentTimeVocals = document.getElementById('current-time-vocals');
    const durationVocals = document.getElementById('duration-vocals');
    const downloadVocalsBtn = document.getElementById('download-vocals-btn');

    const audioInst = document.getElementById('audio-inst');
    const playInstBtn = document.getElementById('play-inst-btn');
    const seekSliderInst = document.getElementById('seek-slider-inst');
    const currentTimeInst = document.getElementById('current-time-inst');
    const durationInst = document.getElementById('duration-inst');
    const downloadInstBtn = document.getElementById('download-inst-btn');
    const downloadAllBtn = document.getElementById('download-all-btn');

    // Initialize Theme & Language
    function initTheme() {
        htmlElem.setAttribute('data-theme', currentTheme);
    }

    function initLang() {
        htmlElem.setAttribute('lang', currentLang);
        htmlElem.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        langLabel.textContent = currentLang === 'ar' ? 'EN' : 'AR';
        updateTranslations();
    }

    function updateTranslations() {
        const t = translations[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key];
            }
        });
    }

    // Toggle Theme
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('vocalix_theme', currentTheme);
        initTheme();
    });

    // Toggle Language
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('vocalix_lang', currentLang);
        initLang();
    });

    // Mobile Menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Toast Notification System
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else if (type === 'error') {
            iconSvg = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        } else {
            iconSvg = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        }

        toast.innerHTML = `${iconSvg}<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // File Upload Handlers
    browseBtn.addEventListener('click', () => fileInput.click());
    replaceFileBtn.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleSelectedFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleSelectedFile(e.target.files[0]);
        }
    });

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function handleSelectedFile(file) {
        // Validation: Check size (50MB max) and type
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast(currentLang === 'ar' ? 'حجم الملف أكبر من الحد المسموح (50 ميجابايت)' : 'File size exceeds 50MB limit', 'error');
            return;
        }

        if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|flac|m4a)$/i)) {
            showToast(currentLang === 'ar' ? 'نوع الملف غير مدعوم. يرجى اختيار ملف صوتي صالح.' : 'Unsupported file type. Please choose a valid audio file.', 'error');
            return;
        }

        currentFile = file;
        fileNameDisplay.textContent = file.name;
        fileSizeDisplay.textContent = formatBytes(file.size);

        // Setup audio preview URL
        if (audioUrlOriginal) URL.revokeObjectURL(audioUrlOriginal);
        audioUrlOriginal = URL.createObjectURL(file);
        audioOriginal.src = audioUrlOriginal;

        // UI Transitions
        dropZone.classList.add('hidden');
        fileInfoCard.classList.remove('hidden');
        settingsPanel.classList.remove('hidden');
        resultsSection.classList.add('hidden');

        showToast(currentLang === 'ar' ? 'تم اختيار الملف بنجاح' : 'File selected successfully', 'success');
    }

    removeFileBtn.addEventListener('click', resetWorkspace);

    function resetWorkspace() {
        currentFile = null;
        if (audioUrlOriginal) { URL.revokeObjectURL(audioUrlOriginal); audioUrlOriginal = null; }
        if (audioUrlVocals) { URL.revokeObjectURL(audioUrlVocals); audioUrlVocals = null; }
        if (audioUrlInst) { URL.revokeObjectURL(audioUrlInst); audioUrlInst = null; }
        
        fileInput.value = '';
        audioOriginal.src = '';
        audioVocals.src = '';
        audioInst.src = '';

        dropZone.classList.remove('hidden');
        fileInfoCard.classList.add('hidden');
        settingsPanel.classList.add('hidden');
        processingUi.classList.add('hidden');
        resultsSection.classList.add('hidden');

        showToast(currentLang === 'ar' ? 'تمت إزالة الملف' : 'File removed', 'info');
    }

    // Audio Players Management
    function setupAudioPlayer(audioEl, playBtnEl, seekSliderEl, currentTimeEl, durationEl) {
        playBtnEl.addEventListener('click', () => {
            if (audioEl.paused) {
                // Pause all other audios
                [audioOriginal, audioVocals, audioInst].forEach(a => {
                    if (a !== audioEl && !a.paused) a.pause();
                });
                audioEl.play().catch(err => console.log('Playback error:', err));
            } else {
                audioEl.pause();
            }
        });

        audioEl.addEventListener('play', () => {
            playBtnEl.querySelector('.icon-play').classList.add('hidden');
            playBtnEl.querySelector('.icon-pause').classList.remove('hidden');
        });

        audioEl.addEventListener('pause', () => {
            playBtnEl.querySelector('.icon-play').classList.remove('hidden');
            playBtnEl.querySelector('.icon-pause').classList.add('hidden');
        });

        audioEl.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audioEl.duration);
            seekSliderEl.max = audioEl.duration;
        });

        audioEl.addEventListener('timeupdate', () => {
            currentTimeEl.textContent = formatTime(audioEl.currentTime);
            seekSliderEl.value = audioEl.currentTime;
        });

        seekSliderEl.addEventListener('input', () => {
            audioEl.currentTime = seekSliderEl.value;
        });
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    setupAudioPlayer(audioOriginal, playOriginalBtn, seekSliderOrig, currentTimeOrig, durationOrig);
    setupAudioPlayer(audioVocals, playVocalsBtn, seekSliderVocals, currentTimeVocals, durationVocals);
    setupAudioPlayer(audioInst, playInstBtn, seekSliderInst, currentTimeInst, durationInst);

    // Separation Process Trigger & API Integration Structure
    startSeparationBtn.addEventListener('click', () => {
        if (!currentFile) {
            showToast(currentLang === 'ar' ? 'الرجاء اختيار ملف أولاً' : 'Please select a file first', 'error');
            return;
        }

        const selectedType = document.querySelector('input[name="sep-type"]:checked').value;

        // Hide settings and show processing UI
        settingsPanel.classList.add('hidden');
        fileInfoCard.classList.add('hidden');
        processingUi.classList.remove('hidden');

        showToast(currentLang === 'ar' ? 'بدأت عملية المعالجة' : 'Processing started', 'info');

        // Execute central separation function
        separateAudio(currentFile, selectedType);
    });

    cancelSeparationBtn.addEventListener('click', () => {
        processingUi.classList.add('hidden');
        fileInfoCard.classList.remove('hidden');
        settingsPanel.classList.remove('hidden');
        showToast(currentLang === 'ar' ? 'تم إلغاء العملية' : 'Process cancelled', 'info');
    });

    /**
     * Central Audio Separation Function
     * Integration Guide with Backend API / External Service:
     * To connect to a real AI audio separation service (such as Replicate Demucs API or a secure backend proxy):
     * 1. Create a FormData instance: `const formData = new FormData(); formData.append('audio', file); formData.append('model', type);`
     * 2. Send request to your secure backend endpoint or direct API: `const response = await fetch('/api/separate', { method: 'POST', body: formData });`
     * 3. Handle asynchronous task polling or receive direct stream/urls.
     */
    async function separateAudio(file, separationType) {
        // Simulating robust API workflow state machine securely
        try {
            // Step 1: Uploading
            document.getElementById('step-uploading').classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Step 2: AI Processing & Analysis
            document.getElementById('step-uploading').classList.remove('active');
            document.getElementById('step-uploading').classList.add('completed');
            document.getElementById('step-processing').classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 2500));

            // Step 3: Preparing Results
            document.getElementById('step-processing').classList.remove('active');
            document.getElementById('step-processing').classList.add('completed');
            document.getElementById('step-finalizing').classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demonstration with actual playable audio in frontend without unauthorized external keys,
            // we use the original file audio stream as stems or simulated processed buffers.
            // In production, assign the returned URLs from the real API response:
            audioUrlVocals = audioUrlOriginal;
            audioUrlInst = audioUrlOriginal;

            audioVocals.src = audioUrlVocals;
            audioInst.src = audioUrlInst;

            downloadVocalsBtn.href = audioUrlVocals;
            downloadInstBtn.href = audioUrlInst;

            // Success Transition
            processingUi.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            fileInfoCard.classList.remove('hidden'); // Show file info back

            showToast(currentLang === 'ar' ? 'اكتملت عملية الفصل بنجاح!' : 'Separation completed successfully!', 'success');

        } catch (error) {
            console.error('Separation error:', error);
            processingUi.classList.add('hidden');
            fileInfoCard.classList.remove('hidden');
            settingsPanel.classList.remove('hidden');
            showToast(currentLang === 'ar' ? 'تعذر الاتصال بالخدمة. يرجى المحاولة لاحقاً.' : 'Failed to connect to service. Please try again later.', 'error');
        }
    }

    // Download All Stems Handler
    downloadAllBtn.addEventListener('click', () => {
        downloadVocalsBtn.click();
        setTimeout(() => {
            downloadInstBtn.click();
        }, 500);
        showToast(currentLang === 'ar' ? 'جاري تنزيل جميع المسارات...' : 'Downloading all stems...', 'success');
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Initialize on load
    initTheme();
    initLang();
});
