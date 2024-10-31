<?php

/**
 * All admin functions.
 *
 * @link       https://redeyesfroggybuttons.codingfix.com
 * @since      1.0.0
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/admin
 */
/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/admin
 * @author     Marco Gasi <marco@codingfix.com>
 */
class Red_Eyes_Froggy_Buttons_Admin
{
    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private  $plugin_name ;
    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private  $version ;
    /**
     * Write an entry to a log file in the uploads directory.
     *
     * @since x.x.x
     *
     * @param mixed  $entry String or array of the information to write to the log.
     * @param string $mode Optional. The type of write. See 'mode' at https://www.php.net/manual/en/function.fopen.php.
     * @param string $file Optional. The file basename for the .log file.
     * @return boolean|int Number of bytes written to the lof file, false otherwise.
     */
    public function plugin_log( $entry, $mode = 'a', $file = 'refbuttons' )
    {
        // Get WordPress uploads directory.
        $upload_dir = wp_upload_dir();
        $upload_dir = $upload_dir['basedir'];
        // If the entry is array, json_encode.
        if ( is_array( $entry ) ) {
            $entry = wp_json_encode( $entry );
        }
        // Write the log file.
        $file = $upload_dir . '/' . $file . '.log';
        $file = fopen( $file, $mode );
        // phpcs:ignore
        $bytes = fwrite( $file, current_time( 'mysql' ) . '::' . $entry . "\n" );
        // phpcs:ignore
        fclose( $file );
        // phpcs:ignore
        return $bytes;
    }
    
    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param    string $plugin_name       The name of this plugin.
     * @param    string $version    The version of this plugin.
     */
    public function __construct( $plugin_name, $version )
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }
    
    /**
     * Initialization.
     *
     * @since    1.0.0
     */
    public function refbuttons_admin_init()
    {
        $options = get_option( 'refbuttons_options' );
        if ( '' === $options['effect'] ) {
            $options['effect'] = 'free01';
        }
        update_option( 'refbuttons_options', $options );
    }
    
    /**
     * Send response back to javascript ajax caller.
     *
     * @param    array $response The result of the API query.
     *
     * @since    1.0.0
     */
    public function return_response( $response )
    {
        echo  wp_json_encode( $response ) ;
        wp_die();
    }
    
    /**
     * Show details link even if there are no updates
     *
     * @param array  $links_array    array of links.
     * @param string $plugin_file_name    The plugin file name.
     * @param array  $plugin_data    The plugin data.
     * @param string $status    The plugin status.
     * @since 1.0.0
     */
    public function show_details_link(
        $links_array,
        $plugin_file_name,
        $plugin_data,
        $status
    )
    {
        if ( strpos( $plugin_file_name, RED_EYES_FROGGY_BUTTONS_PLUGIN_SLUG ) ) {
            $links_array[] = sprintf( '<a href="%s" class="thickbox open-plugin-details-modal">%s</a>', add_query_arg( array(
                'tab'       => 'plugin-information',
                'plugin'    => RED_EYES_FROGGY_BUTTONS_PLUGIN_DIR,
                'TB_iframe' => true,
                'width'     => 772,
                'height'    => 788,
            ), admin_url( 'plugin-install.php' ) ), __( 'View details' ) );
        }
        return $links_array;
    }
    
    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        $page = filter_input(
            INPUT_GET,
            'page',
            FILTER_CALLBACK,
            array(
            'options' => 'esc_html',
        )
        );
        if ( isset( $page ) && '' !== $page ) {
            
            if ( false !== strpos( $page, 'red-eyes-froggy-buttons' ) ) {
                wp_enqueue_style(
                    $this->plugin_name . '-common',
                    plugin_dir_url( __FILE__ ) . 'css/red-eyes-froggy-buttons-common-admin.min.css',
                    array(),
                    $this->version,
                    'all'
                );
                wp_enqueue_style(
                    $this->plugin_name . '-styles',
                    plugin_dir_url( __FILE__ ) . 'css/red-eyes-froggy-buttons-admin.css',
                    array(),
                    $this->version,
                    'all'
                );
            }
        
        }
    }
    
    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        $page = filter_input(
            INPUT_GET,
            'page',
            FILTER_CALLBACK,
            array(
            'options' => 'esc_html',
        )
        );
        if ( isset( $page ) && '' !== $page ) {
            
            if ( false !== strpos( $page, 'red-eyes-froggy-buttons' ) ) {
                wp_enqueue_script(
                    $this->plugin_name,
                    plugin_dir_url( __FILE__ ) . 'js/red-eyes-froggy-buttons-admin.min.js',
                    array( 'jquery', 'jquery-form' ),
                    $this->version,
                    false
                );
                wp_enqueue_style( 'wp-color-picker' );
                wp_register_script(
                    'wp-color-picker-alpha',
                    plugin_dir_url( __FILE__ ) . 'js/wp-color-picker-alpha.min.js',
                    array( 'wp-color-picker' ),
                    '1',
                    true
                );
                wp_add_inline_script( 'wp-color-picker-alpha', 'jQuery( function() { jQuery( ".color-picker" ).wpColorPicker(); } );' );
                wp_enqueue_script( 'wp-color-picker-alpha' );
            }
        
        }
    }
    
    /**
     * Redirect to settings page after activation
     *
     * @since    1.0.0
     */
    public function redirect_to_settings_page()
    {
        
        if ( get_option( 'refbuttons_do_activation_redirect', false ) ) {
            delete_option( 'refbuttons_do_activation_redirect' );
            $activate_multi = filter_input(
                INPUT_GET,
                'activate-multi',
                FILTER_CALLBACK,
                array(
                'options' => 'esc_html',
            )
            );
            
            if ( !isset( $activate_multi ) ) {
                exit( wp_redirect( add_query_arg( array(
                    'page' => 'red-eyes-froggy-buttons',
                    'tab'  => 'General',
                ), admin_url( 'admin.php' ) ) ) );
                // phpcs:ignore
            }
        
        }
    
    }
    
    /**
     * Register the Settings page.
     *
     * @since    1.0.0
     */
    public function refbuttons_admin_menu()
    {
        add_menu_page(
            __( 'Red Eyes Froggy Buttons', 'Red Eyes Froggy Buttons' ),
            __( 'Red Eyes Froggy Buttons', 'Red Eyes Froggy Buttons' ),
            'manage_options',
            'red-eyes-froggy-buttons/',
            array( $this, 'display_plugin_admin_page' )
        );
        add_submenu_page(
            'red-eyes-froggy-buttons',
            __( 'General' ),
            __( 'General' ),
            'manage_options',
            'red-eyes-froggy-buttons/',
            array( $this, 'display_plugin_admin_page' )
        );
        add_submenu_page(
            'red-eyes-froggy-buttons',
            __( 'Effects' ),
            __( 'Effects' ),
            'manage_options',
            'red-eyes-froggy-buttons/effects',
            array( $this, 'display_plugin_admin_effects_page' )
        );
        add_submenu_page(
            'red-eyes-froggy-buttons',
            __( 'Credits' ),
            __( 'Credits' ),
            'manage_options',
            'red-eyes-froggy-buttons/credits',
            array( $this, 'display_plugin_admin_credits_page' )
        );
    }
    
    /**
     * Callback function for the admin settings page.
     *
     * @since    1.0.0
     */
    public function display_plugin_admin_page()
    {
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/red-eyes-froggy-buttons-admin-display.php';
    }
    
    /**
     * Callback function for the admin settings page.
     *
     * @since    1.0.0
     */
    public function display_plugin_admin_general_page()
    {
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/red-eyes-froggy-buttons-admin-display.php';
    }
    
    /**
     * Callback function for the admin settings page.
     *
     * @since    1.0.0
     */
    public function display_plugin_admin_effects_page()
    {
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/red-eyes-froggy-buttons-admin-effects-display.php';
    }
    
    /**
     * Callback function for the admin credits page.
     *
     * @since    1.0.0
     */
    public function display_plugin_admin_credits_page()
    {
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/red-eyes-froggy-buttons-admin-credits-display.php';
    }
    
    /**
     * Add a links near Deactivate link in the plugin list
     *
     * @param string $links add link to Settings page in plugin page.
     * @since    1.0.0
     */
    public function add_action_links( $links )
    {
        // Documentation : https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name).
        $settings_link = array( '<a href="' . admin_url( 'admin.php?page=red-eyes-froggy-buttons' ) . '">' . __( 'Settings', 'Red Eyes Froggy Buttons' ) . '</a>' );
        return array_merge( $settings_link, $links );
    }
    
    /**
     * Updates options
     *
     * @since    1.0.0
     */
    public function process_refbuttons_options()
    {
        $options = get_option( 'refbuttons_options' );
        if ( !current_user_can( 'manage_options' ) ) {
            wp_die( 'Not allowed' );
        }
        check_admin_referer( 'refbuttonsoptions' );
        
        if ( isset( $_POST['current_page'] ) ) {
            $current_page = sanitize_text_field( wp_unslash( $_POST['current_page'] ) );
        } else {
            exit;
        }
        
        
        if ( 'red-eyes-froggy-buttons' === $current_page ) {
            
            if ( isset( $_POST['active'] ) && 1 === preg_match( '/^[A-Za-z]+$/', sanitize_text_field( wp_unslash( $_POST['active'] ) ) ) ) {
                $options['active'] = sanitize_text_field( wp_unslash( $_POST['active'] ) );
            } else {
                $options['active'] = 'off';
            }
            
            if ( isset( $_POST['only_class'] ) && (1 === preg_match( '/^[A-Za-z0-9_\\-]+$/', sanitize_text_field( wp_unslash( $_POST['only_class'] ) ) ) || empty(sanitize_text_field( wp_unslash( $_POST['only_class'] ) ))) ) {
                $options['only_class'] = sanitize_text_field( wp_unslash( $_POST['only_class'] ) );
            }
            if ( isset( $_POST['affecting-options'] ) && 1 === preg_match( '/^[A-Za-z0-9_\\-]+$/', sanitize_text_field( wp_unslash( $_POST['affecting-options'] ) ) ) ) {
                $options['affecting-options'] = sanitize_text_field( wp_unslash( $_POST['affecting-options'] ) );
            }
            
            if ( isset( $_POST['excluded_classes'] ) && 1 === preg_match( '/^[A-Za-z0-9_,\\-\\s]+$/', sanitize_text_field( wp_unslash( $_POST['excluded_classes'] ) ) ) || empty(sanitize_text_field( wp_unslash( $_POST['excluded_classes'] ) )) ) {
                $excluded_classes = preg_replace( '/\\s/', '', sanitize_text_field( wp_unslash( $_POST['excluded_classes'] ) ) );
                $options['excluded_classes'] = $excluded_classes;
            }
        
        } else {
            if ( isset( $_POST['effect'] ) ) {
                $options['effect'] = sanitize_text_field( wp_unslash( $_POST['effect'] ) );
            }
            
            if ( isset( $_POST['shadow-inset'] ) ) {
                $options['shadow-inset'] = 'inset';
            } else {
                $options['shadow-inset'] = '';
            }
            
            
            if ( isset( $_POST['autocolor'] ) ) {
                $options['autocolor'] = sanitize_text_field( wp_unslash( $_POST['autocolor'] ) );
            } else {
                $options['autocolor'] = 'off';
            }
            
            if ( isset( $_POST['box-shadow'] ) ) {
                $options['box-shadow'] = floatval( $_POST['box-shadow'] );
            }
            if ( isset( $_POST['default-color'] ) ) {
                $options['default-color'] = sanitize_text_field( wp_unslash( $_POST['default-color'] ) );
            }
            if ( isset( $_POST['default-color-a'] ) ) {
                $options['default-color-a'] = sanitize_text_field( wp_unslash( $_POST['default-color-a'] ) );
            }
            if ( isset( $_POST['contrasted-text-color'] ) ) {
                $options['contrasted-text-color'] = sanitize_text_field( wp_unslash( $_POST['contrasted-text-color'] ) );
            }
            if ( isset( $_POST['preview-background-color'] ) ) {
                $options['preview-background-color'] = sanitize_text_field( wp_unslash( $_POST['preview-background-color'] ) );
            }
            if ( isset( $_POST['transition'] ) ) {
                $options['transition'] = floatval( $_POST['transition'] );
            }
            if ( isset( $_POST['button-width'] ) ) {
                $options['button-width'] = floatval( $_POST['button-width'] );
            }
            if ( isset( $_POST['button-height'] ) ) {
                $options['button-height'] = floatval( $_POST['button-height'] );
            }
            if ( isset( $_POST['border-width'] ) ) {
                $options['border-width'] = floatval( $_POST['border-width'] );
            }
            if ( isset( $_POST['border-radius'] ) ) {
                $options['border-radius'] = floatval( $_POST['border-radius'] );
            }
            /**
             * END OF PREMIUM FEATURES
             */
        }
        
        $active_tab = ( isset( $_POST['active_tab'] ) ? sanitize_text_field( wp_unslash( $_POST['active_tab'] ) ) : 'free-tab' );
        update_option( 'refbuttons_options', $options );
        wp_safe_redirect( add_query_arg( array(
            'page'      => $current_page,
            'activeTab' => $active_tab,
            'message'   => '1',
        ), admin_url( 'admin.php' ) ) );
        exit;
    }

}