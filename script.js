// Performance Optimizations
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Lazy load images
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

// EPIC PRELOADER with synchronized.studio + bravepeople.co effects
class EpicPreloader {
  constructor() {
    this.preloader = document.getElementById("preloader");
    this.counter = document.querySelector(".loader-counter");
    this.progress = document.querySelector(".loader-progress");
    this.text = document.querySelector(".loader-text");
    this.rings = document.querySelectorAll(".loader-ring");

    this.loaded = 0;
    this.total = 100;
    this.speed = 20; // ms per increment

    this.init();
  }

  init() {
    // Text animation
    const text = "MANUARYA";
    let i = 0;
    const typeWriter = setInterval(() => {
      if (i < text.length) {
        this.text.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, 100);

    // Counter animation
    this.updateCounter();

    // Ring animations
    this.rings.forEach((ring, index) => {
      ring.style.animationDuration = `${2 + index}s`;
    });

    // Complete loading
    setTimeout(() => {
      this.complete();
    }, 2500);
  }

  updateCounter() {
    const interval = setInterval(() => {
      if (this.loaded < this.total) {
        this.loaded += 2;
        this.counter.textContent = `${this.loaded}%`;
      } else {
        clearInterval(interval);
        this.counter.textContent = "100%";
      }
    }, this.speed);
  }

  complete() {
    // Animate out
    gsap.to(this.preloader, {
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        this.preloader.style.display = "none";
        this.initMainAnimations();
      },
    });
  }

  initMainAnimations() {
    // Animate hero title
    gsap.to(".hero-title span", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5,
    });

    // Animate hero subtitle
    gsap.to(".hero-subtitle", {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });

    // Animate scroll indicator
    gsap.to(".scroll-line", {
      opacity: 1,
      duration: 1,
      delay: 2,
      ease: "power3.out",
    });

    // Initialize scroll animations
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Scroll reveal animations
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) *
          (percentageScroll / 100)
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add("visible");
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
          displayScrollElement(el);
        }
      });
    };

    // Initial check
    handleScrollAnimation();

    // Throttle scroll events
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollAnimation();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Parallax effects
    const parallaxElements = document.querySelectorAll(".parallax");
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach((el) => {
        const rate = el.dataset.rate || 0.5;
        const offset = scrolled * rate;
        el.style.transform = `translateY(${offset}px)`;
      });
    });
  }
}

// CUSTOM CURSOR with hollow circle
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector(".cursor");
    this.dot = document.querySelector(".cursor-dot");

    this.init();
  }

  init() {
    document.addEventListener("mousemove", this.moveCursor.bind(this));
    this.addHoverEffects();
  }

  moveCursor(e) {
    this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }

  addHoverEffects() {
    const hoverables = document.querySelectorAll(
      "a, button, .project-item, .menu-item"
    );

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.style.transform += " scale(1.5)";
        this.cursor.style.borderColor = "var(--accent-green)";
        this.dot.style.backgroundColor = "var(--accent-green)";
      });

      el.addEventListener("mouseleave", () => {
        this.cursor.style.transform = this.cursor.style.transform.replace(
          " scale(1.5)",
          ""
        );
        this.cursor.style.borderColor = "var(--text)";
        this.dot.style.backgroundColor = "var(--accent-green)";
      });
    });
  }
}

// MENU SYSTEM (Radaville Studio + your current menu)
class MenuSystem {
  constructor() {
    this.menuBtn = document.querySelector(".menu-btn");
    this.menuOverlay = document.querySelector(".menu-overlay");
    this.menuItems = document.querySelectorAll(".menu-item");

    this.init();
  }

  init() {
    this.menuBtn.addEventListener("click", this.toggleMenu.bind(this));
    this.menuItems.forEach((item) => {
      item.addEventListener("click", this.handleMenuItemClick.bind(this));
    });

    // Add keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.menuBtn.classList.toggle("active");
    this.menuOverlay.classList.toggle("active");

    // Toggle body scroll
    document.body.style.overflow = this.menuOverlay.classList.contains("active")
      ? "hidden"
      : "";

    // Animate menu items
    if (this.menuOverlay.classList.contains("active")) {
      this.animateMenuIn();
    }
  }

