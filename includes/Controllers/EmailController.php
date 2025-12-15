<?php

namespace AbandonedCartRecover\Controllers;

use AbandonedCartRecover\Enum\ClientAction;
use AbandonedCartRecover\Rest;
use AbandonedCartRecover\Support\Api;
use AbandonedCartRecover\Support\Encryptor;
use DOMDocument;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class EmailController extends Controller {
	static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/email/send',
			array(
				'methods'             => 'POST',
				'callback'            => array( self::class, 'sendEmail' ),
				'permission_callback' => array( Rest::class, 'tokenCallback' ),
				'args'                => array(
					'to'      => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return is_email( $param );
						},
						'sanitize_callback' => 'sanitize_email',
					),
					'subject' => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return ! empty( $param ) && strlen( $param ) <= 200;
						},
						'sanitize_callback' => 'sanitize_text_field',
					),
					'content' => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return ! empty( $param );
						},
					),
				),
			)
		);

		register_rest_route(
			Rest::NAMESPACE,
			'/emails/(?P<emailId>[0-9a-hjkmp-tv-zA-HJKMNP-TV-Z]{26})',
			array(
				'methods'             => 'PATCH',
				'callback'            => array( self::class, 'updateEmailBody' ),
				'permission_callback' => array( Rest::class, 'authCallback' ),
				'args'                => array(
					'body' => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return ! empty( $param );
						},
					),
				),
			)
		);
	}

	public static function sendEmail( WP_REST_Request $request ) {
		$to      = $request->get_param( 'to' );
		$subject = $request->get_param( 'subject' );
		$content = $request->get_param( 'content' );

		// Set email headers for HTML
		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			'From: ' . get_bloginfo( 'name' ) . ' <' . get_bloginfo( 'admin_email' ) . '>',
		);

		// Send email using wp_mail
		$sent = wp_mail( $to, $subject, $content, $headers );

		if ( $sent ) {
			return array(
				'message' => 'Email sent successfully',
			);
		} else {
			return new WP_Error(
				'email_failed',
				'Failed to send email',
			);
		}
	}

	public static function updateEmailBody( WP_REST_Request $request ): WP_REST_Response {
		$emailId = $request->get_param( 'emailId' );

		$baseUrl = get_home_url() . '?' . http_build_query(
			array(
				'acr_action' => ClientAction::CLICK_EMAIL,
				'acr_cart_id'    => '__ACR_CART_ID__',
                'acr_email_id'   => $emailId
			)
		);

		$allLinks = self::getAllLinks( $request->get_param( 'body' ) );

		$newContent = str_replace(
			$allLinks,
			array_map(
				function ( string $link ) use ( $baseUrl ) {
					return $baseUrl . '&next=' . Encryptor::encryptQueryParam( $link );
				},
				$allLinks
			),
			$request->get_param( 'body' )
		);

		Api::nonBlocking()->patch(
			'/api/v1/recovery/emails/' . $emailId,
			array(
				'body'     => $newContent,
				'template' => $request->get_param( 'template' ),
			)
		);

		return new WP_REST_Response( array( 'ok' => true ) );
	}

	protected static function getAllLinks( string $html ): array {
		libxml_use_internal_errors( true );

		$dom = new DOMDocument();
		$dom->loadHTML( $html, LIBXML_NOERROR | LIBXML_NOWARNING );

		$links = array();
		foreach ( $dom->getElementsByTagName( 'a' ) as $a ) {
			$href = $a->getAttribute( 'href' );
			if ( str_starts_with( $href, 'https://' ) ) {
				$links[] = $href;
			}
		}

		libxml_clear_errors();

		return array_values( array_unique( $links ) );
	}
}
