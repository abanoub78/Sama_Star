<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bus;

class SeatSeeder extends Seeder
{
    public function run(): void
    {
        $buses = Bus::all();

        foreach ($buses as $bus) {
            for ($i = 1; $i <= $bus->total_seats; $i++) {
                $bus->seats()->create([
                    'seat_number' => $i
                ]);
            }
        }
    }
}
