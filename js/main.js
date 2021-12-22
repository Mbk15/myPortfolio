/* ===================================================================
 * Ethos 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  const cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL: "", // mailchimp url
  };
  const $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
  const doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    $("html").addClass("ss-preload");

    $WIN.on("load", function () {
      // force page scroll position to top at page refresh
      $("html, body").animate({ scrollTop: 0 }, "normal");

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* pretty print
   * -------------------------------------------------- */
  const ssPrettyPrint = function () {
    $("pre").addClass("prettyprint");
    $(document).ready(function () {
      prettyPrint();
    });
  };

  /* move header
   * -------------------------------------------------- */
  const ssMoveHeader = function () {
    const $hero = $(".s-hero"),
      $hdr = $(".s-header"),
      triggerHeight = $hero.outerHeight() - 170;

    $WIN.on("scroll", function () {
      let loc = $WIN.scrollTop();

      if (loc > triggerHeight) {
        $hdr.addClass("sticky");
      } else {
        $hdr.removeClass("sticky");
      }

      if (loc > triggerHeight + 20) {
        $hdr.addClass("offset");
      } else {
        $hdr.removeClass("offset");
      }

      if (loc > triggerHeight + 150) {
        $hdr.addClass("scrolling");
      } else {
        $hdr.removeClass("scrolling");
      }
    });
  };

  /* mobile menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const $toggleButton = $(".header-menu-toggle");
    const $headerContent = $(".header-content");
    const $siteBody = $("body");

    $toggleButton.on("click", function (event) {
      event.preventDefault();
      $toggleButton.toggleClass("is-clicked");
      $siteBody.toggleClass("menu-is-open");
    });

    $headerContent.find(".header-nav a, .btn").on("click", function () {
      // at 900px and below
      if (window.matchMedia("(max-width: 900px)").matches) {
        $toggleButton.toggleClass("is-clicked");
        $siteBody.toggleClass("menu-is-open");
      }
    });

    $WIN.on("resize", function () {
      // above 900px
      if (window.matchMedia("(min-width: 901px)").matches) {
        if ($siteBody.hasClass("menu-is-open"))
          $siteBody.removeClass("menu-is-open");
        if ($toggleButton.hasClass("is-clicked"))
          $toggleButton.removeClass("is-clicked");
      }
    });
  };

  /* accordion
   * ------------------------------------------------------ */
  const ssAccordion = function () {
    const $allItems = $(".services-list__item");
    const $allPanels = $allItems.children(".services-list__item-body");

    $allPanels.slice(1).hide();

    $allItems.on("click", ".services-list__item-header", function () {
      const $this = $(this),
        $curItem = $this.parent(),
        $curPanel = $this.next();

      if (!$curItem.hasClass("is-active")) {
        $allPanels.slideUp();
        $curPanel.slideDown();
        $allItems.removeClass("is-active");
        $curItem.addClass("is-active");
      }

      return false;
    });
  };

  /* photoswipe
   * ----------------------------------------------------- */
  const ssPhotoswipe = function () {
    const items = [],
      $pswp = $(".pswp")[0],
      $folioItems = $(".folio-item");

    // get items
    $folioItems.each(function (i) {
      let $folio = $(this),
        $thumbLink = $folio.find(".folio-item__thumb-link"),
        $title = $folio.find(".folio-item__title"),
        $caption = $folio.find(".folio-item__caption"),
        $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
        $captionText = $.trim($caption.html()),
        $href = $thumbLink.attr("href"),
        $size = $thumbLink.data("size").split("x"),
        $width = $size[0],
        $height = $size[1];

      let item = {
        src: $href,
        w: $width,
        h: $height,
      };

      if ($caption.length > 0) {
        item.title = $.trim($titleText + $captionText);
      }

      items.push(item);
    });

    // bind click event
    $folioItems.each(function (i) {
      $(this)
        .find(".folio-item__thumb-link")
        .on("click", function (e) {
          e.preventDefault();
          let options = {
            index: i,
            showHideOpacity: true,
          };

          // initialize PhotoSwipe
          let lightBox = new PhotoSwipe(
            $pswp,
            PhotoSwipeUI_Default,
            items,
            options
          );
          lightBox.init();
        });
    });
  };

  /* slick slider
   * ------------------------------------------------------ */
  const ssSlickSlider = function () {
    $(".testimonial-slider").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  const ssAOS = function () {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-out",
      delay: 300,
      once: true,
      disable: "mobile",
    });
  };

  /* alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    $(".alert-box").on("click", ".alert-box__close", function () {
      $(this).parent().fadeOut(500);
    });
  };

  /* smooth scrolling
   * ------------------------------------------------------ */
  const ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      const target = this.hash;
      const $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          window.location.hash = target;
        });
    });
  };

  /* back to top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 800;
    const $goTopButton = $(".ss-go-top");

    // Show or hide the button
    if ($(window).scrollTop() >= pxShow)
      $goTopButton.addClass("link-is-visible");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        if (!$goTopButton.hasClass("link-is-visible"))
          $goTopButton.addClass("link-is-visible");
      } else {
        $goTopButton.removeClass("link-is-visible");
      }
    });
  };

  /* initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssPrettyPrint();
    ssMoveHeader();
    ssMobileMenu();
    ssAccordion();
    ssPhotoswipe();
    ssSlickSlider();
    ssAOS();
    ssAlertBoxes();
    ssSmoothScroll();
    ssBackToTop();
  })();
})(jQuery);

// typerjs

String.prototype.rightChars = function (n) {
  if (n <= 0) {
    return "";
  } else if (n > this.length) {
    return this;
  } else {
    return this.substring(this.length, this.length - n);
  }
};

(function ($) {
  var options = {
      highlightSpeed: 20,
      typeSpeed: 100,
      clearDelay: 400,
      typeDelay: 200,
      clearOnHighlight: true,
      typerDataAttr: "data-typer-targets",
      typerInterval: 2000,
    },
    highlight,
    clearText,
    backspace,
    type,
    spanWithColor,
    clearDelay,
    typeDelay,
    clearData,
    isNumber,
    typeWithAttribute,
    getHighlightInterval,
    getTypeInterval,
    typerInterval;

  spanWithColor = function (color, backgroundColor) {
    if (color === "rgba(0, 0, 0, 0)") {
      color = "rgb(255, 255, 255)";
    }

    return $("<span></span>")
      .css("color", color)
      .css("background-color", backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    $e.removeData([
      "typePosition",
      "highlightPosition",
      "leftStop",
      "rightStop",
      "primaryColor",
      "backgroundColor",
      "text",
      "typing",
    ]);
  };

  type = function ($e) {
    var // position = $e.data('typePosition'),
      text = $e.data("text"),
      oldLeft = $e.data("oldLeft"),
      oldRight = $e.data("oldRight");

    // if (!isNumber(position)) {
    // position = $e.data('leftStop');
    // }

    if (!text || text.length === 0) {
      clearData($e);
      return;
    }

    $e.text(oldLeft + text.charAt(0) + oldRight).data({
      oldLeft: oldLeft + text.charAt(0),
      text: text.substring(1),
    });

    // $e.text($e.text() + text.substring(position, position + 1));

    // $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find("span").remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    var position = $e.data("highlightPosition"),
      leftText,
      highlightedText,
      rightText;

    if (!isNumber(position)) {
      position = $e.data("rightStop") + 1;
    }

    if (position <= $e.data("leftStop")) {
      setTimeout(function () {
        clearText($e);
      }, clearDelay());
      return;
    }

    leftText = $e.text().substring(0, position - 1);
    highlightedText = $e
      .text()
      .substring(position - 1, $e.data("rightStop") + 1);
    rightText = $e.text().substring($e.data("rightStop") + 1);

    $e.html(leftText)
      .append(
        spanWithColor(
          $e.data("backgroundColor"),
          $e.data("primaryColor")
        ).append(highlightedText)
      )
      .append(rightText);

    $e.data("highlightPosition", position - 1);

    setTimeout(function () {
      return highlight($e);
    }, getHighlightInterval());
  };

  typeWithAttribute = function ($e) {
    var targets;

    if ($e.data("typing")) {
      return;
    }

    try {
      targets = JSON.parse($e.attr($.typer.options.typerDataAttr)).targets;
    } catch (e) {}

    if (typeof targets === "undefined") {
      targets = $.map(
        $e.attr($.typer.options.typerDataAttr).split(","),
        function (e) {
          return $.trim(e);
        }
      );
    }

    $e.typeTo(targets[Math.floor(Math.random() * targets.length)]);
  };

  // Expose our options to the world.
  $.typer = (function () {
    return { options: options };
  })();

  $.extend($.typer, {
    options: options,
  });

  //-- Methods to attach to jQuery sets

  $.fn.typer = function () {
    var $elements = $(this);

    return $elements.each(function () {
      var $e = $(this);

      if (typeof $e.attr($.typer.options.typerDataAttr) === "undefined") {
        return;
      }

      typeWithAttribute($e);
      setInterval(function () {
        typeWithAttribute($e);
      }, typerInterval());
    });
  };

  $.fn.typeTo = function (newString) {
    var $e = $(this),
      currentText = $e.text(),
      i = 0,
      j = 0;

    if (currentText === newString) {
      console.log("Our strings our equal, nothing to type");
      return $e;
    }

    if (currentText !== $e.html()) {
      console.error("Typer does not work on elements with child elements.");
      return $e;
    }

    $e.data("typing", true);

    while (currentText.charAt(i) === newString.charAt(i)) {
      i++;
    }

    while (currentText.rightChars(j) === newString.rightChars(j)) {
      j++;
    }

    newString = newString.substring(i, newString.length - j + 1);

    $e.data({
      oldLeft: currentText.substring(0, i),
      oldRight: currentText.rightChars(j - 1),
      leftStop: i,
      rightStop: currentText.length - j,
      primaryColor: $e.css("color"),
      backgroundColor: $e.css("background-color"),
      text: newString,
    });

    highlight($e);

    return $e;
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return $.typer.options.highlightSpeed;
  };

  (getTypeInterval = function () {
    return $.typer.options.typeSpeed;
  }),
    (clearDelay = function () {
      return $.typer.options.clearDelay;
    }),
    (typeDelay = function () {
      return $.typer.options.typeDelay;
    });

  typerInterval = function () {
    return $.typer.options.typerInterval;
  };
})(jQuery);

$("h3").typeTo("Testing Typer.js jQuery Plugin with a 1 time trext string.");

$("[data-typer-targets]").typer();
