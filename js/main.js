/* ==================================
   PROW CONSTRUCTIONS — main.js
   Init, Navbar, Scroll Reveal, Counters, Project Filter, Smooth Scroll
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
        entries.forEach((entry) => {
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
