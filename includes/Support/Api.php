<?php

namespace AbandonedCartRecover\Support;

use AbandonedCartRecover\ACR;
use AbandonedCartRecover\Rest;
use WP_Error;

/**
 * Wrapper for the AppHttp class.
 *
 * We use this class to make the code more readable.
 *
 * @method static AppHttp blocking(bool $state = true)
 * @method static AppHttp nonBlocking()
 * @method static array|WP_Error get(string $path, array $query = [])
 * @method static array|WP_Error post(string $path, array $data = [])
 * @method static array|WP_Error patch(string $path, array $data = [])
 * @method static array|WP_Error put(string $path, array $data = [])
 *
 * @see AppHttp
 */
class Api {
	public static function __callStatic( string $name, array $arguments ) {
		$http = new AppHttp();

		return call_user_func_array( array( $http, $name ), $arguments );
	}

	public static function getConnectionUrl(): string {
		return ACR::getAppUrl() . '/stores/create?' . http_build_query(
			array(
				'type'     => 1, // 1 for woocommerce
				'token'    => Options::generateConnectionToken(),
				'name'     => get_bloginfo( 'name' ),
				'homeUrl'  => home_url(),
				'adminUrl' => admin_url(),
				'apiUrl'   => Rest::getApiUrl(),
			)
		);
	}

	public static function sendCart( ?string $carId, array $content ): ?string {
		$http = new AppHttp();

		$body = array_filter(
			$content,
			function ( $item ) {
				return ! is_null( $item );
			}
		);

		if ( is_null( $carId ) ) {
			$response = $http->blocking()->post( '/api/v1/carts', $body );

			$body = wp_remote_retrieve_body( $response );

			if ( is_wp_error( $body ) || ! ( wp_remote_retrieve_response_code( $response ) < 300 ) ) {
				return null;
			}

			return json_decode( $body )->data->id;
		} else {
			$http->patch( sprintf( '/api/v1/carts/%s', $carId ), $body );
			return null;
		}
	}

	public static function cartMarkAsCompleted( string $id, ?string $recoveredBy = null ) {
		self::nonBlocking()->patch(
			sprintf( '/api/v1/carts/%s/completed', $id ),
			array(
				'recoveredBy' => $recoveredBy,
			)
		);
	}

	/**
	 * @param string $id
	 * @return void
	 */
	public static function pingCart( string $id ) {
		self::patch( sprintf( '/api/v1/carts/%s/ping', $id ) );
	}

	public static function trackEmailOpen( string $emailId, string $cartId ) {
		self::nonBlocking()->patch( "/api/v1/recovery-emails/$emailId/carts/$cartId/open" );
	}

	public static function trackEmailClick( string $emailId, string $cartId ) {
		self::nonBlocking()->patch( "/api/v1/recovery-emails/$emailId/carts/$cartId/click" );
	}

	public static function uninstall() {
		self::nonBlocking()->post( '/api/v1/uninstall' );
	}
}
