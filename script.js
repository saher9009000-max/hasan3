/* ============ 1. قائمة اللغات (أكثر من 140 لغة) ============ */
const LANGUAGES = [
  { code: 'ar', native: 'العربية', en: 'Arabic', dir: 'rtl' },
  { code: 'en', native: 'English', en: 'English', dir: 'ltr' },
  { code: 'fr', native: 'Français', en: 'French', dir: 'ltr' },
  { code: 'es', native: 'Español', en: 'Spanish', dir: 'ltr' },
  { code: 'de', native: 'Deutsch', en: 'German', dir: 'ltr' },
  { code: 'tr', native: 'Türkçe', en: 'Turkish', dir: 'ltr' },
  { code: 'it', native: 'Italiano', en: 'Italian', dir: 'ltr' },
  { code: 'pt', native: 'Português', en: 'Portuguese', dir: 'ltr' },
  { code: 'ru', native: 'Русский', en: 'Russian', dir: 'ltr' },
  { code: 'zh', native: '中文', en: 'Chinese', dir: 'ltr' },
  { code: 'ja', native: '日本語', en: 'Japanese', dir: 'ltr' },
  { code: 'ko', native: '한국어', en: 'Korean', dir: 'ltr' },
  { code: 'hi', native: 'हिन्दी', en: 'Hindi', dir: 'ltr' },
  { code: 'ur', native: 'اردو', en: 'Urdu', dir: 'rtl' },
  { code: 'fa', native: 'فارسی', en: 'Persian', dir: 'rtl' },
  { code: 'he', native: 'עברית', en: 'Hebrew', dir: 'rtl' },
  { code: 'nl', native: 'Nederlands', en: 'Dutch', dir: 'ltr' },
  { code: 'pl', native: 'Polski', en: 'Polish', dir: 'ltr' },
  { code: 'sv', native: 'Svenska', en: 'Swedish', dir: 'ltr' },
  { code: 'no', native: 'Norsk', en: 'Norwegian', dir: 'ltr' },
  { code: 'da', native: 'Dansk', en: 'Danish', dir: 'ltr' },
  { code: 'fi', native: 'Suomi', en: 'Finnish', dir: 'ltr' },
  { code: 'el', native: 'Ελληνικά', en: 'Greek', dir: 'ltr' },
  { code: 'cs', native: 'Čeština', en: 'Czech', dir: 'ltr' },
  { code: 'ro', native: 'Română', en: 'Romanian', dir: 'ltr' },
  { code: 'hu', native: 'Magyar', en: 'Hungarian', dir: 'ltr' },
  { code: 'uk', native: 'Українська', en: 'Ukrainian', dir: 'ltr' },
  { code: 'id', native: 'Bahasa Indonesia', en: 'Indonesian', dir: 'ltr' },
  { code: 'ms', native: 'Bahasa Melayu', en: 'Malay', dir: 'ltr' },
  { code: 'th', native: 'ไทย', en: 'Thai', dir: 'ltr' },
  { code: 'vi', native: 'Tiếng Việt', en: 'Vietnamese', dir: 'ltr' },
  { code: 'bn', native: 'বাংলা', en: 'Bengali', dir: 'ltr' },
  { code: 'ta', native: 'தமிழ்', en: 'Tamil', dir: 'ltr' },
  { code: 'te', native: 'తెలుగు', en: 'Telugu', dir: 'ltr' },
  { code: 'mr', native: 'मराठी', en: 'Marathi', dir: 'ltr' },
  { code: 'gu', native: 'ગુજરાતી', en: 'Gujarati', dir: 'ltr' },
  { code: 'kn', native: 'ಕನ್ನಡ', en: 'Kannada', dir: 'ltr' },
  { code: 'ml', native: 'മലയാളം', en: 'Malayalam', dir: 'ltr' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', en: 'Punjabi', dir: 'ltr' },
  { code: 'sw', native: 'Kiswahili', en: 'Swahili', dir: 'ltr' },
  { code: 'am', native: 'አማርኛ', en: 'Amharic', dir: 'ltr' },
  { code: 'ha', native: 'Hausa', en: 'Hausa', dir: 'ltr' },
  { code: 'yo', native: 'Yorùbá', en: 'Yoruba', dir: 'ltr' },
  { code: 'ig', native: 'Igbo', en: 'Igbo', dir: 'ltr' },
  { code: 'zu', native: 'isiZulu', en: 'Zulu', dir: 'ltr' },
  { code: 'af', native: 'Afrikaans', en: 'Afrikaans', dir: 'ltr' },
  { code: 'bg', native: 'Български', en: 'Bulgarian', dir: 'ltr' },
  { code: 'hr', native: 'Hrvatski', en: 'Croatian', dir: 'ltr' },
  { code: 'sk', native: 'Slovenčina', en: 'Slovak', dir: 'ltr' },
  { code: 'sl', native: 'Slovenščina', en: 'Slovenian', dir: 'ltr' },
  { code: 'sr', native: 'Српски', en: 'Serbian', dir: 'ltr' },
  { code: 'lt', native: 'Lietuvių', en: 'Lithuanian', dir: 'ltr' },
  { code: 'lv', native: 'Latviešu', en: 'Latvian', dir: 'ltr' },
  { code: 'et', native: 'Eesti', en: 'Estonian', dir: 'ltr' },
  { code: 'ka', native: 'ქართული', en: 'Georgian', dir: 'ltr' },
  { code: 'hy', native: 'Հայերեն', en: 'Armenian', dir: 'ltr' },
  { code: 'az', native: 'Azərbaycan', en: 'Azerbaijani', dir: 'ltr' },
  { code: 'kk', native: 'Қазақ', en: 'Kazakh', dir: 'ltr' },
  { code: 'uz', native: 'Oʻzbek', en: 'Uzbek', dir: 'ltr' },
  { code: 'ky', native: 'Кыргызча', en: 'Kyrgyz', dir: 'ltr' },
  { code: 'tg', native: 'Тоҷикӣ', en: 'Tajik', dir: 'ltr' },
  { code: 'mn', native: 'Монгол', en: 'Mongolian', dir: 'ltr' },
  { code: 'ne', native: 'नेपाली', en: 'Nepali', dir: 'ltr' },
  { code: 'si', native: 'සිංහල', en: 'Sinhala', dir: 'ltr' },
  { code: 'my', native: 'မြန်မာ', en: 'Burmese', dir: 'ltr' },
  { code: 'km', native: 'ខ្មែរ', en: 'Khmer', dir: 'ltr' },
  { code: 'lo', native: 'ລາວ', en: 'Lao', dir: 'ltr' },
  { code: 'tl', native: 'Filipino', en: 'Filipino', dir: 'ltr' },
  { code: 'jv', native: 'Basa Jawa', en: 'Javanese', dir: 'ltr' },
  { code: 'su', native: 'Basa Sunda', en: 'Sundanese', dir: 'ltr' },
  { code: 'ceb', native: 'Cebuano', en: 'Cebuano', dir: 'ltr' },
  { code: 'eu', native: 'Euskara', en: 'Basque', dir: 'ltr' },
  { code: 'ca', native: 'Català', en: 'Catalan', dir: 'ltr' },
  { code: 'gl', native: 'Galego', en: 'Galician', dir: 'ltr' },
  { code: 'cy', native: 'Cymraeg', en: 'Welsh', dir: 'ltr' },
  { code: 'ga', native: 'Gaeilge', en: 'Irish', dir: 'ltr' },
  { code: 'gd', native: 'Gàidhlig', en: 'Scottish Gaelic', dir: 'ltr' },
  { code: 'is', native: 'Íslenska', en: 'Icelandic', dir: 'ltr' },
  { code: 'mt', native: 'Malti', en: 'Maltese', dir: 'ltr' },
  { code: 'sq', native: 'Shqip', en: 'Albanian', dir: 'ltr' },
  { code: 'mk', native: 'Македонски', en: 'Macedonian', dir: 'ltr' },
  { code: 'bs', native: 'Bosanski', en: 'Bosnian', dir: 'ltr' },
  { code: 'be', native: 'Беларуская', en: 'Belarusian', dir: 'ltr' },
  { code: 'lb', native: 'Lëtzebuergesch', en: 'Luxembourgish', dir: 'ltr' },
  { code: 'fo', native: 'Føroyskt', en: 'Faroese', dir: 'ltr' },
  { code: 'yi', native: 'ייִדיש', en: 'Yiddish', dir: 'rtl' },
  { code: 'ps', native: 'پښتو', en: 'Pashto', dir: 'rtl' },
  { code: 'ku', native: 'Kurdî', en: 'Kurdish', dir: 'rtl' },
  { code: 'sd', native: 'سنڌي', en: 'Sindhi', dir: 'rtl' },
  { code: 'ug', native: 'ئۇيغۇرچە', en: 'Uyghur', dir: 'rtl' },
  { code: 'ckb', native: 'کوردی', en: 'Sorani Kurdish', dir: 'rtl' },
  { code: 'dv', native: 'ދިވެހި', en: 'Dhivehi', dir: 'rtl' },
  { code: 'so', native: 'Soomaali', en: 'Somali', dir: 'ltr' },
  { code: 'mg', native: 'Malagasy', en: 'Malagasy', dir: 'ltr' },
  { code: 'ny', native: 'Chichewa', en: 'Chichewa', dir: 'ltr' },
  { code: 'sn', native: 'chiShona', en: 'Shona', dir: 'ltr' },
  { code: 'st', native: 'Sesotho', en: 'Sotho', dir: 'ltr' },
  { code: 'xh', native: 'isiXhosa', en: 'Xhosa', dir: 'ltr' },
  { code: 'rw', native: 'Kinyarwanda', en: 'Kinyarwanda', dir: 'ltr' },
  { code: 'ti', native: 'ትግርኛ', en: 'Tigrinya', dir: 'ltr' },
  { code: 'om', native: 'Afaan Oromoo', en: 'Oromo', dir: 'ltr' },
  { code: 'ht', native: 'Kreyòl Ayisyen', en: 'Haitian Creole', dir: 'ltr' },
  { code: 'la', native: 'Latina', en: 'Latin', dir: 'ltr' },
  { code: 'eo', native: 'Esperanto', en: 'Esperanto', dir: 'ltr' },
  { code: 'haw', native: 'ʻŌlelo Hawaiʻi', en: 'Hawaiian', dir: 'ltr' },
  { code: 'mi', native: 'Te Reo Māori', en: 'Maori', dir: 'ltr' },
  { code: 'sm', native: 'Gagana Samoa', en: 'Samoan', dir: 'ltr' },
  { code: 'to', native: 'Lea Fakatonga', en: 'Tongan', dir: 'ltr' },
  { code: 'fj', native: 'Vosa Vakaviti', en: 'Fijian', dir: 'ltr' },
  { code: 'qu', native: 'Runasimi', en: 'Quechua', dir: 'ltr' },
  { code: 'ay', native: 'Aymar aru', en: 'Aymara', dir: 'ltr' },
  { code: 'gn', native: "Avañe'ẽ", en: 'Guarani', dir: 'ltr' },
  { code: 'nah', native: 'Nāhuatl', en: 'Nahuatl', dir: 'ltr' },
  { code: 'iu', native: 'ᐃᓄᒃᑎᑐᑦ', en: 'Inuktitut', dir: 'ltr' },
  { code: 'kl', native: 'Kalaallisut', en: 'Greenlandic', dir: 'ltr' },
  { code: 'bo', native: 'བོད་སྐད', en: 'Tibetan', dir: 'ltr' },
  { code: 'dz', native: 'རྫོང་ཁ', en: 'Dzongkha', dir: 'ltr' },
  { code: 'tt', native: 'Татарча', en: 'Tatar', dir: 'ltr' },
  { code: 'ba', native: 'Башҡорт', en: 'Bashkir', dir: 'ltr' },
  { code: 'cv', native: 'Чӑвашла', en: 'Chuvash', dir: 'ltr' },
  { code: 'ce', native: 'Нохчийн', en: 'Chechen', dir: 'ltr' },
  { code: 'os', native: 'Ирон', en: 'Ossetian', dir: 'ltr' },
  { code: 'ab', native: 'Аҧсуа', en: 'Abkhaz', dir: 'ltr' },
  { code: 'av', native: 'Авар', en: 'Avar', dir: 'ltr' },
  { code: 'kab', native: 'Taqbaylit', en: 'Kabyle', dir: 'ltr' },
  { code: 'tzm', native: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', en: 'Tamazight', dir: 'ltr' },
  { code: 'ber', native: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', en: 'Berber', dir: 'ltr' },
  { code: 'wo', native: 'Wolof', en: 'Wolof', dir: 'ltr' },
  { code: 'ff', native: 'Fulfulde', en: 'Fula', dir: 'ltr' },
  { code: 'bm', native: 'Bamanankan', en: 'Bambara', dir: 'ltr' },
  { code: 'tw', native: 'Twi', en: 'Twi', dir: 'ltr' },
  { code: 'ee', native: 'Eʋegbe', en: 'Ewe', dir: 'ltr' },
  { code: 'lg', native: 'Luganda', en: 'Luganda', dir: 'ltr' },
  { code: 'ak', native: 'Akan', en: 'Akan', dir: 'ltr' },
  { code: 'ln', native: 'Lingála', en: 'Lingala', dir: 'ltr' },
  { code: 'kg', native: 'Kikongo', en: 'Kongo', dir: 'ltr' },
  { code: 'lu', native: 'Kiluba', en: 'Luba', dir: 'ltr' },
  { code: 'nso', native: 'Sepedi', en: 'Sepedi', dir: 'ltr' },
  { code: 'ts', native: 'Xitsonga', en: 'Tsonga', dir: 'ltr' },
  { code: 've', native: 'Tshivenda', en: 'Venda', dir: 'ltr' },
  { code: 'tn', native: 'Setswana', en: 'Tswana', dir: 'ltr' },
  { code: 'ss', native: 'siSwati', en: 'Swati', dir: 'ltr' },
  { code: 'nr', native: 'isiNdebele', en: 'Ndebele', dir: 'ltr' },
];

/* ============ 2. نصوص الواجهة القابلة للترجمة ============ */
const TRANSLATIONS = {
  ar: {
    heroTitle: 'ترجم أي شيء بدقة احترافية',
    heroSub: 'ترجمة فورية بالذكاء الاصطناعي تدعم أكثر من 140 لغة — نصوص، ملفات، صور وصوت.',
    tabText: 'نص', tabFiles: 'ملفات',
    translateNow: 'ترجم الآن',
    placeholderText: 'اكتب النص هنا...',
    dropTitle: 'اسحب وأفلت ملفك هنا',
    dropHint: 'يدعم: PDF, DOCX, TXT — صور PNG/JPG — صوت MP3/WAV/M4A',
    browse: 'اختر ملفاً',
    translating: 'جارٍ الترجمة...',
    resultTitle: 'النتيجة',
    copy: 'نسخ', download: 'تنزيل',
    privacy: 'الخصوصية', terms: 'الشروط', contact: 'اتصل بنا',
    footerCopy: '© 2026 LinguaPro — جميع الحقوق محفوظة',
    langPlaceholder: 'ابحث عن لغة...',
    copied: '✅ تم النسخ!',
    done: '✅ اكتملت الترجمة!',
    empty: '⚠️ يرجى إدخال نص أو اختيار ملف أولاً'
  },
  en: {
    heroTitle: 'Translate Anything with Professional Accuracy',
    heroSub: 'Instant AI translation supporting 140+ languages — text, files, images and audio.',
    tabText: 'Text', tabFiles: 'Files',
    translateNow: 'Translate Now',
    placeholderText: 'Type your text here...',
    dropTitle: 'Drag & drop your file here',
    dropHint: 'Supports: PDF, DOCX, TXT — PNG/JPG — MP3/WAV/M4A',
    browse: 'Browse file',
    translating: 'Translating...',
    resultTitle: 'Result',
    copy: 'Copy', download: 'Download',
    privacy: 'Privacy', terms: 'Terms', contact: 'Contact',
    footerCopy: '© 2026 LinguaPro — All rights reserved',
    langPlaceholder: 'Search a language...',
    copied: '✅ Copied!',
    done: '✅ Translation complete!',
    empty: '⚠️ Please enter text or choose a file first'
  },
  fr: {
    heroTitle: 'Traduisez tout avec une précision professionnelle',
    heroSub: "Traduction IA instantanée en 140+ langues — texte, fichiers, images et audio.",
    tabText: 'Texte', tabFiles: 'Fichiers',
    translateNow: 'Traduire',
    placeholderText: 'Écrivez votre texte ici...',
    dropTitle: 'Glissez-déposez votre fichier ici',
    dropHint: 'Prend en charge : PDF, DOCX, TXT — PNG/JPG — MP3/WAV/M4A',
    browse: 'Choisir un fichier',
    translating: 'Traduction...',
    resultTitle: 'Résultat',
    copy: 'Copier', download: 'Télécharger',
    privacy: 'Confidentialité', terms: 'Conditions', contact: 'Contact',
    footerCopy: '© 2026 LinguaPro — Tous droits réservés',
    langPlaceholder: 'Rechercher une langue...',
    copied: '✅ Copié !', done: '✅ Traduction terminée !',
    empty: '⚠️ Veuillez saisir un texte ou choisir un fichier'
  },
  es: {
    heroTitle: 'Traduce cualquier cosa con precisión profesional',
    heroSub: 'Traducción instantánea con IA en más de 140 idiomas — texto, archivos, imágenes y audio.',
    tabText: 'Texto', tabFiles: 'Archivos',
    translateNow: 'Traducir',
    placeholderText: 'Escribe tu texto aquí...',
    dropTitle: 'Arrastra y suelta tu archivo aquí',
    dropHint: 'Compatible: PDF, DOCX, TXT — PNG/JPG — MP3/WAV/M4A',
    browse: 'Elegir archivo',
    translating: 'Traduciendo...',
    resultTitle: 'Resultado',
    copy: 'Copiar', download: 'Descargar',
    privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto',
    footerCopy: '© 2026 LinguaPro — Todos los derechos reservados',
    langPlaceholder: 'Buscar idioma...',
    copied: '✅ ¡Copiado!', done: '✅ ¡Traducción completada!',
    empty: '⚠️ Introduce un texto o elige un archivo'
  },
  de: {
    heroTitle: 'Übersetze alles mit professioneller Präzision',
    heroSub: 'Sofortige KI-Übersetzung in über 140 Sprachen — Text, Dateien, Bilder und Audio.',
    tabText: 'Text', tabFiles: 'Dateien',
    translateNow: 'Übersetzen',
    placeholderText: 'Text hier eingeben...',
    dropTitle: 'Datei hierher ziehen',
    dropHint: 'Unterstützt: PDF, DOCX, TXT — PNG/JPG — MP3/WAV/M4A',
    browse: 'Datei wählen',
    translating: 'Übersetze...',
    resultTitle: 'Ergebnis',
    copy: 'Kopieren', download: 'Herunterladen',
    privacy: 'Datenschutz', terms: 'Bedingungen', contact: 'Kontakt',
    footerCopy: '© 2026 LinguaPro — Alle Rechte vorbehalten',
    langPlaceholder: 'Sprache suchen...',
    copied: '✅ Kopiert!', done: '✅ Übersetzung fertig!',
    empty: '⚠️ Bitte Text eingeben oder Datei wählen'
  },
  tr: {
    heroTitle: 'Her şeyi profesyonel doğrulukla çevir',
    heroSub: "140'tan fazla dilde anında AI çevirisi — metin, dosya, görsel ve ses.",
    tabText: 'Metin', tabFiles: 'Dosyalar',
    translateNow: 'Çevir',
    placeholderText: 'Metninizi buraya yazın...',
    dropTitle: 'Dosyanızı buraya sürükleyin',
    dropHint: 'Destekler: PDF, DOCX, TXT — PNG/JPG — MP3/WAV/M4A',
    browse: 'Dosya seç',
    translating: 'Çevriliyor...',
    resultTitle: 'Sonuç',
    copy: 'Kopyala', download: 'İndir',
    privacy: 'Gizlilik', terms: 'Şartlar', contact: 'İletişim',
    footerCopy: '© 2026 LinguaPro — Tüm hakları saklıdır',
    langPlaceholder: 'Dil ara...',
    copied: '✅ Kopyalandı!', done: '✅ Çeviri tamamlandı!',
    empty: '⚠️ Lütfen metin girin veya dosya seçin'
  }
};

/* ============ 3. الحالة ============ */
let currentLang = 'ar';
let selectedFile = null;

/* ============ 4. عناصر DOM ============ */
const $ = (sel) => document.querySelector(sel);
const langBtn = $('#langBtn');
const langDropdown = $('#langDropdown');
const langList = $('#langList');
const langSearch = $('#langSearch');
const currentLangLabel = $('#currentLangLabel');
const sourceText = $('#sourceText');
const translateTextBtn = $('#translateTextBtn');
const translateFileBtn = $('#translateFileBtn');
const dropzone = $('#dropzone');
const fileInput = $('#fileInput');
const filePreview = $('#filePreview');
const fileName = $('#fileName');
const fileSize = $('#fileSize');
const fileIcon = $('#fileIcon');
const removeFile = $('#removeFile');
const progressWrap = $('#progressWrap');
const progressFill = $('#progressFill');
const result = $('#result');
const resultText = $('#resultText');
const copyBtn = $('#copyBtn');
const downloadBtn = $('#downloadBtn');
const toast = $('#toast');

/* ============ 5. بناء قائمة اللغات ============ */
function renderLanguages(filter = '') {
  const q = filter.toLowerCase().trim();
  langList.innerHTML = '';
  LANGUAGES
    .filter(l => !q || l.native.toLowerCase().includes(q) || l.en.toLowerCase().includes(q))
    .forEach(lang => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.dataset.code = lang.code;
      if (lang.code === currentLang) li.classList.add('active');
      li.innerHTML = `<span class="lang-native">${lang.native}</span><span class="lang-en">${lang.en}</span>`;
      li.addEventListener('click', () => selectLanguage(lang.code));
      langList.appendChild(li);
    });

  if (!langList.children.length) {
    langList.innerHTML = '<li style="justify-content:center;color:#94A3B8">لا نتائج</li>';
  }
}

/* ============ 6. اختيار اللغة ============ */
function selectLanguage(code) {
  const lang = LANGUAGES.find(l => l.code === code);
  if (!lang) return;

  currentLang = code;
  currentLangLabel.textContent = lang.native;
  document.documentElement.lang = code;
  document.documentElement.dir = lang.dir;
  document.body.dir = lang.dir;

  // ترجمة الواجهة (إن وُجدت الترجمة)
  const t = TRANSLATIONS[code] || TRANSLATIONS.en;
  applyTranslations(t);

  // حفظ التفضيل
  localStorage.setItem('lingua_lang', code);

  // إغلاق القائمة
  closeDropdown();
  renderLanguages(langSearch.value);
}

/* ============ 7. تطبيق الترجمات ============ */
function applyTranslations(t) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });
  if (langSearch) langSearch.placeholder = t.langPlaceholder || 'Search...';
}

