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

	// Smooth scroll for navigation links
	document.addEventListener('click', function(e) {
		// Find if the clicked element or its parent is a nav link
		var target = e.target;
		var link = null;

		// Walk up the DOM tree to find an anchor tag
		for (var i = 0; i < 5; i++) {
			if (!target) break;
			if (target.tagName === 'A' && target.href) {
				link = target;
				break;
			}
			target = target.parentElement;
		}

		if (!link) return;

		// Check if it's a nav link
		var $link = $(link);
		var isNavLink = $link.closest('nav').length > 0 || $link.closest('.wrap-core-nav-list').length > 0;

		if (!isNavLink) return;

		var href = link.getAttribute('href');

		// Only handle hash links
		if (href && href.startsWith('#') && href !== '#') {
			e.preventDefault();
			e.stopPropagation();

			var $target = $(href);

			if (!$target.length) return;

			// Check if we're on mobile
			var isMobile = $('.toggle-bar').is(':visible');
			var $nav = $('nav');
			var isMenuOpen = $nav.hasClass('open-responsive');

			if (isMobile && isMenuOpen) {
				// Close the mobile menu
				$nav.removeClass('open-responsive');
				$('.core-responsive-slide').removeClass('open');
				$('.dropdown-overlay').removeClass('open-dropdown');
				$nav.removeClass('open-dropdown');
				$('body').css('overflow', '');

				// Scroll after menu closes
				setTimeout(function() {
					$('html, body').stop().animate({
						scrollTop: $target.offset().top - 69
					}, 800);
				}, 400);
			} else {
				// Desktop - scroll immediately
				$('html, body').stop().animate({
					scrollTop: $target.offset().top - 69
				}, 800);
			}
		}
	}, true); // Use capture phase to intercept before other handlers

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