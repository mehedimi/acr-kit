<?php

namespace AbandonedCartRecover;

class ACR {

	public static function defineConstants() {
		if ( ! defined( 'ACR_APP_URL' ) ) {
			define( 'ACR_APP_URL', 'https://app.abandonedcartrecover.com' );
		}
	}
	public static function registerMenuPage() {
		add_action(
			'admin_menu',
			function () {
				add_menu_page(
					__( 'Abandoned Cart Recover', 'abandoned-cart-recover' ),
					__( 'Abandoned Cart Recover', 'abandoned-cart-recover' ),
					'manage_options',
					'abandoned-cart-recover',
					function () {
						// Keeping the mount point ID unchanged to match existing JS entry (src/admin.ts)
						echo '<div style="margin-left: -20px" id="acr-admin-app"></div>';
					},
					'dashicons-cart',
					56
				);
			}
		);
	}

	public static function getAppUrl(): string {
		return ACR_APP_URL;
	}
}
