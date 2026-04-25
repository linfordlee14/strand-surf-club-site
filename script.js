/* ============================================================
   STRAND SURF CLUB — script.js
   Built by Linfy Tech, Strand, Cape Town
   ============================================================ */

(function () {
  'use strict';

  var html      = document.documentElement;
  var themeBtn  = document.getElementById('themeBtn');
  var menuBtn   = document.getElementById('menuBtn');
  var navLinks  = document.getElementById('navLinks');
  var siteHeader = document.getElementById('siteHeader');

  /* ── Dark Mode Toggle ── */
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Mobile Menu ── */
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  /* ── Header scroll state ── */
  var sections    = document.querySelectorAll('section[id]');
  var navLinkEls  = document.querySelectorAll('.nav__link[data-nav]');

  function updateActiveNav() {
    var current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 130) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-nav') === current);
    });
  }

  function onScroll() {
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Scroll Reveal ── */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Booking Form ── */
  var bookingForm    = document.getElementById('bookingForm');
  var bookingSuccess = document.getElementById('bookingSuccess');

  if (bookingForm && bookingSuccess) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }
      bookingForm.hidden = true;
      bookingSuccess.hidden = false;
      bookingSuccess.focus();
    });
  }

  /* ── Contact Form ── */
  var contactForm    = document.getElementById('contactForm');
  var contactSuccess = document.getElementById('contactSuccess');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactForm.hidden = true;
      contactSuccess.hidden = false;
      contactSuccess.focus();
    });
  }

}());
