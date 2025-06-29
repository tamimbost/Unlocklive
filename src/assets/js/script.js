/**
 * ULV Frontend JavaScript Controller
 * -----------------------------------
 * Developed using IIFE (Immediately Invoked Function Expression)
 * to encapsulate scope and avoid polluting the global namespace.
 * Dependencies: jQuery, GSAP (ScrollTrigger, ScrollSmoother, ScrollToPlugin), Swiper, MagnificPopup, SplitText, CounterUp
 */
(function ($, window) {
  "use strict";

  // Main ULV object
  var ulvJs = {
    // Main initialization method
    m: function () {
      ulvJs.d();        // DOM caching
      ulvJs.methods();  // Function calls
    },

    // DOM caching for performance
    d: function () {
      ulvJs._window = $(window);
      ulvJs._document = $(document);
      ulvJs._body = $("body");
      ulvJs._html = $("html");
    },

    // Entry point to initialize all features
    methods: function () {
      ulvJs.inlineCssActivation();
      ulvJs.swiperActivation();
      ulvJs.videoPopupActivation();
      ulvJs.headerSticky();
      ulvJs.backToTopInit();
      ulvJs.mobileMenuActivation();
      ulvJs.numberCounterActivation();
      ulvJs.trendingAlbumActivation();
      ulvJs.horaizentalScrolling();
      ulvJs.faqActivation();
      ulvJs.imagePopupActivation();
      ulvJs.customCursorActivation();
      ulvJs.searchPopupActivation();
      ulvJs.textAnimationStyleOne();
      ulvJs.scrollCueActivation();
      ulvJs.textAnimationStyleTwo();
      ulvJs.smoothScrollerGsap();
      ulvJs.imgAnimationRightToLeft();
      ulvJs.preLoaderActivation();
    },

    /**
     * Handles preloader hide animation after window load
     */
    preLoaderActivation: function () {
      $(window).on('load', function () {
        $(".preloader").delay(500).fadeOut(300);
      });
    },

    /**
     * GSAP-based scroll animation for image reveal
     */
    imgAnimationRightToLeft: function () {
      $(document).ready(function () {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".toptobottom-img-wrap");
        revealContainers.forEach((container) => {
          let image = container.querySelector(".toptobottom-img-animation");
          let vre = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              toggleActions: "restart none none reset",
            },
          });

          vre.set(container, { autoAlpha: 1 });

          vre.from(container, {
            yPercent: 100,
            duration: 1.8,
            ease: "power2.out",
          });

          vre.from(image, {
            yPercent: -100,
            scale: 1.3,
            duration: 1.8,
            ease: "power2.out",
            delay: -1.5,
          });
        });

        ScrollTrigger.refresh();
      });
    },

    /**
     * Enables GSAP's smooth scrolling effect
     */
    smoothScrollerGsap: function () {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
      if ($('#smooth-wrapper').length && $('#smooth-content').length) {
        ScrollSmoother.create({
          smooth: 1.35,
          effects: true,
          smoothTouch: .1,
          ignoreMobileResize: false
        });
      }
    },

    /**
     * Adds scroll animation cue using scrollCue library
     */
    scrollCueActivation: function () {
      scrollCue.init({
        percentage: 0.99,
        duration: 900,
      });
    },

    /**
     * Text animation style one - triggered on scroll (ScrollTrigger + SplitText)
     */
    textAnimationStyleOne: function () {
      gsap.registerPlugin(ScrollTrigger);
      if ($(".text-anim").length) {
        let animatedTextElements = document.querySelectorAll(".text-anim");

        animatedTextElements.forEach((element) => {
          let animationSplitText = new SplitText(element, {
            type: "chars, words",
          });
          gsap.from(animationSplitText.chars, {
            duration: 1.5,
            delay: 0.7,
            x: 20,
            autoAlpha: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          });
        });
      }
    },

    /**
     * Alternative text animation style with slightly different config
     */
    textAnimationStyleTwo: function () {
      gsap.registerPlugin(ScrollTrigger);
      if ($(".text-anim2").length) {
        let animatedTextElements = document.querySelectorAll(".text-anim2");

        animatedTextElements.forEach((element) => {
          let animationSplitText = new SplitText(element, {
            type: "chars, words",
          });
          gsap.from(animationSplitText.chars, {
            duration: 1.7,
            delay: 0.8,
            x: 20,
            autoAlpha: 0,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          });
        });
      }
    },

    /**
     * Handles full screen search modal popup
     */
    searchPopupActivation: function () {
      $(document).ready(function () {
        $(".ulv__search").on("click", function () {
          $("#searchPopup").addClass("active").removeClass("closing");
        });

        $("#closeBtn, #searchPopup").on("click", function (e) {
          if ($(e.target).is("#searchPopup") || $(e.target).is("#closeBtn")) {
            $("#searchPopup").addClass("closing");
            setTimeout(function () {
              $("#searchPopup").removeClass("active closing");
            }, 300);
          }
        });
      });
    },

    /**
     * Custom mouse cursor animation using GSAP
     */
    customCursorActivation: function () {
      $(document).ready(function () {
        const cursor = $(".custom-cursor");
        const hoverArea = $(".ulv__hero-slide-wrapper");
        let mouseX = 0;
        let mouseY = 0;

        gsap.to({}, 0.016, {
          repeat: -1,
          onRepeat: function () {
            gsap.set(cursor, {
              x: mouseX,
              y: mouseY,
            });
          },
        });

        $(window).on("mousemove", function (e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        hoverArea.on("mouseenter", function () {
          gsap.to(cursor, {
            duration: 0.3,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          });
        });

        hoverArea.on("mouseleave", function () {
          gsap.to(cursor, {
            duration: 0.3,
            scale: 0,
            opacity: 0,
            ease: "power2.in",
          });
        });
      });
    },

    /**
     * GSAP Accordion-style FAQ toggle animation
     */
    faqActivation: function () {
      $(document).ready(function () {
        // Helper: open accordion
        function openAccordion($item) {
          const $content = $item.find(".faq-content");
          const $icon = $item.find(".faq-icon");
          const originalPadding = { paddingTop: 20, paddingBottom: 10, paddingLeft: 28, paddingRight: 20 };

          $content.css({
            display: "block", height: 0, opacity: 0,
            paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
          });

          gsap.to($content, {
            height: "auto", opacity: 1, duration: 0.5, ease: "power2.out",
            ...originalPadding,
            onComplete: function () {
              $content.addClass("active");
            },
          });

          $item.addClass("active");
          $icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
        }

        // Helper: close accordion
        function closeAccordion($item) {
          const $content = $item.find(".faq-content");
          const $icon = $item.find(".faq-icon");

          gsap.to($content, {
            height: 0, opacity: 0, duration: 0.4, ease: "power2.in",
            paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
            onComplete: function () {
              $content.css("display", "none").removeClass("active");
              $item.removeClass("active");
              $icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
            },
          });
        }

        // Event binding
        $(".faq-header").click(function () {
          const $item = $(this).closest(".faq-item");

          if ($item.hasClass("active")) {
            closeAccordion($item);
          } else {
            $(".faq-item.active").each(function () {
              closeAccordion($(this));
            });
            openAccordion($item);
          }
        });

        // On page load: expand pre-active
        $(".faq-item").each(function () {
          if ($(this).hasClass("active")) {
            openAccordion($(this));
          } else {
            $(this).find(".faq-content").css("display", "none").removeClass("active");
          }
        });

        console.log("FAQ accordion with GSAP initialized.");
      });
    },

    /**
     * Audio playlist section functionality
     * Play/Pause, Time update, Progress bar, Volume bar, Mute toggle, etc.
     */
    trendingAlbumActivation: function () {
$(document).ready(function () {
    let currentAudio = null;

    $(".play-btn").click(function () {
      const button = $(this);
      const track = button.closest(".track");
      const audio = track.find(".audio")[0];
      const img = button.find("img");

      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        const previousTrack = $(currentAudio).closest(".track");
        previousTrack.removeClass("playing");
        previousTrack.find(".play-btn").addClass("paused").find("img").attr("src", "assets/images/icons/video-off.svg");
      }

      if (audio.paused) {
        audio.play();
        button.removeClass("paused");
        track.addClass("playing");
        img.attr("src", "assets/images/icons/video-on.svg");
        currentAudio = audio;
      } else {
        audio.pause();
        button.addClass("paused");
        track.removeClass("playing");
        img.attr("src", "assets/images/icons/video-off.svg");
      }
    });

    $("audio").on("timeupdate", function () {
      const audio = this;
      const track = $(audio).closest(".track");
      const progress = (audio.currentTime / audio.duration) * 100;
      track.find(".progress-bar").css("width", progress + "%");
      const currentTime = new Date(audio.currentTime * 1000).toISOString().substr(14, 5);
      track.find(".time-display").eq(0).text(currentTime);
    });

    $("audio").on("loadedmetadata", function () {
      const track = $(this).closest(".track");
      const totalTime = new Date(this.duration * 1000).toISOString().substr(14, 5);
      track.find(".time-display").eq(1).text(totalTime);
    });

    $(".progress-container").click(function (e) {
      const container = $(this);
      const audio = container.closest(".track").find(".audio")[0];
      const progress = e.offsetX / container.width();
      audio.currentTime = progress * audio.duration;
    });

    $(".volume-container").click(function (e) {
      const container = $(this);
      const track = container.closest(".track");
      const audio = track.find(".audio")[0];
      const volume = e.offsetX / container.width();
      audio.volume = volume;
      audio.muted = false;
      container.find(".volume-bar").css("width", volume * 100 + "%");
      track.find(".volume-icon-wrap i").removeClass("fa-volume-slash").addClass("fa-volume");
    });

    $(".volume-icon-wrap").click(function () {
      const iconWrap = $(this);
      const track = iconWrap.closest(".track");
      const audio = track.find(".audio")[0];
      const icon = iconWrap.find("i");

      audio.muted = !audio.muted;
      if (audio.muted) {
        icon.removeClass("fa-volume").addClass("fa-volume-slash");
        track.find(".volume-bar").css("width", "0%");
      } else {
        icon.removeClass("fa-volume-slash").addClass("fa-volume");
        track.find(".volume-bar").css("width", audio.volume * 100 + "%");
      }
    });

    $(".audio").each(function () {
      const audio = this;
      const track = $(audio).closest(".track");

      audio.volume = 1;
      track.find(".volume-bar").css("width", "100%");

      if (audio.readyState > 0) {
        const duration = new Date(audio.duration * 1000).toISOString().substr(14, 5);
        track.find(".time-display").eq(1).text(duration);
      } else {
        audio.addEventListener("loadedmetadata", function () {
          const duration = new Date(audio.duration * 1000).toISOString().substr(14, 5);
          track.find(".time-display").eq(1).text(duration);
        });
      }
    });

    $("audio").on("ended", function () {
      const track = $(this).closest(".track");
      const playBtn = track.find(".play-btn");
      const img = playBtn.find("img");

      track.removeClass("playing");
      playBtn.addClass("paused");
      img.attr("src", "assets/images/icons/video-off.svg");
      track.find(".progress-bar").css("width", "0%");
      track.find(".time-display").eq(0).text("00:00");
      currentAudio = null;
    });
  });
    },

    /**
     * Number counter animation using CounterUp plugin
     */
    numberCounterActivation: function () {
      $(".ulv__counter").counterUp({
        delay: 10,
        time: 1000,
      });
    },

    /**
     * Scroll-to-top button with progress bar path animation
     */
    backToTopInit: function () {
      if ($('.scroll-top').length > 0) {
        // ... (handled with dynamic strokeDashoffset for progress)
      }
    },

    /**
     * Sticky header effect after scroll
     */
    headerSticky: function () {
      $(document).ready(function () {
        $(window).on("scroll", function () {
          var scrollTop = $(window).scrollTop();
          $(".ulv__header").toggleClass("sticky", scrollTop > 100);
        });
      });
    },

    /**
     * Magnific Popup for YouTube/Vimeo iFrames
     */
    videoPopupActivation: function () {
      $(".video-play-icon").magnificPopup({
        type: "iframe",
        mainClass: "mfp-zoom-in",
      });
    },

    /**
     * Magnific Popup for Instagram-style image preview
     */
    imagePopupActivation: function () {
      $(".ulv__insta-button").magnificPopup({
        type: "image",
        mainClass: "mfp-zoom-in",
        removalDelay: 260,
        gallery: { enabled: true },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function (item) {
            return item.el.attr("title");
          },
        },
      });
    },

    /**
     * Inline CSS image background using `data-background` attribute
     */
    inlineCssActivation: function () {
      $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
      });
    },

    /**
     * SwiperJS slider/carousel activation
     */
    swiperActivation: function () {
      // Hero slider
  if ($(".ulv__hero").length > 0) {
    new Swiper(".ulv__hero", {
      slidesPerView: 3,
      spaceBetween: 53,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        992: { spaceBetween: 53 },
        991: { spaceBetween: 20 },
        768: { slidesPerView: 3 },
        767: { slidesPerView: 1 },
        575: { spaceBetween: 15 },
      },
    });
  }
