<?php

namespace AbandonedCartRecover\Support;

use AbandonedCartRecover\ACR;
use AbandonedCartRecover\Rest;

class Api {

	public static function getConnectionUrl(): string {
		return ACR::getAppUrl() . '/stores/create?' . http_build_query(
			array(
				'type'     => 1, // 1 for woocommerce
				'token'    => Options::generateConnectionToken(),
				'name'     => get_bloginfo( 'name' ),
				'homeUrl'  => home_url(),
				'adminUrl' => admin_url(),
				'apiUrl'   => Rest::getApiUrl(),
			)
		);
	}
}
