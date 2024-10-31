(function ($) {
	"use strict";

	$(document).ready(function () {

		// #region COLOR FUNCTIONS
		if ($(".color-picker").length > 0) {
			$(".color-picker").wpColorPicker({
				/**
				 * @param {Event} event - standard jQuery event, produced by whichever
				 * control was changed.
				 * @param {Object} ui - standard jQuery UI object, with a color member
				 * containing a Color.js object.
				 */
				change: function (event, ui) {
					var element = event.target;
					var color = ui.color.toString();
					setTimeout(function () {
						setColors();
					}, 500);
				},

				/**
				 * @param {Event} event - standard jQuery event, produced by "Clear"
				 * button.
				 */
				clear: function (event) {
					var element = jQuery(event.target).siblings(".wp-color-picker")[0];
					var color = "";

					if (element) {
						// Add your code here
					}
				},
			});
		}

		function RGBAToHexA(color, forceAlphaChannel, excludeAlphaChannel) {

			if (color.indexOf('#') >= 0) {
				color = hexToRgba(color, 0, 'RGBAToHexA');
			}

			if (color.substring(0, 4) === 'rgba') {

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
				if (excludeAlphaChannel) {
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
				if (forceAlphaChannel) {
					if (a.length == 1) a = "0" + a;
					return "#" + r + g + b + a;
				}
				return "#" + r + g + b;
			}
		}

		function hexToRgba(hex, opacity, caller) {
			if (hex.indexOf('#') <= -1) {
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
					"rgba(" +
					[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
					")"
				);
			}
			throw new Error("Bad Hex: " + hex + " caller: " + caller);
		}

		function computeOppositeColor(color) {
			let channels = color.match(/\d+/g),
				inverted_channels = channels.map(function (ch) {
					return 255 - ch;
				}),
				inverted = 'rgb(' + inverted_channels.join(', ') + ')';
			return inverted;
		}

		function setForegroundColor(input, caller) {
			let notation;
			if (input.indexOf('rgba(') != -1) {
				notation = 'rgba(';
			} else {
				notation = 'rgb('
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

		// #endregion

		var shadowInset = $("#inset-toggler").is(":checked") ? true : false;
		var shctrls = $('.shadows-controls');
		var bglinesctrls = $('.bg-lines-controls');

		function restoreDefault() {
			shctrls.hide();
			bglinesctrls.hide();
		}

		function setControls() {

			restoreDefault();
			var effect = $("input[type=radio].effect:checked").val();
			if (effect !== "nofx") {

				$(".mynotice").text("").css({ opacity: 0, visibility: "hidden" });

				$("#preview-container #preview-box .wp-block-buttons").attr(
					"class",
					"wp-block-buttons"
				);

				$("#preview-container #preview-box .wp-block-buttons").addClass(
					"refbutton " + effect
				);

				$("#preview-container #preview-box .wp-block-button__link span")
					.contents()
					.unwrap();

				if (effect === "free06" || effect === "free09") {
					shctrls.show();
				}

				if (
					effect === "free5"
					|| effect === "free06"
					|| effect === "free08"
					|| effect === "free09"
				) {
					$('#border-width').attr('min', "1");
					$(".mynotice").text("This effect requires that border width be set at least to 1.").css({ opacity: 1, visibility: "visible" });
				}

				if (
					effect === "free22" ||
					effect === "free23" ||
					effect === "free24" ||
					effect === "free25"
				) {
					bglinesctrls.show();
					var bgc = $("#main-color").val();
					var newbgc;
					if (bgc.indexOf("a") == -1) {
						newbgc = bgc.replace(")", ", 0.2)").replace("rgb", "rgba");
					} else {
						newbgc = bgc.replace(/[\d\.]+\)$/g, "0.2)");
					}
					$("." + effect + " .wp-block-button__link").css({
						"--bg-lines-color": newbgc,
					});
				}

			} else {
				$("#preview-container #preview-box .wp-block-buttons").attr("class", "wp-block-buttons");
			}
		}

		var shadowInset = $("#inset-toggler").is(":checked") ? true : false;
		var std_txt = $(".popup-wrapper .preview-container .preview-box .wp-block-button__link").text();
		std_txt = $.trim(std_txt);
		var std_html = $(".popup-wrapper .preview-container .preview-box .wp-block-button__link").html();

		function setColors() {
			var effect = $("input[type=radio].effect:checked").val();
			var df = $("input#main-color").val();
			if (df) {
				var defaultColorA = RGBAToHexA(df, true);
				var defaultColor = $("input#main-color").val();
				var customColor = computeOppositeColor($("input#main-color").val());
				var contrastedTextColor = setForegroundColor(defaultColor);
				$(".refbutton .wp-block-button__link").css({
					"--custom-color": customColor,
					"--contrasted-text-color": contrastedTextColor,
					"--default-color": defaultColor,
					"--default-color-a": defaultColorA,
				});
				$("#contrasted-text-color").val(contrastedTextColor);
				$("#default-color-a").val(defaultColorA);
			}

			var previewBackgroundColor = $("input#preview-background-color").val();
			$("body").css({
				"--preview-background-color": previewBackgroundColor,
			});
		}

		function setTransition() {
			$(".wp-block-button__link").css({
				"--transition": $("input#transition").val() + "s",
				"--transition-half": $("input#transition").val() / 2 + "s",
			});
		}

		function setButtonProps() {
			$(".refbutton .wp-block-button__link").css({
				"--button-width": $("input#button-width").val() + "px",
				"--button-height": $("input#button-height").val() + "px",
				"--button-height-val": $("input#button-height").val(),
				"--border-width": $("input#border-width").val(),
				"--border-radius": $("input#border-radius").val() + "px",
				"--shadow-inset": shadowInset ? 'inset' : '',
				"--bg-lines-width": $("input#bg-lines-width").val() + 'px',
			});
		}

		function changeButton() {
			setControls();
			setColors();
			setTransition();
			setButtonProps();
		}


		$('#autocolor-toggler').on('click', function () {
			setControls();
		});

		$("input[type=radio].effect").on("click", function () {
			if (!$(this).parent().hasClass('premium')) {
				$("#preview-container #preview-box .wp-block-button__link").css("opacity", 0);
				var effect = $(this).val();
				changeButton(effect);
				setTimeout(function () {
					$("#preview-container #preview-box .wp-block-button__link").css("opacity", 1);
				}, 1000);
			}
		});

		$('#inset-toggler').on('click', function () {
			shadowInset = !shadowInset;
			changeButton();
		});

		$('.decrease').on('click', function (e) {
			e.preventDefault();
			let decValue = parseFloat('0.1').toFixed(1);
			let currentValue, newValue;
			currentValue = parseFloat($(this).parents('.range-slider_value').siblings('.range-slider_range').val()).toFixed(1);
			newValue = (parseFloat(currentValue) - parseFloat(decValue)).toFixed(1);
			if ($(this).parents('.range-slider_value').siblings('input').attr('id') == 'transition') {
				$(this).parents('.range-slider_value').siblings('.range-slider_range').val(newValue);
			} else {
				$(this).parents('.range-slider_value').siblings('.range-slider_range').val(parseInt($(this).parents('.range-slider_value').siblings('.range-slider_range').val()) - 1);
			}
			$(this).parents('.range-slider_value').siblings('.range-slider_range').trigger('change');
		});

		$('.increase').on('click', function (e) {
			e.preventDefault();
			let incValue = parseFloat('0.1').toFixed(1);
			let currentValue, newValue;
			currentValue = parseFloat($(this).parents('.range-slider_value').siblings('.range-slider_range').val()).toFixed(1);
			newValue = (parseFloat(currentValue) + parseFloat(incValue)).toFixed(1);
			if ($(this).parents('.range-slider_value').siblings('input').attr('id') == 'transition') {
				$(this).parents('.range-slider_value').siblings('.range-slider_range').val(newValue);
			} else {
				$(this).parents('.range-slider_value').siblings('.range-slider_range').val(parseInt($(this).parents('.range-slider_value').siblings('.range-slider_range').val()) + 1);
			}
			$(this).parents('.range-slider_value').siblings('.range-slider_range').trigger('change');
		});

		$('#button-width').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--button-width": $(this).val() + "px",
			});
		});

		$('#bg-lines-width').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--bg-lines-width": $(this).val() + "px",
			});
		});

		$('#button-height').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--button-height": $(this).val() + "px",
			});
		});

		$('#border-width').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--border-width": $(this).val() + "px",
			});
		});

		$('#border-radius').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--border-radius": $(this).val() + "px",
			});
		});

		$('#transition').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--transition": $(this).val() + "px",
			});
		});

		$('#box-shadow-spread-hover').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--box-shadow-spread-hover": $(this).val() + "px",
			});
		});

		$('#box-shadow-blur-hover').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--box-shadow-blur-hover": $(this).val() + "px",
			});
		});

		$('#text-shadow-blur-hover').on('input change', function () {
			$(this).siblings('.range-slider_value').find('.range-value').text($(this).val());
			$(".wp-block-button__link").css({
				"--text-shadow-blur-hover": $(this).val() + "px",
			});
		});

		$("#transition").on("change", function () {
			$(".wp-block-button__link").css({
				"--transition": $(this).val() + "s",
				"--transition-half": $(this).val() / 2 + "s",
			});
		});

		$("#button-width").on("change", function () {
			$(".wp-block-button__link").css({
				"--button-width": $(this).val() + "px",
			});
		});

		$("#button-height").on("change", function () {
			$(".wp-block-button__link").css({
				"--button-height": $(this).val() + "px",
				"--button-height-val": $(this).val(),
			});
		});

		$("#border-width").on("change", function () {
			$(".wp-block-button__link").css({
				"--border-width": $(this).val(),
			});
		});

		$("#border-radius").on("change", function () {
			$(".wp-block-button__link").css({
				"--border-radius": $(this).val() + "px",
			});
		});

		$("#bg-lines-width").on("change", function () {
			$(".wp-block-button__link").css({
				"--bg-lines-width": $(this).val() + "px",
			});
		});

		$("input[type=radio].effect:checked").trigger("click");

		$('.range-slider_range').trigger('change');

		$("#active-rules-toggler").on('change', function () {
			if (!$(this).is(':checked')) {
				$("#active-shortcodes-toggler").prop('checked', true);
				$('.radio-sub-option').addClass('blurred');
			} else {
				$("#active-shortcodes-toggler").prop('checked', false);
				$('.radio-sub-option').removeClass('blurred');
			}
		})

		$("#active-rules-toggler").trigger('change');

		changeButton();

		// $('.nav-tab.premium').on('mousedown', function (e) {
		// 	e.preventDefault();
		// 	$(this).attr('data-target', '');
		// 	$('#coming-soon').fadeIn();
		// });

		// $('#coming-soon .popup-footer .btn.close-button').on('click', function (e) {
		// 	e.preventDefault();
		// 	$('#coming-soon').fadeOut();
		// });

		// $('.radio-wrapper.premium').on('click', function (e) {
		// 	e.preventDefault();
		// 	var pop_effect = $(this).find('input.effect').val();
		// 	$("#preview-container #preview-box .wp-block-buttons").addClass("refbutton " + pop_effect);
		// 	changePopupButton(pop_effect);
		// 	$('#demo-popup').fadeIn();
		// });

		// $('#demo-popup .popup-footer .btn.close-button').on('click', function (e) {
		// 	e.preventDefault();
		// 	$('#demo-popup').fadeOut();
		// });

		$("nav.nav-tab-wrapper-effect a.nav-tab").on("click", function (e) {
			e.preventDefault();
		});

		$("nav.nav-tab-wrapper-effect a.nav-tab.premium").on("click", function (e) {
			e.preventDefault();
			$('#upgrade-popup').fadeIn();
		});

		$('.radio-option input[type="radio"]').on('click', function () {
			$('#only-to-class').hide();
			if ($(this).val() === 'only_to') {
				$('#only-to-class').show();
			}
		});

		$('#only-to-class').hide();
		if ($('.radio-option input[type="radio"]#only_to').is('checked')) {
			$('#only-to-class').show();
		}

		$("#refbutton-settings-form").submit(saveOptions);

		$("#refbutton-settings-form-effects").submit(saveOptions);

		function saveOptions() {
			$("#saving-overlay").addClass("overlay-visible");

			$(this).ajaxSubmit({
				success: function () {
					$("#saving-overlay").removeClass("overlay-visible");
					$(".confirmMessage").slideDown("slow");
					setInterval(() => {
						$(".confirmMessage").slideUp("slow");
					}, 4000);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert('Something went wrong. Please retry.');
					$("#saving-overlay").removeClass("overlay-visible"); console.log(xhr.status);
				}
			});

			return false;
		}

		$('.effect-tab.premium.license-inactive').on('click', function (e) {
			e.preventDefault();
			$('#upgrade-popup').fadeIn();
		})

		$('#upgrade-popup .btn.close-button').on('click', function (e) {
			e.preventDefault();
			$('#upgrade-popup').fadeOut();
		});

		//end of code

	}); //end Ready
})(jQuery);
