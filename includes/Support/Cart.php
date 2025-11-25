<?php

namespace AbandonedCartRecover\Support;

class Cart {

	public static function registerHooks(): void {
		add_action( 'woocommerce_cart_updated', array( self::class, 'handleCartChanges' ) );
		add_action( 'woocommerce_checkout_create_order', array( self::class, 'afterCheckout' ) );
	}

	public static function handleCartChanges() {
		if ( ! WC()->cart || ! WC()->session || ! WC()->customer ) {
			return;
		}

		$cartId = WC()->session->get( 'acr_cart_id' );

		$payload = array(
			'lineItems'  => self::getCartItems(),
			'ipAddress'  => Helper::getIpAddress(),
			'isGuest'    => get_current_user_id() === 0,
			'firstName'  => WC()->customer->get_first_name() ?: WC()->customer->get_billing_first_name(),
			'lastName'   => WC()->customer->get_last_name() ?: WC()->customer->get_billing_last_name(),
			'email'      => WC()->customer->get_email() ?: WC()->customer->get_billing_email(),
			'phone'      => WC()->customer->get_billing_phone(),
			'currency'   => get_woocommerce_currency(),
			'totalPrice' => WC()->cart->get_total( 'edit' ) ?: 0,
		);

		Api::sendCart( $cartId, $payload );
	}

	protected static function getCartItems(): array {
		return array_map(
			function ( $item ) {
				$product = $item['data'];
				error_log( get_class( $product ) );
				return array(
					'id'          => (string) $product->get_id(),
					'name'        => $product->get_name(),
					'price'       => (float) $product->get_price(),
					'quantity'    => (int) $item['quantity'],
					'tax'         => (float) wc_get_price_including_tax( $product ) - $product->get_price(),
					'thumbnailSm' => wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_gallery_thumbnail' ),
					'thumbnailMd' => wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_single' ),
				);
			},
			array_values( WC()->cart->get_cart() )
		);
	}

	public static function afterCheckout() {
	}
}
