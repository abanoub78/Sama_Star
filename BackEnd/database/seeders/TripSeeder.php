<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Trip;
use App\Models\Route;
use App\Models\Bus;
use App\Models\Driver;
use Carbon\Carbon;

class TripSeeder extends Seeder
{
    public function run(): void
    {
        $route  = Route::first();
        $bus    = Bus::first();
        $driver = Driver::first();

        Trip::create([
            'route_id'       => $route->id,
            'bus_id'         => $bus->id,
            'driver_id'      => $driver->id,
            'trip_date'      => Carbon::now()->addDay()->toDateString(),
            'departure_time'=> '08:00:00',
            'arrival_time'  => '11:30:00',
            'price'          => 250
        ]);

        Trip::create([
            'route_id'       => $route->id,
            'bus_id'         => $bus->id,
            'driver_id'      => $driver->id,
            'trip_date'      => Carbon::now()->addDays(2)->toDateString(),
            'departure_time'=> '15:00:00',
            'arrival_time'  => '18:30:00',
            'price'          => 300
        ]);
    }
}
