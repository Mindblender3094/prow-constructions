/* ==================================
   PROW CONSTRUCTIONS — carousel.js
   Testimonials carousel logic
   ================================== */

document.addEventListener('DOMContentLoaded', () => {

    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (!track || !prevBtn || !nextBtn) return;

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

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

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
        if (Math.abs(diff) > 50) {
            stopAutoplay();
            goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
            startAutoplay();
        }
    });

    startAutoplay();

});
