<?php
/**
 * Plugin Name: ACR Kit for WooCommerce
 * Plugin URI:  https://abandonedcartrecover.com/
 * Description: Recover abandoned carts in WooCommerce with automated reminders and smart recovery links.
 * Version:     0.5.0
 * Author:      Mehedi Hasan
 * Author URI:  https://mehedi.im/
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: acr-kit
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
 */

use ACRKit\ACRKit;
use ACRKit\Installer;
use ACRKit\Loader;
use ACRKit\Rest;
use ACRKit\Support\Cart;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/vendor/autoload.php';

ACRKit::defineConstants();

Loader::setDistUrl( plugin_dir_url( __FILE__ ) . 'dist/' );
Loader::allowEsModule();

if ( Loader::isDev() ) {
	Loader::loadDevScripts();
} else {
	Loader::loadProdScripts();
}

if ( is_admin() ) {
	ACRKit::registerMenuPage();
	register_activation_hook( __FILE__, array( Installer::class, 'activation' ) );
	add_filter(
		'plugin_action_links_' . plugin_basename( __FILE__ ),
		function ( array $links ) {
			return array_merge(
				array(
					'<a href="' . admin_url( 'admin.php?page=acr-kit' ) . '">Overview</a>',
				),
				$links
			);
		}
	);
} else {
	Cart::registerHooks();
}

Rest::init();
