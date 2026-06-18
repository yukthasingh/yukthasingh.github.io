/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav = $('#nav'),
		$header = $('#header');

	// Scroll fade state.
	var _scrollPos = 0,
		_scrollTimer = null,
		_navTrigger = ($header.length > 0 ? Math.max(140, $header.outerHeight() - 80) : 140);

	function updateNavState() {
		var y = $window.scrollTop();

		$body.toggleClass('scrolled', y > 30);
		$body.toggleClass('content-visible', y > 30);
		$nav.toggleClass('alt', y > _navTrigger);
	}

	$window.on('scroll', function () {
		var y = $window.scrollTop();

		updateNavState();

		if (y !== _scrollPos) {
			$body.removeClass('scrolling-down scrolling-up').addClass(y > _scrollPos ? 'scrolling-down' : 'scrolling-up');
			_scrollPos = y;
		}

		window.clearTimeout(_scrollTimer);
		_scrollTimer = window.setTimeout(function () {
			$body.removeClass('scrolling-down scrolling-up');
		}, 250);
	});

	$window.on('load', updateNavState);

	// Nav.

	if ($nav.length > 0) {

		// Links.
		var $nav_a = $nav.find('a');

		$nav_a
			.scrolly({
				speed: 1000,
				offset: function () { return $nav.height(); }
			})
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$nav_a
					.removeClass('active')
					.removeClass('active-locked');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					initialize: function () {

						// Deactivate section only when it begins below the visible page.
						if (browser.canUse('transition')) {
							var sectionTop = $section.offset().top;
							var windowBottom = $window.scrollTop() + $window.height() * 0.9;
							if (sectionTop > windowBottom)
								$section.addClass('inactive');
						}
					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// Always deactivate all links first, then activate this section's one.
						$nav_a.removeClass('active');
						$this.addClass('active');

						// If this link was locked, unlock it now.
						if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

						// Scroll the active nav link into view on mobile.
						if (breakpoints.active('<=small')) {
							var navUl = $nav.find('ul')[0];
							if (navUl) {
								$this[0].scrollIntoView({
									behavior: 'smooth',
									inline: 'center',
									block: 'nearest'
								});
							}
						}

					},
					leave: function () {

						// Deactivate this section's link when leaving the section.
						$this.removeClass('active');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000
	});

})(jQuery);