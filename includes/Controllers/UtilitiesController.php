<?php

namespace AbandonedCartRecover\Controllers;

use WP_REST_Request;
use AbandonedCartRecover\Rest;
use AbandonedCartRecover\Utilities\Utilities;

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
		$tab = Utilities::of( $request->get_param( 'type' ) );

		if ( $request->get_method() === 'GET' ) {
			return $tab->getOrDefault();
		}

		$tab->save( $request->get_param( 'enabled' ), $request->get_param( 'config' ) );

		return array( 'ok' => true );
	}
}
