<?php

namespace ACRKit\Utilities;

use Mehedi\WPQueryBuilder\DB;

class Utilities {

	public static function toFrontEnd(): array {
		$data = DB::plugin( new \ACRKit\Plugins\Utilities() )
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
