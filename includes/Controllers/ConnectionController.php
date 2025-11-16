<?php

namespace AbandonedCartRecover\Controllers;

use AbandonedCartRecover\Rest;

class ConnectionController extends Controller {

	public static function register() {
		register_rest_route(
			Rest::NAMESPACE,
			'/connect',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'connect' ),
				'permission_callback' => array( Rest::class, 'authCallback' ),
			)
		);
	}

	public function connect() {

	}
}
