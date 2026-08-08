// ===== Hamburger =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.querySelector('i').className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelector('i').className = 'fas fa-bars';
    });
});

// ===== Header scroll =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10,10,10,0.9)';
        header.style.borderBottomColor = 'rgba(167,139,250,0.08)';
    } else {
        header.style.backgroundColor = 'rgba(10,10,10,0.72)';
        header.style.borderBottomColor = 'rgba(255,255,255,0.04)';
    }
});

// ===== Back to top =====
const backWrapper = document.getElementById('backToTopWrapper');
const backBtn = document.getElementById('backToTopBtn');
const progressCircle = document.getElementById('progressCircle');
const circumference = 2 * Math.PI * 30;
progressCircle.style.strokeDasharray = circumference;
function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    progressCircle.style.strokeDashoffset = circumference - scrollPercent * circumference;
    backWrapper.classList.toggle('visible', scrollTop > 300);
}
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Scroll animations =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.scroll-animate').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 50) {
            el.classList.add('in-view');
        }
        const delay = parseInt(el.dataset.delay) || 0;
        if (delay) el.style.transitionDelay = delay + 'ms';
        observer.observe(el);
    });
}
setTimeout(initScrollAnimations, 100);

console.log('📄 Resume page loaded – Download button uses Google Drive link.');