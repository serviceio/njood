(function () {
  const NTFY_TOPIC = "njood_gift";
  const NTFY_URL = `https://ntfy.sh/${NTFY_TOPIC}`;

  // إنشاء أو استرجاع معرف ثابت لنفس المتصفح
  let visitorId = localStorage.getItem("njood_visitor_id");
  let visitCount = parseInt(localStorage.getItem("njood_visit_count") || "0", 10) + 1;

  if (!visitorId) {
    visitorId = "ID-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString(36).toUpperCase();
    localStorage.setItem("njood_visitor_id", visitorId);
  }
  localStorage.setItem("njood_visit_count", visitCount.toString());

  // استخراج نوع الجهاز والنظام
  const ua = navigator.userAgent;
  let deviceType = "جهاز غير معروف";
  if (/iPhone/i.test(ua)) deviceType = "iPhone";
  else if (/iPad/i.test(ua)) deviceType = "iPad";
  else if (/Android/i.test(ua)) deviceType = "Android";
  else if (/Windows/i.test(ua)) deviceType = "Windows PC";
  else if (/Macintosh/i.test(ua)) deviceType = "Mac";

  const screenInfo = `${window.screen.width}x${window.screen.height}`;
  const lang = navigator.language || "غير محدد";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "غير محدد";
  const timeNow = new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" });

  const message = [
    `المعرّف الثابت: ${visitorId}`,
    `عدد مرات الفتح: ${visitCount}`,
    `نوع الجهاز: ${deviceType}`,
    `أبعاد الشاشة: ${screenInfo}`,
    `اللغة: ${lang}`,
    `المنطقة الزمنية: ${tz}`,
    `وقت الفتح: ${timeNow}`,
    `تفاصيل المتصفح: ${ua}`
  ].join("\n");

  // إرسال الإشعار إلى قناة ntfy
  fetch(NTFY_URL, {
    method: "POST",
    headers: {
      "Title": `فتح صفحة نجود (${deviceType}) - زيارة #${visitCount}`,
      "Tags": "cherries,sparkles"
    },
    body: message
  }).catch(() => {});
})();
