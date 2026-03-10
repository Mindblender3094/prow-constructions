/* ==================================
   PROW CONSTRUCTIONS — main.js
   ================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Footer Year ----
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Scroll Reveal ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = el.parentElement ? Array.from(el.parentElement.querySelectorAll('.reveal')) : [el];
        const delay = siblings.indexOf(el) * 80;
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('visible');
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- Animated Stat Counters ----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  // ---- Project Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Testimonial Carousel ----
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoplayTimer;

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function stopAutoplay() { clearInterval(autoplayTimer); }

  prevBtn.addEventListener('click', () => { stopAutoplay(); goToSlide(currentSlide - 1); startAutoplay(); });
  nextBtn.addEventListener('click', () => { stopAutoplay(); goToSlide(currentSlide + 1); startAutoplay(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(parseInt(dot.dataset.index, 10));
      startAutoplay();
    });
  });

  // Touch swipe support
  let touchStart = 0;
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAutoplay(); goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1); startAutoplay(); }
  });

  startAutoplay();

  // ---- Contact Form Validation ----
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  function showError(fieldId, errorId, msg) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!field || !error) return;
    field.parentElement.classList.add('has-error');
    error.textContent = msg;
  }

  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!field || !error) return;
    field.parentElement.classList.remove('has-error');
    error.textContent = '';
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value.trim();

    clearError('form-name', 'error-name');
    clearError('form-email', 'error-email');
    clearError('form-service', 'error-service');
    clearError('form-message', 'error-message');

    if (!name) { showError('form-name', 'error-name', 'Please enter your full name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('form-email', 'error-email', 'Please enter a valid email address.'); valid = false;
    }
    if (!service) { showError('form-service', 'error-service', 'Please select a service.'); valid = false; }
    if (!message || message.length < 20) {
      showError('form-message', 'error-message', 'Please describe your project (at least 20 characters).'); valid = false;
    }

    return valid;
  }

  if (form) {
    // Live validation
    ['form-name', 'form-email', 'form-service', 'form-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => validateForm());
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm()) return;

      const submitBtn = document.getElementById('form-submit');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // Simulate sending (replace with real API call)
      setTimeout(() => {
        form.reset();
        formSuccess.classList.add('show');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(() => formSuccess.classList.remove('show'), 6000);
      }, 1200);
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
