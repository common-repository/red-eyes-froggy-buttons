<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://redeyesfroggybuttons.codingfix.com
 * @since      1.0.0
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/includes
 * @author     Marco Gasi <marco@codingfix.com>
 */
class Red_Eyes_Froggy_Buttons_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'red-eyes-froggy-buttons',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
