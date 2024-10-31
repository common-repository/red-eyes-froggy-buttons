<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://redeyesfroggybuttons.codingfix.com
 * @since      1.0.0
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/public
 */
/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/public
 * @author     Marco Gasi <marco@codingfix.com>
 */
class Red_Eyes_Froggy_Buttons_Public
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
     * The options of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The options of this plugin.
     */
    private  $options ;
    /**
     * Color mode for effects.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The color mode (auto/manual) of this plugin.
     */
    private  $color_mode ;
    /**
     * Color mode for effects.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The path to the styles directory of this plugin.
     */
    private  $style_path ;
    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string $plugin_name       The name of the plugin.
     * @param      string $version    The version of this plugin.
     */
    public function __construct( $plugin_name, $version )
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->options = get_option( 'refbuttons_options' );
        $this->color_mode = ( isset( $this->options['autocolor'] ) && 'on' === $this->options['autocolor'] ? 'autocolor' : 'fullcolor' );
        $this->style_path = RED_EYES_FROGGY_BUTTONS_PLUGIN_URL . 'public/css/' . $this->color_mode . '/';
    }
    
    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        if ( !is_admin() && (!defined( 'DOING_AJAX' ) || !DOING_AJAX) ) {
            
            if ( 'on' === $this->options['active'] ) {
                wp_enqueue_style(
                    $this->plugin_name,
                    plugin_dir_url( __FILE__ ) . 'css/red-eyes-froggy-buttons-public.min.css',
                    array(),
                    $this->version,
                    'all'
                );
                wp_enqueue_style(
                    $this->plugin_name . '_button',
                    plugin_dir_url( __FILE__ ) . 'css/free/' . $this->options['effect'] . '.css',
                    array(),
                    $this->version,
                    'all'
                );
            }
        
        }
    }
    
    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        
        if ( 'on' === $this->options['active'] ) {
            // To put the script in the footer you must leave blank the version.
            wp_enqueue_script(
                $this->plugin_name . '-public-js',
                plugin_dir_url( __FILE__ ) . 'js/red-eyes-froggy-buttons-public.js',
                array( 'jquery' ),
                '',
                true
            );
            // phpcs:ignore
        }
    
    }
    
    /**
     * Register shortcodes
     *
     * @since version 1.2.0
     */
    public function register_shortcodes()
    {
        if ( 'on' === $this->options['active'] ) {
        }
    }
    
    /**
     * Create the shortcodes
     *
     * @param string $atts attributes.
     * @since version 1.2.0
     */
    public function do_refbutton_shortcode( $atts = '' )
    {
        $attribs = shortcode_atts( array(
            'effect' => 'free0',
            'id'     => '',
            'link'   => '#',
            'text'   => 'Click here',
        ), $atts );
        wp_enqueue_style(
            $this->plugin_name . '-' . $attribs['effect'],
            $this->style_path . $attribs['effect'] . '.css',
            array(),
            $this->version,
            'all'
        );
        $refbutton = '<a class=\'refbutton-instance refb-sh\' href=\'' . $attribs['link'] . '\' data-id=\' ' . $attribs['id'] . '\' data-effect=\'' . $attribs['effect'] . '\'>';
        $refbutton .= $attribs['text'];
        $refbutton .= '</a>';
        return $refbutton;
    }
    
    /**
     * Force woocommerce place_order button markup.
     *
     * @param string $button The default button.
     * @since version 1.0.0
     */
    public function ref_order_button_html( $button )
    {
        
        if ( 'on' === $this->options['active'] ) {
            $order_button_text = __( 'Place order', 'woocommerce' );
            $licence_level = 'free';
            $button = '<div class="refbutton ' . $licence_level . ' ' . $this->options['effect'] . '"><button type="submit" class="button alt wp-element-button refbutton-instance" name="woocommerce_checkout_place_order" id="place_order" value="' . esc_attr( $order_button_text ) . '" data-value="' . esc_attr( $order_button_text ) . '">' . esc_attr( $order_button_text ) . '</button></div>';
        }
        
        return $button;
    }
    
    /**
     * Set button effect.
     *
     * @since version 1.0.0
     */
    public function refbuttons_set_button_effect()
    {
        if ( 'on' === $this->options['active'] ) {
            
            if ( isset( $this->options['effect'] ) && 'none' !== $this->options['effect'] ) {
                $effect = $this->options['effect'];
                $button_width = $this->options['button-width'];
                $border_width = $this->options['border-width'];
                $active = $this->options['active'];
                $transition = $this->options['transition'];
                $only_class_array = explode( ',', $this->options['only_class'] );
                $only_class = ltrim( $only_class_array[0], '.' );
                $affecting_options = $this->options['affecting-options'];
                $excluded_classes_db = ( isset( $this->options['excluded_classes'] ) ? $this->options['excluded_classes'] : '' );
                $result = array();
                $excluded_classes = implode( ',', $this->options['preset_excluded_classes'] );
                
                if ( !empty($excluded_classes_db) ) {
                    $excluded_classes .= ',';
                    $excluded_classes_array = explode( ',', $excluded_classes_db );
                    foreach ( $excluded_classes_array as $item ) {
                        array_push( $result, '.' . ltrim( $item, '.' ) );
                    }
                    $excluded_classes .= implode( ',', $result );
                    $excluded_classes = rtrim( $excluded_classes, ',' );
                }
                
                
                if ( 'autocolor' === esc_html( $this->color_mode ) ) {
                    $default_color = ( isset( $this->options['default-color'] ) ? esc_html( $this->options['default-color'] ) : 'rgba(0,0,0,1)' );
                    $alternate_color = 'rgba(0,0,0,0)';
                } else {
                    $default_color = ( isset( $this->options['bg-color'] ) ? esc_html( $this->options['bg-color'] ) : 'rgba(0,0,0,1)' );
                    $alternate_color = ( isset( $this->options['bg-h-color'] ) ? esc_html( $this->options['bg-h-color'] ) : 'rgba(0,0,0,1)' );
                }
                
                ?>

				<style>
					:root {
						--button-width:
							<?php 
                echo  ( isset( $this->options['button-width'] ) ? esc_html( $this->options['button-width'] ) . 'px' : '140px' ) ;
                ?>
							;
						--button-height:
							<?php 
                echo  ( isset( $this->options['button-height'] ) ? esc_html( $this->options['button-height'] ) . 'px' : '60px' ) ;
                ?>
							;
						--button-width-val:
							<?php 
                echo  ( isset( $this->options['button-width'] ) ? esc_html( $this->options['button-width'] ) : '140' ) ;
                ?>
							;
						--button-height-val:
							<?php 
                echo  ( isset( $this->options['button-height'] ) ? esc_html( $this->options['button-height'] ) : '60' ) ;
                ?>
							;
						--border-width:
							<?php 
                echo  ( isset( $this->options['border-width'] ) ? esc_html( $this->options['border-width'] ) : '1' ) ;
                ?>
							;
						--border-radius:
							<?php 
                echo  ( isset( $this->options['border-radius'] ) ? esc_html( $this->options['border-radius'] ) . 'px' : '0' ) ;
                ?>
							;
						--default-color:
							<?php 
                echo  ( isset( $this->options['default-color'] ) ? esc_html( $this->options['default-color'] ) : 'rgba(0,0,0,1)' ) ;
                ?>
							;
						--default-color-a:
							<?php 
                echo  ( isset( $this->options['default-color-a'] ) ? esc_html( $this->options['default-color-a'] ) : '#00000000' ) ;
                ?>
							;
						--contrasted-text-color:
							<?php 
                echo  ( isset( $this->options['contrasted-text-color'] ) ? esc_html( $this->options['contrasted-text-color'] ) : '#dddddd' ) ;
                ?>
							;
						--shadow-inset:
							<?php 
                echo  ( isset( $this->options['shadow-inset'] ) ? esc_html( $this->options['shadow-inset'] ) : '' ) ;
                ?>
							;
						--transition:
							<?php 
                echo  ( isset( $this->options['transition'] ) ? esc_html( $this->options['transition'] ) . 's' : '.6s' ) ;
                ?>
							;
						--transition-val:
							<?php 
                echo  ( isset( $this->options['transition'] ) ? esc_html( $this->options['transition'] ) : '.6' ) ;
                ?>
							;
						--bg-lines-width:
							<?php 
                echo  ( isset( $this->options['bg-lines-width'] ) ? esc_html( $this->options['bg-lines-width'] ) . 'px' : '10px' ) ;
                ?>
							;
						}
				</style>

				<script id="red-eyes-froggy-buttons-inline" type="text/javascript">
					var refbuttons = {};
					var effect = "<?php 
                echo  esc_html( $effect ) ;
                ?>";
					var minWidth = "<?php 
                echo  esc_html( $button_width ) ;
                ?>";
					var borderWidth = "<?php 
                echo  esc_html( $border_width ) ;
                ?>";
					var affectingOptions = "<?php 
                echo  esc_html( $affecting_options ) ;
                ?>";
					var onlyClass = "<?php 
                echo  esc_html( $only_class ) ;
                ?>";
					var excludedClasses = "<?php 
                echo  esc_html( $excluded_classes ) ;
                ?>";
					var isActive = "<?php 
                echo  esc_html( $active ) ;
                ?>";
					var transition = "<?php 
                echo  esc_html( $transition ) ;
                ?>";
				</script>

				<?php 
            }
        
        }
    }

}