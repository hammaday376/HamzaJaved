const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const slides = Array.from(track.children);

let currentIndex = 0;

function updateCarousel() {
    slides.forEach((slide, i) => {
        let offset = i - currentIndex;
        slide.classList.remove('active');

        if (offset === 0) {
            slide.classList.add('active');
            slide.style.transform = `translateX(0) translateZ(200px) rotateY(0deg)`;
            slide.style.opacity = "1";
            slide.style.zIndex = "10";
        } else {
            let rotateY = offset > 0 ? -45 : 45;
            let translateX = offset * 180;
            slide.style.transform = `translateX(${translateX}px) translateZ(0) rotateY(${rotateY}deg)`;
            slide.style.opacity = "0.4";
            slide.style.zIndex = (10 - Math.abs(offset));
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Initialize
updateCarousel();

// Smooth scroll for nav links and CTA
document.querySelectorAll('a[href^="#"], #ctaBtn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href') || '#contact';
        const targetElement = document.querySelector(targetId === '#' ? 'body' : targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    updateCarousel();
});
