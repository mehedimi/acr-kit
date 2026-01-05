<?php

namespace ACRKit\Controllers;

use ACRKit\Rest;
use ACRKit\Support\Api;
use ACRKit\Support\Cart;
use WP_Error;
use WP_REST_Request;

class PushController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/push/subscriptions',
			array(
				'methods'             => 'PUT',
				'callback'            => array( self::class, 'subscribe' ),
				'permission_callback' => array( Rest::class, 'nonceCallback' ),
				'args'                => array(
					'endpoint'   => array(
						'required'          => true,
						'type'              => 'string',
						'description'       => 'Push service endpoint URL.',
						'validate_callback' => function ( $value ) {
							return is_string( $value )
								&& filter_var( $value, FILTER_VALIDATE_URL )
								&& strlen( $value ) <= 2048;
						},
						'sanitize_callback' => 'sanitize_url',
					),
					'public_key' => array(
						'required'          => true,
						'type'              => 'string',
						'description'       => 'Base64-encoded p256dh public key.',
						'validate_callback' => function ( $value ) {
							if ( ! is_string( $value ) ) {
								return false;
							}

							$decoded = base64_decode( $value, true );

							// p256dh must be 65 bytes (uncompressed P-256 key)
							return $decoded !== false && strlen( $decoded ) === 65;
						},
						'sanitize_callback' => 'sanitize_text_field',
					),

					'auth_token' => array(
						'required'          => true,
						'type'              => 'string',
						'description'       => 'Base64-encoded authentication secret.',
						'validate_callback' => function ( $value ) {
							if ( ! is_string( $value ) ) {
								return false;
							}

							$decoded = base64_decode( $value, true );

							// auth must be 16 bytes
							return $decoded !== false && strlen( $decoded ) === 16;
						},
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);
	}

	public static function subscribe( WP_REST_Request $request ) {
		wc_load_cart();

		$cartId = Cart::getCartId();

		if ( empty( $cartId ) ) {
			return new WP_Error( 'cart_not_found', 'Cart not found', array( 'status' => 404 ) );
		}

		$response = Api::put(
			'/api/v1/push-subscriptions',
			array(
				'endpoint'  => $request->get_param( 'endpoint' ),
				'cartId'    => $cartId,
				'publicKey' => $request->get_param( 'public_key' ),
				'authToken' => $request->get_param( 'auth_token' ),
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return array( 'ok' => true );
	}
}
