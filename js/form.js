/* ============================================================
   PerfOptim — Form Validation (form.js)
   ============================================================ */
(function () {
  'use strict';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[\d\s()+\-]{7,}$/; // lenient international
  const US_PHONE_DIGITS = /^\d{10}$/;   // 10 digits for US

  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach((form) => {
    form.setAttribute('novalidate', 'true');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        const wrap = field.closest('.form-field');
        let fieldValid = true;
        const val = field.value.trim();

        if (!val) {
          fieldValid = false;
        } else if (field.type === 'email' && !EMAIL_RE.test(val)) {
          fieldValid = false;
        } else if (field.type === 'tel') {
          const digits = val.replace(/\D/g, '');
          // US 10-digit OR general international length
          if (!PHONE_RE.test(val) || (!US_PHONE_DIGITS.test(digits) && digits.length < 8)) {
            fieldValid = false;
          }
        } else if (field.type === 'url' && val) {
          try { new URL(val.startsWith('http') ? val : 'https://' + val); }
          catch (_) { fieldValid = false; }
        }

        if (wrap) wrap.classList.toggle('invalid', !fieldValid);
        if (!fieldValid) valid = false;
      });

      if (!valid) {
        const firstInvalid = form.querySelector('.form-field.invalid input, .form-field.invalid select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Loading state
      const btn = form.querySelector('button[type=submit]');
      const original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      // Simulate async submission
      setTimeout(() => {
        const success = form.parentElement.querySelector('.form-success');
        if (success) {
          form.style.display = 'none';
          success.classList.add('show');
        } else {
          if (btn) {
            btn.innerHTML = '✅ Submitted!';
          }
        }
        if (btn) {
          btn.disabled = false;
          // keep original for re-show scenarios
          btn.dataset.original = original;
        }
        form.reset();
      }, 1200);
    });

    // clear error on input
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        const wrap = field.closest('.form-field');
        if (wrap) wrap.classList.remove('invalid');
      });
    });
  });
})();
