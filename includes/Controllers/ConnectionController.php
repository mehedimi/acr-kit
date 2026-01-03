<?php

namespace ACRKit\Controllers;

use ACRKit\Rest;
use ACRKit\Support\Api;
use ACRKit\Support\Options;
use WP_REST_Request;

class ConnectionController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/connect',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'getConnectUrl' ),
				'permission_callback' => array( Rest::class, 'authCallback' ),
			)
		);

		register_rest_route(
			Rest::NAMESPACE,
			'/tokens',
			array(
				'methods'             => 'POST',
				'callback'            => array( self::class, 'createToken' ),
				'permission_callback' => array( self::class, 'tempTokenCallback' ),
			)
		);

		register_rest_route(
			Rest::NAMESPACE,
			'app-tokens',
			array(
				'methods'             => 'POST',
				'callback'            => array( self::class, 'setAppToken' ),
				'permission_callback' => array( Rest::class, 'tokenCallback' ),
				'args'                => array(
					'token' => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
						'validate_callback' => function ( $value ) {
							return is_string( $value ) && ! empty( $value );
						},
					),
				),
			)
		);
	}

	public static function getConnectUrl(): array {
		return array( 'redirectUrl' => Api::getConnectionUrl() );
	}

	public static function createToken(): array {
		return array( 'token' => Options::generateApiToken() );
	}

	public static function setAppToken( WP_REST_Request $request ): array {
		Options::setAppToken( $request->get_param( 'token' ) );

		return array( 'success' => true );
	}


	public static function tempTokenCallback( WP_REST_Request $request ): bool {
		$token = Options::getConnectionToken();

		if ( ! $token ) {
			return false;
		}

		Options::deleteConnectionToken();

		return hash_equals( $token, $request->get_header( 'X-Connection-Token' ) ?: '' );
	}
}
