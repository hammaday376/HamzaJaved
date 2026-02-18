const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

function updateCarousel() {
    const slideWidth = track.firstElementChild.offsetWidth + 32; // width + gap
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    const slides = track.children.length;
    const visibleSlides = window.innerWidth > 968 ? 2 : 1;
    if (index < slides - visibleSlides) {
        index++;
        updateCarousel();
    } else {
        index = 0; // Loop back
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateCarousel();
    } else {
        const slides = track.children.length;
        const visibleSlides = window.innerWidth > 968 ? 2 : 1;
        index = slides - visibleSlides; // Loop to end
        updateCarousel();
    }
});

// CTA smooth scroll
document.getElementById("ctaBtn").addEventListener("click", () => {
  document
    .getElementById("investing")
    .scrollIntoView({ behavior: "smooth" });
});

// Handle window resize
window.addEventListener('resize', () => {
    index = 0;
    updateCarousel();
});
