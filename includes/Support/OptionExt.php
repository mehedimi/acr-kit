<?php

namespace AbandonedCartRecover\Support;

use Mehedi\WPQueryBuilder\DB;

class OptionExt {

	protected static string $prefix = 'acr_';

	public static function set( array $options, $autoload = 'no' ) {
		foreach ( $options as $key => $value ) {
			$insert = DB::table( 'options' )->insert(
				array(
					'option_name'  => self::$prefix . $key,
					'option_value' => $value,
					'autoload'     => $autoload,
				),
				true
			);

			if ( ! $insert ) {
				DB::table( 'options' )
					->where( 'option_name', self::$prefix . $key )
					->update( array( 'option_value' => $value ) );
			}
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
