$(document).ready(function () {

	"use strict"; // Start of use strict

	/*=======================================================
			NAVIGATION
    ========================================================*/

	// Navigation is now initialized in the head of the document

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 0) {
			$('nav').addClass('scrolled');
		} else {
			$('nav').removeClass('scrolled');
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
			OWL CAROUSEL TESTIMONIALS
    ========================================================*/

	$(".owl-testimonials").owlCarousel({
		items: 1,
		nav: false,
		autoplay: true,
		loop: true,
		autoplayTimeout: 8000,
		autoplayHoverPause: true
	});

	/*=======================================================
			WOW JS
    ========================================================*/

	new WOW().init();

	/*=======================================================
			PRELOADER
    ========================================================*/

	// Preloader is now handled in the head of the document

});