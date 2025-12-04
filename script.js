// Loading Animation
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingText = document.querySelector(".loading-text");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroScroll = document.querySelector(".hero-scroll");

  // Simulate loading
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";

      // Animate hero elements
      gsap.to(heroTitle.querySelectorAll("span"), {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.to(heroSubtitle, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.to(heroScroll, {
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });
    }, 500);
  }, 2500);
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

// Hover effects on links
const hoverElements = document.querySelectorAll(
  "a, button, .project-item, .skill-card"
);

hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursor.style.borderColor = "#00ffc8";
  });

  element.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.borderColor = "rgba(255, 255, 255, 0.8)";
  });
});

// Navigation Menu
const navToggle = document.querySelector(".nav-toggle");
const navOverlay = document.querySelector(".nav-overlay");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navOverlay.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("href");

    // Close menu
    navToggle.classList.remove("active");
    navOverlay.classList.remove("active");

    // Scroll to section
    setTimeout(() => {
      document.querySelector(target).scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  });
});

// Text Reveal on Scroll
const revealElements = document.querySelectorAll(".reveal-text");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      gsap.to(element.querySelectorAll("span"), {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// Project Hover Effects
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((item, index) => {
  const preview = item.querySelector(".project-preview");

  item.addEventListener("mouseenter", () => {
    gsap.to(preview, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(preview, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Form Animation
const formGroups = document.querySelectorAll(".form-group");

formGroups.forEach((group) => {
  const input = group.querySelector("input, textarea");
  const label = group.querySelector("label");

  input.addEventListener("focus", () => {
    label.style.color = "#00ffc8";
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      label.style.color = "";
    }
  });
});

// Skills Counter Animation
const skillCards = document.querySelectorAll(".skill-card");

const animateSkills = () => {
  skillCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    const cardVisible = 100;

    if (cardTop < window.innerHeight - cardVisible) {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    }
  });
};

window.addEventListener("scroll", animateSkills);

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Initialize animations on load
window.addEventListener("load", () => {
  revealOnScroll();
  animateSkills();
});
