<?php
/**
 * Plugin Name: Cartnail
 * Plugin URI:  https://example.com/cartnail
 * Description: Recover abandoned carts in WooCommerce with automated reminders and smart recovery links.
 * Version:     0.1.0
 * Author:      Cartnail
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cartnail
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Constants
define('CARTNAIL_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CARTNAIL_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CARTNAIL_DIST_DIR', CARTNAIL_PLUGIN_DIR . 'dist/');
define('CARTNAIL_DIST_URL', CARTNAIL_PLUGIN_URL . 'dist/');

// You can change this port if your Vite dev server runs on a different one.
if (!defined('CARTNAIL_VITE_DEV_SERVER')) {
    define('CARTNAIL_VITE_DEV_SERVER', 'http://localhost:5174');
}

/**
 * Check whether the Vite dev server is running.
 * We probe the special Vite HMR client endpoint. Timeouts are short to avoid slowing WP.
 */
function cartnail_is_dev_server_running(): bool
{
    // Allow overriding via constant/env if needed
    if (defined('CARTNAIL_FORCE_PROD') && CARTNAIL_FORCE_PROD) {
        return false;
    }

    $url = rtrim(CARTNAIL_VITE_DEV_SERVER, '/') . '/@vite/client';
    $resp = wp_remote_get($url, [
        'timeout' => 0.3,
        'headers' => [ 'Accept' => 'text/javascript' ],
    ]);

    if (is_wp_error($resp)) {
        return false;
    }

    $code = wp_remote_retrieve_response_code($resp);
    return $code >= 200 && $code < 300;
}

/**
 * Add type="module" to our Vite script handles.
 */
function cartnail_add_module_type_attribute($tag, $handle, $src)
{
    if (strpos($handle, 'cartnail-') === 0) {
        // Ensure we only add a type module once and keep other attributes
        if (false === strpos($tag, 'type=')) {
            $tag = str_replace('<script ', '<script type="module" ', $tag);
        }
    }
    return $tag;
}
add_filter('script_loader_tag', 'cartnail_add_module_type_attribute', 10, 3);

/**
 * Enqueue assets for the site frontend.
 */
function cartnail_enqueue_frontend_assets()
{
    if (cartnail_is_dev_server_running()) {
        // Vite dev: load HMR client and entry as ESM
        wp_enqueue_script(
            'cartnail-vite-client',
            rtrim(CARTNAIL_VITE_DEV_SERVER, '/') . '/@vite/client',
            [],
            null,
            true
        );

        wp_enqueue_script(
            'cartnail-frontend',
            rtrim(CARTNAIL_VITE_DEV_SERVER, '/') . '/src/frontend.ts',
            ['cartnail-vite-client'],
            null,
            true
        );
    } else {
        // Production build from dist
        $frontend_js = CARTNAIL_DIST_DIR . 'assets/frontend.js';
        if (file_exists($frontend_js)) {
            wp_enqueue_script(
                'cartnail-frontend',
                CARTNAIL_DIST_URL . 'assets/frontend.js',
                [],
                filemtime($frontend_js),
                true
            );
        }

        // Enqueue any CSS emitted by Vite (best-effort).
        $css_dir = CARTNAIL_DIST_DIR . 'assets/';
        if (is_dir($css_dir)) {
            $css_files = glob($css_dir . '*.css');
            if (!empty($css_files)) {
                foreach ($css_files as $i => $css_file) {
                    $handle = 'cartnail-style-' . ($i + 1);
                    wp_enqueue_style(
                        $handle,
                        CARTNAIL_DIST_URL . 'assets/' . basename($css_file),
                        [],
                        filemtime($css_file)
                    );
                }
            }
        }
    }
}
add_action('wp_enqueue_scripts', 'cartnail_enqueue_frontend_assets');

/**
 * Enqueue assets for wp-admin screens.
 */
function cartnail_enqueue_admin_assets($hook_suffix)
{
    if (cartnail_is_dev_server_running()) {
        wp_enqueue_script(
            'cartnail-vite-client-admin',
            rtrim(CARTNAIL_VITE_DEV_SERVER, '/') . '/@vite/client',
            [],
            null,
            true
        );

        wp_enqueue_script(
            'cartnail-admin',
            rtrim(CARTNAIL_VITE_DEV_SERVER, '/') . '/src/admin.ts',
            ['cartnail-vite-client-admin'],
            null,
            true
        );
    } else {
        $admin_js = CARTNAIL_DIST_DIR . 'assets/admin.js';
        if (file_exists($admin_js)) {
            wp_enqueue_script(
                'cartnail-admin',
                CARTNAIL_DIST_URL . 'assets/admin.js',
                [],
                filemtime($admin_js),
                true
            );
        }

        // Admin can share the same CSS files as frontend build
        $css_dir = CARTNAIL_DIST_DIR . 'assets/';
        if (is_dir($css_dir)) {
            $css_files = glob($css_dir . '*.css');
            if (!empty($css_files)) {
                foreach ($css_files as $i => $css_file) {
                    $handle = 'cartnail-admin-style-' . ($i + 1);
                    wp_enqueue_style(
                        $handle,
                        CARTNAIL_DIST_URL . 'assets/' . basename($css_file),
                        [],
                        filemtime($css_file)
                    );
                }
            }
        }
    }
}
add_action('admin_enqueue_scripts', 'cartnail_enqueue_admin_assets');

/**
 * Optional: register a minimal admin page to have a mount point in wp-admin.
 */
function cartnail_register_admin_page()
{
    add_menu_page(
        __('Cartnail', 'cartnail'),
        __('Cartnail', 'cartnail'),
        'manage_options',
        'cartnail',
        function () {
            echo '<div id="cartnail-admin-app"></div>';
        },
        'dashicons-cart',
        56
    );
}
add_action('admin_menu', 'cartnail_register_admin_page');
