// full modal

$(function () {
  $(".md-trigger").on("click", function () {
    $(".md-modal").addClass("md-show");
  });

  $(".md-close").on("click", function () {
    $(".md-modal").removeClass("md-show");
  });
});

// modal

// smooth

$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top,
    },
    900
  );
});

// Data Engineering Skills Animation
$(document).ready(function () {
  // Animate skills on scroll
  $(window).scroll(function () {
    $(".de-skill").each(function () {
      var position = $(this).offset().top;
      var scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;

      if (position < scrollPosition) {
        $(this).addClass("animated");
      }
    });
  });

  // Trigger scroll event on load
  $(window).trigger("scroll");
});

// Enhanced hover effects for data engineering skills
$(document).ready(function () {
  $(".de-skill").hover(
    function () {
      // Mouse enter
      $(this).css("transform", "translateY(-10px) scale(1.05)");
    },
    function () {
      // Mouse leave
      $(this).css("transform", "translateY(0) scale(1)");
    }
  );
});

// Performance optimization for animations
let lastScrollY = window.scrollY;
let ticking = false;

function updateOnScroll() {
  // Add any scroll-based animations here
  ticking = false;
}

window.addEventListener("scroll", function () {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function () {
      updateOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// end
