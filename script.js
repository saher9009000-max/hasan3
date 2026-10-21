// ===== اللغات =====
const LANGUAGES = {
  ar:"العربية", en:"الإنجليزية", fr:"الفرنسية", es:"الإسبانية", de:"الألمانية",
  it:"الإيطالية", pt:"البرتغالية", ru:"الروسية", zh:"الصينية (مبسطة)",
  "zh-TW":"الصينية (تقليدية)", ja:"اليابانية", ko:"الكورية", tr:"التركية",
  hi:"الهندية", ur:"الأردية", fa:"الفارسية", nl:"الهولندية", sv:"السويدية",
  pl:"البولندية", uk:"الأوكرانية", ro:"الرومانية", el:"اليونانية", he:"العبرية",
  th:"التايلاندية", vi:"الفيتنامية", id:"الإندونيسية", ms:"الماليزية",
  bn:"البنغالية", ta:"التاميلية", te:"التيلوغوية", ml:"المالايالامية",
  kn:"الكانادية", gu:"الغوجاراتية", mr:"الماراثية", pa:"البنجابية",
  ne:"النيبالية", si:"السنهالية", my:"البورمية", km:"الخميرية", lo:"اللاوية",
  sw:"السواحيلية", am:"الأمهرية", so:"الصومالية", ha:"الهوسا", yo:"اليوروبا",
  ig:"الإيبو", zu:"الزولو", af:"الأفريكانية", no:"النرويجية", da:"الدنماركية",
  fi:"الفنلندية", is:"الأيسلندية", cs:"التشيكية", sk:"السلوفاكية", hu:"المجرية",
  bg:"البلغارية", sr:"الصربية", hr:"الكرواتية", sl:"السلوفينية",
  bs:"البوسنية", mk:"المقدونية", sq:"الألبانية", lt:"الليتوانية",
  lv:"اللاتفية", et:"الإستونية", be:"البيلاروسية", ka:"الجورجية",
  hy:"الأرمنية", az:"الأذربيجانية", kk:"الكازاخية", uz:"الأوزبكية",
  ky:"القرغيزية", tg:"الطاجيكية", mn:"المنغولية", ps:"الباشتوية", ku:"الكردية",
  ca:"الكاتالونية", gl:"الغاليسية", eu:"الباسكية", mt:"المالطية",
  ga:"الأيرلندية", cy:"الويلزية", la:"اللاتينية", eo:"الإسبرانتو",
  tl:"الفلبينية", jv:"الجاوية", su:"السوندية", ceb:"السيبوانية",
  mi:"الماورية", haw:"الهاوايية", sm:"الساموية", fj:"الفيدجية",
  yi:"اليديشية", lb:"اللوكسمبورغية", mg:"الملغاشية", ny:"الشيشيوا"
};

const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const fileInput = document.getElementById("fileInput");
const progressWrap = document.getElementById("progressWrap");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const progressPct = document.getElementById("progressPct");
const stopBtn = document.getElementById("stopBtn");
const engineSelect = document.getElementById("engineSelect");
const keyStatus = document.getElementById("keyStatus");

let abortFlag = false;

// ===== إعدادات المفاتيح =====
let CONFIG = {
  mymemory: [],
  deepl: "",
  google: ""
};

// تحميل المفاتيح من التخزين
function loadConfig() {
  const saved = localStorage.getItem("translate_config");
  if (saved) {
    try { CONFIG = { ...CONFIG, ...JSON.parse(saved) }; } catch {}
  }
  document.getElementById("mymemoryKeys").value = CONFIG.mymemory.join("\n");
  document.getElementById("deeplKey").value = CONFIG.deepl;
  document.getElementById("googleKey").value = CONFIG.google;
}
loadConfig();

// حفظ المفاتيح
document.getElementById("saveKeys").onclick = () => {
  CONFIG.mymemory = document.getElementById("mymemoryKeys").value
    .split("\n").map(s => s.trim()).filter(Boolean);
  CONFIG.deepl = document.getElementById("deeplKey").value.trim();
  CONFIG.google = document.getElementById("googleKey").value.trim();
  localStorage.setItem("translate_config", JSON.stringify(CONFIG));
  keyStatus.textContent = `✅ تم حفظ ${CONFIG.mymemory.length} مفتاح MyMemory`;
  setTimeout(() => keyStatus.textContent = "", 3000);
};

