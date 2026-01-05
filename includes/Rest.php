<?php

namespace ACRKit;

use ACRKit\Controllers\CartController;
use ACRKit\Controllers\ConnectionController;
use ACRKit\Controllers\EmailController;
use ACRKit\Controllers\PushController;
use ACRKit\Controllers\SettingsController;
use ACRKit\Controllers\UtilitiesController;
use ACRKit\Support\Options;
use WP_REST_Request;

class Rest {

	const NAMESPACE = 'acr-kit/v1';

	public static function init() {
		add_action(
			'rest_api_init',
			function () {
				ConnectionController::register();
				CartController::register();
				EmailController::register();
				SettingsController::register();
				UtilitiesController::register();
				PushController::register();
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
