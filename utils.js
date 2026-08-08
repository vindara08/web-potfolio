// ============================================================
// SHARED UTILITIES – used by both script.js and detail.js
// ============================================================

// ===== SCROLL ANIMATIONS =====
let scrollObserver = null;

function initScrollAnimations() {
    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }

    const elements = document.querySelectorAll('.scroll-animate');
    if (elements.length === 0) return;

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.remove('out-view');
                el.classList.add('in-view');
                el.dataset.hasBeenSeen = 'true';
            } else {
                if (el.dataset.hasBeenSeen === 'true') {
                    el.classList.remove('in-view');
                    el.classList.add('out-view');
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        const isVisible = rect.top < winHeight - 50 && rect.bottom > 50;
        if (isVisible) {
            el.classList.add('in-view');
            el.dataset.hasBeenSeen = 'true';
        } else {
            el.classList.remove('in-view', 'out-view');
        }
        const delay = parseInt(el.dataset.delay) || 0;
        if (delay > 0) {
            el.style.transitionDelay = delay + 'ms';
        }
        scrollObserver.observe(el);
    });
}

// ===== MOBILE HAMBURGER =====
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = hamburger.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backWrapper = document.getElementById('backToTopWrapper');
    const backBtn = document.getElementById('backToTopBtn');
    const progressCircle = document.getElementById('progressCircle');
    if (!backWrapper || !backBtn || !progressCircle) return;

    const circumference = 2 * Math.PI * 30;
    progressCircle.style.strokeDasharray = circumference;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        const offset = circumference - scrollPercent * circumference;
        progressCircle.style.strokeDashoffset = offset;

        if (scrollTop > 300) {
            backWrapper.classList.add('visible');
        } else {
            backWrapper.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);

    backBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            header.style.borderBottomColor = 'rgba(167, 139, 250, 0.08)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.72)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
        }
    });
}
// ============================================================
// IMAGE FALLBACK HANDLER
// ============================================================

function initImageFallbacks() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Skip if already handled
        if (img.dataset.fallbackHandled) return;
        img.dataset.fallbackHandled = 'true';

        // Check if image is a Google Drive thumbnail
        if (img.src && img.src.includes('drive.google.com/thumbnail')) {
            img.onerror = function () {
                // Try to load from alternative source or show placeholder
                const altText = img.alt || 'Project image';
                this.style.display = 'none';

                // Create a placeholder div
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.innerHTML = `
                    <i class="fas fa-image" style="font-size: 3rem; opacity: 0.3;"></i>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${altText}</span>
                `;
                placeholder.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 200px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 8px;
                    border: 1px solid var(--border-subtle);
                    padding: 20px;
                    gap: 12px;
                `;

                // Replace the image with placeholder
                this.parentNode.insertBefore(placeholder, this);
            };
        }
    });
}

// ===== INIT ALL UTILITIES =====
function initUtils() {
    initScrollAnimations();
    initHamburger();
    initBackToTop();
    initHeaderEffect();
    initImageFallbacks();
}