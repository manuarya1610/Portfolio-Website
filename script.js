// Unified interactions & animations (revamped 2025)

document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------
  // Modal (Easter Egg)
  // -----------------------------
  const modal = document.querySelector(".md-modal");
  const triggers = document.querySelectorAll(".md-trigger");
  const closeBtn = document.querySelector(".md-close");
  const overlay = document.querySelector(".md-overlay");

  const openModal = () => {
    if (modal) modal.classList.add("md-show");
  };

  const closeModal = () => {
    if (modal) modal.classList.remove("md-show");
  };

  if (triggers.length && modal) {
    triggers.forEach((btn) => btn.addEventListener("click", openModal));
  }
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
    }
  });

  // -----------------------------
  // Smooth scroll for anchor links
  // -----------------------------
  if (window.jQuery) {
    $(document).on("click", 'a[href^="#"]', function (event) {
      const targetId = $(this).attr("href");
      if (!targetId || targetId === "#") return;

      const $target = $(targetId);
      if ($target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $target.offset().top,
          },
          900
        );
      }
    });
  } else {
    // Native fallback
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // -----------------------------
  // Hover text wobble + custom cursor
  // -----------------------------
  (function () {
    const links = document.querySelectorAll(".hover-this");
    const cursor = document.querySelector(".cursor");

    const animateIt = function (e) {
      const span = this.querySelector("span");
      if (!span) return;

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const move = 25;
      const xMove = (x / rect.width) * (move * 2) - move;
      const yMove = (y / rect.height) * (move * 2) - move;

      span.style.transform = `translate(${xMove}px, ${yMove}px)`;

      if (e.type === "mouseleave") span.style.transform = "";
    };

    const editCursor = (e) => {
      if (!cursor) return;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    links.forEach((link) => {
      link.addEventListener("mousemove", animateIt);
      link.addEventListener("mouseleave", animateIt);
    });

    window.addEventListener("mousemove", editCursor);
  })();

  // -----------------------------
  // Hero parallax effect on "CREATIVE DESIGNER DEVELOPER"
  // -----------------------------
  (function () {
    const mainbox = document.querySelector(".wrapper");
    const text1 = document.querySelector("#text1");
    const text2 = document.querySelector("#text2");
    if (!mainbox || !text1 || !text2) return;

    mainbox.addEventListener("mousemove", (e) => {
      const rect = mainbox.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const x = relativeX * 0.4;
      text1.style.transform = `translate(${x}px,0)`;
      text2.style.transform = `translate(${x}px,0)`;
    });
  })();

  // -----------------------------
  // Intro animation for top nav items
  // -----------------------------
  if (window.gsap) {
    const textrev = gsap.timeline();
    textrev.from(".site-menu .menu-item", {
      duration: 0.5,
      x: 700,
      ease: "power4.out",
      delay: 1.0,
      skewX: 10,
      stagger: { amount: 0.3 },
    });
  }

  // -----------------------------
  // Scroll-based micro-animations
  // -----------------------------
  if (window.jQuery) {
    $(document).scroll(function () {
      const scroll = $(window).scrollTop();

      // HELLO boxes slide in
      let amountHello = -140 + scroll * 0.2;
      if (amountHello < 10) {
        $(".about-letter").css({ left: amountHello + "px" });
      }

      // "I am Manu Arya" baseline slide
      let amountName = -155 + scroll * 0.2;
      if (amountName < 10) {
        $(".span-line").css({ bottom: amountName + "px" });
      }

      // Show compact menu icon after certain scroll
      if (scroll > 600) {
        $(".menu-open").addClass("menu-open-show");
      } else {
        $(".menu-open").removeClass("menu-open-show");
      }

      // PROJECTS label slide
      let amountProj = -305 + scroll * 0.2;
      if (amountProj < 10) {
        $(".project-about-letter").css({ left: amountProj + "px" });
      }
    });
  }

  // -----------------------------
  // Rotating circular "scroll down" text
  // -----------------------------
  (function () {
    const rotated = document.getElementById("rotated");
    if (!rotated || typeof CircleType === "undefined") return;

    // Create circular layout
    new CircleType(rotated).radius(80);

    // Rotate with scroll
    const rotateWithScroll = () => {
      const offset =
        (window.pageYOffset || document.documentElement.scrollTop) * 0.3;
      const els = document.querySelectorAll(".circular-text");
      els.forEach((el) => {
        el.style.transform = `rotate(${offset}deg)`;
      });
    };

    window.addEventListener("scroll", rotateWithScroll);
  })();

  // -----------------------------
  // Overlay navigation menu (GSAP)
  // -----------------------------
  (function () {
    if (!window.gsap) return;

    const navContainer = document.querySelector(".nav-container");
    const menuOpenBtn = document.querySelector(".menu-open");
    const menuCloseBtn = document.querySelector(".menu-close");

    if (!navContainer || !menuOpenBtn || !menuCloseBtn) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(".nav-container", {
      duration: 1,
      left: 0,
      ease: "expo.inOut",
    });

    tl.from(
      ".menu > div",
      {
        duration: 0.8,
        y: 100,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.1,
      },
      "-=0.4"
    );

    tl.reverse();

    const toggleMenu = () => tl.reversed(!tl.reversed());

    menuOpenBtn.addEventListener("click", toggleMenu);
    menuCloseBtn.addEventListener("click", toggleMenu);
  })();
});