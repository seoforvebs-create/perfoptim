/* ============================================================
   PerfOptim — Global JS (main.js)
   Nav, scroll, dropdowns, animations
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Sticky nav blur on scroll ---------- */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobile hamburger toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // close on link click (non-dropdown-parent links)
    menu.querySelectorAll('a.nav-link:not(.has-dropdown)').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 6. Mega dropdown: hover (desktop) + click (mobile) ---------- */
  document.querySelectorAll('.nav-item.has-children > .nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      // Only intercept on mobile / when it's a parent toggle
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const parent = link.closest('.nav-item');
        parent.classList.toggle('open');
      }
    });
  });

  /* ---------- 4. Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 5. Active nav link detection ---------- */
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-menu a.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const linkPath = href.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    if (linkPath && (path === linkPath || (linkPath !== '/' && path.startsWith(linkPath)))) {
      link.classList.add('active');
    }
  });

  /* ---------- 3. AOS init ---------- */
  if (window.AOS) {
    window.AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-out-cubic' });
  }

  /* ---------- Swiper init (testimonials) ---------- */
  if (window.Swiper && document.querySelector('.testimonial-swiper')) {
    new window.Swiper('.testimonial-swiper', {
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      spaceBetween: 28,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      },
    });
  }

  /* ---------- Newsletter / footer fake submit ---------- */
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()) {
        input.value = '';
        input.placeholder = '✓ Subscribed!';
      }
    });
  });
})();
