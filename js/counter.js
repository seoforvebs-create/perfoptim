/* ============================================================
   PerfOptim — Stats CountUp (counter.js)
   ============================================================ */
(function () {
  'use strict';

  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = (el.getAttribute('data-decimals')) ? parseInt(el.getAttribute('data-decimals'), 10) : (target % 1 !== 0 ? 1 : 0);
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
})();
