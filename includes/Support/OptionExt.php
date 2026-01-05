<?php

namespace ACRKit\Support;

use Mehedi\WPQueryBuilder\DB;

class OptionExt {

	protected static string $prefix = 'acr_kit_';

	public static function set( array $options ) {
		foreach ( $options as $key => $value ) {
			update_option( self::$prefix . $key, $value );
		}
	}

	public static function get( array $keys ): array {
		$hasNoDefault = isset( $keys[0] );
		$k            = $hasNoDefault ? $keys : array_keys( $keys );
		$rows         = DB::table( 'options' )
			->whereIn( 'option_name', array_map( fn( $i ) => self::$prefix . $i, $k ) )
			->get();

		$rows = array_map(
			function ( $row ) {
				$row->option_name = substr( $row->option_name, strlen( self::$prefix ) );
				return $row;
			},
			$rows
		);

		$options = array_column( $rows, 'option_value', 'option_name' );

		if ( $hasNoDefault ) {
			return $options;
		}

		return array_merge( $keys, $options );
	}
}
