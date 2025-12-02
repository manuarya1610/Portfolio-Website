// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX - 10}px, ${
    e.clientY - 10
  }px)`;
  cursorDot.style.transform = `translate(${e.clientX - 2}px, ${
    e.clientY - 2
  }px)`;
});

document.addEventListener("mousedown", () => {
  cursor.style.transform += " scale(0.8)";
});

document.addEventListener("mouseup", () => {
  cursor.style.transform = cursor.style.transform.replace(" scale(0.8)", "");
});

// Parallax Effect
function initParallax() {
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxLayers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed") || 0.5;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Fade-in Animation on Scroll
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// Project Navigation
function initProjectNavigation() {
  const prevBtn = document.getElementById("prev-project");
  const nextBtn = document.getElementById("next-project");
  const projectCards = document.querySelectorAll(".project-card");
  let currentIndex = 0;

  function updateProjects() {
    projectCards.forEach((card, index) => {
      card.style.opacity = "0.5";
      card.style.transform = "scale(0.95)";

      if (index === currentIndex) {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + projectCards.length) % projectCards.length;
    updateProjects();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projectCards.length;
    updateProjects();
  });

  // Initialize
  updateProjects();
}

// Form Submission
function initForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background =
        "linear-gradient(90deg, var(--accent-green), var(--accent-cyan))";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background =
          "linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))";
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Typing Animation for Hero
function initTypingAnimation() {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const text =
    "I transform complex data challenges into elegant solutions, building bridges between raw information and meaningful insights. Where engineering precision meets creative expression.";
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      heroSubtitle.textContent = text.substring(0, index + 1);
      index++;
      setTimeout(typeWriter, 30);
    }
  }

  // Start typing after page loads
  setTimeout(typeWriter, 1000);
}

// Mouse Move Gradient Effect
function initMouseMoveEffect() {
  const hero = document.querySelector(".hero");

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    hero.style.setProperty("--mouse-x", x);
    hero.style.setProperty("--mouse-y", y);
  });
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  initParallax();
  initScrollAnimations();
  initProjectNavigation();
  initForm();
  initSmoothScroll();
  initTypingAnimation();
  initMouseMoveEffect();

  // Add CSS variables for mouse effect
  const style = document.createElement("style");
  style.textContent = `
        .hero-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%),
                rgba(138, 43, 226, 0.15) 0%,
                transparent 50%
            );
            transition: background 0.3s ease;
            z-index: -1;
        }
    `;
  document.head.appendChild(style);
});

// Add some interactive effects to project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
});