// Text slider
  if ($(".ulv__text-sliding").length > 0) {
    new Swiper(".ulv__text-sliding", {
      slidesPerView: "auto",
      spaceBetween: 24,
      freeMode: true,
      centeredSlides: true,
      loop: true,
      speed: 9000,
      allowTouchMove: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: true,
      },
    });
  }
    },

    /**
     * Full screen mobile menu animation with submenu
     */
    mobileMenuActivation: function () {
$(document).ready(function () {
    $(".menu-icon").click(function (e) {
      var offset = e.target.getBoundingClientRect();
      var x = e.clientX - offset.left;
      var y = e.clientY - offset.top;

      $(".ulv__overlay").css({ "--x": x + "px", "--y": y + "px" }).addClass("ulv__animating");

      setTimeout(function () {
        $(".ulv__mobile-menu, .ulv__overlay").addClass("ulv__active");
        $(".ulv__nav-item").each(function (index) {
          $(this).css({
            animation: `fadeInRight 0.3s ease forwards ${0.1 * index}s`,
            opacity: "0",
          });
        });
      }, 50);

      setTimeout(function () {
        $(".ulv__overlay").removeClass("ulv__animating");
      }, 500);
    });

    $(".ulv__close-btn, .ulv__overlay").click(function () {
      $(".ulv__mobile-menu, .ulv__overlay").removeClass("ulv__active");
    });

    $(".ulv__nav-link").click(function (e) {
      e.preventDefault();
      var submenu = $(this).next(".ulv__submenu");
      var toggleBtn = $(this).find(".ulv__toggle-btn");

      $(".ulv__submenu").not(submenu).slideUp().removeClass("ulv__active");
      $(".ulv__toggle-btn").not(toggleBtn).removeClass("ulv__active");

      submenu.slideToggle(function () {
        if (submenu.is(":visible")) {
          submenu.addClass("ulv__active");
          toggleBtn.addClass("ulv__active");
          submenu.find(".ulv__submenu-item").each(function (index) {
            $(this).css({
              animation: `fadeInDown 0.3s ease forwards ${0.1 * index}s`,
              opacity: "0",
            });
          });
        } else {
          submenu.removeClass("ulv__active");
          toggleBtn.removeClass("ulv__active");
        }
      });
    });
  });
    },

    /**
     * GSAP-based horizontal scrolling section (like pricing plans)
     */
    horaizentalScrolling: function () {
      let horizontalSection = document.querySelector(".ulv__pricing-inner");
      if (horizontalSection) {
        gsap.to(".ulv__pricing-inner", {
          x: () => horizontalSection.scrollWidth * -1,
          xPercent: 100,
          scrollTrigger: {
            trigger: ".ulv__pricing-inner",
            start: "top 40%",
            end: "+=2000px",
            pin: ".ulv__pricing-area",
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        });
      }
    },
  };

  // Bootstrap/init call
  ulvJs.m();
})(jQuery, window);




