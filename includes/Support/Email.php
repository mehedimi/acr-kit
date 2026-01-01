<?php

namespace AbandonedCartRecover\Support;

class Email {

	public static function openTrack() {
		// This is a public endpoint, and we do not perform any critical task, so we can skip the nonce check.
        // phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) ) {
			return;
		}

        // phpcs:ignore WordPress.Security.NonceVerification
		$cartId = sanitize_text_field( wp_unslash( $_GET['acr_cart_id'] ) );
        // phpcs:ignore WordPress.Security.NonceVerification
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_email_id'] ) );

		Api::trackEmailOpen( $emailId, $cartId );

		header( 'Content-Type: image/gif' );
		header( 'Cache-Control: no-cache, no-store, must-revalidate' );
		header( 'Pragma: no-cache' );
		header( 'Expires: 0' );

		// Return a 1x1 transparent pixel.
        // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode,WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode,WordPress.Security.EscapeOutput.OutputNotEscaped
		echo base64_decode( 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' );
		exit;
	}

	public static function clickTrack() {
		// This is a public endpoint, and we do not perform any critical task, so we can skip the nonce check.
        // phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) || empty( $_GET['next'] ) ) {
			return;
		}

        // phpcs:ignore WordPress.Security.NonceVerification
		$cartId = sanitize_text_field( wp_unslash( $_GET['acr_cart_id'] ) );
        // phpcs:ignore WordPress.Security.NonceVerification
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_email_id'] ) );
        // phpcs:ignore WordPress.Security.NonceVerification
		$url = Encryptor::decryptQueryParam( urldecode( sanitize_text_field( wp_unslash( $_GET['next'] ) ) ) );

		if ( empty( $url ) ) {
			$url = home_url();
		} else {
			Api::trackEmailClick( $emailId, $cartId );
		}

		// no more unsafely redirecting to external sites, before redirecting we are verifying the url.
		// phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect
		wp_redirect( $url );
		exit;
	}

	public static function unsubscribe() {
		// This is a public endpoint, and we do not perform any critical task, so we can skip the nonce check.
        // phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['acr_cart_id'] ) || empty( $_GET['acr_email_id'] ) ) {
			return;
		}

        // phpcs:ignore WordPress.Security.NonceVerification
		$cartId = sanitize_text_field( wp_unslash( $_GET['acr_cart_id'] ) );
        // phpcs:ignore WordPress.Security.NonceVerification
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
