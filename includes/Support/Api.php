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

	public static function sendCart( ?string $carId, array $content ) {
		if ( ! Options::hasAppToken() ) {
			return;
		}

		$response = wp_remote_request(
			sprintf( '%s/api/v1/carts/%s', ACR::getAppUrl(), $carId ),
			array(
				'method'   => is_null( $carId ) ? 'POST' : 'PATCH',
				'body'     => wp_json_encode( array_filter( $content ) ),
				'blocking' => is_null( $carId ),
				'headers'  => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . Options::getAppToken(),
					'Accept'        => 'application/json',
				),
			)
		);

		if ( ! is_null( $carId ) ) {
			return;
		}

		$body = wp_remote_retrieve_body( $response );

		if ( is_wp_error( $body ) ) {
			return;
		}

		$id = json_decode( $body )->data->id;

		WC()->session->set( 'acr_cart_id', $id );
	}
}
