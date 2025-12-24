<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bus;


class BusController extends Controller
{
    public function index()
    {
        return Bus::with('seats')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'bus_number'  => 'required|unique:buses',
            'bus_type'    => 'required|in:VIP,Economy',
            'total_seats' => 'required|integer|min:10'
        ]);

        $bus = Bus::create($request->all());

        // إنشاء المقاعد تلقائيًا
        for ($i = 1; $i <= $bus->total_seats; $i++) {
            $bus->seats()->create([
                'seat_number' => $i
            ]);
        }

        return $bus->load('seats');
    }
}
