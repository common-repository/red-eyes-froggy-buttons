<?php

/**
 * Provide a admin area view to configure effects
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
echo  esc_html( RED_EYES_FROGGY_BUTTONS_PLUGIN_IMAGES_URL ) ;
?>logo-plugin.png" alt="Red Eyes Froggy Buttons logo" />

	</div>
	<nav class="nav-tab-wrapper woo-nav-tab-wrapper">
		<a href="<?php 
echo  esc_html( admin_url( 'admin.php?page=red-eyes-froggy-buttons' ) ) ;
?>" class="nav-tab">General</a>
		<a href="<?php 
echo  esc_html( admin_url( 'admin.php?page=red-eyes-froggy-buttons/effects' ) ) ;
?>" class="nav-tab nav-tab-active">Effects</a>
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
$options = get_option( 'refbuttons_options' );
$active_effect = $options['effect'];

if ( false !== strpos( $active_effect, 'free' ) ) {
    $active_tab = 'free-tab';
} elseif ( false !== strpos( $active_effect, 'premium' ) ) {
    $active_tab = 'premium-tab';
} else {
    $active_tab = 'special-tab';
}

$message = filter_input(
    INPUT_GET,
    'message',
    FILTER_CALLBACK,
    array(
    'options' => 'esc_html',
)
);
if ( '' === $active_tab ) {
    $active_tab = 'free-tab';
}
$current_page = 'red-eyes-froggy-buttons/effects';
$hidden = '';
if ( 1 === intval( $message ) ) {
    ?>
		<div id='message' class='updated fade'>
			<p><strong>Settings Saved</strong></p>
		</div>
	<?php 
}
?>


	<form id="refbutton-settings-form-effects" method="post" action="admin-post.php">
		<input type="hidden" name="action" value="save_refbuttons_options" />
		<input type="hidden" id="current_page" name="current_page" value="<?php 
echo  esc_html( $current_page ) ;
?>" />
		<input type="hidden" name="active_tab" id="active_tab" value="<?php 
echo  esc_html( $active_tab ) ;
?>" />
		<input type="hidden" name="contrasted-text-color" id="contrasted-text-color" value="" />
		<?php 
wp_nonce_field( 'refbuttonsoptions' );
?>
		<?php 
$autocolor = $options['autocolor'];
$button_class = 'free';
$tab_class = 'premiun';
$my_id = 'would-create-shortcode';
$license_class = 'license-inactive';
$plan_class = 'premium';
?>
		<section>

			<div class="settingsbox">
				<div class="row settings-row">
					<div class="col-12">
						<div id="saving-overlay">
							<div id="loader-container">
								<div class="colorful"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="row settings-row">
					<div class="col-6">
						<h2><?php 
echo  esc_html( __( 'Button Effect Settings' ) ) ;
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
				<div class="row settings-row">
					<div class="col-12">
					</div>
				</div>
				<div class="row properties-controls">
					<div class="col-3">
						<h3 class="text-center">Preview</h3>
						<div id="preview-wrapper">
							<div id="preview-container">
								<div id="preview-box">
									<div class="wp-block-buttons <?php 
echo  esc_html( $button_class ) ;
?>">
										<div class="wp-block-button">
											<a class="wp-block-button__link">
												Hover me!
												<div class="liquid"></div>
												<div class="button__horizontal"></div>
												<div class="button__vertical"></div>
												<div class="blob-btn__inner">
													<div class="blob-btn__blobs">
														<span class="blob-btn__blob"></span>
														<span class="blob-btn__blob"></span>
														<span class="blob-btn__blob"></span>
														<span class="blob-btn__blob"></span>
													</div>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
							<h4>Preview background color</h4>
							<input type="text" id="preview-background-color" class="color-picker" data-alpha-enabled="true" data-alpha-reset="true" data-alpha-color-type="hex" data-default-color="rgba(0,0,0,1)" name="preview-background-color" value="<?php 
echo  ( isset( $options['preview-background-color'] ) && !empty($options['preview-background-color']) ? esc_html( $options['preview-background-color'] ) : '#ffffff' ) ;
?>" />
							<?php 
?>
							<div class="shortcode-wrapper free">
								<span id="shortcode">Shortcodes are available in the <span class='premiumspan'>PREMIUM</span> version.<br>Shortcode for the effect "<?php 
echo  esc_html( $options['effect'] ) ;
?>" will be shown here.</span>
							</div>
								<?php 
?>
						</div>
					</div>
					<div class="col-6">
						<h3>General settings</h3>
						<div class="button-props">
							<tbody>
								<div class="table-row">
									<div class="table-column" id="btn-width">
										<h4>Button min width</h4>
										<div>
											<input class="range-slider_range" type="range" min="10" max="400" step="1" id="button-width" name="button-width" value="<?php 
echo  ( isset( $options['button-width'] ) ? esc_html( $options['button-width'] ) : '0' ) ;
?>" />
											<span class="range-slider_value">
												<span class="decrease"> - </span>
												<span class="range-value"><?php 
echo  ( isset( $options['button-width'] ) ? esc_html( $options['button-width'] ) : '0' ) ;
?></span>
												<span class="increase"> + </span>
											</span>
										</div>
									</div>
									<div class="table-column" id="btn-height">
										<h4>Button min height</h4>
										<div>
											<input class="range-slider_range" type="range" min="10" step="1" id="button-height" name="button-height" value="<?php 
echo  ( isset( $options['button-height'] ) ? esc_html( $options['button-height'] ) : '0' ) ;
?>" />
											<span class="range-slider_value">
												<span class="decrease"> - </span>
												<span class="range-value"><?php 
echo  ( isset( $options['button-height'] ) ? esc_html( $options['button-height'] ) : '0' ) ;
?></span>
												<span class="increase"> + </span>
											</span>
										</div>
									</div>
								</div>
								<div class="table-row">
									<div class="table-column" id="brd-width">
										<h4>Border width</h4>
										<div>
											<input class="range-slider_range" type="range" min="0" max="10" step="1" id="border-width" name="border-width" value="<?php 
echo  ( isset( $options['border-width'] ) ? esc_html( $options['border-width'] ) : '1' ) ;
?>" />
											<span class="range-slider_value">
												<span class="decrease"> - </span>
												<span class="range-value"><?php 
echo  ( isset( $options['border-width'] ) ? esc_html( $options['border-width'] ) : '1' ) ;
?></span>
												<span class="increase"> + </span>
											</span>
										</div>
									</div>
									<div class="table-column" id="brd-radius">
										<h4>Border radius</h4>
										<div>
											<input class="range-slider_range" type="range" min="0" max="50" step="1" id="border-radius" name="border-radius" value="<?php 
echo  ( isset( $options['border-radius'] ) ? esc_html( $options['border-radius'] ) : '0' ) ;
?>" />
											<span class="range-slider_value">
												<span class="decrease"> - </span>
												<span class="range-value"><?php 
echo  ( isset( $options['border-radius'] ) ? esc_html( $options['border-radius'] ) : '0' ) ;
?></span>
												<span class="increase"> + </span>
											</span>
										</div>
									</div>
								</div>
								<div class="table-row">
									<div class="table-column" id="animation-duration">
										<h4>Animation duration</h4>
										<div>
											<input class="range-slider_range" type="range" min="0" max="2" step="0.1" id="transition" name="transition" value="<?php 
echo  ( isset( $options['transition'] ) ? esc_html( $options['transition'] ) : '0' ) ;
?>" />
											<span class="range-slider_value">
												<span class="decrease"> - </span>
												<span class="range-value"><?php 
echo  ( isset( $options['transition'] ) ? esc_html( $options['transition'] ) : '0' ) ;
?></span>
												<span class="increase"> + </span>
											</span>
										</div>
									</div>
								</div>
								<div class="table-row bg-lines-controls">
									<div class="table-column" id="bg-lines-controls">
										<h4>Background lines width</h4>
										<div>
											<input class="range-slider_range" type="range" min="1" max="40" step="1" id="bg-lines-width" name="bg-lines-width" value="<?php 
echo  ( isset( $options['bg-lines-width'] ) ? esc_html( $options['bg-lines-width'] ) : '10' ) ;
?>" />
											<span class="range-slider_value">
												<span class="decrease"> - </span>
												<span class="range-value"><?php 
echo  ( isset( $options['bg-lines-width'] ) ? esc_html( $options['bg-lines-width'] ) : '10' ) ;
?></span>
												<span class="increase"> + </span>
											</span>
										</div>
									</div>
								</div>
								<?php 
?>
								<div class="shadows-controls">
									<div class="switch-holder">
										<div class="switch-label">
											<span>Shadow inset</span>
										</div>
										<div class="switch-toggle">
											<input type="checkbox" id="inset-toggler" name="shadow-inset" <?php 
echo  ( 'on' === $options['shadow-inset'] ? 'checked' : '' ) ;
?>>
											<label for="inset-toggler"></label>
										</div>
									</div>
								</div>
							</tbody>
						</div>

					</div>

					<div class="col-3">
						<div style="display:flex;justify-content:space-between;align-items:baseline;">
							<h3 class="text-center">Colors settings</h3>
							<?php 
?>
						</div>


						<div id="auto-colors-table" class="table colors">
							<div class="thead">
								<div class="table-row">
									<div class="table-column">Main color</div>
								</div>
							</div>

							<div class="tbody">
								<div class="table-row">
									<div id="mn-color" class="table-column">
										<input type="text" id="main-color" class="color-picker" data-alpha-enabled="true" data-alpha-reset="true" data-alpha-color-type="rgba" data-default-color="rgba(0,0,0,1)" name="default-color" value="<?php 
echo  ( isset( $options['default-color'] ) && !empty($options['default-color']) ? esc_html( $options['default-color'] ) : 'rgba(0,0,0,1)' ) ;
?>" />

										<input type="hidden" name="default-color-a" id="main-color-a" value="" />
									</div>
								</div>
								<div class="table-row">
									<div class="table-column">
										Set the base color for your buttons and let us do the rest!
									</div>
								</div>
							</div>
						</div>
						<?php 
?>
					</div>
				</div>

				<div class="row settings-row">
					<div class="col-12">
						<h3>Effect to apply</h3>
						<div class="mynotice"></div>
						<nav class="nav-tab-wrapper-effect">
							<a href="#" data-target="free-tab" class="nav-tab effect-tab">Free</a>
							<a href="#" data-target="premium-tab" class="nav-tab effect-tab <?php 
echo  esc_html( $plan_class ) ;
?> <?php 
echo  esc_html( $license_class ) ;
?>">Premium</a> 
							<a href="#" data-target="special-tab" class="nav-tab effect-tab <?php 
echo  esc_html( $plan_class ) ;
?> <?php 
echo  esc_html( $license_class ) ;
?>">Special</a>
						</nav>
						<div class="tab-content effect-content">
							<div id="free-tab" class="tab-panel effect-panel active">
							<div class="radios-container">
									<?php 
require RED_EYES_FROGGY_BUTTONS_PLUGIN_PATH . 'admin/partials/fx-free-effects.php';
?>
								</div>
							</div>

							<div id="premium-tab" class="tab-panel effect-panel 
							<?php 
if ( 'premium-tab' === $active_tab ) {
    ?> active<?php 
}
//phpcs:ignore
?>">
								<div class="radios-container">
								<?php 
?>
								</div>
							</div>

							<div id="special-tab" class="tab-panel effect-panel 
							<?php 
if ( 'special-tab' === $active_tab ) {
    ?> active<?php 
}
//phpcs:ignore
?>">
								<div class="radios-container">
									<?php 
?>
								</div>
							</div>
						</div>
					</div>
				</div>
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
	<!-- popup get Pro -->
	<div id="upgrade-popup" class="popup-wrapper">
		<div class="popup-container">
			<div class="row">
				<div class="col-12">
					<div class="popup-header">
						<img src="<?php 
echo  esc_html( RED_EYES_FROGGY_BUTTONS_PLUGIN_IMAGES_URL ) ;
?>logo-plugin.png" alt="Red Eyes Froggy Buttons logo" />
						<h2>Get Premium version now!</h2>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="popup-body">

						<div class="row">
							<div class="col-12 col-popup">
								<div><img src="<?php 
echo  esc_html( RED_EYES_FROGGY_BUTTONS_PLUGIN_IMAGES_URL ) ;
?>banner-772x250.jpg" alt="Red Eyes Froggy Buttons" /></div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-popup">
								<p>Buy a Premium license now, get all available stunning hover effects and take full control over your buttons!</p>
							</div>
						</div>
						<div class="row">
							<div class="col-6 col-popup">
								<a class="btn button-primary close-button" href="#">Close</a>
							</div>
							<div class="col-6 col-popup">
								<p><a class="btn button-primary buy-button" href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons-pricing' ) ) ;
?>" target="_blank">Get PREMIUM now!</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">

		</div>
	</div>
</div>
