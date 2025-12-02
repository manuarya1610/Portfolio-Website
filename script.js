// ==================== LOADING SCREEN ====================
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Simulate loading progress
    let progress = 0;
    const loadingMessages = [
        'Loading assets...',
        'Initializing portfolio...',
        'Setting up animations...',
        'Almost ready...'
    ];

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        loadingBar.style.width = `${progress}%`;
        
        // Update loading text at certain intervals
        if (progress < 25) {
            loadingText.textContent = loadingMessages[0];
        } else if (progress < 50) {
            loadingText.textContent = loadingMessages[1];
        } else if (progress < 75) {
            loadingText.textContent = loadingMessages[2];
        } else {
            loadingText.textContent = loadingMessages[3];
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 500);
        }
    }, 100);

    // ==================== CUSTOM CURSOR ====================
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
        
        // Add delay to cursor follower
        cursorFollower.style.transition = 'all 0.15s ease';
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(255, 46, 99, 0.4)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(255, 46, 99, 0.2)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        }
        
        if (currentScroll > 100 && currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ==================== PARALLAX EFFECT ====================
    function initParallax() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxLayers.forEach(layer => {
                const speed = 0.3; // Adjust speed as needed
                const yPos = -(scrolled * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ==================== ANIMATIONS ON SCROLL ====================
    function initAnimations() {
        // Animate skill bars when in view
        const skillProgress = document.querySelectorAll('.skill-progress');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.style.width;
                    skillBar.style.width = '0';
                    
                    setTimeout(() => {
                        skillBar.style.transition = 'width 1.5s ease';
                        skillBar.style.width = width;
                    }, 300);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, observerOptions);
        
        skillProgress.forEach(skill => {
            observer.observe(skill);
        });

        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });

        // Initialize parallax
        initParallax();
    }

    // ==================== FORM SUBMISSION ====================
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.cssText = `
                background: var(--accent);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                margin-top: 1rem;
                text-align: center;
                animation: fadeIn 0.5s ease;
            `;
            
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 1500);
    });

    // ==================== PROJECT CARD INTERACTION ====================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                perspective(1000px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // ==================== SKILL ITEM INTERACTION ====================
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressBar = item.querySelector('.skill-progress');
            const currentWidth = progressBar.style.width;
            
            // Animate the progress bar on hover
            progressBar.style.transition = 'width 0.3s ease';
            progressBar.style.width = '100%';
            
            setTimeout(() => {
                progressBar.style.width = currentWidth;
            }, 300);
        });
    });

    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', (e) => {
        // Escape to go home
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // 1-4 to jump to sections
        if (e.key >= '1' && e.key <= '4') {
            const sections = ['#home', '#about', '#projects', '#contact'];
            const targetSection = sections[parseInt(e.key) - 1];
            const targetElement = document.querySelector(targetSection);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });

    // ==================== INITIALIZE ON LOAD ====================
    window.addEventListener('load', () => {
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
        
        // Force a reflow to enable transitions
        document.body.offsetHeight;
    });
});