  animateMenuIn() {
    this.menuItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        }
      );
    });
  }

  handleMenuItemClick(e) {
    e.preventDefault();
    const target = e.target.getAttribute("href");

    this.closeMenu();

    setTimeout(() => {
      document.querySelector(target).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 800);
  }

  closeMenu() {
    this.menuBtn.classList.remove("active");
    this.menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// PROJECTS HOVER EFFECTS (Creative Giants + Bridge Tour)
class ProjectEffects {
  constructor() {
    this.projects = document.querySelectorAll(".project-item");
    this.init();
  }

  init() {
    this.projects.forEach((project) => {
      const preview = project.querySelector(".project-preview");
      const title = project.querySelector(".project-title");

      project.addEventListener("mouseenter", () => {
        // Animate preview in
        gsap.to(preview, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        // Animate title
        gsap.to(title, {
          color: "var(--accent-green)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      project.addEventListener("mouseleave", () => {
        // Animate preview out
        gsap.to(preview, {
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        });

        // Reset title
        gsap.to(title, {
          color: "var(--text)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Click to expand project (Bridge Tour inspired)
      project.addEventListener("click", (e) => {
        if (!e.target.closest("a")) {
          this.expandProject(project);
        }
      });
    });
  }

  expandProject(project) {
    const content = project.querySelector(".project-content");
    const preview = project.querySelector(".project-preview");

    // Toggle expanded state
    const isExpanded = project.classList.contains("expanded");

    if (isExpanded) {
      // Collapse
      gsap.to([content, preview], {
        width: "auto",
        height: "auto",
        duration: 0.8,
        ease: "power3.inOut",
      });

      project.classList.remove("expanded");
    } else {
      // Expand
      gsap.to(content, {
        width: "50%",
        duration: 0.8,
        ease: "power3.inOut",
      });

      gsap.to(preview, {
        width: "80%",
        height: "80vh",
        duration: 0.8,
        ease: "power3.inOut",
      });

      project.classList.add("expanded");
    }
  }
}

// TEXT ANIMATIONS (3200kelvin.com + elicyon.com)
class TextAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.initRevealText();
    this.initDistortionEffects();
    this.initMarqueeScroll();
  }

  initRevealText() {
    const revealTexts = document.querySelectorAll(".text-reveal");

    revealTexts.forEach((text) => {
      const words = text.textContent.split(" ");
      text.innerHTML = "";

      words.forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.display = "inline-block";
        span.style.overflow = "hidden";
        span.style.verticalAlign = "bottom";

        const innerSpan = document.createElement("span");
        innerSpan.textContent = word + " ";
        innerSpan.style.display = "block";
        innerSpan.style.transform = "translateY(100%)";

        span.appendChild(innerSpan);
        text.appendChild(span);
      });
    });

    // Animate on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll("span span");
            gsap.to(spans, {
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.3,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    revealTexts.forEach((text) => observer.observe(text));
  }

  initDistortionEffects() {
    const distortTexts = document.querySelectorAll(".text-distort");

    distortTexts.forEach((text) => {
      text.dataset.text = text.textContent;

      // Animate on hover
      text.addEventListener("mouseenter", () => {
        gsap.to(text, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      text.addEventListener("mouseleave", () => {
        gsap.to(text, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  }

  initMarqueeScroll() {
    const marquees = document.querySelectorAll(".text-marquee");

    marquees.forEach((marquee) => {
      const content = marquee.textContent;
      marquee.innerHTML = "";

      // Create multiple copies for seamless loop
      for (let i = 0; i < 5; i++) {
        const span = document.createElement("span");
        span.textContent = content + " ";
        span.style.display = "inline-block";
        marquee.appendChild(span);
      }

      // Animate
      const width = marquee.scrollWidth / 5;
      gsap.to(marquee, {
        x: -width * 2,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });
  }
}

// FORM ANIMATIONS (Radaville Studio)
class FormAnimations {
  constructor() {
    this.form = document.querySelector(".contact-form");
    this.init();
  }

  init() {
    if (!this.form) return;

    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      // Add floating label effect
      const label = input.nextElementSibling;

      input.addEventListener("focus", () => {
        label.style.color = "var(--accent-green)";
        gsap.to(label, {
          y: -25,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          label.style.color = "";
          gsap.to(label, {
            y: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      });

      // Check on load if already has value
      if (input.value) {
        gsap.to(label, {
          y: -25,
          duration: 0,
          ease: "power2.out",
        });
      }
    });

    // Submit animation
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const button = this.form.querySelector(".submit-btn");
      const originalText = button.textContent;

      // Animate button
      gsap.to(button, {
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          button.textContent = "Sent!";
          button.style.background = "var(--accent-green)";
          button.style.color = "var(--primary)";

          // Reset after delay
          setTimeout(() => {
            button.textContent = originalText;
            button.style.background = "";
            button.style.color = "";
            this.form.reset();

            // Reset labels
            inputs.forEach((input) => {
              const label = input.nextElementSibling;
              if (!input.value) {
                gsap.to(label, {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.in",
                });
              }
            });
          }, 2000);
        },
      });
    });
  }
}

// AWARDS SCROLL (RAYRAYlab)
class AwardsScroll {
  constructor() {
    this.track = document.querySelector(".award-track");
    if (!this.track) return;

    this.init();
  }

  init() {
    // Clone items for seamless loop
    const items = this.track.innerHTML;
    this.track.innerHTML += items;

    // Reset animation on hover
    this.track.addEventListener("mouseenter", () => {
      gsap.to(this.track, {
        timeScale: 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    this.track.addEventListener("mouseleave", () => {
      gsap.to(this.track, {
        timeScale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize preloader first
  new EpicPreloader();

  // Initialize other systems
  setTimeout(() => {
    new CustomCursor();
    new MenuSystem();
    new ProjectEffects();
    new TextAnimations();
    new FormAnimations();
    new AwardsScroll();
  }, 3000);

  // Performance monitoring
  window.addEventListener("load", () => {
    // Log performance metrics
    if ("performance" in window) {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);

        // If load time is too long, optimize
        if (loadTime > 3000) {
          console.warn(
            "Page load time is high, consider optimizing images and scripts"
          );
        }
      }, 0);
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for lazy loading and animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document
  .querySelectorAll(".skill-item, .project-item, .award-item")
  .forEach((el) => {
    observer.observe(el);
  });
