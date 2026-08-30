/* Theme toggle + mobile menu for the personal homepage. */
(function () {
  'use strict';

  var themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function themeIsDark() {
    return document.documentElement.dataset.theme === 'dark';
  }

  function syncThemeButton() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var dark = themeIsDark();
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', dark ? '#111217' : '#f6f2eb');
    }
  }

  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var dark = themeIsDark();
      if (dark) {
        delete document.documentElement.dataset.theme;
      } else {
        document.documentElement.dataset.theme = 'dark';
      }
      try {
        localStorage.setItem('lc-theme', dark ? 'light' : 'dark');
      } catch (e) {}
      syncThemeButton();
    });
  }

  syncThemeButton();

  /* Mobile menu */
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-nav');

  function closeMenu() {
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (nav) nav.classList.remove('is-open');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
        if (menuToggle) menuToggle.focus();
      }
    });
  }

  /* Footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
