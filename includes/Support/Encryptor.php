<?php

namespace AbandonedCartRecover\Support;

class Encryptor {

    private static string $cipher = 'aes-256-cbc';

    /**
     * Get encryption key from WordPress salts
     */
    private static function getKey(): string {
        return hash('sha256', wp_salt(), true); // Binary output for key
    }

    /**
     * Get HMAC key (separate from encryption key)
     */
    private static function getHmacKey(): string {
        return hash('sha256', 'hmac_' . wp_salt(), true);
    }

    /**
     * Encrypt a string with authentication
     */
    public static function encryptQueryParam(string $data): string {
        $key = self::getKey();

        // Generate IV
        $iv_length = openssl_cipher_iv_length(self::$cipher);
        $iv = openssl_random_pseudo_bytes($iv_length, $crypto_strong);

        if (!$crypto_strong) {
            return '';
        }

        // Encrypt the data
        $encrypted = openssl_encrypt(
            $data,
            self::$cipher,
            $key,
            OPENSSL_RAW_DATA,
            $iv
        );

        if ($encrypted === false) {
            return '';
        }

        // Combine IV and encrypted data
        $combined = $iv . $encrypted;

        // Add HMAC for authentication
        $hmac = hash_hmac('sha256', $combined, self::getHmacKey(), true);
        $authenticated = $hmac . $combined;

        // Use base64 URL-safe encoding
        return rtrim(strtr(base64_encode($authenticated), '+/', '-_'), '=');
    }

    /**
     * Decrypt and verify a string
     */
    public static function decryptQueryParam(string $encryptedData) {
        $key = self::getKey();

        // Decode base64 URL-safe
        $decoded = base64_decode(strtr($encryptedData, '-_', '+/'));

        if ($decoded === false || strlen($decoded) < 32) {
            return false;
        }

        // Extract HMAC and data
        $hmac = substr($decoded, 0, 32);
        $combined = substr($decoded, 32);

        // Verify HMAC
        $expected_hmac = hash_hmac('sha256', $combined, self::getHmacKey(), true);
        if (!hash_equals($expected_hmac, $hmac)) {
            return false; // Tampered data
        }

        // Extract IV and encrypted data
        $iv_length = openssl_cipher_iv_length(self::$cipher);

        if (strlen($combined) < $iv_length) {
            return false;
        }

        $iv = substr($combined, 0, $iv_length);
        $encrypted = substr($combined, $iv_length);

        // Decrypt
        return openssl_decrypt(
            $encrypted,
            self::$cipher,
            $key,
            OPENSSL_RAW_DATA,
            $iv
        );
    }
}