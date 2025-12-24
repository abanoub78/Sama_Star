<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
{
    $this->call([
        CitySeeder::class,
        RouteSeeder::class,
        BusSeeder::class,
        SeatSeeder::class,
        DriverSeeder::class,
        TripSeeder::class,
        UserSeeder::class,
    ]);
}

}
