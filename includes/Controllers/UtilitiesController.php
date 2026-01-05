<?php

namespace ACRKit\Controllers;

use ACRKit\Rest;
use ACRKit\Utilities\Utilities;
use WP_REST_Request;

class UtilitiesController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/utilities/(?P<type>tab|push)',
			array(
				'methods'             => array( 'GET', 'PUT' ),
				'callback'            => array( self::class, 'handle' ),
				'permission_callback' => array( Rest::class, 'authCallback' ),
				'args'                => array(
					'enabled' => array(
						'sanitize_callback' => 'rest_sanitize_boolean',
						'validate_callback' => function ( $value ) {
							return is_bool( $value );
						},
					),

					'config'  => array(
						'required'          => false,
						'sanitize_callback' => function ( $value ) {
							if ( is_array( $value ) ) {
								return $value;
							}

							return array();
						},
					),
				),
			)
		);
	}

	public static function handle( WP_REST_Request $request ) {
		$utility = Utilities::of( $request->get_param( 'type' ) );

		if ( $request->get_method() === 'GET' ) {
			return $utility->getOrDefault();
		}

		$utility->save( $request->get_param( 'enabled' ), $request->get_param( 'config' ) );

		return array( 'ok' => true );
	}
}