/* ============ 8. فتح/إغلاق القائمة ============ */
function openDropdown() {
  langDropdown.classList.add('open');
  langBtn.classList.add('open');
  langBtn.setAttribute('aria-expanded', 'true');
  langSearch.value = '';
  renderLanguages();
  setTimeout(() => langSearch.focus(), 50);
}
function closeDropdown() {
  langDropdown.classList.remove('open');
  langBtn.classList.remove('open');
  langBtn.setAttribute('aria-expanded', 'false');
}
langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.contains('open') ? closeDropdown() : openDropdown();
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('#langSwitcher')) closeDropdown();
});
langSearch.addEventListener('input', (e) => renderLanguages(e.target.value));

/* ============ 9. التبويبات ============ */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('panel-' + tab.dataset.tab).classList.remove('hidden');
  });
});

/* ============ 10. رفع الملفات ============ */
dropzone.addEventListener('click', (e) => {
  if (e.target.closest('label')) return;
  fileInput.click();
});
fileInput.addEventListener('change', (e) => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
});
['dragenter', 'dragover'].forEach(ev =>
  dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.add('drag'); })
);
['dragleave', 'drop'].forEach(ev =>
  dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.remove('drag'); })
);
dropzone.addEventListener('drop', (e) => {
  const f = e.dataTransfer.files[0];
  if (f) handleFile(f);
});

