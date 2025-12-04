// ====================================================================
// PERFECTIONIST'S PORTFOLIO - Main JavaScript
// Sophisticated interactions and smooth animations
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio Initializing...');
    
    // Initialize all modules
    initLoadingScreen();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initTextReveals();
    initCounters();
    initForm();
    initAwardsScroll();
    initProjectInteractions();
    
    console.log('✅ All modules initialized');
});

// === LOADING SCREEN ===
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingChars = document.querySelectorAll('.loading-char');
    
    if (!loadingScreen) return;
    
    // Animate characters
    loadingChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.animation = 'charReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }, index * 100);
    });
    
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.documentElement.classList.remove('no-scrollbar');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);
}

// === CUSTOM CURSOR ===
function initCustomCursor() {
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursorRing || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Mouse move listener
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .nav-link, .link-button, .submit-button, .project-preview'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.borderColor = 'var(--accent-green)';
            cursorDot.style.opacity = '0';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = 'var(--accent-green)';
            cursorDot.style.opacity = '1';
        });
    });
    
    // Animation loop
    function animateCursor() {
        // Smooth movement for ring
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        
        // Faster movement for dot
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// === NAVIGATION ===
function initNavigation() {
    const menuBtn = document.querySelector('.nav-menu-btn');
    const navOverlay = document.querySelector('.nav-overlay');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuBtn || !navOverlay) return;
    
    // Toggle navigation
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Animate menu icon
        if (navOverlay.classList.contains('active')) {
            menuIcon.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuIcon.children[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            menuIcon.children[0].style.transform = 'none';
            menuIcon.children[1].style.transform = 'none';
        }
    });
    
    // Close navigation when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuIcon.children[0].style.transform = 'none';
            menuIcon.children[1].style.transform = 'none';
        });
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!navOverlay.contains(e.target) && !menuBtn.contains(e.target)) {
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuIcon.children[0].style.transform = 'none';
            menuIcon.children[1].style.transform = 'none';
        }
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero title animation
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach(word => {
        gsap.from(word, {
            scrollTrigger: {
                trigger: word,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Section reveal animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index === 0) return; // Skip hero
        
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });
    
    // Grid items animation
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Project items animation
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
        gsap.from(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            width: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    });
}

// === TEXT REVEAL EFFECTS ===
function initTextReveals() {
    const revealElements = document.querySelectorAll('.text-reveal');
    
    revealElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : char;
            el.appendChild(span);
        });
        
        // Reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = el.querySelectorAll('span');
                    spans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, index * 20);
                    });
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(el);
    });
}

// === ANIMATED COUNTERS ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.replace(/\d+/g, '');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target, suffix);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }
}

// === CONTACT FORM ===
function initForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Form input effects
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.querySelector('span').textContent;
        const buttonIcon = submitButton.querySelector('.button-icon i');
        
        // Show loading state
        submitButton.querySelector('span').textContent = 'Sending...';
        buttonIcon.className = 'fas fa-spinner fa-spin';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success
            submitButton.querySelector('span').textContent = 'Message Sent!';
            buttonIcon.className = 'fas fa-check';
            submitButton.style.background = 'var(--accent-green)';
            submitButton.style.color = 'var(--bg-primary)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                buttonIcon.className = 'fas fa-paper-plane';
                submitButton.disabled = false;
                submitButton.style.background = '';
                submitButton.style.color = '';
            }, 3000);
            
        } catch (error) {
            console.error('Form error:', error);
            
            // Show error
            submitButton.querySelector('span').textContent = 'Error - Try Again';
            buttonIcon.className = 'fas fa-exclamation';
            submitButton.style.background = 'var(--accent-red)';
            submitButton.style.color = 'var(--bg-primary)';
            
            // Reset button
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                buttonIcon.className = 'fas fa-paper-plane';
                submitButton.disabled = false;
                submitButton.style.background = '';
                submitButton.style.color = '';
            }, 3000);
        }
    });
}

// === AWARDS HORIZONTAL SCROLL ===
function initAwardsScroll() {
    const awardsTrack = document.querySelector('.awards-track');
    const awardsContainer = document.querySelector('.awards-container');
    
    if (!awardsTrack || !awardsContainer) return;
    
    // Make awards container wider than track for smooth scrolling
    const containerWidth = awardsContainer.scrollWidth;
    awardsTrack.style.overflowX = 'auto';
    
    // Add scroll indicator
    awardsTrack.addEventListener('scroll', () => {
        const scrollLeft = awardsTrack.scrollLeft;
        const maxScroll = containerWidth - awardsTrack.clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
            awardsTrack.style.overflowX = 'hidden';
        }
    });
}

// === PROJECT INTERACTIONS ===
function initProjectInteractions() {
    const projectPreviews = document.querySelectorAll('.project-preview');
    
    projectPreviews.forEach(preview => {
        preview.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            
            const rect = preview.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            gsap.to(preview, {
                rotationY: rotateY,
                rotationX: -rotateX,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        preview.addEventListener('mouseleave', () => {
            if (window.innerWidth < 768) return;
            
            gsap.to(preview, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// === PERFORMANCE OPTIMIZATIONS ===
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle resize
window.addEventListener('resize', debounce(() => {
    // Update any layout-dependent calculations
}, 250));

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // Site should degrade gracefully
});