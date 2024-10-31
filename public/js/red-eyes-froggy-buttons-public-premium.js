(function ($) {
	$.each(["show", "hide"], function (i, ev) {
		var el = $.fn[ev];
		$.fn[ev] = function () {
			this.trigger(ev);
			return el.apply(this, arguments);
		};
	});
})(jQuery);

/*
 *  jquery-svg - v0.0.0
 *  A lightweight jQuery plugin to apply css styles and js scripts to a SVG which is embedded (using the <object> tag).
 *  http://berneti.ir
 *
 *  Made by Mohammadreza Berneti
 *  Under MIT License
 */

(function ($) {
	// select a svg element from embed or object tag
	$.fn.getSVG = function (selector) {
		var svgDoc = this[0].contentDocument; // Get the document object for the SVG
		return $(svgDoc);
	};
	$.fn.setSVGStyle = function (style) {
		var svgDoc = this[0].contentDocument; // Get the document object for the SVG
		var styleElement = svgDoc.createElementNS(
			"http://www.w3.org/2000/svg",
			"style"
		);
		styleElement.textContent = style; // add whatever you need here
		svgDoc.getElementsByTagName("svg")[0].appendChild(styleElement);
		return;
	};
	$.fn.setSVGStyleLink = function (link) {
		var svgDoc = this[0].contentDocument; // Get the document object for the SVG
		var linkElm = svgDoc.createElementNS(
			"http://www.w3.org/1999/xhtml",
			"link"
		);
		linkElm.setAttribute("href", link);
		linkElm.setAttribute("type", "text/css");
		linkElm.setAttribute("rel", "stylesheet");
		svgDoc.getElementsByTagName("svg")[0].appendChild(linkElm);
		return;
	};
	// get a random number between min and max
	$.getRandom = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
})(jQuery);

