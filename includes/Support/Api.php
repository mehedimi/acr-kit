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

	public static function sendCart( string $sessionId, array $content ) {
		wp_remote_request(
			sprintf( '%s/api/v1/carts/%s', ACR::getAppUrl(), $sessionId ),
			array(
				'method'   => 'PUT',
				'body'     => wp_json_encode( array_filter( $content ) ),
				'blocking' => false,
				'headers'  => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . Options::getAppToken(),
					'Accept'        => 'application/json',
				),
			)
		);
	}
}
