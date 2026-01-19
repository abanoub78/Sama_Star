<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;


class TripController extends Controller
{
    public function index(Request $request)
{
    $query = Trip::with(['route.fromCity', 'route.toCity', 'bus', 'driver']);

    // Apply filters if they exist
    if ($request->has('from') && $request->has('to')) {
        $query->whereHas('route', function ($q) use ($request) {
            $q->where('from_city_id', $request->from)
              ->where('to_city_id', $request->to);
        });
    }

    if ($request->has('date')) {
        $query->where('trip_date', $request->date);
    }

    return $query->get();
}


public function show($id)
{
    return Trip::with(['route.fromCity', 'route.toCity', 'bus', 'driver', 'bookings'])->findOrFail($id);
}
public function store(Request $request)
{
    $validated = $request->validate([
        'route_id'       => 'required|exists:routes,id',
        'bus_id'         => 'required|exists:buses,id',
        'driver_id'      => 'required|exists:drivers,id',
        'trip_date'      => 'required|date',
        'departure_time' => 'required',
        'arrival_time'   => 'required',
        'price'          => 'required|numeric|min:0',
    ]);

    $trip = Trip::create($validated);

    return response()->json(
        $trip->load(['route.fromCity', 'route.toCity', 'bus', 'driver']),
        201
    );
}

public function update(Request $request, $id)
{
    $trip = Trip::findOrFail($id);

    $trip->update([
        'route_id'        => $request->route_id,
        'bus_id'          => $request->bus_id,
        'driver_id'       => $request->driver_id,
        'trip_date'       => $request->trip_date,
        'departure_time'  => $request->departure_time,
        'arrival_time'    => $request->arrival_time,
        'price'           => $request->price,
    ]);

    return $trip->load(['route.fromCity', 'route.toCity', 'bus', 'driver']);
}
public function destroy($id)
{
    $trip = Trip::findOrFail($id);

    // لو الرحلة مرتبطة بحجوزات
    if ($trip->bookings()->count() > 0) {
        return response()->json([
            'message' => 'لا يمكن حذف الرحلة لأنها مرتبطة بحجوزات'
        ], 400);
    }

    $trip->delete();

    return response()->json([
        'message' => 'تم حذف الرحلة بنجاح'
    ]);
}


}

