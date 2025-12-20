<?php

namespace AbandonedCartRecover;

use AbandonedCartRecover\Controllers\CartController;
use AbandonedCartRecover\Controllers\ConnectionController;
use AbandonedCartRecover\Controllers\EmailController;
use AbandonedCartRecover\Controllers\SettingsController;
use AbandonedCartRecover\Controllers\UtilitiesController;
use AbandonedCartRecover\Support\Options;
use WP_REST_Request;

class Rest {

	const NAMESPACE = 'abandoned-cart-recover/v1';

	public static function init() {
		add_action(
			'rest_api_init',
			function () {
				ConnectionController::register();
				CartController::register();
				EmailController::register();
				SettingsController::register();
				UtilitiesController::register();
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

	public static function nonceCallback( WP_REST_Request $request ): bool {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		return $nonce && wp_verify_nonce( $nonce, 'wp_rest' );
	}

	public static function getValidated( WP_REST_Request $request ): array {
		$allowed = array_keys( $request->get_attributes()['args'] );
		return array_intersect_key(
			$request->get_params(),
			array_flip( $allowed )
		);
	}
}
