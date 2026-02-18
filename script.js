const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const slides = Array.from(track.children);

let currentIndex = 0;

function updateCarousel() {
    const isMobile = window.innerWidth <= 968;
    const spacing = isMobile ? 110 : 160; // Reduced spacing as suggested 
    const rotateDeg = isMobile ? 30 : 45;
    const zTranslate = isMobile ? 120 : 250;

    slides.forEach((slide, i) => {
        let offset = i - currentIndex;
        slide.classList.remove('active');

        if (offset === 0) {
            slide.classList.add('active');
            slide.style.transform = `translateX(0) translateZ(${zTranslate}px) rotateY(0deg) scale(1)`;
            slide.style.opacity = "1";
            slide.style.zIndex = "20";
            slide.style.filter = "blur(0) brightness(1)";
        } else {
            let rotateY = offset > 0 ? -rotateDeg : rotateDeg;
            let translateX = offset * spacing;

            // Limit visible slides on mobile
            if (isMobile && Math.abs(offset) > 1) {
                slide.style.opacity = "0";
                slide.style.pointerEvents = "none";
                slide.style.visibility = "hidden";
            } else {
                slide.style.opacity = isMobile ? "0.3" : "0.4";
                slide.style.pointerEvents = "auto";
                slide.style.visibility = "visible";
            }

            slide.style.transform = `translateX(${translateX}px) translateZ(0) rotateY(${rotateY}deg)`;
            slide.style.zIndex = (10 - Math.abs(offset));
            slide.style.filter = "blur(3px) brightness(0.4)";
        }
    });
}

// Touch support
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    if (touchEndX > touchStartX + 50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
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
