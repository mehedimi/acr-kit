<?php

namespace ACRKit\Controllers;

use ACRKit\Rest;
use ACRKit\Support\Api;
use ACRKit\Support\Cart;
use WP_Error;
use WP_REST_Response;

class CartController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/ping',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'pingCart' ),
				'permission_callback' => array( Rest::class, 'nonceCallback' ),
			)
		);
	}

	/**
	 * Ping the cart.
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public static function pingCart() {
		wc_load_cart();

		if ( ! WC()->session ) {
			return new WP_Error( 'cart_not_found', 'Cart session is not loaded', array( 'status' => 400 ) );
		}

		$cartId = Cart::getCartId();

		if ( ! $cartId ) {
			return new WP_Error( 'cart_not_found', 'Cart not found', array( 'status' => 404 ) );
		}

		Api::pingCart( $cartId );

		return new WP_REST_Response( array( 'message' => 'pong' ) );
	}
}
