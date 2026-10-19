document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('audioFile');
    if (fileInput.files.length === 0) {
        alert("يرجى اختيار ملف صوتي أولاً");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    alert("جاري رفع الصوت وتفكيكه بالذكاء الاصطناعي... قد يستغرق الأمر ثوانٍ.");

    try {
        // إرسال الملف إلى سيرفر الخادم الحقيقي (Python Backend)
        const response = await fetch('http://localhost:5000/separate', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('audioResults').style.display = 'block';
            document.getElementById('vocalsAudio').src = data.vocals_url;
            document.getElementById('noVocalsAudio').src = data.accompaniment_url;
        } else {
            alert("حدث خطأ أثناء معالجة الصوت.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("تأكد من تشغيل سيرفر السيرفر الخلفي (Python Server)");
    }
});
