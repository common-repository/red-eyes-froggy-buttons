=== Red Eyes Froggy Buttons ===
Contributors: codingfix, freemius
Donate link: https://www.paypal.com/paypalme/codingfix
Tags: buttons, css3, hover effects
Requires at least: 4.0.1
Tested up to: 6.4
Stable tag: 1.3.8
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Red Eyes Froggy Buttons makes adding stunning hover effets to your button, links and input of type "submit" and "button" easier than before.

== Description ==

Red Eyes Froggy Buttons is the only one plugin which allows you to easily add css3 hover effects to your buttons, links etc. without writing css code by yourself. You can choose between 25 hover effects in the free version and 26 more effects in the Premium version.
More effects will be added in the future and more controls over the different aspects of each effect will be added as well.

All the CSS code used by this plugin is freely available on the web. Although in many cases I had to make important changes, I'm not a CSS expert and I don’t want to take any credit for the CSS code used here. The goal of this plugin is to make that code easy to use and customize from within the WordPress admin section, trying to make it dynamic and self-adaptable to the different styles used by WordPress theme authors.

Every effect can be customized directly in the plugin settings page, using intuitive and easy to use controls. In the Premum version, get a more granular control over the colors to use for text, borders and background in normal and hover states.

In addition, the Premium version allows you to use shortcodes. The magic of this feature is that you can use a different effect for each button you put in your web page! In fact the shortcode will load only the css stylesheet which contains the rules for that specific effect.

### **Free features**

* set the elements the effects will be applied to:
  * every button, link, input of type "submit" and input of type "button"
  * every button, link, input of type "submit" and input of type "button" **except button and links in your menus**
  * buttons, links, inputs of type "submit" and inputs of type "button" but not to he nornmal links
  * buttons, links, inputs of type "submit" and inputs of type "button" but not to he nornmal links **except button in your menus**
* apply effects only to a specific class
* set one or more excluded class(es) the effect won't be applied to
* all elements with the class "norefbutton" will be automatically ignored by the plugin
* choose among the 25 effects available
* set the main color for your buttons: a second color will be automatically calculated by the plugin
* set the button min width
* set the button min height
* set the border width
* set the border radius
* set the Animation duration
* if required by the effect, some more controls to set shadows will become available

### **Premium features**
* 26 more effects
* ability to set colors automatically (as in the free version) or manually. In this case you can set
  * different text colors in normal and hover states
  * different border colors in normal and hover states
  * different background colors in normal and hover states
* shortcodes: you can use them together with the automatic mode or as an alternative to it. Using shortcodes allows you to use different effects for different buttons on the same web page


### The Credits section
Here you can find the names of the CSS authors and the links to their original CSS code.

== Installation ==

Dashboard Method:

  1. Login to your WordPress admin and go to Plugins > Add New
  2. Type “Red Eyes Froggy Buttons” in the search bar and select this plugin
  3. Click “Install”, and then “Activate”


Upload Method:

  1. Unzip the plugin and upload the “better-search-replace” folder to your ‘wp-content/plugins’ directory
  2. Activate the plugin through the Plugins menu in WordPress


And you're done!

== Changelog ==

= 1.1.2 =
* Moved uninstall logic to a function

= 1.1.3 =
* Fixed issue about colliding functions' names between free and premium versions

= 1.1.4 =
* Fixed issue with SDK integration and duplicated functions' names

= 1.1.5 =
* Fixed another issue about Freemius SDK integration

= 1.1.6 =
* Updated to SDK 2.6.0

= 1.1.7 =
* Fixed an issue in SDK integration

= 1.1.8 =
* Fixed an issue which prevented to save general settings

= 1.1.9 =
* Fixed minor bug

= 1.2.0 =
* Fixed missing jquery error with some themes

= 1.2.1 =
* Improved styles rules for custom classes

= 1.2.2 =
* Fixed minor bugs

= 1.2.3 =
* Fixed several bugs in css files and in the javascript code to dynamically adjust values of css variables

= 1.2.4 =
* Removed Account page link for users who don't have an account (free version users)

= 1.2.5 =
* Fixed a bug in first 4 free effects which prevented the effect to work if border width was set to 0 

= 1.2.6 =
* Fixed a bug in the special effect Skewed; optimized javascript code

= 1.2.7 =
* Fixed a bug that trigger the upgrade popup even in free effects tab

= 1.2.8 =
* Fixed a bug that prevented woocommerce "Apply coupon" button to be processed
* Changed the order of affecting options in the General options tab panel
* Set "Only buttons except in menus" as default option
* Improved Woocommerce compatibility

= 1.2.9 =
* Updated Freemius code

= 1.3.0 =
* Added support for Forminator

= 1.3.1 =
* Fixed readme mistake

= 1.3.2 =
* Fixed wrong eol in some files

= 1.3.3 =
* Added compatibility with SureCart
* Fixed border-radius issue with a couple of special effects

= 1.3.4 =
* Improved support to Woocommerce blocks
* Fully compatibility with Astra Starter Templates
* Fixed an issue that prevented the woommerce "place order" button from showing if the plugin was activated but was not set asd active in the settings page

= 1.3.5 =
* Fixed a bug preventing shortcode from being copied to clipboard

= 1.3.6 =
* Fixed a bug that prevented to detect button text in some effects

= 1.3.7 =
* Fixed a bug that prevented to detect button text in some effects

= 1.3.8 =
* Added support to Kadence theme
* Fixed a bug on Woocommerce place_holder button

