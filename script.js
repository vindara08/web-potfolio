// ============================================================
// MAIN PAGE – Carousel logic only
// Uses shared data from data.js and utils from utils.js
// ============================================================

// ============================================================
// DOM REFS
// ============================================================
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('carouselIndicators');

// ============================================================
// CAROUSEL
// ============================================================
let activeIndex = 0;
let autoSlideInterval = null;
const SLIDE_INTERVAL = 4000;

function renderCarousel() {
    carouselTrack.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    if (projectData.length === 0) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide active';
        slide.innerHTML = `
            <div class="project-card" style="display:flex; flex-direction:row; align-items:center; justify-content:center; min-height:280px; text-align:center; padding:40px 30px;">
                <i class="fas fa-code" style="font-size:3.5rem; color:var(--primary); opacity:0.3; margin-right:20px;"></i>
                <div>
                    <h3 style="font-size:1.8rem; font-weight:800; background:linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Uploading Soon</h3>
                    <p style="color:var(--text-secondary); font-size:1.1rem;">Projects are on their way. Stay tuned!</p>
                </div>
            </div>
        `;
        carouselTrack.appendChild(slide);
        return;
    }

    const total = projectData.length;
    projectData.forEach((project, idx) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.dataset.index = idx;

        let tagsHTML = '';
        project.tags.forEach((tag, i) => {
            const cls = project.tagClasses[i] || '';
            tagsHTML += `<span class="tag ${cls}">${tag}</span>`;
        });

        // Build card with data-project-id
        slide.innerHTML = `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" />
                </div>
                <div class="project-info">
                    <div class="project-tags">${tagsHTML}</div>
                    <h3>${project.title}</h3>
                    <p>${project.subtitle}</p>
                    <a href="detail.html?id=${project.id}" class="project-link">
                        View Details <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;

        carouselTrack.appendChild(slide);

        // ----- ADD CLICK LISTENERS -----
        const card = slide.querySelector('.project-card');
        const link = card.querySelector('.project-link');

        // 1. Card click → navigate to detail page
        card.addEventListener('click', function (e) {
            const projectId = this.dataset.projectId;
            window.location.href = `detail.html?id=${projectId}`;
        });

        // 2. Link click → stop propagation so card click doesn't fire twice
        link.addEventListener('click', function (e) {
            e.stopPropagation();
            // The default href will handle navigation
        });
    });

    // Create indicator dots
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.dataset.index = i;
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        indicatorsContainer.appendChild(dot);
    }

    activeIndex = 0;
    updateCarousel();
    startAutoSlide();
}

function updateCarousel() {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const dots = indicatorsContainer.querySelectorAll('.dot');
    const total = slides.length;
    if (total === 0) return;

    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === activeIndex) {
            slide.classList.add('active');
            slide.style.opacity = '1';
            slide.style.transform = 'scale(1.04)';
            slide.style.pointerEvents = 'auto';
        } else if (idx === prevIndex || idx === nextIndex) {
            slide.style.opacity = '0.5';
            slide.style.transform = 'scale(0.92)';
            slide.style.pointerEvents = 'none';
        } else {
            slide.style.opacity = '0';
            slide.style.transform = 'scale(0.85)';
            slide.style.pointerEvents = 'none';
        }
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
    });

    // Center the active slide
    const slideWidth = slides[0]?.offsetWidth || 0;
    const gap = 24;
    const trackWidth = slideWidth + gap;
    const containerWidth = carouselTrack.parentElement.offsetWidth;
    const translateX = containerWidth / 2 - slideWidth / 2 - activeIndex * trackWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

function goToSlide(index) {
    const total = projectData.length;
    if (total === 0) return;
    if (index === activeIndex) return;
    activeIndex = ((index % total) + total) % total;
    updateCarousel();
    resetAutoSlide();
}

function nextSlide() {
    const total = projectData.length;
    if (total === 0) return;
    goToSlide((activeIndex + 1) % total);
}

function prevSlide() {
    const total = projectData.length;
    if (total === 0) return;
    goToSlide((activeIndex - 1 + total) % total);
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    if (projectData.length > 0) {
        autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
}

function resetAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
}

// ===== CAROUSEL EVENT LISTENERS =====
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
});
carouselWrapper.addEventListener('mouseleave', () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
    }
    if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
});

// ===== NAVIGATION – Smooth scroll for hash links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== RESIZE HANDLER =====
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initScrollAnimations();
        if (carouselTrack) updateCarousel();
    }, 300);
}
window.addEventListener('resize', handleResize);

// ===== INIT =====
renderCarousel();
initUtils();

setTimeout(() => {
    if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
}, 400);

console.log('🚀 Home page loaded — carousel with links, cards are clickable');