
 /* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


/* Magnific Popup
-----------------------------------------------*/
$(document).ready(function() {
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
         fixedContentPos: false,
    });
});


/* Istope Portfolio
-----------------------------------------------*/
jQuery(document).ready(function($){

  if ( $('.iso-box-wrapper').length > 0 ) { 

      var $container  = $('.iso-box-wrapper'), 
        $imgs     = $('.iso-box img');

      $container.imagesLoaded(function () {

        $container.isotope({
        layoutMode: 'fitRows',
        itemSelector: '.iso-box'
        });

        $imgs.load(function(){
          $container.isotope('reLayout');
        })

      });
      // search 
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

      //filter items on button click

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
      //search box

      // don't proceed if already selected 

      if ( $this.hasClass('selected') ) { 
        return false; 
      }

      var filter_wrapper = $this.closest('.filter-wrapper');
      filter_wrapper.find('.selected').removeClass('selected');
      $this.addClass('selected');

        return false;
      }); 

  }

});


$(document).ready(function() {

  /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


  /*  smoothscroll
  ----------------------------------------------*/
   $(function() {
        $('#home a, .navbar-default a, #team a, .footer-links a, #copyright a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });
  


  /* home slideshow section
  -----------------------------------------------*/
  /*
    $(function(){
      jQuery(document).ready(function() {
      $('#home').backstretch([
        "images/cocktails/2-min-min.png", 
        "images/cocktails/fotor6.jpg", 
        "images/backgrounds/bg5.jpg", 
        "images/cocktails/fotor10.jpg", 
          ],  {duration: 3000, fade: 750});
      });
    })
  */

  $(function () {
    var images = [];

    if ($('body').hasClass('home-page')) {
      images = [
        "images/hero/PXL_20240511_131513494.PORTRAIT~2.jpg",
        "images/hero/PXL_20221224_172935035.PORTRAIT~2.jpg",
        "images/hero/PXL_20221224_172405456.PORTRAIT~2.jpg",
        "images/hero/PXL_20221215_143207785.jpg"
      ];
    } else if ($('body').hasClass('review-page')) {
      images = [
        "images/hero/PXL_20221215_143207785.jpg",
        "images/hero/PXL_20221224_172405456.PORTRAIT~2.jpg",
        "images/hero/PXL_20221224_172935035.PORTRAIT~2.jpg",
        "images/hero/PXL_20230304_090001094.PORTRAIT~2.jpg",
        "images/hero/PXL_20240511_131513494.PORTRAIT~2.jpg"
      ];
    } else if ($('body').hasClass('gallery-page')) {
      images = [
        "images/hero/PXL_20221215_143207785.jpg",
        "images/hero/PXL_20221224_172405456.PORTRAIT~2.jpg",
        "images/hero/PXL_20221224_172935035.PORTRAIT~2.jpg",
        "images/hero/PXL_20230304_090001094.PORTRAIT~2.jpg",
        "images/hero/PXL_20240511_131513494.PORTRAIT~2.jpg"
      ];
    } else if ($('body').hasClass('request-page')) {
      images = [
        "images/hero/fotor6.jpg",
        "images/hero/PXL_20221203_152610209.MP.jpg",
        "images/hero/2-min-min.png",
        "images/hero/bg5.jpg"
      ];
    }

    console.log("Images selected for slideshow:", images);
    console.log("Does #home exist?", $('#home').length > 0);

    if (images.length && $('#home').length) {
      $('#home').backstretch(images, { duration: 3000, fade: 750 });
    }
  });




   /* Flexslider
    -----------------------------------------------*/
    $(window).load(function() {
      $('.flexslider').flexslider({
         animation: "slide"
      });
    });
  

  /* Parallax section
    -----------------------------------------------*/
  function initParallax() {
    $('#about').parallax("100%", 0.1);
    $('#feature').parallax("100%", 0.3);
    $('#about').parallax("100%", 0.1);
    $('#video').parallax("100%", 0.2);
    $('#menu').parallax("100%", 0.3);
    $('#team').parallax("100%", 0.3);
    $('#gallery').parallax("100%", 0.1);
    $('#contact').parallax("100%", 0.2);
  }
  initParallax();


  /* Nivo lightbox
    -----------------------------------------------*/
  $('#gallery .col-md-4 a').nivoLightbox({
        effect: 'fadeScale',
    });
  /* Cards View
  -------------------------------------------------*/
 function setupPagination(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const row = container.querySelector('.row');
  const items = row.querySelectorAll('.iso-box.events');
  const itemsPerPage = 9;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = 1;

  // Remove old pagination if exists
  const oldPagination = container.querySelector("#pagination");
  if (oldPagination) oldPagination.remove();

  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";
  paginationContainer.style.textAlign = "center";
  paginationContainer.style.marginTop = "20px";

  function showPage(page) {
    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
          ? "block"
          : "none";
    });
  }

  function createPagination() {
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.className = "page-btn";
      button.style.margin = "0 5px";
      button.style.padding = "5px 10px";
      button.style.cursor = "pointer";

      if (i === currentPage) {
        button.style.backgroundColor = "#333";
        button.style.color = "#fff";
      }

      button.addEventListener("click", () => {
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

  buttons.forEach(({ trigger, target, toggleClass }) => {
    const triggerEl = document.querySelector(trigger);
    const targetEl = document.querySelector(target);

    if (
  document.body.classList.contains('home-page') ||
  document.body.classList.contains('gallery-page')
) {
  triggerEl.addEventListener('click', () => {
    const isActive = triggerEl.classList.contains('active');

    // Hide all and remove active classes
    buttons.forEach(({ trigger: t, target: tg, toggleClass: tc }) => {
      document.querySelector(t).classList.remove('active');
      document.querySelector(tg).classList.add(tc);
    });

    if (!isActive) {
      triggerEl.classList.add('active');
      targetEl.classList.remove(toggleClass);
      setupPagination(target); // 🎯 Apply pagination to active group
    }
  });
}

  });



//pagination for the cardview
  /* wow
  -------------------------------*/
  new WOW({ mobile: false }).init();

  });

