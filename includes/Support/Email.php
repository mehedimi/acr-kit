<?php

namespace AbandonedCartRecover\Support;

use AbandonedCartRecover\Enum\ClientAction;

class Email {

	public static function openTrack() {
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) ) {
			return;
		}

		$cartId = sanitize_text_field( $_GET['acr_cart_id'] );
        $emailId = sanitize_text_field( $_GET['acr_email_id'] );

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

		$cartId  = sanitize_text_field( $_GET['acr_cart_id'] );
		$emailId = sanitize_text_field( $_GET['acr_email_id'] );
		$url     = Encryptor::decryptQueryParam( urldecode( $_GET['next'] ) );

        if( empty( $url ) ){
            $url = home_url();
        } else {
            Api::trackEmailClick( $emailId, $cartId );
        }

		wp_safe_redirect( $url );
		exit;
	}
}
