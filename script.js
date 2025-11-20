// Modal + smooth scroll (2025 refresh, vanilla JS)

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".md-modal");
  const triggers = document.querySelectorAll(".md-trigger");
  const closeBtn = document.querySelector(".md-close");
  const overlay = document.querySelector(".md-overlay");

  // Open modal on any .md-trigger click
  if (modal && triggers.length > 0) {
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.classList.add("md-show");
      });
    });
  }

  // Close modal helper
  const closeModal = () => {
    if (modal) {
      modal.classList.remove("md-show");
    }
  };

  // Close modal on close button
  if (modal && closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  // Close modal on ESC key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
    }
  });

  // Smooth-scroll for in-page anchor links
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
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
});