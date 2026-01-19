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
     public function update(Request $request, $id)
    {
        $bus = Bus::findOrFail($id);

        $request->validate([
            'bus_number'  => 'required|unique:buses,bus_number,' . $bus->id,
            'bus_type'    => 'required|in:VIP,Economy',
            'total_seats' => 'required|integer|min:10'
        ]);

        $bus->update($request->only(['bus_number', 'bus_type', 'total_seats']));

        return $bus;
    }

    public function destroy($id)
{
    $bus = Bus::findOrFail($id);

    // لو عايز تمنع حذف حافلة مرتبطة برحلات
    if ($bus->trips()->count() > 0) {
        return response()->json([
            'message' => 'لا يمكن حذف الحافلة لأنها مرتبطة برحلات'
        ], 400);
    }

    // حذف المقاعد المرتبطة أولاً لو فيه علاقة
    $bus->seats()->delete();

    $bus->delete();

    return response()->json([
        'message' => 'تم حذف الحافلة بنجاح'
    ]);
}

}
