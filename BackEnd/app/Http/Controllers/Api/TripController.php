<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;


class TripController extends Controller
{
    public function index(Request $request)
    {
        return Trip::with(['route.fromCity','route.toCity','bus'])
            ->where('trip_date', $request->date)
            ->whereHas('route', function ($q) use ($request) {
                $q->where('from_city_id', $request->from)
                  ->where('to_city_id', $request->to);
            })->get();
    }

    public function show($id)
    {
        return Trip::with(['bus','bookings'])->findOrFail($id);
    }
}

