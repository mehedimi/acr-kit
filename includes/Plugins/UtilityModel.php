<?php

namespace ACRKit\Plugins;

use Mehedi\WPQueryBuilder\DB;
use Mehedi\WPQueryBuilder\Query\Builder;

/**
 * @method static Builder select(...$columns)
 * @see Builder
 */
class UtilityModel {

	/**
	 * @param string $name
	 * @param array $arguments
	 * @return Builder
	 */
	public static function __callStatic( string $name, array $arguments ): Builder {
		return call_user_func_array( array( DB::table( 'acr_kit_utilities' ), $name ), $arguments );
	}
}