function handleFile(file) {
  selectedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatSize(file.size);
  fileIcon.textContent = getFileIcon(file.type, file.name);
  filePreview.classList.remove('hidden');
  translateFileBtn.disabled = false;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}
function getFileIcon(type, name) {
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('audio/')) return '🎵';
  if (name.endsWith('.pdf')) return '📕';
  if (name.endsWith('.docx')) return '📘';
  return '📄';
}

removeFile.addEventListener('click', () => {
  selectedFile = null;
  fileInput.value = '';
  filePreview.classList.add('hidden');
  translateFileBtn.disabled = true;
});

/* ============ 11. محاكاة الترجمة ============ */
function simulateTranslation(sourceLabel) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  result.classList.add('hidden');
  progressWrap.classList.remove('hidden');
  progressFill.style.width = '0%';
  document.getElementById('progressText').textContent = t.translating || 'Translating...';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => finishTranslation(sourceLabel, t), 400);
    }
    progressFill.style.width = progress + '%';
  }, 280);
}

function finishTranslation(sourceLabel, t) {
  progressWrap.classList.add('hidden');
  const lang = LANGUAGES.find(l => l.code === currentLang);
  resultText.textContent =
    `✅ [محاكاة ترجمة — ${lang?.native || currentLang}]\n\n` +
    `📥 المصدر: ${sourceLabel}\n` +
    `🌐 اللغة الهدف: ${lang?.native} (${lang?.en})\n` +
    `📅 التاريخ: ${new Date().toLocaleString()}\n\n` +
    `هذا نص تجريبي يوضح كيف ستظهر الترجمة الاحترافية هنا بعد ربط الخدمة الفعلية (DeepL / Google Translate API / OpenAI).`;

  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast(t.done || '✅ Done!');
}

/* ============ 12. أزرار الترجمة ============ */
translateTextBtn.addEventListener('click', () => {
  const text = sourceText.value.trim();
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  if (!text) { showToast(t.empty || '⚠️ Empty'); return; }
  simulateTranslation(`نص (${text.length} حرف)`);
});

translateFileBtn.addEventListener('click', () => {
  if (!selectedFile) return;
  simulateTranslation(selectedFile.name);
});

/* ============ 13. نسخ وتنزيل ============ */
copyBtn.addEventListener('click', async () => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  try {
    await navigator.clipboard.writeText(resultText.textContent);
    showToast(t.copied || '✅ Copied!');
  } catch {
    showToast('⚠️ Copy failed');
  }
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([resultText.textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `translation-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

/* ============ 14. Toast ============ */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ============ 15. التهيئة ============ */
(function init() {
  const saved = localStorage.getItem('lingua_lang') || 'ar';
  renderLanguages();
  selectLanguage(saved);
})();
