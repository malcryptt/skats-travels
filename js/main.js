/**
 * SKATS Travels & Tours — Main JS
 * Aircraft "punch through screen" effect via GSAP ScrollTrigger
 */
document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll glass effect ──
  const navbar = document.querySelector('.navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile menu ──
  const mobileBtn   = document.querySelector('.mobile-menu-btn');
  const navLinks    = document.querySelector('.nav-links');
  const navActions  = document.querySelector('.nav-actions');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navActions.classList.toggle('open');
      mobileBtn.querySelector('i').className =
        navLinks.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
    });
  }

  // ── Scroll reveal (fade-up) ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── GSAP: Aircraft "flying out of the screen" ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const plane = document.querySelector('.breakout-plane');
    if (plane) {
      /**
       * The effect works by increasing perspective depth (translateZ)
       * and scale simultaneously, so the plane appears to rush TOWARD
       * the viewer and break through the page boundary.
       *
       * - scaleX/Y grow the plane aggressively
       * - translateZ (via motionPath or raw transform) pushes it forward
       * - rotationX gives a slight nose-down banking feel
       * - y moves it down slightly (as it "passes overhead")
       * - The drop-shadow grows to simulate proximity lighting
       */
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        }
      })
      .to(plane, {
        scale: 2.2,
        y: 180,
        rotationX: -12,
        rotationZ: -3,
        transformOrigin: 'center center',
        filter: 'drop-shadow(0 60px 120px rgba(0,60,120,.9)) drop-shadow(0 0 80px rgba(0,180,216,.5))',
        ease: 'none',
      });
    }

    // ── Subtle parallax on hero photo card ──
    const photoCard = document.querySelector('.hero-photo-card');
    if (photoCard) {
      gsap.to(photoCard, {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: -60, ease: 'none',
      });
    }

    // ── Parallax on hero background ──
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      gsap.to(heroBg, {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: 80, ease: 'none',
      });
    }

    // ── Animated stat counters ──
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.from({ val: 0 }, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix; }
          });
        },
        once: true,
      });
    });
  }
});
