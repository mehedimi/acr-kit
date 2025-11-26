<?php

namespace AbandonedCartRecover\Support;

use WC_Product_Variation;

class Cart {

	protected static function getCartId() {
		return WC()->session->get( 'acr_cart_id' );
	}

	protected static function setCartId( $cartId ) {
		WC()->session->set( 'acr_cart_id', $cartId );
	}

	protected static function resetCartId() {
		WC()->session->set( 'acr_cart_id', null );
	}

	public static function registerHooks(): void {
		add_action( 'woocommerce_cart_updated', array( self::class, 'handleCartChanges' ) );
		add_action( 'woocommerce_store_api_checkout_order_processed', array( self::class, 'afterCheckout' ) );
		add_action( 'woocommerce_checkout_order_created', array( self::class, 'afterCheckout' ) );
	}

	public static function handleCartChanges() {
		if ( ! WC()->cart || ! WC()->session || ! WC()->customer ) {
			return;
		}

		$cartId = self::getCartId();

		$payload = array(
			'lineItems'  => self::getCartItems(),
			'isGuest'    => get_current_user_id() === 0,
			'firstName'  => WC()->customer->get_billing_first_name() ?: WC()->customer->get_first_name(),
			'lastName'   => WC()->customer->get_billing_last_name() ?: WC()->customer->get_last_name(),
			'email'      => WC()->customer->get_billing_email() ?: WC()->customer->get_email(),
			'phone'      => WC()->customer->get_billing_phone(),
			'currency'   => get_woocommerce_currency(),
			'totalPrice' => WC()->cart->get_total( 'edit' ) ?: 0,
		);

		error_log( json_encode( $payload, JSON_PRETTY_PRINT ) );

		if ( empty( $payload['lineItems'] ) ) {
			return;
		}

		$hash = md5( json_encode( $payload ) );

		if ( $hash === WC()->session->get( 'acr_cart_hash' ) ) {
			return;
		}

		WC()->session->set( 'acr_cart_hash', $hash );

		if ( $id = Api::sendCart( $cartId, $payload ) ) {
			self::setCartId( $id );
		}
	}

	protected static function getCartItems(): array {
		return array_map(
			function ( $item ) {
				/** @var \WC_Product $product */
				$product = $item['data'];
				$data    = array(
					'id'          => (string) $item['product_id'],
					'name'        => $product->get_name(),
					'price'       => (float) $product->get_price(),
					'quantity'    => (int) $item['quantity'],
					'tax'         => $item['line_tax'] ?? 0,
					'thumbnailSm' => wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_gallery_thumbnail' ),
					'thumbnailMd' => wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_single' ),
				);

				if ( $product instanceof WC_Product_Variation ) {
					$data['variationId'] = (string) $item['variation_id'];
					$data['variation']   = $item['variation'];
				}

				return $data;
			},
			array_values( WC()->cart->get_cart() )
		);
	}

	public static function afterCheckout() {
		error_log( 'afterCheckout' );
		$id = self::getCartId();
		error_log( 'afterCheckout: ' . $id );
		if ( is_null( $id ) ) {
			return;
		}

		self::resetCartId();
		WC()->session->set( 'acr_cart_hash', null );
		Api::cartMarkAsCompleted( $id );
	}
}
