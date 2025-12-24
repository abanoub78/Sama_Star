<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bus;

class BusSeeder extends Seeder
{
    public function run(): void
    {
        Bus::create([
            'bus_number'  => 'EG-1001',
            'bus_type'    => 'VIP',
            'total_seats' => 40
        ]);

        Bus::create([
            'bus_number'  => 'EG-2001',
            'bus_type'    => 'Economy',
            'total_seats' => 50
        ]);
         Bus::create([
            'bus_number'  => 'EG-2002',
            'bus_type'    => 'Economy',
            'total_seats' => 60
        ]);
         Bus::create([
            'bus_number'  => 'EG-2003',
            'bus_type'    => 'Economy',
            'total_seats' => 60
        ]);
    }
}
