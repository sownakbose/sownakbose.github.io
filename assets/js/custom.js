$(document).ready(function () {

	"use strict";

	// Initialize CoreNav first (it restructures the DOM)
	if ($.fn.coreNavigation) {
		$('nav').coreNavigation({
			menuPosition: "right",
			container: true,
			mode: 'fixed',
			responsideSlide: true,
			animated: true,
			animatedIn: 'fadeInDown',
			animatedOut: 'fadeOutUp'
		});
	}

	/*=======================================================
			NAVIGATION
    ========================================================*/

	// Nav background on scroll + active section highlighting
	$(window).on('scroll', function () {
		var scrollPos = $(window).scrollTop();

		// Nav background
		if (scrollPos > 0) {
			$('nav').addClass('scrolled');
		} else {
			$('nav').removeClass('scrolled');
		}

		// Active section highlighting
		var currentId = '';
		$('section').each(function() {
			var sectionTop = $(this).offset().top - 100;
			if (scrollPos >= sectionTop && $(this).attr('id')) {
				currentId = $(this).attr('id');
			}
		});
		if (currentId) {
			$('.menu li').removeClass('active');
			$('.menu li a[href="#' + currentId + '"]').parent().addClass('active');
		}
	});

	// Smooth scroll for all navigation links
	$(document).on('click', 'nav .menu li a', function(e) {
		var href = $(this).attr('href');
		
		// Only handle hash links
		if (href && href.startsWith('#') && href !== '#') {
			e.preventDefault();
			e.stopPropagation();
			
			var target = href;
			
			// Close mobile menu if open
			if ($('nav').hasClass('open-responsive')) {
				$('.toggle-bar').trigger('click');
			}
			
			// Smooth scroll to target
			if ($(target).length) {
				setTimeout(function() {
					$('html, body').animate({
						scrollTop: $(target).offset().top - 69
					}, 800);
				}, 100);
			}
		}
	});

	/*=======================================================
			OWL CAROUSEL
    ========================================================*/

	$(".main-slider").owlCarousel({
		items: 1,
		nav: false,
		autoplay: true,
		loop: true,
		autoplayTimeout: 8000,
		autoplayHoverPause: true
	});

	$(".main-slider").on("translate.owl.carousel", function () {
		$(".slider-content h3, .slider-content h1, .slider-content a").removeClass("animated fadeInUp").css("opacity", "0");
	});
	$(".main-slider").on("translated.owl.carousel", function () {
		$(".slider-content h3, .slider-content h1, .slider-content a").addClass("animated fadeInUp").css("opacity", "1");
	});

	/*=======================================================
			WOW JS
    ========================================================*/

	new WOW().init();

});