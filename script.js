
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav__links a, .nav-mobile a');

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => {
    if (section.id) observer.observe(section);
  });
}


const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cell = document.querySelector('.hero__panel');

if (cell && !prefersReducedMotion) {
  cell.style.opacity = '0';
  cell.style.transform = 'translateY(14px)';
  cell.style.transition = 'opacity .6s ease, transform .6s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cell.style.opacity = '1';
      cell.style.transform = 'translateY(0)';
    });
  });
}
