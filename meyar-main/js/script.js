/* ============================================================
   معيار — script.js
   ملاحظة للإنترن: ابحث عن تعليقات INTERN-TASK في هذا الملف
   وفي ملف css/style.css قبل البدء. لا تغيّر أسماء id/class.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  setFooterTimestamp();
  setActiveNavLink();
  initNavToggle();
  initContrastToggle();
  initFilterBar();
  initGauge();
  initContactForm();
});

/* هذه الدالة تعمل بشكل صحيح — مرجع لأسلوب بقية الدوال */
function setActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
}

/* INTERN-TASK #9: "آخر تحديث" في الفوتر مكتوب يدويًا في HTML.
   المطلوب جعله يعرض تاريخ اليوم تلقائيًا عبر عنصر #lastUpdate،
   بنفس أسلوب الدالة أعلاه. */
function setFooterTimestamp() {
  const lastUpdate = document.getElementById('lastUpdate');
  if (!lastUpdate) return;

  const today = new Date();
  lastUpdate.textContent = today.toLocaleDateString('ar-EG');
}

/* القائمة والأوفركانفاس على الموبايل */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const overlay = document.getElementById('overlay');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
  });

  // INTERN-TASK #6: إغلاق القائمة عند الضغط على الخلفية المعتمة
  // overlay غير موجود حاليًا — أضف مستمع click هنا يغلق nav و overlay معًا.

if (overlay) {
  overlay.addEventListener('click', () => {
    nav.classList.remove('open');
    overlay.classList.remove('show');
  });
}
/* INTERN-TASK #3: مفتاح التباين العالي في الهيدر */
function initContrastToggle() {
  const toggle = document.querySelector('.contrast-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
    document.body.classList.toggle('high-contrast');

    const pressed = toggle.classList.contains('on');
    toggle.setAttribute('aria-pressed', pressed);
  });
}
  // TODO: عند الضغط، بدّل كلاس "on" على الزر، وطبّق كلاس مقابل
  // (مثلاً "high-contrast") على body لرفع تباين الألوان.
}

/* INTERN-TASK #2: أزرار فلترة بطاقات المؤشرات */
function initFilterBar() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.kpi-card');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;

cards.forEach(card => {
  if (category === 'all' || card.dataset.category === category) {
    card.style.display = 'block';
  } else {
    card.style.display = 'none';
  }
});
    });
  });
}

/* INTERN-TASK #1: عدّاد مقياس مؤشر الجودة الدائري في الصفحة الرئيسية */
function initGauge() {
  const num = document.querySelector('.gauge-num');
  if (!num) return;
  const target = Number(num.dataset.value || 0);
  // TODO: شغّل عدّاد تصاعدي من 0 إلى target (مثلاً بخطوات كل 20ms)
  // وحدّث أيضًا stroke-dashoffset على .gauge-fg بما يتناسب مع النسبة.
 let current = 0;

const circle = document.querySelector('.gauge-fg');

const interval = setInterval(() => {
  current++;

  num.textContent = current;

  if (circle) {
    const offset = 566 - (566 * current / target);
    circle.style.strokeDashoffset = offset;
  }

  if (current >= target) {
    clearInterval(interval);
  }

}, 20);
}

/* نموذج التواصل — نفس فكرة مشروع ميثاق لكن بحقول مختلفة */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', handleContactSubmit);
}

/* INTERN-TASK #5: تحقق من الحقول قبل اعتبار الإرسال ناجحًا:
   الاسم مطلوب، البريد يجب أن يطابق صيغة بريد إلكتروني صحيحة،
   ويجب اختيار "نوع التقرير" فعليًا (وليس الخيار الأول تلقائيًا). */
function handleContactSubmit(e) {
  e.preventDefault();

  const status = document.getElementById('formStatus');

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const reportType = document.getElementById('reportType').value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    status.textContent = 'من فضلك أدخل الاسم.';
    status.className = 'form-status error';
    return;
  }

  if (!emailPattern.test(email)) {
    status.textContent = 'من فضلك أدخل بريد إلكتروني صحيح.';
    status.className = 'form-status error';
    return;
  }

  if (!reportType) {
    status.textContent = 'من فضلك اختر نوع التقرير.';
    status.className = 'form-status error';
    return;
  }

  status.textContent = 'تم استلام طلب التقرير، سنرسله خلال 3 أيام عمل.';
  status.className = 'form-status success';
}
