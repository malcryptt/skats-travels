/**
 * SKATS Travels & Tours - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Glassmorphism on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Simplified for now)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Very basic toggle, will be enhanced via CSS
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                
                navActions.style.display = 'flex';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + 200px)';
                navActions.style.left = '2rem';
            }
        });
    }

    // 3. GSAP Animations (If GSAP is loaded)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A. 3D Aircraft Breakout Parallax Effect
        // The plane should move UP and RIGHT and SCALE UP as user scrolls down,
        // giving the illusion of taking off out of the container.
        const plane = document.querySelector('.hero-breakout-plane');
        if (plane) {
            gsap.to(plane, {
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5, // Smooth scrubbing
                },
                y: -150, // Move up
                x: 100,  // Move right
                scale: 1.2, // Get larger (coming towards viewer)
                rotationZ: 5, // Slight tilt
                ease: "none"
            });
        }

        // B. Scroll Reveal for Sections
        const fadeUpElements = document.querySelectorAll('.fade-up');
        fadeUpElements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 50 },
                { 
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power2.out" 
                }
            );
        });
    }
});
