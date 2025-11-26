<?php

namespace AbandonedCartRecover\Support;

use AbandonedCartRecover\ACR;
use AbandonedCartRecover\Rest;

class Api {
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

	/**
	 * @param string|null $carId
	 * @param array       $content
	 * @return null|string
	 */
	public static function sendCart( ?string $carId, array $content ): ?string {
		if ( ! Options::hasAppToken() ) {
			return null;
		}

		$response = wp_remote_request(
			sprintf( '%s/api/v1/carts/%s', ACR::getAppUrl(), $carId ),
			array(
				'method'   => is_null( $carId ) ? 'POST' : 'PATCH',
				'body'     => wp_json_encode(
					array_filter(
						$content,
						function ( $item ) {
							return ! is_null( $item );
						}
					)
				),
				'blocking' => is_null( $carId ),
				'headers'  => array(
					'Content-Type'    => 'application/json',
					'Authorization'   => 'Bearer ' . Options::getAppToken(),
					'Accept'          => 'application/json',
					'X-Forwarded-For' => Helper::getIpAddress(),
				),
			)
		);

		if ( ! is_null( $carId ) ) {
			return null;
		}

		$body = wp_remote_retrieve_body( $response );

		if ( is_wp_error( $body ) ) {
			error_log( $body );
			return null;
		}

		return json_decode( $body )->data->id;
	}

	public static function cartMarkAsCompleted( string $id ) {
		if ( ! Options::hasAppToken() ) {
			return null;
		}

		wp_remote_request(
			sprintf( '%s/api/v1/carts/%s/completed', ACR::getAppUrl(), $id ),
			array(
				'method'  => 'PATCH',
				'headers' => array(
					'Content-Type'    => 'application/json',
					'Authorization'   => 'Bearer ' . Options::getAppToken(),
					'Accept'          => 'application/json',
					'X-Forwarded-For' => Helper::getIpAddress(),
				),
			)
		);
	}

	/**
	 * @param string $id
	 * @return object|\WP_Error
	 */
	public static function getCart( string $id ) {
		if ( ! Options::hasAppToken() ) {
			return new \WP_Error( 'no_token', 'No token found' );
		}

		$response = wp_remote_request(
			sprintf( '%s/api/v1/carts/%s', ACR::getAppUrl(), $id ),
			array(
				'method'  => 'GET',
				'headers' => array(
					'Content-Type'    => 'application/json',
					'Authorization'   => 'Bearer ' . Options::getAppToken(),
					'Accept'          => 'application/json',
					'X-Forwarded-For' => Helper::getIpAddress(),
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return json_decode( wp_remote_retrieve_body( $response ) )->data;
	}
}
