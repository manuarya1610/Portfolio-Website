// Wait for page to load
$(document).ready(function () {
  // Remove intro after animation
  setTimeout(() => {
    $(".consist-intro").remove();
  }, 3500);

  // Cursor trail effect
  const cursorTrail = document.querySelector(".cursor-trail");
  let mouseX = 0,
    mouseY = 0;
  let trailX = 0,
    trailY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    cursorTrail.style.left = trailX - 10 + "px";
    cursorTrail.style.top = trailY - 10 + "px";
    cursorTrail.style.opacity = "0.7";

    requestAnimationFrame(animateTrail);
  }

  animateTrail();

  // Smooth scrolling for navigation
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        1000
      );
    }
  });

  // Animate project cards on scroll
  function animateOnScroll() {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight * 0.8) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize cards as hidden
  $(".project-card").each(function () {
    $(this).css({
      opacity: "0",
      transform: "translateY(30px)",
    });
  });

  // Check on scroll and load
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Form submission handling
  $("form").on("submit", function (e) {
    e.preventDefault();
    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');
    const originalText = submitBtn.html();

    submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');

    // Simulate sending
    setTimeout(() => {
      submitBtn.html('<i class="fas fa-check"></i> Sent!');
      submitBtn.css(
        "background",
        "linear-gradient(90deg, var(--cyber-green), var(--neon-cyan))"
      );

      setTimeout(() => {
        submitBtn.html(originalText);
        submitBtn.css(
          "background",
          "linear-gradient(90deg, var(--neon-cyan), var(--ai-blue))"
        );
        form[0].reset();
      }, 2000);
    }, 1500);
  });

  // Parallax effect for floating elements
  $(window).on("scroll", function () {
    const scrolled = $(window).scrollTop();
    $(".floating-element").each(function () {
      const speed = $(this).data("speed") || 0.5;
      const yPos = -(scrolled * speed);
      $(this).css(
        "transform",
        `translate(0, ${yPos}px) rotate(${scrolled * 0.1}deg)`
      );
    });
  });

  // Generate neural nodes
  function createNeuralNodes() {
    const neuralBg = document.querySelector(".neural-bg");
    for (let i = 0; i < 20; i++) {
      const node = document.createElement("div");
      node.className = "neural-node";
      node.style.left = Math.random() * 100 + "%";
      node.style.top = Math.random() * 100 + "%";
      node.style.animationDelay = Math.random() * 20 + "s";
      node.style.animationDuration = Math.random() * 10 + 15 + "s";
      neuralBg.appendChild(node);
    }
  }

  createNeuralNodes();

  // Add hover effect to skills
  $(".skill-item").hover(function () {
    const icon = $(this).find(".skill-icon");
    const emojis = ["⚡", "🔗", "☁️", "📊", "🎨", "🤖"];
    const current = icon.text();
    const index = emojis.indexOf(current);
    const next = emojis[(index + 1) % emojis.length];

    // Quick animation
    icon.css("transform", "scale(1.2)");
    setTimeout(() => {
      icon.css("transform", "scale(1)");
    }, 200);
  });

  // Typewriter effect for hero subtitle
  const heroText =
    "Building intelligent data pipelines and crafting beautiful digital experiences. Where engineering meets artistry in the world of ones and zeros.";
  let i = 0;
  function typeWriter() {
    if (i < heroText.length) {
      $(".hero-subtitle").text(heroText.substring(0, i + 1));
      i++;
      setTimeout(typeWriter, 30);
    }
  }

  // Start typing after intro
  setTimeout(typeWriter, 4000);
});
