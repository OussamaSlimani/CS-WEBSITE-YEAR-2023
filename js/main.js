(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel2").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Portfolio isotope and filter
  $(document).ready(function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });
    var defaultFilter = "*";
    var urlFilter = getParameterByName("filter");
    var activeFilter = urlFilter || defaultFilter;
    $('#portfolio-flters li[data-filter="' + activeFilter + '"]').addClass(
      "active"
    );
    portfolioIsotope.isotope({ filter: activeFilter });
    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("active");
      $(this).addClass("active");

      portfolioIsotope.isotope({ filter: $(this).data("filter") });
    });
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  });
})(jQuery);

// Get Year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// initializeIsotope
function initializeIsotope() {
  var container = document.getElementById("portfolio-container");
  var iso = new Isotope(container, {
    itemSelector: ".portfolio-item",
    layoutMode: "masonry",
    masonry: {
      columnWidth: ".portfolio-item",
    },
  });
  imagesLoaded(container, function () {
    iso.layout();
  });
}
window.addEventListener("load", initializeIsotope);

// Scroll
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("div[id]");
  function updateActiveNavLink() {
    const currentScrollPos = window.scrollY;
    let currentSection;
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (currentScrollPos > sectionTop && currentScrollPos < sectionBottom) {
        currentSection = section;
        break;
      }
    }
    if (currentSection) {
      const sectionId = currentSection.getAttribute("id");
      for (const link of navLinks) {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    }
  }
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
});

/* ************* Coming soon...  *************** */
// i protect
function calculateTimeDifference(targetDate) {
  const targetDateTime = new Date(targetDate);
  const currentDate = new Date();
  const timeDifference = targetDateTime - currentDate;

  if (timeDifference < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const seconds = Math.floor(timeDifference / 1000) % 60;
  const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function updateTimeInterval() {
  const targetDate = "2023-12-22T09:00:00Z"; // December 22, 2023, 9:00 AM
  const { days, hours, minutes, seconds } = calculateTimeDifference(targetDate);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update the time difference initially
updateTimeInterval();

// Update the time difference every second
setInterval(updateTimeInterval, 1000);

// Get Year
document.getElementById("currentYear").textContent = new Date().getFullYear();
/* ************* Coming soon...  *************** */
