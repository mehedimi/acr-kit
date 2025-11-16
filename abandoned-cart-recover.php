<?php
/**
 * Plugin Name: Abandoned Cart Recover
 * Plugin URI:  https://example.com/abandoned-cart-recover
 * Description: Recover abandoned carts in WooCommerce with automated reminders and smart recovery links.
 * Version:     0.1.0
 * Author:      Abandoned Cart Recover
 * Author URI:  https://example.com
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: abandoned-cart-recover
 */

use AbandonedCartRecover\ACR;
use AbandonedCartRecover\Loader;
use AbandonedCartRecover\Rest;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/vendor/autoload.php';

Loader::setDistUrl( plugin_dir_url( __FILE__ ) . 'dist/' );
Loader::allowEsModule();

if ( Loader::isDev() ) {
	Loader::loadDevScripts();
} else {
	Loader::loadProdScripts();
}

ACR::registerMenuPage();

Rest::init();
