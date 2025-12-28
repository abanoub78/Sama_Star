<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Booking;
class SeatController extends Controller
{
    public function availableSeats($tripId)
    {
        $trip = Trip::with('bus.seats')->findOrFail($tripId);

        // جلب أرقام المقاعد المحجوزة لهذه الرحلة فقط
        $bookedSeatIds = Booking::where('trip_id', $tripId)
            ->pluck('seat_id')
            ->toArray();

        // تعديل كل مقعد لإضافة حقل status
        $seats = $trip->bus->seats->map(function ($seat) use ($bookedSeatIds) {
            $seat->status = in_array($seat->id, $bookedSeatIds) ? 'reserved' : 'empty';
            return $seat;
        })->keyBy('id'); // إعادة المفاتيح لتكون id المقعد

        return response()->json($seats);
    }
}
