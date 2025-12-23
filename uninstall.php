<?php

use AbandonedCartRecover\ACR;
use Mehedi\WPQueryBuilder\DB;
use Mehedi\WPQueryBuilder\Query\Grammar;

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

ACR::uninstall();

// Delete all acr_* options
DB::table( 'options' )
	->where( 'option_name', 'like', 'acr_%' )
	->delete();

// Delete the plugin's tables
DB::statement( sprintf( 'DROP TABLE IF EXISTS %sacr_utilities', Grammar::getInstance()->getTablePrefix() ) );
