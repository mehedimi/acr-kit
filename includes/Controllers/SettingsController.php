<?php

namespace ACRKit\Controllers;

use ACRKit\Rest;
use ACRKit\Support\Email;
use ACRKit\Support\OptionExt;
use WP_REST_Request;

class SettingsController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/settings/email',
			array(
				'methods'             => array( 'GET', 'PUT' ),
				'callback'            => array( self::class, 'email' ),
				'permission_callback' => array( Rest::class, 'authCallback' ),
				'args'                => array(
					'from_name'           => array(
						'required'          => false,
						'sanitize_callback' => 'sanitize_text_field',
						'validate_callback' => function ( $value ) {
							return empty( $value ) || is_string( $value );
						},
					),

					'from_email'          => array(
						'required'          => false,
						'sanitize_callback' => 'sanitize_email',
						'validate_callback' => function ( $value ) {
							return empty( $value ) || is_email( $value );
						},
					),

					'reply_to_name'       => array(
						'required'          => false,
						'sanitize_callback' => 'sanitize_text_field',
						'validate_callback' => function ( $value ) {
							return empty( $value ) || is_string( $value );
						},
					),

					'reply_to_email'      => array(
						'required'          => false,
						'sanitize_callback' => 'sanitize_email',
						'validate_callback' => function ( $value ) {
							return empty( $value ) || is_email( $value );
						},
					),

					'unsubscribe_page_id' => array(
						'required'          => false,
						'sanitize_callback' => 'absint',
					),
				),
			)
		);
	}

	public static function email( WP_REST_Request $request ): array {
		if ( $request->get_method() === 'GET' ) {
			return OptionExt::get( Email::getEmailAttrs() );
		}

		$data = Rest::getValidated( $request );

		OptionExt::set( $data );

		return array( 'ok' => true );
	}
}
