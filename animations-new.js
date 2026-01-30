/* ══════════════════════════════════════════════════════════════════════════════
   ULTIMATE PORTFOLIO - AWWWARDS-STYLE ANIMATIONS
   Inspired by: olhalazarieva.com + helloelva.com
   Features: Odometer preloader, text scramble, magnetic elements, word reveals
   ══════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all modules
    initLenis();
    initCursor();
    initSpotlight();
    initPreloader();
    initCurrentTime();
    initSectionIndicator();
    initTextScramble();
    initMagneticElements();
    initWordReveal();
    initMarquee();
    initEvolvingText();
    initCopyEmail();
});

// ═══════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL (LENIS)
// ═══════════════════════════════════════════════════════════════════════════════
let lenis;

function initLenis() {
    lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker for ScrollTrigger
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════════════════════
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Dot follows instantly
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        // Circle follows with delay
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .project-image-wrapper');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPOTLIGHT EFFECT - Mouse-following radial gradient on dark sections
// ═══════════════════════════════════════════════════════════════════════════════
function initSpotlight() {
    const spotlight = document.querySelector('.spotlight');
    if (!spotlight) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateSpotlight() {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        spotlight.style.left = `${currentX}px`;
        spotlight.style.top = `${currentY}px`;

        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ODOMETER PRELOADER
// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// ODOMETER PRELOADER & GLOBAL REVEAL ORCHESTRATION
// ═══════════════════════════════════════════════════════════════════════════════

// Global Master Timeline Reference
let masterRevealTl;

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const digitColumns = document.querySelectorAll('.counter-digit-column');

    // 1. PRE-CALCULATE THE HERO REVEAL (Perform heavy lifting while screen is black)
    // This eliminates the "handoff stutter" caused by building the timeline at the exact moment of transition.
    buildMasterReveal();

    if (!preloader || digitColumns.length === 0) {
        // Fallback: Just play immediately if no preloader
        if (masterRevealTl) masterRevealTl.play();
        return;
    }

    // Calculate digit height
    const digitHeight = parseFloat(getComputedStyle(document.querySelector('.counter-digit-container')).height);
    let currentPercent = 0;
    const targetPercent = 100;
    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();

    function updateCounter() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out-expo)
        const easeProgress = 1 - Math.pow(2, -10 * progress);
        currentPercent = Math.floor(targetPercent * easeProgress);

        // Convert to 3 digits
        const digits = String(currentPercent).padStart(3, '0').split('').map(Number);

        // Update each column with odometer effect
        digitColumns.forEach((column, index) => {
            const targetDigit = digits[index];
            const translateY = -targetDigit * digitHeight;
            column.style.transform = `translateY(${translateY}px)`;
        });

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure 100% is shown
            setTimeout(() => {
                hidePreloader();
            }, 400);
        }
    }

    updateCounter();

    function hidePreloader() {
        // Timeline for Preloader Exit
        const exitTl = gsap.timeline({
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });

        // V5 Optimization: Cross-Dissolve Handoff
        // 1. Fade out preloader
        exitTl.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut'
        });

        // 2. Play the PRE-BUILT Master Reveal Timeline
        // Start it slightly before preloader finishes (-=0.5) for seamless blend
        if (masterRevealTl) {
            exitTl.add(() => masterRevealTl.play(), "-=0.5");
        }
    }
}

function buildMasterReveal() {
    // paused: true -> We only play it when preloader says so.
    masterRevealTl = gsap.timeline({ paused: true });

    // ════════════════════════════════════════════════════════════════════
    // 1. PREPARE ELEMENTS (Set Initial States)
    // ════════════════════════════════════════════════════════════════════

    // A. Main Text (Olha Stagger)
    const heroChars = document.querySelectorAll('.hero-statement .char-container');
    gsap.set(heroChars, { y: "110%", opacity: 0 });

    // B. Auxiliary Hero Elements
    const auxiliaryElements = document.querySelectorAll('.brand-anchor, .hero-tagline');
    gsap.set(auxiliaryElements, { opacity: 0, y: 30 });

    // C. Global Decor (Corners, Grid, Lines)
    const corners = document.querySelectorAll('.corner:not(.corner--top-left)'); // Top-left is often logoish
    const decoLinesH = document.querySelectorAll('.deco-line--h');
    const decoLinesV = document.querySelectorAll('.deco-line--v');
    const gridOverlay = document.querySelector('.grid-overlay');

    gsap.set(corners, { opacity: 0, scale: 0.8 });
    gsap.set(decoLinesH, { scaleX: 0, transformOrigin: "left" });
    gsap.set(decoLinesV, { scaleY: 0, transformOrigin: "top" });
    gsap.set(gridOverlay, { opacity: 0 });

    // D. Navigation
    const nav = document.querySelector('nav');
    if (nav) gsap.set(nav, { y: "-100%", autoAlpha: 0 });

    // E. Metadata (Location, Scroll, Subtext)
    const heroMeta = document.querySelectorAll('.location-box, .scroll-indicator, .hero-subtext');
    gsap.set(heroMeta, { opacity: 0, y: 20 });


    // ════════════════════════════════════════════════════════════════════
    // 2. BUILD THE ANIMATION SEQUENCE
    // ════════════════════════════════════════════════════════════════════

    // Step A: Brand & Tagline (Foundation)
    masterRevealTl.to(auxiliaryElements, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Step B: Hero Text (The "Main Event" - Masked Cascade)
    masterRevealTl.to(heroChars, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.03, // Wave effect
        ease: "power4.out"
    }, "-=0.8"); // Significant overlap

    // Step C: Navigation Drop-in
    if (nav) {
        masterRevealTl.to(nav, {
            y: "0%",
            autoAlpha: 1,
            duration: 1.0,
            ease: "power3.out"
        }, "-=1.0"); // Parallel with text
    }

    // Step D: Decorative Structure (Drawing the UI)
    // Horizontal Lines Draw
    masterRevealTl.to(decoLinesH, {
        scaleX: 1,
        duration: 1.2,
        ease: "expo.inOut"
    }, "-=0.8");

    // Vertical Lines Draw
    masterRevealTl.to(decoLinesV, {
        scaleY: 1,
        duration: 1.2,
        ease: "expo.inOut"
    }, "<"); // Sync with H-lines

    // Corners & Grid Fade In
    masterRevealTl.to([corners, gridOverlay], {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=1.0");

    // Step E: Metadata (Final Polish)
    masterRevealTl.to(heroMeta, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
            // Show section indicator after everything settles
            document.querySelector('.section-indicator-fixed')?.classList.add('visible');
            initScrollAnimations(); // Trigger ScrollTrigger refresh
        }
    }, "-=0.6");
}

// ═══════════════════════════════════════════════════════════════════════════════
// CURRENT TIME DISPLAY
// ═══════════════════════════════════════════════════════════════════════════════
function initCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;

    function updateTime() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata', // Indian time
            hour12: false
        };
        timeElement.textContent = now.toLocaleTimeString('en-US', options);
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION INDICATOR - Updates on scroll
// ═══════════════════════════════════════════════════════════════════════════════
function initSectionIndicator() {
    const indicator = document.querySelector('.section-indicator-fixed');
    const currentIndicator = document.querySelector('.indicator-current');
    if (!indicator || !currentIndicator) return;

    const sections = document.querySelectorAll('section[data-section]');

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                const num = section.dataset.section.padStart(2, '0');
                gsap.to(currentIndicator, {
                    y: -10,
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        currentIndicator.textContent = num;
                        gsap.to(currentIndicator, { y: 0, opacity: 1, duration: 0.15 });
                    }
                });
            },
            onEnterBack: () => {
                const num = section.dataset.section.padStart(2, '0');
                gsap.to(currentIndicator, {
                    y: 10,
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        currentIndicator.textContent = num;
                        gsap.to(currentIndicator, { y: 0, opacity: 1, duration: 0.15 });
                    }
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEXT SCRAMBLE EFFECT - Character replacement on hover
// ═══════════════════════════════════════════════════════════════════════════════
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#_';
        this.originalText = el.dataset.text || el.textContent;
    }

    scramble() {
        const length = this.originalText.length;
        let iteration = 0;
        const maxIterations = length * 2;

        const interval = setInterval(() => {
            this.el.querySelector('.link-text').textContent = this.originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration / 2) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');

            iteration += 1;

            if (iteration >= maxIterations) {
                clearInterval(interval);
                this.el.querySelector('.link-text').textContent = this.originalText;
            }
        }, 30);
    }

    reset() {
        this.el.querySelector('.link-text').textContent = this.originalText;
    }
}

function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');

    scrambleElements.forEach(el => {
        const linkText = el.querySelector('.link-text');
        if (!linkText) return;

        const scramble = new TextScramble(el);

        el.addEventListener('mouseenter', () => scramble.scramble());
        el.addEventListener('mouseleave', () => scramble.reset());
    });

    // Also apply to project titles
    const projectTitles = document.querySelectorAll('.project-title.scramble-text');
    projectTitles.forEach(el => {
        const originalText = el.textContent;
        const chars = '!<>-_\\/[]{}—=+*^?#_';
        let isScrambling = false;

        el.addEventListener('mouseenter', () => {
            if (isScrambling) return;
            isScrambling = true;

            let iteration = 0;
            const maxIterations = originalText.length * 2;

            const interval = setInterval(() => {
                el.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (letter === ' ') return ' ';
                        if (index < iteration / 2) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                iteration += 1;

                if (iteration >= maxIterations) {
                    clearInterval(interval);
                    el.textContent = originalText;
                    isScrambling = false;
                }
            }, 30);
        });

        el.addEventListener('mouseleave', () => {
            el.textContent = originalText;
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAGNETIC ELEMENTS - Buttons and links that follow cursor
// ═══════════════════════════════════════════════════════════════════════════════
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Also move inner content slightly
            const inner = el.querySelector('.btn-text') || el.querySelector('.logo-text');
            if (inner) {
                gsap.to(inner, {
                    x: x * 0.15,
                    y: y * 0.15,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            });

            const inner = el.querySelector('.btn-text') || el.querySelector('.logo-text');
            if (inner) {
                gsap.to(inner, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// WORD-BY-WORD TEXT REVEAL - On scroll
// ═══════════════════════════════════════════════════════════════════════════════
function initWordReveal() {
    const revealTexts = document.querySelectorAll('.reveal-text');

    revealTexts.forEach(text => {
        // Split into words
        const words = text.textContent.split(' ').filter(word => word.length > 0);
        text.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

        const wordSpans = text.querySelectorAll('.word');

        // Set initial state
        gsap.set(wordSpans, {
            opacity: 0.2,
            filter: 'blur(4px)'
        });

        // Animate on scroll
        ScrollTrigger.create({
            trigger: text,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                wordSpans.forEach((word, i) => {
                    const wordProgress = Math.max(0, Math.min(1,
                        (progress - (i / wordSpans.length * 0.7)) / 0.3
                    ));

                    gsap.to(word, {
                        opacity: 0.2 + (0.8 * wordProgress),
                        filter: `blur(${4 - (4 * wordProgress)}px)`,
                        duration: 0.2
                    });
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL-TRIGGERED ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════
function initScrollAnimations() {
    // Background color transition (light → dark)
    const darkSections = document.querySelectorAll('[data-bg="dark"]');

    darkSections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            end: 'bottom 60%',
            onEnter: () => {
                document.body.classList.add('theme-dark');
            },
            onLeaveBack: () => {
                document.body.classList.remove('theme-dark');
            },
            onEnterBack: () => {
                document.body.classList.add('theme-dark');
            },
            onLeave: () => {
                // Keep dark if next section is also dark
                const nextSection = section.nextElementSibling;
                if (!nextSection || nextSection.dataset.bg !== 'dark') {
                    document.body.classList.remove('theme-dark');
                }
            }
        });
    });

    // Project reveal animations
    const projects = document.querySelectorAll('.project');

    projects.forEach((project, index) => {
        const image = project.querySelector('.project-image-wrapper');
        const info = project.querySelector('.project-info');

        gsap.set(image, { opacity: 0, x: index % 2 === 0 ? -60 : 60 });
        gsap.set(info, { opacity: 0, y: 40 });

        ScrollTrigger.create({
            trigger: project,
            start: 'top 75%',
            once: true,
            onEnter: () => {
                gsap.to(image, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out'
                });

                gsap.to(info, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out'
                });
            }
        });
    });

    // Skill cards stagger
    const skillCards = document.querySelectorAll('.skill-card');

    gsap.set(skillCards, { opacity: 0, y: 40 });

    ScrollTrigger.create({
        trigger: '.skills-grid',
        start: 'top 75%',
        once: true,
        onEnter: () => {
            gsap.to(skillCards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });

    // Connect section animations
    const connectTitle = document.querySelectorAll('.title-line');

    gsap.set(connectTitle, { opacity: 0, y: 80 });

    ScrollTrigger.create({
        trigger: '.section--connect',
        start: 'top 70%',
        once: true,
        onEnter: () => {
            gsap.to(connectTitle, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });

    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        gsap.set(header, { opacity: 0, x: -30 });

        ScrollTrigger.create({
            trigger: header,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(header, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MARQUEE PAUSE ON HOVER
// ═══════════════════════════════════════════════════════════════════════════════
function initMarquee() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;

    marqueeTrack.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
    });

    marqueeTrack.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// COPY EMAIL TO CLIPBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function initCopyEmail() {
    const copyElement = document.querySelector('.copy-email');
    const toast = document.getElementById('toast');

    if (!copyElement || !toast) return;

    copyElement.addEventListener('click', (e) => {
        e.preventDefault();

        const email = 'manuarya1610@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVOLVING TEXT ANIMATION - Letters morphing into icons
// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// EVOLVING TEXT ANIMATION V3 - Elastic Expansion & Ghosting
// ═══════════════════════════════════════════════════════════════════════════════
function initEvolvingText() {
    // Target the containers now
    const charContainers = document.querySelectorAll('.char-container[data-char]');

    charContainers.forEach(container => {
        const originalChar = container.querySelector('.original-char');
        const iconWrapper = container.querySelector('.char-icon-wrapper');
        const icon = container.querySelector('.char-icon');

        if (!iconWrapper || !originalChar) return;

        // V5: Stable Width (No width changes)
        // We no longer calculate targetWidth for expansion.
        // The container stays the same size, the icon overlays.

        // Set initial state of icon
        gsap.set(iconWrapper, {
            scale: 0.5,
            opacity: 0,
            rotate: -15,
            transformOrigin: "center center"
        });

        // ─── Interaction Logic ───────────────────────────────────────────────

        const expand = () => {
            if (container.classList.contains('auto-evolving')) return;

            container.classList.add('expanded');

            // 1. Ghosting (Original Char Fades but stays)
            gsap.to(originalChar, {
                opacity: 0.15, // Slightly more transparent for V5
                duration: 0.4,
                ease: "power2.out"
            });

            // 2. Icon Reveal (No Width Change)
            gsap.to(iconWrapper, {
                scale: 1,
                opacity: 1,
                rotate: 0,
                duration: 0.6,
                ease: "back.out(1.2)"
            });
        };

        const collapse = () => {
            if (container.classList.contains('auto-evolving')) return;

            container.classList.remove('expanded');

            // 1. Restore Ghost
            gsap.to(originalChar, {
                opacity: 1,
                duration: 0.4,
                delay: 0.1,
                ease: "power2.in"
            });

            // 2. Hide Icon
            gsap.to(iconWrapper, {
                scale: 0.5,
                opacity: 0,
                rotate: 15,
                duration: 0.5,
                ease: "power2.in"
            });
        };

        // Hover Events
        container.addEventListener('mouseenter', expand);
        container.addEventListener('mouseleave', collapse);

        // ─── Autonomous Evolution Logic ──────────────────────────────────────

        const autoEvolve = () => {
            // Don't interrupt user hover
            if (container.matches(':hover')) return;

            container.classList.add('auto-evolving');
            container.classList.add('expanded');

            const tl = gsap.timeline({
                onComplete: () => {
                    container.classList.remove('auto-evolving');
                    container.classList.remove('expanded');
                }
            });

            // Evolve (No Width Change)
            tl.to(originalChar, { opacity: 0.15, duration: 0.6, ease: "power2.out" })
                .to(iconWrapper, { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.2)" }, "<")

                // Hold
                .to(originalChar, { opacity: 1, duration: 0.6, ease: "power2.in" }, "+=3.0")
                .to(iconWrapper, { scale: 0.5, opacity: 0, rotate: 15, duration: 0.6, ease: "power2.in" }, "<");
        };

        // Start random loop (Less frequent)
        setTimeout(() => {
            const randomInterval = Math.random() * 12000 + 8000;
            setInterval(autoEvolve, randomInterval);
        }, Math.random() * 5000 + 2000);
    });
}
