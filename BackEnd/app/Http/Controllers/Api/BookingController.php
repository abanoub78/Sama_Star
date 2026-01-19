<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;

class BookingController extends Controller
{
    // =========================
    // USER → حجز مقاعد
    // =========================
    public function store(StoreBookingRequest $request)
    {
        $bookings = [];

        foreach ($request->seat_ids as $seatId) {
            $bookings[] = Booking::create([
                'user_id' => Auth::id(),
                'trip_id' => $request->trip_id,
                'seat_id' => $seatId,
            ]);
        }

        return response()->json([
                'booking_ids' => collect($bookings)->pluck('id')
            ], 201);

    }

    // =========================
    // USER → يشوف حجوزاته
    // =========================
    public function myBookings()
    {
        return Booking::with([
            'seat',
            'trip.bus',
            'trip.route.fromCity',
            'trip.route.toCity'
        ])
        ->where('user_id', Auth::id())
        ->get();
    }

    // =========================
    // USER → يشوف تذكرة واحدة (Ticket)
    // =========================
    public function show($id)
    {
        $booking = Booking::with([
            'user',
            'seat',
            'trip.bus',
            'trip.route.fromCity',
            'trip.route.toCity'
        ])
        ->where('id', $id)
        ->where('user_id', Auth::id()) // أمان
        ->firstOrFail();

        return response()->json($booking);
    }

    // =========================
    // ADMIN → كل الحجوزات
    // =========================
    public function allBookings()
    {
        return Booking::with([
            'user',
            'seat',
            'trip.bus',
            'trip.route.fromCity',
            'trip.route.toCity'
        ])->get();
    }

    // =========================
    // USER → حذف حجزه
    // =========================
    public function destroyMyBooking($id)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $booking->delete();

        return response()->json(['message' => 'Booking deleted']);
    }

    // =========================
    // ADMIN → حذف أي حجز
    // =========================
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json(['message' => 'Booking deleted']);
    }
}
