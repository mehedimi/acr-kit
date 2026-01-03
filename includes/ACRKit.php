<?php

namespace ACRKit;

use ACRKit\Support\Api;

class ACRKit {
	const VERSION = '0.3.0';

	public static function defineConstants() {
		if ( ! defined( 'ACR_KIT_APP_URL' ) ) {
			define( 'ACR_KIT_APP_URL', 'https://app.abandonedcartrecover.com' );
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
						echo '<div style="margin-left: -20px" id="acr-kit-admin-app"></div>';
					},
				);
			}
		);
	}

	public static function getAppUrl(): string {
		return ACR_KIT_APP_URL;
	}

	public static function uninstall() {
		Api::uninstall();
	}
}
