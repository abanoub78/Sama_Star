<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;


class PaymobService
{
    private function baseUrl()
    {
        return config('services.paymob.base_url');
    }

    public function authToken()
    {
        return Http::post($this->baseUrl() . '/auth/tokens', [
            'api_key' => config('services.paymob.api_key')
        ])->json('token');
    }

    public function createOrder($token, $amount)
    {
        return Http::post($this->baseUrl() . '/ecommerce/orders', [
            'auth_token' => $token,
            'delivery_needed' => false,
            'amount_cents' => $amount * 100,
            'currency' => config('services.paymob.currency'),
            'items' => []
        ])->json();
    }

    public function paymentKey($token, $orderId, $amount, $user, $method)
    {
        $integrationId = $method === 'wallet'
            ? config('services.paymob.wallet_integration_id')
            : config('services.paymob.card_integration_id');

        return Http::post($this->baseUrl() . '/acceptance/payment_keys', [
            'auth_token' => $token,
            'amount_cents' => $amount * 100,
            'expiration' => 3600,
            'order_id' => $orderId,
            'currency' => config('services.paymob.currency'),
            'integration_id' => $integrationId,
            'billing_data' => [
                'first_name' => $user->name,
                'last_name' => $user->name,
                'email' => $user->email,
                'phone_number' => $user->phone,
                'city' => 'Cairo',
                'country' => 'EG',
                'street' => 'NA',
                'building' => 'NA',
                'floor' => 'NA',
                'apartment' => 'NA',
            ]
        ])->json('token');
    }
}
