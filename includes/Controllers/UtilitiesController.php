<?php

namespace AbandonedCartRecover\Controllers;

use AbandonedCartRecover\Rest;
use AbandonedCartRecover\Utilities\Tab;
use WP_REST_Request;

class UtilitiesController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/utilities/tab',
			array(
				'methods'             => array( 'GET', 'PUT' ),
				'callback'            => array( self::class, 'tab' ),
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

	public static function tab( WP_REST_Request $request ) {
		if ( $request->get_method() === 'GET' ) {
			return Tab::getOrDefault();
		}

		Tab::save( $request->get_param( 'enabled' ), $request->get_param( 'config' ) );

		return array( 'ok' => true );
	}
}
