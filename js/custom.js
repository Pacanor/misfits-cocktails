
/* Preloader — hide when DOM is ready, not after every image loads
  -----------------------------------------------*/
$(function () {
  $('.preloader').fadeOut(600);
});
setTimeout(function () {
  $('.preloader').hide();
}, 4000);


/* Magnific Popup
-----------------------------------------------*/
$(document).ready(function () {
  if ($('.popup-youtube').length) {
    $('.popup-youtube').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  }
});


/* Isotope Portfolio
-----------------------------------------------*/
jQuery(document).ready(function ($) {

  if ($('.iso-box-wrapper').length > 0) {

    var $container = $('.iso-box-wrapper'),
      $imgs = $('.iso-box img');

    $container.imagesLoaded(function () {

      $container.isotope({
        layoutMode: 'fitRows',
        itemSelector: '.iso-box'
      });

      $imgs.on('load', function () {
        $container.isotope('reLayout');
      });

    });

    $('#search-box').on('keyup', function () {
      var searchText = $(this).val().toLowerCase();

      $('.iso-box-wrapper .iso-box').each(function () {
        var itemText = $(this).find('.gallery-item').text().toLowerCase();

        if (itemText.includes(searchText)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });

    $('#filter-options').on('change', function () {
      var filterValue = $(this).val();

      $container.isotope({
        filter: filterValue,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false,
        }
      });
    });

  }

});


$(document).ready(function () {

  /* Lazy-load images below the fold (fallback for any without the attribute) */
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    img.decoding = 'async';
  });

  /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
  $('.navbar-collapse a').click(function () {
    $('.navbar-collapse').collapse('hide');
  });


  /* smoothscroll
  ----------------------------------------------*/
  $(function () {
    $('#home a, .navbar-default a, #team a, .footer-links a, #copyright a').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1000);
      event.preventDefault();
    });
  });


  /* Hero slideshow — first image immediately, rest after idle
  -----------------------------------------------*/
  $(function () {
    var images = [];

    if ($('body').hasClass('home-page')) {
      images = [
        'images/hero/PXL_20240511_131513494.PORTRAIT~2.webp',
        'images/events/absa end of year 2024/PXL_20241213_195139349.PORTRAIT.webp',
        'images/hero/PXL_20230304_090001094.PORTRAIT~2.webp',
        'images/hero/PXL_20221215_143207785.webp',
      ];
    } else if ($('body').hasClass('review-page')) {
      images = [
        'images/hero/PXL_20240511_131513494.PORTRAIT~2.webp',
        'images/hero/PXL_20221215_143207785.webp',
        'images/events/christmas eve party 19th hole/PXL_20221125_175841755.MP.webp',
        'images/hero/PXL_20230304_090001094.PORTRAIT~2.webp',
      ];
    } else if ($('body').hasClass('gallery-page')) {
      images = [
        'images/events/christmas eve party 19th hole/PXL_20221125_175841755.MP.webp',
        'images/events/christmas eve party 19th hole/PXL_20221125_165540781.PORTRAIT~2.webp',
        'images/events/shaarz cosmetics product lauch east park mall/PXL_20240719_134654287.MP.webp',
        'images/events/absa end of year 2022/PXL_20221215_143711683.webp',
      ];
    } else if ($('body').hasClass('request-page')) {
      images = [
        'images/events/absa end of year 2024/PXL_20241213_195139349.PORTRAIT.webp',
        'images/hero/PXL_20240511_131513494.PORTRAIT~2.webp',
        'images/events/shaarz cosmetics product lauch east park mall/PXL_20240719_141744494.MP.webp',
      ];
    }

    if (images.length && $('#home').length) {
      $('#home').backstretch(images[0], { duration: 3000, fade: 750 });

      if (images.length > 1) {
        var startSlideshow = function () {
          images.slice(1).forEach(function (src) {
            var img = new Image();
            img.src = src;
          });
          setTimeout(function () {
            $('#home').backstretch(images, { duration: 3000, fade: 750 });
          }, 1500);
        };

        if ('requestIdleCallback' in window) {
          requestIdleCallback(startSlideshow, { timeout: 4000 });
        } else {
          setTimeout(startSlideshow, 2500);
        }
      }
    }
  });


  /* Flexslider
  -----------------------------------------------*/
  if ($('.flexslider').length) {
    $('.flexslider').flexslider({
      animation: 'slide'
    });
  }


  /* Parallax section
  -----------------------------------------------*/
  function initParallax() {
    $('#about').parallax('100%', 0.1);
    $('#feature').parallax('100%', 0.3);
    $('#video').parallax('100%', 0.2);
    $('#menu').parallax('100%', 0.3);
    $('#team').parallax('100%', 0.3);
    $('#gallery').parallax('100%', 0.1);
    $('#contact').parallax('100%', 0.2);
  }
  if ($.fn.parallax) {
    initParallax();
  }


  /* Nivo lightbox
  -----------------------------------------------*/
  var lightboxState = {
    galleryItems: null,
    currentIndex: 0,
    isAnimating: false,
    touchStartX: 0,
    touchStartY: 0
  };

  function getLightboxPadding() {
    return { horizontal: 96, vertical: 96 };
  }

  function sizeLightboxImg($img) {
    var img = $img[0];
    if (!img || !img.naturalWidth || !img.naturalHeight) {
      return null;
    }

    var padding = getLightboxPadding();
    var maxWidth = window.innerWidth - padding.horizontal;
    var maxHeight = window.innerHeight - padding.vertical;
    var scale = Math.min(maxWidth / img.naturalWidth, maxHeight / img.naturalHeight, 1);
    var width = Math.round(img.naturalWidth * scale);
    var height = Math.round(img.naturalHeight * scale);

    $img.css({
      width: width + 'px',
      height: height + 'px',
      maxWidth: maxWidth + 'px',
      maxHeight: maxHeight + 'px'
    });

    return { width: width, height: height };
  }

  function fitLightboxImage() {
    var $img = $('.nivo-lightbox-content .lightbox-photo.is-active img, .nivo-lightbox-image img').first();
    if (!$img.length) {
      return;
    }

    $('.nivo-lightbox-image, .lightbox-stage').css({
      lineHeight: 'normal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });

    var applyFit = function () {
      sizeLightboxImg($img);
    };

    if ($img[0].complete && $img[0].naturalWidth) {
      applyFit();
    } else {
      $img.one('load', applyFit);
    }
  }

  function loadLightboxImage(src) {
    var deferred = $.Deferred();
    var $img = $('<img>', { src: src, alt: '' });

    $img.on('load', function () {
      deferred.resolve($img);
    });
    $img.on('error', function () {
      deferred.reject();
    });

    if ($img[0].complete && $img[0].naturalWidth) {
      deferred.resolve($img);
    }

    return deferred.promise();
  }

  function setSingleLightboxImage($img) {
    var $content = $('.nivo-lightbox-content');
    var $wrapper = $('<div class="nivo-lightbox-image" />');
    $wrapper.append($img);
    $content.empty().removeClass('nivo-lightbox-loading').append($wrapper);
    fitLightboxImage();
  }

  function bindLightboxSwipe() {
    var $overlay = $('.nivo-lightbox-overlay');
    $overlay.off('touchstart.lightbox touchend.lightbox');

    $overlay.on('touchstart.lightbox', function (e) {
      var touch = e.originalEvent.touches[0];
      lightboxState.touchStartX = touch.clientX;
      lightboxState.touchStartY = touch.clientY;
    });

    $overlay.on('touchend.lightbox', function (e) {
      if (!lightboxState.galleryItems || lightboxState.galleryItems.length < 2) {
        return;
      }

      var touch = e.originalEvent.changedTouches[0];
      var deltaX = touch.clientX - lightboxState.touchStartX;
      var deltaY = touch.clientY - lightboxState.touchStartY;

      if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      navigateLightbox(deltaX < 0 ? 1 : -1);
    });
  }

  function rebindLightboxNavigation() {
    if (!lightboxState.galleryItems || lightboxState.galleryItems.length < 2) {
      return;
    }

    $('.nivo-lightbox-prev').off('click').on('click', function (e) {
      e.preventDefault();
      navigateLightbox(-1);
    });

    $('.nivo-lightbox-next').off('click').on('click', function (e) {
      e.preventDefault();
      navigateLightbox(1);
    });

    bindLightboxSwipe();
  }

  function navigateLightbox(direction) {
    if (lightboxState.isAnimating || !lightboxState.galleryItems) {
      return;
    }

    var items = lightboxState.galleryItems;
    var nextIndex = lightboxState.currentIndex + direction;
    if (nextIndex < 0) {
      nextIndex = items.length - 1;
    }
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }

    var nextSrc = items.eq(nextIndex).attr('href');
    animateLightboxTransition(nextSrc, direction, function () {
      lightboxState.currentIndex = nextIndex;
    });
  }

  function animateLightboxTransition(nextSrc, direction, onComplete) {
    var $content = $('.nivo-lightbox-content');
    var $currentImg = $content.find('img').first();

    if (!$currentImg.length) {
      lightboxState.isAnimating = true;
      loadLightboxImage(nextSrc).done(function ($img) {
        setSingleLightboxImage($img);
        lightboxState.isAnimating = false;
        if (onComplete) {
          onComplete();
        }
      });
      return;
    }

    lightboxState.isAnimating = true;
    $content.removeClass('nivo-lightbox-loading');

    loadLightboxImage(nextSrc).done(function ($incomingImg) {
      var currentSize = sizeLightboxImg($currentImg);
      sizeLightboxImg($incomingImg);

      if (currentSize) {
        $incomingImg.css({
          width: currentSize.width + 'px',
          height: currentSize.height + 'px'
        });
      }

      var $stage = $('<div class="lightbox-stage" />');
      var $outgoing = $('<div class="lightbox-photo" />').append($currentImg.detach());
      var $incoming = $('<div class="lightbox-photo" />').append($incomingImg);

      var enterClass = direction > 0 ? 'is-entering-next' : 'is-entering-prev';
      var exitClass = direction > 0 ? 'is-exiting-next' : 'is-exiting-prev';

      $incoming.addClass(enterClass);
      $outgoing.addClass('is-active');
      $stage.append($outgoing).append($incoming);
      $content.empty().append($stage);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          $incoming.removeClass(enterClass).addClass('is-active');
          $outgoing.removeClass('is-active').addClass(exitClass);

          var finished = false;
          var cleanup = function () {
            if (finished) {
              return;
            }
            finished = true;
            sizeLightboxImg($incomingImg);
            setSingleLightboxImage($incomingImg);
            lightboxState.isAnimating = false;
            if (onComplete) {
              onComplete();
            }
          };

          $incoming.one('transitionend', cleanup);
          setTimeout(cleanup, 420);
        });
      });
    }).fail(function () {
      lightboxState.isAnimating = false;
    });
  }

  $(document).on('click', '.nivo-lightbox', function () {
    var $trigger = $(this);
    var gallery = $trigger.attr('data-lightbox-gallery');

    if (gallery) {
      lightboxState.galleryItems = $('[data-lightbox-gallery="' + gallery + '"]');
      lightboxState.currentIndex = lightboxState.galleryItems.index(this);
    } else {
      lightboxState.galleryItems = null;
      lightboxState.currentIndex = 0;
    }
  });

  var lightboxResizeTimer;
  $(window).on('resize.lightbox', function () {
    clearTimeout(lightboxResizeTimer);
    lightboxResizeTimer = setTimeout(fitLightboxImage, 100);
  });

  if ($.fn.nivoLightbox) {
    $('.nivo-lightbox').nivoLightbox({
      effect: 'fade',
      afterShowLightbox: function () {
        rebindLightboxNavigation();
        setTimeout(fitLightboxImage, 0);
      },
      afterHideLightbox: function () {
        lightboxState.isAnimating = false;
        lightboxState.galleryItems = null;
        $('.nivo-lightbox-overlay').off('touchstart.lightbox touchend.lightbox');
      }
    });
  }

  /* Cards View / event album pagination
  -------------------------------------------------*/
  function setupPagination(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const row = container.querySelector('.row');
    const items = row.querySelectorAll('.iso-box.events');
    const itemsPerPage = 9;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;

    const oldPagination = container.querySelector('#pagination');
    if (oldPagination) oldPagination.remove();

    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    paginationContainer.style.textAlign = 'center';
    paginationContainer.style.marginTop = '20px';

    function showPage(page) {
      items.forEach((item, index) => {
        item.style.display =
          index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
            ? 'block'
            : 'none';
      });
    }

    function createPagination() {
      paginationContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.className = 'page-btn';
        button.style.margin = '0 5px';
        button.style.padding = '5px 10px';
        button.style.cursor = 'pointer';

        if (i === currentPage) {
          button.style.backgroundColor = '#333';
          button.style.color = '#fff';
        }

        button.addEventListener('click', () => {
          currentPage = i;
          showPage(currentPage);
          createPagination();
        });

        paginationContainer.appendChild(button);
      }
    }

    showPage(currentPage);
    createPagination();
    row.after(paginationContainer);
  }

  const buttons = [
    {
      trigger: '.absa_end_of_year_2022_events',
      target: '.absa_end_of_year_2022',
      toggleClass: 'absa_end_of_year_2022_events_toggle'
    },
    {
      trigger: '.absa_end_of_year_2024_events',
      target: '.absa_end_of_year_2024',
      toggleClass: 'absa_end_of_year_2024_events_toggle'
    },
    {
      trigger: '.christmas_eve_party_19th_hole_events',
      target: '.christmas_eve_party_19th_hole',
      toggleClass: 'christmas_eve_party_19th_hole_events_toggle'
    },
    {
      trigger: '.lusaka_night_market_leopards_hill_mall_events',
      target: '.lusaka_night_market_leopards_hill_mall',
      toggleClass: 'lusaka_night_market_leopards_hill_mall_events_toggle'
    },
    {
      trigger: '.womens_march_2023_events',
      target: '.womens_march_2023',
      toggleClass: 'womens_march_2023_events_toggle'
    },
    {
      trigger: '.septoberfest_cape_to_cairo_events',
      target: '.septoberfest_cape_to_cairo',
      toggleClass: 'septoberfest_cape_to_cairo_toggle'
    },
    {
      trigger: '.mindMasters_game_night_events',
      target: '.mindMasters_game_night',
      toggleClass: 'mindMasters_game_night_events_toggle'
    },
    {
      trigger: '.novare_pinnacle_mall_food_market_events',
      target: '.novare_pinnacle_mall_food_market',
      toggleClass: 'novare_pinnacle_mall_food_market_events_toggle'
    },
    {
      trigger: '.shaarz_cosmetics_product_launch_east_park_mall_events',
      target: '.shaarz_cosmetics_product_launch_east_park_mall',
      toggleClass: 'shaarz_cosmetics_product_launch_east_park_mall_events_toggle'
    },
    {
      trigger: '.the_market_levy_junction_mall_events',
      target: '.the_market_levy_junction_mall',
      toggleClass: 'the_market_levy_junction_mall_events_toggle'
    },
  ];

  const seeAllBtn = document.querySelector('#seeAllBtn');

  buttons.forEach(({ trigger, target, toggleClass }) => {
    const triggerEl = document.querySelector(trigger);
    const targetEl = document.querySelector(target);

    if (
      document.body.classList.contains('home-page') ||
      document.body.classList.contains('gallery-page')
    ) {
      if (triggerEl) {
        triggerEl.addEventListener('click', () => {
          const eventType = trigger.replace('.', '');

          if (document.body.classList.contains('home-page')) {
            window.location.href = './gallery.html?search=' + eventType;
            return;
          }

          if (document.body.classList.contains('gallery-page')) {
            buttons.forEach(({ trigger: t, target: tg, toggleClass: tc }) => {
              document.querySelector(t)?.classList.remove('active');
              document.querySelector(tg)?.classList.add(tc);
            });

            triggerEl.classList.add('active');
            targetEl.classList.remove(toggleClass);

            setupPagination(target);

            setTimeout(() => {
              if (targetEl) {
                const rect = targetEl.getBoundingClientRect();
                const offset = -120;
                const top = rect.top + window.scrollY + offset;

                window.scrollTo({
                  top,
                  behavior: 'smooth'
                });
              }
            }, 200);
          }
        });
      }
    }
  });

  if (document.body.classList.contains('gallery-page')) {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      const btnConfig = buttons.find(({ trigger }) => trigger.replace('.', '') === searchParam);
      if (btnConfig) {
        const triggerEl = document.querySelector(btnConfig.trigger);
        const targetEl = document.querySelector(btnConfig.target);

        buttons.forEach(({ trigger: t, target: tg, toggleClass: tc }) => {
          document.querySelector(t)?.classList.remove('active');
          document.querySelector(tg)?.classList.add(tc);
        });

        triggerEl?.classList.add('active');
        targetEl?.classList.remove(btnConfig.toggleClass);

        setupPagination(btnConfig.target);

        setTimeout(() => {
          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            const offset = -120;
            const top = rect.top + window.scrollY + offset;

            window.scrollTo({
              top,
              behavior: 'smooth'
            });
          }
        }, 200);
      }
    }
  }

  /* wow
  -------------------------------*/
  if (typeof WOW !== 'undefined') {
    new WOW({ mobile: false }).init();
  }

});
