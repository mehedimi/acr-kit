<?php

namespace AbandonedCartRecover\Support;

class Encryptor {

	protected static string $cipher = 'aes-256-cbc';

	private static function getKey(): string {
		return hash( 'sha256', wp_salt(), true );
	}

	private static function getHmacKey(): string {
		return hash( 'sha256', 'hmac_' . wp_salt(), true );
	}

	public static function encryptQueryParam( string $data ): string {
		$key = self::getKey();

		$iv_length = openssl_cipher_iv_length( self::$cipher );
		$iv        = openssl_random_pseudo_bytes( $iv_length, $crypto_strong );

		if ( ! $crypto_strong ) {
			return '';
		}

		$encrypted = openssl_encrypt(
			$data,
			self::$cipher,
			$key,
			OPENSSL_RAW_DATA,
			$iv
		);

		if ( false === $encrypted ) {
			return '';
		}

		$combined = $iv . $encrypted;

		$hmac          = hash_hmac( 'sha256', $combined, self::getHmacKey(), true );
		$authenticated = $hmac . $combined;

		return rtrim( strtr( base64_encode( $authenticated ), '+/', '-_' ), '=' );
	}

	public static function decryptQueryParam( string $encryptedData ) {
		$key = self::getKey();

		$decoded = base64_decode( strtr( $encryptedData, '-_', '+/' ) );

		if ( false === $decoded || strlen( $decoded ) < 32 ) {
			return false;
		}

		$hmac     = substr( $decoded, 0, 32 );
		$combined = substr( $decoded, 32 );

		$expected_hmac = hash_hmac( 'sha256', $combined, self::getHmacKey(), true );
		if ( ! hash_equals( $expected_hmac, $hmac ) ) {
			return '';
		}

		$iv_length = openssl_cipher_iv_length( self::$cipher );

		if ( strlen( $combined ) < $iv_length ) {
			return '';
		}

		$iv        = substr( $combined, 0, $iv_length );
		$encrypted = substr( $combined, $iv_length );

		return openssl_decrypt(
			$encrypted,
			self::$cipher,
			$key,
			OPENSSL_RAW_DATA,
			$iv
		) ?: '';
	}
}
