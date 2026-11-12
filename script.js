const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
const year = document.getElementById('year');

const storedTheme = localStorage.getItem('portfolio-theme');
const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
  ? storedTheme
  : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

root.dataset.theme = initialTheme;

const updateThemeLabel = () => {
  if (!themeToggle) return;
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  themeToggle.title = `Switch to ${nextTheme} theme`;
};

updateThemeLabel();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('portfolio-theme', nextTheme);
    updateThemeLabel();
  });
}

if (navToggle && primaryNav) {
  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    primaryNav.classList.remove('is-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    primaryNav.classList.toggle('is-open', isOpen);
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
      navToggle.focus();
    }
  });
}

if (year) year.textContent = String(new Date().getFullYear());

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const setActive = (id) => {
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -52% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}
