/**
 * Modern Animations - Portfolio Website
 * Lenis smooth scroll + GSAP ScrollTrigger + Custom Cursor + Text Reveals
 */

// ===== TEXT SPLIT UTILITY (No plugin needed) =====
function splitTextToChars(element) {
    if (!element || element.dataset.split === 'true') return;
    const text = element.textContent;
    element.innerHTML = '';
    element.dataset.split = 'true';

    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.setProperty('--char-index', i);
        element.appendChild(span);
    });

    return element.querySelectorAll('.split-char');
}

function splitTextToWords(element) {
    if (!element || element.dataset.split === 'true') return;
    const words = element.textContent.split(' ');
    element.innerHTML = '';
    element.dataset.split = 'true';

    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.3em';
        span.style.setProperty('--word-index', i);
        element.appendChild(span);
    });

    return element.querySelectorAll('.split-word');
}

// ===== TEXT SCRAMBLE EFFECT (CreativeWebManual Style) =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#';
        this.originalText = el.innerText;
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    reset() {
        cancelAnimationFrame(this.frameRequest);
        this.el.innerText = this.originalText;
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // ===== LENIS SMOOTH SCROLL =====
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    // Connect Lenis to GSAP ticker
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Register ScrollTrigger and SplitText, connect to Lenis
    gsap.registerPlugin(ScrollTrigger, SplitText);
    lenis.on('scroll', ScrollTrigger.update);

    // Anchor links smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: 0, duration: 1.2 });
            }
        });
    });

    // ===== CUSTOM CURSOR =====
    const cursor = {
        dot: document.querySelector('.cursor-dot'),
        circle: document.querySelector('.cursor-circle'),
        pos: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        visible: false
    };

    // Only init cursor on non-touch devices
    if (cursor.dot && cursor.circle && window.matchMedia('(pointer: fine)').matches) {
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            cursor.target.x = e.clientX;
            cursor.target.y = e.clientY;

            if (!cursor.visible) {
                cursor.visible = true;
                gsap.to([cursor.dot, cursor.circle], {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.visible = false;
            gsap.to([cursor.dot, cursor.circle], {
                opacity: 0,
                duration: 0.3
            });
        });

        // Cursor animation loop
        gsap.ticker.add(() => {
            cursor.pos.x += (cursor.target.x - cursor.pos.x) * 0.15;
            cursor.pos.y += (cursor.target.y - cursor.pos.y) * 0.15;

            gsap.set(cursor.dot, { x: cursor.target.x, y: cursor.target.y });
            gsap.set(cursor.circle, { x: cursor.pos.x, y: cursor.pos.y });
        });

        // Hover states for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .hover-this, .menu-item, input, textarea');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.circle.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.circle.classList.remove('hover');
            });
        });

        // Active state on click
        document.addEventListener('mousedown', () => {
            cursor.circle.classList.add('active');
        });
        document.addEventListener('mouseup', () => {
            cursor.circle.classList.remove('active');
        });

        // Initially hide cursor
        gsap.set([cursor.dot, cursor.circle], { opacity: 0 });
    }

    // ===== SCROLL-TRIGGERED ANIMATIONS =====

    // About section - HELLO Letter reveal with stagger
    const aboutLetters = gsap.utils.toArray('.about-letter');
    if (aboutLetters.length > 0) {
        gsap.fromTo(aboutLetters,
            {
                y: 100,
                opacity: 0,
                rotateX: -90
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.08,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '#one',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // ===== PINNED EDITORIAL SCROLL (CreativeWebManual Style) =====
    // Pin HELLO letters while about content scrolls
    const helloSection = document.querySelector('.hello');
    const aboutWrapper = document.querySelector('.about-wrapper');

    if (helloSection && aboutWrapper) {
        ScrollTrigger.create({
            trigger: '.contain-about',
            start: 'top top+=80',
            end: 'bottom bottom',
            pin: '.hello',
            pinSpacing: false
        });

        // Fade out HELLO letters as you scroll past
        gsap.to('.about-letter', {
            opacity: 0.3,
            y: -30,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '.about-wrapper',
                start: 'bottom center',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Project section - PROJECTS letter reveal with stagger  
    const projectLetters = gsap.utils.toArray('.project-about-letter');
    if (projectLetters.length > 0) {
        gsap.fromTo(projectLetters,
            {
                y: 120,
                opacity: 0,
                rotateX: -90
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.06,
                duration: 0.9,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '#two',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // Fade in animations for general elements with enhanced timing
    gsap.utils.toArray('.about-wrapper, .form').forEach(el => {
        gsap.fromTo(el,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // ===== WORD-BY-WORD TEXT REVEAL (CreativeWebManual Style) =====
    // Split text and animate from grey to white on scroll
    gsap.utils.toArray('.pr-text').forEach(textBlock => {
        const split = new SplitText(textBlock, {
            type: 'words',
            wordsClass: 'split-word'
        });

        // Set initial state - dimmed
        gsap.set(split.words, {
            opacity: 0.15,
            color: 'rgba(255, 255, 255, 0.15)'
        });

        // Animate to bright white on scroll with scrub
        gsap.to(split.words, {
            opacity: 1,
            color: '#ffffff',
            stagger: 0.03,
            scrollTrigger: {
                trigger: textBlock,
                start: 'top 80%',
                end: 'bottom 40%',
                scrub: true
            }
        });
    });

    // ===== BACKGROUND COLOR TRANSITIONS =====
    // Smooth color changes as you scroll through sections
    const colorSections = [
        { trigger: '.first-page', color: '#0a0a0a' },
        { trigger: '.contain-about', color: '#0d1810' },
        { trigger: '.project-container-main', color: '#0a0a0a' },
        { trigger: '.contact', color: '#071209' }
    ];

    colorSections.forEach(section => {
        ScrollTrigger.create({
            trigger: section.trigger,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => gsap.to('body', {
                backgroundColor: section.color,
                duration: 1.2,
                ease: 'power2.out'
            }),
            onEnterBack: () => gsap.to('body', {
                backgroundColor: section.color,
                duration: 1.2,
                ease: 'power2.out'
            })
        });
    });

    // ===== ENHANCED PROJECT CARDS ANIMATION =====
    // Project cards with staggered entrance and clip-path image reveal
    const projectCards = gsap.utils.toArray('.project1, .project2, .project3, .project4, .project5, .project6');

    projectCards.forEach((card, index) => {
        // Text content animation
        const textContent = card.querySelector('.pr1-right') || card.querySelector('.pr2-left');
        if (textContent) {
            gsap.fromTo(textContent,
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // Image reveal with clip-path
        const image = card.querySelector('.modal-img img');
        if (image) {
            // Set initial clip-path
            gsap.set(image, { clipPath: 'inset(0% 100% 0% 0%)' });

            gsap.to(image, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Also add subtle scale effect
            gsap.fromTo(image,
                { scale: 1.15 },
                {
                    scale: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 75%',
                        end: 'bottom 25%',
                        scrub: 1
                    }
                }
            );
        }
    });

    // ===== PINNED PROJECT CAROUSEL =====
    // Pin PROJECTS letters while scrolling through cards
    const projectSection = document.querySelector('.project-container-main');
    const projectTitle = document.querySelector('#project-about-main');

    if (projectSection && projectTitle) {
        ScrollTrigger.create({
            trigger: projectSection,
            start: 'top top+=100',
            end: 'bottom bottom',
            pin: projectTitle,
            pinSpacing: false
        });

        // Animate project counter/number as you scroll
        gsap.to('.project-about-letter', {
            opacity: 0.2,
            y: -50,
            stagger: 0.03,
            scrollTrigger: {
                trigger: projectSection,
                start: '70% center',
                end: 'bottom center',
                scrub: true
            }
        });
    }

    // ===== HORIZONTAL PARALLAX FOR PROJECT IMAGES =====
    projectCards.forEach((card, i) => {
        const isEven = i % 2 === 0;
        const xOffset = isEven ? -30 : 30;

        gsap.to(card, {
            x: xOffset,
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // ===== MAGNETIC BUTTON EFFECT =====
    document.querySelectorAll('.about-button, .git, .button').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // ===== HERO TEXT ANIMATION =====
    // Animate hero text after intro animation (delay ~6.5s)
    const heroTimeline = gsap.timeline({ delay: 6.5 });

    heroTimeline.from('.site-menu .menu-item', {
        x: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power4.out'
    });

    // ===== ENHANCED PARALLAX SYSTEM =====
    // Hero content parallax
    const firstPage = document.querySelector('.first-page');
    if (firstPage) {
        gsap.to('.contain-box', {
            y: 150,
            scrollTrigger: {
                trigger: '.first-page',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    // Blob parallax for depth effect
    gsap.utils.toArray('.blob').forEach((blob, i) => {
        const speed = 0.3 + (i * 0.1);
        gsap.to(blob, {
            y: `${100 * speed}vh`,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2
            }
        });
    });

    // ===== ANIMATED LINK UNDERLINES =====
    document.querySelectorAll('.site-menu a, .footer-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ===== TEXT SCRAMBLE ON MENU HOVER =====
    document.querySelectorAll('.menu-item, .hover-link').forEach(item => {
        const scramble = new TextScramble(item);
        const originalText = item.innerText;

        item.addEventListener('mouseenter', () => {
            scramble.setText(originalText);
        });
    });

    // ===== SCROLL PROGRESS BAR =====
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00ffc8 0%, #00a86b 100%);
        z-index: 9999;
        transition: none;
    `;
    document.body.appendChild(progressBar);

    // Animate progress bar with scroll
    gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        }
    });

    // ===== SMOOTH SECTION TRANSITIONS =====
    // Add subtle blur effect during fast scrolling
    let scrollTimeout;
    lenis.on('scroll', ({ velocity }) => {
        const absVelocity = Math.abs(velocity);
        if (absVelocity > 2) {
            gsap.to('.project1, .project2, .project3', {
                filter: `blur(${Math.min(absVelocity * 0.5, 3)}px)`,
                duration: 0.1
            });
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            gsap.to('.project1, .project2, .project3', {
                filter: 'blur(0px)',
                duration: 0.3
            });
        }, 100);
    });

    console.log('🚀 Modern animations initialized with CreativeWebManual-level effects');
});
