<?php

namespace AbandonedCartRecover\Utilities;

use Mehedi\WPQueryBuilder\DB;
use stdClass;

class Utilities {

	public string $of;

	public function __construct( string $of = 'tab' ) {
		$this->of = $of;
	}

	public static function of( string $of ): self {
		return new self( $of );
	}

	public function default(): array {
		return array(
			'enabled' => false,
			'config'  => new stdClass(),
		);
	}

	public function getOrDefault() {
		$data = DB::plugin( new \AbandonedCartRecover\Plugins\Utilities( $this->of ) )->first();

		if ( is_null( $data ) ) {
			return self::default();
		}

		$data->enabled = boolval( $data->enabled );
		$data->config  = json_decode( $data->config );

		return $data;
	}

	public function save( bool $enabled, $config ) {
		$config = wp_json_encode( $config );

		$inserted = DB::plugin( new \AbandonedCartRecover\Plugins\Utilities( $this->of ) )->insert(
			array(
				'name'    => $this->of,
				'enabled' => $enabled,
				'config'  => $config,
			),
			true
		);

		if ( $inserted ) {
			return true;
		}

		return DB::plugin( new \AbandonedCartRecover\Plugins\Utilities( $this->of ) )->update(
			array(
				'enabled' => $enabled,
				'config'  => $config,
			)
		);
	}

	public static function toFrontEnd(): array {
		$data = DB::plugin( new \AbandonedCartRecover\Plugins\Utilities() )
			->where( 'enabled', true )
			->get();

		return array_map(
			function ( $item ) {
				return json_decode( $item );
			},
			array_column( $data, 'config', 'name' )
		);
	}
}
