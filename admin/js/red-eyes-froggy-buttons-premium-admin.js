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
			console.log('hex color is '+hex+' caller is '+caller);
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

		var autocolor = '';
		if ($("#autocolor-toggler").length) {
			autocolor = $("#autocolor-toggler").is(":checked") ? true : false;
		} else {
			autocolor = true;
		}
		var shadowInset = $("#inset-toggler").is(":checked") ? true : false;
		var std_txt = $("#preview-container #preview-box .wp-block-button__link").text();
		std_txt = $.trim(std_txt);
		var std_html = $("#preview-container #preview-box .wp-block-button__link").html();

		function hideTableHeader() {
			$('.table.colors thead').hide();
		}

		function showTableHeader() {
			$('.table.colors thead').show();
		}

		function showNotice(message) {
			$(".mynotice").text(message).css({ opacity: 1, visibility: "visible" });
		}

		function hideNotice() {
			$(".mynotice").text("").css({ opacity: 0, visibility: "hidden" });
		}

		var txRow = $(".table-row#text-color-row");
		var bgRow = $(".table-row#bg-color-row");
		var bg2Row = $(".table-row#bg2-color-row");
		var brRow = $(".table-row#br-color-row");
		var shRow = $(".table-row#sh-color-row");
		var tx = $(".table-column#text-color .wp-picker-container");
		var txh = $(".table-column#text-h-color .wp-picker-container");
		var bg = $(".table-column#bg-color .wp-picker-container");
		var bgh = $(".table-column#bg-h-color .wp-picker-container");
		var bg2 = $(".table-column#bg2-color .wp-picker-container");
		var bg2h = $(".table-column#bg2-h-color .wp-picker-container");
		var br = $(".table-column#br-color .wp-picker-container");
		var brh = $(".table-column#br-h-color .wp-picker-container");
		// var shh = $(".table-column#sh-h-color .wp-picker-container");
		var shctrls = $('.shadows-controls');
		var bglinesctrls = $('.bg-lines-controls');

		function restoreDefault() {
			showTableHeader();
			txRow.show();
			bgRow.show();
			bg2Row.show();
			brRow.show();
			txRow.removeClass('disabled');
			bgRow.removeClass('disabled');
			bg2Row.removeClass('disabled');
			brRow.removeClass('disabled');
			shRow.removeClass('disabled');
			tx.removeClass('disabled');
			txh.removeClass('disabled');
			bg.removeClass('disabled');
			bgh.removeClass('disabled');
			bg2.removeClass('disabled');
			bg2h.removeClass('disabled');
			br.removeClass('disabled');
			brh.removeClass('disabled');
			shctrls.hide();
			bglinesctrls.hide();
			$('.bg-prop-col').text('Background');
			$("#button-width").attr("max", 400);
			$("#border-width").attr("min", 0);
			$('#autocolor-switcher').show();
		}

		function setControls() {
			restoreDefault();
			var effect = $("input[type=radio].effect:checked").val();
			var txt = $(".wp-block-button__link").text();

			if (effect !== "nofx") {

				// $(".mynotice").text("").css({ opacity: 0, visibility: "hidden" });
				hideNotice();

				$("#preview-container #preview-box .wp-block-buttons").attr(
					"class",
					"wp-block-buttons"
				);

				$("#preview-container #preview-box .wp-block-buttons").addClass(
					"refbutton " + effect
				);

				$('.table.colors').hide();

				if (autocolor) {
					if ($("#preview-container #preview-box .wp-block-buttons").hasClass("premium")) {
						$("#preview-container #preview-box .wp-block-buttons").removeClass("premium");
					}
					$('#premium-colors-table').hide();
					$('#two-colors-table').hide();
					$('#auto-colors-table').show();
				} else {
					if (!$("#preview-container #preview-box .wp-block-buttons").hasClass("premium")) {
						$("#preview-container #preview-box .wp-block-buttons").addClass("premium");
					}
					$('#auto-colors-table').hide();
					$('#premium-colors-table').show();
				}

				$("#preview-container #preview-box .wp-block-button__link span")
					.contents()
					.unwrap();
				// #region arrays
				var border = [
					"free01",
					"free02",
					"free03",
					"free04",
					"free05",
					"free06",
					"free07",
					"free08",
					"free09",
					"premium09",
					"premium10",
					"premium11",
					"premium12",
					"premium13",
				];
				var borderAndBackground = [
					"premium01",
					"premium02",
					"premium03",
					"premium04",
					"premium05",
					"premium06",
					"premium07",
					"premium08",
					"free09",
				];
				var background = [
					"free10",
					"free11",
					"free12",
					"free13",
					"free14",
					"free15",
					"free16",
					"free17",
					"free18",
					"free19",
					"free20",
					"free21",
					"free22",
					"free23",
					"free24",
					"free25",
				];
				// #endregion
				bg2Row.hide();
				if (border.includes(effect)) {
					bgRow.addClass('disabled');
					brRow.removeClass('disabled');
				}
				if (effect === "free06" || effect === 'free09' || effect === ' special04') {
					shctrls.show();
				}

				if (
					effect === "free05"
					|| effect === "free06"
					|| effect === "free08"
					|| effect === "free09"
					|| effect === "premium09"
					|| effect === "premium10"
					|| effect === "premium11"
					|| effect === "premium12"
					|| effect === "premium13"
				) {
					$('#border-width').attr('min', "1");
					// $(".mynotice").text("This effect requires that border width be set at least to 1.").css({ opacity: 1, visibility: "visible" });
					showNotice('This effect requires that border width be set at least to 1.');
				}
				if (borderAndBackground.includes(effect)) {
					bgRow.removeClass('disabled');
					brRow.removeClass('disabled');
					if (
						effect === "premium01" ||
						effect === "premium02" ||
						effect === "premium03" ||
						effect === "premium04" ||
						effect === "premium05"
					) {
						bg.addClass('disabled');
						br.addClass('disabled');
					} else if (effect === "premium06") {
						bg.addClass('disabled');
						br.removeClass('disabled');
					} else if (effect === "premium07" || effect === "premium08") {
						bg.removeClass('disabled');
						bgh.addClass('disabled');
						br.removeClass('disabled');
						brRow.hide();
					} else if (effect === "fee09") {
						bg.removeClass('disabled');
						bgh.removeClass('disabled');
						br.removeClass('disabled');
						brh.removeClass('disabled');
					}
				}
				if (background.includes(effect)) {
					bgRow.removeClass('disabled');
					brRow.removeClass('disabled');
					bg.addClass('disabled');
					bgh.removeClass('disabled');
					br.removeClass('disabled');
					brh.removeClass('disabled');
				}

				if (effect === "premium13") {
					if (!$(".button__horizontal").is('visible')) {
						$('.button__horizontal').addClass('indom');
						$('.button__vertical').addClass('indom');
					}
				} else {
					$('.button__horizontal').removeClass('indom');
					$('.button__vertical').removeClass('indom');
				}
				if (
					effect === "free22" ||
					effect === "free23" ||
					effect === "free24" ||
					effect === "free25"
				) {
					bglinesctrls.show();
					var bgc = $("#cfx-bg-h-color").val();
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

				if (effect === "special01" || effect === "special03" || effect === "special05" || effect === "special07") {
					// $(".mynotice").text("Unfortunately, this effect doesn't currently supports any type of icon.").css({ opacity: 1, visibility: "visible" });
					showNotice('Unfortunately, this effect doesn\'t currently supports any type of icon.');
				}
				
				if (effect === "special01") {
					bg2Row.show();
				}

				if (effect === "special02") {
					if (!$(".blob-btn__inner").hasClass('indom')) {
						$("#preview-container #preview-box .wp-block-button__link .blob-btn__inner").addClass('indom');
						$("#preview-container #preview-box .wp-block-button__link .blob-btn__blobs").addClass('indom');
						$("#preview-container #preview-box .wp-block-button__link .blob-btn__blob").addClass('indom');
					}
					$("." + effect + " .wp-block-button__link").attr("data-after", std_txt);
				} else {
					$("#preview-container #preview-box .wp-block-button__link .blob-btn__blob").removeClass('indom');
					$("#preview-container #preview-box .wp-block-button__link .blob-btn__blobs").removeClass('indom');
					$("#preview-container #preview-box .wp-block-button__link .blob-btn__inner").removeClass('indom');
					$("." + effect + " .wp-block-button__link").removeAttr("data-after");
				}

				if (effect === "special03") {
					// $(".mynotice").text(
					// 	"Unfortunately, this effect doesn't currently supports any type of icon.").css({ opacity: 1, visibility: "visible" });
					$("." + effect + " .wp-block-button__link").attr("data-after", std_txt);
					$("." + effect + " .wp-block-button__link").attr("data-before", std_txt);
				} else {
					$("." + effect + " .wp-block-button__link").removeAttr("data-after");
					$("." + effect + " .wp-block-button__link").removeAttr("data-before");
				}
				if (effect === "special04") {
					$('#blur-radius').addClass('indom');
					// $(".mynotice").text("Light glow on a dark background is recommended to make this effect to shine.").css({ opacity: 1, visibility: "visible" });
					showNotice('Light glow on a dark background is recommended to make this effect to shine.');
				} else {
					$('#blur-radius').removeClass('indom');
				}

				if (effect === "special05") {
					// $(".mynotice").text("Unfortunately, this effect doesn't currently supports any type of icon.").css({ opacity: 1, visibility: "visible" });
				}

				if (effect === "special05") {
					$("." + effect + " .wp-block-button__link").attr("data-after-before", std_txt);
				} else {
					$("." + effect + " .wp-block-button__link").removeAttr("data-after-before");
				}

				if (effect === "special06") {
					$("#preview-container #preview-box .refbutton.special06 .wp-block-button__link").html('');
					$("#preview-container #preview-box .refbutton.special06 .wp-block-button__link").html('<span id="btn-text">' + std_txt + '</span>' + std_html);
					$("#preview-container #preview-box .refbutton.special06 .wp-block-button__link").contents().filter(function () {
						return (this.nodeType == 3);
					}).remove();
					$("#preview-container #preview-box .refbutton.special06 .wp-block-button__link .liquid").addClass('indom');
					if (autocolor) {
						var defaultColor = $("input#main-color").val();
						var alternateColor = setForegroundColor(defaultColor);
						var rgba1 = hexToRgba(alternateColor, 1, "old 1");
						var rgba2 = hexToRgba(alternateColor, 0.5, "old 2");
						$(".refbutton.special06 .wp-block-button__link").css({
							"--rgba1-color": rgba1,
							"--rgba2-color": rgba2,
						});
					} else {
						// var defaultColor = $("input#cfx-bg-h-color").val();
						var alternateColor = $("input#cfx-bg-h-color").val();
						var rgba1 = hexToRgba(alternateColor, 1, "old 3");
						var rgba2 = hexToRgba(alternateColor, 0.5, "old 4");
						$(".refbutton.special06 .wp-block-button__link").css({
							"--rgba1-color": rgba1,
							"--rgba2-color": rgba2,
						});
					}

				}

				if (effect === "special07") {
					// $(".mynotice").text("Unfortunately, this effect doesn't currently supports any type of icon.").css({ opacity: 1, visibility: "visible" });
					$("." + effect + " .wp-block-button__link").attr("data-button-text", std_txt);
					$("#preview-container #preview-box .refbutton.special07 .wp-block-button__link").html('');
					$("#preview-container #preview-box .refbutton.special07 .wp-block-button__link").html('<span id="btn-text">' + std_txt + '</span>' + std_html);
					$("#preview-container #preview-box .refbutton.special07 .wp-block-button__link").contents().filter(function () {
						return (this.nodeType == 3);
					}).remove();
				} else {
					$("." + effect + " .wp-block-button__link").removeAttr(
						"data-button-text"
					);
				}

				if (effect === "special08" || effect === "special09") {
					$('#premium-colors-table').hide();
					$('#auto-colors-table').hide();
					$('#two-colors-table').show();
					$('#autocolor-switcher').hide();
				}

				if (effect === "special10") {
					$('#premium-colors-table').hide();
					if (!autocolor) {
						$('#premium-colors-table').show();
					}
				}

				if (effect === "special12" || effect === "special13") {
					brRow.hide();
				}

				$(
					"#preview-container #preview-box " +
					effect +
					" .wp-block-button__link span"
				)
					.contents()
					.unwrap();
			} else {
				$("#preview-container #preview-box .wp-block-buttons").attr(
					"class",
					"wp-block-buttons"
				);
			}
		}

		function setColors() {
			var effect = $("input[type=radio].effect:checked").val();

			var colorNormal = $('#cfx-color-normal').val();
			if (colorNormal) {
				var colorNormalA = RGBAToHexA(colorNormal, true);
				var colorHover = $('#cfx-color-hover').val();
				$(".refbutton.special08 .wp-block-button__link").css({
					"--color-normal": colorNormal,
					"--color-normal-a": colorNormalA,
					"--color-hover": colorHover,
				});
				$(".refbutton.special09 .wp-block-button__link").css({
					"--color-normal": colorNormal,
					"--color-normal-a": colorNormalA,
					"--color-hover": colorHover,
				});
				$('#cfx-color-normal-a').val(colorNormalA);
			}

			if (autocolor) {
				var df = $("input#main-color").val();
				if (df) {
					var defaultColorA = RGBAToHexA(df, true);
					var defaultColor = $("input#main-color").val();
					var randomColor = Math.floor(Math.random() * 16777215).toString(16);
					var contrastedTextColor = setForegroundColor(defaultColor);
					var alternateColor = setForegroundColor(defaultColor);
					var rgba1 = hexToRgba(alternateColor, 1, "old 1");
					var rgba2 = hexToRgba(alternateColor, 0.5, "old 2");
					$(".refbutton, .refbutton a").css({
						"--custom-color": '#' + randomColor,
						"--contrasted-text-color": contrastedTextColor,
						"--default-color": defaultColor,
						"--default-color-a": defaultColorA,
						"--rgba1-color": rgba1,
						"--rgba2-color": rgba2,
						// "background": contrastedTextColor,
					});
					$("#contrasted-text-color").val(contrastedTextColor);
					$("#main-color-a").val(defaultColorA);
				}
			} else {

				var tc = $("input#cfx-text-color").val();
				if (tc) {
					var textColorA = RGBAToHexA(tc, true);
					var textColor = $("input#cfx-text-color").val();
					var contrastedTextColor = setForegroundColor(textColor);
					$(".refbutton").css({
						"--contrasted-text-color": contrastedTextColor,
						"--text-color": textColor,
						"--text-color-a": textColorA,
					});
					$("#contrasted-text-color").val(contrastedTextColor)
					$("#cfx-text-color").val(textColor);
					$("#cfx-text-color-a").val(textColorA);
					var alternateColor = $("input#cfx-bg-h-color").val();
					var rgba1 = hexToRgba(alternateColor, 1, "old 1");
					var rgba2 = hexToRgba(alternateColor, 0.5, "old 2");
					$(".refbutton.special06 .wp-block-button__link").css({
						"--rgba1-color": rgba1,
						"--rgba2-color": rgba2,
					});

				}

				var thc = $("input#cfx-text-h-color").val();

				if (thc) {
					var textHColorA = RGBAToHexA(thc, true);
					var textHColor = $("input#cfx-text-h-color").val();
					$(".refbutton").css({
						"--text-h-color": textHColor,
						"--text-h-color-a": textHColorA,
					});
					$("#cfx-text-h-color").val(textHColor);
					$("#cfx-text-h-color-a").val(textHColorA);
				}

				var bgc = $("input#cfx-bg-color").val();
				if (bgc) {
					var bgColorA = RGBAToHexA(bgc, true);
					var bgColor = $("input#cfx-bg-color").val();
					$(".refbutton").css({
						"--bg-color": bgColor,
						"--bg-color-a": bgColorA,
					});
					$("#cfx-bg-color").val(bgColor);
					$("#cfx-bg-color-a").val(bgColorA);
					var defaultColor = $("input#cfx-bg-color").val();
					var alternateColor = $("input#cfx-bg-h-color").val();
					var rgba1 = hexToRgba(alternateColor, 1, "old 1");
					var rgba2 = hexToRgba(alternateColor, 0.5, "old 2");
					$(".refbutton.special06 .wp-block-button__link").css({
						"--rgba1-color": rgba1,
						"--rgba2-color": rgba2,
					});
				}

				var bghc = $("input#cfx-bg-h-color").val();
				if (bghc) {
					var bgHColorA = RGBAToHexA(bghc, true);
					var bgHColor = $("input#cfx-bg-h-color").val();
					$(".refbutton").css({
						"--bg-h-color": bgHColor,
						"--bg-h-color-a": bgHColorA,
					});
					$("#cfx-bg-h-color").val(bgHColor);
					$("#cfx-bg-h-color-a").val(bgHColorA);
				}

				var bg2c = $("input#cfx-bg2-color").val();
				if (bg2c) {
					var bg2ColorA = RGBAToHexA(bg2c, true);
					var bg2Color = $("input#cfx-bg2-color").val();
					$(".refbutton").css({
						"--bg2-color": bg2Color,
						"--bg2-color-a": bg2ColorA,
					});
					$("#cfx-bg2-color").val(bg2Color);
					$("#cfx-bg2-color-a").val(bg2ColorA);
				}

				var bghc = $("input#cfx-bg2-h-color").val();
				if (bghc) {
					var bg2HColorA = RGBAToHexA(bghc, true);
					var bg2HColor = $("input#cfx-bg2-h-color").val();
					$(".refbutton").css({
						"--bg2-h-color": bg2HColor,
						"--bg2-h-color-a": bg2HColorA,
					});
					$("#cfx-bg2-h-color").val(bg2HColor);
					$("#cfx-bg2-h-color-a").val(bg2HColorA);
				}

				var brc = $("input#cfx-br-color").val();
				if (brc) {
					var brColorA = RGBAToHexA(brc, true);
					var brColor = $("input#cfx-br-color").val();
					$(".refbutton").css({
						"--br-color": brColor,
						"--br-color-a": brColorA,
					});
					$("#cfx-br-color").val(brColor);
					$("#cfx-br-color-a").val(brColorA);
				}

				var brhc = $("input#cfx-br-h-color").val();
				if (brhc) {
					var brHColorA = RGBAToHexA(brhc, true);
					var brHColor = $("input#cfx-br-h-color").val();
					$(".refbutton").css({
						"--br-h-color": brHColor,
						"--br-h-color-a": brHColorA,
					});
					$("#cfx-br-h-color").val(brHColor);
					$("#cfx-br-h-color-a").val(brHColorA);
				}

				var shhc = $("input#cfx-sh-hover-color").val();
				if (shhc) {
					var shHColorA = RGBAToHexA(shhc, true);
					var shHColor = $("input#cfx-sh-hover-color").val();
					$(".refbutton").css({
						"--sh-h-color": shHColor,
						"--sh-h-color-a": shHColorA,
					});
					$("#cfx-sh-h-color").val(shHColor);
					$("#cfx-sh-h-color-a").val(shHColorA);
				}

				var txtShhc = $("input#cfx-txt-sh-hover-color").val();
				if (txtShhc) {
					var txtShHColorA = RGBAToHexA(txtShhc, true);
					var txtShHColor = $("input#cfx-txt-sh-hover-color").val();
					$(".refbutton").css({
						"--txt-sh-h-color": txtShHColor,
						"--txt-sh-h-color-a": txtShHColorA,
					});
					$("#cfx-sh-h-color").val(txtShHColor);
					$("#cfx-sh-h-color-a").val(txtShHColorA);
				}
			}

			var previewBackgroundColor = $("input#preview-background-color").val();
			$("body").css({
				"--preview-background-color": previewBackgroundColor,
			});
		}

		function setButtonProps() {
			$('#box-shadow').trigger('change');
			$('#box-shadow-hover').trigger('change');
			$('#box-shadow-blur').trigger('change');
			$('#box-shadow-blur-hover').trigger('change');
			$('#text-shadow-blur').trigger('change');
			$('#text-shadow-blur-hover').trigger('change');
			$(".refbutton").css({
				"--button-width": $("input#button-width").val() + "px",
				"--button-height": $("input#button-height").val() + "px",
				"--button-height-val": $("input#button-height").val(),
				"--border-width": $("input#border-width").val(),
				"--border-radius": $("input#border-radius").val() + "px",
				// "--blur-radius": $("input#blur").val() + "px",
				"--box-shadow-spread-hover": $("input#box-shadow-spread-hover").val() + "px",
				"--box-shadow-blur-hover": $("input#box-shadow-blur-hover").val() + "px",
				"--text-shadow-blur-hover": $("input#text-shadow-blur-hover").val() + "px",
				"--shadow-inset": shadowInset ? 'inset' : '',
				"--bg-lines-width": $("input#bg-lines-width").val() + 'px',
			});

		}

		function setTransition() {
			$(".wp-block-button__link").css({
				"--transition": $("input#transition").val() + "s",
				"--transition-half": $("input#transition").val() / 2 + "s",
			});
		}

		function changeButton() {
			setControls();
			setColors();
			setTransition();
			setButtonProps();
		}

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
			$(".wp-block-button__link").parents('.refbutton').css({
				"--border-radius": $(this).val() + "px",
			});
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

		$("input[type=radio].effect:checked").trigger("click");

		$('.range-slider_range').trigger('change');

		$("nav.nav-tab-wrapper-effect a").on("click", function (e) {
			e.preventDefault();
			if ($(this).hasClass('license-inactive')) {
				$('#upgrade-popup').fadeIn();
			} else {
				$(".nav-tab.effect-tab").removeClass("active");
				$(".tab-panel.effect-panel").removeClass("active");
				$(this).addClass("active");
				var target = $(this).data("target");

				$("#" + target).addClass("active");
				$("#activeTab").val(target);
			}
		});

		$("nav.nav-tab-wrapper-general a").on("click", function (e) {
			e.preventDefault();
			$(".nav-tab.general-tab").removeClass("active");
			$(".tab-panel.general-panel").removeClass("active");
			$(this).addClass("active");
			var target = $(this).data("target");

			$("#" + target).addClass("active");
			$("#activeTab").val(target);
		});

		function setActiveTab() {
			$(".tab-panel.effect-panel").removeClass("active");

			$(".nav-tab.effect-tab").removeClass("active");
			$("input[type=radio]:checked")
				.parents(".tab-panel.effect-panel")
				.addClass("active");
			var activePanelId = $("input[type=radio]:checked")
				.parents(".tab-panel.effect-panel")
				.attr("id");
			$(
				".nav-tab-wrapper-effect a[data-target='" + activePanelId + "']"
			).addClass("active");
		}

		setActiveTab();
		$('#shadows-section').remove();
		changeButton();

		function showAndHide(el, timer) {
			// el.fadeIn('slow').delay(timer).fadeOut();
			el.addClass('onscreen');
			setTimeout(() => {
				el.removeClass('onscreen');
			}, timer);
		}

		function shownow(el) {
			el.addClass('onscreen');
		}

		$('#create-shortcode').on('click', function (e) {
			e.preventDefault();
			var effect = $("input[type=radio].effect:checked").val();
			var shortcodeId = Date.now();
			var shortcode = "[refbutton effect='" + effect + "' link='#' text='click me']";
			$('.shortcode-wrapper span#shortcode').text(shortcode);
			$('#refbutton-settings-form-effects').append(
				"<input type='hidden' name='shrt-text-color' value='" + $('#cfx-text-color').val() + "' />"
				+ ""
			);
			shownow($('.shortcode-wrapper'));
			$('.refbuttons-settings .tooltip1 .tooltiptext').text('Click to copy.');
			showAndHide($('#shTooltip'), 3000);
			// shownow($('#shTooltip'));
		});

		$('#shortcode').on('click', function () {
			// alert('copied');
			var copiedtext = $(this).text();
			let selection = window.getSelection();
			let myEl = document.getElementById('shortcode');
			if (selection.rangeCount > 0) {
				selection.removeAllRanges();
			}
			let range = document.createRange();
			range.selectNode(myEl);
			selection.addRange(range);

			if (navigator.clipboard) {
				navigator.clipboard.writeText(copiedtext)
					.then(() => {
						$("#shTooltip").text("Copied!");
						showAndHide($('#shTooltip'), 1000);
					})
					.catch((error) => {
						$("#shTooltip").text("Not copied!");
						showAndHide($('#shTooltip'), 1000)
					});
			} else {
				$("#myTooltip").text("Not copied!");
				showAndHide($('#myTooltip'), 1000)
			}
		});

		$('.radio-option input[type="radio"]').on('click', function () {
			$('#only-to-class').hide();
			if ($(this).val() === 'only_to') {
				$('#only-to-class').show();
			}
		});

		var radios = $('.radio-option input[type="radio"]');
		radios.each(function () {
			if ($(this).val() === 'only_to') {
				$('#only-to-class').show();
			}
		})

		$('#only-to-class').hide();
		if ($('.radio-option input[type="radio"]#only_to').is('checked')) {
			$('#only-to-class').show();
		}

		$("#refbutton-settings-form").submit(saveOptions);

		$("#refbutton-settings-form-effects").submit(saveOptions);

		function saveOptions() {
			$("#saving-overlay").addClass("overlay-visible");
			if (!$('#two-colors-table').is('visible')) {
				$('#two-colors-table #cfx-bg-color').val($('#premium-colors-table #cfx-bg-color').val());
				$('#two-colors-table #cfx-bg-h-color').val($('#premium-colors-table #cfx-bg-h-color').val());
			}
			$(this).ajaxSubmit({
				success: function () {
					$("#saving-overlay").removeClass("overlay-visible");
					$(".confirmMessage").slideDown("slow");
					setInterval(() => {
						$(".confirmMessage").slideUp("slow");
					}, 4000);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert('Something went wrong. Please retry. If the error persist, reload the page and save your settings again.');
					$("#saving-overlay").removeClass("overlay-visible");
					console.log(xhr.message);
				}
			});

			return false;
		}

		// #region LICENSE RELATED FUNCTIONS

		$('#autocolor-toggler:not(.license-inactive)').on('click', function () {
			autocolor = !autocolor;
			changeButton();
		});

		$('input[type=radio].effect').on('click', function (e) {
			$("#preview-container #preview-box .wp-block-button__link").css(
				"opacity",
				0
			);
			changeButton();
			setTimeout(function () {
				$("#preview-container #preview-box .wp-block-button__link").css(
					"opacity",
					1
				);
			}, 1000);
		});




	}); //end Ready


})(jQuery);
