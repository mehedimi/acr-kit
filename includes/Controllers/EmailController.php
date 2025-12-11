<?php

namespace AbandonedCartRecover\Controllers;

use AbandonedCartRecover\Rest;
use WP_Error;
use WP_REST_Request;

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
}
