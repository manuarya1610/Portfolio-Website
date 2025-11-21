// full modal

$(function () {
  $(".md-trigger").on("click", function () {
    $(".md-modal").addClass("md-show");
  });

  $(".md-close").on("click", function () {
    $(".md-modal").removeClass("md-show");
  });
});

// smooth scroll

$(document).on("click", 'a[href^="#"]', function (event) {
  const target = $($.attr(this, "href"));

  if (target.length) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      900
    );
  }
});

// close modal with ESC
$(document).on("keyup", function (event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    $(".md-modal").removeClass("md-show");
  }
});