(function ($) {
	jQuery(document).ready(function () {
		"use strict";

		function RGBAToHexA(color, forceAlphaChanner, excludeAlphaChanner) {
			if (color.indexOf("#") >= 0) {
				color = hexToRgbA(color, 0, "RGBAToHexA");
			}

			if (color.substring(0, 4) === "rgba") {
				let sep = color.indexOf(",") > -1 ? "," : " ";
				let rgba = color.substr(5).split(")")[0].split(sep);

				// Strip the slash if using space-separated syntax
				if (color.indexOf("/") > -1) color.splice(3, 1);

				for (let R in rgba) {
					let r = rgba[R];
					if (r.indexOf("%") > -1) {
						let p = r.substr(0, r.length - 1) / 100;

						if (R < 3) {
							rgba[R] = Math.round(p * 255);
						} else {
							rgba[R] = p;
						}
					}
				}
				let r = (+rgba[0]).toString(16),
					g = (+rgba[1]).toString(16),
					b = (+rgba[2]).toString(16),
					a = "00";
				// a = Math.round(+rgba[3] * 255).toString(16);
				if (r.length == 1) r = "0" + r;
				if (g.length == 1) g = "0" + g;
				if (b.length == 1) b = "0" + b;
				if (a.length == 1) a = "0" + a;
				if (excludeAlphaChanner) {
					return "#" + r + g + b;
				}
				return "#" + r + g + b + a;
			} else {
				let sep = color.indexOf(",") > -1 ? "," : " ";
				let rgb = color.substr(4).split(")")[0].split(sep);

				// Strip the slash if using space-separated syntax
				if (color.indexOf("/") > -1) color.splice(3, 1);

				for (let R in rgb) {
					let r = rgb[R];
					if (r.indexOf("%") > -1) {
						let p = r.substr(0, r.length - 1) / 100;

						if (R < 3) {
							rgb[R] = Math.round(p * 255);
						} else {
							rgb[R] = p;
						}
					}
				}
				let r = (+rgb[0]).toString(16),
					g = (+rgb[1]).toString(16),
					b = (+rgb[2]).toString(16),
					a = "00";
				if (r.length == 1) r = "0" + r;
				if (g.length == 1) g = "0" + g;
				if (b.length == 1) b = "0" + b;
				if (forceAlphaChanner) {
					if (a.length == 1) a = "0" + a;
					return "#" + r + g + b + a;
				}
				return "#" + r + g + b;
			}
		}

		function hexToRgbA(hex, opacity, caller) {
			if (hex.indexOf("#") <= -1) {
				hex = RGBAToHexA(hex, false, true);
			}
			var c;
			if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
				c = hex.substring(1).split("");
				if (c.length == 3) {
					c = [c[0], c[0], c[1], c[1], c[2], c[2]];
				}
				c = "0x" + c.join("");
				if (opacity !== 1) {
					return (
						"rgba(" +
						[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
						"," +
						opacity +
						")"
					);
				}
				return (
					"rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ")"
				);
			}
			throw new Error("Bad Hex: " + hex + " caller: " + caller);
		}

		function setForegroundColor(input, caller) {
			if (undefined === input) {
				input = "rgb(0,0,0)";
			}
			let notation;
			if (input.indexOf("rgba(") != -1) {
				notation = "rgba(";
			} else {
				notation = "rgb(";
			}
			var values = input.replace(notation, "");
			values = values.replace(")", "");
			values = values.replace(" ", "");
			var rgb = values.split(",");
			var sum = 0;
			sum = Math.round(
				(parseInt(rgb[0]) * 299 +
					parseInt(rgb[1]) * 587 +
					parseInt(rgb[2]) * 114) /
					1000
			);

			return sum > 128 ? "#000000" : "#ffffff";
		}

		function isOdd(num) {
			return num % 2;
		}

		function doButtons() {
			if ("on" === isActive) {
				if ("only_to" !== affectingOptions) {
					if ("everything" === affectingOptions) {
						refbuttons = $(
							'a:not(a:has(img)), .wp-social-link a:not(a:has(img)), button, .button, .btn, input[type="submit"], input[type="button"]'
						)
							.not("'" + excludedClasses + "'")
							.not("#wpadminbar *")
							.not('[class*="screen-reader"]')
							.not(".woocommerce-privacy-policy-text a")
							.not("footer#colophon a")
							.not("footer#colophon button")
							.not("footer#colophon .button")
							.not("footer#colophon .btn")
							.not('footer#colophon input[type="submit"]')
							.add($(".refb-sh"))
							.add($(".checkout_coupon.woocommerce-form-coupon button.button"))
							.add($('.woocommerce-mini-cart__buttons a.button'))
							.add($(".woocommerce-mini-cart__buttons a"));
					}
					if ("everything_not_menu" === affectingOptions) {
						refbuttons = $(
							'a:not(a:has(img)), .wp-social-link a:not(a:has(img)), button, .button, .btn, input[type="submit"], input[type="button"], button.button.alt'
						)
							.not("'" + excludedClasses + "'")
							.not("nav a")
							.not("nav button")
							.not('*[role="navigation"] a')
							.not('*[role="navigation"] button')
							.not('*[role="navigation"] .button')
							.not('*[role="navigation"] .btn')
							.not('*[role="navigation"] input[type="submit"]')
							.not(".norefbutton a")
							.not(".norefbutton button")
							.not(".norefbutton .button")
							.not(".norefbutton .btn")
							.not('.norefbutton input[type="submit"]')
							.not(".woocommerce-message .button")
							.not("header a")
							.not("header button")
							.not("header .button")
							.not("header .btn")
							.not('header input[type="submit"]')
							.not("footer#colophon a")
							.not("footer#colophon button")
							.not("footer#colophon .button")
							.not("footer#colophon .btn")
							.not('footer#colophon input[type="submit"]')
							.not("ul a")
							.not("ul button")
							.not("ul .button")
							.not("ul .btn")
							.not('ul input[type="submit"]')
							.not("#wpadminbar *")
							.not('[class*="screen-reader"]')
							.not(".woocommerce-privacy-policy-text a")
							.not(".product-name a")
							.not(".download-product a")
							.add($(".checkout_coupon.woocommerce-form-coupon button.button"))
							.add($(".woocommerce-mini-cart__buttons a"))
							.add($(".refb-sh"))
							.add($("ul.products a"))
							.add($("ul.products button"))
							.add($("ul.products .button"))
							.add($("ul.products .btn"))
							.add($("ul.wc-block-grid__products a"))
							.add($("ul.wc-block-grid__products button"))
							.add($("ul.wc-block-grid__products .button"))
							.add($("ul.wc-block-grid__products .btn"))
							.add($('.woocommerce-mini-cart__buttons a.button'))
							.add($('ul.wc-block-grid__products input[type="submit"]'));
					}
					if ("only_buttons" === affectingOptions) {
						refbuttons = $(
							'button, .button, .btn, input[type="submit"], input[type="button"],  a[class*="btn"], a[class*="button"]'
						)
							.not("'" + excludedClasses + "'")
							.not("#wpadminbar *")
							.not('[class*="screen-reader"]')
							.add($(".refb-sh"))
							.not(".woocommerce-message .button")
							.not("footer#colophon button")
							.not("footer#colophon .button")
							.not("footer#colophon .btn")
							.not('footer#colophon input[type="submit"]')
							.add($(".checkout_coupon.woocommerce-form-coupon button.button"))
							.add($(".woocommerce-mini-cart__buttons a.button"));
					}
					if ("only_buttons_not_menu" === affectingOptions) {
						refbuttons = $(
							'button, .button, .btn, input[type="submit"], input[type="button"], a[class*="btn"], a[class*="button"]'
						)
							.not("'" + excludedClasses + "'")
							.not("nav a")
							.not("nav button")
							.not('*[role="navigation"] button')
							.not('*[role="navigation"] .button')
							.not('*[role="navigation"] .btn')
							.not('*[role="navigation"] input[type="submit"]')
							.not(".norefbutton button")
							.not(".norefbutton .button")
							.not(".norefbutton .btn")
							.not('.norefbutton input[type="submit"]')
							.not(".woocommerce-message .button")
							.not("header button")
							.not("header .button")
							.not("header .btn")
							.not('header input[type="submit"]')
							.not("footer#colophon button")
							.not("footer#colophon .button")
							.not("footer#colophon .btn")
							.not('footer#colophon input[type="submit"]')
							.not("ul button")
							.not("ul .button")
							.not("ul .btn")
							.not('ul input[type="submit"]')
							.not("#wpadminbar *")
							.not('[class*="screen-reader"]')
							.not(".woocommerce-privacy-policy-text a")
							.add($("ul.products a"))
							.add($("ul.products button"))
							.add($("ul.products .button"))
							.add($("ul.products .btn"))
							.add($("ul.wc-block-grid__products a"))
							.add($("ul.wc-block-grid__products button"))
							.add($("ul.wc-block-grid__products .button"))
							.add($("ul.wc-block-grid__products .btn"))
							.add($('ul.wc-block-grid__products input[type="submit"]'))
							.add($(".refb-sh"))
							.add($(".checkout_coupon.woocommerce-form-coupon button.button"))
							.add($(".woocommerce-mini-cart__buttons a.button"));
					}
				} else {
					refbuttons = $("." + onlyClass)
						.not("#wpadminbar *")
						.not('[class*="screen-reader"]')
						.add($(".refb-sh"));
				}
			} else {
				refbuttons = $(".refbutton.refb-sh");
			}

			// var bgStartColor = $('a').css('background-color');
			// var bgStart = $('a').css('background');
			// $('a').css({
			// 	'background': 'transparent!important',
			// 	'background-color': 'transparent!important',
			// });

			// console.log(refbuttons);

			refbuttons.each(function (index, button) {
				if ($(button).parent().hasClass("woocommerce-mini-cart__buttons")) {
					console.debug("woocommerce-mini-cart__buttons = " + $(button).text());
				}
				if (
					($(button).parents("form").hasClass("woocommerce-form-coupon") ||
						// $(button).parent().hasClass("woocommerce-mini-cart__buttons") ||
						$(button).is(":visible")) &&
					("" !== $(button).text() || "" !== $(button).val())
				) {
					$(button).css({
						all: "unset!important",
						background: "transparent!important",
						"background-color": "transparent!important",
					});

					// if (!$(button).parents().is(excludedClasses)) {
					// 	if ($(button).attr('id') !== 'place_order') {
					// 		$(button).hide();
					// 	} else {
					// 		$('#place_order').hide();
					// 	}
					// }

					if ("autocolor" === colorMode) {
						alternateColor = setForegroundColor(_defaultColor);
					} else {
						alternateColor = bgColor;
					}
					var rgba1 = hexToRgbA(alternateColor, 1, "");
					var rgba2 = hexToRgbA(alternateColor, 0.5, "");
					var actualWidth = $(button).width() + 28;
					var actualHeight = $(button).height() + 20;
					$(":root").css({
						"--rgba1-color": rgba1,
						"--rgba2-color": rgba2,
						"--actual-width": actualWidth,
						"--actual-height": actualHeight,
					});
					var myspan = $(button).find("span");
					if (myspan.length > 0) {
						myspan.each(function (i, s) {
							var attr = $(s).attr("aria-hidden");
							if (typeof attr !== "undefined" && attr !== false) {
								$(s).remove();
								$(button).css("unset", "all");
							}
						});
					}
					if (
						!$(button).parents().is(excludedClasses) &&
						!$(button).is(excludedClasses)
					) {
						if (!$(button).parent().hasClass("refbutton")) {
							if ($(button).hasClass("refb-sh")) {
								var sheffect = $(this).data("effect");
								$(button).wrap(
									'<div class="refbutton premium refb-sh ' +
										sheffect +
										" " +
										colorMode +
										'"></div>'
								);
							} else {
								$(button).wrap(
									'<div class="refbutton premium ' +
										effect +
										" " +
										colorMode +
										'"></div>'
								);
							}
						}
						$(button).addClass("refbutton-instance");

						if (
							effect === "special01" ||
							effect === "special03" ||
							effect === "special05" ||
							effect === "special07"
						) {
							var mySvgContainer = $(button).find("*").has("svg");
							mySvgContainer.remove();
							var mySvg = $(button).find("svg");
							mySvg.remove();
						}

						var containerWidth = parseFloat($(button).width());
						$(button)
							.parent(".refbutton.premium." + effect)
							.css({
								"--container-width": parseFloat($(button).width()),
								"--container-height": parseFloat($(button).height()),
							});
						var _width, _width_val;
						var btntxt = $($(button).contents()[0]).text();
						_width = $(button).css("width");
						_width_val = $(button).width();
						var _paddingLeft = $(button).css("padding-left");
						var _paddingRight = $(button).css("padding-right");
						var newMinWidth =
							parseFloat(_width) +
							parseFloat(_paddingLeft) +
							parseFloat(_paddingRight);
						var totalWidth =
							parseFloat(containerWidth) +
							parseFloat(_paddingLeft) +
							parseFloat(_paddingRight);
						if (isOdd(totalWidth) === 1) {
							++totalWidth;
						}

						if (newMinWidth > totalWidth) {
							newMinWidth = totalWidth;
						}
						$(button)
							.parent()
							.css({
								"--button-actual-width": totalWidth + "px",
								"--button-actual-width-val": totalWidth,
							});

						$(button)
							.parent()
							.attr("style", function (i, s) {
								return (
									(s || "") + "min-width: " + newMinWidth + "px !important;"
								);
							});

						if (
							effect === "special05" ||
							effect === "special10" ||
							effect === "special11" ||
							effect === "special12" ||
							effect === "special13"
						) {
							$(button)
								.parent()
								.attr("style", function (i, s) {
									return (s || "") + "width: " + totalWidth + "px !important;";
								});
						}

						if (effect === "premium13") {
							if ($(button).find(".button__horizontal").length === 0) {
								$(button).append(
									'<div class="button__horizontal"></div><div class="button__vertical"></div>'
								);
							}
						}
						if (
							effect === "free22" ||
							effect === "free23" ||
							effect === "free24" ||
							effect === "free25"
						) {
							if ("autocolor" !== colorMode) {
								$(button).css({
									"--bg-lines-color": _defaultColor,
								});
							} else {
								var bgc, newbgc;
								bgc = bgHColor;
								console.log("bgc is " + bgc);
								newbgc;
								if (bgc.indexOf("a") == -1) {
									newbgc = bgc.replace(")", ", 0.2)").replace("rgb", "rgba");
								} else {
									newbgc = bgc.replace(/[\d\.]+\)$/g, "0.2)");
								}
								$(button).css({
									"--bg-lines-color": newbgc,
								});
							}
						}

						if (effect === "special02") {
							if ($(button).find(".blob-btn__inner").length === 0) {
								$(button).append(
									'<span class="inner-background"></span><span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>'
								);
							}
						}
						if (effect === "special03") {
							var className = $(button)
								.find("*")
								.filter(function () {
									return $(this).text() !== "";
								})
								.attr("class");
							var fontSize = $(button)
								.find("." + className)
								.css("font-size");
							$(button).css({
								"--font-size": fontSize,
							});
							$(button).attr("style", "font-size:" + fontSize + "!important");
							var txt = $($(button).contents()[0]).text();
							$(button).attr("data-after", txt);
							$(button).attr("data-before", txt);
						}
						if (effect === "special05") {
							var className = $(button)
								.find("*")
								.filter(function () {
									return $(this).text() !== "";
								})
								.attr("class");
							var fontSize = $(button)
								.find("." + className)
								.css("font-size");
							$(button).css({
								"--font-size": fontSize,
							});
							$(button).attr("style", "font-size:" + fontSize + "!important");
							var txt = $(button).text();
							if ("" === txt) {
								txt = $($(button).contents()[0]).text();
							}
							$(button).attr("data-after-before", txt);
							$(button).attr("data-before", txt);
							var mySvgContainer = $(button).find("*").has("svg");
							mySvgContainer.remove();
							$($(button).contents()[0]).css("color", "transparent");
						}
						if (effect === "special06") {
							var txt = $(button).text();
							if ("" === txt) {
								txt = $($(button).contents()[0]).text();
							}
							$(button).html('<span id="btn-text">' + txt + "</span>");
							// var myspan = $(button).find('span');
							// if (myspan.length === 0) {
							// 	$(button).wrapInner('<span></span>');
							// }
							$(button).append('<div class="liquid"></div>');
						}
						if (effect === "special07") {
							var className = $(button)
								.find("*")
								.filter(function () {
									return $(this).text() !== "";
								})
								.attr("class");
							var fontSize = $(button)
								.find("." + className)
								.css("font-size");
							$(button).css({
								"--font-size": fontSize,
							});
							$(button).attr("style", "font-size:" + fontSize + "!important");

							var txt = $(button).text();
							if ("" === txt) {
								txt = $($(button).contents()[0]).text();
							}
							$(button).html('<span id="btn-text">' + txt + "</span>");
							$(button).attr("data-button-text", txt);
						}

						if (
							effect === "special08" ||
							effect === "special09" ||
							effect === "special10" ||
							effect === "special11" ||
							effect === "special12" ||
							effect === "special13"
						) {
							var mySvgContainer = $(button).find("*").has("svg");
							var mySvg = $(button).find("svg");
							var mySvgPath = mySvg.find("path");
							var className = $(button)
								.find("*")
								.filter(function () {
									return $(this).text() !== "";
								})
								.attr("class");
							var fontSize = $(button)
								.find("." + className)
								.css("font-size");
							var txt = $(button).text();
							if ("" === txt) {
								txt = $($(button).contents()[0]).text();
							}
							$(button).find("*").remove();
							var cache = $(button).children();
							$(button).text(txt).append(cache);
							$(button).attr("style", "font-size:" + fontSize + "!important");
							$(button).append(mySvgContainer);
							$(mySvgContainer).append(mySvg);
							$(mySvg).append(mySvgPath);
						}

						// $(button).show();

						if ("special03" === effect || "special05" === effect) {
							$('[class*="svg"]').remove();
						}
					}
				}
			}); //refbuttons.each

			setTimeout(() => {
				var specialButtons = $("#place_order")
					// .add($('.woocommerce-js .astra-cart-drawer .astra-cart-drawer-content .woocommerce-mini-cart__buttons .button'))
					.add($('.woocommerce-mini-cart__buttons a.button'))
					.add($(".forminator-button"));
				specialButtons.each(function (index, button) {
					if ($(button).parent().hasClass("woocommerce-mini-cart__buttons")) {
						console.debug(
							"woocommerce-mini-cart__buttons = " + $(button).text()
						);
					}
					if (!$(button).parent().hasClass("refbutton")) {
						$(button).wrap(
							'<div class="refbutton premium ' +
								effect +
								" " +
								colorMode +
								'"></div>'
						);
						$(button).addClass("refbutton-instance");
					}

					var containerWidth = parseFloat($(button).width());
					$(button)
						.parent(".refbutton.premium." + effect)
						.css({
							"--container-width": parseFloat($(button).width()),
							"--container-height": parseFloat($(button).height()),
						});
					$(button).css({
						"margin-left": "auto",
						"margin-right": "auto",
					});
					var _width, _width_val;
					var btntxt = $($(button).contents()[0]).text();
					_width = $(button).css("width");
					_width_val = $(button).width();
					var _paddingLeft = $(button).css("padding-left");
					var _paddingRight = $(button).css("padding-right");
					var newMinWidth =
						parseFloat(_width) +
						parseFloat(_paddingLeft) +
						parseFloat(_paddingRight);
					var totalWidth =
						parseFloat(containerWidth) +
						parseFloat(_paddingLeft) +
						parseFloat(_paddingRight);
					if (isOdd(totalWidth) === 1) {
						++totalWidth;
					}

					if (newMinWidth > totalWidth) {
						newMinWidth = totalWidth;
					}
					$(button)
						.parent()
						.css({
							"--button-actual-width": totalWidth + "px",
							"--button-actual-width-val": totalWidth,
						});
					$(button)
						.parent()
						.attr("style", function (i, s) {
							return (s || "") + "min-width: " + newMinWidth + "px !important;";
						});

					if ("autocolor" === colorMode) {
						alternateColor = setForegroundColor(_defaultColor);
					} else {
						alternateColor = bgColor;
					}
					var rgba1 = hexToRgbA(alternateColor, 1, "");
					var rgba2 = hexToRgbA(alternateColor, 0.5, "");
					var actualWidth = $(button).width() + 28;
					var actualHeight = $(button).height() + 20;
					$(":root").css({
						"--rgba1-color": rgba1,
						"--rgba2-color": rgba2,
						"--actual-width": actualWidth,
						"--actual-height": actualHeight,
					});
					var myspan = $(button).find("span");
					if (myspan.length > 0) {
						myspan.each(function (i, s) {
							var attr = $(s).attr("aria-hidden");
							if (typeof attr !== "undefined" && attr !== false) {
								$(s).remove();
								$(button).css("unset", "all");
								console.debug('emptying 1: '+s,attr('class'));
							}
						});
					}

					if (effect === "premium13") {
						if ($(button).find(".button__horizontal").length === 0) {
							$(button).append(
								'<div class="button__horizontal"></div><div class="button__vertical"></div>'
							);
						}
					}

					if (effect === "special02") {
						if ($(button).find(".blob-btn__inner").length === 0) {
							$(button).append(
								'<span class="inner-background"></span><span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>'
							);
						}
					}

					if (effect === "special03") {
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						$(button).css({
							"--font-size": fontSize,
						});
						$(button).attr("style", "font-size:" + fontSize + "!important");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).attr("data-after", txt);
						$(button).attr("data-before", txt);
					}

					if (effect === "special05") {
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						$(button).css({
							"--font-size": fontSize,
						});
						$(button).attr("style", "font-size:" + fontSize + "!important");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}

						$(button).attr("data-after-before", txt);
						$(button).attr("data-before", txt);
					}

					if (effect === "special06") {
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).html('<span id="btn-text">' + txt + "</span>");
						// var myspan = $(button).find("span");
						// if (myspan.length === 0) {
						// 	$(button).wrapInner("<span></span>");
						// }
						$(button).append('<div class="liquid"></div>');

						// 	$(button).wrapInner('<span></span>');
						// 	$(button).append('<div class="liquid"></div>');
					}

					if (effect === "special07") {
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						$(button).css({
							"--font-size": fontSize,
						});
						$(button).attr("style", "font-size:" + fontSize + "!important");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).html('<span id="btn-text">' + txt + "</span>");
						$(button).attr("data-button-text", txt);
					}

					if (
						effect === "special08" ||
						effect === "special09" ||
						effect === "special10" ||
						effect === "special11" ||
						effect === "special12" ||
						effect === "special13"
					) {
						var mySvgContainer = $(button).find("*").has("svg");
						var mySvg = $(button).find("svg");
						var mySvgPath = mySvg.find("path");
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).find("*").remove();
						var cache = $(button).children();
						$(button).text(txt).append(cache);
						$(button).attr("style", "font-size:" + fontSize + "!important");
						$(button).append(mySvgContainer);
						$(mySvgContainer).append(mySvg);
						$(mySvg).append(mySvgPath);
					}

					$(button).show();
				});
			}, 3500);

			setTimeout(() => {
				var specialButtons = $(
					"ul.wc-block-grid__products .wc-block-grid__product-add-to-cart.wp-block-button .wp-block-button__link"
				);
				specialButtons.each(function (index, button) {
					if (!$(button).parent().hasClass("refbutton")) {
						$(button).wrap(
							'<div class="refbutton premium ' +
								effect +
								" " +
								colorMode +
								'"></div>'
						);
						$(button).addClass("refbutton-instance");
					}

					var containerWidth = parseFloat($(button).width());
					$(button)
						.parent(".refbutton.premium." + effect)
						.css({
							"--container-width": parseFloat($(button).width()),
							"--container-height": parseFloat($(button).height()),
						});
					var _width, _width_val;
					var btntxt = $($(button).contents()[0]).text();
					_width = $(button).css("width");
					_width_val = $(button).width();
					var _paddingLeft = $(button).css("padding-left");
					var _paddingRight = $(button).css("padding-right");
					var newMinWidth =
						parseFloat(_width) +
						parseFloat(_paddingLeft) +
						parseFloat(_paddingRight);
					var totalWidth =
						parseFloat(containerWidth) +
						parseFloat(_paddingLeft) +
						parseFloat(_paddingRight);
					if (isOdd(totalWidth) === 1) {
						++totalWidth;
					}

					if (newMinWidth > totalWidth) {
						newMinWidth = totalWidth;
					}
					$(button)
						.parent()
						.css({
							"--button-actual-width": totalWidth + "px",
							"--button-actual-width-val": totalWidth,
						});
					$(button)
						.parent()
						.attr("style", function (i, s) {
							return (s || "") + "min-width: " + newMinWidth + "px !important;";
						});

					if ("autocolor" === colorMode) {
						alternateColor = setForegroundColor(_defaultColor);
					} else {
						alternateColor = bgColor;
					}
					var rgba1 = hexToRgbA(alternateColor, 1, "");
					var rgba2 = hexToRgbA(alternateColor, 0.5, "");
					var actualWidth = $(button).width() + 28;
					var actualHeight = $(button).height() + 20;
					$(":root").css({
						"--rgba1-color": rgba1,
						"--rgba2-color": rgba2,
						"--actual-width": actualWidth,
						"--actual-height": actualHeight,
					});
					var myspan = $(button).find("span");
					if (myspan.length > 0) {
						myspan.each(function (i, s) {
							var attr = $(s).attr("aria-hidden");
							if (typeof attr !== "undefined" && attr !== false) {
								$(s).remove();
								$(button).css("unset", "all");
								console.debug('emptying 2: '+s,attr('class'));
							}
						});
					}

					if (effect === "premium13") {
						if ($(button).find(".button__horizontal").length === 0) {
							$(button).append(
								'<div class="button__horizontal"></div><div class="button__vertical"></div>'
							);
						}
					}

					if (effect === "special02") {
						if ($(button).find(".blob-btn__inner").length === 0) {
							$(button).append(
								'<span class="inner-background"></span><span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>'
							);
						}
					}

					if (effect === "special03") {
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						$(button).css({
							"--font-size": fontSize,
						});
						$(button).attr("style", "font-size:" + fontSize + "!important");
						var txt = $(button).text();
						$(button).attr("data-after", txt);
						$(button).attr("data-before", txt);
					}

					if (effect === "special05") {
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						$(button).css({
							"--font-size": fontSize,
						});
						$(button).attr("style", "font-size:" + fontSize + "!important");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}

						$(button).attr("data-after-before", txt);
						$(button).attr("data-before", txt);
					}

					if (effect === "special06") {
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).html('<span id="btn-text">' + txt + "</span>");
						// var myspan = $(button).find("span");
						// if (myspan.length === 0) {
						// 	$(button).wrapInner("<span></span>");
						// }
						$(button).append('<div class="liquid"></div>');

						// 	$(button).wrapInner('<span></span>');
						// 	$(button).append('<div class="liquid"></div>');
					}

					if (effect === "special07") {
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						$(button).css({
							"--font-size": fontSize,
						});
						$(button).attr("style", "font-size:" + fontSize + "!important");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).html('<span id="btn-text">' + txt + "</span>");
						$(button).attr("data-button-text", txt);
					}

					if (
						effect === "special08" ||
						effect === "special09" ||
						effect === "special10" ||
						effect === "special11" ||
						effect === "special12" ||
						effect === "special13"
					) {
						var mySvgContainer = $(button).find("*").has("svg");
						var mySvg = $(button).find("svg");
						var mySvgPath = mySvg.find("path");
						var className = $(button)
							.find("*")
							.filter(function () {
								return $(this).text() !== "";
							})
							.attr("class");
						var fontSize = $(button)
							.find("." + className)
							.css("font-size");
						var txt = $(button).text();
						if ("" === txt) {
							txt = $($(button).contents()[0]).text();
						}
						$(button).find("*").remove();
						var cache = $(button).children();
						$(button).text(txt).append(cache);
						$(button).attr("style", "font-size:" + fontSize + "!important");
						$(button).append(mySvgContainer);
						$(mySvgContainer).append(mySvg);
						$(mySvg).append(mySvgPath);
					}

					$(button).show();
				});
			}, 6000);

			// $('a').css({
			// 	'background': bgStart,
			// 	'background-color': bgStartColor,
			// });
		}

		doButtons();

		$(document.body).on("updated_cart_totals", function () {
			var buttons = {};
			buttons = $(".return-to-shop .button")
				.add($(".return-to-shop a"))
				.add($(".woocommerce-cart-form button"))
				.add($(".woocommerce-mini-cart__buttons a.button"))
				.add($(".wc-proceed-to-checkout a"));
			buttons.each(function (index, button) {
				if ($(button).parent().hasClass("woocommerce-mini-cart__buttons")) {
					console.debug("woocommerce-mini-cart__buttons = " + $(button).text());
				}
				$(button).wrap('<div class="refbutton premium ' + effect + '"></div>');
				$(button).addClass("refbutton-instance");
				$(button)
					.parent(".refubutton.premium." + effect)
					.css({
						"--container-width": $(button).width(),
						"--container-height": $(button).height(),
					});

				var containerWidth = parseFloat($(button).width());
				console.log("forminator button width is " + containerWidth);
				$(button)
					.parent(".refbutton.premium." + effect)
					.css({
						"--container-width": parseFloat($(button).width()),
						"--container-height": parseFloat($(button).height()),
					});
				var _width, _width_val;
				var btntxt = $($(button).contents()[0]).text();
				_width = $(button).css("width");
				_width_val = $(button).width();
				var _paddingLeft = $(button).css("padding-left");
				var _paddingRight = $(button).css("padding-right");
				var newMinWidth =
					parseFloat(_width) +
					parseFloat(_paddingLeft) +
					parseFloat(_paddingRight);
				var totalWidth =
					parseFloat(containerWidth) +
					parseFloat(_paddingLeft) +
					parseFloat(_paddingRight);
				if (isOdd(totalWidth) === 1) {
					++totalWidth;
				}

				if (newMinWidth > totalWidth) {
					newMinWidth = totalWidth;
				}
				$(button)
					.parent()
					.css({
						"--button-actual-width": totalWidth + "px",
						"--button-actual-width-val": totalWidth,
					});
				$(button)
					.parent()
					.attr("style", function (i, s) {
						return (s || "") + "min-width: " + newMinWidth + "px !important;";
					});

				if ("autocolor" === colorMode) {
					alternateColor = setForegroundColor(_defaultColor);
				} else {
					alternateColor = bgColor;
				}
				var rgba1 = hexToRgbA(alternateColor, 1, "");
				var rgba2 = hexToRgbA(alternateColor, 0.5, "");
				var actualWidth = $(button).width() + 28;
				var actualHeight = $(button).height() + 20;
				$(":root").css({
					"--rgba1-color": rgba1,
					"--rgba2-color": rgba2,
					"--actual-width": actualWidth,
					"--actual-height": actualHeight,
				});
				var myspan = $(button).find("span");
				if (myspan.length > 0) {
					myspan.each(function (i, s) {
						var attr = $(s).attr("aria-hidden");
						if (typeof attr !== "undefined" && attr !== false) {
							$(s).remove();
							$(button).css("unset", "all");
						}
					});
				}

				if (
					effect === "special05" ||
					effect === "special10" ||
					effect === "special11" ||
					effect === "special12" ||
					effect === "special13"
				) {
					$(button)
						.parent()
						.attr("style", function (i, s) {
							return (s || "") + "width: " + totalWidth + "px !important;";
						});
				}

				$(button)
					.parent()
					.css({
						"--button-actual-width": totalWidth + "px",
						"--button-actual-width-val": totalWidth,
					});
				// #region effects
				if (effect === "premium13") {
					if ($(button).find(".button__horizontal").length === 0) {
						$(button).append(
							'<div class="button__horizontal"></div><div class="button__vertical"></div>'
						);
					}
				}
				if (
					effect === "free22" ||
					effect === "free23" ||
					effect === "free24" ||
					effect === "free25"
				) {
					if ("autocolor" !== colorMode) {
						$(button).css({
							"--bg-lines-color": _defaultColor,
						});
					} else {
						var bgc, newbgc;
						bgc = bgHColor;
						console.log("bgc is " + bgc);
						newbgc;
						if (bgc.indexOf("a") == -1) {
							newbgc = bgc.replace(")", ", 0.2)").replace("rgb", "rgba");
						} else {
							newbgc = bgc.replace(/[\d\.]+\)$/g, "0.2)");
						}
						$(button).css({
							"--bg-lines-color": newbgc,
						});
					}
				}
				if (effect === "special02") {
					if ($(button).find(".blob-btn__inner").length === 0) {
						$(button).append(
							'<span class="inner-background"></span><span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>'
						);
					}
				}
				if (effect === "special03") {
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					$(button).css({
						"--font-size": fontSize,
					});
					$(button).attr("style", "font-size:" + fontSize + "!important");
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}

					$(button).attr("data-after", txt);
					$(button).attr("data-before", txt);
				}
				if (effect === "special05") {
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					$(button).css({
						"--font-size": fontSize,
					});
					$(button).attr("style", "font-size:" + fontSize + "!important");
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}

					$(button).attr("data-after-before", txt);
					$(button).attr("data-before", txt);
					var mySvgContainer = $(button).find("*").has("svg");
					mySvgContainer.remove();
					$($(button).contents()[0]).css("color", "transparent");
				}
				if (effect === "special06") {
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}
					$(button).html('<span id="btn-text">' + txt + "</span>");
					// var myspan = $(button).find("span");
					// 	if (myspan.length === 0) {
					// 		$(button).wrapInner("<span></span>");
					// 	}
					$(button).append('<div class="liquid"></div>');
				}
				if (effect === "special07") {
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					$(button).css({
						"--font-size": fontSize,
					});
					$(button).attr("style", "font-size:" + fontSize + "!important");

					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}
					$(button).html('<span id="btn-text">' + txt + "</span>");
					$(button).attr("data-button-text", txt);
				}

				if (
					effect === "special08" ||
					effect === "special09" ||
					effect === "special10" ||
					effect === "special11" ||
					effect === "special12" ||
					effect === "special13"
				) {
					var mySvgContainer = $(button).find("*").has("svg");
					var mySvg = $(button).find("svg");
					var mySvgPath = mySvg.find("path");
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}
					$(button).find("*").remove();
					var cache = $(button).children();
					$(button).text(txt).append(cache);
					$(button).attr("style", "font-size:" + fontSize + "!important");
					$(button).append(mySvgContainer);
					$(mySvgContainer).append(mySvg);
					$(mySvg).append(mySvgPath);
				}
				// #endregion
			});
		});

		$(document.body).on("wc_cart_emptied", function () {
			var buttons = {};
			buttons = $(".return-to-shop .button")
				.add($(".return-to-shop a"))
				.add($(".woocommerce-cart-form button"))
				.add($(".woocommerce-mini-cart__buttons a.button"))
				.add($(".wc-proceed-to-checkout a"));
			buttons.each(function (index, button) {
				$(button).wrap('<div class="refbutton premium ' + effect + '"></div>');
				$(button).addClass("refbutton-instance");
				$(button)
					.parent(".refubutton.premium." + effect)
					.css({
						"--container-width": $(button).width(),
						"--container-height": $(button).height(),
					});

				var containerWidth = parseFloat($(button).width());
				console.log("forminator button width is " + containerWidth);
				$(button)
					.parent(".refbutton.premium." + effect)
					.css({
						"--container-width": parseFloat($(button).width()),
						"--container-height": parseFloat($(button).height()),
					});
				var _width, _width_val;
				var btntxt = $($(button).contents()[0]).text();
				_width = $(button).css("width");
				_width_val = $(button).width();
				var _paddingLeft = $(button).css("padding-left");
				var _paddingRight = $(button).css("padding-right");
				var newMinWidth =
					parseFloat(_width) +
					parseFloat(_paddingLeft) +
					parseFloat(_paddingRight);
				var totalWidth =
					parseFloat(containerWidth) +
					parseFloat(_paddingLeft) +
					parseFloat(_paddingRight);
				if (isOdd(totalWidth) === 1) {
					++totalWidth;
				}

				if (newMinWidth > totalWidth) {
					newMinWidth = totalWidth;
				}
				$(button)
					.parent()
					.css({
						"--button-actual-width": totalWidth + "px",
						"--button-actual-width-val": totalWidth,
					});
				$(button)
					.parent()
					.attr("style", function (i, s) {
						return (s || "") + "min-width: " + newMinWidth + "px !important;";
					});

				if ("autocolor" === colorMode) {
					alternateColor = setForegroundColor(_defaultColor);
				} else {
					alternateColor = bgColor;
				}
				var rgba1 = hexToRgbA(alternateColor, 1, "");
				var rgba2 = hexToRgbA(alternateColor, 0.5, "");
				var actualWidth = $(button).width() + 28;
				var actualHeight = $(button).height() + 20;
				$(":root").css({
					"--rgba1-color": rgba1,
					"--rgba2-color": rgba2,
					"--actual-width": actualWidth,
					"--actual-height": actualHeight,
				});
				var myspan = $(button).find("span");
				if (myspan.length > 0) {
					myspan.each(function (i, s) {
						var attr = $(s).attr("aria-hidden");
						if (typeof attr !== "undefined" && attr !== false) {
							$(s).remove();
							$(button).css("unset", "all");
						}
					});
				}
				// #region effects
				if (
					effect === "special05" ||
					effect === "special10" ||
					effect === "special11" ||
					effect === "special12" ||
					effect === "special13"
				) {
					$(button)
						.parent()
						.attr("style", function (i, s) {
							return (s || "") + "width: " + totalWidth + "px !important;";
						});
				}

				$(button)
					.parent()
					.css({
						"--button-actual-width": totalWidth + "px",
						"--button-actual-width-val": totalWidth,
					});

				if (effect === "premium13") {
					if ($(button).find(".button__horizontal").length === 0) {
						$(button).append(
							'<div class="button__horizontal"></div><div class="button__vertical"></div>'
						);
					}
				}
				if (
					effect === "free22" ||
					effect === "free23" ||
					effect === "free24" ||
					effect === "free25"
				) {
					if ("autocolor" !== colorMode) {
						$(button).css({
							"--bg-lines-color": _defaultColor,
						});
					} else {
						var bgc, newbgc;
						bgc = bgHColor;
						console.log("bgc is " + bgc);
						newbgc;
						if (bgc.indexOf("a") == -1) {
							newbgc = bgc.replace(")", ", 0.2)").replace("rgb", "rgba");
						} else {
							newbgc = bgc.replace(/[\d\.]+\)$/g, "0.2)");
						}
						$(button).css({
							"--bg-lines-color": newbgc,
						});
					}
				}
				if (effect === "special02") {
					if ($(button).find(".blob-btn__inner").length === 0) {
						$(button).append(
							'<span class="inner-background"></span><span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>'
						);
					}
				}
				if (effect === "special03") {
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					$(button).css({
						"--font-size": fontSize,
					});
					$(button).attr("style", "font-size:" + fontSize + "!important");
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}

					$(button).attr("data-after", txt);
					$(button).attr("data-before", txt);
				}
				if (effect === "special05") {
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					$(button).css({
						"--font-size": fontSize,
					});
					$(button).attr("style", "font-size:" + fontSize + "!important");
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}

					$(button).attr("data-after-before", txt);
					$(button).attr("data-before", txt);
					var mySvgContainer = $(button).find("*").has("svg");
					mySvgContainer.remove();
					$($(button).contents()[0]).css("color", "transparent");
				}
				if (effect === "special06") {
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}
					$(button).html('<span id="btn-text">' + txt + "</span>");
					// var myspan = $(button).find("span");
					// if (myspan.length === 0) {
					// 	$(button).wrapInner("<span></span>");
					// }
					$(button).append('<div class="liquid"></div>');
				}
				if (effect === "special07") {
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					$(button).css({
						"--font-size": fontSize,
					});
					$(button).attr("style", "font-size:" + fontSize + "!important");

					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}
					$(button).html('<span id="btn-text">' + txt + "</span>");
					$(button).attr("data-button-text", txt);
				}

				if (
					effect === "special08" ||
					effect === "special09" ||
					effect === "special10" ||
					effect === "special11" ||
					effect === "special12" ||
					effect === "special13"
				) {
					var mySvgContainer = $(button).find("*").has("svg");
					var mySvg = $(button).find("svg");
					var mySvgPath = mySvg.find("path");
					var className = $(button)
						.find("*")
						.filter(function () {
							return $(this).text() !== "";
						})
						.attr("class");
					var fontSize = $(button)
						.find("." + className)
						.css("font-size");
					var txt = $(button).text();
					if ("" === txt) {
						txt = $($(button).contents()[0]).text();
					}
					$(button).find("*").remove();
					var cache = $(button).children();
					$(button).text(txt).append(cache);
					$(button).attr("style", "font-size:" + fontSize + "!important");
					$(button).append(mySvgContainer);
					$(mySvgContainer).append(mySvg);
					$(mySvg).append(mySvgPath);
				}
				//#endregion
			});
		});

		$("form.login").on("show", function () {
			refbuttons.each(function (index, button) {
				if (!$(button).parents().is(excludedClasses)) {
					var _width, _width_val;
					var btntxt = $($(button).contents()[0]).text();
					_width = $(button).css("width");
					_width_val = $(button).width();
					var _paddingLeft = $(button).css("padding-left");
					var _paddingRight = $(button).css("padding-right");
					var newMinWidth =
						parseInt(_width) + parseInt(_paddingLeft) + parseInt(_paddingRight);
					var totalWidth =
						parseInt(containerWidth) +
						parseInt(_paddingLeft) +
						parseInt(_paddingRight);
					if (isOdd(totalWidth) === 1) {
						++totalWidth;
					}

					if (newMinWidth > totalWidth) {
						newMinWidth = totalWidth;
					}

					$(button)
						.parent()
						.attr("style", function (i, s) {
							return (s || "") + "min-width: " + newMinWidth + " !important;";
						});
				}
			});
		});

		$(document).on("click", ".cmplz-view-preferences", function (e) {
			e.preventDefault();
			$(this).parent(".refbutton").hide();
			$(".cmplz-save-preferences")
				.addClass("refbutton-instance")
				.wrap('<div class="refbutton free ' + effect + '"></div>');
		});
	}); //document ready
})(jQuery);
