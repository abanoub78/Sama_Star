<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PaymobService;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;


class PaymentController extends Controller
{
    public function pay($bookingId, PaymobService $paymob)
    {
        $booking = Booking::with('trip')->where('user_id', Auth::id())->findOrFail($bookingId);

        $amount = $booking->trip->price;

        $payment = Payment::create([
            'user_id' => Auth::id(),
            'booking_id' => $booking->id,
            'method' => request('method'), // visa | wallet
            'amount' => $amount,
        ]);

        $token = $paymob->authToken();
        $order = $paymob->createOrder($token, $amount);

        $paymentKey = $paymob->paymentKey(
            $token,
            $order['id'],
            $amount,
            Auth::user(),
            request('method')
        );

        $payment->update([
            'order_id' => $order['id']
        ]);

        return response()->json([
            'iframe_url' =>
                "https://accept.paymob.com/api/acceptance/iframes/"
                . config('services.paymob.iframe_id')
                . "?payment_token=$paymentKey"
        ]);
    }

    public function webhook()
    {
        $data = request()->all();

        if (!isset($data['obj']['success'])) return response()->json();

        $payment = Payment::where('order_id', $data['obj']['order']['id'])->first();

        if (!$payment) return response()->json();

        if ($data['obj']['success']) {
            $payment->update([
                'status' => 'paid',
                'transaction_id' => $data['obj']['id']
            ]);

            $payment->booking->update(['status' => 'paid']);
        } else {
            $payment->update(['status' => 'failed']);
        }

        return response()->json(['ok' => true]);
    }

//     public function webhook(Request $request)
// {
//     $hmac = $request->hmac;
//     $calculated = hash_hmac(
//         'sha512',
//         collect($request->except('hmac'))->sortKeys()->implode(''),
//         config('services.paymob.hmac')
//     );

//     if ($hmac !== $calculated) {
//         return response()->json(['error' => 'Invalid HMAC'], 403);
//     }

//     $data = $request->input('obj');

//     $payment = Payment::where('order_id', $data['order']['id'])->first();
//     if (!$payment) return response()->json();

//     if ($data['success']) {
//         $payment->update([
//             'status' => 'paid',
//             'transaction_id' => $data['id']
//         ]);
//         $payment->booking->update(['status' => 'paid']);
//     } else {
//         $payment->update(['status' => 'failed']);
//     }

//     return response()->json(['ok' => true]);
// }

public function callback(Request $request)
{
    $params = http_build_query($request->all());
    return redirect("http://localhost:4200/payment-result?$params");
}

}
