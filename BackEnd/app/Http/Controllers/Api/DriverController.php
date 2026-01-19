<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Driver;


class DriverController extends Controller
{
    public function index()
    {
        return Driver::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required',
            'phone' => 'required|unique:drivers'
        ]);

        return Driver::create($request->all());
    }
    public function update(Request $request, $id)
{
    $driver = Driver::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
    ]);

    $driver->update($request->only(['name', 'phone']));

    return response()->json($driver);
}

 public function destroy($id)
    {
        $driver = Driver::findOrFail($id);

        if ($driver->trips()->count() > 0) {
            return response()->json([
                'message' => 'لا يمكن حذف السائق لأنه مرتبط برحلات'
            ], 400);
        }

        $driver->delete();

        return response()->json([
            'message' => 'تم حذف السائق بنجاح'
        ]);
    }

}
