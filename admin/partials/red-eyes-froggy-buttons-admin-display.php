<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://redeyesfroggybuttons.codingfix.com
 * @since      1.0.0
 *
 * @package    Red_Eyes_Froggy_Buttons
 * @subpackage Red_Eyes_Froggy_Buttons/admin/partials
 */
?>

<div id="refbuttons-general" class="refbuttons-settings">

	<div id="ref-header">
		<img src="<?php 
echo  esc_url( RED_EYES_FROGGY_BUTTONS_PLUGIN_IMAGES_URL . 'logo-plugin.png' ) ;
?>" alt="Red Eyes Froggy Buttons logo" />

	</div>

	<nav class="nav-tab-wrapper woo-nav-tab-wrapper">
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons' ) ) ;
?>&amp;tab=general" class="nav-tab nav-tab-active"><?php 
echo  esc_html( __( 'General' ) ) ;
?></a>
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons/effects' ) ) ;
?>&amp;tab=effects" class="nav-tab"><?php 
echo  esc_html( __( 'Effects' ) ) ;
?></a>
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons/credits' ) ) ;
?>&amp;tab=credits" class="nav-tab"><?php 
echo  esc_html( __( 'Credits' ) ) ;
?></a>
		<?php 
?>
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons-contact' ) ) ;
?>&amp;tab=contact" class="nav-tab"><?php 
echo  esc_html( __( 'Contact Us' ) ) ;
?></a>
		<?php 
?>
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons-pricing' ) ) ;
?>&amp;tab=pricing" class="nav-tab pricing"><?php 
echo  esc_html( __( 'Upgrade' ) ) ;
?> ►</a>
			<?php 
?>
	</nav>
	<?php 
$current_page = 'red-eyes-froggy-buttons';
$message = filter_input(
    INPUT_GET,
    'message',
    FILTER_CALLBACK,
    array(
    'options' => 'esc_html',
)
);
$hidden = '';
if ( 1 === intval( $message ) ) {
    ?>
	<div id='message' class='updated fade'>
		<p><strong>Settings Saved</strong></p>
	</div>
	<?php 
}
?>



	<form id="refbutton-settings-form" method="post" action="admin-post.php">
		<input type="hidden" name="action" value="save_refbuttons_options" />
		<input type="hidden" id="current_page" name="current_page" value="<?php 
echo  esc_html( $current_page ) ;
?>" />

		<!-- Adding security through hidden referrer field -->
		<?php 
wp_nonce_field( 'refbuttonsoptions' );
?>
		<?php 
$options = get_option( 'refbuttons_options' );
?>
		<?php 
$allowed_html = array(
    'strong' => array(),
);
?>
		<section>
			<div class="settingsbox">
				<div class="row settings-row">
					<div class="col-6">
						<h2><?php 
echo  esc_html( __( 'General Settings' ) ) ;
?></h2>
					</div>
					<div class="col-6">
						<div class="warning">
							<div class="confirmMessage">
								<span class="dashicons dashicons-saved"></span>
								<span><?php 
echo  esc_html( __( 'Settings saved' ) ) ;
?></span>
							</div>
							<input type="submit" value="Save changes" class="button-primary save-changes" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<div id="saving-overlay">
							<div id="loader-container">
								<div class="colorful"></div>
							</div>
						</div>
					</div>
				</div>

				<div class="row settings-row">
					<div class="col-12">
						<div class="settings-label">
							Applying rules
						</div>
						<div class="settings-content">
							<div class="switch-holder">
								<div class="switch-toggle">
									<input type="checkbox" id="active-rules-toggler" name="active" <?php 
echo  ( 'on' === $options['active'] ? 'checked' : '' ) ;
?> />
									<label for="active-rules-toggler"></label>
								</div>
								<p><?php 
echo  esc_html( __( 'Activate/deactivate automatic mode to take advantage of the follwing applying rules. If you only want to use shortcodes, don\'t forget to deactivate applying rules. Shortcodes will work in any case.' ) ) ;
?></p>
							</div>
							<div class="radio-option">
								<p><?php 
echo  esc_html( __( 'You can use one of the following rules in order REF Buttons plugin apply the selected effect to your website automatically.' ) ) ;
?></p>
							</div>

							<div class="sub-options">
								<div class="sub-options-overlay"></div>

								<div class="radio-option radio-sub-option">
									<div class="inputGroup">
										<input id="only_buttons_not_menu" name="affecting-options" value="only_buttons_not_menu" type="radio" <?php 
echo  ( 'only_buttons_not_menu' === $options['affecting-options'] ? 'checked' : '' ) ;
?> />
										<label for="only_buttons_not_menu"><?php 
echo  esc_html( __( 'Only buttons except in menus' ) ) ;
?></label>
									</div>
									<p><?php 
echo  esc_html( __( 'Only buttons, inputs of type "submit" and links with "btn" or "button" class will be affected but only if they are not contained in the header navigation or in any other type of menu (sidebar menu, footer menu etc).' ) ) ;
?></p>
								</div>

								<div class="radio-option radio-sub-option">
									<div class="inputGroup">
										<input id="only_buttons" name="affecting-options" value="only_buttons" type="radio" <?php 
echo  ( 'only_buttons' === $options['affecting-options'] ? 'checked' : '' ) ;
?> />
										<label for="only_buttons"><?php 
echo  esc_html( __( 'Only buttons' ) ) ;
?></label>
									</div>
									<p><?php 
echo  esc_html( __( 'All buttons, inputs of type "submit", links and more generally all elements with "btn" or "button" class will be affected.' ) ) ;
?></p>
								</div>

								<div class="radio-option radio-sub-option">
									<div class="inputGroup">
										<input id="ev_not_menu" name="affecting-options" value="everything_not_menu" type="radio" <?php 
