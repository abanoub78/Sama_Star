<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request)
    {
        return Booking::create([
            'user_id' => auth()->id(),
            'trip_id' => $request->trip_id,
            'seat_id' => $request->seat_id
        ]);
    }

    public function myBookings()
    {
        return Booking::with('trip')
            ->where('user_id', auth()->id())
            ->get();
    }
}

