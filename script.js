// =====================
// NAVBAR: shadow on scroll
// =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// =====================
// MOBILE MENU
// =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = isOpen ? 'none' : 'flex';
  hamburger.setAttribute('aria-expanded', String(!isOpen));
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// =====================
// TESTIMONIALS CAROUSEL
// =====================
(function () {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots   = document.querySelectorAll('.dot');
  const prev   = document.querySelector('.carousel-prev');
  const next   = document.querySelector('.carousel-next');
  let current  = 0;
  let timer    = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Pause on hover
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Touch swipe
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  startAuto();
})();

// =====================
// FLOATING MOBILE CTA
// =====================
const floatingCta = document.getElementById('floatingCta');
const hero        = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const heroBottom = hero.getBoundingClientRect().bottom;
  floatingCta.classList.toggle('visible', heroBottom < 0);
}, { passive: true });

// =====================
// CONTACT FORM
// =====================
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('formStatus').textContent = "Thank you! We'll be in touch within 24 hours.";
  this.reset();
});

// =====================
// NEWSLETTER FORM
// =====================
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('newsletterStatus').textContent = "You're in! Welcome to the Nectar community.";
  this.reset();
});