echo  ( 'everything_not_menu' === $options['affecting-options'] ? 'checked' : '' ) ;
?> />
										<label for="ev_not_menu"><?php 
echo  esc_html( __( 'Everything except menus' ) ) ;
?></label>
									</div>
									<p><?php 
echo  esc_html( __( 'Links, buttons, inputs of type "submit" wont be affected if they are contained in the header navigation or any type of menu (sidebar menu, footer menu etc).' ) ) ;
?></p>
								</div>

								<div class="radio-option radio-sub-option">
									<div class="inputGroup">
										<input id="everything" name="affecting-options" value="everything" type="radio" <?php 
echo  ( 'everything' === $options['affecting-options'] ? 'checked' : '' ) ;
?> />
										<label for="everything"><?php 
echo  esc_html( __( 'Everything' ) ) ;
?></label>
									</div>
									<p><?php 
echo  esc_html( __( 'Any and every link, button, input of type "submit" in your website will be transformed in a button with the selected hover effect.' ) ) ;
?></p>
								</div>

								<div class="radio-option radio-sub-option premium">
									<div class="inputGroup">
										<input id="only_to" name="affecting-options" type="radio" value="only_to" <?php 
echo  ( 'only_to' === $options['affecting-options'] ? 'checked' : '' ) ;
?> />
										<label for="only_to"><?php 
echo  esc_html( __( 'Only to...' ) ) ;
?></label>
									</div>
									<p><?php 
echo  esc_html( __( 'Ignore any other setting and apply the selected effect to this class only.' ) ) ;
?></p>
									<div id="only-to-class">
										<label for="only_class"><?php 
echo  esc_html( __( 'Please, type here your class name:' ) ) ;
?></label>
										<input type="text" id="only_class" name="only_class" value="<?php 
echo  ( isset( $options['only_class'] ) ? esc_html( $options['only_class'] ) : '' ) ;
?>" /><span id="warning-empty-value"></span>
										<p style="margin-left:0;"><?php 
echo  esc_html( __( 'Prefixing the class name with a dot is not important. Remember that you can only use one class: if you add more than one, only the first one will be used.' ) ) ;
?></p>
									</div>
								</div>
								<div class="radio-option radio-sub-option">
									<h3><?php 
echo  esc_html( __( 'Exclude one or more classes' ) ) ;
?></h3>
									<label for="excluded_classes"><?php 
echo  esc_html( __( 'Don\'t apply to following classes:' ) ) ;
?></label>
									<input type="text" id="excluded_classes" name="excluded_classes" value="<?php 
echo  ( isset( $options['excluded_classes'] ) ? esc_html( $options['excluded_classes'] ) : '' ) ;
?>" />
									<p><?php 
echo  esc_html( __( 'If you\'re not applying effect to only one specific class, you can type here a list of comma-separated classes you don\'t want the effect to be applied to. Any element with one or more of these classes will be ignored. You can use here any class used by WordPress or by your theme and even custom classes you manually added.' ) ) ;
?></p>
									<p><?php 
echo  wp_kses( __( 'Alternatively, you can just add the class <strong>norefbutton</strong> to every element you don\'t wont to be affected by the plugin.' ), $allowed_html ) ;
?></p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php 
$tab_class = 'premium';
$license_class = 'license-inactive';
$blurred = 'blurred';
?>
				<div class="row settings-row">
					<div class="col-12" style="position: relative;">
						<div class="settings-label <?php 
echo  esc_html( $tab_class ) ;
?>">
						<?php 
echo  esc_html( __( 'Using shortcodes' ) ) ;
?>
						</div>
						<?php 
?>
							<div class="premium-only">
								<h2>Shortcodes are a PREMIUM feature</h2>
								<a class="btn button-primary buy-button" href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons-pricing' ) ) ;
?>">Get PREMIUM now!</a>
							</div>
							<?php 
?>
						<div class="settings-content">
							<div class="radio-option <?php 
echo  esc_html( $blurred ) ;
?>">
								<p><?php 
echo  esc_html( __( 'Use shortcode everywhere you want using any page builder you prefer. You can use the Effect settings page as a shortcode builder and create as many shortcodes as you want using differnts effects even in the same website page. It\'s only up to you to keep a consistent look for your website.' ) ) ;
?></p>
								<ul class="shortcode-use">
									<li><?php 
echo  esc_html( __( 'Go to' ) ) ;
?> <a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons/effects' ) ) ;
?>&amp;tab=effects"><?php 
echo  esc_html( __( 'Effect settings page' ) ) ;
?></a></li>
									<li><?php 
echo  esc_html( __( 'Click on the effet you want to apply' ) ) ;
?></li>
									<li><?php 
echo  esc_html( __( 'Copy the shortcode shown below the button preview box' ) ) ;
?></li>
									<li><?php 
echo  esc_html( __( 'Paste the shortcode where ever you want in your website' ) ) ;
?></li>
								</ul>
								<p><?php 
echo  esc_html( __( 'You can use as many shortcodes as you want, even with different effects. Keep in mind that currently you can\'t customize other properties of your shortcodes: width, height, borders, colors etc will be the same for all your REF buttons.' ) ) ;
?></p>
							</div>

						</div>
					</div>
				</div>
				<!-- #endregion -->
				<div class="row settings-row">
					<div class="col-6">
					</div>
					<div class="col-6">
						<div class="warning">
							<div class="confirmMessage">
								<span class="dashicons dashicons-saved"></span>
								<span><?php 
echo  esc_html( __( 'Settings saved' ) ) ;
?></span>
							</div>
							<input type="submit" value="Save changes" class="button-primary save-changes" />
						</div>
					</div>
				</div>
			</div>
		</section>
	</form>
</div>
