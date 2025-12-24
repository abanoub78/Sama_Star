<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Route;
use App\Models\City;

class RouteSeeder extends Seeder
{
    public function run(): void
    {
        $cairo = City::where('name', 'القاهرة')->first();
        $alex  = City::where('name', 'الإسكندرية')->first();
        $mans  = City::where('name', 'المنصورة')->first();

        Route::create([
            'from_city_id' => $cairo->id,
            'to_city_id'   => $alex->id,
            'distance_km'  => 220
        ]);

        Route::create([
            'from_city_id' => $cairo->id,
            'to_city_id'   => $mans->id,
            'distance_km'  => 130
        ]);
    }
}
