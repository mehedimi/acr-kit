<?php

namespace AbandonedCartRecover\Controllers;

use AbandonedCartRecover\Rest;
use WP_REST_Request;

class PushController extends Controller
{
    public static function register()
    {
        register_rest_route(Rest::NAMESPACE, '/pushes/subscriptions', [
            'methods' => 'POST',
            'callback' => array(self::class, 'subscribe'),
            'permission_callback' => array(Rest::class, 'nonceCallback'),
            'args' => [
                'endpoint' => [
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Push service endpoint URL.',
                    'validate_callback' => function ( $value ) {
                        return is_string( $value )
                            && filter_var( $value, FILTER_VALIDATE_URL )
                            && strlen( $value ) <= 2048;
                    },
                    'sanitize_callback' => 'esc_url_raw',
                ],
                'public_key' => [
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Base64-encoded p256dh public key.',
                    'validate_callback' => function ( $value ) {
                        if ( ! is_string( $value ) ) {
                            return false;
                        }

                        $decoded = base64_decode( $value, true );

                        // p256dh must be 65 bytes (uncompressed P-256 key)
                        return $decoded !== false && strlen( $decoded ) === 65;
                    },
                    'sanitize_callback' => 'sanitize_text_field',
                ],

                'auth_token' => [
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Base64-encoded authentication secret.',
                    'validate_callback' => function ( $value ) {
                        if ( ! is_string( $value ) ) {
                            return false;
                        }

                        $decoded = base64_decode( $value, true );

                        // auth must be 16 bytes
                        return $decoded !== false && strlen( $decoded ) === 16;
                    },
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ]
        ]);
    }

    public static function subscribe(WP_REST_Request $request)
    {

    }
}