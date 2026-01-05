<?php

namespace ACRKit\Plugins;

use Mehedi\WPQueryBuilder\Contracts\Pluggable;
use Mehedi\WPQueryBuilder\Query\Builder;

class UtilitiesPlugin implements Pluggable {

	protected ?string $name;

	public function __construct( ?string $name = null ) {
		$this->name = $name;
	}

	public function apply( Builder $builder ): Builder {
		$builder->from( 'acr_kit_utilities' );

		if ( ! is_null( $this->name ) ) {
			$builder->where( 'name', $this->name );
		}

		return $builder;
	}
}
