<?php

namespace ACRKit\Support;

class Options {

	public static function generateConnectionToken(): string {
		$token = hash_hmac( 'sha256', wp_generate_password( 12, false ), SECURE_AUTH_KEY );
		set_transient( 'acr_kit_connection_token', $token, 15 * MINUTE_IN_SECONDS );
		update_option( 'acr_kit_connected_by', get_current_user_id() );
		return $token;
	}

	public static function deleteConnectionToken() {
		delete_transient( 'acr_kit_connection_token' );
	}

	public static function getConnectionToken() {
		return get_transient( 'acr_kit_connection_token' );
	}

	public static function generateApiToken(): string {
		$token = hash_hmac( 'sha256', wp_generate_password( 32, false ), SECURE_AUTH_KEY );

		update_option( 'acr_kit_api_token', $token );

		return $token;
	}

	public static function getApiToken(): string {
		return get_option( 'acr_kit_api_token', '' );
	}

	public static function setAppToken( string $token ) {
		update_option( 'acr_kit_app_token', $token );
	}

	public static function getAppToken(): string {
		return get_option( 'acr_kit_app_token', '' );
	}

	public static function hasAppToken(): bool {
		return ! empty( self::getAppToken() );
	}
}
