<?php

namespace AbandonedCartRecover\Support;

use AbandonedCartRecover\ACR;
use WP_Error;

/**
 * @method array|WP_Error get(string $path, array $query = [])
 * @method array|WP_Error post(string $path, array $data = [])
 * @method array|WP_Error patch(string $path, array $data = [])
 * @method array|WP_Error put(string $path, array $data = [])
 */
class AppHttp
{
    protected bool $isBlocking = false;

    public function blocking($state = true): AppHttp
    {
        $this->isBlocking = $state;

        return $this;
    }

    public function nonBlocking(): AppHttp
    {
        if ($this->isBlocking) {
            $this->isBlocking = false;
        }

        return $this;
    }


    public function __call(string $name, array $arguments)
    {
        $apiKey = Options::getAppToken();

        if (empty($apiKey)) {
            return new WP_Error('no_api_key', 'There is no API key set.');
        }

        if ($name === 'get' && isset($arguments[1])) {
            $arguments[0] .= '?' . http_build_query($arguments[1]);
        }

        return wp_remote_request(ACR::getAppUrl() . $arguments[0],[
            'method' => strtoupper($name),
            'body' => (isset($arguments[1]) && $name !== 'get') ? wp_json_encode($arguments[1]) : null,
            'blocking' => $this->isBlocking,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json; charset=utf-8',
                'Authorization' => 'Bearer ' . $apiKey,
                'X-Forwarded-For' => Helper::getIpAddress(),
            ]
        ]);
    }
}