document.getElementById("keysBtn").onclick = () => {
  const p = document.getElementById("keysPanel");
  p.hidden = !p.hidden;
};
document.getElementById("closeKeys").onclick = () => {
  document.getElementById("keysPanel").hidden = true;
};

// ===== توزيع مفاتيح MyMemory =====
let mmIndex = 0;
function nextMMKey() {
  if (!CONFIG.mymemory.length) return "";
  const k = CONFIG.mymemory[mmIndex % CONFIG.mymemory.length];
  mmIndex++;
  return k;
}

// ===== ملء القوائم =====
const sorted = Object.entries(LANGUAGES).sort((a,b) => a[1].localeCompare(b[1],"ar"));
for (const [code, name] of sorted) {
  fromLang.innerHTML += `<option value="${code}">${name}</option>`;
  toLang.innerHTML += `<option value="${code}">${name}</option>`;
}
fromLang.value = "ar";
toLang.value = "en";

// تبديل
document.getElementById("swapBtn").onclick = () => {
  [fromLang.value, toLang.value] = [toLang.value, fromLang.value];
  [inputText.value, outputText.value] = [outputText.value, inputText.value];
};

// ===== محركات الترجمة =====

// MyMemory
async function translateMyMemory(text, from, to) {
  const key = nextMMKey();
  let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  if (key) url += `&de=${encodeURIComponent(key)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.responseData?.translatedText || "";
}

// DeepL
async function translateDeepL(text, from, to) {
  if (!CONFIG.deepl) throw new Error("أضف مفتاح DeepL من زر إدارة المفاتيح");
  const url = CONFIG.deepl.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";
  const body = new URLSearchParams();
  body.append("text", text);
  body.append("source_lang", from.toUpperCase());
  body.append("target_lang", to.toUpperCase());
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${CONFIG.deepl}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  if (!res.ok) throw new Error("مفتاح DeepL غير صالح أو تجاوزت الحد");
  const data = await res.json();
  return data.translations?.[0]?.text || "";
}

// Google
async function translateGoogle(text, from, to) {
  if (!CONFIG.google) throw new Error("أضف مفتاح Google من زر إدارة المفاتيح");
  const url = `https://translation.googleapis.com/language/translate/v2?key=${CONFIG.google}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source: from, target: to, format: "text" })
  });
  if (!res.ok) throw new Error("مفتاح Google غير صالح أو تجاوزت الحد");
  const data = await res.json();
  return data.data?.translations?.[0]?.translatedText || "";
}

// موزّع المحركات
async function translateChunk(text, from, to) {
  const engine = engineSelect.value;
  if (engine === "deepl") return translateDeepL(text, from, to);
  if (engine === "google") return translateGoogle(text, from, to);
  return translateMyMemory(text, from, to);
}

