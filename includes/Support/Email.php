<?php

namespace AbandonedCartRecover\Support;

use Mehedi\WPQueryBuilder\DB;

class Email {

	public static function openTrack() {
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) ) {
			return;
		}

		$cartId  = sanitize_text_field( wp_unslash( $_GET['acr_cart_id'] ) );
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_email_id'] ) );

		Api::trackEmailOpen( $emailId, $cartId );

		header( 'Content-Type: image/gif' );
		header( 'Cache-Control: no-cache, no-store, must-revalidate' );
		header( 'Pragma: no-cache' );
		header( 'Expires: 0' );

		// Return a 1x1 transparent pixel.
		echo base64_decode( 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' );
		exit;
	}

	public static function clickTrack() {
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) || empty( $_GET['next'] ) ) {
			return;
		}

		$cartId  = sanitize_text_field( wp_unslash( $_GET['acr_cart_id'] ) );
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_email_id'] ) );
		$url     = Encryptor::decryptQueryParam( urldecode( sanitize_text_field( wp_unslash( $_GET['next'] ) ) ) );

		if ( empty( $url ) ) {
			$url = home_url();
		} else {
			Api::trackEmailClick( $emailId, $cartId );
		}

		wp_safe_redirect( $url );
		exit;
	}

	public static function unsubscribe() {
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) ) {
			return;
		}

		$cartId  = sanitize_text_field( wp_unslash( $_GET['acr_cart_id'] ) );
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_email_id'] ) );

		Api::nonBlocking()
			->patch( "/api/v1/recovery-emails/$emailId/carts/$cartId/unsubscribe" );

		$url = home_url();

		$unsubscribePageId = get_option( 'acr_unsubscribe_page_id' );

		if ( ! empty( $unsubscribePageId ) ) {
			$pageUrl = get_permalink( $unsubscribePageId );
			if ( ! empty( $pageUrl ) ) {
				$url = $pageUrl;
			}
		}

		wp_safe_redirect( $url );
		exit;
	}

	public static function getEmailOptions(): array {
		$options = DB::table( 'options' )
			->whereIn( 'option_name', array_map( fn( $attr ) => 'acr_' . $attr, self::getEmailAttrs() ) )
			->get();

		return array_column(
			array_map(
				function ( $option ) {
					$option->option_name = str_replace( 'acr_', '', $option->option_name );
					return (array) $option;
				},
				$options
			),
			'option_value',
			'option_name'
		);
	}


	public static function getEmailAttrs(): array {
		return array(
			'unsubscribe_page_id',
			'from_email',
			'from_name',
			'reply_to_email',
			'reply_to_name',
		);
	}
}
