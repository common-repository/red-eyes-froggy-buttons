(function ($) {
	jQuery(document).ready(function () {
		'use strict';
		function isOdd(num) {
			return num % 2;
		}

		// if ("on" === isActive) {
			var refbuttons = {};

			if ("only_to" !== affectingOptions) {

				if ('everything' === affectingOptions) {
					refbuttons = $(
						'a:not(a:has(img)), .wp-social-link a:not(a:has(img)), button, .button, .btn, input[type="submit"], input[type="button"]'
					)
						.not("'" + excludedClasses + "'")
						.not('#wpadminbar *')
						.not('[class*="screen-reader"]')
						.not('.woocommerce-privacy-policy-text a')
						.not('footer#colophon a')
						.not('footer#colophon button')
						.not('footer#colophon .button')
						.not('footer#colophon .btn')
						.not('footer#colophon input[type="submit"]')
						.add($('.refb-sh'))
						.add($('#place_order'));
				}
				//  button.button.alt, ???
				if ('everything_not_menu' === affectingOptions) {
					refbuttons = $('a:not(a:has(img)')
						.add($('.wp-social-link a:not(a:has(img))'))
						.add($('button'))
						.add($('.button'))
						.add($('.btn'))
						.add($('input[type="submit"]'))
						.add($('input[type="button"]'))
						.add($('a[class*="btn"]'))
						.add($('a[class*="button"]'))
						.add($('.refb-sh'))
						.add($('.checkout_coupon button'))
						.add($('#place_order'))
						.not("'" + excludedClasses + "'")
						.not('nav a')
						.not('*[role="navigation"] a')
						.not('*[role="navigation"] button')
						.not('*[role="navigation"] .button')
						.not('*[role="navigation"] .btn')
						.not('*[role="navigation"] input[type="submit"]')
						.not('.norefbutton a')
						.not('.norefbutton button')
						.not('.norefbutton .button')
						.not('.norefbutton .btn')
						.not('.norefbutton input[type="submit"]')
						.not('.woocommerce-message .button')
						.not('header a')
						.not('header button')
						.not('header .button')
						.not('header .btn')
						.not('header input[type="submit"]')
						.not('footer#colophon a')
						.not('footer#colophon button')
						.not('footer#colophon .button')
						.not('footer#colophon .btn')
						.not('footer#colophon input[type="submit"]')
						.not('ul a')
						.not('ul button')
						.not('ul .button')
						.not('ul .btn')
						.not('ul input[type="submit"]')
						.not('#wpadminbar *')
						.not('[class*="screen-reader"]')
						.not('.woocommerce-privacy-policy-text a')
						.not('.product-name a')
						.not('.download-product a');
				}
				if ('only_buttons' === affectingOptions) {
					refbuttons = $('button, .button, .btn, input[type="submit"], input[type="button"],  a[class*="btn"], a[class*="button"]')
						.not("'" + excludedClasses + "'")
						.not('#wpadminbar *')
						.not('[class*="screen-reader"]')
						.not('footer#colophon a')
						.not('footer#colophon button')
						.not('footer#colophon .button')
						.not('footer#colophon .btn')
						.not('footer#colophon input[type="submit"]')
						.not('.woocommerce-message .button')
						.add($('.refb-sh'))
						.add($('.checkout_coupon button'))
						.add($('#place_order'));
				}
				if ('only_buttons_not_menu' === affectingOptions) {
					refbuttons = $('button, .button, .btn, input[type="submit"], input[type="button"], a[class*="btn"], a[class*="button"]')
						.not("'" + excludedClasses + "'")
						.not('nav a')
						.not('*[role="navigation"] button')
						.not('*[role="navigation"] .button')
						.not('*[role="navigation"] .btn')
						.not('*[role="navigation"] input[type="submit"]')
						.not('.norefbutton button')
						.not('.norefbutton .button')
						.not('.norefbutton .btn')
						.not('.norefbutton input[type="submit"]')
						.not('.woocommerce-message .button')
						.not('header button')
						.not('header .button')
						.not('header .btn')
						.not('header input[type="submit"]')
						.not('footer#colophon a')
						.not('footer#colophon button')
						.not('footer#colophon .button')
						.not('footer#colophon .btn')
						.not('footer#colophon input[type="submit"]')
						.not('ul button')
						.not('ul .button')
						.not('ul .btn')
						.not('ul input[type="submit"]')
						.not('#wpadminbar *')
						.not('[class*="screen-reader"]')
						.not('.woocommerce-privacy-policy-text a')
						.add($('.refb-sh'))
						.add($('.checkout_coupon button'))
						.add($('#place_order'));
				}


			} else {
				refbuttons = $('.' + onlyClass)
					.not('#wpadminbar *')
					.not('[class*="screen-reader"]');
			}


			// var bgcolor = $('a').css('background-color');
			// var bg = $('a').css('background');
			// $('a').css({
			// 	'background': 'transparent!important',
			// 	'background-color': 'transparent!important',
			// });

			var secondClick = false;

			refbuttons.each(function (index, button) {
				var buttonId = $(button).attr('id');
				if (($(button).parents('form').hasClass('woocommerce-form-coupon') || $(button).is(':visible')) && (('' !== $(button).text() || '' !== $(button).val()))) {
					var buttonId = $(button).attr('id');
					$(button).css({
						'all': 'unset!important',
						'background': 'transparent!important',
						'background-color': 'transparent!important',
					});
					// if (!$(button).parents().is(excludedClasses)) {
					// 	if (buttonId !== 'place_order') {
					// 		$(button).hide();
					// 	} else {
					// 		$('#place_order').hide();
					// 	}
					// }

					$(button).on('click', function (event) {
						var that = $(this);

						if (!secondClick) {
							event.stopPropagation();
							setTimeout(function () {
								secondClick = true;
								that.click();
							}, transition);

							someAsynchronousFunction();
						} else {
							secondClick = false;
						}
					});

					// setTimeout(() => {
					if (!$(button).parent().is(excludedClasses)) {
						if (!$(button).parent().hasClass('refbutton')) {
							$(button).wrap('<div class="refbutton free ' + effect + '"></div>');
							$(button).addClass('refbutton-instance');
						}

						var containerWidth = $(button).width();
						$(button).parent('.refubutton.' + effect).css({
							'--container-width': $(button).width(),
							'--container-height': $(button).height(),
						})
						$(button).addClass('refbutton-instance');
					}

					var mySvgWrapper = $(button).find('*').has('svg');
					var mySvgTag = $(button).find('svg');
					var mySvgTagPath = mySvgTag.find('path');
					mySvgWrapper.attr('style', function (i, s) { return (s || '') + 'width: ' + $(button).height() + 'px !important;' });
					mySvgWrapper.attr('style', function (i, s) { return (s || '') + 'min-width: ' + $(button).height() + 'px !important;' });
					mySvgTag.attr('style', function (i, s) { return (s || '') + 'width: ' + $(button).height() + 'px !important;' });
					mySvgTag.attr('style', function (i, s) { return (s || '') + 'min-width: ' + $(button).height() + 'px !important;' });
					mySvgTagPath.attr('style', function (i, s) { return (s || '') + 'width: ' + $(button).height() + 'px !important;' });
					mySvgTagPath.attr('style', function (i, s) { return (s || '') + 'min-width: ' + $(button).height() + 'px !important;' });

					var _width;

					// if (buttonId !== 'place_order') {
					_width = $(button).css('width');
					var _paddingLeft = $(button).css('padding-left');
					var _paddingRight = $(button).css('padding-right');
					var newMinWidth = parseInt(minWidth) + parseInt(_paddingLeft) + parseInt(_paddingRight);
					var totalWidth = parseInt(containerWidth) + parseInt(_paddingLeft) + parseInt(_paddingRight);
					if (isOdd(totalWidth) === 1) {
						++totalWidth;
					}

					$(button).parent().attr('style', function (i, s) { return (s || '') + 'min-width: ' + newMinWidth + 'px !important;' });
					$(button).css({
						"--button-actual-width": totalWidth + 'px',
						"--button-actual-width-val": totalWidth,
					});

					// } else {
					setTimeout(() => {
						_width = $('#place_order').css('width');
						var _paddingLeft = $('#place_order').css('padding-left');
						var _paddingRight = $('#place_order').css('padding-right');
						var newMinWidth = parseInt(minWidth) + parseInt(_paddingLeft) + parseInt(_paddingRight);
						var totalWidth = parseInt(_width) + parseInt(_paddingLeft) + parseInt(_paddingRight);
						if (isOdd(totalWidth) === 1) {
							++totalWidth;
						}
						$('#place_order').css({
							"--button-actual-width": totalWidth + 'px',
							"--button-actual-width-val": totalWidth,
						});

						$('#place_order').parent().attr('style', function (i, s) { return (s || '') + 'min-width: ' + newMinWidth + 'px !important;' });
						// }


						// if (buttonId !== 'place_order') {
						// $(button).show();
						// } else {
						$('#place_order').show();
						// }

					}, 2500);
				}
			});
			// $('a').css({
			// 	'background': bg,
			// 	'background-color': bgcolor,
			// });

			$(document.body).on('updated_cart_totals', function () {
				var buttons = {};
				buttons = $('.return-to-shop > .button')
					.add($('.woocommerce-cart-form button'))
					.add($('.wc-proceed-to-checkout a'));
				buttons.each(function (index, button) {
					$(button).wrap('<div class="refbutton free ' + effect + '"></div>');
					$(button).addClass('refbutton-instance');
					$(button).parent('.refubutton.' + effect).css({
						'--container-width': $(button).width(),
						'--container-height': $(button).height(),
					});
					var mySvgWrapper = $(button).find('*').has('svg');
					var mySvgTag = $(button).find('svg');
					var mySvgTagPath = mySvgTag.find('path');
					mySvgWrapper.attr('style', function (i, s) { return (s || '') + 'width: ' + $(button).height() + 'px !important;' });
					mySvgWrapper.attr('style', function (i, s) { return (s || '') + 'min-width: ' + $(button).height() + 'px !important;' });
					mySvgTag.attr('style', function (i, s) { return (s || '') + 'width: ' + $(button).height() + 'px !important;' });
					mySvgTag.attr('style', function (i, s) { return (s || '') + 'min-width: ' + $(button).height() + 'px !important;' });
					mySvgTagPath.attr('style', function (i, s) { return (s || '') + 'width: ' + $(button).height() + 'px !important;' });
					mySvgTagPath.attr('style', function (i, s) { return (s || '') + 'min-width: ' + $(button).height() + 'px !important;' });

					var _width;
					_width = $(button).css('width');
					var _paddingLeft = $(button).css('padding-left');
					var _paddingRight = $(button).css('padding-right');
					var totalWidth = parseInt(_width) + parseInt(_paddingLeft) + parseInt(_paddingRight);
					if (isOdd(totalWidth) === 1) {
						++totalWidth;
					}

					$(button).parent().attr('style', function (i, s) { return (s || '') + 'max-width: ' + totalWidth + 'px !important;' });
					$(button).parent().attr('style', function (i, s) { return (s || '') + 'width: ' + totalWidth + 'px !important;' });
					$(button).css({
						"--button-actual-width": totalWidth + 'px',
						"--button-actual-width-val": totalWidth,
					});

				});
			});

			$(document.body).on('wc_cart_emptied', function () {
				var buttons = {};
				buttons = $('.return-to-shop .button')
					.add($('.return-to-shop a'))
					.add($('.woocommerce-cart-form button'))
					.add($('.wc-proceed-to-checkout a'));
				buttons.each(function (index, button) {
					$(button).wrap('<div class="refbutton free ' + effect + '"></div>');
					$(button).addClass('refbutton-instance');
					$(button).parent('.refubutton.' + effect).css({
						'--container-width': $(button).width(),
						'--container-height': $(button).height(),
					});
					var _width;
					_width = $(button).css('width');
					var _paddingLeft = $(button).css('padding-left');
					var _paddingRight = $(button).css('padding-right');
					var totalWidth = parseInt(_width) + parseInt(_paddingLeft) + parseInt(_paddingRight);
					if (isOdd(totalWidth) === 1) {
						++totalWidth;
					}

					$(button).parent().attr('style', function (i, s) { return (s || '') + 'max-width: ' + totalWidth + 'px !important;' });
					$(button).css({
						"--button-actual-width": totalWidth + 'px',
						"--button-actual-width-val": totalWidth,
					});

				});
			});

			$(document).on('click', '.cmplz-view-preferences', function (e) {
				e.preventDefault();
				$(this).parent('.refbutton').hide();
				$('.cmplz-save-preferences').addClass('refbutton-instance').wrap('<div class="refbutton free ' + effect + '"></div>');
			});
		// }

	});
})(jQuery);
