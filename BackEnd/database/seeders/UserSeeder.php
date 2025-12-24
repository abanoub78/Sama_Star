<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@bus.com',
            'password' => Hash::make('password'),
            'role'     => 'admin'
        ]);

        User::create([
            'name'     => 'Test User',
            'email'    => 'user@bus.com',
            'password' => Hash::make('password'),
            'role'     => 'user'
        ]);
    }
}
