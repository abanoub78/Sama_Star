<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Driver;

class DriverSeeder extends Seeder
{
    public function run(): void
    {
        Driver::create([
            'name'  => 'Ahmed Hassan',
            'phone' => '01000000001'
        ]);

        Driver::create([
            'name'  => 'Mohamed Ali',
            'phone' => '01000000002'
        ]);
    }
}
