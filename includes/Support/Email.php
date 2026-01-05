<?php

namespace ACRKit\Support;

class Email {

	public static function openTrack() {
		// This is a public endpoint, and we do not perform any critical task, so we can skip the nonce check.
		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['acr_kit_cart_id'] ) || empty( $_GET['acr_kit_recovered_id'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		$cartId = sanitize_text_field( wp_unslash( $_GET['acr_kit_cart_id'] ) );
		// phpcs:ignore WordPress.Security.NonceVerification
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_kit_recovered_id'] ) );

		Api::trackOpen( $emailId, $cartId );

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
		// This is a public endpoint, and we do not perform any db writing, so we can skip the nonce check.
		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['acr_kit_cart_id'] ) || empty( $_GET['acr_kit_recovered_id'] ) || empty( $_GET['next'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		$cartId = sanitize_text_field( wp_unslash( $_GET['acr_kit_cart_id'] ) );
		// phpcs:ignore WordPress.Security.NonceVerification
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_kit_recovered_id'] ) );
        // phpcs:ignore WordPress.Security.NonceVerification
		$url = Encryptor::decryptQueryParam( urldecode( sanitize_text_field( wp_unslash( $_GET['next'] ) ) ) );

		if ( empty( $url ) ) {
			$url = home_url();
		} else {
			Api::trackClick( $emailId, $cartId );
		}

		// We have validated and checked it's a safe URL, so we can safely redirect.
        // phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect
		wp_redirect( $url );
		exit;
	}

	public static function unsubscribe() {
		// This is a public endpoint, and we do not perform any db write, so we can skip the nonce check.
		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_GET['acr_kit_cart_id'] ) || empty( $_GET['acr_kit_recovered_id'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		$cartId = sanitize_text_field( wp_unslash( $_GET['acr_kit_cart_id'] ) );
		// phpcs:ignore WordPress.Security.NonceVerification
		$emailId = sanitize_text_field( wp_unslash( $_GET['acr_kit_recovered_id'] ) );

		Api::nonBlocking()
			->patch( "/api/v1/recoveries/$emailId/carts/$cartId/unsubscribed" );

		$url = home_url();

		$unsubscribePageId = get_option( 'acr_kit_unsubscribe_page_id' );

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
