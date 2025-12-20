<?php

namespace AbandonedCartRecover\Utilities;

use AbandonedCartRecover\Plugins\Utilities;
use Mehedi\WPQueryBuilder\DB;
use stdClass;

class Tab {

	public static function default(): array {
		return array(
			'enabled' => false,
			'config'  => new stdClass(),
		);
	}

	public static function getOrDefault() {
		$data = DB::plugin( new Utilities( 'tab' ) )->first();

		if ( is_null( $data ) ) {
			return self::default();
		}

		$data->enabled = boolval( $data->enabled );
		$data->config  = json_decode( $data->config );

		return $data;
	}

	public static function save( bool $enabled, $config ) {
		$config = wp_json_encode( $config );

		$inserted = DB::plugin( new Utilities( 'tab' ) )->insert(
			array(
				'name'    => 'tab',
				'enabled' => $enabled,
				'config'  => $config,
			),
			true
		);

		if ( $inserted ) {
			return true;
		}

		return DB::plugin( new Utilities( 'tab' ) )->update(
			array(
				'enabled' => $enabled,
				'config'  => $config,
			)
		);
	}
}
