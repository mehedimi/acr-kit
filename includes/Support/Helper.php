<?php

namespace AbandonedCartRecover\Support;

class Helper {

	const KEYS = array( 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR' );

	public static function getIpAddress(): ?string {
		foreach ( self::KEYS as $key ) {
			if ( ! empty( $_SERVER[ $key ] ) ) {
				$ips = explode( ',', $_SERVER[ $key ] );
				foreach ( $ips as $ip ) {
					$ip = trim( $ip );
					if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
						return $ip;
					}
				}
			}
		}

		return null;
	}
}
