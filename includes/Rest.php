<?php

namespace AbandonedCartRecover;

use AbandonedCartRecover\Controllers\ConnectionController;
use AbandonedCartRecover\Support\Options;
use WP_REST_Request;

class Rest {

	const NAMESPACE = 'abandoned-cart-recover/v1';

	public static function init() {
		add_action(
			'rest_api_init',
			function () {
				ConnectionController::register();
			}
		);
	}

	public static function getApiUrl(): string {
		return esc_url_raw( rest_url() ) . self::NAMESPACE;
	}

	public static function authCallback(): bool {
		return current_user_can( 'manage_options' );
	}

	public static function tokenCallback( WP_REST_Request $request ): bool {
		return hash_equals( Options::getApiToken(), $request->get_header( 'X-API-KEY' ) ?: '' );
	}
}
