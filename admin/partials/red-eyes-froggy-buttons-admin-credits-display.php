<?php

/**
 * Provides credits for the CSS code.
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
<div id="refbuttons-general" class="refbuttons-settings wrap">
	<div id="ref-header">
	<img src="<?php 
echo  esc_html( RED_EYES_FROGGY_BUTTONS_PLUGIN_IMAGES_URL ) ;
?>logo-plugin.png" alt="Red Eyes Froggy Buttons logo" />

	</div>

	<nav class="nav-tab-wrapper woo-nav-tab-wrapper">
	<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons' ) ) ;
?>&amp;tab=general" class="nav-tab"><?php 
echo  esc_html( __( 'General' ) ) ;
?></a>
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons/effects' ) ) ;
?>&amp;tab=effects" class="nav-tab"><?php 
echo  esc_html( __( 'Effects' ) ) ;
?></a>
		<a href="<?php 
echo  esc_url( admin_url( 'admin.php?page=red-eyes-froggy-buttons/credits' ) ) ;
?>&amp;tab=credits" class="nav-tab nav-tab-active"><?php 
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

	<section>

		<div class="settingsbox">
			<div classs="row">
				<div class="col-12">
					<?php 
require RED_EYES_FROGGY_BUTTONS_PLUGIN_PATH . 'admin/partials/credits.php';
?>
				</div>

			</div>
		</div>
	</section>
</div>
