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

    // Browser detection for cross-browser fixes
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Initialize all modules
    initLenis(isSafari);
    if (!isTouchDevice) initCursor();
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
    initFooterSpotlight();
    initResizeHandler();
});

// ═══════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL (LENIS)
// ═══════════════════════════════════════════════════════════════════════════════
let lenis;

function initLenis(isSafari) {
    lenis = new Lenis({
        duration: isSafari ? 1.5 : 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: isSafari ? 0.8 : 1,
        touchMultiplier: isSafari ? 1 : 2,
        smoothTouch: false,
    });

    // Single unified RAF via GSAP ticker — no double-pumping
    lenis.on('scroll', ScrollTrigger.update);
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

    // GPU-composited quickSetters (no layout thrashing)
    const setDotX = gsap.quickSetter(cursorDot, 'x', 'px');
    const setDotY = gsap.quickSetter(cursorDot, 'y', 'px');
    const setCircleX = gsap.quickSetter(cursorCircle, 'x', 'px');
    const setCircleY = gsap.quickSetter(cursorCircle, 'y', 'px');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation via GSAP ticker (synced with main loop)
    gsap.ticker.add(() => {
        // Dot follows with slight lag
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        // Circle follows with more delay
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;

        setDotX(dotX);
        setDotY(dotY);
        setCircleX(circleX);
        setCircleY(circleY);
    });

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

    // GPU-composited quickSetters
    const setX = gsap.quickSetter(spotlight, 'x', 'px');
    const setY = gsap.quickSetter(spotlight, 'y', 'px');

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Sync with GSAP ticker instead of separate RAF
    gsap.ticker.add(() => {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        setX(currentX);
        setY(currentY);
    });
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
    const digitContainer = document.querySelector('.counter-digit-container');
    if (!digitContainer) { if (masterRevealTl) masterRevealTl.play(); return; }
    const digitHeight = parseFloat(getComputedStyle(digitContainer).height);
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

    // B. Auxiliary Hero Elements (reveal AFTER hero text)
    const auxiliaryElements = document.querySelectorAll('.brand-anchor, .hero-tagline');
    gsap.set(auxiliaryElements, { opacity: 0, y: 20 });

    // C. Global Decor (Corners, Grid, Lines)
    const allCorners = document.querySelectorAll('.corner');
    const decoLinesH = document.querySelectorAll('.deco-line--h');
    const decoLinesV = document.querySelectorAll('.deco-line--v');
    const gridOverlay = document.querySelector('.grid-overlay');

    gsap.set(allCorners, { opacity: 0, y: 15 });
    gsap.set(decoLinesH, { scaleX: 0, transformOrigin: "left" });
    gsap.set(decoLinesV, { scaleY: 0, transformOrigin: "top" });
    gsap.set(gridOverlay, { opacity: 0 });

    // D. Navigation (has .nav class with visibility:hidden in CSS)
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    if (nav) {
        gsap.set(nav, { autoAlpha: 0, y: "-100%" });
        gsap.set(navLinks, { opacity: 0, y: -10 });
    }

    // E. Metadata (Location, Scroll, Subtext)
    const heroMeta = document.querySelectorAll('.location-box, .scroll-indicator, .hero-subtext');
    gsap.set(heroMeta, { opacity: 0, y: 15 });


    // ════════════════════════════════════════════════════════════════════
    // 2. BUILD THE ANIMATION SEQUENCE (Reordered for smooth coordination)
    // ════════════════════════════════════════════════════════════════════

    // Step A: Navigation (Sets the frame - first to appear)
    if (nav) {
        masterRevealTl.to(nav, {
            autoAlpha: 1,
            y: "0%",
            duration: 0.8,
            ease: 'power3.out'
        });
        masterRevealTl.to(navLinks, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out'
        }, "<0.2");
    }

    // Step B: Corners (Frame the content - subtle slide in)
    masterRevealTl.to(allCorners, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out'
    }, "<0.2");

    // Step C: Hero Text (The "Main Event" - Masked Cascade)
    masterRevealTl.to(heroChars, {
        y: "0%",
        opacity: 1,
        duration: 1.0,
        stagger: 0.025, // Smooth wave effect
        ease: "power3.out"
    }, "<0.1");

    // Step D: Decorative Lines (Drawing the UI structure)
    masterRevealTl.to(decoLinesH, {
        scaleX: 1,
        duration: 1.0,
        ease: "expo.out"
    }, "-=0.7");

    masterRevealTl.to(decoLinesV, {
        scaleY: 1,
        duration: 1.0,
        ease: "expo.out"
    }, "<");

    // Step E: Grid Overlay Fade
    masterRevealTl.to(gridOverlay, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");

    // Step F: Auxiliary Elements (Tagline, Brand - after hero settles)
    masterRevealTl.to(auxiliaryElements, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
    }, "-=0.5");

    // Step G: Metadata (Final Polish - location, scroll indicator)
    masterRevealTl.to(heroMeta, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        onComplete: () => {
            document.querySelector('.section-indicator-fixed')?.classList.add('visible');
            initScrollAnimations();
        }
    }, "-=0.4");
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
// WORD-BY-WORD TEXT REVEAL - Lunarui.dev Style Scroll Animation
// Words highlight sequentially from dim (0.1 opacity) to full (1.0) based on scroll progress
// ═══════════════════════════════════════════════════════════════════════════════
function initWordReveal() {
    const revealTexts = document.querySelectorAll('.reveal-text');

    revealTexts.forEach(text => {
        // Get inner HTML to preserve <em>, <strong> etc.
        const html = text.innerHTML;

        // Tokenize: split into words and HTML tags, preserving order
        // Regex matches either HTML tags or sequences of non-whitespace
        const parts = html.split(/(<[^>]+>)/);

        let wordIndex = 0;
        const wrappedHtml = parts.map(part => {
            // If it's an HTML tag, keep it as-is
            if (part.match(/^<[^>]+>$/)) {
                return part;
            }
            // Otherwise, split this text portion into words and wrap each
            return part.split(/(\s+)/).map(token => {
                // If whitespace, keep as-is
                if (token.match(/^\s+$/) || token === '') {
                    return token;
                }
                // Wrap word in span
                wordIndex++;
                return `<span class="reveal-word" data-word-index="${wordIndex}">${token}</span>`;
            }).join('');
        }).join('');

        text.innerHTML = wrappedHtml;

        const wordSpans = text.querySelectorAll('.reveal-word');
        const totalWords = wordSpans.length;

        if (totalWords === 0) return;

        // Set initial state - all words dim
        gsap.set(wordSpans, {
            opacity: 0.15,
            color: 'inherit'
        });

        // Pre-compute opacity quickSetters for each word (avoid per-frame style writes)
        const wordSetters = Array.from(wordSpans).map(word => gsap.quickSetter(word, 'opacity'));

        // Create scroll-driven animation
        ScrollTrigger.create({
            trigger: text,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;

                for (let i = 0; i < totalWords; i++) {
                    // Calculate when this word should start and end revealing
                    const wordStart = i / totalWords;
                    const wordEnd = (i + 1) / totalWords;

                    // Calculate this word's individual progress (0 to 1)
                    let wordProgress = 0;
                    if (progress >= wordEnd) {
                        wordProgress = 1;
                    } else if (progress > wordStart) {
                        wordProgress = (progress - wordStart) / (wordEnd - wordStart);
                    }

                    // Smooth the transition with easing
                    const easedProgress = wordProgress * wordProgress * (3 - 2 * wordProgress);

                    // Interpolate opacity from 0.15 to 1 via quickSetter
                    wordSetters[i](0.15 + (0.85 * easedProgress));
                }
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECT ACCORDION - niccolomiranda.com/work style click-to-expand
// ═══════════════════════════════════════════════════════════════════════════════
function initProjectAccordion() {
    const accordion = document.querySelector('.projects-accordion');
    const projectTabs = document.querySelectorAll('.project-tab');

    if (!accordion || projectTabs.length === 0) return;

    // Expand first project by default
    const firstTab = projectTabs[0];
    if (firstTab) {
        firstTab.classList.add('expanded');
        revealPanelContent(firstTab);
    }

    // Click handler for each tab
    projectTabs.forEach((tab) => {
        const strip = tab.querySelector('.project-strip');

        if (strip) {
            strip.addEventListener('click', () => {
                // If already expanded, do nothing (or optionally collapse)
                if (tab.classList.contains('expanded')) return;

                // Collapse all other tabs
                projectTabs.forEach((otherTab) => {
                    if (otherTab !== tab && otherTab.classList.contains('expanded')) {
                        collapseTab(otherTab);
                    }
                });

                // Expand clicked tab
                expandTab(tab);
            });
        }
    });

    // Expand a tab with animation
    function expandTab(tab) {
        tab.classList.add('expanded');

        // Get panel elements
        const panel = tab.querySelector('.project-panel');
        const tags = tab.querySelector('.panel-tags');
        const title = tab.querySelector('.panel-title');
        const desc = tab.querySelector('.panel-desc');
        const links = tab.querySelectorAll('.panel-link');
        const image = tab.querySelector('.panel-image img');

        // Set initial states
        if (tags) gsap.set(tags.children, { opacity: 0, y: 20 });
        if (title) gsap.set(title, { opacity: 0, y: 30 });
        if (desc) gsap.set(desc, { opacity: 0, y: 20 });
        if (links.length) gsap.set(links, { opacity: 0, y: 15 });
        if (image) gsap.set(image, { opacity: 0, scale: 1.1 });

        // Animate in after panel expands
        gsap.delayedCall(0.3, () => {
            const tl = gsap.timeline();

            // Staggered reveal of content
            if (tags) {
                tl.to(tags.children, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.out'
                }, 0);
            }

            if (title) {
                tl.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                }, 0.1);
            }

            if (desc) {
                tl.to(desc, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                }, 0.2);
            }

            if (links.length) {
                tl.to(links, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'power2.out'
                }, 0.3);
            }

            if (image) {
                tl.to(image, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                }, 0.2);
            }
        });
    }

    // Collapse a tab
    function collapseTab(tab) {
        tab.classList.remove('expanded');

        // Quick fade out of content
        const panelContent = tab.querySelectorAll('.panel-tags span, .panel-title, .panel-desc, .panel-link, .panel-image img');
        gsap.to(panelContent, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
        });
    }

    // Reveal panel content (for initial state)
    function revealPanelContent(tab) {
        gsap.delayedCall(0.5, () => {
            const tags = tab.querySelector('.panel-tags');
            const title = tab.querySelector('.panel-title');
            const desc = tab.querySelector('.panel-desc');
            const links = tab.querySelectorAll('.panel-link');
            const image = tab.querySelector('.panel-image img');

            const tl = gsap.timeline();

            if (tags) {
                tl.from(tags.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.out'
                }, 0);
            }

            if (title) {
                tl.from(title, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    ease: 'power3.out'
                }, 0.1);
            }

            if (desc) {
                tl.from(desc, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.out'
                }, 0.2);
            }

            if (links.length) {
                tl.from(links, {
                    opacity: 0,
                    y: 15,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'power2.out'
                }, 0.3);
            }

            if (image) {
                tl.from(image, {
                    opacity: 0,
                    scale: 1.1,
                    duration: 0.8,
                    ease: 'power2.out'
                }, 0.2);
            }
        });
    }
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

    // Initialize project accordion for click-to-expand
    initProjectAccordion();

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION TRANSITIONS - Smooth reveals when entering new sections
    // ═══════════════════════════════════════════════════════════════════════════
    initSectionTransitions();

    // ═══════════════════════════════════════════════════════════════════════════
    // ABOUT SECTION - STORYTELLING ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    initAboutStoryAnimations();

    // RawLab Button Style
    initRawLabButtons();

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
// SECTION TRANSITIONS - Smooth reveals when entering new sections
// ═══════════════════════════════════════════════════════════════════════════════
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        // Skip hero section
        if (index === 0) return;

        // Create reveal overlay for each section
        const overlay = document.createElement('div');
        overlay.className = 'section-reveal-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
        `;

        // Ensure section has relative positioning
        if (getComputedStyle(section).position === 'static') {
            section.style.position = 'relative';
        }

        // ─────────────────────────────────────────────────────────────────────
        // FADE + SLIDE REMOVED - User requested "impossibly smooth" natural scroll
        // ─────────────────────────────────────────────────────────────────────
        // Previous logic force-set opacity to 0.3 which caused jarring feel
        // We now rely on Lenis + CSS background transitions for seamless flow

        // ─────────────────────────────────────────────────────────────────────
        // HORIZONTAL LINE EFFECT - Draws across on enter
        // ─────────────────────────────────────────────────────────────────────
        const sectionLine = section.querySelector('.section-header') ||
            section.querySelector('.about-identity') ||
            section.firstElementChild;

        if (sectionLine) {
            // Create decorative line
            const decoLine = document.createElement('div');
            decoLine.className = 'section-deco-line';
            decoLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--color-accent, #FF6B35), transparent);
                transform: scaleX(0);
                transform-origin: left;
                opacity: 0.6;
            `;
            section.insertBefore(decoLine, section.firstChild);

            // Animate line on scroll - REVERSIBLE
            gsap.set(decoLine, { scaleX: 0, opacity: 0.6 });

            gsap.to(decoLine, {
                scaleX: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 0.5
                }
            });
        }

        // ─────────────────────────────────────────────────────────────────────
        // DARK SECTION - CLIP PATH REVEAL
        // ─────────────────────────────────────────────────────────────────────
        if (section.dataset.bg === 'dark' || section.classList.contains('about-bigpicture')) {
            const darkContent = section.querySelector('.bigpicture-content') || section;

            gsap.set(darkContent, {
                clipPath: 'inset(10% 0% 10% 0%)',
                webkitClipPath: 'inset(10% 0% 10% 0%)',
                opacity: 0.8
            });

            // Use quickSetters for fast per-frame updates (avoids gsap.set overhead)
            const setClipPath = gsap.quickSetter(darkContent, 'clipPath');
            const setWebkitClipPath = gsap.quickSetter(darkContent, 'webkitClipPath');
            const setOpacity = gsap.quickSetter(darkContent, 'opacity');

            ScrollTrigger.create({
                trigger: section,
                start: 'top 60%',
                end: 'top 20%',
                scrub: 0.8,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const inset = 10 * (1 - progress);
                    const clipValue = `inset(${inset}% 0% ${inset}% 0%)`;
                    setClipPath(clipValue);
                    setWebkitClipPath(clipValue);
                    setOpacity(0.8 + (0.2 * progress));
                }
            });
        }
    });

    // ─────────────────────────────────────────────────────────────────────────
    // ELEMENT PARALLAX - Multiple speeds for depth
    // ─────────────────────────────────────────────────────────────────────────
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const direction = el.dataset.parallaxDir || 'up';

        gsap.to(el, {
            y: direction === 'up' ? -100 * speed : 100 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: el.closest('section') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION STORYTELLING ANIMATIONS
// Parallax, text reveals, and staggered effects for the About section
// ═══════════════════════════════════════════════════════════════════════════════
function initAboutStoryAnimations() {
    // ─────────────────────────────────────────────────────────────────────────
    // 1. IDENTITY ANCHOR - Parallax + Staggered Reveals
    // ─────────────────────────────────────────────────────────────────────────
    const identitySection = document.querySelector('.about-identity');

    if (identitySection) {
        const identityPre = identitySection.querySelector('.identity-pre');
        const nameFirst = identitySection.querySelector('.name-first');
        const nameLast = identitySection.querySelector('.name-last');
        const visualFrame = identitySection.querySelector('.visual-frame');
        const badge = identitySection.querySelector('.identity-badge');
        const tagline = identitySection.querySelector('.identity-tagline');

        // Set initial states
        gsap.set([identityPre, nameFirst, nameLast], { opacity: 0, y: 60 });
        gsap.set(visualFrame, { opacity: 0, scale: 0.9, rotate: -5 });
        gsap.set(badge, { opacity: 0, scale: 0.5 });
        gsap.set(tagline, { opacity: 0, y: 30 });

        // REVERSIBLE staggered reveal animation using scrub timeline
        const identityTl = gsap.timeline({
            scrollTrigger: {
                trigger: identitySection,
                start: 'top 75%',
                end: 'top 25%',
                scrub: 0.8,
                toggleActions: 'play reverse play reverse'
            }
        });

        // Text reveals with stagger
        identityTl
            .to(identityPre, { opacity: 1, y: 0, duration: 0.3 })
            .to(nameFirst, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15')
            .to(nameLast, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15')
            .to(visualFrame, { opacity: 1, scale: 1, rotate: 0, duration: 0.4 }, '-=0.2')
            .to(badge, { opacity: 1, scale: 1, duration: 0.3 }, '-=0.2')
            .to(tagline, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15');

        // Parallax effect on scroll - ENHANCED for visibility
        gsap.to(visualFrame, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: identitySection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8
            }
        });

        // Badge counter-parallax - ENHANCED
        gsap.to(badge, {
            y: 120,
            rotation: 360,
            ease: 'none',
            scrollTrigger: {
                trigger: identitySection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Text parallax - different speeds for depth
        gsap.to(identityPre, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: identitySection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        });

        gsap.to([nameFirst, nameLast], {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: identitySection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6
            }
        });

        gsap.to(tagline, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: identitySection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. THREE PILLARS - REVERSIBLE Staggered Card Reveals
    // ─────────────────────────────────────────────────────────────────────────
    const pillarsSection = document.querySelector('.about-pillars');

    if (pillarsSection) {
        const pillars = pillarsSection.querySelectorAll('.pillar');

        pillars.forEach((pillar, index) => {
            const number = pillar.querySelector('.pillar-number');
            const title = pillar.querySelector('.pillar-title');
            const text = pillar.querySelector('.pillar-text');
            const icon = pillar.querySelector('.pillar-icon');

            // Set initial states
            gsap.set(pillar, { opacity: 0, y: 50 });
            gsap.set(number, { opacity: 0, x: -20 });
            gsap.set(title, { opacity: 0, y: 20 });
            gsap.set(text, { opacity: 0, y: 20 });
            gsap.set(icon, { opacity: 0, scale: 0.5, rotate: -45 });

            // REVERSIBLE scrub-based animation
            const pillarTl = gsap.timeline({
                scrollTrigger: {
                    trigger: pillar,
                    start: 'top 85%',
                    end: 'top 40%',
                    scrub: 0.5
                }
            });

            pillarTl
                .to(pillar, { opacity: 1, y: 0, duration: 0.3 })
                .to(number, { opacity: 1, x: 0, duration: 0.2 }, '-=0.15')
                .to(title, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1')
                .to(text, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1')
                .to(icon, { opacity: 0.5, scale: 1, rotate: 0, duration: 0.3 }, '-=0.1');
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. BIG PICTURE - REVERSIBLE Dramatic Scale-in with Text Reveal
    // ─────────────────────────────────────────────────────────────────────────
    const bigPicture = document.querySelector('.about-bigpicture');

    if (bigPicture) {
        const lines = bigPicture.querySelectorAll('.bigpicture-line');
        const accent = bigPicture.querySelector('.bigpicture-accent');

        // Set initial states
        gsap.set(lines, { opacity: 0, y: 80 });
        gsap.set(accent, { opacity: 0, scale: 0.5, y: 60 });

        // REVERSIBLE scrub-based animation
        const bigPictureTl = gsap.timeline({
            scrollTrigger: {
                trigger: bigPicture,
                start: 'top 70%',
                end: 'top 20%',
                scrub: 0.8
            }
        });

        bigPictureTl
            .to(lines[0], { opacity: 1, y: 0, duration: 0.3 })
            .to(accent, { opacity: 1, scale: 1, y: 0, duration: 0.4 }, '-=0.1')
            .to(lines[1], { opacity: 1, y: 0, duration: 0.3 }, '-=0.15');

        // Parallax effect - words move at different speeds
        gsap.to(accent, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: bigPicture,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 4. PHILOSOPHY - REVERSIBLE Text Reveals with Stagger
    // ─────────────────────────────────────────────────────────────────────────
    const philosophy = document.querySelector('.about-philosophy');

    if (philosophy) {
        const label = philosophy.querySelector('.philosophy-label');
        const paragraphs = philosophy.querySelectorAll('.philosophy-text p');
        const cta = philosophy.querySelector('.philosophy-cta');

        // Set initial states
        gsap.set(label, { opacity: 0, x: -30 });
        gsap.set(paragraphs, { opacity: 0, y: 40 });
        gsap.set(cta, { opacity: 0, y: 30 });

        // REVERSIBLE scrub-based animation
        const philosophyTl = gsap.timeline({
            scrollTrigger: {
                trigger: philosophy,
                start: 'top 75%',
                end: 'top 25%',
                scrub: 0.6
            }
        });

        philosophyTl
            .to(label, { opacity: 1, x: 0, duration: 0.2 })
            .to(paragraphs, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }, '-=0.1')
            .to(cta, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1');

        // Subtle parallax on paragraphs
        paragraphs.forEach((p, i) => {
            gsap.to(p, {
                yPercent: (i + 1) * -5,
                ease: 'none',
                scrollTrigger: {
                    trigger: philosophy,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 5. PHILOSOPHY MARQUEE - Scroll-speed effect
    // ─────────────────────────────────────────────────────────────────────────
    const marquee = document.querySelector('.philosophy-marquee');

    if (marquee) {
        const marqueeContent = marquee.querySelectorAll('.marquee-content');
        const baseDuration = 40; // cached base duration (avoids getComputedStyle per tick)

        // Speed up/slow down based on scroll velocity
        ScrollTrigger.create({
            trigger: marquee,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const speedMultiplier = 1 + Math.abs(velocity) / 5000;
                const newDuration = `${baseDuration / speedMultiplier}s`;

                marqueeContent.forEach(content => {
                    content.style.animationDuration = newDuration;
                });
            }
        });
    }
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
// EVOLVING TEXT ANIMATION V6 - HelloElva Style Cross-Fade
// ═══════════════════════════════════════════════════════════════════════════════
function initEvolvingText() {
    const charContainers = document.querySelectorAll('.char-container[data-char]');
    const allContainers = Array.from(charContainers);

    // Track active auto-animation
    let autoAnimationActive = null;

    charContainers.forEach(container => {
        const originalChar = container.querySelector('.original-char');
        const iconWrapper = container.querySelector('.char-icon-wrapper');

        if (!iconWrapper || !originalChar) return;

        // Set initial state - icon hidden
        gsap.set(iconWrapper, { opacity: 0 });
        gsap.set(originalChar, { opacity: 1 });

        // ─── Interaction Logic ───────────────────────────────────────────────

        const expand = () => {
            // Kill any running animations on this container
            gsap.killTweensOf([originalChar, iconWrapper]);

            container.classList.add('expanded');
            container.classList.add('is-hovered');

            // Pure opacity cross-fade (HelloElva style)
            gsap.to(originalChar, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });

            gsap.to(iconWrapper, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            });
        };

        const collapse = () => {
            // Kill any running animations on this container
            gsap.killTweensOf([originalChar, iconWrapper]);

            container.classList.remove('expanded');
            container.classList.remove('is-hovered');

            // Pure opacity cross-fade back
            gsap.to(originalChar, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            });

            gsap.to(iconWrapper, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
        };

        // Hover Events
        container.addEventListener('mouseenter', expand);
        container.addEventListener('mouseleave', collapse);
    });

    // ─── Auto-Animation Loop (HelloElva Style) ─────────────────────────────

    function autoAnimate() {
        // Skip if a letter is being hovered
        const hoveredContainer = allContainers.find(c => c.classList.contains('is-hovered'));
        if (hoveredContainer) {
            scheduleNext();
            return;
        }

        // Pick random container
        const container = allContainers[Math.floor(Math.random() * allContainers.length)];
        const originalChar = container.querySelector('.original-char');
        const iconWrapper = container.querySelector('.char-icon-wrapper');

        if (!iconWrapper || !originalChar) {
            scheduleNext();
            return;
        }

        autoAnimationActive = container;
        container.classList.add('expanded');

        // Create timeline for auto-animation
        const tl = gsap.timeline({
            onComplete: () => {
                container.classList.remove('expanded');
                autoAnimationActive = null;
                scheduleNext();
            }
        });

        // Cross-fade to icon - smooth and elegant
        tl.to(originalChar, { opacity: 0, duration: 0.4, ease: "power2.inOut" })
            .to(iconWrapper, { opacity: 1, duration: 0.4, ease: "power2.inOut" }, "<")
            // Hold for 1.2 seconds - give time to appreciate the icon
            .to({}, { duration: 1.2 })
            // Cross-fade back to letter
            .to(originalChar, { opacity: 1, duration: 0.4, ease: "power2.inOut" })
            .to(iconWrapper, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, "<");
    }

    function scheduleNext() {
        // Longer delay between animations - more breathing room
        setTimeout(autoAnimate, 1500);
    }

    // Start after a brief delay
    setTimeout(scheduleNext, 800);
}

// ═══════════════════════════════════════════════════════════════════════════════
// DUTEN-STYLE FOOTER SPOTLIGHT - Ultra Fluid Spring Physics
// ═══════════════════════════════════════════════════════════════════════════════
function initFooterSpotlight() {
    const footer = document.querySelector('.duten-footer');
    const fillText = document.querySelector('.footer-bg-text--fill');
    const spotlight = document.querySelector('.footer-spotlight');

    if (!footer || !fillText) return;

    // Track mouse position relative to footer
    let mouseX = 0;
    let mouseY = 0;

    // Current position with spring physics
    let currentX = 0;
    let currentY = 0;

    // Velocity for spring-like motion
    let velocityX = 0;
    let velocityY = 0;

    let isHovering = false;

    // ═══ TUNABLE PARAMETERS FOR BUTTERY SMOOTHNESS ═══

    // Larger radius for softer reveal effect
    const spotlightRadius = 220; // px

    // Spring physics parameters
    const stiffness = 0.03;     // Lower = more trailing/elastic (0.02-0.05 range)
    const damping = 0.85;       // Higher = smoother deceleration (0.8-0.95 range)
    const precision = 0.1;      // Stop threshold for micro-movements

    // Update target on mouse move
    footer.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Show spotlight on enter with smooth fade
    footer.addEventListener('mouseenter', (e) => {
        isHovering = true;
        const rect = footer.getBoundingClientRect();

        // Set initial position to prevent jump
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        currentX = startX;
        currentY = startY;
        mouseX = startX;
        mouseY = startY;
        velocityX = 0;
        velocityY = 0;

        // Smooth fade in with slight scale effect
        gsap.to(fillText, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // Hide spotlight on leave with graceful fade
    footer.addEventListener('mouseleave', () => {
        isHovering = false;

        // Smooth shrink and fade
        gsap.to(fillText, {
            clipPath: 'circle(0px at 50% 50%)',
            webkitClipPath: 'circle(0px at 50% 50%)',
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Cache container reference and offset (avoid per-frame querySelector + getBoundingClientRect)
    const bgContainer = document.querySelector('.footer-bg-container');
    let bgOffsetY = 0;

    function cacheBgOffset() {
        if (bgContainer) {
            const bgRect = bgContainer.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            bgOffsetY = bgRect.top - footerRect.top;
        }
    }
    cacheBgOffset();

    // Recache on resize
    window.addEventListener('resize', cacheBgOffset);
    // Also recache on mouseenter for accuracy
    footer.addEventListener('mouseenter', cacheBgOffset);

    // Animation loop via GSAP ticker (synced, no separate RAF)
    gsap.ticker.add(() => {
        // Spring physics calculation
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;

        velocityX += dx * stiffness;
        velocityY += dy * stiffness;
        velocityX *= damping;
        velocityY *= damping;

        currentX += velocityX;
        currentY += velocityY;

        // Only update DOM if hovering and there's meaningful movement
        if (isHovering && (Math.abs(velocityX) > precision || Math.abs(velocityY) > precision || Math.abs(dx) > precision || Math.abs(dy) > precision)) {
            if (bgContainer) {
                const relativeX = currentX;
                const relativeY = currentY - bgOffsetY;
                const clipValue = `circle(${spotlightRadius}px at ${relativeX}px ${relativeY}px)`;
                fillText.style.clipPath = clipValue;
                fillText.style.webkitClipPath = clipValue;
            }

            if (spotlight) {
                spotlight.style.left = currentX + 'px';
                spotlight.style.top = currentY + 'px';
            }
        }
    });
}


// ═══════════════════════════════════════════════════════════════════════════════
// RAWLAB BUTTONS - Magnetic + Staggered Text Reveal
// ═══════════════════════════════════════════════════════════════════════════════
function initRawLabButtons() {
    console.log("Initializing RawLab Buttons");
    const buttons = document.querySelectorAll('.rawlab-btn');

    buttons.forEach(btn => {
        // 1. Text Scramble/Stagger Setup
        const textSpan = btn.querySelector('.rawlab-btn-text');

        if (textSpan) {
            const text = textSpan.textContent.trim();
            // Split text and wrap in spans with transition delays
            textSpan.innerHTML = text.split('').map((char, i) => {
                // Determine delayed transition for stagger effect
                // CSS transition-delay logic
                const delay = i * 0.03; // 30ms stagger per char
                const charContent = char === ' ' ? '&nbsp;' : char;
                return `<span class="rawlab-btn-char" data-char="${char}" style="transition-delay: ${delay}s">${charContent}</span>`;
            }).join('');
        }

        // 2. Magnetic Effect (Stronger/Springier than standard)
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.6,
                ease: 'power3.out'
            });

            // Parallax the text container slightly
            if (textSpan) {
                gsap.to(textSpan, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            }
        });

        // 3. Reset on Leave
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.4)'
            });

            if (textSpan) {
                gsap.to(textSpan, {
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.4)'
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESIZE HANDLER - Dynamic Refreshes
// ═══════════════════════════════════════════════════════════════════════════════
function initResizeHandler() {
    let resizeTimeout;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // 1. Refresh global ScrollTrigger calculations
            ScrollTrigger.refresh();
        }, 200); // 200ms debounce
    });
}
