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

        $bookedSeats = Booking::where('trip_id', $tripId)
            ->pluck('seat_id')
            ->toArray();

        return $trip->bus->seats->whereNotIn('id', $bookedSeats);
    }
}
