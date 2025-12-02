// ====================================================================
// AWARD-WINNING PORTFOLIO JAVASCRIPT
// Sophisticated interactions and animations
// ====================================================================

// === PRELOADER ===
class Preloader {
  constructor() {
    this.preloader = document.querySelector(".preloader");
    this.loader = document.querySelector(".loader");
    this.init();
  }

  init() {
    // Wait for everything to load
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hide();
      }, 1000);
    });

    // Fallback in case load event doesn't fire
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.preloader.classList.add("hidden");

    // Remove from DOM after animation
    setTimeout(() => {
      this.preloader.style.display = "none";
      // Initialize main app after preloader
      new PortfolioApp();
    }, 1000);
  }
}

// === MAIN PORTFOLIO APPLICATION ===
class PortfolioApp {
  constructor() {
    this.initParticles();
    this.initCursor();
    this.initNavbar();
    this.initAnimations();
    this.initProjectCards();
    this.initForm();
    this.initScrollAnimations();
    this.initCurrentYear();
    console.log("🎨 Portfolio App Initialized");
  }

  // === PARTICLE BACKGROUND ===
  initParticles() {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#64ffda" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#64ffda",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
        },
        retina_detect: true,
      });
    }
  }

  // === CUSTOM CURSOR ===
  initCursor() {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let followerX = 0;
    let followerY = 0;

    // Mouse move listener
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Hover effects
    const hoverElements = document.querySelectorAll(
      "a, button, .project-card, .contact-method, .skill-tag"
    );
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        follower.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        follower.classList.remove("hover");
      });
    });

    // Animation loop
    const animate = () => {
      // Smooth cursor movement
      posX += (mouseX - posX) / 5;
      posY += (mouseY - posY) / 5;

      followerX += (mouseX - followerX) / 15;
      followerY += (mouseY - followerY) / 15;

      cursor.style.left = posX + "px";
      cursor.style.top = posY + "px";

      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";

      requestAnimationFrame(animate);
    };

    animate();
  }

  // === NAVBAR SCROLL EFFECTS ===
  initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    // Scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Update active nav link
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll(".nav-link");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // === SCROLL ANIMATIONS ===
  initAnimations() {
    // Check if GSAP is available
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Animate sections on scroll
      gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Animate stats
      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          innerText: 0,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
        });
      });

      // Animate project cards
      const cards = document.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });
    }
  }

  // === PROJECT CARD 3D EFFECT ===
  initProjectCards() {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        if (window.innerWidth > 768) {
          // Only on desktop
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateY = ((x - centerX) / centerX) * 10;
          const rotateX = ((centerY - y) / centerY) * 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
      });

      card.addEventListener("mouseleave", () => {
        if (window.innerWidth > 768) {
          card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        }
      });
    });
  }

  // === CONTACT FORM ===
  initForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector(".submit-btn .btn");
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        // Get form data
        const formData = new FormData(form);

        // Send to Formspree
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Show success message
          submitBtn.textContent = "Message Sent! ✓";
          submitBtn.style.background = "#4CAF50";
          submitBtn.style.borderColor = "#4CAF50";

          // Reset form
          form.reset();

          // Reset button after delay
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = "";
            submitBtn.style.borderColor = "";
          }, 3000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Error:", error);
        submitBtn.textContent = "Error - Try Again";
        submitBtn.style.background = "#ff6b6b";
        submitBtn.style.borderColor = "#ff6b6b";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          submitBtn.style.borderColor = "";
        }, 3000);
      }
    });
  }

  // === SCROLL ANIMATIONS FOR ELEMENTS ===
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          // Animate skill tags with delay
          if (entry.target.classList.contains("skill-tag")) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, 100);
          }

          // Animate contact methods
          if (entry.target.classList.contains("contact-method")) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateX(0)";
            }, 200);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document
      .querySelectorAll(".skill-tag, .contact-method, .stat")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
      });
  }

  // === UPDATE CURRENT YEAR ===
  initCurrentYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// === INITIALIZE EVERYTHING ===
document.addEventListener("DOMContentLoaded", () => {
  // Start preloader
  new Preloader();

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Selection color */
        ::selection {
            background: rgba(100, 255, 218, 0.3);
            color: white;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--primary-bg);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--accent-primary);
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--accent-secondary);
        }
    `;
  document.head.appendChild(style);

  // Add loading animation to skill tags
  setTimeout(() => {
    const skillTags = document.querySelectorAll(".skill-tag");
    skillTags.forEach((tag, i) => {
      tag.style.animationDelay = `${i * 0.1}s`;
    });
  }, 1000);

  // Add hover sound effect (optional)
  const hoverSound = () => {
    // This is a subtle effect that could be enhanced with actual sound files
    const elements = document.querySelectorAll(
      ".btn, .project-card, .nav-link"
    );
    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        // You could add a subtle sound effect here
        // For now, we'll just add a visual feedback
        el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    });
  };

  // Initialize hover sound after a delay
  setTimeout(hoverSound, 2000);

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Tab to navigate through interactive elements
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("click", () => {
    document.body.classList.remove("keyboard-navigation");
  });
});

// === ADDITIONAL UTILITY FUNCTIONS ===
// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// === FALLBACK FOR OLDER BROWSERS ===
// Check for required features
window.onload = function () {
  // Check for CSS Grid support
  if (!CSS.supports("display", "grid")) {
    document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 20px;
                z-index: 99999;
            ">
                <div>
                    <h1>Browser Update Required</h1>
                    <p>Your browser doesn't support modern web features.</p>
                    <p>Please update to the latest version of Chrome, Firefox, or Safari.</p>
                </div>
            </div>
        `;
  }
};

// === ERROR HANDLING ===
window.addEventListener("error", function (e) {
  console.error("Portfolio Error:", e.error);

  // Graceful degradation for non-critical errors
  if (e.error.message.includes("particlesJS")) {
    console.warn("Particles.js failed to load - continuing without background");
  }

  if (e.error.message.includes("gsap")) {
    console.warn("GSAP failed to load - animations disabled");
  }

  // Don't prevent the site from working
  e.preventDefault();
});
