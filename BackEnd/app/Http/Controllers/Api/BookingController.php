<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request)
    {
        $seatIds = $request->seat_ids; // array of seat IDs
        $bookings = [];

        foreach ($seatIds as $seatId) {
            $bookings[] = Booking::create([
                'user_id' => Auth::id(),
                'trip_id' => $request->trip_id,
                'seat_id' => $seatId,
            ]);
        }

        return response()->json($bookings, 201);
    }

    public function myBookings()
    {
        return Booking::with('trip')
            ->where('user_id', Auth::id())
            ->get();
    }
}
