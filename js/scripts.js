/*global $, jQuery, alert*/
(function ($) {
    "use strict";
	
    function vossenIframes() {
        $('.video-container').click(function(){
            $(this).addClass('reveal'); 
            var videoImg = $(this).find('img'),
                videoIframe = $(this).find('iframe'),
                videoAttr = videoIframe.attr('data-video-embed'),
                videoPlay = videoAttr + "?autoplay=1&autoplay=true";
            videoImg.animate({'opacity': 0}, 300);
            videoIframe.css('visibility', 'visible').attr('src', videoPlay);
            videoIframe[0].setAttribute('allowFullScreen', '');
        });
    }  
 
    function vossenPortfolio() {
        var vosPortfolio = $('.vossen-portfolio'),
            initFilter = $('.vossen-portfolio-filters'),
            vossenFilters = $('.vossen-portfolio-filters li'),
            portfolioItems = $('.vossen-portfolio > div'),
            initialCat;
        
        // Init Filter to class except *all
        initFilter.each(function () {
            var dataOption = $(this).attr('data-initial-filter');
            $(this).attr('data-initial-filter', '.' + dataOption);
            if ($(initFilter).data('initial-filter') === '.*') {
                $(this).attr('data-initial-filter', '*');
            }
        });
        // Filters data to class except first
        vossenFilters.not(':first').each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).attr('data-filter', "." + dataOption);
        });
        // Items data to class
        portfolioItems.each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).addClass(dataOption);
        });
        // Animate Items
        portfolioItems.waypoint(function () {
            portfolioItems.each(function (i) {
                var eachItem = $(this);
                setTimeout(function () { eachItem.addClass('reveal'); }, (i * 3) * 60);
            });
        }, { offset: '100%', triggerOnce: true });
        initialCat = $('.vossen-portfolio-filters').attr('data-initial-filter');
        // Add active class to filter
        $('.vossen-portfolio-filters li[data-filter="' + initialCat + '"]').addClass('active');
        // Init Isotope Filters
        vossenFilters.on('click', function () {
            $('.vossen-portfolio-filters li.active').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            vosPortfolio.isotope({
                filter: filterValue
            });
        });
        // Init Isotope
        var $grid = vosPortfolio.isotope({
            itemSelector: '.vossen-portfolio > div',
            percentPosition: true,
            filter: initialCat,
            masonry: {
                columnWidth: '.vossen-portfolio > div'
            }
        });
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
    }
    
    $(window).resize(function (){
        setTimeout(function(){ 
            $('.vossen-portfolio-filters .active').trigger('click');
        }, 600);
    });
    
    function testimonialSlider() {
        var testimonialsOwl = $('.testimonials'),
            autoplay = testimonialsOwl.data('autoplay'),
            autoplaySpeed = testimonialsOwl.data('speed');
        testimonialsOwl.owlCarousel({
            autoplay : autoplay,
            autoplayTimeout: autoplaySpeed,
            autoplaySpeed: 700,
            loop: true,
            items: 1,
            dots: true,
            dotsSpeed: 400
        });
    }
    
    function vosMap() {
        $('#vossen-map').waypoint(function () {
            initVossenMaps()
        }, { offset: '100%', triggerOnce: true });
    }
    
    function vossenHeader() {
        $('.nav li.dropdown>a, .dropdown-submenu>a').on('click', function () {
            $(this).closest('.dropdown').siblings().removeClass('open');
            $(this).closest('.dropdown').toggleClass('open');
            return false;
        });
        $('.nav li a, .btn-scroll').on('click', function () {
            var $anchor = $(this);            
            function scrollToAnchor() {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - offsetVar
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
            }
            if ($(window).width() > 992) {
                var offsetVar = '59';
                scrollToAnchor();
            } else {
                var offsetVar = '0';
                scrollToAnchor();
            }
        });
        function navSmall() {
            $(window).scroll(function (){
                if ($(window).scrollTop() > 70) {
                $('nav').addClass("nav-small");
                } else {
                    $('nav').removeClass("nav-small");
                }
            });
        }
        if ($('nav').data('animation') === 'hiding') {
            var vosWindow = $(window);
            var navPosition = vosWindow.scrollTop();
            vosWindow.scroll(function() {
                if(vosWindow.scrollTop() > navPosition) {
                    $('nav').removeClass('nav-down').addClass('nav-up');
                } else {
                    $('nav').removeClass('nav-up').addClass('nav-down');
                }
                navPosition = vosWindow.scrollTop();
             });
            navSmall();
        } else {
            navSmall();
        }
        $('.scroll-top').on('click', function () {
            $('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
            return false;
        });
        function elementsAnchor() {
            var hash = window.location.hash;
            if (hash != '') {
                setTimeout(function() {
                    $('html, body').stop().animate({
                        scrollTop: $(hash).offset().top - 59
                    }, 1000, 'easeInOutExpo');
                    history.pushState('', document.title, window.location.pathname);
                }, 500);
            }  
        } elementsAnchor();
    }
    
    function bootstrapTools() {
        $('#accordion,#accordion2').on('show.bs.collapse', function () {
            $('#accordion .in').collapse('hide');
        });
        $("[data-toggle='tooltip']").tooltip();
        $('#buttonTabs a,#iconTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }
    
    function countUp() {
        $('#fun-facts').waypoint(function () {
            $('.counter h1').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');
                $({ countNum: $this.text()}).animate({
                    countNum: countTo
                }, {
                    duration: 1700,
                    easing:'linear',
                    step: function() {
                      $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                      $this.text(this.countNum);
                      //alert('finished');
                    }
                });  
            });
        }, { offset: '100%', triggerOnce: true });
    }
    
    function countdown() {
        var dateUser = $("#countdown-timer").attr('data-date'),
            deadline = new Date(dateUser);
        function updateClock() {
            var today = Date(),
                diff = Date.parse(deadline) - Date.parse(today);
            if (diff <= 0) {
                clearInterval(interval);
            } else {
                var seconds = Math.floor((diff / 1000) % 60),
                    minutes = Math.floor((diff / 1000 / 60) % 60),
                    hours = Math.floor((diff / 1000 / 60 / 60) % 24),
                    days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30.5),
                    months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.5) % 12);
                $("#months").text(('0' + months).slice(-2));
                $("#days").text(('0' + days).slice(-2));
                $("#hours").text(('0' + hours).slice(-2));
                $("#minutes").text(('0' + minutes).slice(-2));
                $("#seconds").text(('0' + seconds).slice(-2));
            }
        }
        var interval = setInterval(updateClock, 1000);
    }
    
    function lightbox() {
        $('.lightbox').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery:{
                enabled:true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><img src="img/assets/slider-left-thin-arrow.png"></button>',
            },
            mainClass: 'mfp-zoom-in',
            removalDelay: 500, //delay removal to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                }
            },     
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            midClick: true
        });
    }
	
	function magnivicPopupByClick(){
		$('.galleryItem').each(function(i){
			$(this).on('click', function(){
				$('.lightbox').magnificPopup('open', i)			
			});			
		});		
	}
    
    $(document).ready(function () {
        countUp();
        vossenIframes();
        parallaxVossen();
        vossenPortfolio();
        testimonialSlider();
        vosMap();        
        vossenHeader();
        bootstrapTools();
        countdown();
        lightbox();
		magnivicPopupByClick();
    });
     
}(jQuery));  