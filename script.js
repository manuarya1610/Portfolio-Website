// ====================================================================
// AWARD-WINNING PORTFOLIO - ULTIMATE JAVASCRIPT
// Complex animations, interactions, and storytelling
// ====================================================================

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Award-Winning Portfolio Initializing...");

  // Mark body as loaded
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);

  // Initialize all modules
  initLoader();
  initThemeToggle();
  initNavigation();
  initCursor();
  initProgressTracker();
  initAudioPlayer();
  initScrollAnimations();
  initProjectCards();
  initContactForm();
  initCounters();
  initParticles();
  initThreeJS();
  initScrollEffects();

  console.log("✅ All modules initialized successfully");
});

// === LOADER ANIMATION ===
function initLoader() {
  const loaderContainer = document.querySelector(".loader-container");
  const loaderProgress = document.querySelector(".loader-progress");
  const loaderChars = document.querySelectorAll(".loader-char");

  if (!loaderContainer || !loaderProgress) return;

  // Animate progress bar
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    loaderProgress.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);

      // Hide loader with animation
      setTimeout(() => {
        loaderContainer.style.opacity = "0";
        loaderContainer.style.visibility = "hidden";

        // Remove from DOM after animation
        setTimeout(() => {
          loaderContainer.style.display = "none";
        }, 1000);
      }, 500);
    }
  }, 100);

  // Animate characters
  loaderChars.forEach((char, index) => {
    setTimeout(() => {
      char.style.animation = `charReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
    }, index * 100);
  });
}

// === THEME TOGGLE ===
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-switch");
  const themeIcon = document.querySelector(".theme-icon");
  const themeText = document.querySelector(".theme-text");

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");

    if (isDark) {
      // Switch to light theme
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      themeText.textContent = "Light Mode";

      // Animate icon
      gsap.to(themeIcon, {
        rotation: 180,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    } else {
      // Switch to dark theme
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      themeText.textContent = "Dark Mode";

      // Animate icon
      gsap.to(themeIcon, {
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }

    // Save preference
    localStorage.setItem("theme", isDark ? "light" : "dark");
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeText.textContent = "Light Mode";
  }
}

// === NAVIGATION ===
function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const navToggleLines = document.querySelectorAll(".nav-toggle-line");

  if (!navToggle || !navOverlay) return;

  // Toggle navigation
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navOverlay.classList.toggle("active");
    document.body.classList.toggle("nav-open");

    // Animate hamburger to X
    if (navOverlay.classList.contains("active")) {
      navToggleLines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      navToggleLines[1].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      navToggleLines[0].style.transform = "none";
      navToggleLines[1].style.transform = "none";
    }
  });

  // Close navigation when clicking link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navOverlay.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggleLines[0].style.transform = "none";
      navToggleLines[1].style.transform = "none";
    });
  });

  // Close navigation when clicking outside
  document.addEventListener("click", (e) => {
    if (!navOverlay.contains(e.target) && !navToggle.contains(e.target)) {
      navOverlay.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggleLines[0].style.transform = "none";
      navToggleLines[1].style.transform = "none";
    }
  });

  // Animate navigation links on hover
  const navLinkContainers = document.querySelectorAll(".nav-link-container");
  navLinkContainers.forEach((container) => {
    const number = container.querySelector(".nav-link-number");
    const link = container.querySelector(".nav-link");

    container.addEventListener("mouseenter", () => {
      gsap.to(number, {
        x: 20,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(link, {
        x: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    container.addEventListener("mouseleave", () => {
      gsap.to(number, {
        x: 0,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(link, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// === CUSTOM CURSOR ===
function initCursor() {
  const cursorCircle = document.querySelector(".cursor-circle");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorText = document.querySelector(".cursor-text");

  if (!cursorCircle || !cursorDot) return;

  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;
  let dotX = 0;
  let dotY = 0;

  // Interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .nav-link, .cta-button, .submit-button, .social-link"
  );

  // Mouse move
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor text position
    if (cursorText) {
      cursorText.style.left = mouseX + "px";
      cursorText.style.top = mouseY + "px";
    }
  });

  // Interactive element hover
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorCircle.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorCircle.style.opacity = "0.8";
      cursorCircle.style.borderColor = "var(--accent-primary)";

      cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)";
      cursorDot.style.opacity = "0";

      // Set cursor text
      if (cursorText) {
        const text =
          el.getAttribute("data-cursor") ||
          (el.classList.contains("project-card")
            ? "View"
            : el.classList.contains("nav-link")
            ? "Explore"
            : el.classList.contains("cta-button")
            ? "Click"
            : "");
        cursorText.textContent = text;
        cursorText.style.opacity = text ? "1" : "0";
      }
    });

    el.addEventListener("mouseleave", () => {
      cursorCircle.style.transform = "translate(-50%, -50%) scale(1)";
      cursorCircle.style.opacity = "0.5";
      cursorCircle.style.borderColor = "var(--accent-primary)";

      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      cursorDot.style.opacity = "1";

      if (cursorText) {
        cursorText.style.opacity = "0";
      }
    });
  });

  // Animation loop
  function animateCursor() {
    // Smooth movement for circle
    circleX += (mouseX - circleX) * 0.1;
    circleY += (mouseY - circleY) * 0.1;

    // Faster movement for dot
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    cursorCircle.style.left = circleX + "px";
    cursorCircle.style.top = circleY + "px";

    cursorDot.style.left = dotX + "px";
    cursorDot.style.top = dotY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// === PROGRESS TRACKER ===
function initProgressTracker() {
  const progressDots = document.querySelectorAll(".progress-dot");
  const progressLine = document.querySelector(".progress-line");

  if (!progressDots.length || !progressLine) return;

  // Scroll progress
  function updateProgress() {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    // Update active dot
    let activeSection = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        activeSection = index;
      }
    });

    progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeSection);
    });

    // Update progress line
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressLine.style.setProperty("--progress", `${progress}%`);
  }

  // Click to scroll
  progressDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const sectionId = dot.getAttribute("data-section");
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  window.addEventListener("scroll", updateProgress);
  updateProgress();
}

// === AUDIO PLAYER ===
function initAudioPlayer() {
  const audioToggle = document.querySelector(".audio-toggle");
  const audioWave = document.querySelector(".audio-wave");

  if (!audioToggle) return;

  // Create audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext = null;
  let oscillator = null;
  let isPlaying = false;

  audioToggle.addEventListener("click", () => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (!isPlaying) {
      // Start ambient sound
      oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.detune.setValueAtTime(200, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      isPlaying = true;
      audioToggle.classList.add("playing");

      // Animate wave bars
      gsap.to(audioWave.children, {
        scaleY: 2,
        duration: 0.5,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    } else {
      // Stop ambient sound
      if (oscillator) {
        oscillator.stop();
      }
      isPlaying = false;
      audioToggle.classList.remove("playing");

      // Stop wave animation
      gsap.killTweensOf(audioWave.children);
      gsap.set(audioWave.children, { scaleY: 1 });
    }
  });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Hero title animation
  const titleWords = document.querySelectorAll(".title-word");
  titleWords.forEach((word) => {
    gsap.from(word, {
      scrollTrigger: {
        trigger: word,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  // Section reveal animations
  const sections = document.querySelectorAll("section:not(#hero)");
  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  // Timeline items animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power2.out",
    });
  });

  // Project cards animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // Philosophy cards animation
  const philosophyCards = document.querySelectorAll(".philosophy-card");
  philosophyCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Skill orbs animation
  const skillOrbs = document.querySelectorAll(".skill-orb");
  skillOrbs.forEach((orb, index) => {
    gsap.from(orb.querySelector(".level-bar"), {
      scrollTrigger: {
        trigger: orb,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      width: 0,
      duration: 1.5,
      delay: index * 0.2,
      ease: "power2.out",
    });
  });
}

// === PROJECT CARDS INTERACTION ===
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  if (!projectCards.length) return;

  projectCards.forEach((card) => {
    // Mouse move tilt effect
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;

      gsap.to(card, {
        rotationY: rotateY,
        rotationX: -rotateX,
        duration: 0.5,
        ease: "power2.out",
      });

      // Parallax effect for image
      const image = card.querySelector(".project-image");
      if (image) {
        const moveX = (x - centerX) * 0.01;
        const moveY = (y - centerY) * 0.01;

        gsap.to(image, {
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      if (window.innerWidth < 768) return;

      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });

      const image = card.querySelector(".project-image");
      if (image) {
        gsap.to(image, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        });
      }
    });
  });
}

// === CONTACT FORM ===
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  // Form input animations
  const formInputs = contactForm.querySelectorAll(
    ".form-input, .form-select, .form-textarea"
  );
  formInputs.forEach((input) => {
    const label = input.nextElementSibling;

    input.addEventListener("focus", () => {
      gsap.to(label.querySelector(".label-line"), {
        width: "100%",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        gsap.to(label.querySelector(".label-line"), {
          width: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // Form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");
    const originalText = submitButton.querySelector(".button-text").textContent;
    const submitSpinner = submitButton.querySelector(".button-sparkle i");

    // Show loading state
    submitButton.querySelector(".button-text").textContent = "Sending...";
    submitSpinner.className = "fas fa-spinner fa-spin";
    submitButton.disabled = true;

    try {
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success animation
      gsap.to(submitButton, {
        background: "linear-gradient(135deg, #00ff9d, #00d4ff)",
        duration: 0.5,
        ease: "power2.out",
      });

      submitButton.querySelector(".button-text").textContent = "Message Sent!";
      submitSpinner.className = "fas fa-check";

      // Reset form
      contactForm.reset();

      // Reset button after delay
      setTimeout(() => {
        gsap.to(submitButton, {
          background: "var(--gradient-accent)",
          duration: 0.5,
          ease: "power2.out",
        });

        submitButton.querySelector(".button-text").textContent = originalText;
        submitSpinner.className = "fas fa-bolt";
        submitButton.disabled = false;
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);

      // Show error state
      gsap.to(submitButton, {
        background: "linear-gradient(135deg, #ff6b00, #ff00c8)",
        duration: 0.5,
        ease: "power2.out",
      });

      submitButton.querySelector(".button-text").textContent =
        "Error - Try Again";
      submitSpinner.className = "fas fa-exclamation";

      // Reset button after delay
      setTimeout(() => {
        gsap.to(submitButton, {
          background: "var(--gradient-accent)",
          duration: 0.5,
          ease: "power2.out",
        });

        submitButton.querySelector(".button-text").textContent = originalText;
        submitSpinner.className = "fas fa-bolt";
        submitButton.disabled = false;
      }, 3000);
    }
  });
}

// === COUNTER ANIMATIONS ===
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  if (!counters.length) return;

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const suffix = counter.textContent.replace(/\d+/g, "");

    // Only animate when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(counter, target, suffix);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

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

// === PARTICLES ANIMATION ===
function initParticles() {
  const floatingElements = document.querySelectorAll(
    ".floating-element, .visual-element"
  );

  floatingElements.forEach((el) => {
    // Add random floating animation
    gsap.to(el, {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      rotation: "random(-15, 15)",
      duration: "random(3, 6)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: "random(0, 2)",
    });
  });
}

// === THREE.JS BACKGROUND ===
function initThreeJS() {
  if (typeof THREE === "undefined") return;

  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Particles
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random positions in a sphere
    const radius = 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    // Gradient colors
    colors[i] = 0.4 + Math.random() * 0.6; // R
    colors[i + 1] = 1; // G
    colors[i + 2] = 0.8 + Math.random() * 0.2; // B
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 5;

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    // Pulsing effect
    const time = Date.now() * 0.001;
    particles.material.opacity = 0.6 + Math.sin(time) * 0.2;

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
  // Parallax effect for hero
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroContent.style.transform = `translateY(${rate}px)`;
    });
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (revealElements.length && typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
}

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
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

// Throttle function for resize events
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

// === ERROR HANDLING ===
window.addEventListener("error", function (e) {
  console.error("Portfolio error:", e.error);
  // Graceful degradation - site should still work
});

// === ADDITIONAL INTERACTIONS ===
// Add data-cursor attributes dynamically
document.querySelectorAll("a, button").forEach((el) => {
  if (!el.hasAttribute("data-cursor")) {
    if (el.classList.contains("project-link")) {
      el.setAttribute("data-cursor", "View");
    } else if (el.classList.contains("nav-link")) {
      el.setAttribute("data-cursor", "Explore");
    } else if (el.classList.contains("cta-button")) {
      el.setAttribute("data-cursor", "Click");
    } else if (el.classList.contains("submit-button")) {
      el.setAttribute("data-cursor", "Send");
    }
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Escape closes navigation
  if (e.key === "Escape") {
    document.querySelector(".nav-overlay")?.classList.remove("active");
    document.body.classList.remove("nav-open");
  }

  // Space pauses audio
  if (e.key === " " && e.target === document.body) {
    e.preventDefault();
    document.querySelector(".audio-toggle")?.click();
  }
});

// Initialize all on load
window.addEventListener("load", () => {
  console.log("🎉 Portfolio fully loaded!");

  // Add loaded class for final transitions
  document.body.classList.add("fully-loaded");

  // Final check for animations
  setTimeout(() => {
    if (typeof gsap !== "undefined") {
      gsap.to("body", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, 100);
});
