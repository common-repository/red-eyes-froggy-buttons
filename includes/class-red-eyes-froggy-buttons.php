<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://redeyesfroggybuttons.codingfix.com
 * @since      1.0.0
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/includes
 * @author     Marco Gasi <marco@codingfix.com>
 */
class Red_Eyes_Froggy_Buttons {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Red_Eyes_Froggy_Buttons_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * The options of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array    $options    The options of this plugin.
	 */
	private $options;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'RED_EYES_FROGGY_BUTTONS_VERSION' ) ) {
			$this->version = RED_EYES_FROGGY_BUTTONS_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'red-eyes-froggy-buttons';
		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->options = get_option( 'refbuttons_options' );
		$new_excluded_classes = array(
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
			'.add_to_cart_button',
		);
		$this->options['preset_excluded_classes'] = array();
		$this->options['preset_excluded_classes'] = $new_excluded_classes;
		update_option( 'refbuttons_options', $this->options );
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Red_Eyes_Froggy_Buttons_Loader. Orchestrates the hooks of the plugin.
	 * - Red_Eyes_Froggy_Buttons_i18n. Defines internationalization functionality.
	 * - Red_Eyes_Froggy_Buttons_Admin. Defines all hooks for the admin area.
	 * - Red_Eyes_Froggy_Buttons_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-red-eyes-froggy-buttons-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-red-eyes-froggy-buttons-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-red-eyes-froggy-buttons-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-red-eyes-froggy-buttons-public.php';

		$this->loader = new Red_Eyes_Froggy_Buttons_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Red_Eyes_Froggy_Buttons_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {
		$plugin_i18n = new Red_Eyes_Froggy_Buttons_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {
		$plugin_admin = new Red_Eyes_Froggy_Buttons_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		$this->loader->add_action( 'wp_ajax_process_refbuttons_options', $plugin_admin, 'process_refbuttons_options' );

		$this->loader->add_filter( 'plugin_row_meta', $plugin_admin, 'show_details_link', 25, 4 );

		/**
		 * Creating admin settings page menu subitem in Settings menu
		 */
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'refbuttons_admin_menu' );
		$this->loader->add_action( 'admin_post_save_refbuttons_options', $plugin_admin, 'process_refbuttons_options' );

		/**
		 * Processing users choices
		 * First we initialize the plugin adding two actions to save and process plugin options
		 */
		$this->loader->add_action( 'admin_init', $plugin_admin, 'refbuttons_admin_init' );

		$plugin_basename = plugin_basename( plugin_dir_path( __DIR__ ) . $this->plugin_name . '.php' );
		$this->loader->add_filter( 'plugin_action_links_' . $plugin_basename, $plugin_admin, 'add_action_links' );

		$this->loader->add_action( 'activated_plugin', $plugin_admin, 'redirect_to_settings_page' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {
		$plugin_public = new Red_Eyes_Froggy_Buttons_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
		$this->loader->add_action( 'wp_head', $plugin_public, 'refbuttons_set_button_effect' );
		$this->loader->add_action( 'init', $plugin_public, 'register_shortcodes' );
		// following filter is to force woocommerce place_order button to adhere to refbuttons style. It looks like some javascript always remove my wrapping div.
		$this->loader->add_filter( 'woocommerce_order_button_html', $plugin_public, 'ref_order_button_html' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Red_Eyes_Froggy_Buttons_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
