// ── Typing Animation ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const typingTextRole   = document.querySelector('.typing-text-role');
  const typingCursorRole = document.querySelector('.typing-cursor-role');

  const roles = [
    'Data Scientist',
    'Machine Learning Engineer',
    'Researcher',
    'Generative AI Engineer'
  ];

  let currentRoleIndex = 0;
  let isDeleting       = false;
  let roleIndex        = 0;

  function typeRole() {
    if (!typingTextRole || !typingCursorRole) return;

    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
      if (roleIndex < currentRole.length) {
        typingTextRole.textContent = currentRole.substring(0, roleIndex + 1);
        roleIndex++;
        setTimeout(typeRole, 100);
      } else {
        setTimeout(() => { isDeleting = true; typeRole(); }, 2000);
      }
    } else {
      if (roleIndex > 0) {
        typingTextRole.textContent = currentRole.substring(0, roleIndex - 1);
        roleIndex--;
        setTimeout(typeRole, 50);
      } else {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
      }
    }

    typingCursorRole.style.opacity = '1';
  }

  typeRole();
});

window.addEventListener('beforeunload', function() {
  const typingTextRole = document.querySelector('.typing-text-role');
  if (typingTextRole) typingTextRole.textContent = '';
});


// ── Carousel (Skills + Projects) ─────────────────────────────
document.addEventListener('DOMContentLoaded', function() {

  // Generic carousel initialiser — works for both .skills-carousel
  // and .projects-carousel since they share the same structure.
  function initCarousel(carousel) {
    const track   = carousel.querySelector('.skills-track, .projects-track');
    const cards   = track ? track.children : [];
    const prev    = carousel.querySelector('.carousel-btn-prev');
    const next    = carousel.querySelector('.carousel-btn-next');
    const dots    = carousel.querySelectorAll('.carousel-dot');
    const container = carousel.querySelector('.skills-container, .projects-container');

    if (!track || cards.length === 0) return;

    let current = 0;

    function gap() {
      return parseInt(getComputedStyle(track).gap) || 24;
    }

    function cardW() {
      return cards[0].offsetWidth + gap();
    }

    function visible() {
      const w = container ? container.offsetWidth : carousel.offsetWidth;
      return Math.max(1, Math.floor(w / cardW()));
    }

    function maxIdx() {
      return Math.max(0, cards.length - visible());
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx()));
      track.style.transform = `translateX(-${current * cardW()}px)`;

      // dots
      dots.forEach((d, i) => d.classList.toggle('active', i === current));

      // button state
      if (prev) prev.disabled = current === 0;
      if (next) next.disabled = current >= maxIdx();
    }

    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Touch / swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    // Recalculate on resize
    window.addEventListener('resize', () => goTo(current));

    goTo(0);
  }

  document.querySelectorAll('.skills-carousel, .projects-carousel')
    .forEach(initCarousel);
});
