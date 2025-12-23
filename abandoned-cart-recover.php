<?php
/**
 * Plugin Name: Abandoned Cart Recover
 * Plugin URI:  https://abandonedcartrecover.com/
 * Description: Recover abandoned carts in WooCommerce with automated reminders and smart recovery links.
 * Version:     0.1.0
 * Author:      Mehedi Hasan
 * Author URI:  https://mehedi.im/
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: abandoned-cart-recover
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
 */

use AbandonedCartRecover\ACR;
use AbandonedCartRecover\Installer;
use AbandonedCartRecover\Loader;
use AbandonedCartRecover\Rest;
use AbandonedCartRecover\Support\Cart;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/vendor/autoload.php';

ACR::defineConstants();

Loader::setDistUrl( plugin_dir_url( __FILE__ ) . 'dist/' );
Loader::allowEsModule();

if ( Loader::isDev() ) {
	Loader::loadDevScripts();
} else {
	Loader::loadProdScripts();
}

if ( is_admin() ) {
	ACR::registerMenuPage();
	register_activation_hook( __FILE__, array( Installer::class, 'activation' ) );
} else {
	Cart::registerHooks();
}

Rest::init();
