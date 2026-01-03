<?php

namespace AbandonedCartRecover;

use AbandonedCartRecover\Support\Api;

class ACR {
	const VERSION = '0.3.0';

	public static function defineConstants() {
		if ( ! defined( 'ACR_APP_URL' ) ) {
			define( 'ACR_APP_URL', 'https://app.abandonedcartrecover.com' );
		}
	}
	public static function registerMenuPage() {
		add_action(
			'admin_menu',
			function () {
				add_submenu_page(
					'woocommerce',
					__( 'ACR Kit', 'acr-kit' ),
					__( 'ACR Kit', 'acr-kit' ),
					'manage_options',
					'acr-kit',
					function () {
						// Keeping the mount point ID unchanged to match existing JS entry (src/admin.ts).
						echo '<div style="margin-left: -20px" id="acr-admin-app"></div>';
					},
				);
			}
		);
	}

	public static function getAppUrl(): string {
		return ACR_APP_URL;
	}

	public static function uninstall() {
		Api::uninstall();
	}
}
