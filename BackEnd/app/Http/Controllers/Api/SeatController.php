<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Booking;
use App\Models\Seat;


class SeatController extends Controller
{
    // public function availableSeats($tripId)
    // {
    //     $trip = Trip::with('bus.seats')->findOrFail($tripId);

    //     // جلب أرقام المقاعد المحجوزة لهذه الرحلة فقط
    //     $bookedSeatIds = Booking::where('trip_id', $tripId)
    //         ->pluck('seat_id')
    //         ->toArray();

    //     // تعديل كل مقعد لإضافة حقل status
    //     $seats = $trip->bus->seats->map(function ($seat) use ($bookedSeatIds) {
    //         $seat->status = in_array($seat->id, $bookedSeatIds) ? 'reserved' : 'empty';
    //         return $seat;
    //     })->keyBy('id'); // إعادة المفاتيح لتكون id المقعد

    //     return response()->json($seats);
    // }


public function availableSeats($tripId)
{
    try {
        $trip = Trip::with('bus')->findOrFail($tripId);

        $seats = Seat::where('bus_id', $trip->bus->id)->get();

        // جلب الحجوزات المدفوعة فقط (المحجوزة نهائيًا)
        $paidBookings = Booking::where('trip_id', $tripId)
            ->with('payment')
            ->get()
            ->filter(function ($booking) {
                return $booking->payment && $booking->payment->status === 'paid';
            })
            ->keyBy('seat_id');

        $formattedSeats = $seats->map(function ($seat) use ($paidBookings) {
            $booking = $paidBookings->get($seat->id);

            if ($booking) {
                // مدفوع → محجوز نهائي
                $status = 'paid'; // أو 'reserved' أو 'booked'
            } else {
                // غير مدفوع أو مفيش حجز → متاح
                $status = 'empty';
            }

            return [
                'id' => $seat->id,
                'seat_number' => $seat->seat_number,
                'status' => $status,
            ];
        });

        return response()->json($formattedSeats);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Something went wrong',
            'message' => $e->getMessage() // للـ debug فقط
        ], 500);
    }
}

}
