<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @package           Red_Eyes_Froggy_Buttons
 *
 * @wordpress-plugin
 * Plugin Name: Red Eyes Froggy Buttons
 * Plugin URI:        https://redeyesfroggybuttons.codingfix.com
 * Description:       Apply stunning customized hover effects to all your WordPress links and buttons.
 * Version:           1.3.8
 * Author:            Marco Gasi
 * Author URI:        https://redeyesfroggybuttons.codingfix.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       red-eyes-froggy-buttons
 * Domain Path:       /languages
 *
 */

if ( function_exists( 'refb_fs' ) ) {
    refb_fs()->set_basename( false, __FILE__ );
} else {
    
    if ( !function_exists( 'refb_fs' ) ) {
        /**
         * Refb_fs function.
         * Create a helper function for easy SDK access.
         */
        function refb_fs()
        {
            global  $refb_fs ;
            
            if ( !isset( $refb_fs ) ) {
                // Include Freemius SDK.
                require_once dirname( __FILE__ ) . '/freemius/start.php';
                $refb_fs = fs_dynamic_init( array(
                    'id'             => '13747',
                    'slug'           => 'red-eyes-froggy-buttons',
                    'type'           => 'plugin',
                    'public_key'     => 'pk_86fbb64684da4e3a30f30502c4a3d',
                    'is_premium'     => false,
                    'premium_suffix' => 'Premium',
                    'has_addons'     => false,
                    'has_paid_plans' => true,
                    'menu'           => array(
                    'slug'       => 'red-eyes-froggy-buttons',
                    'first-path' => 'admin.php?page=red-eyes-froggy-buttons',
                    'support'    => false,
                    'account'    => false,
                ),
                    'is_live'        => true,
                ) );
            }
            
            return $refb_fs;
        }
        
        // Init Freemius.
        refb_fs();
        // Signal that SDK was initiated.
        do_action( 'refb_fs_loaded' );
    }
    
    // If this file is called directly, abort.
    if ( !defined( 'WPINC' ) ) {
        die;
    }
    define( 'RED_EYES_FROGGY_BUTTONS_VERSION', '1.3.8' );
    define( 'RED_EYES_FROGGY_BUTTONS_PLUGIN', __FILE__ );
    define( 'RED_EYES_FROGGY_BUTTONS_PLUGIN_DIR', plugin_basename( __DIR__ ) );
    define( 'RED_EYES_FROGGY_BUTTONS_PLUGIN_SLUG', plugin_basename( __FILE__ ) );
    define( 'RED_EYES_FROGGY_BUTTONS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
    define( 'RED_EYES_FROGGY_BUTTONS_PLUGIN_IMAGES_URL', plugin_dir_url( __FILE__ ) . 'admin/images/' );
    define( 'RED_EYES_FROGGY_BUTTONS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
    define( 'REQUESTING_URL', home_url() );
    /**
     * The code that runs during plugin activation.
     * This action is documented in includes/class-red-eyes-froggy-buttons-activator.php
     */
    function activate_red_eyes_froggy_buttons()
    {
        require_once plugin_dir_path( __FILE__ ) . 'includes/class-red-eyes-froggy-buttons-activator.php';
        Red_Eyes_Froggy_Buttons_Activator::activate();
    }
    
    /**
     * The code that runs during plugin deactivation.
     * This action is documented in includes/class-red-eyes-froggy-buttons-deactivator.php
     */
    function deactivate_red_eyes_froggy_buttons()
    {
        require_once plugin_dir_path( __FILE__ ) . 'includes/class-red-eyes-froggy-buttons-deactivator.php';
        Red_Eyes_Froggy_Buttons_Deactivator::deactivate();
    }
    
    register_activation_hook( __FILE__, 'activate_red_eyes_froggy_buttons' );
    register_deactivation_hook( __FILE__, 'deactivate_red_eyes_froggy_buttons' );
    /**
     * The core plugin class that is used to define internationalization,
     * admin-specific hooks, and public-facing site hooks.
     */
    require plugin_dir_path( __FILE__ ) . 'includes/class-red-eyes-froggy-buttons.php';
    /**
     * Perform cleanup after uninstallation.
     *
     * @since    1.1.2
     */
    function refb_fs_uninstall_cleanup()
    {
        delete_option( 'refbuttons_options' );
    }
    
    refb_fs()->add_action( 'after_uninstall', 'refb_fs_uninstall_cleanup' );
    /**
     * Begins execution of the plugin.
     *
     * Since everything within the plugin is registered via hooks,
     * then kicking off the plugin from this point in the file does
     * not affect the page life cycle.
     *
     * @since    1.0.0
     */
    function run_red_eyes_froggy_buttons()
    {
        $plugin = new Red_Eyes_Froggy_Buttons();
        $plugin->run();
    }
    
    run_red_eyes_froggy_buttons();
}
