<?php

namespace ACRKit;

class Installer {

	public static function activation() {
		global $wpdb;

		$table_name      = $wpdb->prefix . 'acr_kit_utilities';
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
        name VARCHAR(50) NOT NULL,
        enabled TINYINT(1) NOT NULL DEFAULT 0,
        config LONGTEXT NOT NULL,
        PRIMARY KEY (name)
    ) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );

		update_option( 'acr_kit_version', ACRKit::VERSION );
	}
}
