<?php
/**
 * Fired during plugin activation
 *
 * @link       https://redeyesfroggybuttons.codingfix.com
 * @since      1.0.0
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/includes
 * @author     Marco Gasi <marco@codingfix.com>
 */
class Red_Eyes_Froggy_Buttons_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		if ( is_plugin_active( 'red-eyes-froggy-buttons/red-eyes-froggy-buttons.php' ) ) {
			deactivate_plugins( 'red-eyes-froggy-buttons/red-eyes-froggy-buttons.php' );
		}

		add_option( 'refbuttons_do_activation_redirect', true );

		$preset_excluded_classes = array(
			'.norefbutton',
			'.cmplz-manage-consent',
			'.cmplz-link',
			'.search-submit',
			'.a2a_kit',
			'.product_meta',
			'.posted_in',
			'.woocommerce-MyAccount-content',
			'.product-name',
			'.product-remove',
			'.download-product',
			'.restore-item',
			'.ast-on-card-button',
			'.ast-loop-product__link',
			'.astra-cart-drawer-close',
			'.add_to_cart_button span#btn-text',
		);

		$defaults = array(
			'effect'                   => 'free01',
			'active'                   => 'off',
			'autocolor'                => 'off',
			'button-width'             => '120',
			'button-height'            => '40',
			'border-width'             => '1',
			'border-radius'            => '0',
			'default-color'            => 'rgba(035,122,028,1)',
			'--contrasted-text-color'  => 'rgba(255, 255, 255, 1 )',
			'text-color'               => 'rgb(232,93,2)',
			'text-color - a'           => '#00000000',
			'text-h-color'             => 'rgb(035,122,028)',
			'color-normal'             => 'rgba(0,0,0,1)',
			'color-normal-a'           => '#00000000',
			'color-hover'              => 'rgba(0,0,0,1)',
			'br-color'                 => 'rgb(232,93,2)',
			'br-color-a'               => '#00000000',
			'br-h-color'               => 'rgba(035,122,028)',
			'bg-color'                 => 'rgba(035,122,028)',
			'bg-color-a'               => '#00000000',
			'bg-h-color'               => 'rgba(035,122,028)',
			'bg2-color'                => 'rgba(0,0,0,1)',
			'bg2-color-a'              => '#00000000',
			'bg2-h-color'              => 'rgba(0,0,0,1)',
			'sh-color'                 => 'rgba(0,0,0,1)',
			'sh-h-color'               => 'rgba(0,0,0,1)',
			'txt-sh-color'             => 'rgba(0,0,0,1)',
			'txt-sh-h-color'           => 'rgba(0,0,0,1)',
			'preview-background-color' => 'rgba(249,249,249,1)',
			'transition'               => '.6',
			'bg-lines-width'           => '10',
			'box-shadow-spread-hover'  => '0',
			'box-shadow-blur-hover'    => '1',
			'text-shadow-blur-hover'   => '0',
			'shadow-inset'             => 'off',
			'affecting-options'        => 'only_buttons_not_menu',
			'only_to'                  => 'off',
			'applying_mode'            => 'use_rules',
			'only_class'               => '',
			'preset_excluded_classes'  => implode( ',', $preset_excluded_classes ),
			'excluded_classes'         => '',
			'version'                  => RED_EYES_FROGGY_BUTTONS_VERSION,
		);

		$options          = get_option( 'refbuttons_options', array() );
		$options_to_store = array_merge( $defaults, $options );
		update_option( 'refbuttons_options', $options_to_store );

	}

}
