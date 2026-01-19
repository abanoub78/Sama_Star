<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Route;


class RouteController extends Controller
{
    public function index()
    {
        return Route::with(['fromCity','toCity'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'from_city_id' => 'required|exists:cities,id',
            'to_city_id'   => 'required|exists:cities,id',
            'distance_km'  => 'required|integer'
        ]);

        return Route::create($request->all());
    }

     public function update(Request $request, $id)
    {
        $route = Route::findOrFail($id);

        $request->validate([
            'from_city_id' => 'required|exists:cities,id',
            'to_city_id'   => 'required|exists:cities,id',
            'distance_km'  => 'required|integer'
        ]);

        $route->update($request->only(['from_city_id', 'to_city_id', 'distance_km']));

        return $route->load(['fromCity','toCity']);
    }

    public function destroy($id)
    {
        $route = Route::findOrFail($id);
        $route->delete();

        return response()->json(['message' => 'Route deleted successfully']);
    }
}
