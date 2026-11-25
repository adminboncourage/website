const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
        'main > section:not(.home-hero):not(.hero-alt) > :not(.service-bento), .value-card, .service-card, .steps li, .principle-grid article, .pricing-card, .blog-post, .switch-steps article'
    );

    revealTargets.forEach((target, index) => {
        target.classList.add('reveal');
        target.style.setProperty('--reveal-order', String(index % 5));
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealTargets.forEach((target) => observer.observe(target));
}
