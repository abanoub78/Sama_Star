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
}
