document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Staggered animation for lists/grids
    const staggerGroups = document.querySelectorAll('.stagger-group');
    staggerGroups.forEach(group => {
        const children = group.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('animate-on-scroll', 'fade-up');
            child.style.transitionDelay = `${index * 0.1}s`; // 100ms delay per item
        });
        // Observe the children
        Array.from(children).forEach(child => observer.observe(child));
    });
});
