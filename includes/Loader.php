<?php

namespace AbandonedCartRecover;

use AbandonedCartRecover\Support\Options;
use AbandonedCartRecover\Utilities\Tab;
use AbandonedCartRecover\Utilities\Utilities;

class Loader {
	public static string $distUrl;
	public static function isDev(): bool {
		return defined( 'ACR_DEV' ) && ACR_DEV;
	}

	public static function setDistUrl( string $url ) {
		self::$distUrl = $url;
	}

	public static function adminLocalizeScript() {
		wp_localize_script(
			'acr-admin',
			'acrApp',
			array(
				'apiUrl'   => Rest::getApiUrl(),
				'nonce'    => wp_create_nonce( 'wp_rest' ),
				'name'     => get_bloginfo( 'name' ),
				'homeUrl'  => home_url(),
				'assetUrl' => self::$distUrl,
				'appToken' => Options::getAppToken(),
				'appUrl'   => ACR::getAppUrl(),
				'locale'   => get_locale(),
				'currency' => get_woocommerce_currency(),
			)
		);
	}

	public static function frontendLocalizeScript() {
		wp_localize_script(
			'acr-frontend',
			'acrApp',
			array(
				'apiUrl'    => Rest::getApiUrl(),
				'nonce'     => wp_create_nonce( 'wp_rest' ),
				'utilities' => Utilities::toFrontEnd(),
			)
		);
	}

	public static function allowEsModule() {
		add_filter(
			'script_loader_tag',
			function ( $tag, $handle ) {

				if ( strpos( $handle, 'acr-' ) === 0 ) {
					// Ensure we only add a type module once and keep other attributes.
					if ( false === strpos( $tag, 'type=' ) ) {
						$tag = str_replace( '<script ', '<script type="module" ', $tag );
					}
				}
				return $tag;
			},
			10,
			3
		);
	}

	public static function enqueueViteClient() {
		wp_enqueue_script(
			'acr-vite-client',
			'http://localhost:5174/@vite/client',
			array(),
			null, // phpcs:ignore
			true
		);
	}

	public static function enqueueAdminDevScripts() {
		self::enqueueViteClient();
		wp_enqueue_script(
			'acr-admin',
			'http://localhost:5174/src/admin.ts',
			array( 'acr-vite-client' ),
			null, // phpcs:ignore
			true
		);
		self::adminLocalizeScript();
		wp_enqueue_media();
	}

	public static function enqueueAdminProdScripts() {
		wp_enqueue_style( 'acr-admin-css', self::$distUrl . 'assets/admin-PiXrwS6Z.css', array(), null );
		wp_enqueue_script(
			'acr-admin',
			self::$distUrl . 'assets/admin-BEG1TJ6-.js',
			array(),
			null,
			true
		);
		self::adminLocalizeScript();
		wp_enqueue_media();
	}

	public static function enqueueFrontendDevScripts() {
		self::enqueueViteClient();
		wp_enqueue_script(
			'acr-frontend',
			'http://localhost:5174/src/frontend.ts',
			array( 'acr-vite-client' ),
			null, // phpcs:ignore
			true
		);

		self::frontendLocalizeScript();
	}

	public static function enqueueFrontendProdScripts() {
		wp_enqueue_script(
			'acr-frontend',
			self::$distUrl . 'assets/frontend-0bJKT4OJ.js',
			array(),
			null,
			true
		);
		self::frontendLocalizeScript();
	}

	public static function loadDevScripts() {
		if ( is_admin() ) {
			add_action( 'admin_enqueue_scripts', array( self::class, 'enqueueAdminDevScripts' ) );
		} else {
			add_action( 'wp_enqueue_scripts', array( self::class, 'enqueueFrontendDevScripts' ) );
		}
	}

	public static function loadProdScripts() {
		if ( is_admin() ) {
			add_action( 'admin_enqueue_scripts', array( self::class, 'enqueueAdminProdScripts' ) );
		} else {
			add_action( 'wp_enqueue_scripts', array( self::class, 'enqueueFrontendProdScripts' ) );
		}
	}
}
