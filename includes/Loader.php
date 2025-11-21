<?php

namespace AbandonedCartRecover;

class Loader {
	public static $distUrl;
	public static function isDev(): bool {
		return defined( 'ACR_DEV' ) && ACR_DEV;
	}

	public static function setDistUrl( string $url ) {
		self::$distUrl = $url;
	}

	public static function setGlobalAssetLoader() {
		wp_add_inline_script( 'acr-admin', 'function __acrAssetLoader(file){return acrApp.assetUrl + file}', 'before' );
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
			)
		);
	}

	public static function allowEsModule() {
		add_filter(
			'script_loader_tag',
			function ( $tag, $handle ) {

				if ( strpos( $handle, 'acr-' ) === 0 ) {
					// Ensure we only add a type module once and keep other attributes
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
			null,
			true
		);
	}

	public static function enqueueAdminDevScripts() {
		self::enqueueViteClient();
		wp_enqueue_script(
			'acr-admin',
			'http://localhost:5174/src/admin.ts',
			array( 'acr-vite-client' ),
			null
		);
		self::adminLocalizeScript();
		self::setGlobalAssetLoader();
	}

	public static function enqueueAdminProdScripts() {
		wp_enqueue_style( 'acr-admin-css', self::$distUrl . 'assets/admin.css', );
		wp_enqueue_script(
			'acr-admin',
			self::$distUrl . 'assets/admin.js',
			array(),
			null,
			true
		);
		self::adminLocalizeScript();
		self::setGlobalAssetLoader();
	}

	public static function enqueueFrontendDevScripts() {
		self::enqueueViteClient();
		wp_enqueue_script(
			'acr-frontend',
			'http://localhost:5174/src/frontend.ts',
			array( 'acr-vite-client' ),
		);
	}

	public static function enqueueFrontendProdScripts() {
		wp_enqueue_script(
			'acr-frontend',
			self::$distUrl . 'assets/frontend.js',
		);
	}

	public static function loadDevScripts() {
		add_action( 'admin_enqueue_scripts', array( self::class, 'enqueueAdminDevScripts' ) );
		add_action( 'wp_enqueue_scripts', array( self::class, 'enqueueFrontendDevScripts' ) );
	}

	public static function loadProdScripts() {
		add_action( 'admin_enqueue_scripts', array( self::class, 'enqueueAdminProdScripts' ) );
		add_action( 'wp_enqueue_scripts', array( self::class, 'enqueueFrontendProdScripts' ) );
	}
}