// ===== تقسيم النص =====
function splitText(text, max = 450) {
  const parts = [];
  let current = "";
  const sentences = text.split(/(?<=[.!?؟\n])\s+/);
  for (const s of sentences) {
    if ((current + s).length > max) {
      if (current) parts.push(current.trim());
      if (s.length > max) {
        let chunk = "";
        for (const word of s.split(/\s+/)) {
          if ((chunk + " " + word).length > max) {
            if (chunk) parts.push(chunk.trim());
            chunk = word;
          } else chunk += " " + word;
        }
        if (chunk.trim()) parts.push(chunk.trim());
      } else { current = s; }
    } else { current += s + " "; }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

// ===== تقدم =====
function setProgress(done, total) {
  progressWrap.hidden = false;
  const pct = total ? Math.round((done / total) * 100) : 0;
  progressFill.style.width = pct + "%";
  progressPct.textContent = pct + "%";
  progressLabel.textContent = `جارٍ الترجمة... (${done}/${total} مقطع)`;
}
function hideProgress() {
  progressWrap.hidden = true;
  progressFill.style.width = "0%";
}

// ===== ترجمة الكل =====
async function translateAll(text, from, to) {
  const chunks = splitText(text);
  let result = "";
  abortFlag = false;
  setProgress(0, chunks.length);

  for (let i = 0; i < chunks.length; i++) {
    if (abortFlag) break;
    let t = "";
    try { t = await translateChunk(chunks[i], from, to); }
    catch (e) {
      t = `[خطأ: ${e.message}] ${chunks[i]}`;
    }
    result += t + "\n";
    setProgress(i + 1, chunks.length);
    await new Promise(r => setTimeout(r, 250));
  }
  return result.trim();
}

// زر ترجم الآن
document.getElementById("translateBtn").onclick = async () => {
  const text = inputText.value.trim();
  if (!text) return alert("اكتب نصاً أو استورد ملفاً أولاً");
  outputText.value = "";
  try {
    outputText.value = await translateAll(text, fromLang.value, toLang.value) || "❌ تعذّرت الترجمة";
  } catch (e) {
    outputText.value = "❌ " + e.message;
  } finally { hideProgress(); }
};

// زر ترجمة ملف كامل
document.getElementById("translateFileBtn").onclick = async () => {
  const text = inputText.value.trim();
  if (!text) return alert("استورد ملفاً أولاً (زر 📁 استيراد ملف)");
  outputText.value = "";
  stopBtn.hidden = false;
  try {
    outputText.value = await translateAll(text, fromLang.value, toLang.value) || "❌ تعذّرت الترجمة";
  } catch (e) {
    outputText.value = "❌ " + e.message;
  } finally {
    hideProgress(); stopBtn.hidden = true;
  }
};

stopBtn.onclick = () => { abortFlag = true; };

// الترجمة الصوتية
document.getElementById("voiceTranslateBtn").onclick = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return alert("متصفحك لا يدعم الإدخال الصوتي. جرّب Chrome.");
  const r = new SR();
  r.lang = fromLang.value;
  r.onresult = async (e) => {
    const spoken = e.results[0][0].transcript;
    inputText.value = spoken;
    outputText.value = "⏳ جارٍ ترجمة صوتك...";
    try {
      const tr = await translateChunk(spoken, fromLang.value, toLang.value);
      outputText.value = tr;
      speak(tr, toLang.value);
    } catch (e) { outputText.value = "❌ " + e.message; }
  };
  r.onerror = () => alert("تعذّر التقاط الصوت");
  r.start();
};

// استيراد ملفات
document.getElementById("importBtn").onclick = () => fileInput.click();
fileInput.onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const ext = file.name.split(".").pop().toLowerCase();
  inputText.value = "⏳ جارٍ قراءة الملف...";
  try {
    let text = "";
    if (ext === "txt" || ext === "md" || ext === "srt") {
      text = await file.text();
      if (ext === "srt")
        text = text.replace(/^\d+\s*$/gm, "").replace(/\d{2}:\d{2}:\d{2},\d{3} --> .*/g, "").trim();
    } else if (ext === "docx") {
      const buf = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buf });
      text = result.value;
    } else if (ext === "pdf") {
      text = await extractPDF(file);
    } else { text = "❌ صيغة غير مدعومة"; }
    inputText.value = text.trim() || "(الملف فارغ)";
  } catch (err) { inputText.value = "❌ فشل قراءة الملف: " + err.message; }
};

async function extractPDF(file) {
  const buf = await file.arrayBuffer();
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let full = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    full += content.items.map(it => it.str).join(" ") + "\n";
  }
  return full;
}

// إدخال صوتي
document.getElementById("micBtn").onclick = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return alert("متصفحك لا يدعم الإدخال الصوتي. جرّب Chrome.");
  const r = new SR();
  r.lang = fromLang.value;
  r.onresult = (e) => inputText.value = e.results[0][0].transcript;
  r.onerror = () => alert("تعذّر التقاط الصوت");
  r.start();
};

// نطق
function speak(text, lang) {
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  speechSynthesis.speak(u);
}
document.getElementById("speakInput").onclick = () => speak(inputText.value, fromLang.value);
document.getElementById("speakOutput").onclick = () => speak(outputText.value, toLang.value);

// نسخ
document.getElementById("copyBtn").onclick = () => {
  if (!outputText.value) return;
  navigator.clipboard.writeText(outputText.value);
  alert("✅ تم النسخ");
};

// تحميل
document.getElementById("downloadBtn").onclick = () => {
  if (!outputText.value) return;
  const blob = new Blob([outputText.value], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "translation.txt";
  a.click();
};

// مسح
document.getElementById("clearBtn").onclick = () => {
  inputText.value = ""; outputText.value = ""; hideProgress();
};
